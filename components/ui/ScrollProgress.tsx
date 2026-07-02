'use client';

import { useEffect, useRef } from 'react';

// Thin reading-progress bar at the very top of the page, driven by scroll position.
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let ticking = false;
    const update = () => {
      const el = ref.current;
      if (el) {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const p = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
        el.style.transform = `scaleX(${p})`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="scroll-progress fixed inset-x-0 top-0 z-[60] h-[3px] scale-x-0 bg-brand"
    />
  );
}
