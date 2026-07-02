import type { Social } from '@/lib/types';
import { SkillIcon } from '@/components/ui/SkillIcon';

// Each icon is a 44x44 hit area with an accessible label; amber accent on hover
// keeps contrast safe. External links open in a new tab with rel=noopener.
export function SocialIcons({ socials }: { socials: Social[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {socials.map((s) => {
        const isExternal = s.href.startsWith('http');
        return (
          <li key={s.label}>
            <a
              href={s.href}
              aria-label={s.label}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <SkillIcon name={s.icon} size={18} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
