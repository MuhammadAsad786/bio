'use client';

import { type CSSProperties, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SmartImage from '@/components/ui/SmartImage';
import { AppMeta } from '@/components/ui/AppMeta';
import { cn } from '@/lib/cn';
import { apps, APP_CATEGORIES, appSlug, categoryLabel, type AppItem, type AppPlatform } from '@/data/apps';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

function AppCard({ app, style }: { app: AppItem; style?: CSSProperties }) {
  return (
    <Link
      href={`/apps/${appSlug(app)}/`}
      style={style}
      data-cursor="View"
      className="card-lift group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm"
    >
      <div className="relative h-14 w-14 flex-none overflow-hidden rounded-[0.9rem] border border-border bg-bg-alt">
        <SmartImage src={app.icon} alt={t('apps.iconAlt', { name: app.name })} fill className="object-cover" sizes="56px" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate font-semibold text-text transition-colors group-hover:text-brand-text">
            {app.name}
          </h3>
          <ArrowUpRight
            size={16}
            aria-hidden="true"
            className="rtl-flip flex-none text-muted transition-colors group-hover:text-brand-text"
          />
        </div>
        <div className="mt-1.5">
          <AppMeta app={app} />
        </div>
      </div>
    </Link>
  );
}

type Category = (typeof APP_CATEGORIES)[number];

// Shared pill styling for both filter rows.
function chipClass(active: boolean): string {
  return cn(
    'inline-flex min-h-[40px] items-center gap-1.5 rounded-pill border px-4 text-fluid-sm transition-colors',
    active
      ? 'border-text bg-text text-bg'
      : 'border-border text-muted hover:border-border-strong hover:text-text',
  );
}

export function AppCatalogue() {
  useLocale(); // re-render on language switch
  const FILTERS: { key: 'all' | AppPlatform; label: string }[] = [
    { key: 'all', label: t('catalogue.all') },
    { key: 'ios', label: t('catalogue.platform.ios') },
    { key: 'android', label: t('catalogue.platform.android') },
  ];
  const [filter, setFilter] = useState<'all' | AppPlatform>('all');
  const [category, setCategory] = useState<'all' | Category>('all');

  const counts = {
    all: apps.length,
    ios: apps.filter((a) => a.platform === 'ios').length,
    android: apps.filter((a) => a.platform === 'android').length,
  };

  // Platform narrows first; category counts reflect the active platform so they stay accurate.
  const platformVisible = filter === 'all' ? apps : apps.filter((a) => a.platform === filter);
  const visible =
    category === 'all' ? platformVisible : platformVisible.filter((a) => a.category === category);
  const catKey = `${filter}-${category}`;

  return (
    <div className="mt-20">
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label={t('catalogue.filterPlatformAria')}
      >
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={chipClass(filter === f.key)}
          >
            {f.label}
            <span className="opacity-60">{counts[f.key]}</span>
          </button>
        ))}
      </div>

      {/* Category filter — combines with the platform filter above */}
      <div
        className="mt-3 flex flex-wrap items-center gap-2"
        role="group"
        aria-label={t('catalogue.filterCategoryAria')}
      >
        <button
          type="button"
          onClick={() => setCategory('all')}
          aria-pressed={category === 'all'}
          className={chipClass(category === 'all')}
        >
          {t('catalogue.allCategories')}
          <span className="opacity-60">{platformVisible.length}</span>
        </button>
        {APP_CATEGORIES.map((cat) => {
          const n = platformVisible.filter((a) => a.category === cat).length;
          if (n === 0) return null;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={chipClass(category === cat)}
            >
              {categoryLabel(cat)}
              <span className="opacity-60">{n}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 space-y-14">
        {APP_CATEGORIES.map((cat) => {
          const list = visible.filter((a) => a.category === cat);
          if (list.length === 0) return null;
          return (
            <div key={cat}>
              <h3 className="text-fluid-lg font-semibold text-text">
                {categoryLabel(cat)} <span className="font-normal text-subtle">· {list.length}</span>
              </h3>
              {/* keyed by the active filters so switching remounts and replays the entrance */}
              <div
                key={catKey}
                className="cat-grid mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
              >
                {list.map((app, i) => (
                  <AppCard
                    key={app.storeUrl}
                    app={app}
                    style={{ '--i': Math.min(i, 8) } as CSSProperties}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
