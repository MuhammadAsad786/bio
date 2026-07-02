'use client';

import { useSyncExternalStore } from 'react';
import { getLocale, subscribeLocale, dirOf, type Locale } from '@/lib/i18n/locale-store';

// Subscribe a component to the current locale. Returns the live locale + dir and re-renders the
// component whenever the language is switched. getServerSnapshot is 'en' so SSG/first hydration
// matches the static English HTML (the LocaleProvider applies a saved Urdu choice after mount).
export function useLocale(): { locale: Locale; dir: 'ltr' | 'rtl' } {
  const locale = useSyncExternalStore<Locale>(subscribeLocale, getLocale, () => 'en');
  return { locale, dir: dirOf(locale) };
}
