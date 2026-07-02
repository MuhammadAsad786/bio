'use client';

import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';
import { FaApple, FaGooglePlay } from 'react-icons/fa6';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import SmartImage from '@/components/ui/SmartImage';
import { AppScreens } from '@/components/sections/AppScreens';
import { getApps, getLocalizedAppBySlug, appSlug, formatInstalls, categoryLabel, type AppItem } from '@/data/apps';
import { getCaseStudy } from '@/data/case-studies';
import { t, plural } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-surface px-3 py-1.5 text-fluid-sm shadow-sm">
      {children}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt className="text-fluid-sm text-subtle">{label}</dt>
      <dd className="text-end font-medium text-text">
        <bdi>{value}</bdi>
      </dd>
    </div>
  );
}

// iOS gives ISO dates (2026-05-11); Play gives human ones (May 19, 2026). Normalise ISO → readable.
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

// Client view for /apps/<slug>/ — re-renders on language switch (localized summary + scraped store
// description from getLocalizedAppBySlug; category label via categoryLabel).
export function AppDetailView({ slug }: { slug: string }) {
  useLocale();
  const app = getLocalizedAppBySlug(slug);
  if (!app) return null;

  const Store = app.platform === 'ios' ? FaApple : FaGooglePlay;
  const storeName = app.platform === 'ios' ? 'App Store' : 'Google Play';
  const strongRating = app.rating && app.rating >= 3.9 ? app.rating : undefined;
  const downloads = app.installs
    ? t('app.downloads', { count: formatInstalls(app.installs) })
    : undefined;
  const related: AppItem[] = getApps()
    .filter((a) => a.category === app.category && appSlug(a) !== slug)
    .slice(0, 4);
  const caseStudy = getCaseStudy(slug);

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
              href="/#projects"
              className="link-underline inline-flex items-center gap-1.5 text-fluid-sm font-medium text-subtle transition-colors hover:text-text"
            >
              <ArrowLeft size={16} aria-hidden="true" className="rtl-flip" />
              {t('app.allApps')}
            </Link>

            <div className="mt-7 flex flex-col gap-6 animate-rise sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div className="flex items-center gap-5">
                <div className="relative h-24 w-24 flex-none overflow-hidden rounded-[1.6rem] border border-border bg-bg-alt shadow-md ring-1 ring-black/5 sm:h-28 sm:w-28">
                  <SmartImage
                    src={app.icon}
                    alt={t('apps.iconAlt', { name: app.name })}
                    fill
                    priority
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-fluid-sm uppercase tracking-[0.2em] text-brand-text">
                    {categoryLabel(app.category)}
                  </p>
                  <h1 className="mt-1.5 text-fluid-2xl font-bold leading-tight text-text">{app.name}</h1>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Chip>
                      <Store size={13} aria-hidden="true" />
                      {storeName}
                    </Chip>
                    {strongRating && (
                      <Chip>
                        <Star size={13} aria-hidden="true" className="fill-brand-text text-brand-text" />
                        <span className="font-semibold text-text">{strongRating.toFixed(1)}</span>
                        {app.ratingCount ? (
                          <span className="text-subtle">({app.ratingCount.toLocaleString()})</span>
                        ) : null}
                      </Chip>
                    )}
                    {downloads && <Chip>{downloads}</Chip>}
                  </div>
                </div>
              </div>

              <div className="flex-none">
                <Button href={app.storeUrl} variant="primary">
                  <Store size={18} aria-hidden="true" />
                  {app.platform === 'ios' ? t('app.viewAppStore') : t('app.getOnPlay')}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <Container>
        {/* ---- Preview gallery ---- */}
        {app.shots?.length ? (
          <section className="py-12 sm:py-16">
            <Reveal>
              <h2 className="font-display text-fluid-xl font-bold text-text">{t('app.preview')}</h2>
              <p className="mt-1.5 text-fluid-sm text-subtle">
                {t('app.screenshotsFrom', { count: app.shots.length, store: storeName })}
              </p>
            </Reveal>
            <div className="mt-7">
              <AppScreens shots={app.shots} name={app.name} />
            </div>
          </section>
        ) : null}

        {/* ---- About + information ---- */}
        <section className="border-t border-border py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <Reveal>
              <h2 className="font-display text-fluid-xl font-bold text-text">{t('app.aboutThis')}</h2>
              <p className="mt-4 max-w-2xl text-fluid-lg font-medium leading-relaxed text-text">
                {app.summary}
              </p>
              {app.details?.description && (
                <p className="mt-5 max-w-2xl whitespace-pre-line text-fluid-base leading-relaxed text-subtle">
                  {app.details.description}
                </p>
              )}
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
                <h3 className="font-mono text-fluid-sm uppercase tracking-[0.18em] text-subtle">
                  {t('app.information')}
                </h3>
                <dl className="mt-2 divide-y divide-border">
                  <InfoRow label={t('app.info.platform')} value={app.platform === 'ios' ? 'iOS' : 'Android'} />
                  {app.details?.developer && <InfoRow label={t('app.info.developer')} value={app.details.developer} />}
                  <InfoRow label={t('app.info.category')} value={categoryLabel(app.category)} />
                  {strongRating && (
                    <InfoRow
                      label={t('app.info.rating')}
                      value={
                        <span className="inline-flex items-center gap-1">
                          <Star size={13} aria-hidden="true" className="fill-brand-text text-brand-text" />
                          {strongRating.toFixed(1)}
                        </span>
                      }
                    />
                  )}
                  {downloads && <InfoRow label={t('app.info.downloads')} value={formatInstalls(app.installs!)} />}
                  {app.details?.version && <InfoRow label={t('app.info.version')} value={app.details.version} />}
                  {app.details?.sizeMB ? <InfoRow label={t('app.info.size')} value={t('app.sizeValue', { n: app.details.sizeMB })} /> : null}
                  {app.details?.updated && <InfoRow label={t('app.info.updated')} value={fmtDate(app.details.updated)} />}
                  {app.details?.age && <InfoRow label={t('app.info.ageRating')} value={app.details.age} />}
                  {app.details?.languages ? (
                    <InfoRow
                      label={t('app.info.languages')}
                      value={plural(app.details.languages, 'app.lang')}
                    />
                  ) : null}
                </dl>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- Case study ---- */}
        {caseStudy && (
          <section className="border-t border-border py-12 sm:py-16">
            <Reveal>
              <p className="font-mono text-fluid-sm uppercase tracking-[0.2em] text-brand-text">
                {t('app.caseStudy')}
              </p>
              <h2 className="mt-2 font-display text-fluid-xl font-bold text-text">{t('app.howBuilt')}</h2>
              <p className="mt-2 text-fluid-sm text-subtle">{caseStudy.role}</p>
            </Reveal>

            {caseStudy.metrics.length > 0 && (
              <Reveal className="stagger mt-8 grid grid-cols-3 gap-3 sm:max-w-xl">
                {caseStudy.metrics.map((m, i) => (
                  <div
                    key={m.label}
                    style={{ ['--i']: i } as React.CSSProperties}
                    className="rounded-xl border border-border bg-surface p-4 text-center shadow-sm"
                  >
                    <div className="font-display text-fluid-lg font-bold leading-none text-text">
                      {m.value}
                    </div>
                    <div className="mt-1.5 text-fluid-sm text-subtle">{m.label}</div>
                  </div>
                ))}
              </Reveal>
            )}

            <Reveal className="mt-10 grid gap-8 sm:grid-cols-2 lg:max-w-4xl">
              {[
                { label: t('app.cs.problem'), text: caseStudy.problem },
                { label: t('app.cs.challenge'), text: caseStudy.challenge },
                { label: t('app.cs.solution'), text: caseStudy.solution },
                { label: t('app.cs.result'), text: caseStudy.result },
              ].map((b) => (
                <div key={b.label}>
                  <h3 className="font-mono text-fluid-sm uppercase tracking-[0.15em] text-brand-text">
                    {b.label}
                  </h3>
                  <p className="mt-2 text-fluid-base leading-relaxed text-subtle">{b.text}</p>
                </div>
              ))}
            </Reveal>
          </section>
        )}

        {/* ---- Related ---- */}
        {related.length > 0 && (
          <section className="border-t border-border py-12 sm:py-16">
            <Reveal>
              <h2 className="font-display text-fluid-xl font-bold text-text">
                {t('app.moreIn', { category: categoryLabel(app.category) })}
              </h2>
            </Reveal>
            <Reveal className="mt-6 grid gap-4 stagger sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r, i) => (
                <Link
                  key={appSlug(r)}
                  href={`/apps/${appSlug(r)}/`}
                  style={{ ['--i']: i } as React.CSSProperties}
                  className="card-lift group flex items-center gap-3 rounded-xl border border-border bg-surface p-3.5 shadow-sm"
                >
                  <div className="relative h-12 w-12 flex-none overflow-hidden rounded-[0.85rem] border border-border bg-bg-alt">
                    <SmartImage src={r.icon} alt={t('apps.iconAlt', { name: r.name })} fill className="object-cover" sizes="48px" />
                  </div>
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
