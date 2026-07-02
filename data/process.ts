import type { ProcessStep } from '@/lib/types';
import { getLocale } from '@/lib/i18n';
import { overlayBy } from '@/lib/i18n/merge';
import { processUr } from '@/data/i18n/process.ur';

// "How I work" — the steps a client/project goes through. Icon keys are mapped to glyphs in
// components/sections/Process.tsx (kept here as plain strings so this file stays React-free).
// TODO: tweak wording to match how you actually run engagements.
const enProcess: ProcessStep[] = [
  {
    icon: 'discovery',
    title: 'Discovery',
    text: 'We align on goals, users, scope and the devices/TVs to support — so the build targets the right outcome from day one.',
    more: 'You get a clear scope, a realistic timeline, and a fixed list of supported devices before any code is written.',
  },
  {
    icon: 'design',
    title: 'Design',
    text: 'Wireframes to polished, App-Store-ready UI. Clean, fast, and accessible on every screen size from phone to tablet.',
    more: 'Every screen is designed for 320px through 4K with WCAG AA contrast, so it looks right on any device.',
  },
  {
    icon: 'build',
    title: 'Build',
    text: 'Native iOS & Android with solid architecture and real-time device control — shipped in reviewable increments.',
    more: 'SwiftUI/Kotlin with MVVM, plus Cast, DIAL, SSDP/UPnP and WebSockets for rock-solid local-network control.',
  },
  {
    icon: 'ship',
    title: 'Ship',
    text: 'Store submission, ASO, in-app purchases/subscriptions and CI/CD release pipelines — handled end to end.',
    more: 'I manage the developer accounts, store listings, review process and release automation so launch is stress-free.',
  },
  {
    icon: 'support',
    title: 'Support',
    text: 'Post-launch monitoring, updates and iteration based on real ratings, analytics and user feedback.',
    more: 'Crash monitoring, OS-update compatibility and data-driven improvements keep the app healthy after launch.',
  },
];

const urProcess = overlayBy(enProcess, (s) => s.icon, processUr);
export const getProcess = (): ProcessStep[] => (getLocale() === 'ur' ? urProcess : enProcess);
