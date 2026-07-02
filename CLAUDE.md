# CLAUDE.md

Project guidance for Claude Code working in this repo. Read this first.

## What this is

A professional **portfolio website for Muhammad Asad** — a mobile-app developer & founder of
**Biotic Apps Studio** (iOS/Android, 7+ years, 28+ apps shipped; smart-TV remotes, screen mirroring
& casting, plus utility apps; also Flutter & web). Minimal **"Mobbin-inspired"** design with a full
**light/dark theme** and **bilingual English + Urdu (RTL)**. Built as a **Next.js static export** and
deployed to **GitHub Pages**.

## Commands

```bash
npm run dev        # local dev at http://localhost:3000/  (toggle EN/UR in the page)
npm run typecheck  # tsc --noEmit  (run before every commit)
npm run build      # next build -> static export into ./out  (run to verify)
npm run preview    # build + serve ./out locally
npm run fetch-tech-data  # one-time scrape of Skills/tech detail (NOT part of the build)
```

**Always verify a change with `npm run typecheck` && `npm run build` (both must pass).** Language
(EN/UR) is a **runtime toggle** — one build ships both; switch it in the page (dev or preview), no
separate build. The build emits static HTML/CSS/JS to `./out`; grep `out/index.html` or `out/_next/static/**.css`
to confirm markup/CSS actually shipped (CSS is minified — e.g. `rgba(0,0,0,.16)`, `opacity:.5`).
RSC flight payload can double grep counts — that's expected. Note: deleting a route (e.g. a temp
preview page) can leave a stale `.next/types` reference that fails typecheck — re-run `npm run build`
to regenerate types.

Node 20 (`.nvmrc`).

## Deployment

- `next.config.mjs`: `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`.
- `basePath`/`assetPrefix` come from `NEXT_PUBLIC_BASE_PATH` (root / user-page / custom-domain → `''`;
  project page → `/repo`). CI (`.github/workflows/deploy.yml`) sets it. Local dev = unset = root.
- **All asset URLs must go through `asset()` / the basePath helpers** (`lib/basePath.ts`) so images
  resolve under a subpath deploy. `SmartImage` handles this for `<Image>`; for raw `<img>` use `asset(src)`.
