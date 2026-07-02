import type { CSSProperties } from 'react';
import { SkillIcon } from '@/components/ui/SkillIcon';

// A glossy 3D app-icon tile: brand-coloured squircle with a top highlight, depth
// shadow and a white glyph. Styling lives in globals.css (.skill3d).
export function Skill3DIcon({
  name,
  color,
  size = 48,
  glyph = 24,
}: {
  name: string;
  color: string;
  size?: number;
  glyph?: number;
}) {
  return (
    <span
      className="skill3d"
      style={{ '--c': color, width: size, height: size } as CSSProperties}
    >
      <SkillIcon name={name} size={glyph} className="skill3d__glyph" />
    </span>
  );
}
