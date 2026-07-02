// Real published apps. Icons live in public/images/apps/icons/ (downloaded from the
// stores). Summaries are written here (not copied from store listings). `featured`
// apps get the spotlight grid; the rest fill the full catalogue. `rating` is the live
// store rating at time of fetch; the card only shows it when it's strong. Screenshots,
// refreshed ratings and install brackets are merged in from data/store-data.ts (generated
// by scripts/fetch-store-data.mjs) — see the merge loop below the apps array.
import { storeData, type StoreDetails } from './store-data';
import { getLocale } from '@/lib/i18n';
import { categoryUr, appSummaryUr } from '@/data/i18n/apps.ur';
import { storeDataUr } from '@/data/i18n/store-data.ur';

export type AppPlatform = 'ios' | 'android';

export type AppItem = {
  name: string;
  platform: AppPlatform;
  category: string;
  icon: string;
  storeUrl: string;
  summary: string;
  rating?: number;
  // Number of store ratings behind `rating` (iOS only — from the iTunes Lookup API).
  ratingCount?: number;
  // Conservative lower bound of the app's public Google Play install bracket at time of
  // fetch (e.g. "1M+" → 1_000_000). Android only — the App Store publishes no count.
  installs?: number;
  featured?: boolean;
  // Portrait screenshot paths under public/images/apps/shots/<slug>/ (merged from store-data).
  shots?: string[];
  // Real store description + metadata (developer, version, updated, size, age, …) from store-data.
  details?: StoreDetails;
};

// Category order used by the catalogue. The values are STABLE English keys (used for `===`
// filtering); the visible label is localized at render time via categoryLabel() so switching the
// language never breaks the filters. `app.category` likewise stays the English key.
export const APP_CATEGORIES = [
  'TV Remotes & Casting',
  'Utilities & Productivity',
  'Security',
  'Lifestyle & Entertainment',
] as const;
export const categoryLabel = (cat: string): string =>
  getLocale() === 'ur' ? (categoryUr[cat] ?? cat) : cat;

