// Runtime locale store (framework-agnostic, no React) — the single source of truth for the
// CURRENT language. Mirrors the dark-mode pattern: a tiny observable that components subscribe to
// (via useLocale) so flipping it re-renders the whole app instantly, in place, with no navigation.
// `t()` and the data getX() accessors read getLocale() at call time, so they always reflect it.
export type Locale = 'en' | 'ur';

let current: Locale = 'en';
const listeners = new Set<() => void>();

export const getLocale = (): Locale => current;
export const dirOf = (l: Locale): 'ltr' | 'rtl' => (l === 'ur' ? 'rtl' : 'ltr');

// Flip the language: update the store, the <html lang/dir> (so RTL + Urdu fonts apply at once),
// persist the choice, and notify every subscriber → instant re-render.
export function setLocale(next: Locale): void {
  const l: Locale = next === 'ur' ? 'ur' : 'en';
  current = l;
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.lang = l;
    root.dir = dirOf(l);
    try {
      localStorage.setItem('locale', l);
    } catch {
      /* ignore */
    }
  }
  listeners.forEach((cb) => cb());
  // Broadcast for non-subscriber side effects (e.g. <title> sync in LocaleProvider).
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('localechange'));
}

export function subscribeLocale(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
