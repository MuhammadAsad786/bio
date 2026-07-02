/** @type {import('next').NextConfig} */

// Normalize the env value: '' for root, '/repo' (leading slash, no trailing) for a project page.
// A bare '/' sentinel (used by the CI for user-page / custom-domain deploys) normalizes to root.
const raw = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const basePath = raw === '' || raw === '/' ? '' : `/${raw.replace(/^\/+|\/+$/g, '')}`;

const nextConfig = {
  output: 'export', // emit static HTML/CSS/JS into ./out (GitHub Pages compatible)
  trailingSlash: true, // /about/ -> out/about/index.html (clean URLs on Pages)
  images: {
    unoptimized: true, // required: the default image optimizer needs a running server
  },
  basePath, // '' (root / user page / custom domain) or '/repo' (project page)
  assetPrefix: basePath || undefined, // prefix _next/static assets under the subpath
  reactStrictMode: true,
};

export default nextConfig;

/*
  How to set NEXT_PUBLIC_BASE_PATH:
  - Project page  https://USER.github.io/asadPortfolio/  -> CI auto-uses the repo name. Locally: asadPortfolio
  - User/Org page https://USER.github.io/                -> set repo Variable BASE_PATH=/  (normalizes to root)
  - Custom domain https://asad.dev/                      -> set repo Variable BASE_PATH=/  + add public/CNAME
  - Local dev: leave unset -> empty -> works at http://localhost:3000/
*/
