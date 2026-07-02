'use client';

import type { ComponentType, CSSProperties } from 'react';
import { Compass, PenTool, Hammer, Rocket, LifeBuoy, Workflow } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import type { IconProps } from '@/lib/icons';
import { getProcess } from '@/data/process';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

// Map process icon keys (data/process.ts) to glyphs locally so the data file stays React-free.
const STEP_ICONS: Record<string, ComponentType<IconProps>> = {
  discovery: Compass,
  design: PenTool,
  build: Hammer,
  ship: Rocket,
  support: LifeBuoy,
};

// "How I work" — numbered step cards (icon tile + ghost numeral), revealed with a stagger.
export function Process() {
  useLocale(); // re-render on language switch
  const process = getProcess();
  return (
    <Section id="process" className="bg-bg-alt">
      <SectionHeading
        icon={Workflow}
        eyebrow={t('process.eyebrow')}
        title={t('process.title')}
        description={t('process.description')}
      />

      <Reveal className="stagger mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {process.map((step, i) => {
          const Icon = STEP_ICONS[step.icon] ?? Compass;
          return (
            <div
              key={step.title}
              style={{ ['--i']: i } as CSSProperties}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-sm transition-[box-shadow,border-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-border-strong hover:shadow-md"
            >
              {/* Ghost step numeral — a faint watermark fully inside the card */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute end-4 top-3 font-display text-6xl font-bold leading-none text-brand-tint"
              >
                {i + 1}
              </span>
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-bg-alt text-brand-text shadow-sm transition-colors duration-300 group-hover:border-brand-text">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="relative mt-4 text-fluid-lg font-semibold text-text">{step.title}</h3>
              <p className="relative mt-2 text-fluid-base leading-relaxed text-subtle">{step.text}</p>

              {/* Extra detail — expands on hover (always shown on touch / reduced-motion) */}
              {step.more && (
                <div className="relative grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] motion-reduce:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mt-3 border-t border-border pt-3 text-fluid-sm leading-relaxed text-muted opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:opacity-100 [@media(hover:none)]:opacity-100">
                      {step.more}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </Reveal>
    </Section>
  );
}
