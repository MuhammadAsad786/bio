// One-time fetch of store screenshots + ratings for every app in data/apps.ts.
// NOT part of the build — run manually:  node scripts/fetch-store-data.mjs
//
// iOS  → App Store web page (screenshot mzstatic URLs) + iTunes Lookup API (rating/count).
// Android → Play page HTML (play-lh screenshot URLs + star rating + install bracket).
// For each app it gathers candidate image URLs, downloads them, and keeps only the genuinely
// PORTRAIT ones (measured with `sips` after download — token sizes are unreliable), up to 3,
// resized to 480px wide → public/images/apps/shots/<slug>/{1,2,3}.png. Existing on-disk shots
// are kept when a fetch yields < 2. Writes data/store-data.ts (merged into data/apps.ts).

import { execSync } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SHOTS_DIR = join(ROOT, 'public', 'images', 'apps', 'shots');
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- parse data/apps.ts for { platform, icon, storeUrl } per app -----------------------------
function parseApps() {
  const src = readFileSync(join(ROOT, 'data', 'apps.ts'), 'utf8');
  const re = /platform:\s*'(ios|android)',[\s\S]*?icon:\s*'([^']+)',\s*storeUrl:\s*'([^']+)'/g;
  const out = [];
  let m;
  while ((m = re.exec(src))) {
    const [, platform, icon, storeUrl] = m;
    out.push({ slug: icon.split('/').pop().replace(/\.\w+$/, ''), platform, icon, storeUrl });
  }
  return out;
}

function bracketFloor(label) {
  const t = label.replace(/[,+\s]/g, '').toUpperCase();
  const n = parseFloat(t);
  if (t.includes('M')) return Math.round(n * 1_000_000);
  if (t.includes('K')) return Math.round(n * 1_000);
  return Math.round(n);
}

async function getBuffer(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function getText(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (res.status === 429 || res.status >= 500) {
      await sleep(2000 * (i + 1));
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  }
  throw new Error('HTTP 429 (retries exhausted)');
}

function sipsDims(file) {
  try {
    const o = execSync(`sips -g pixelWidth -g pixelHeight ${JSON.stringify(file)}`).toString();
    const w = Number(o.match(/pixelWidth:\s*(\d+)/)?.[1]);
    const h = Number(o.match(/pixelHeight:\s*(\d+)/)?.[1]);
    return w && h ? { w, h } : null;
  } catch {
    return null;
  }
}

// ---- text helpers (for store descriptions / metadata) ----------------------------------------
function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function htmlToText(h) {
  return decodeEntities(
    h
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>|<\/li>/gi, '\n')
      .replace(/<[^>]+>/g, ''),
  )
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Drop undefined/empty keys; return undefined if nothing useful is left.
function clean(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === '') continue;
    out[k] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

// ---- iOS --------------------------------------------------------------------------------------
async function fetchIos(app) {
  const id = app.storeUrl.match(/id(\d+)/)?.[1];
  if (!id) throw new Error('no id');

  let rating, ratingCount, details;
  try {
    const data = JSON.parse(await getText(`https://itunes.apple.com/lookup?id=${id}&country=us`));
    const r = data.results?.[0];
    if (r) {
      if (r.userRatingCount > 0 && r.averageUserRating > 0) {
        rating = Math.round(r.averageUserRating * 10) / 10;
        ratingCount = r.userRatingCount;
      }
      details = clean({
        description: (r.description || '').trim(),
        developer: r.sellerName,
        version: r.version,
        updated: r.currentVersionReleaseDate?.slice(0, 10),
        sizeMB: r.fileSizeBytes ? Math.round(r.fileSizeBytes / 1048576) : undefined,
        age: r.contentAdvisoryRating,
        genres: (r.genres || []).join(', ') || undefined,
        languages: Array.isArray(r.languageCodesISO2A) ? r.languageCodesISO2A.length : undefined,
      });
    }
  } catch {}

  // Candidate screenshots from the App Store web page (screenshots live under PurpleSource*).
  const html = await getText(`https://apps.apple.com/us/app/id${id}`);
  const re =
    /https:\/\/[a-z0-9-]+\.mzstatic\.com\/image\/thumb\/[^"\\]+?\.(?:png|jpg|jpeg)\/\d+x\d+bb\.(?:webp|png|jpg|jpeg)/gi;
  const seen = new Set();
  const candidates = [];
  let m;
  while ((m = re.exec(html))) {
    const base = m[0].replace(/\/\d+x\d+bb\.(?:webp|png|jpg|jpeg)$/i, '');
    if (!/Purple/i.test(base) || seen.has(base)) continue;
    seen.add(base);
    candidates.push(`${base}/600x1300bb.png`);
  }
  return { candidates: candidates.slice(0, 16), rating, ratingCount, installs: undefined, details };
}

// ---- Android ----------------------------------------------------------------------------------
async function fetchAndroid(app) {
  const html = await getText(`${app.storeUrl}&hl=en&gl=US`);

  const seen = new Set();
  const candidates = [];
  const re = /https:\/\/play-lh\.googleusercontent\.com\/([A-Za-z0-9_-]+)=w\d+-h\d+/g;
  let m;
  while ((m = re.exec(html))) {
    const base = m[1];
    if (seen.has(base)) continue;
    seen.add(base);
    candidates.push(`https://play-lh.googleusercontent.com/${base}=w720`);
  }

  const rating = (() => {
    const r = html.match(/Rated (\d(?:\.\d)?) stars out of/);
    return r ? Number(r[1]) : undefined;
  })();
  const inst = html.match(/>([0-9][0-9.,]*[KMB]?\+)<\/div><div[^>]*>Downloads/);
  const installs = inst ? bracketFloor(inst[1]) : undefined;

  const description = (() => {
    const m = html.match(/data-g-id="description"[^>]*>([\s\S]*?)<\/div>/);
    return m ? htmlToText(m[1]) || undefined : undefined;
  })();
  const developer = (() => {
    const m = html.match(/href="\/store\/apps\/dev[^"]*"[^>]*>\s*(?:<[^>]+>\s*)*([^<]+)</);
    return m ? decodeEntities(m[1]).trim() : undefined;
  })();
  const updated = (() => {
    const m = html.match(/Updated on<\/div><div[^>]*>([^<]+)</);
    return m ? m[1].trim() : undefined;
  })();
  const age = (() => {
    const m = html.match(/Rated for (\d+\+)/);
    return m ? m[1] : undefined;
  })();
  const details = clean({ description, developer, updated, age });

  return { candidates: candidates.slice(0, 14), rating, ratingCount: undefined, installs, details };
}

function existingShots(slug) {
  const dir = join(SHOTS_DIR, slug);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => /\.(png|jpe?g)$/i.test(f))
    .sort()
    .map((f) => `/images/apps/shots/${slug}/${f}`);
}

// Download candidates, KEEP ONLY PORTRAIT (measured native dims), up to `need`, resized to 480w.
async function downloadPortraitShots(slug, urls, need = 12) {
  const dir = join(SHOTS_DIR, slug);
  mkdirSync(dir, { recursive: true });
  for (const f of readdirSync(dir)) if (/\.(png|jpe?g)$/i.test(f)) rmSync(join(dir, f));
  const tmp = join(os.tmpdir(), `shot-${slug}.img`);
  const saved = [];
  for (const url of urls) {
    if (saved.length >= need) break;
    try {
      writeFileSync(tmp, await getBuffer(url));
      const dim = sipsDims(tmp);
      if (!dim || dim.h < dim.w * 1.3) continue; // portrait only
      const i = saved.length + 1;
      const out = join(dir, `${i}.jpg`);
      execSync(
        `sips --resampleWidth 480 -s format jpeg -s formatOptions 82 ${JSON.stringify(tmp)} --out ${JSON.stringify(out)}`,
        { stdio: 'ignore' },
      );
      saved.push(`/images/apps/shots/${slug}/${i}.jpg`);
    } catch {}
  }
  try {
    rmSync(tmp);
  } catch {}
  return saved;
}

// ---- main -------------------------------------------------------------------------------------
const apps = parseApps();
console.log(`Parsed ${apps.length} apps from data/apps.ts\n`);
const result = {};

for (const app of apps) {
  await sleep(500);
  process.stdout.write(`• ${app.slug} (${app.platform}) … `);
  try {
    const meta = app.platform === 'ios' ? await fetchIos(app) : await fetchAndroid(app);
    let shots = meta.candidates.length ? await downloadPortraitShots(app.slug, meta.candidates) : [];
    if (shots.length < 2) {
      const have = existingShots(app.slug);
      if (have.length > shots.length) shots = have;
    }
    result[app.slug] = {
      shots,
      rating: meta.rating,
      ratingCount: meta.ratingCount,
      installs: meta.installs,
      details: meta.details,
    };
    const dk = meta.details ? Object.keys(meta.details).length : 0;
    console.log(
      `shots:${shots.length} rating:${meta.rating ?? '-'} installs:${meta.installs ?? '-'} details:${dk}`,
    );
  } catch (e) {
    const have = existingShots(app.slug);
    result[app.slug] = { shots: have };
    console.log(`FAILED (${e.message}) — kept ${have.length} existing`);
  }
}

// ---- emit data/store-data.ts ------------------------------------------------------------------
const body = Object.entries(result)
  .map(([slug, d]) => {
    const parts = [];
    if (d.shots?.length) parts.push(`shots: ${JSON.stringify(d.shots)}`);
    if (typeof d.rating === 'number') parts.push(`rating: ${d.rating}`);
    if (typeof d.ratingCount === 'number') parts.push(`ratingCount: ${d.ratingCount}`);
    if (typeof d.installs === 'number') parts.push(`installs: ${d.installs}`);
    if (d.details) parts.push(`details: ${JSON.stringify(d.details)}`);
    return `  ${JSON.stringify(slug)}: { ${parts.join(', ')} },`;
  })
  .join('\n');

writeFileSync(
  join(ROOT, 'data', 'store-data.ts'),
  `// AUTO-GENERATED by scripts/fetch-store-data.mjs — do not edit by hand.
// Live store data (screenshots + ratings + install brackets + product details) merged into data/apps.ts.
export type StoreDetails = {
  description?: string;
  developer?: string;
  version?: string;
  updated?: string;
  sizeMB?: number;
  age?: string;
  genres?: string;
  languages?: number;
};
export type StoreDatum = {
  shots?: string[];
  rating?: number;
  ratingCount?: number;
  installs?: number;
  details?: StoreDetails;
};
export const storeData: Record<string, StoreDatum> = {
${body}
};
`,
);
console.log(`\nWrote data/store-data.ts (${Object.keys(result).length} apps)`);
