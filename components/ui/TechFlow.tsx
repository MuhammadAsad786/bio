import type { CSSProperties } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

// Data-driven flow diagram for the /stack/<slug>/ pages. Renders an ordered list of steps as
// numbered, theme-aware cards connected by arrows — stacked vertically on mobile, a horizontal
// row from lg up. The horizontal arrow flips under RTL (.rtl-flip); the vertical one never does.
// Entrance + freeze handled by the `.tech-node` rules in app/globals.css (reduced-motion safe).
export function TechFlow({ steps }: { steps: string[] }) {
  if (!steps?.length) return null;
  return (
    <ol className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-0">
      {steps.map((step, i) => (
        <li key={i} className="contents">
          <div
            style={{ ['--i']: i } as CSSProperties}
            className="tech-node flex flex-1 items-start gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm lg:flex-col lg:items-center lg:gap-3 lg:p-5 lg:text-center"
          >
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-tint font-mono text-fluid-sm font-semibold text-brand-text">
              {i + 1}
            </span>
            <span className="text-fluid-sm leading-snug text-text">{step}</span>
          </div>
          {i < steps.length - 1 && (
            <div
              aria-hidden="true"
              className="flex flex-none items-center justify-center text-faint lg:px-1.5"
            >
              <ArrowDown size={18} className="lg:hidden" />
              <ArrowRight size={18} className="hidden rtl-flip lg:block" />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
