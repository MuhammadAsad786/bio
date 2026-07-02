'use client';

import { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { DeviceFrame } from '@/components/ui/DeviceFrame';

// Looping autoplay gallery of an app's screenshots in phone frames. Autoplay starts when the
// carousel scrolls into view and pauses on hover / drag. Disabled under prefers-reduced-motion
// (it stays a static, draggable strip). Embla + autoplay are already in package.json.
export function AppScreens({ shots, name }: { shots: string[]; name: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true }, [
    Autoplay({ delay: 2200, stopOnInteraction: false, stopOnMouseEnter: true, playOnInit: false }),
  ]);

  useEffect(() => {
    if (!emblaApi) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const autoplay = emblaApi.plugins().autoplay;
    if (!autoplay) return;
    const root = emblaApi.rootNode();
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? autoplay.play() : autoplay.stop()),
      { threshold: 0.3 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [emblaApi]);

  if (!shots.length) return null;

  return (
    <div className="embla -mx-4 overflow-hidden px-4" ref={emblaRef} data-cursor="Drag">
      <div className="flex gap-4 py-3 sm:gap-5">
        {shots.map((src, i) => (
          <div key={src} className="w-40 flex-none sm:w-44 lg:w-48">
            <div className="transition-transform duration-300 ease-out hover:-translate-y-1">
              <DeviceFrame
                variant="phone"
                src={src}
                alt={`${name} screenshot ${i + 1}`}
                priority={i === 0}
                sizes="(max-width: 640px) 40vw, 192px"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
