'use client';

import type { CSSProperties } from 'react';
import { Briefcase } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { getExperience } from '@/data/experience';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

// Career timeline — a hairline rail with brand-dot nodes; entries cascade in via the
// .stagger / --i pattern (frozen under prefers-reduced-motion via the global damper).
export function Experience() {
  useLocale(); // re-render on language switch
  const experience = getExperience();
  return (
    <Section id="experience" divided>
      <SectionHeading
        icon={Briefcase}
        eyebrow={t('exp.eyebrow')}
        title={t('exp.title')}
        description={t('exp.description')}
      />

      <Reveal className="stagger mt-12">
        <ol className="relative ms-1.5 border-s border-border">
          {experience.map((e, i) => (
            <li
              key={`${e.company}-${e.role}`}
              style={{ ['--i']: i } as CSSProperties}
              className="relative ps-7 pb-10 last:pb-0 sm:ps-9"
            >
              {/* Node on the rail */}
              <span
                aria-hidden="true"
                className="absolute -start-[6px] top-1.5 h-3 w-3 rounded-full border-2 border-bg bg-brand shadow-sm"
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-fluid-lg font-semibold text-text">{e.role}</h3>
                <span className="text-fluid-base text-brand-text">{e.company}</span>
              </div>
              {(e.period || e.location) && (
                <p className="mt-1 font-mono text-fluid-sm uppercase tracking-[0.12em] text-muted">
                  {[e.period, e.location].filter(Boolean).join(' · ')}
                </p>
              )}
              <p className="mt-3 max-w-2xl text-fluid-base leading-relaxed text-subtle">
                {e.summary}
              </p>
              {e.highlights.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {e.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-2.5 text-fluid-base text-subtle"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-text"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
