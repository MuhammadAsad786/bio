'use client';

import { Languages } from 'lucide-react';
import { cn } from '@/lib/cn';
import { setLocale, t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

// Instant in-place language toggle — like the dark-mode switch. Flipping the locale store
// re-renders every subscribed component into the other language immediately (no navigation, no
// reload). Mirrored in Header + Footer; both stay in sync via the shared store.
export function LangSwitch({ className }: { className?: string }) {
  const { locale } = useLocale();
  const other = locale === 'ur' ? 'en' : 'ur';

  return (
    <button
      type="button"
      onClick={() => setLocale(other)}
      aria-label={t('lang.aria')}
      data-cursor={t('cursor.lang')}
      className={cn(
        'flex h-10 flex-none items-center gap-1.5 rounded-pill border border-border bg-header px-3 text-fluid-sm text-text shadow-sm transition-colors hover:border-brand-text hover:text-brand-text',
        className,
      )}
    >
      <Languages size={16} aria-hidden="true" />
      <span>{locale === 'ur' ? t('lang.toEnglish') : t('lang.toUrdu')}</span>
    </button>
  );
}
