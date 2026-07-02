# Asad — Portfolio

A fast, fully responsive personal portfolio for a mobile app developer. Built with
**Next.js (App Router) + static export** and **Tailwind CSS**, themed in **Ember Black**
(black + orange dark theme), and deployed to **GitHub Pages**.

> **Status:** Milestone 1 — the Hero/dashboard, for color-scheme approval. About, Skills,
> Projects (with image carousels + detail pages), Clients, and the Web3Forms contact section
> are added in the following milestones.

---

## Quick start

```bash
nvm use            # Node 20 (see .nvmrc)
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

| Script | What it does |
| --- | --- |
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Static export to `./out` |
| `npm run preview` | Build, then serve `./out` locally with `serve` |
| `npm run typecheck` | `tsc --noEmit` type gate |

> `next start` is intentionally **not** available — `output: 'export'` produces static files
> with no server. Use `npm run preview` to test the real export.

---

## Editing content

All content lives in typed files under [`data/`](./data) — **you never touch components**:

- [`data/profile.ts`](./data/profile.ts) — name, role, "7+ years", stat chips, CTAs, social links,
  address & email. **This drives the hero/dashboard.**

Icons are referenced by **string key** (e.g. `"github"`, `"linkedin"`); the available keys are
registered in [`lib/icons.ts`](./lib/icons.ts). Add a new mark there, then reference its key in data.

Images go in [`public/images/`](./public/images) and are referenced by root-relative path
(e.g. `/images/profile/me.jpg`); always render them through `SmartImage` / `asset()` so they
resolve correctly under the GitHub Pages subpath.

---

## Deployment (GitHub Pages)

Pushing to `main` triggers [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml),
which builds the static export and publishes it to Pages.

**One-time setup:** repo **Settings → Pages → Source = GitHub Actions**.

### Base path (important for correct asset URLs)

The site can live at three kinds of URLs — set the base path accordingly:

| Where it's hosted | What to do |
| --- | --- |
| **Project page** `USER.github.io/<repo>/` | Nothing — CI uses the repo name automatically |
| **User/Org page** `USER.github.io/` | Set repository **Variable** `BASE_PATH` = `/` |
| **Custom domain** `example.com` | Set `BASE_PATH` = `/` **and** add `public/CNAME` with the domain |

The app normalizes a `/` base path to root, so `BASE_PATH=/` means "serve from the domain root".

For local dev, leave `NEXT_PUBLIC_BASE_PATH` unset (serves at `/`). To reproduce a project-page
subpath locally, set it before building: `NEXT_PUBLIC_BASE_PATH=<repo> npm run preview`.

### Contact form (later milestone)

The contact form uses [Web3Forms](https://web3forms.com) (no backend). Get a free access key and set
it as repository **Variable** `WEB3FORMS_KEY` (it's a public key by design — it only routes mail to
your verified inbox). See [`.env.local.example`](./.env.local.example) for local use.

---

## Tech & design

- **Framework:** Next.js 16 (App Router), static export, React 19, TypeScript (strict).
- **Styling:** Tailwind CSS v3.4 mapped to Ember Black CSS-variable tokens in
  [`app/globals.css`](./app/globals.css).
- **Fonts:** Space Grotesk (display), Inter (body), JetBrains Mono (labels) via `next/font`.
- **Responsive:** fluid `clamp()` type, 44px tap targets, `env(safe-area-inset-*)` for notched
  iPhones, `100svh` hero, `prefers-reduced-motion` support — verified from a 320px iPhone SE to 4K.
