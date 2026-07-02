'use client';

import { useEffect, useRef, useState } from 'react';

// "Spotlight" cursor: a precise ink dot locked 1:1 to the pointer (the click hotspot), under a
// soft ambient brand halo with a faint crisp inner ring that springs behind it, plus an eased
// magnet that snaps the dot onto small controls and a frosted contextual label ("tool note")
// from data-cursor. Mouse-only — renders nothing on touch or under prefers-reduced-motion, so
// the native cursor stays intact there.
const INTERACTIVE = '[data-cursor], a, button, [role="button"], input, textarea, select';
const MAGNET = '[data-cursor], a, button, [role="button"]';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const labelInRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    reduce.addEventListener('change', update);
    fine.addEventListener('change', update);
    return () => {
      reduce.removeEventListener('change', update);
      fine.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const glow = glowRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    const labelIn = labelInRef.current;
    if (!glow || !ring || !dot || !label || !labelIn) return;
    const root = document.documentElement;
    root.classList.add('cursor-active');
    // The contextual label rides below-trailing of the dot — flip its X offset in RTL.
    const labelX = root.dir === 'rtl' ? -18 : 18;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let gx = mx;
    let gy = my;
    let vx = 0;
    let vy = 0;
    let s = 1;
    let dotX = mx;
    let dotY = my;
    let magnetEl: Element | null = null;
    let mcx = 0;
    let mcy = 0;
    let hovering = false;
    let down = false;
    let lastMove = 0;
    let raf = 0;
    let running = true;

    const writeDot = (x: number, y: number) => {
      dotX = x;
      dotY = y;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };
    const cacheRect = (el: Element) => {
      const r = el.getBoundingClientRect();
      mcx = r.left + r.width / 2;
      mcy = r.top + r.height / 2;
    };
    const magnetEligible = (el: Element) => {
      if (!el.matches(MAGNET)) return false;
      if (el.closest('.embla') || el.getAttribute('data-cursor') === 'Drag') return false;
      const r = el.getBoundingClientRect();
      return r.width <= 320 && r.height <= 220;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      lastMove = performance.now();
      if (!root.classList.contains('cursor-on')) root.classList.add('cursor-on');
      if (!magnetEl) writeDot(mx, my);
    };
    const onLeaveWin = () => root.classList.remove('cursor-on');
    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest?.(INTERACTIVE);
      if (!el) return;
      hovering = true;
      root.classList.add('cursor-hover');
      if (magnetEligible(el)) {
        magnetEl = el;
        cacheRect(el);
      } else {
        magnetEl = null;
      }
      const note = el.getAttribute('data-cursor');
      if (note) {
        labelIn.textContent = note;
        root.classList.add('cursor-labeled');
      } else {
        root.classList.remove('cursor-labeled');
      }
    };
    const onOut = (e: MouseEvent) => {
      const from = (e.target as Element)?.closest?.(INTERACTIVE);
      const to = (e.relatedTarget as Element)?.closest?.(INTERACTIVE);
      if (from && from !== to) {
        hovering = false;
        root.classList.remove('cursor-hover', 'cursor-labeled');
        if (from === magnetEl) magnetEl = null;
      }
    };
    const onDown = () => {
      down = true;
      root.classList.add('cursor-down');
    };
    const onUp = () => {
      down = false;
      root.classList.remove('cursor-down');
    };
    const onScroll = () => {
      if (magnetEl) cacheRect(magnetEl);
    };
    const onBlur = () => {
      running = false;
    };
    const onFocus = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      const now = performance.now();
      // Ambient follower: critically-damped spring chasing the RAW pointer.
      vx += (mx - gx) * 0.12;
      vx *= 0.78;
      gx += vx;
      vy += (my - gy) * 0.12;
      vy *= 0.78;
      gy += vy;
      // Scale: swell on hover, dip on press, gentle idle breathe otherwise.
      const sTarget = down ? 0.82 : hovering ? 1.4 : 1;
      let breathe = 1;
      if (sTarget === 1 && now - lastMove > 600) {
        breathe = 1 + 0.06 * (0.5 - 0.5 * Math.cos(((now - lastMove) / 4000) * Math.PI * 2));
      }
      s += (sTarget - s) * 0.2;
      const t = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%) scale(${s * breathe})`;
      glow.style.transform = t;
      ring.style.transform = t;
      // Magnet: ease the dot onto the centre of a small hovered control.
      if (magnetEl) {
        const dist = Math.hypot(mx - mcx, my - mcy);
        const tt = Math.max(0, 1 - dist / 70);
        const pull = tt * tt * 0.5;
        writeDot(mx + (mcx - mx) * pull, my + (mcy - my) * pull);
      }
      // Label rides the dot, below-trailing (flips to below-left in RTL).
      label.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(${labelX}px, 18px)`;
      if (running) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeaveWin);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove(
        'cursor-active',
        'cursor-on',
        'cursor-hover',
        'cursor-labeled',
        'cursor-down',
      );
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeaveWin);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={glowRef} className="cur-glow" aria-hidden="true" />
      <div ref={ringRef} className="cur-ring" aria-hidden="true" />
      <div ref={dotRef} className="cur-dot" aria-hidden="true" />
      <div ref={labelRef} className="cur-label" aria-hidden="true">
        <span ref={labelInRef} className="cur-label-in" />
      </div>
    </>
  );
}
