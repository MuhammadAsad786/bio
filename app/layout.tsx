import type { Metadata, Viewport } from 'next';
import {
  Inter,
  Space_Grotesk,
  JetBrains_Mono,
  Noto_Naskh_Arabic,
  Noto_Nastaliq_Urdu,
} from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Plausible } from '@/components/analytics/Plausible';
import { AskAsad } from '@/components/ask/AskAsad';
import { LocaleProvider } from '@/components/i18n/LocaleProvider';
import { t } from '@/lib/i18n';

// next/font self-hosts these at build time -> works with output:'export' and is
// rewritten through assetPrefix/basePath automatically on GitHub Pages.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
  variable: '--font-display',
});
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-mono',
});

// Urdu faces — Naskh for body/UI (compact, legible at small sizes), Nastaliq for display
// headings (authentic, ornate). Used only in the Urdu build (referenced via html[lang='ur']
// in globals.css); next/font still self-hosts them so it stays output:'export'-safe.
const notoNaskh = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-ur-sans',
});
const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  display: 'swap',
  weight: ['400', '600', '700'],
  variable: '--font-ur-display',
});

export const metadata: Metadata = {
  title: t('site.title'),
  description: t('site.description'),
};

// viewport-fit=cover is REQUIRED for env(safe-area-inset-*) to apply on notched iPhones.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0B0C' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

// Runs before paint to set the theme from localStorage (or OS preference) with no flash.
const THEME_SCRIPT = `(function(){try{var d=document.documentElement,t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='light';}d.dataset.theme=t;d.style.colorScheme=t;}catch(e){}})();`;

// Runs before paint to set <html lang/dir> from the saved language with no flash (so RTL + the
// Urdu fonts apply immediately for returning Urdu visitors). The React tree starts English and
// LocaleProvider switches it on mount — matching the static HTML to avoid a hydration mismatch.
const LOCALE_SCRIPT = `(function(){try{var d=document.documentElement,l=localStorage.getItem('locale');if(l!=='ur')l='en';d.lang=l;d.dir=l==='ur'?'rtl':'ltr';}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Both font sets are always available — the language switches at runtime, so the Urdu faces must
  // be loadable on any page. They're only *applied* under html[lang='ur'] (see globals.css), so
  // the browser never fetches them while in English.
  const fontVars = `${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} ${notoNaskh.variable} ${notoNastaliq.variable}`;
  return (
    <html lang="en" dir="ltr" className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: LOCALE_SCRIPT }} />
      </head>
      <body>
        <LocaleProvider />
        <Plausible />
        <CustomCursor />
        <ScrollProgress />
        <AuroraBackground />
        <AskAsad />
        <a href="#main" className="skip-link">
          {t('a11y.skipToContent')}
        </a>
        {/* .page-shell owns overflow-x containment (keeps the sticky header working) */}
        <div className="page-shell">
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
