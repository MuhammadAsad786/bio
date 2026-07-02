'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

// Cycles through `words` with a small slide/fade. Honours prefers-reduced-motion
// (stays on the first word, no cycling). Renders the first word on the server so
// there's no hydration mismatch.
export function RotatingText({
  words,
  interval = 2200,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setAnimate(true);
    const id = window.setInterval(() => {
      setIndex((v) => (v + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="rotating-text">
      <span key={index} className={cn(animate && 'rotating-text__word', className)}>
        {words[index]}
      </span>
    </span>
  );
}
