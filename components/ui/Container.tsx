import { cn } from '@/lib/cn';

// Centers content on huge screens, caps line length, and adds safe-area-aware
// horizontal padding so content clears the notch in landscape.
export function Container({
  children,
  className,
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn('mx-auto w-full', wide ? 'max-w-hero' : 'max-w-content', className)}
      style={{
        paddingInlineStart: 'max(env(safe-area-inset-left), clamp(1rem, 4vw, 2.5rem))',
        paddingInlineEnd: 'max(env(safe-area-inset-right), clamp(1rem, 4vw, 2.5rem))',
      }}
    >
      {children}
    </div>
  );
}
