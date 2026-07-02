'use client';

import { HelpCircle, ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { getAskConfig } from '@/data/ask-asad';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

// FAQ — asymmetric layout: a sticky heading + "still have a question?" CTA on the left, an
// interactive accordion on the right (see FaqAccordion: cursor-spotlight glow + animated
// answer reveal). Theme-aware, responsive, and reduced-motion safe.
export function Faq() {
  useLocale(); // re-render on language switch
  const askConfig = getAskConfig();
  return (
    <Section id="faq" divided>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:gap-16">
        {/* Left rail — heading + contact CTA (sticky on large screens) */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            icon={HelpCircle}
            eyebrow={t('faq.eyebrow')}
            title={t('faq.title')}
            description={t('faq.description')}
          />
          <Reveal delay={120} className="mt-8">
            <div className="rounded-2xl border border-border bg-bg-alt p-5">
              <p className="font-display text-fluid-base font-semibold text-text">
                {t('faq.stillHaveQ')}
              </p>
              <p className="mt-1.5 text-fluid-sm leading-relaxed text-subtle">
                {t('faq.askPre')} <span className="font-medium text-text">{askConfig.name}</span>{' '}
                {t('faq.askPost')}
              </p>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-1.5 rounded-pill bg-primary px-4 py-2 text-fluid-sm font-medium text-bg shadow-sm transition-colors hover:bg-primary-hover"
              >
                {t('faq.getInTouch')}
                <ArrowRight size={15} aria-hidden="true" className="rtl-flip" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Interactive accordion (client) */}
        <FaqAccordion />
      </div>
    </Section>
  );
}
