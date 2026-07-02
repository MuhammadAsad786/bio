'use client';

import type { CSSProperties } from 'react';
import { Cast } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { brandLogos } from '@/data/works-with';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

// Logo-only "works with" wall — the real device brands & casting standards the remote, mirroring
// and casting apps support, each in its official brand colour. Logos render from tight-cropped
// viewBoxes (see data/works-with.ts) at ONE shared height, so wide wordmarks and square glyphs
// read at the same optical size. width:auto + max-w-full keeps the wordmarks from overflowing on
// narrow chips. Staggered in on scroll; a gentle lift on hover.
export function WorksWith() {
  useLocale(); // re-render on language switch
  return (
    <Section id="works-with" className="bg-bg-alt">
      <Reveal>
        <SectionHeading
          icon={Cast}
          eyebrow={t('worksWith.eyebrow')}
          title={t('worksWith.title')}
          description={t('worksWith.description')}
        />
      </Reveal>

      <Reveal className="brand-wall mt-12 grid grid-cols-2 gap-3 stagger sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {brandLogos.map(({ name, color, viewBox, path }, i) => (
          <div
            key={name}
            style={
              {
                ['--i']: Math.min(i, 9),
                ['--hue']: color,
                ['--spin']: i % 2 === 0 ? 1 : -1,
              } as CSSProperties
            }
            className="brand-chip flex items-center justify-center rounded-2xl border border-border bg-tile px-5 py-8 shadow-sm sm:py-9"
          >
            <span className="brand-logo">
              <svg
                viewBox={viewBox}
                role="img"
                aria-label={name}
                style={{ color }}
                className="h-6 w-auto max-w-full sm:h-7 lg:h-8"
              >
                <path d={path} fill="currentColor" />
              </svg>
            </span>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
