// One-time fetch of per-technology detail data for the Skills section (/stack/<slug>/ pages).
// NOT part of the build — run manually:  node scripts/fetch-tech-data.mjs  (or: npm run fetch-tech-data)
//
// For every technology in data/skills.ts it SCRAPES, with graceful per-field fallback:
//   • description  → Wikipedia REST summary (English + Urdu)   …/api/rest_v1/page/summary/<Title>
//   • version+date → endoflife.date /api/<product>.json  → GitHub releases/latest  (fallback)
//   • changes[]    → GitHub releases/latest  (release-notes body parsed to bullets)
// and SEEDS (authored here, no reliable web source across 42 disparate tools):
//   • example      → a short "how it works" snippet
//   • flow[]       → the ordered steps rendered as the flow diagram
// Non-versioned tiles (REST, WebSockets, CI/CD, HTML/CSS, App/Play Store…) simply carry no
// version/changelog. Writes data/tech-data.ts (merged into data/skills.ts at module load).

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const UA = 'asad-portfolio-tech-fetch (https://github.com/) Node';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- registry: one entry per skillSlug(name) in data/skills.ts -------------------------------
// wiki/wikiUr = Wikipedia article titles · eol = endoflife.date product · repo = GitHub owner/name
// desc = seed description used only when Wikipedia has no article · example/flow = always seeded.
const REGISTRY = {
  java: {
    wiki: 'Java_(programming_language)', wikiUr: 'جاوا_(پروگرامنگ_زبان)', eol: 'java',
    homepage: 'https://www.java.com', docs: 'https://docs.oracle.com/en/java/',
    exampleLang: 'java',
    example: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    flow: ['Write .java source', 'javac compiles to bytecode (.class)', 'JVM loads & JIT-compiles to native', 'Runs on any OS with a JVM'],
  },
  kotlin: {
    wiki: 'Kotlin_(programming_language)', wikiUr: 'کوٹلن', eol: 'kotlin', repo: 'JetBrains/kotlin',
    homepage: 'https://kotlinlang.org', docs: 'https://kotlinlang.org/docs/home.html',
    exampleLang: 'kotlin',
    example: `fun main() {
    val names = listOf("Asad", "World")
    names.forEach { println("Hello, $it!") }
}`,
    flow: ['Write .kt source', 'kotlinc compiles to JVM bytecode', 'Runs on the JVM / Android ART', 'Interops directly with Java'],
  },
  'jetpack-compose': {
    wiki: 'Jetpack_Compose', homepage: 'https://developer.android.com/jetpack/compose',
    docs: 'https://developer.android.com/jetpack/compose/documentation', exampleLang: 'kotlin',
    example: `@Composable
fun Greeting(name: String) {
    Text(text = "Hello, $name!")
}`,
    flow: ['Describe UI in @Composable functions', 'Compose compiler builds a UI tree', 'State changes trigger recomposition', 'Renders natively on Android'],
  },
  'objective-c': {
    wiki: 'Objective-C', homepage: 'https://developer.apple.com', exampleLang: 'objectivec',
    example: `#import <Foundation/Foundation.h>

int main() {
    NSLog(@"Hello, World!");
    return 0;
}`,
    flow: ['Write .m / .h files', 'Clang compiles to machine code', 'Runtime dispatches messages', 'Runs on iOS / macOS'],
  },
  swiftui: {
    wiki: 'SwiftUI', homepage: 'https://developer.apple.com/xcode/swiftui/',
    docs: 'https://developer.apple.com/documentation/swiftui', exampleLang: 'swift',
    example: `struct ContentView: View {
    var body: some View {
        Text("Hello, World!")
            .padding()
    }
}`,
    flow: ['Declare views as Swift structs', 'SwiftUI diffs the view hierarchy', 'State drives automatic updates', 'Renders on iOS / macOS / watchOS'],
  },
  'next-js': {
    wiki: 'Next.js', repo: 'vercel/next.js', homepage: 'https://nextjs.org', docs: 'https://nextjs.org/docs',
    exampleLang: 'jsx',
    example: `export default function Page() {
    return <h1>Hello, World!</h1>;
}`,
    flow: ['Write React components in app/', 'Next renders on the server / statically', 'Hydrates on the client', 'Ships as static or serverless output'],
  },
  'node-js': {
    wiki: 'Node.js', eol: 'nodejs', repo: 'nodejs/node', homepage: 'https://nodejs.org',
    docs: 'https://nodejs.org/docs/latest/api/', exampleLang: 'js',
    example: `const http = require("http");

http.createServer((req, res) => {
    res.end("Hello, World!");
}).listen(3000);`,
    flow: ['JS enters the V8 engine', 'Event loop schedules async work', 'libuv handles I/O off-thread', 'Non-blocking response returned'],
  },
  express: {
    wiki: 'Express.js', repo: 'expressjs/express', homepage: 'https://expressjs.com',
    docs: 'https://expressjs.com/en/4x/api.html', exampleLang: 'js',
    example: `const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello, World!"));
app.listen(3000);`,
    flow: ['Request hits the Express app', 'Passes through the middleware chain', 'Matched route handler runs', 'Response sent back'],
  },
  python: {
    wiki: 'Python_(programming_language)', wikiUr: 'پائتھن', eol: 'python', repo: 'python/cpython',
    homepage: 'https://www.python.org', docs: 'https://docs.python.org/3/', exampleLang: 'python',
    example: `def greet(name):
    print(f"Hello, {name}!")

greet("World")`,
    flow: ['Write .py source', 'CPython compiles to bytecode', 'Bytecode runs on the VM', 'C extensions handle heavy work'],
  },
  django: {
    wiki: 'Django_(web_framework)', eol: 'django', repo: 'django/django', homepage: 'https://www.djangoproject.com',
    docs: 'https://docs.djangoproject.com/', exampleLang: 'python',
    example: `from django.http import HttpResponse

def home(request):
    return HttpResponse("Hello, World!")`,
    flow: ['URL router matches the request', 'View function/class runs', 'ORM queries the database', 'Template renders the response'],
  },
  php: {
    wiki: 'PHP', eol: 'php', repo: 'php/php-src', homepage: 'https://www.php.net',
    docs: 'https://www.php.net/docs.php', exampleLang: 'php',
    example: `<?php
echo "Hello, World!";`,
    flow: ['Browser requests a .php URL', 'Web server hands it to PHP-FPM', 'PHP interprets & runs the script', 'HTML returned to the browser'],
  },
  laravel: {
    wiki: 'Laravel', eol: 'laravel', repo: 'laravel/laravel', homepage: 'https://laravel.com',
    docs: 'https://laravel.com/docs', exampleLang: 'php',
    example: `Route::get('/', function () {
    return view('welcome');
});`,
    flow: ['Request enters public/index.php', 'Middleware + router resolve it', 'Controller + Eloquent ORM run', 'Blade template renders the view'],
  },
  spring: {
    wiki: 'Spring_Framework', eol: 'spring-framework', repo: 'spring-projects/spring-framework',
    homepage: 'https://spring.io', docs: 'https://docs.spring.io', exampleLang: 'java',
    example: `@RestController
class HelloController {
    @GetMapping("/")
    String hello() { return "Hello, World!"; }
}`,
    flow: ['Spring boots the app context', 'Beans are wired via DI', 'DispatcherServlet routes requests', 'Controller returns the response'],
  },
  graphql: {
    wiki: 'GraphQL', repo: 'graphql/graphql-js', homepage: 'https://graphql.org',
    docs: 'https://graphql.org/learn/', exampleLang: 'graphql',
    example: `query {
    me {
        name
        apps { title }
    }
}`,
    flow: ['Client sends one typed query', 'Server validates it against the schema', 'Resolvers fetch each field', 'Single JSON response returned'],
  },
  'rest-apis': {
    wiki: 'REST', homepage: 'https://developer.mozilla.org/en-US/docs/Glossary/REST', exampleLang: 'http',
    example: `GET /api/apps/42 HTTP/1.1
Host: example.com
Accept: application/json`,
    flow: ['Client requests a resource URL', 'HTTP verb states the action', 'Server returns JSON + status code', 'Stateless — each call is independent'],
  },
  postgresql: {
    wiki: 'PostgreSQL', eol: 'postgresql', homepage: 'https://www.postgresql.org',
    docs: 'https://www.postgresql.org/docs/', exampleLang: 'sql',
    example: `SELECT name, installs
FROM apps
WHERE rating >= 4.5
ORDER BY installs DESC;`,
    flow: ['Client sends SQL over the wire', 'Planner builds a query plan', 'MVCC executor reads/writes rows', 'Result set streamed back'],
  },
  mongodb: {
    wiki: 'MongoDB', eol: 'mongodb', repo: 'mongodb/mongo', homepage: 'https://www.mongodb.com',
    docs: 'https://www.mongodb.com/docs/', exampleLang: 'js',
    example: `db.apps.find({ rating: { $gte: 4.5 } })
  .sort({ installs: -1 });`,
    flow: ['App sends BSON documents', 'Stored in schemaless collections', 'Indexes speed up queries', 'Replica set keeps copies in sync'],
  },
  redis: {
    wiki: 'Redis', eol: 'redis', repo: 'redis/redis', homepage: 'https://redis.io',
    docs: 'https://redis.io/docs/', exampleLang: 'redis',
    example: `SET session:42 "active"
EXPIRE session:42 3600
GET session:42`,
    flow: ['Client sends a RESP command', 'Redis serves it from RAM', 'Optional persistence to disk', 'Sub-millisecond response'],
  },
  firebase: {
    wiki: 'Firebase', homepage: 'https://firebase.google.com', docs: 'https://firebase.google.com/docs',
    exampleLang: 'js',
    example: `import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore();
await setDoc(doc(db, "apps", "42"), { rating: 4.8 });`,
    flow: ['App uses a Firebase SDK', 'Auth verifies the user', 'Security rules gate the data', 'Cloud syncs in real time'],
  },
  'realtime-database': {
    desc: 'Firebase Realtime Database is a cloud-hosted NoSQL database that stores data as one big JSON tree and synchronises it in real time to every connected client, with offline support built in.',
    homepage: 'https://firebase.google.com/products/realtime-database',
    docs: 'https://firebase.google.com/docs/database', exampleLang: 'js',
    example: `import { getDatabase, ref, set } from "firebase/database";

set(ref(getDatabase(), "status/42"), "online");`,
    flow: ['Write JSON to a tree path', 'Server pushes deltas to listeners', 'Offline cache queues changes', 'All clients converge in real time'],
  },
  websockets: {
    wiki: 'WebSocket', homepage: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
    exampleLang: 'js',
    example: `const ws = new WebSocket("wss://example.com");
ws.onmessage = (e) => console.log(e.data);
ws.send("hello");`,
    flow: ['Client sends an HTTP Upgrade', 'Server switches protocols (101)', 'Full-duplex channel stays open', 'Both sides push frames anytime'],
  },
  'socket-io': {
    wiki: 'Socket.IO', repo: 'socketio/socket.io', homepage: 'https://socket.io',
    docs: 'https://socket.io/docs/v4/', exampleLang: 'js',
    example: `io.on("connection", (socket) => {
    socket.emit("welcome", "Hello!");
    socket.on("ping", () => socket.emit("pong"));
});`,
    flow: ['Client connects via Socket.IO', 'Handshake picks a transport', 'Falls back WS → HTTP polling', 'Rooms broadcast events'],
  },
  'ocpp-1-6': {
    wiki: 'Open_Charge_Point_Protocol', homepage: 'https://www.openchargealliance.org', exampleLang: 'json',
    example: `[2,"19","BootNotification",{
  "chargePointModel": "AC-22",
  "chargePointVendor": "Biotic"
}]`,
    flow: ['Charger opens a WebSocket to the CSMS', 'Sends BootNotification + Heartbeats', 'Authorizes RFID & starts a session', 'Streams MeterValues while charging'],
  },
  'ocpp-2-0-1': {
    wiki: 'Open_Charge_Point_Protocol', homepage: 'https://www.openchargealliance.org', exampleLang: 'json',
    example: `{
  "messageType": "TransactionEvent",
  "eventType": "Started",
  "idToken": { "type": "ISO14443" }
}`,
    flow: ['Charger connects to the CSMS', 'Device model reported on boot', 'Smart-charging profiles negotiated', 'Security profiles sign messages'],
  },
  mysql: {
    wiki: 'MySQL', eol: 'mysql', homepage: 'https://www.mysql.com', docs: 'https://dev.mysql.com/doc/',
    exampleLang: 'sql',
    example: `SELECT name FROM apps
WHERE platform = 'android'
ORDER BY installs DESC
LIMIT 10;`,
    flow: ['Client connects to mysqld', 'Parser + optimizer plan the query', 'InnoDB engine reads/writes rows', 'Result returned over the protocol'],
  },
  digitalocean: {
    wiki: 'DigitalOcean', homepage: 'https://www.digitalocean.com', docs: 'https://docs.digitalocean.com',
    exampleLang: 'bash',
    example: `doctl compute droplet create web \\
  --image ubuntu-22-04-x64 \\
  --size s-1vcpu-1gb`,
    flow: ['Provision a Droplet / App', 'Deploy code or a container', 'Managed DBs & networking attach', 'Traffic served from the region'],
  },
  aws: {
    wiki: 'Amazon_Web_Services', homepage: 'https://aws.amazon.com', docs: 'https://docs.aws.amazon.com',
    exampleLang: 'bash',
    example: `aws s3 cp ./out s3://my-bucket --recursive`,
    flow: ['Call an AWS service API/CLI', 'IAM authorizes the request', 'Service runs in a region/AZ', 'Pay only for what you use'],
  },
  docker: {
    wiki: 'Docker_(software)', eol: 'docker-engine', repo: 'moby/moby', homepage: 'https://www.docker.com',
    docs: 'https://docs.docker.com', exampleLang: 'dockerfile',
    example: `FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci
CMD ["npm", "start"]`,
    flow: ['Write a Dockerfile', 'docker build creates a layered image', 'Image runs as an isolated container', 'Same image runs anywhere'],
  },
  nginx: {
    wiki: 'Nginx', eol: 'nginx', homepage: 'https://nginx.org', docs: 'https://nginx.org/en/docs/',
    exampleLang: 'nginx',
    example: `server {
    listen 80;
    location / {
        proxy_pass http://localhost:3000;
    }
}`,
    flow: ['Request hits Nginx on :80/:443', 'Event loop accepts the connection', 'Serves static or proxies upstream', 'Response (optionally cached) returned'],
  },
  git: {
    wiki: 'Git', repo: 'git/git', homepage: 'https://git-scm.com', docs: 'https://git-scm.com/doc',
    exampleLang: 'bash',
    example: `git checkout -b feature
git add .
git commit -m "Add feature"
git push origin feature`,
    flow: ['Edit files in the working tree', 'git add stages a snapshot', 'git commit writes an immutable object', 'Push/pull syncs with remotes'],
  },
  'ci-cd': {
    wiki: 'CI/CD', homepage: 'https://docs.github.com/actions', exampleLang: 'yaml',
    example: `on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm ci && npm run build`,
    flow: ['A push triggers the pipeline', 'CI installs deps & runs tests', 'A build artifact is produced', 'CD deploys to the environment'],
  },
  react: {
    wiki: 'React_(software)', repo: 'facebook/react', homepage: 'https://react.dev', docs: 'https://react.dev/learn',
    exampleLang: 'jsx',
    example: `function Counter() {
    const [n, setN] = useState(0);
    return <button onClick={() => setN(n + 1)}>{n}</button>;
}`,
    flow: ['Components return JSX', 'React builds a virtual DOM', 'Diffing finds minimal changes', 'The real DOM is patched'],
  },
  'tailwind-css': {
    wiki: 'Tailwind_CSS', repo: 'tailwindlabs/tailwindcss', homepage: 'https://tailwindcss.com',
    docs: 'https://tailwindcss.com/docs', exampleLang: 'html',
    example: `<button class="rounded-lg bg-blue-600 px-4 py-2 text-white">
  Click me
</button>`,
    flow: ['Write utility classes in markup', 'Tailwind scans your files', 'JIT generates only used CSS', 'A tiny stylesheet ships to prod'],
  },
  'framer-motion': {
    desc: 'Framer Motion (now "Motion") is a production-ready animation library for React that turns declarative initial/animate props into smooth, GPU-accelerated transitions, gestures and layout animations.',
    homepage: 'https://motion.dev', docs: 'https://motion.dev/docs', exampleLang: 'jsx',
    example: `<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
/>`,
    flow: ['Wrap an element in motion.*', 'Declare initial / animate states', 'Motion interpolates each frame', 'GPU-accelerated transforms render'],
  },
  html: {
    wiki: 'HTML', homepage: 'https://developer.mozilla.org/en-US/docs/Web/HTML', exampleLang: 'html',
    example: `<!DOCTYPE html>
<html>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>`,
    flow: ['Author semantic elements', 'Browser parses HTML → DOM tree', 'CSS + JS attach to nodes', 'Pixels painted to the screen'],
  },
  css: {
    wiki: 'CSS', homepage: 'https://developer.mozilla.org/en-US/docs/Web/CSS', exampleLang: 'css',
    example: `.card {
    display: grid;
    gap: 1rem;
    border-radius: 12px;
}`,
    flow: ['Selectors target DOM nodes', 'Cascade + specificity resolve rules', 'Layout (box / flex / grid) computed', 'Browser paints & composites'],
  },
  bootstrap: {
    wiki: 'Bootstrap_(front-end_framework)', eol: 'bootstrap', repo: 'twbs/bootstrap',
    homepage: 'https://getbootstrap.com', docs: 'https://getbootstrap.com/docs/', exampleLang: 'html',
    example: `<div class="container">
  <button class="btn btn-primary">Save</button>
</div>`,
    flow: ['Include Bootstrap CSS/JS', 'Compose prebuilt components', 'Grid + utilities handle layout', 'Responsive across breakpoints'],
  },
  wordpress: {
    wiki: 'WordPress', eol: 'wordpress', repo: 'WordPress/WordPress', homepage: 'https://wordpress.org',
    docs: 'https://developer.wordpress.org', exampleLang: 'php',
    example: `<?php
while (have_posts()) {
    the_post();
    the_title("<h2>", "</h2>");
}`,
    flow: ['Request hits index.php', 'WordPress loads theme + plugins', 'Queries posts from MySQL', 'Theme template renders HTML'],
  },
  android: {
    wiki: 'Android_(operating_system)', eol: 'android', homepage: 'https://www.android.com',
    docs: 'https://developer.android.com', exampleLang: 'kotlin',
    example: `class MainActivity : AppCompatActivity() {
    override fun onCreate(b: Bundle?) {
        super.onCreate(b)
        setContentView(R.layout.main)
    }
}`,
    flow: ['Build an APK/AAB from Kotlin/Java', 'Installed onto the device', 'ART runs the app process', 'The framework drives the lifecycle'],
  },
  ios: {
    wiki: 'IOS', eol: 'ios', homepage: 'https://www.apple.com/ios/', docs: 'https://developer.apple.com/documentation/',
    exampleLang: 'swift',
    example: `@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup { ContentView() }
    }
}`,
    flow: ['Build with Xcode (Swift / ObjC)', 'Signed & installed via the App Store', 'UIKit / SwiftUI drives the UI', 'Runs sandboxed on the device'],
  },
  'app-store': {
    wiki: 'App_Store_(Apple)', homepage: 'https://www.apple.com/app-store/', exampleLang: 'bash',
    example: `# Upload a build for review
xcrun altool --upload-app -f MyApp.ipa`,
    flow: ['Archive & upload a build', 'App Review checks the guidelines', 'Approved & released to the store', 'Users download & auto-update'],
  },
  'play-store': {
    wiki: 'Google_Play', homepage: 'https://play.google.com', exampleLang: 'bash',
    example: `# Build an AAB for a release track
bundletool build-apks --bundle=app.aab`,
    flow: ['Upload an AAB to Play Console', 'Choose a release track', 'Google signs & optimizes per device', 'Staged rollout to users'],
  },
};

