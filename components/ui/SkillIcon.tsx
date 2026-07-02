import { icons } from '@/lib/icons';

// Renders an icon by its string key (see lib/icons.ts). Decorative by default
// (aria-hidden) since the surrounding control carries the accessible label.
export function SkillIcon({
  name,
  size = 18,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = icons[name];
  if (!Icon) return null;
  return <Icon size={size} className={className} aria-hidden="true" />;
}
