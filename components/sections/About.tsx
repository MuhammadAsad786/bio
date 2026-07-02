'use client';

import {
  UserRound,
  Smartphone,
  Cast,
  Wifi,
  Cloud,
  MonitorPlay,
  Database,
  Layers,
  Rocket,
  LayoutGrid,
  CalendarDays,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SocialIcons } from '@/components/ui/SocialIcons';
import { SkillIcon } from '@/components/ui/SkillIcon';
import SmartImage from '@/components/ui/SmartImage';
import { Reveal } from '@/components/ui/Reveal';
import { getProfile } from '@/data/profile';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

const FOCUS_ICONS = [Smartphone, Cast, Wifi, Cloud, MonitorPlay, Database, Layers, Rocket];
const FOCUS_KEYS = [
  'native',
  'casting',
  'connectivity',
  'cloud',
  'enterprise',
  'backend',
  'architecture',
  'ship',
] as const;

export function About() {
  useLocale(); // re-render on language switch
  const p = getProfile();
  const FOCUS = FOCUS_KEYS.map((k, i) => ({
    icon: FOCUS_ICONS[i],
    title: t(`about.focus.${k}.title`),
    text: t(`about.focus.${k}.text`),
  }));
  return (
    <Section id="about" divided>
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        {/* Narrative */}
        <Reveal>
          <SectionHeading icon={UserRound} eyebrow={t('about.eyebrow')} title={t('about.title')} />
          <div className="max-w-2xl">
            <p className="mt-5 text-fluid-base text-subtle">{p.bio}</p>
            <p className="mt-4 text-fluid-base text-subtle">{t('about.para2')}</p>
          </div>
        </Reveal>

        {/* Profile card */}
        <Reveal delay={120}>
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg transition-shadow duration-300 hover:shadow-glow">
            {/* Header — soft brand wash */}
            <div className="relative border-b border-border bg-gradient-to-br from-brand-tint via-surface to-surface px-6 pt-6 sm:px-8 sm:pt-7">
              <div className="flex items-center gap-4">
                <span className="relative flex-none" aria-hidden={p.photo ? undefined : 'true'}>
                  {/* Static brand glow behind the avatar (no blur — cheap) */}
                  <span className="pointer-events-none absolute -inset-2 rounded-full bg-[radial-gradient(circle_at_center,var(--brand)_0%,transparent_70%)] opacity-25" />
                  {p.photo ? (
                    <span className="relative block h-16 w-16 overflow-hidden rounded-2xl shadow-md ring-2 ring-surface">
                      <SmartImage
                        src={p.photo}
                        alt={p.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 object-cover"
                      />
                      <span className="absolute -bottom-0.5 -end-0.5 h-4 w-4 rounded-full border-2 border-surface bg-success" />
                    </span>
                  ) : (
                    <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-text to-brand-strong font-display text-fluid-xl font-bold text-bg shadow-md ring-2 ring-surface">
                      {initials(p.name)}
                      <span className="absolute -bottom-0.5 -end-0.5 h-4 w-4 rounded-full border-2 border-surface bg-success" />
                    </span>
                  )}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-fluid-xl font-bold text-text">{p.name}</p>
                  <p className="mt-0.5 text-fluid-sm leading-snug text-subtle">{p.role}</p>
                </div>
              </div>

              <span className="mb-6 mt-5 inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-3 py-1.5 text-fluid-sm font-medium text-brand-strong shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                {t('cta.available')}
              </span>
            </div>

            {/* Body */}
            <div className="px-6 py-6 sm:px-8">
              {/* Headline metrics */}
              <div className="grid grid-cols-2 gap-3">
                {p.stats.slice(0, 2).map((s, i) => {
                  const Glyph = i === 0 ? LayoutGrid : CalendarDays;
                  return (
                    <div
                      key={s.label}
                      className="group/stat relative overflow-hidden rounded-xl border border-border bg-bg-alt p-4 transition-all duration-300 hover:border-border-strong hover:shadow-md"
                    >
                      {/* Decorative brand-hue watermark glyph */}
                      <Glyph
                        size={56}
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-2 -top-2 text-brand opacity-[0.08] transition-transform duration-300 group-hover/stat:scale-110"
                      />
                      <p className="relative font-display text-fluid-2xl font-bold leading-none text-text">{s.value}</p>
                      <p className="relative mt-1.5 text-fluid-sm text-subtle">{s.label}</p>
                    </div>
                  );
                })}
              </div>

              {/* Platform chips */}
              <div className="mt-3 grid grid-cols-2 gap-3">
                {p.stats.slice(2).map((s) => {
                  const text = `${s.value} ${s.label}`.toLowerCase();
                  const icon = /ios|apple|app store/.test(text)
                    ? 'apple'
                    : /android|play/.test(text)
                      ? 'android'
                      : undefined;
                  return (
                    <div
                      key={s.label}
                      className="group/chip flex items-center gap-2.5 rounded-xl border border-border bg-surface px-3.5 py-3 shadow-sm transition-all duration-300 hover:border-border-strong hover:shadow-md"
                    >
                      {icon && (
                        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-bg-alt text-text transition-colors duration-300 group-hover/chip:bg-brand-tint group-hover/chip:text-brand-text">
                          <SkillIcon name={icon} size={16} />
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-semibold leading-tight text-text">{s.value}</p>
                        <p className="truncate text-fluid-sm text-subtle">{s.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Find me on */}
              <div className="mt-6 border-t border-border pt-5">
                <p className="mb-3 font-mono text-fluid-sm uppercase tracking-[0.2em] text-subtle">
                  {t('common.findMeOn')}
                </p>
                <SocialIcons socials={p.socials} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Capabilities */}
      <Reveal>
        <div className="mt-14">
          <h3 className="font-mono text-fluid-sm uppercase tracking-[0.2em] text-subtle">
            {t('about.focusHeading')}
          </h3>
          <ul className="mt-6 grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {FOCUS.map((f) => {
              const Icon = f.icon;
              return (
                <li key={f.title} className="flex gap-3">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-border bg-surface text-brand-text shadow-sm">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-text">{f.title}</p>
                    <p className="mt-0.5 text-fluid-sm text-subtle">{f.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
