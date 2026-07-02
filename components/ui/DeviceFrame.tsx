import { cn } from '@/lib/cn';
import SmartImage from '@/components/ui/SmartImage';

// Pure-CSS device frames for app art (no bezel image asset, so basePath-safe).
// `window` = landscape app-window; `phone` = portrait handset for real screenshots.
export function DeviceFrame({
  src,
  alt,
  variant = 'window',
  priority = false,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  variant?: 'window' | 'phone';
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  if (variant === 'phone') {
    // Real screenshots already include their own status bar, so no island overlay
    // here — just a clean, dark handset bezel.
    return (
      <div
        className={cn(
          'relative mx-auto w-full overflow-hidden rounded-[2rem] border-[5px] border-[#111317] bg-[#111317] shadow-lg ring-1 ring-black/5',
          className,
        )}
      >
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.65rem] bg-bg-alt">
          <SmartImage
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-cover"
            sizes={sizes ?? '(max-width: 640px) 60vw, 240px'}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-surface shadow-lg',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="flex items-center gap-1.5 border-b border-border px-4 py-3"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
      </div>
      <div className="relative aspect-[16/10] bg-bg-alt">
        <SmartImage
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes={sizes ?? '(max-width: 1024px) 100vw, 880px'}
        />
      </div>
    </div>
  );
}