export const apps: AppItem[] = [
  // ---------------- Featured ----------------
  {
    name: 'Coin Identifier: Scanner & Value',
    platform: 'ios',
    category: 'Utilities & Productivity',
    icon: '/images/apps/icons/coin-identifier-scanner-value.jpg',
    storeUrl: 'https://apps.apple.com/app/id6753618693',
    summary: 'Point your camera at a coin to identify it and estimate its value with on-device vision.',
    rating: 4.2,
    featured: true,
  },
  {
    name: 'Smart View for Samsung TV',
    platform: 'ios',
    category: 'TV Remotes & Casting',
    icon: '/images/apps/icons/smart-view-for-samsung-tv.jpg',
    storeUrl: 'https://apps.apple.com/app/id6479804434',
    summary: 'Mirror your iPhone screen and cast photos, video and audio to Samsung smart TVs.',
    rating: 4.4,
    featured: true,
  },
  {
    name: 'Smart Print for HP Printers',
    platform: 'android',
    category: 'Utilities & Productivity',
    icon: '/images/apps/icons/smart-print-for-hp-printers.png',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.document.pdf.jpg.mobileprinter',
    installs: 50_000,
    summary: 'Print documents, PDFs and photos straight from your phone over Wi-Fi.',
    rating: 4.7,
    featured: true,
  },
  {
    name: 'Screen Mirror for Roku TV',
    platform: 'android',
    category: 'TV Remotes & Casting',
    icon: '/images/apps/icons/screen-mirror-for-roku-tv.png',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.rokucast.screenmirroring.smartview.fortcltv',
    installs: 100_000,
    summary: 'Cast your Android screen and media to Roku and TCL Roku TVs in a couple of taps.',
    rating: 4.7,
    featured: true,
  },
  {
    name: 'Universal Remote for Roku TV',
    platform: 'ios',
    category: 'TV Remotes & Casting',
    icon: '/images/apps/icons/universal-remote-for-roku-tv.jpg',
    storeUrl: 'https://apps.apple.com/app/id6737194485',
    summary: 'A full Roku remote on your iPhone — navigation, keyboard, apps and casting.',
    rating: 4.4,
  },
  {
    name: 'QR Code Reader & Barcode Scanner',
    platform: 'ios',
    category: 'Utilities & Productivity',
    icon: '/images/apps/icons/qr-code-reader-barcode-scanner.jpg',
    storeUrl: 'https://apps.apple.com/app/id6752232744',
    summary: 'Fast, no-nonsense QR and barcode scanning with history and quick actions.',
    rating: 4.0,
    featured: true,
  },

  // ---------------- TV Remotes & Casting ----------------
  {
    name: 'Remotix – TV Remote Control',
    platform: 'ios',
    category: 'TV Remotes & Casting',
    icon: '/images/apps/icons/remotix-tv-remote-control.jpg',
    storeUrl: 'https://apps.apple.com/app/id6757790528',
    summary: 'A universal Wi-Fi remote for the smart TVs and streaming boxes in your home.',
  },
  {
    name: 'RemoteX – Universal Remote',
    platform: 'ios',
    category: 'TV Remotes & Casting',
    icon: '/images/apps/icons/remotex-universal-remote-app.jpg',
    storeUrl: 'https://apps.apple.com/app/id6752631905',
    summary: 'One app to control multiple smart-TV brands and cast media from your iPhone.',
  },
  {
    name: 'Smart Control – Mobile TV Remote',
    platform: 'ios',
    category: 'TV Remotes & Casting',
    icon: '/images/apps/icons/smart-control-mobile-tv-remote.jpg',
    storeUrl: 'https://apps.apple.com/app/id6740748603',
    summary: 'A pocket remote for smart TVs with a clean, gesture-friendly control pad.',
  },
  {
    name: 'Smartview for Samsung Smart TV',
    platform: 'android',
    category: 'TV Remotes & Casting',
    icon: '/images/apps/icons/smartview-for-samsung-smart-tv.png',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.screencast.lgtv.smartview.screenmirroring',
    installs: 1_000_000,
    summary: 'Cast and mirror your Android screen to Samsung and LG smart TVs.',
    rating: 4.3,
  },
  {
    name: 'Samsung Smart View TV Mirror',
    platform: 'android',
    category: 'TV Remotes & Casting',
    icon: '/images/apps/icons/samsung-smart-view-tv-mirror.png',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.tv.remote.samsung.cast',
    installs: 50_000,
    summary: 'Mirror your phone to Samsung TVs with quick connect and media casting.',
    rating: 4.3,
  },
  {
    name: 'Smart View – Miracast (Samsung)',
    platform: 'android',
    category: 'TV Remotes & Casting',
    icon: '/images/apps/icons/smart-view-for-samsung-tv-2.png',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.smartview.castto.screenmirror.appfor.miracast',
    installs: 1_000_000,
    summary: 'Screen mirroring and Miracast for Samsung smart TVs.',
    rating: 4.3,
  },
  {
    name: 'Samsung Smart View TV Cast',
    platform: 'android',
    category: 'TV Remotes & Casting',
    icon: '/images/apps/icons/samsung-smart-view-tv-cast.png',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.screenmirror.forvizio.smarttv.screenshare',
    installs: 500_000,
    summary: 'Cast photos and video to Samsung and Vizio smart TVs over your network.',
    rating: 4.1,
  },
  {
    name: 'Smart View for Samsung TV Cast',
    platform: 'android',
    category: 'TV Remotes & Casting',
    icon: '/images/apps/icons/smart-view-for-samsung-tv-cast.png',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.casttotv.screenmirroring.smartview.smarttvlcd',
    installs: 5_000_000,
    featured: true,
    summary: 'Screen casting to Samsung smart TVs and LCD displays.',
  },
  {
    name: 'Roku Mirror Screen & Cast TV',
    platform: 'android',
    category: 'TV Remotes & Casting',
    icon: '/images/apps/icons/roku-mirror-screen-amp-cast-tv.png',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.tcl.screenmirroring.smartview.forrokutv',
    installs: 100_000,
    summary: 'Mirror and cast to Roku and TCL Roku TVs from your Android device.',
    rating: 4.3,
  },
  {
    name: 'Fire Stick – Fire TV Remote',
    platform: 'android',
    category: 'TV Remotes & Casting',
    icon: '/images/apps/icons/fire-stick-fire-tv-remote.png',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.app.firetvremoteapp',
    installs: 10_000,
    summary: 'A remote for Amazon Fire TV and Fire Stick with full navigation and keyboard.',
  },
  {
    name: 'Remote for Apple TV',
    platform: 'android',
    category: 'TV Remotes & Casting',
    icon: '/images/apps/icons/remote-for-apple-tv.png',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.myapps.remoteforappletv',
    installs: 10_000,
    summary: 'Control your Apple TV from an Android phone over the local network.',
  },
  {
    name: 'TV Remote for Vizio Smart TV',
    platform: 'android',
    category: 'TV Remotes & Casting',
    icon: '/images/apps/icons/tv-remote-for-vizio-smart-tv.png',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.tv.remote.smarttv.control.smartcast.vizio',
    installs: 100_000,
    summary: 'A SmartCast remote for Vizio smart TVs with quick app launchers.',
  },

  // ---------------- Utilities & Productivity ----------------
  {
    name: 'AC Remote Control – All Carrier',
    platform: 'android',
    category: 'Utilities & Productivity',
    icon: '/images/apps/icons/ac-remote-control-all-carrier.png',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.ac.remote.control.forcarrier.air.conditioner',
    installs: 100_000,
    summary: 'A universal air-conditioner remote supporting a wide range of brands.',
  },
  {
    name: 'CarPlay Dash for Android',
    platform: 'android',
    category: 'Utilities & Productivity',
    icon: '/images/apps/icons/apple-carplay-app-for-android.png',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.app.smart.car.connect',
    installs: 10_000,
    summary: 'A simplified CarPlay-style driving dashboard for Android phones.',
  },
  {
    name: 'Instant VPN – Fast Proxy',
    platform: 'android',
    category: 'Utilities & Productivity',
    icon: '/images/apps/icons/instant-vpn-fast-vpn-client.jpg',
    storeUrl: 'https://play.google.com/store/apps/details?id=app.instant_vpn.proxymaster.securevpn',
    installs: 1_000_000,
    summary: 'A lightweight, one-tap VPN proxy client for private browsing.',
  },

  // ---------------- Security ----------------
  {
    name: 'Authenticator – Cloud Backup',
    platform: 'ios',
    category: 'Security',
    icon: '/images/apps/icons/authenticator-app-cloud-backup.jpg',
    storeUrl: 'https://apps.apple.com/app/id6745116865',
    summary: 'A 2FA TOTP authenticator with encrypted cloud backup and easy device transfer.',
    rating: 5.0,
    featured: true,
  },
  {
    name: 'Authenticator App – 2FA Secure',
    platform: 'ios',
    category: 'Security',
    icon: '/images/apps/icons/authenticator-app-2fa-secure.jpg',
    storeUrl: 'https://apps.apple.com/app/id6754811170',
    summary: 'Generate secure two-factor (TOTP) codes for your online accounts.',
  },

  // ---------------- Lifestyle & Entertainment ----------------
  {
    name: 'Santa Christmas Prank Call',
    platform: 'android',
    category: 'Lifestyle & Entertainment',
    icon: '/images/apps/icons/santa-christmas-prank-call.png',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.santacall.audiocall.videocall.santaprankcall.merrychristmas',
    installs: 500_000,
    summary: 'A festive fake Santa voice/video call experience for family fun.',
    rating: 4.5,
  },
  {
    name: 'Turban Photo Editor',
    platform: 'android',
    category: 'Lifestyle & Entertainment',
    icon: '/images/apps/icons/turbans-photo-editor.png',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.droidmentor.turban_pathan_afghan.balochi_panjabi_sardar_photo_editor',
    installs: 500_000,
    summary: 'Try on traditional turbans and cultural outfits in your photos.',
  },
  {
    name: 'Body Scanner – Camera Prank',
    platform: 'android',
    category: 'Lifestyle & Entertainment',
    icon: '/images/apps/icons/full-audery-body-scanner-xray.png',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.body_scanner.cloth_remover',
    installs: 10_000_000,
    summary: 'A novelty augmented-reality camera prank app for entertainment.',
  },
  {
    name: 'FAHAD Tutoring Solutions',
    platform: 'android',
    category: 'Lifestyle & Entertainment',
    icon: '/images/apps/icons/fahad-tutoring-solutions.jpg',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.fahadtutors',
    installs: 50_000,
    summary: 'A tutoring and learning-resources app for students.',
  },
  {
    name: 'Anytime Work',
    platform: 'android',
    category: 'Lifestyle & Entertainment',
    icon: '/images/apps/icons/anytime-work.jpg',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.app.any',
    installs: 1_000,
    summary: 'A simple jobs and gig-work browser for finding nearby work.',
  },
];

