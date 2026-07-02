import { messages, type UiKey } from '@/data/i18n/ui';
import { getLocale, type Locale } from '@/lib/i18n/locale-store';

// Runtime localization. The active language lives in lib/i18n/locale-store (a tiny observable);
// `t()` reads it at call time, so it always reflects the CURRENT locale. Components subscribe via
// `useLocale()` (components/i18n/useLocale) and re-render the instant the store flips — no rebuild,
// no navigation. Data modules expose getX() accessors that likewise read getLocale().

export type { UiKey, Locale };
export { getLocale, setLocale, dirOf, subscribeLocale } from '@/lib/i18n/locale-store';

type Vars = Record<string, string | number>;

// Replace {token} placeholders. Numbers stay Western by design (matches live store data; reads
// naturally in an Urdu tech context).
function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k: string) =>
    k in vars ? String(vars[k]) : `{${k}}`,
  );
}

// Look up a UI string in a specific locale, with English fallback so a missing Urdu key never
// breaks rendering.
export function translate(locale: Locale, key: UiKey, vars?: Vars): string {
  const raw = messages[locale][key] ?? messages.en[key] ?? key;
  return interpolate(raw, vars);
}

// Convenience: translate in the CURRENT locale. Safe in any component that subscribes via
// useLocale() (so it re-renders on a switch) and in non-React data accessors.
export function t(key: UiKey, vars?: Vars): string {
  return translate(getLocale(), key, vars);
}

export function plural(n: number, base: string, vars?: Vars): string {
  return t(`${base}.${n === 1 ? 'one' : 'other'}` as UiKey, { ...vars, count: n });
}
