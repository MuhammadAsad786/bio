'use client';

import { useCallback, useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';
import { getReviews } from '@/data/reviews';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

// Initials for the reviewer avatar chip (first + last word).
function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

// Five whole stars; filled up to `rating` in brand, the rest faint.
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={t('reviews.stars', { rating })}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          aria-hidden="true"
          className={i < rating ? 'fill-brand text-brand' : 'fill-border text-border'}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  // Looping, draggable carousel. Autoplay starts automatically once the strip scrolls into view
  // (see IntersectionObserver below) and pauses on hover so a card can be read. Frozen for
  // prefers-reduced-motion (stays a static, draggable strip).
  const { dir } = useLocale(); // re-render on language switch
  const reviews = getReviews();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', direction: dir }, [
    Autoplay({ delay: 3200, stopOnInteraction: false, stopOnMouseEnter: true, playOnInit: false }),
  ]);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect).on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect).off('reInit', onSelect);
    };
  }, [emblaApi]);

  // Auto-start the slide once it scrolls into view; stop when it leaves. Skipped for
  // reduced-motion users (autoplay plugin stays idle, strip remains static + draggable).
  useEffect(() => {
    if (!emblaApi) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const autoplay = emblaApi.plugins().autoplay;
    if (!autoplay) return;
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? autoplay.play() : autoplay.stop()),
      { threshold: 0.3 },
    );
    io.observe(emblaApi.rootNode());
    return () => io.disconnect();
  }, [emblaApi]);

  return (
    <Section id="reviews" divided>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          icon={Quote}
          eyebrow={t('reviews.eyebrow')}
          title={t('reviews.title')}
          description={t('reviews.description')}
        />

        {/* Prev / next — hidden on touch-first small screens where dragging is natural. */}
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label={t('reviews.prev')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text shadow-sm transition-colors hover:border-border-strong hover:text-brand-text"
          >
            <ChevronLeft size={18} aria-hidden="true" className="rtl-flip" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label={t('reviews.next')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text shadow-sm transition-colors hover:border-border-strong hover:text-brand-text"
          >
            <ChevronRight size={18} aria-hidden="true" className="rtl-flip" />
          </button>
        </div>
      </div>

      <Reveal className="mt-12">
        <div className="embla -mx-4 overflow-hidden px-4" ref={emblaRef} data-cursor="Drag">
          <div className="flex">
            {reviews.map((r, i) => (
              <div
                key={r.name}
                style={{ ['--i']: i } as CSSProperties}
                className="min-w-0 flex-[0_0_100%] pe-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <Stars rating={r.rating} />

                  <blockquote className="mt-4 flex-1 text-fluid-base leading-relaxed text-subtle">
                    “{r.quote}”
                  </blockquote>

                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gradient-to-br from-brand-text to-brand-strong font-display text-fluid-sm font-bold text-bg shadow-sm"
                    >
                      {initials(r.name)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-text">{r.name}</span>
                      <span className="block truncate text-fluid-sm text-muted">{r.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>

        {/* Dot pagination */}
        <div className="mt-8 flex justify-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={t('reviews.goTo', { n: i + 1 })}
              aria-current={i === selected}
              className={cn(
                'h-2 rounded-pill transition-all duration-300',
                i === selected ? 'w-6 bg-brand-text' : 'w-2 bg-border hover:bg-border-strong',
              )}
            />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
