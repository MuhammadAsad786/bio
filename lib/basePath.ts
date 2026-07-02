// Mirror of next.config.mjs normalization so client + server agree on the prefix.
const raw = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const basePath =
  raw === '' || raw === '/' ? '' : `/${raw.replace(/^\/+|\/+$/g, '')}`;

/**
 * Prefix a root-relative asset path (e.g. "/images/x.jpg") with basePath, exactly once.
 * Anchors (#...), external URLs (http/https) and protocol links (mailto:/tel:) pass through.
 * Use this for every data-driven src/href so nothing breaks on the GitHub Pages subpath.
 */
export function asset(path: string): string {
  if (!path) return path;
  if (path.startsWith('#')) return path;
  if (/^(https?:|mailto:|tel:)/.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${clean}`;
}