// Slug = icon basename (already matches the screenshot folder names). Drives /apps/<slug> routes.
export const appSlug = (a: AppItem): string => a.icon.split('/').pop()!.replace(/\.\w+$/, '');
export const getAppBySlug = (slug: string): AppItem | undefined =>
  apps.find((a) => appSlug(a) === slug);

// Merge live store data (screenshots, refreshed ratings, install brackets) over the static
// defaults. Runs once at module load, before the derived exports below.
for (const a of apps) {
  const d = storeData[appSlug(a)];
  if (!d) continue;
  if (d.shots?.length) a.shots = d.shots;
  if (typeof d.rating === 'number') a.rating = d.rating;
  if (typeof d.ratingCount === 'number') a.ratingCount = d.ratingCount;
  if (typeof d.installs === 'number') a.installs = d.installs;
  if (d.details) a.details = d.details;
}

// `apps` (post store-merge) is the English source array. Build a parallel Urdu-localized array
// once: translated summary + scraped store description. The `category` stays the English KEY (it's
// a filter key); its label is localized at render via categoryLabel(). Slugs derive from `icon`,
// so /apps/<slug> routes are identical in both languages.
const appsUr: AppItem[] = apps.map((a) => {
  const slug = appSlug(a);
  const ur = storeDataUr[slug];
  return {
    ...a,
    summary: appSummaryUr[slug] ?? a.summary,
    details: a.details && ur ? { ...a.details, ...ur } : a.details,
  };
});

