'use client';

import { useRef } from 'react';
import { cn } from '@/lib/cn';

// Wraps an element so it gently pulls toward the pointer (fine pointers only,
// disabled under prefers-reduced-motion). Never affects focus or keyboard activation.
export function Magnetic({
  children,
  className,
  strength = 0.22,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    const cx = Math.max(-6, Math.min(6, x));
    const cy = Math.max(-5, Math.min(5, y));
    el.style.transform = `translate(${cx}px, ${cy}px)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = '';
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('inline-block transition-transform duration-200 ease-out will-change-transform', className)}
    >
      {children}
    </span>
  );
}
