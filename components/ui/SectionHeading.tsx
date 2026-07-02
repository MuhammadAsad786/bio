import type { ComponentType } from 'react';
import type { IconProps } from '@/lib/icons';

export function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon?: ComponentType<IconProps>;
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {(Icon || eyebrow) && (
        <div className="flex items-center gap-2.5">
          {Icon && (
            <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-sm border border-border bg-surface text-brand-text shadow-sm">
              <Icon size={18} aria-hidden="true" />
            </span>
          )}
          {eyebrow && (
            <p className="font-mono text-fluid-sm uppercase tracking-[0.2em] text-brand-text">
              {eyebrow}
            </p>
          )}
        </div>
      )}
      <h2 className="mt-3 text-fluid-2xl font-bold leading-[1.12] text-text">{title}</h2>
      {description && <p className="mt-3 text-fluid-base text-subtle">{description}</p>}
    </div>
  );
}
