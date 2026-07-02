'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, ExternalLink, Github, Globe } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SkillIcon } from '@/components/ui/SkillIcon';
import { TechFlow } from '@/components/ui/TechFlow';
import {
  allSkills,
  getSkillBySlug,
  skillSlug,
  localizeSkillGroup,
  localizeTechFlow,
  type FlatSkill,
} from '@/data/skills';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

// ISO (2026-06-03) → readable; human dates pass through.
function fmtDate(s?: string): string | undefined {
  if (!s) return undefined;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return s;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Client view for /stack/<slug>/ — re-renders on language switch. The scraped `description` is
// bilingual (descriptionUr); flow-step labels come from the Urdu overlay (localizeTechFlow).
export function StackDetailView({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const skill = getSkillBySlug(slug);
  if (!skill) return null;

  const tech = skill.tech;
  const color = skill.color ?? '#FF6A00';
  const description = locale === 'ur' ? (tech?.descriptionUr ?? tech?.description) : tech?.description;
  const released = fmtDate(tech?.released);
  const flow = localizeTechFlow(slug, tech?.flow);
  const links = [
    tech?.homepage && { icon: Globe, label: t('stack.link.website'), href: tech.homepage },
    tech?.docs && { icon: BookOpen, label: t('stack.link.docs'), href: tech.docs },
    tech?.repo && {
      icon: Github,
      label: t('stack.link.source'),
      href: `https://github.com/${tech.repo}`,
    },
  ].filter(Boolean) as { icon: typeof Globe; label: string; href: string }[];
  const related: FlatSkill[] = allSkills
    .filter((s) => s.group === skill.group && skillSlug(s.name) !== slug)
    .slice(0, 5);

  return (
    <article>
      {/* ---- Hero banner ---- */}
      <header className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-tint via-bg to-bg"
        />
        <Container>
          <div className="py-8 sm:py-12">
            <Link
              href="/#skills"
              className="link-underline inline-flex items-center gap-1.5 text-fluid-sm font-medium text-subtle transition-colors hover:text-text"
            >
              <ArrowLeft size={16} aria-hidden="true" className="rtl-flip" />
              {t('stack.allSkills')}
            </Link>

            <div className="mt-7 flex flex-col gap-6 animate-rise sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div className="flex items-center gap-5">
                <div
                  className="flex h-20 w-20 flex-none items-center justify-center rounded-[1.5rem] shadow-md ring-1 ring-inset ring-black/10 sm:h-24 sm:w-24"
                  style={{ backgroundColor: color }}
                >
                  <SkillIcon
                    name={skill.icon ?? ''}
                    className="h-[44%] w-[44%] text-white drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.35)]"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-fluid-sm uppercase tracking-[0.2em] text-brand-text">
                    {localizeSkillGroup(skill.group)}
                  </p>
                  <h1 className="mt-1.5 text-fluid-2xl font-bold leading-tight text-text">
                    {skill.name}
                  </h1>
                  {tech?.version && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-surface px-3 py-1.5 text-fluid-sm shadow-sm">
                        <span className="text-subtle">{t('stack.latest')}</span>
                        <bdi className="font-semibold text-text">v{tech.version}</bdi>
                      </span>
                      {released && (
                        <span className="inline-flex items-center rounded-pill border border-border bg-surface px-3 py-1.5 text-fluid-sm text-subtle shadow-sm">
                          {t('stack.updated', { date: released })}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <Container>
        {/* ---- Description ---- */}
        {description && (
          <section className="py-12 sm:py-16">
            <Reveal>
              <h2 className="font-display text-fluid-xl font-bold text-text">{t('stack.about')}</h2>
              <p className="mt-4 max-w-3xl whitespace-pre-line text-fluid-lg leading-relaxed text-subtle">
                {description}
              </p>
              {tech?.wikiUrl && (
                <a
                  href={tech.wikiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-4 inline-flex items-center gap-1.5 text-fluid-sm font-medium text-brand-text"
                >
                  {t('stack.readMore')}
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </Reveal>
          </section>
        )}

        {/* ---- How it works (example) ---- */}
        {tech?.example && (
          <section className="border-t border-border py-12 sm:py-16">
            <Reveal>
              <h2 className="font-display text-fluid-xl font-bold text-text">
                {t('stack.howItWorks')}
              </h2>
              <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-bg-alt shadow-sm">
                {tech.exampleLang && (
                  <div className="border-b border-border px-4 py-2 font-mono text-fluid-sm text-subtle">
                    {tech.exampleLang}
                  </div>
                )}
                <pre dir="ltr" className="overflow-x-auto p-4 text-fluid-sm leading-relaxed text-text sm:p-5">
                  <code>{tech.example}</code>
                </pre>
              </div>
            </Reveal>
          </section>
        )}

        {/* ---- Flow diagram ---- */}
        {flow?.length ? (
          <section className="border-t border-border py-12 sm:py-16">
            <Reveal>
              <h2 className="font-display text-fluid-xl font-bold text-text">{t('stack.flow')}</h2>
              <p className="mt-1.5 text-fluid-sm text-subtle">{t('stack.flowSub')}</p>
            </Reveal>
            <div className="mt-7">
              <TechFlow steps={flow} />
            </div>
          </section>
        ) : null}

        {/* ---- Latest changes ---- */}
        {tech?.changes?.length ? (
          <section className="border-t border-border py-12 sm:py-16">
            <Reveal>
              <h2 className="font-display text-fluid-xl font-bold text-text">
                {t('stack.latestChanges')}
              </h2>
              {tech.version && (
                <p className="mt-1.5 text-fluid-sm text-subtle">
                  <bdi>v{tech.version}</bdi>
                  {released ? ` · ${released}` : ''}
                </p>
              )}
              <ul className="mt-5 max-w-3xl space-y-2.5">
                {tech.changes.map((c, i) => (
                  <li key={i} className="flex gap-3 text-fluid-base leading-relaxed text-subtle">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand" />
                    <span dir="auto">{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        ) : null}

        {/* ---- Links ---- */}
        {links.length > 0 && (
          <section className="border-t border-border py-12 sm:py-16">
            <Reveal>
              <h2 className="font-display text-fluid-xl font-bold text-text">{t('stack.links')}</h2>
            </Reveal>
            <Reveal className="mt-6 grid gap-4 stagger sm:grid-cols-2 lg:grid-cols-3">
              {links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ['--i']: i } as React.CSSProperties}
                  className="card-lift group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm"
                >
                  <l.icon size={18} aria-hidden="true" className="flex-none text-brand-text" />
                  <span className="min-w-0 flex-1 truncate font-medium text-text transition-colors group-hover:text-brand-text">
                    {l.label}
                  </span>
                  <ExternalLink size={14} aria-hidden="true" className="flex-none text-faint" />
                </a>
              ))}
            </Reveal>
          </section>
        )}

        {/* ---- Related ---- */}
        {related.length > 0 && (
          <section className="border-t border-border py-12 sm:py-16">
            <Reveal>
              <h2 className="font-display text-fluid-xl font-bold text-text">
                {t('stack.moreIn', { group: localizeSkillGroup(skill.group) })}
              </h2>
            </Reveal>
            <Reveal className="mt-6 grid gap-4 stagger sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <Link
                  key={skillSlug(r.name)}
                  href={`/stack/${skillSlug(r.name)}/`}
                  style={{ ['--i']: i } as React.CSSProperties}
                  className="card-lift group flex items-center gap-3 rounded-xl border border-border bg-surface p-3.5 shadow-sm"
                >
                  <span
                    className="flex h-11 w-11 flex-none items-center justify-center rounded-[0.85rem] ring-1 ring-inset ring-black/10"
                    style={{ backgroundColor: r.color ?? '#FF6A00' }}
                  >
                    <SkillIcon name={r.icon ?? ''} className="h-[46%] w-[46%] text-white" />
                  </span>
                  <span className="min-w-0 truncate font-medium text-text transition-colors group-hover:text-brand-text">
                    {r.name}
                  </span>
                </Link>
              ))}
            </Reveal>
          </section>
        )}
      </Container>
    </article>
  );
}
