import type { ComponentType, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { asset } from '@/lib/basePath';
import type { IconProps } from '@/lib/icons';

type Variant = 'primary' | 'secondary';

// Anchor-based button with an optional leading icon. Internal paths are run through
// asset() so they stay correct under the GitHub Pages basePath; anchors (#...) and
// external/mailto links pass through.
export function Button({
  href,
  children,
  variant = 'primary',
  className,
  icon: Icon,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ComponentType<IconProps>;
}) {
  const base =
    'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm px-6 py-3 transition-[color,background-color,border-color,box-shadow]';
  const styles =
    variant === 'primary'
      ? 'bg-primary font-semibold text-bg shadow-md hover:bg-primary-hover active:bg-primary-press'
      : 'border border-border-strong font-medium text-text shadow-sm hover:border-brand-text hover:text-brand-text hover:shadow-md';

  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  const finalHref = href.startsWith('#') || isExternal ? href : asset(href);

  return (
    <a
      href={finalHref}
      className={cn(base, styles, className)}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {Icon && <Icon size={18} aria-hidden="true" />}
      {children}
    </a>
  );
}
