'use client';

import { Container } from '@/components/ui/Container';
import { SocialIcons } from '@/components/ui/SocialIcons';
import { LangSwitch } from '@/components/ui/LangSwitch';
import { asset } from '@/lib/basePath';
import { getProfile } from '@/data/profile';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

export function Footer() {
  useLocale(); // re-render on language switch
  const profile = getProfile();
  const LINKS = [
    { id: 'about', label: t('nav.about') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'projects', label: t('nav.work') },
    { id: 'process', label: t('nav.process') },
    { id: 'reviews', label: t('nav.reviews') },
    { id: 'faq', label: t('nav.faq') },
    { id: 'contact', label: t('nav.contact') },
  ];
  return (
    <footer className="border-t border-border bg-bg-alt">
      <Container className="py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <a
              href={`${asset('/')}#hero`}
              className="font-display text-fluid-lg font-bold text-text"
            >
              {profile.name}
              <span className="text-brand">.</span>
            </a>
            <p className="mt-2 text-fluid-sm text-muted">
              {t('footer.tagline', { eyebrow: profile.eyebrow })}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <SocialIcons socials={profile.socials} />
              <LangSwitch />
            </div>
          </div>

          <nav
            aria-label={t('a11y.footerNav')}
            className="grid grid-cols-2 gap-x-10 gap-y-2 sm:gap-x-14"
          >
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`${asset('/')}#${l.id}`}
                className="text-fluid-sm text-muted transition-colors hover:text-text"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-1 border-t border-border pt-6 text-fluid-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{t('footer.copy', { name: profile.name })}</p>
          <p>{t('footer.built')}</p>
        </div>
      </Container>
    </footer>
  );
}
