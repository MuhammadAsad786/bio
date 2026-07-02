'use client';

import type { ComponentType } from 'react';
import { MapPin, Clock, Sparkles, Mail } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SocialIcons } from '@/components/ui/SocialIcons';
import { Reveal } from '@/components/ui/Reveal';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { ContactForm } from '@/components/form/ContactForm';
import { getProfile } from '@/data/profile';
import type { IconProps } from '@/lib/icons';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

export function Contact() {
  useLocale(); // re-render on language switch
  const profile = getProfile();
  const META: { icon: ComponentType<IconProps>; label: string; value: string }[] = [
    { icon: MapPin, label: t('contact.meta.location'), value: profile.location },
    { icon: Clock, label: t('contact.meta.response'), value: t('contact.meta.responseValue') },
    { icon: Sparkles, label: t('contact.meta.openTo'), value: t('contact.meta.openToValue') },
  ];
  return (
    <Section id="contact" divided className="bg-ember-radial">
      {/* Header — centred, with a live availability pill */}
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-3.5 py-1.5 text-fluid-sm font-medium text-subtle shadow-sm">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          {t('cta.available')}
        </span>

        <h2 className="mt-5 text-fluid-3xl font-bold leading-[1.1] text-text">{t('contact.title')}</h2>
        <p className="mx-auto mt-4 max-w-xl text-fluid-base text-subtle">{t('contact.subtitle')}</p>
      </Reveal>

      {/* Main — asymmetric 2 / 3 split */}
      <div className="mt-12 grid gap-6 lg:grid-cols-5 lg:gap-8">
        {/* Connect panel */}
        <Reveal className="lg:col-span-2">
          <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-lg sm:p-7">
            <h3 className="text-fluid-lg font-semibold text-text">{t('contact.reachDirectly')}</h3>
            <p className="mt-1 text-fluid-sm text-subtle">{t('contact.reachSub')}</p>

            {/* Prominent email block */}
            <div className="group mt-5 flex items-center gap-3 rounded-xl border border-border bg-brand-tint p-3.5">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-border bg-surface text-brand-text shadow-sm">
                <Mail size={20} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-fluid-sm text-muted">{t('contact.email')}</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="link-underline block truncate font-medium text-text"
                >
                  <bdi>{profile.email}</bdi>
                </a>
              </div>
              <CopyEmail email={profile.email} />
            </div>

            {/* Info rows */}
            <dl className="mt-4 grid gap-3">
              {META.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-bg-alt px-4 py-3"
                >
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-border bg-surface text-brand-text shadow-sm">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-fluid-sm text-muted">{label}</dt>
                    <dd className="font-medium text-text">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            {/* Socials pinned to the bottom */}
            <div className="mt-auto border-t border-border pt-6">
              <p className="mb-3 font-mono text-fluid-sm uppercase tracking-[0.2em] text-subtle">
                {t('common.findMeOn')}
              </p>
              <SocialIcons socials={profile.socials} />
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={120} className="lg:col-span-3">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
