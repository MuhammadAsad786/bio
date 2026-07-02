'use client';

import type { ComponentType, CSSProperties } from 'react';
import { TrendingUp, LayoutGrid, Star, CalendarDays } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import type { IconProps } from '@/lib/icons';
import { getMetrics } from '@/data/metrics';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

// A bold, eye-catching statement band — the headline reveals word-by-word (staggered) as it
// scrolls into view, with the closing phrase in brand colour, backed by an icon-tiled impact band.

// Map metric icon keys (data/metrics.ts) to glyphs locally so the data file stays React-free.
const METRIC_ICONS: Record<string, ComponentType<IconProps>> = {
  downloads: TrendingUp,
  apps: LayoutGrid,
  rating: Star,
  years: CalendarDays,
};

export function Statement() {
  useLocale(); // re-render on language switch
  const MAIN = t('statement.headline.main').split(' ');
  const ACCENT = t('statement.headline.accent').split(' ');
  const metrics = getMetrics();
  return (
    <section className="border-y border-border bg-bg-alt py-20 sm:py-28">
      <Container>
        {/* Eyebrow with a short brand accent rule */}
        <Reveal>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 flex-none bg-brand-text" />
            <p className="font-mono text-fluid-sm uppercase tracking-[0.2em] text-brand-text">
              {t('statement.eyebrow')}
            </p>
          </div>
        </Reveal>

        {/* Word-by-word staggered headline */}
        <Reveal className="stagger mt-5 max-w-4xl font-display text-fluid-3xl font-bold leading-[1.08] text-text">
          {MAIN.map((w, i) => (
            <span key={`m-${i}`} style={{ ['--i']: i } as CSSProperties} className="inline-block">
              {w}&nbsp;
            </span>
          ))}
          {ACCENT.map((w, i) => (
            <span
              key={`a-${i}`}
              style={{ ['--i']: MAIN.length + i } as CSSProperties}
              className="inline-block text-brand-text"
            >
              {w}&nbsp;
            </span>
          ))}
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-5 max-w-2xl text-fluid-lg leading-relaxed text-subtle">
            {t('statement.body')}
          </p>
        </Reveal>

        {/* Impact band — icon-tiled metric cards. Each card sizes to its own content, so wide
            values like 100M+ never collide, and figures use tabular numerals. */}
        <Reveal className="stagger mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {metrics.map((m, i) => {
            const Icon = METRIC_ICONS[m.icon] ?? TrendingUp;
            return (
              <dl
                key={m.label}
                style={{ ['--i']: i } as CSSProperties}
                className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-alt text-brand-text shadow-sm">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <dd className="mt-4 font-display text-fluid-2xl font-bold leading-none tabular-nums text-text sm:text-fluid-3xl">
                  {m.value}
                </dd>
                <dt className="mt-2 font-mono text-fluid-sm uppercase tracking-[0.15em] text-subtle">
                  {m.label}
                </dt>
              </dl>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
