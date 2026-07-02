import { Star } from 'lucide-react';
import { FaApple, FaGooglePlay } from 'react-icons/fa6';
import type { AppItem } from '@/data/apps';

// Platform badge + (strong) store rating. Plain component — safe in server or client.
export function AppMeta({ app }: { app: AppItem }) {
  const Store = app.platform === 'ios' ? FaApple : FaGooglePlay;
  return (
    <div className="flex items-center gap-3 text-fluid-sm text-subtle">
      <span className="inline-flex items-center gap-1.5">
        <Store size={13} aria-hidden="true" />
        {app.platform === 'ios' ? 'App Store' : 'Google Play'}
      </span>
      {app.rating && app.rating >= 3.9 && (
        <span className="inline-flex items-center gap-1 text-text">
          <Star size={12} aria-hidden="true" className="fill-brand-text text-brand-text" />
          {app.rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