// Current-locale accessors — read getLocale() so a runtime language switch reflects immediately.
export const getApps = (): AppItem[] => (getLocale() === 'ur' ? appsUr : apps);
export const getLocalizedAppBySlug = (slug: string): AppItem | undefined =>
  getApps().find((a) => appSlug(a) === slug);

export const featuredApps = apps.filter((a) => a.featured);
export const appCount = apps.length;

// Total downloads across the catalogue — the sum of every app's `installs` floor (the
// conservative lower bound of its public Google Play install bracket). iOS apps carry no
// figure (the App Store publishes none), so this is Google-Play-only and deliberately
// understated. To report the ~9M figure instead, swap the reduce for one that skips the
// novelty/prank apps, e.g. `.filter((a) => a.category !== 'Lifestyle & Entertainment')`.
export const totalInstalls = apps.reduce((sum, a) => sum + (a.installs ?? 0), 0); // 20_081_000

// Floor to a clean, conservative label: 20_081_000 → "20M+", 9_581_000 → "9M+", 50_000 → "50K+".
export function formatInstalls(n: number): string {
  if (n >= 1_000_000) return `${Math.floor(n / 1_000_000)}M+`;
  if (n >= 1_000) return `${Math.floor(n / 1_000)}K+`;
  return `${n}`;
}

// Headline downloads figure shown in the hero / statement band. Set manually to the career-wide
// total across the App Store & Google Play (all apps, not just the 28 listed here) — the auto-summed
// Google-Play-only floor above (`totalInstalls`, ~20M) is a deliberately conservative subset.
export const installsLabel = '100M+';

