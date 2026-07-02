'use client';

import { useEffect, useState } from 'react';

// Drives a scroll-reactive header: `scrolled` once past 24px (add hairline/shadow + shrink),
// and `hidden` when scrolling down past 120px (show again on scroll up). One passive rAF
// listener; honours prefers-reduced-motion (never hides, just toggles `scrolled`).
export function useHideOnScrollNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let last = window.scrollY;
    let ticking = false;
    let raf = 0;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (!reduce) {
        if (y > last && y > 120) setHidden(true);
        else if (y < last) setHidden(false);
      }
      last = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { scrolled, hidden };
}
