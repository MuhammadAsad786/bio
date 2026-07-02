// Tiny, dependency-free helpers for overlaying an Urdu translation onto English data.
// Used by the data modules (data/*.ts) to produce already-localized exports at build time,
// so every existing `import { apps } from '@/data/apps'` keeps working unchanged.

/**
 * Overlay a keyed map of partial patches onto an array, matched by a key selector.
 * Only the fields present in `overlay[key]` are replaced; everything else (icons, hrefs,
 * ratings, colors, slugs…) stays from the base (English) item.
 */
export function overlayBy<T, K extends string>(
  base: T[],
  key: (item: T) => K,
  overlay: Partial<Record<K, Partial<T>>>,
): T[] {
  return base.map((item) => {
    const patch = overlay[key(item)];
    return patch ? { ...item, ...patch } : item;
  });
}

/**
 * Overlay aligned by array index — for lists with no stable id where order is fixed
 * (e.g. experience entries, FAQs). `overlay[i]` patches `base[i]`.
 */
export function overlayByIndex<T>(base: T[], overlay: Array<Partial<T> | undefined>): T[] {
  return base.map((item, i) => {
    const patch = overlay[i];
    return patch ? { ...item, ...patch } : item;
  });
}

/**
 * Like overlayBy, but one named field is itself an object that should be SHALLOW-merged
 * rather than replaced (e.g. `app.details` — translate `description`/`genres`, keep
 * `developer`/`version`/`size`). `field` names the nested object to merge.
 */
export function overlayNested<T, K extends string, F extends keyof T>(
  base: T[],
  key: (item: T) => K,
  field: F,
  overlay: Partial<Record<K, Partial<NonNullable<T[F]>>>>,
): T[] {
  return base.map((item) => {
    const patch = overlay[key(item)];
    if (!patch) return item;
    const current = item[field];
    if (!current) return item;
    return { ...item, [field]: { ...current, ...patch } } as T;
  });
}

/**
 * Overlay a Record keyed by string (e.g. case studies keyed by app slug). Shallow-merges
 * each present entry's patch over the base entry.
 */
export function overlayRecord<T>(
  base: Record<string, T>,
  overlay: Record<string, Partial<T>>,
): Record<string, T> {
  const out: Record<string, T> = {};
  for (const [k, v] of Object.entries(base)) {
    const patch = overlay[k];
    out[k] = patch ? { ...v, ...patch } : v;
  }
  return out;
}
