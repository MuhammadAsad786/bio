'use client';

import { type CSSProperties, useState } from 'react';
import Link from 'next/link';
import { Layers } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { SkillIcon } from '@/components/ui/SkillIcon';
import { cn } from '@/lib/cn';
import { getSkillGroups, skillSlug } from '@/data/skills';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

// One fluid clamp drives both the grid's column min-size AND the tile's max-size, so the
// row fills the full width (auto-fit 1fr columns) while every icon scales with the screen.
const SIZE = 'clamp(4.5rem, 8vw, 8.5rem)';

// Each tile links to its /stack/<slug>/ detail page (description, example, flow diagram,
// latest version & changes). The hover lift + custom-cursor "View" label signal it's clickable.
function SkillTile({ name, icon, color }: { name: string; icon: string; color: string }) {
  return (
    <Link
      href={`/stack/${skillSlug(name)}/`}
      aria-label={t('stack.viewAria', { name })}
      data-cursor={t('cursor.view')}
      className="group flex w-full flex-col items-center gap-2.5 text-center"
    >
      <div
        className="flex aspect-square w-full items-center justify-center rounded-[26%] shadow-md ring-1 ring-inset ring-border transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
        style={{ maxWidth: SIZE, backgroundColor: color }}
      >
        <SkillIcon name={icon} className="h-[44%] w-[44%] text-white drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.35)]" />
      </div>
      <span className="text-fluid-sm leading-tight text-text transition-colors group-hover:text-brand-text">
        {name}
      </span>
    </Link>
  );
}

export function Skills() {
  useLocale(); // re-render on language switch
  const groups = getSkillGroups();
  const tabs = [t('skills.tab.all'), ...groups.map((g) => g.label)];
  // Track the active tab by INDEX so a language switch (which changes the labels) keeps the
  // selection stable. 0 = "All"; 1..n map to groups[i-1].
  const [active, setActive] = useState(0);
  const items = active === 0 ? groups.flatMap((g) => g.items) : (groups[active - 1]?.items ?? []);

  return (
    <Section id="skills" className="bg-bg-alt">
      <Reveal>
        <SectionHeading
          icon={Layers}
          eyebrow={t('skills.eyebrow')}
          title={t('skills.title')}
          description={t('skills.description')}
        />
      </Reveal>

      {/* Category tabs */}
      <Reveal delay={80}>
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label={t('skills.filterAria')}>
          {tabs.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={cn(
                'rounded-pill border px-4 py-2 text-fluid-sm transition-colors',
                active === i
                  ? 'border-text bg-text text-bg'
                  : 'border-border text-muted hover:border-border-strong hover:text-text',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Full-width, screen-fluid icon grid */}
      <div
        className="mt-10 grid justify-items-center gap-x-4 gap-y-9 sm:gap-x-6"
        style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${SIZE}, 1fr))` } as CSSProperties}
      >
        {items.map((it) => (
          <SkillTile key={it.name} name={it.name} icon={it.icon ?? ''} color={it.color ?? '#FF6A00'} />
        ))}
      </div>
    </Section>
  );
}