// ---- fetch helpers ---------------------------------------------------------------------------
async function getJson(url, headers = {}) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, ...headers } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Wikipedia REST summary → { extract, url } (lang: 'en' | 'ur'). Returns null on miss.
async function wiki(title, lang = 'en') {
  try {
    const j = await getJson(
      `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
    );
    const extract = (j.extract || '').trim();
    if (!extract) return null;
    return { extract, url: j.content_urls?.desktop?.page };
  } catch {
    return null;
  }
}

// endoflife.date → newest cycle's latest version + date. Returns null on miss.
async function eol(product) {
  try {
    const arr = await getJson(`https://endoflife.date/api/${product}.json`);
    const c = Array.isArray(arr) ? arr[0] : null;
    if (!c) return null;
    return {
      version: String(c.latest ?? c.cycle ?? '').trim() || undefined,
      released: c.latestReleaseDate || c.releaseDate || undefined,
    };
  } catch {
    return null;
  }
}

// Strip markdown line → plain bullet text.
function tidy(line) {
  return line
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [text](url) → text
    .replace(/`([^`]+)`/g, '$1') // `code` → code
    .replace(/\*\*([^*]+)\*\*/g, '$1') // **bold** → bold
    .replace(/<[^>]+>/g, '') // html tags
    .replace(/\(#\d+\)|#\d+/g, '') // (#123) / #123 PR refs
    .replace(/by @[\w-]+/g, '') // by @author
    .replace(/\s+/g, ' ')
    .trim();
}

// GitHub releases/latest → { version, released, changes[] }. Returns null on miss / rate-limit.
async function github(repo) {
  try {
    const j = await getJson(`https://api.github.com/repos/${repo}/releases/latest`, {
      Accept: 'application/vnd.github+json',
    });
    // Strip a leading "v" and any monorepo package prefix (e.g. "socket.io@4.8.3" → "4.8.3").
    const version =
      (j.tag_name || '')
        .replace(/^[a-z0-9.@/_-]+@/i, '')
        .replace(/^v/i, '')
        .trim() || undefined;
    const released = j.published_at ? j.published_at.slice(0, 10) : undefined;
    const changes = [];
    for (const raw of (j.body || '').split(/\r?\n/)) {
      const m = raw.trim().match(/^[-*]\s+(.*)/);
      if (!m) continue;
      let text = tidy(m[1]);
      if (text.length < 5) continue;
      if (text.length > 140) text = text.slice(0, 137) + '…';
      changes.push(text);
      if (changes.length >= 5) break;
    }
    return { version, released, changes: changes.length ? changes : undefined };
  } catch {
    return null;
  }
}

