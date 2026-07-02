import type { Config } from 'tailwindcss';

// Semantic tokens map to the light CSS variables defined in app/globals.css,
// so the palette has a single source of truth and theming stays trivial.
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-alt': 'var(--bg-alt)',
        header: 'var(--bg-80)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        tile: 'var(--tile)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          press: 'var(--primary-press)',
        },
        brand: {
          DEFAULT: 'var(--brand)',
          text: 'var(--brand-text)',
          strong: 'var(--brand-strong)',
          tint: 'var(--brand-tint)',
        },
        accent: 'var(--accent)',
        text: 'var(--text)',
        subtle: 'var(--text-2)', // informational secondary text (7.7:1)
        muted: 'var(--muted)',
        faint: 'var(--text-faint)',
        danger: 'var(--danger)',
        success: 'var(--success)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'fluid-sm': 'var(--step--1)',
        'fluid-base': 'var(--step-0)',
        'fluid-lg': 'var(--step-1)',
        'fluid-xl': 'var(--step-2)',
        'fluid-2xl': 'var(--step-3)',
        'fluid-3xl': 'var(--step-4)',
        'fluid-4xl': 'var(--step-5)',
        'fluid-display': 'var(--step-display)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'var(--radius-sm)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-xl)', // alias so prominent rounded-2xl cards match the xl scale
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        glow: 'var(--shadow-glow)',
      },
      backgroundImage: { 'ember-radial': 'var(--gradient-hero)' },
      maxWidth: {
        content: '90rem', // ~1440px — fills a laptop edge-to-edge, centers on huge screens
        hero: '96rem', // ~1536px
      },
      screens: {
        xs: '375px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
};

export default config;
