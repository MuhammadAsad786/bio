'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { LayoutGrid, ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { AppMeta } from '@/components/ui/AppMeta';
import { AppCatalogue } from '@/components/sections/AppCatalogue';
import SmartImage from '@/components/ui/SmartImage';
import { asset } from '@/lib/basePath';
import { featuredApps, appCount, appSlug, installsLabel, type AppItem } from '@/data/apps';
import { getCaseStudy } from '@/data/case-studies';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

function FeaturedAppCard({ app, style }: { app: AppItem; style?: CSSProperties }) {
  const shots = (app.shots ?? []).slice(0, 3);
  const hasCaseStudy = Boolean(getCaseStudy(appSlug(app)));
  return (
    <Link
      href={`/apps/${appSlug(app)}/`}
      style={style}
      data-cursor="View"
      className="card-lift group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm"
    >
      {hasCaseStudy && (
        <span className="absolute end-3 top-3 z-10 rounded-pill border border-border bg-header px-2.5 py-1 text-fluid-sm font-medium text-brand-text shadow-sm backdrop-blur">
          {t('apps.caseStudy')}
        </span>
      )}
      {/* Screenshot preview — real store screenshots on a clean panel. A fixed 3-up grid with a
          shared aspect ratio gives every card the SAME tray height regardless of whether the
          shots are tall (iOS) or short (Android), so the rows below line up across all cards. */}
      {shots.length > 0 && (
        <div className="grid grid-cols-3 gap-2.5 border-b border-border bg-bg-alt p-4 sm:gap-3 sm:p-5">
          {shots.map((src, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={src}
              src={asset(src)}
              alt={t('apps.screenshotAlt', { name: app.name, n: i + 1 })}
              loading="lazy"
              decoding="async"
              className="aspect-[1/2] w-full rounded-lg object-cover object-top shadow-md ring-1 ring-black/10 transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
            />
          ))}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-3.5">
          <div className="relative h-12 w-12 flex-none overflow-hidden rounded-[0.9rem] border border-border bg-bg-alt shadow-sm">
            <SmartImage src={app.icon} alt="" fill className="object-cover" sizes="48px" />
          </div>
          {/* Reserve two lines so single- and double-line titles keep the meta row aligned */}
          <h3 className="line-clamp-2 min-w-0 min-h-[2.6em] text-fluid-lg font-semibold leading-snug text-text transition-colors group-hover:text-brand-text">
            {app.name}
          </h3>
        </div>
        <div className="mt-3">
          <AppMeta app={app} />
        </div>
        <span className="link-underline mt-auto inline-flex items-center gap-2 pt-5 font-medium text-text">
          {t('apps.viewDetails')}
          <ArrowUpRight size={16} aria-hidden="true" className="rtl-flip" />
        </span>
      </div>
    </Link>
  );
}

export function Apps() {
  useLocale(); // re-render on language switch
  return (
    <Section id="projects">
      <Reveal>
        <SectionHeading
          icon={LayoutGrid}
          eyebrow={t('apps.eyebrow')}
          title={t('apps.title', { count: appCount, installs: installsLabel })}
          description={t('apps.description')}
        />
      </Reveal>

      {/* Featured spotlight — larger cards, single staggered cascade */}
      <Reveal className="mt-10 grid gap-6 stagger sm:grid-cols-2 lg:grid-cols-3">
        {featuredApps.map((app, i) => (
          <FeaturedAppCard
            key={app.storeUrl}
            app={app}
            style={{ '--i': i } as CSSProperties}
          />
        ))}
      </Reveal>

      {/* Full, filterable catalogue */}
      <AppCatalogue />
    </Section>
  );
}
