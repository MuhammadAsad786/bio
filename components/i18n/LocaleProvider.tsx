'use client';

import { useEffect } from 'react';
import { getLocale, setLocale } from '@/lib/i18n/locale-store';
import { translate } from '@/lib/i18n';

// Applies the visitor's saved language after mount (the static HTML ships English, so this avoids a
// hydration mismatch — same idea as the theme toggle's mounted gate). A pre-paint inline script in
// <head> already set <html lang/dir> from localStorage so RTL + Urdu fonts apply with no flash;
// this syncs the React store to match and keeps <title> localized. Renders nothing.
export function LocaleProvider() {
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('locale');
    } catch {
      /* ignore */
    }
    const initial = saved === 'ur' ? 'ur' : 'en';
    if (initial !== getLocale()) setLocale(initial);

    // Keep the document title in sync with the active language.
    const sync = () => {
      document.title = translate(getLocale(), 'site.title');
    };
    sync();
    // setLocale notifies subscribers; mirror that here for <title>.
    const onLocale = () => sync();
    window.addEventListener('localechange', onLocale);
    return () => window.removeEventListener('localechange', onLocale);
  }, []);

  return null;
}
