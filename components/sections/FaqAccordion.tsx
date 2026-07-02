'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { getFaqs } from '@/data/faqs';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

// Interactive FAQ accordion. A brand "spotlight" glow follows the cursor across the
// hovered card (mouse/fine-pointer only, rAF-throttled, off on touch + reduced-motion);
// the glow position is written to per-card CSS vars (--mx/--my) read by .faq-item::after
// in globals.css. The reveal/stagger entrance mirrors <Reveal>. Built on native
// <details>/<summary> so it stays fully keyboard-accessible.
export function FaqAccordion() {
  useLocale(); // re-render on language switch
  const faqs = getFaqs();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const fineRef = useRef(false);
  const rafRef = useRef(0);
  const lastRef = useRef<{ x: number; y: number; card: HTMLElement } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    fineRef.current = window.matchMedia('(pointer: fine)').matches && !reduce;
    if (reduce) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!fineRef.current) return;
    const card = (e.target as HTMLElement).closest<HTMLElement>('.faq-item');
    if (!card) return;
    lastRef.current = { x: e.clientX, y: e.clientY, card };
    if (rafRef.current) return; // already scheduled this frame
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const d = lastRef.current;
      if (!d) return;
      const r = d.card.getBoundingClientRect();
      d.card.style.setProperty('--mx', `${d.x - r.left}px`);
      d.card.style.setProperty('--my', `${d.y - r.top}px`);
    });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn('reveal stagger grid content-start gap-3', shown && 'reveal-in')}
    >
      {faqs.map((f, i) => (
        <details
          key={f.q}
          style={{ ['--i']: i } as CSSProperties}
          className="faq-item rounded-2xl border border-border bg-surface px-5 shadow-sm hover:border-border-strong"
        >
          <summary
            data-cursor={t('cursor.toggle')}
            className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 marker:hidden"
          >
            <span className="flex items-baseline gap-3 text-fluid-base font-semibold text-text">
              <span className="font-mono text-fluid-sm text-faint" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              {f.q}
            </span>
            <span className="faq-toggle flex h-8 w-8 flex-none items-center justify-center rounded-pill border border-border text-muted">
              <ChevronDown size={16} aria-hidden="true" className="faq-chevron" />
            </span>
          </summary>
          <div className="faq-answer overflow-hidden">
            <p className="pb-5 ps-9 text-fluid-base leading-relaxed text-subtle">{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
