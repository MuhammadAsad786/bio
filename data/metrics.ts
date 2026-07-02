import type { Metric } from '@/lib/types';
import { apps, appCount, installsLabel } from '@/data/apps';
import { t } from '@/lib/i18n';

// Impact metrics shown in the Statement band. Mostly derived from real app data so they stay
// truthful and in sync; `installsLabel` is the manual career-wide figure (see data/apps.ts).
const rated = apps.filter((a) => typeof a.rating === 'number');
const avgRating = rated.length
  ? rated.reduce((sum, a) => sum + (a.rating as number), 0) / rated.length
  : 0;

// Labels via t() so they reflect the current locale at render time.
export const getMetrics = (): Metric[] => [
  { icon: 'downloads', value: installsLabel, label: t('metrics.downloads') },
  { icon: 'apps', value: `${appCount}+`, label: t('metrics.apps') },
  { icon: 'rating', value: avgRating ? `${avgRating.toFixed(1)}★` : '4.6★', label: t('metrics.rating') },
  { icon: 'years', value: '7+', label: t('metrics.years') },
];
