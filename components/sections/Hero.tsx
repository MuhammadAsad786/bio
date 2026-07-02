'use client';

import { ChevronDown, FolderGit2, Mail, TrendingUp } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SocialIcons } from '@/components/ui/SocialIcons';
import { RotatingText } from '@/components/ui/RotatingText';
import { Magnetic } from '@/components/ui/Magnetic';
import { HeroTechField } from '@/components/sections/HeroTechField';
import { getProfile } from '@/data/profile';
import { installsLabel } from '@/data/apps';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

export function Hero() {
  useLocale(); // re-render on language switch
  const p = getProfile();
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col justify-center"
      style={{
        paddingTop: 'max(env(safe-area-inset-top), 6rem)',
        paddingBottom: 'max(env(safe-area-inset-bottom), 4rem)',
      }}
    >
      {/* Very faint warm wash at the top — decorative only */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-ember-radial" />

      {/* Ambient looping tech-stack icons in the side gutters (desktop only) */}
      <HeroTechField />

      <Container>
        <div className="mx-auto max-w-3xl text-center animate-rise">
          <span className="inline-flex items-center gap-2 rounded-pill border border-border bg-brand-tint px-3 py-1.5 text-fluid-sm text-brand-strong">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {t('cta.available')}
          </span>

          <p className="mt-6 font-mono text-fluid-sm uppercase tracking-[0.2em] text-brand-text">
            {p.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-3 break-balance text-fluid-display font-bold leading-[1.02] text-text"
          >
            {p.name}
            <span className="text-brand">.</span>
          </h1>

          <p className="mt-4 text-fluid-xl font-semibold leading-tight text-text">
            {t('hero.iBuildFor')}{' '}
            <RotatingText
              className="font-bold text-brand-text"
              words={[
                t('hero.word.ios'),
                t('hero.word.android'),
                t('hero.word.web'),
                t('hero.word.realtime'),
              ]}
            />
          </p>

          <p className="mx-auto mt-5 max-w-xl text-fluid-base text-subtle">{p.tagline}</p>

          {/* Social proof — sum of every app's public Google Play install-bracket floor */}
          <div className="mt-7 flex justify-center">
            <span className="inline-flex items-center gap-2.5 rounded-pill border border-border bg-surface px-4 py-2 shadow-sm">
              <TrendingUp className="h-4 w-4 flex-none text-brand" aria-hidden="true" />
              <span className="text-fluid-base">
                <span className="font-bold text-text">
                  {t('hero.downloads', { count: installsLabel })}
                </span>{' '}
                <span className="text-subtle">{t('hero.acrossStores')}</span>
              </span>
            </span>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <Button href={p.ctas.primary.href} variant="primary" icon={FolderGit2}>
                {p.ctas.primary.label}
              </Button>
            </Magnetic>
            <Button href={p.ctas.secondary.href} variant="secondary" icon={Mail}>
              {p.ctas.secondary.label}
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
            {p.stats.map((s) => (
              <li
                key={s.label}
                className="rounded-pill border border-border bg-surface px-3 py-1.5 shadow-sm"
              >
                <span className="font-semibold text-text">{s.value}</span>{' '}
                <span className="text-fluid-sm text-muted">{s.label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-center">
            <SocialIcons socials={p.socials} />
          </div>
        </div>
      </Container>

      {/* Scroll cue — invites the user into the page; hidden on short viewports */}
      <a
        href="#about"
        aria-label={t('hero.scroll')}
        data-cursor={t('cursor.scroll')}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-faint transition-colors hover:text-brand-text sm:[@media(min-height:720px)]:block"
      >
        <ChevronDown className="scroll-cue h-6 w-6" aria-hidden="true" />
      </a>
    </section>
  );
}
