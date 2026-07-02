'use client';

import type { CSSProperties } from 'react';
import { SkillIcon } from '@/components/ui/SkillIcon';
import { useLocale } from '@/components/i18n/useLocale';

// Ambient, decorative-only field of stack icons orbiting gently behind the hero. Positioned in
// the side gutters / corners (never the centre — a radial mask fades the middle so the headline
// stays crisp), hidden on mobile, frozen under prefers-reduced-motion by the global rule.
//
// PERFORMANCE: each tile is a SINGLE transform animation (one cheap compositor layer) running a
// smooth elliptical orbit at constant speed — no blur, no opacity, no box-shadow repaint while
// it moves. See `.hero-float` / `@keyframes heroOrbit` in globals.css.
type Node = {
  icon: string;
  color: string;
  top: string;
  left: string;
  size: number;
  ax: number; // horizontal orbit radius (px)
  ay: number; // vertical orbit radius (px)
  durx: number; // base period a (s)
  dury: number; // base period b (s) — summed for the orbit duration
  delay: number;
};

// Scattered across the WHOLE hero (a starfield). Mid-height icons sit near the left/right
// edges so the centred headline stays clear; the soft mask fades any that fall behind it.
const NODES: Node[] = [
  { icon: 'nextjs', color: '#18181B', top: '12%', left: '16%', size: 104, ax: 9, ay: 13, durx: 3.0, dury: 4.0, delay: 0.0 },
  { icon: 'kotlin', color: '#7F52FF', top: '7%', left: '40%', size: 92, ax: 11, ay: 12, durx: 3.4, dury: 4.6, delay: 0.5 },
  { icon: 'firebase', color: '#FFA000', top: '15%', left: '63%', size: 96, ax: 8, ay: 14, durx: 2.8, dury: 3.8, delay: 1.1 },
  { icon: 'java', color: '#E76F00', top: '9%', left: '85%', size: 104, ax: 12, ay: 10, durx: 3.6, dury: 4.8, delay: 0.3 },
  { icon: 'sql', color: '#0E7490', top: '30%', left: '7%', size: 94, ax: 9, ay: 13, durx: 2.6, dury: 3.5, delay: 1.6 },
  { icon: 'git', color: '#F05133', top: '33%', left: '93%', size: 100, ax: 10, ay: 11, durx: 3.2, dury: 4.3, delay: 0.9 },
  { icon: 'socketio', color: '#25292E', top: '47%', left: '11%', size: 90, ax: 8, ay: 12, durx: 2.9, dury: 3.9, delay: 2.0 },
  { icon: 'objectivec', color: '#1565C0', top: '49%', left: '91%', size: 88, ax: 11, ay: 9, durx: 3.5, dury: 4.5, delay: 0.2 },
  { icon: 'swift', color: '#F05138', top: '63%', left: '5%', size: 104, ax: 10, ay: 13, durx: 3.1, dury: 4.2, delay: 0.5 },
  { icon: 'android', color: '#3DDC84', top: '61%', left: '95%', size: 100, ax: 9, ay: 12, durx: 3.3, dury: 4.7, delay: 1.4 },
  { icon: 'compose', color: '#4285F4', top: '78%', left: '18%', size: 104, ax: 12, ay: 11, durx: 2.7, dury: 3.7, delay: 0.8 },
  { icon: 'apple', color: '#1D1D1F', top: '85%', left: '9%', size: 88, ax: 8, ay: 14, durx: 3.7, dury: 4.9, delay: 1.9 },
  { icon: 'rest', color: '#14B8A6', top: '88%', left: '79%', size: 94, ax: 10, ay: 10, durx: 3.0, dury: 4.1, delay: 1.0 },
  { icon: 'websockets', color: '#10B981', top: '91%', left: '34%', size: 90, ax: 9, ay: 13, durx: 2.8, dury: 3.8, delay: 2.2 },
  { icon: 'realtimedb', color: '#7E57C2', top: '73%', left: '67%', size: 90, ax: 11, ay: 12, durx: 3.4, dury: 4.5, delay: 0.7 },
  { icon: 'playstore', color: '#01875F', top: '6%', left: '71%', size: 86, ax: 8, ay: 11, durx: 2.5, dury: 3.6, delay: 2.4 },
];

// Soft glow tinted to each icon's brand hue (8-digit hex = colour + alpha). Kept light so the
// box-shadow rasterises cheaply; the static halo behind each tile carries most of the colour.
function glow(color: string): string {
  return [`0 8px 20px -10px ${color}40`, `0 3px 8px -5px rgba(24,24,27,0.16)`, `inset 0 0 0 1px ${color}1a`].join(', ');
}

// Off-screen entry directions (corners + edges). Each tile spins in from one of these,
// picked by a stride over the index so adjacent tiles arrive from different corners.
const CORNERS: [number, number][] = [
  [-1, -1], [1, -1], [1, 1], [-1, 1],
  [0, -1], [0, 1], [-1, 0], [1, 0],
];

export function HeroTechField() {
  const { dir } = useLocale(); // re-render + re-mirror on language switch
  const rtl = dir === 'rtl';
  return (
    <div
      aria-hidden="true"
      className="hero-tech-field pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden lg:block"
    >
      {NODES.map((n, i) => {
        const halo = Math.round(n.size * 1.45);
        const dur = (n.durx + n.dury) * 2.8; // slow, star-like glide + spin period (s)
        const [cx, cy] = CORNERS[(i * 5) % CORNERS.length]; // which corner it spins in from
        // Mirror the starfield layout + entrance direction for RTL (decorative, but it's the
        // hero centrepiece — an un-mirrored asymmetric field would read as "off").
        const left = rtl ? `${100 - parseFloat(n.left)}%` : n.left;
        const enterX = (rtl ? -cx : cx) * 160;
        return (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: n.top, left }}
          >
            {/* Entrance: spin in from a random corner (one-shot, not promoted) */}
            <div
              className="hero-node"
              style={
                {
                  ['--delay']: `${n.delay}s`,
                  ['--enter-x']: `${enterX}px`,
                  ['--enter-y']: `${cy * 160}px`,
                } as CSSProperties
              }
            >
              {/* The ONLY animated layer per tile: a single smooth orbit + full 360° spin */}
              <div
                className="hero-float"
                style={
                  {
                    ['--ax']: `${n.ax * 2.2}px`,
                    ['--ay']: `${n.ay * 2.2}px`,
                    ['--dur']: `${dur}s`,
                    ['--delay']: `${n.delay}s`,
                    animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
                  } as CSSProperties
                }
              >
                {/* Dimmed + translucent so the tiles sit INSIDE the background, not on top */}
                <div className="relative opacity-[0.42]">
                  {/* Static brand-hue halo behind the tile */}
                  <span
                    className="hero-halo"
                    style={{
                      width: halo,
                      height: halo,
                      background: `radial-gradient(circle at center, ${n.color}40 0%, ${n.color}00 70%)`,
                    }}
                  />
                  <span
                    className="relative flex items-center justify-center rounded-2xl bg-tile"
                    style={{ width: n.size, height: n.size, color: n.color, boxShadow: glow(n.color) }}
                  >
                    <SkillIcon name={n.icon} size={Math.round(n.size * 0.46)} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
