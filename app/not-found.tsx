'use client';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

// Exported by the static build as out/404.html, which GitHub Pages serves on unknown routes.
export default function NotFound() {
  useLocale(); // re-render on language switch
  return (
    <section className="flex min-h-[70svh] items-center">
      <Container className="text-center">
        <p className="font-mono text-fluid-sm uppercase tracking-[0.2em] text-accent">{t('nf.code')}</p>
        <h1 className="mt-3 text-fluid-3xl font-bold text-text">{t('nf.title')}</h1>
        <p className="mt-3 text-fluid-base text-muted">{t('nf.body')}</p>
        <div className="mt-8 flex justify-center">
          <Button href="/">{t('nf.back')}</Button>
        </div>
      </Container>
    </section>
  );
}
