'use client';

import { useEffect, useRef } from 'react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { MonitorPlay } from 'lucide-react';
import { asset } from '@/lib/basePath';
import { demo } from '@/data/demo';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

// Looping, muted demo clip. Plays only while in view (mirrors AppScreens); under
// prefers-reduced-motion it stays paused on its poster. Renders nothing until data/demo.ts is set.
export function Demo() {
  useLocale(); // re-render on language switch
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  if (!demo) return null;

  return (
    <Section id="demo" divided>
      <SectionHeading
        icon={MonitorPlay}
        eyebrow={t('demo.eyebrow')}
        title={t('demo.title')}
        description={demo.caption}
      />
      <Reveal className="mt-12">
        <div className="overflow-hidden rounded-2xl border border-border bg-bg-alt shadow-lg">
          <video
            ref={ref}
            className="h-full w-full"
            src={asset(demo.src)}
            poster={demo.poster ? asset(demo.poster) : undefined}
            muted
            loop
            playsInline
            preload="metadata"
            controls
          />
        </div>
      </Reveal>
    </Section>
  );
}