- **Env** (`.env.local.example` → copy to `.env.local`): `NEXT_PUBLIC_BASE_PATH` (deploy subpath),
  `NEXT_PUBLIC_WEB3FORMS_KEY` (contact-form key — PUBLIC by design; form disabled until set), and
  `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (analytics — the script is inert until this is set). Language is a
  runtime toggle, NOT an env var.
- **One build, both languages** (`.github/workflows/deploy.yml` → `npm run build`): EN + UR ship in
  the same `out/` and switch client-side.

## Ask Asad (local lead-gen assistant)

A floating **"Ask Asad"** bubble (bottom-right) opens a chat panel. It is a **fully local, no-AI,
no-network** scripted assistant — visitors tap pre-written questions and get authored, portfolio-
grounded answers, presented like a professional assistant (avatar, typing dots, streamed bubbles,
branching follow-up chips). It doubles as a **lead funnel**: the "Work with Asad" path confirms
availability and, once a visitor says they want to start a project / collaborate, reveals the contact
card (email + a "Send your requirements" button that scrolls to the contact form).

- All content is editable in [data/ask-asad.ts](data/ask-asad.ts): `askNodes` (Q&A — one chat bubble
  per string in `a`, `follow` = next chips, `reveal: true` = show the contact card), `askCategories`
  (the "Browse topics" menu — keep every node in a category so it stays reachable), `askGreeting`,
  `askIntroNodes`, and `askConfig` (name/status/email). A few live figures (`appCount`,
  `installsLabel`, featured app names) are imported so the bot never drifts from the site.
  `askConfig.email` uses `profile.email` (still the placeholder — set the real one in `data/profile.ts`).
- UI: [AskAsad.tsx](components/ask/AskAsad.tsx) (`'use client'`) — the scripted engine (typing +
  cancel tokens, branching chips, contact funnel), dialog a11y (focus trap, Esc, scroll-lock),
  semantic tokens (theme-aware), reduced-motion-safe. Animations: `.ask-msg-in` / `.ask-dot`
  keyframes in `app/globals.css`.
- Mounted in `app/layout.tsx` after `<AuroraBackground/>` (outside `.page-shell`). **No env var, no
  config, no dependencies, no network** — it always renders.

## Internationalization (English + اردو, full RTL)

English (LTR) + Urdu (RTL) ship in **one build** and switch **instantly in place** (like the dark-mode
toggle) — no `/ur/` route, no navigation, no reload. Locale is a **runtime client store**; the page is
SSG'd in English (the static default) and re-renders into Urdu on toggle.

- **Store — `lib/i18n/locale-store.ts`** (framework-agnostic observable): `getLocale()` / `setLocale()`
  (flips the store, sets `<html lang/dir>`, persists `localStorage('locale')`, notifies subscribers) /
  `subscribeLocale()` / `dirOf()`. **`setLocale` is what makes the switch instant.**
- **Engine — `lib/i18n.ts`** (zero deps): `t(key, vars?)` / `plural()` read `getLocale()` at call time
  (so they reflect the current language); `translate(locale, key, vars?)` for an explicit locale (used
  by build-time `generateMetadata`). `{token}` interpolation + **English fallback** for missing keys.
- **Subscribe — `components/i18n/useLocale.ts`**: any component rendering locale-dependent content
  must be a **client component**, call `useLocale()` (re-renders on switch), and read data via the
  `getX()` accessors below + `t()`. `components/i18n/LocaleProvider.tsx` applies the saved language
  after mount (avoids a hydration mismatch) and keeps `<title>` in sync.
- **UI strings — `data/i18n/ui.{en,ur,ts}`**: `ui.en.ts` is the source of truth + the `UiKey` type;
  `ui.ur.ts` is a `Partial<Record<UiKey,string>>`. **Add every user-facing literal here**, read via
  `t('key')`. Module-load `t()`/arrays (NAV, FOCUS, META…) must move INTO the component render so they
  re-evaluate on switch.
- **Data — `data/*.ts`** export `getX()` accessors (`getProfile`, `getApps`, `getExperience`,
  `getReviews`, `getProcess`, `getFaqs`, `getMetrics`, `getSkillGroups`, `getAsk*`, `getCaseStudy`,
  `categoryLabel`, `localizeSkillGroup`/`localizeTechFlow`) that read `getLocale()` and pick the
  English vs Urdu-overlaid (`data/i18n/*.ur.ts` via `lib/i18n/merge.ts`) data. English consts stay
  (`apps`, `getAppBySlug`) for SSG/`generateStaticParams`/SEO. Tech/brand names + Western digits stay Latin.
- **Layout/fonts — `app/layout.tsx`**: `<html lang="en" dir="ltr">` + a no-flash `LOCALE_SCRIPT` that
  sets lang/dir from `localStorage` before paint; both Urdu faces (`Noto_Naskh_Arabic` body/UI,
  `Noto_Nastaliq_Urdu` display) load via `next/font`, applied through `html[lang='ur']` token remaps in
  `globals.css` (unused in EN, so not fetched). Detail pages (`/apps`, `/stack`) are server shells
  (generateStaticParams + EN metadata) rendering client views (`AppDetailView`/`StackDetailView`).
- **RTL — logical-utilities-first**: use `ms-/me-/ps-/pe-/start-/end-/text-start/text-end` (auto-flip
  under `dir`); add `[dir='rtl']` CSS only for raw/JS transforms. Directional arrows get **`.rtl-flip`**
  (`[dir='rtl'] .rtl-flip{transform:scaleX(-1)}`) — flip horizontal arrows, NOT vertical chevrons.
- **Switcher — `components/ui/LangSwitch.tsx`** (`'use client'`): a button that calls `setLocale()`
  (instant), mirrored in Header + Footer; both stay in sync via the shared store.

## Tech stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript (strict)** · **Tailwind CSS v3.4**.
- No runtime animation library. Motion = **CSS keyframes + IntersectionObserver + vanilla rAF**.
  (`embla-carousel-react` + `embla-carousel-autoplay` power the app-detail screenshot strip AND the
  Reviews carousel.)
- Fonts via `next/font` (Inter / Space Grotesk / JetBrains Mono; **Noto Naskh Arabic + Noto Nastaliq
  Urdu** for the Urdu build). Icons: `lucide-react` + `react-icons` (`fa6`, `si`).

## Design system — HARD CONSTRAINTS

Single source of truth: CSS variables in **`app/globals.css`** (`:root`), mapped to Tailwind tokens
in **`tailwind.config.ts`**. Never hard-code hex in components — use the semantic tokens.

### The 3-tier orange rule (do not violate)
Orange is brand but kept AA-accessible by splitting it into three roles:
- `--brand #FF6A00` → **large/decorative/icon glyphs ONLY** (`text-brand`, icon tiles, washes).
- `--brand-text #C2410C` → **small orange text / links / focus rings** (AA 5.18:1) — `text-brand-text`.
- `--brand-strong #9A3412` → hover for orange text. `--brand-tint #FFF3EC` → soft orange wash.
- **Actions/buttons & body text are near-black** `--primary` / `--text #18181B` — *not* orange.

### Other tokens
Surfaces `--bg #FFFFFF`, `--bg-alt #F7F7F8`, `--surface`, `--border #E4E4E7`, `--border-strong`.
`--tile #FFFFFF` → **logo/icon tiles; STAYS LIGHT in both themes** so multi-colour brand glyphs
(Apple/Next.js are near-black) stay legible. Use `bg-tile` for icon/logo tiles (WorksWith, HeroTechField).
Text `--text #18181B`, `--subtle/--text-2 #52525B`, `--muted #71717A`, `--faint #A1A1AA`.
Status `--danger #B91C1C`, `--success #15803D`. Shadows `--shadow-sm/md/lg`.
Radii `--radius* / --radius-pill`. Motion `--ease-out cubic-bezier(0.16,0.84,0.44,1)`.
Fluid type scale: `text-fluid-sm…fluid-display`.

### Dark mode
- Tokens are re-defined under **`html[data-theme='dark']`** in `globals.css` (lighter oranges for AA,
  flipped `--primary`, deeper shadows, `color-scheme: dark`). `--tile` stays light.
- A no-flash inline script (`THEME_SCRIPT` in `app/layout.tsx`, rendered in `<head>`) sets
  `data-theme` from `localStorage` (or OS preference) **before paint**. `ThemeToggle`
  (`components/ui/ThemeToggle.tsx`) flips it, persists, and broadcasts a `themechange` event so
  multiple instances stay in sync. `viewport.themeColor` has light/dark variants.
- **Primary-surface text uses `text-bg` (NOT `text-white`)** so it inverts: white-on-dark in light,
  dark-on-light in dark. `bg-text text-bg` patterns self-correct. Only keep literal `text-white` on
  arbitrary brand-colour tiles (e.g. Skills tiles). Skill tiles add `ring-1 ring-border` so dark ones
  (Next.js black) separate from the dark page.

### Always
- **WCAG AA** contrast in BOTH themes. **Responsive 320px → 4K** (test the narrow 2-col cases, no
  horizontal overflow; `.page-shell` clips `overflow-x` as a backstop).
- **Works in BOTH directions** — LTR (English) and RTL (Urdu). Prefer logical Tailwind utilities
  (`ms-/me-/ps-/pe-/start-/end-`) so layout auto-flips; never letter-space Arabic script (see i18n).
- **`prefers-reduced-motion: reduce` must freeze ALL motion.** Global damper lives at the bottom of
  the reduced-motion block in `globals.css`; section-scoped animations add their own `!important` freeze.
- **GPU-only animation, and prefer transform/opacity ONLY for always-on/background motion.** Use
  `translate3d` + `will-change` and never animate layout props. ⚠️ **Perf lesson:** animating
  `filter: blur()` or using `mix-blend-mode` in continuous/background effects causes severe jank —
  the hero starfield, aurora, and cursor are all transform/opacity-only with NO blur filters or blend
  modes. Keep one animated layer per element where possible; don't leave `will-change` on after a
  one-shot animation.

## Architecture

```
app/
  layout.tsx        # root; <head> no-flash THEME_SCRIPT; mounts <Plausible/>, <CustomCursor/>,
                    #   <ScrollProgress/>, <AuroraBackground/>, header/footer, .page-shell (overflow-x clip)
  page.tsx          # home order: Hero → About → Experience → Skills → Statement(metrics) → Apps →
                    #   Demo(gated) → Process → WorksWith → Reviews → FAQ → Contact
  globals.css       # design tokens (light + dark) + html[lang='ur'] remaps + ALL keyframes (single file)
  apps/[slug]/page.tsx    # generateStaticParams over the apps → static detail pages (+ case-study block)
  stack/[slug]/page.tsx   # generateStaticParams over allSkills (42) → static per-technology detail pages
components/
  sections/         # page sections (Hero, About, Experience, Skills, Apps, Statement, Demo, Process,
                    #   WorksWith, Reviews, Faq, Contact, HeroTechField, AppCatalogue, AppScreens, …)
  ui/               # reusable primitives (Section, SectionHeading, Reveal, Button, SmartImage,
                    #   ThemeToggle, CustomCursor, LangSwitch, TechFlow, …)
  layout/           # Header, Footer
  analytics/Plausible.tsx  # env-gated analytics script
  form/ContactForm.tsx     # Web3Forms contact form ('use client')
data/               # content (see below)
  i18n/             # ui.{en,ur,ts} string dictionary + *.ur.ts data overlays (one per content module)
lib/                # basePath, cn, icons (string-key registry), site, types
  i18n.ts           # i18n engine: LOCALE/DIR/LANG, t(), plural()
  i18n/merge.ts     # overlay helpers (overlayBy / overlayByIndex / overlayNested / overlayRecord)
hooks/              # useHideOnScrollNav
scripts/            # fetch-store-data.mjs, fetch-tech-data.mjs (manual fetches, NOT in the build),
                    #   build-ur.mjs (builds the Urdu locale into out/ur/)
public/images/apps/ # app icons + downloaded store screenshots (shots/<slug>/*.jpg)
```

### Data layer (`data/`)
- **`apps.ts`** — the 28 apps. `AppItem` has `installs?`, `rating?`, `shots?: string[]`,
  `details?: StoreDetails`. Exports `apps`, `featuredApps`, `appCount`, `appSlug(a)`, `getAppBySlug`,
  `installsLabel` (manual `'100M+'`), `formatInstalls`, `APP_CATEGORIES`. Merges in `storeData`.
- **`store-data.ts`** — **AUTO-GENERATED, do not hand-edit.** Per-app rating/installs/screenshots/
  `details`. Regenerate via the script below.
- **`profile.ts`** — name/role/bio/socials/location/email. Real: name **Muhammad Asad**, location
  **Lahore**, LinkedIn. ⚠️ Still placeholders: **email**, **GitHub** & **X** URLs (see TODO).
- **`experience.ts`** — career timeline (`ExperienceEntry[]`; `period` optional/omitted — titles &
  companies only). Real data from LinkedIn (Biotic Apps Studio, iPlexSoft, CodeCoy, Blinkedge).
- **`reviews.ts`** — testimonials (`Review[]`). Includes one real LinkedIn recommendation; rest are
  clearly-marked placeholders.
- **`metrics.ts`** — impact figures for the Statement band (mostly derived from `apps.ts`).
- **`process.ts`** — "How I work" steps (`ProcessStep[]`, with optional `more` hover-detail).
- **`faqs.ts`** — FAQ `{ q, a }[]` (placeholder answers).
- **`case-studies.ts`** — `Record<slug, CaseStudy>`; renders a deep-dive block on matching app pages
  and a "Case study" badge on the featured card. (Placeholder copy.)
- **`demo.ts`** — optional home demo clip; `export const demo = null` hides the section entirely.
- **`skills.ts`** — grouped skills; icons referenced by string key → `lib/icons.ts`. Each skill links
  to a `/stack/<slug>/` detail page: `skillSlug(name)` (slug from `name`, since `icon` keys collide —
  `ocpp`×2, `apple` for iOS), `allSkills` (flat + group label), `getSkillBySlug`. Merges in `techData`.
- **`tech-data.ts`** — **AUTO-GENERATED, do not hand-edit.** Per-technology `description`/`descriptionUr`/
  `version`/`released`/`changes`/`example`/`flow`/links, scraped + seeded (see fetch below). `TechData`
  type in `lib/types.ts`. Urdu flow-step overlay: **`data/i18n/tech-data.ur.ts`** (merged on the `ur` build).
- **`works-with.ts`** — **AUTO-GENERATED** brand-logo data for the "Works with" wall (single SVG
  `path` + TIGHT `viewBox` + official brand `color`).
- Types for the new sections live in **`lib/types.ts`** (`ExperienceEntry`, `ProcessStep`, `Faq`,
  `Metric`, `CaseStudy`, `Review`, `TechData`). Data files import zero React.
- **Urdu overlays — `data/i18n/*.ur.ts`**: each content module above has a keyed Urdu overlay applied
  on the `ur` build via `lib/i18n/merge.ts`, exporting the same names (see Internationalization).

### Store-data fetch (one-time, manual — NOT in the build)
`node scripts/fetch-store-data.mjs` scrapes the App Store / Google Play pages, downloads portrait
screenshots (`sips` resize → jpeg q82 into `public/images/apps/shots/<slug>/`), and rewrites
`data/store-data.ts`. Run it only when refreshing app data.

### Tech-data fetch (one-time, manual — NOT in the build) — `npm run fetch-tech-data`
`node scripts/fetch-tech-data.mjs` scrapes per-technology detail for the Skills tiles and rewrites
`data/tech-data.ts`. Per-tool it SCRAPES `description` (Wikipedia REST summary, EN + Urdu),
`version`+`released` (endoflife.date → GitHub `releases/latest` fallback) and `changes[]` (GitHub
release-notes bullets); and SEEDS `example` + `flow[]` from the in-script `REGISTRY` (no reliable web
source across 42 disparate tools — edit those there). All fetches fail soft, so non-versioned tiles
(REST, WebSockets, CI/CD, HTML/CSS, App/Play Store…) just omit the version/changelog. Run only to
refresh; CI builds from the committed file.

## Sections & notable components

- **Hero** — status pill, rotating role, social-proof downloads pill, CTAs, stats, socials, and a
  scroll cue. Background = **`HeroTechField`**: a **starfield** of brand-tile tech icons scattered
  across the whole hero. Each icon = ONE animated layer running `.hero-float` / `@keyframes heroOrbit`
  (smooth ellipse + continuous 360° spin, constant `linear` speed); `.hero-node` spins each in from a
  **random corner**; tiles are dimmed/translucent (`bg-tile`, opacity ~0.42) so they sit *inside* the
  background; a soft radial mask fades the headline core. Static `.hero-halo` glow (no blur).
- **Experience** — vertical timeline (rail + brand-dot nodes), `.stagger` reveal.
- **Skills** — colored icon tiles (brand colour = tile bg, white glyph, `ring-1 ring-border`), tabbed.
  Each tile is a `<Link>` to its `/stack/<slug>/` **tech detail page** (`cursor.view`, hover lift).
- **Statement** — word-by-word headline ("From first sketch to the App Store.") + an **icon-tiled
  impact/metrics band** (from `data/metrics.ts`).
- **Apps** — featured cards link to `/apps/<slug>/` (fixed-aspect `grid-cols-3` screenshot tray);
  below, **`AppCatalogue`** filters by **platform AND category** (keyed remount replays entrance).
- **Demo** — optional looping muted clip; renders nothing unless `data/demo.ts` is set.
- **Process** — "How I work" step cards; **hover-expand** reveals extra detail (grid-rows
  `0fr→1fr`, shown by default on touch / reduced-motion).
- **WorksWith** — logo wall (`data/works-with.ts`, `bg-tile`), **"Popcorn Supernova"** animation set
  (scoped `.brand-wall`/`.brand-chip`/`.brand-logo`). All frozen under reduced-motion.
- **Reviews** — Embla carousel (autoplay starts on scroll-into-view, pauses on hover, arrows + dots,
  reduced-motion safe).
- **FAQ** — native `<details>`/`<summary>` accordion (keyboard-accessible, CSS chevron).
- **Contact** — availability pill + asymmetric `lg:grid-cols-5` layout; `ContactForm` ('use client')
  posts to **Web3Forms** (needs `NEXT_PUBLIC_WEB3FORMS_KEY`; honeypot + live status region).
- **App detail** (`app/apps/[slug]/page.tsx`) — hero banner, `AppScreens` Embla carousel, about + info
  panel, optional **case-study block** (`data/case-studies.ts`), related apps.
- **Tech detail** (`app/stack/[slug]/page.tsx`) — `generateStaticParams` over `allSkills` →
  one static page per technology: hero (brand icon tile + scraped **version badge** + updated date),
  bilingual **description** (`descriptionUr ?? description` on the `ur` build), **"How it works"** code
  example (`<pre dir="ltr">`), **flow diagram** (`TechFlow`), **latest changes** (scraped changelog),
  links (site/docs/GitHub), related skills. Data from `data/tech-data.ts` (see fetch above).
  **`TechFlow`** (`components/ui/TechFlow.tsx`) renders `steps[]` as a numbered box-and-arrow flow —
  vertical on mobile → horizontal at `lg`; the horizontal arrow flips under RTL (`.rtl-flip`); entrance
  via `.tech-node` (`@keyframes techNodeIn`, frozen under reduced-motion).
- **Header** — segmented **pill nav** (active item = `bg-brand-tint` pill) + a **Contact primary CTA**
  + **`ThemeToggle`** + **`LangSwitch`** (EN/اردو; also in the Footer); hide-on-scroll, scrollspy from
  `NAV`. **CustomCursor ("Spotlight")** — ink dot
  + soft brand halo + faint inner ring + magnet + frosted `data-cursor` label; mouse-only, disabled on
  touch / reduced-motion (no blur filter, no blend mode — for perf).

### Shared primitives
`Section` (`divided` adds a hairline), `SectionHeading`, `Reveal` (`.stagger` cascade via `--i`),
`SmartImage`/`asset()`, `Button`, `SocialIcons`, `CopyEmail`, `ThemeToggle`.

## Conventions

- Match the surrounding code's idiom, comment density, and Tailwind-token usage. No new deps without need.
- Reference files as clickable markdown links, e.g. `[Apps.tsx](components/sections/Apps.tsx)`.
- Animations belong in `app/globals.css` as scoped classes/keyframes; component sets the trigger class
  + CSS vars (`--i`, `--ax`, `--ay`, `--rot`, `--enter-x`, etc.). Keep names section-scoped.
- New content sections follow the `Section` + `SectionHeading` + `Reveal`/`.stagger` pattern; ship
  realistic placeholder copy in an editable `data/*.ts` file with clear `// TODO` markers.
- **Never hardcode user-facing copy** — add a key to `data/i18n/ui.en.ts` (+ Urdu in `ui.ur.ts`) and
  read it via `t('key')`; new data content gets a matching `data/i18n/<file>.ur.ts` overlay. Keep edits
  to the shared i18n dictionaries **additive** (append keys) to avoid clobbering parallel work.
- After edits: `npm run typecheck` && `npm run build`; spot-check the built output. Tell the user to
  hard-refresh (Cmd+Shift+R) for client-side changes (dev server / browser cache).

## TODO / current state

- **`data/profile.ts`** — real name/location/LinkedIn in place. Still needed from the user:
  **email**, **GitHub** URL, **X** URL (or remove). `data/experience.ts` Blinkedge entry has a
  `// TODO` for exact title/dates. FAQ answers, case-study copy/metrics, and reviews (beyond the one
  real LinkedIn recommendation) are placeholders to replace.
- **Optional/not yet provided:** profile photo (LinkedIn can't be scraped — HTTP 999), `public/cv.pdf`
  + CV button, a home demo `.mp4` (`data/demo.ts`), Languages section, `SITE.url` final domain,
  `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
- **Urdu copy** (`data/i18n/*.ur.ts` + scraped `descriptionUr`) is authored/auto-translated — have a
  native speaker review before launch. Tech-detail `example`/`flow` seeds live in `scripts/fetch-tech-data.mjs`.
- **Deliberately out of scope (deferred):** full SEO suite (sitemap/robots/OG/JSON-LD) and a blog —
  both were planned then dropped by the user.
