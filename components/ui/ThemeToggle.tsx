'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { t } from '@/lib/i18n';

type Theme = 'light' | 'dark';

// Light/dark toggle. The initial theme is set before paint by the inline ThemeScript
// (no flash); this just reflects/updates it. Persists to localStorage and broadcasts a
// 'themechange' event so multiple instances (desktop + mobile) stay in sync.
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const read = () => (document.documentElement.dataset.theme as Theme) || 'light';
    setTheme(read());
    setMounted(true);
    const onChange = () => setTheme(read());
    window.addEventListener('themechange', onChange);
    return () => window.removeEventListener('themechange', onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    root.dataset.theme = next;
    root.style.colorScheme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* ignore */
    }
    setTheme(next);
    window.dispatchEvent(new Event('themechange'));
  };

  // Until mounted, render the light-mode icon so SSR and first client render match.
  const isDark = mounted && theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t('theme.toLight') : t('theme.toDark')}
      data-cursor={isDark ? t('cursor.light') : t('cursor.dark')}
      className={cn(
        'flex h-10 w-10 flex-none items-center justify-center rounded-pill border border-border bg-header text-text shadow-sm transition-colors hover:border-brand-text hover:text-brand-text',
        className,
      )}
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