// Drop undefined/empty keys.
function clean(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length)) continue;
    out[k] = v;
  }
  return out;
}

// ---- main ------------------------------------------------------------------------------------
const slugs = Object.keys(REGISTRY);
console.log(`Fetching tech data for ${slugs.length} technologies\n`);
const result = {};

for (const slug of slugs) {
  const r = REGISTRY[slug];
  process.stdout.write(`• ${slug} … `);
  const rec = {
    description: r.desc,
    example: r.example,
    exampleLang: r.exampleLang,
    flow: r.flow,
    homepage: r.homepage,
    docs: r.docs,
  };

  if (r.wiki) {
    const w = await wiki(r.wiki, 'en');
    if (w) {
      rec.description = w.extract;
      rec.wikiUrl = w.url;
    }
    if (r.wikiUr) {
      const wu = await wiki(r.wikiUr, 'ur');
      if (wu) rec.descriptionUr = wu.extract;
    }
  }

  let version, released;
  if (r.eol) {
    const e = await eol(r.eol);
    if (e) {
      version = e.version;
      released = e.released;
    }
  }
  if (r.repo) {
    const g = await github(r.repo);
    if (g) {
      if (!version) {
        version = g.version;
        released = g.released;
      }
      rec.changes = g.changes;
      rec.repo = r.repo;
    }
  }
  rec.version = version;
  rec.released = released;

  result[slug] = clean(rec);
  console.log(
    `desc:${rec.description ? '✓' : '–'} ur:${rec.descriptionUr ? '✓' : '–'} ver:${version ?? '–'} changes:${rec.changes?.length ?? 0}`,
  );
  await sleep(250); // be gentle on the public APIs (GitHub: 60 req/hr unauth)
}

// ---- emit data/tech-data.ts ------------------------------------------------------------------
const body = Object.entries(result)
  .map(([slug, d]) => `  ${JSON.stringify(slug)}: ${JSON.stringify(d)},`)
  .join('\n');

writeFileSync(
  join(ROOT, 'data', 'tech-data.ts'),
  `// AUTO-GENERATED by scripts/fetch-tech-data.mjs — do not edit by hand.
// Per-technology detail data (scraped description/version/changelog + seeded example/flow),
// merged into data/skills.ts and rendered on the /stack/<slug>/ pages.
import type { TechData } from '@/lib/types';

export const techData: Record<string, TechData> = {
${body}
};
`,
);
console.log(`\nWrote data/tech-data.ts (${Object.keys(result).length} technologies)`);
