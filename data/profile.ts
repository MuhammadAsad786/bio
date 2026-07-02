import type { Profile } from '@/lib/types';
import { getLocale } from '@/lib/i18n';
import { profileUr } from '@/data/i18n/profile.ur';

// ─────────────────────────────────────────────────────────────────────────────
//  EDIT ME — this single file drives the hero/dashboard and contact details.
//  Replace the placeholder values with your real name, links, address, etc.
//  Icons are referenced by string key; available keys live in lib/icons.ts.
//  Urdu prose is overlaid from data/i18n/profile.ur.ts in the Urdu build.
// ─────────────────────────────────────────────────────────────────────────────

const enProfile: Profile = {
  name: 'Muhammad Asad',
  eyebrow: 'Founder · Full Stack Developer',
  role: 'Android · Flutter · React Native · iOS · Web · Backend',
  yearsLabel: '7+ Years',
  tagline:
    'I design and ship scalable mobile and technology products — from real-time IoT systems and EV charging platforms to enterprise SaaS dashboards — end to end.',
  photo: '/images/profile/asad.jpg',
  bio:
    "I'm a full-stack engineer and founder of Biotic Apps Studio with 7+ years building scalable mobile and technology products. I design and ship complete systems — native Android & iOS (Kotlin, SwiftUI), Flutter & React Native, Node.js/Firebase backends, PostgreSQL/Redis databases, AWS/VPS infrastructure, real-time WebSockets & MQTT, OCPP-based EV charging platforms, and enterprise SaaS dashboards — with production-grade architecture and App-Store-ready UX on every screen.",
  stats: [
    { value: '28+', label: 'Apps shipped' },
    { value: '7+', label: 'Years experience' },
    { value: 'iOS', label: 'App Store' },
    { value: 'Android', label: 'Google Play' },
  ],
  ctas: {
    primary: { label: 'View apps', href: '#projects' },
    secondary: { label: 'Get in touch', href: '#contact' },
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/MuhammadAsad786', icon: 'github' },
    { label: 'LinkedIn', href: 'https://pk.linkedin.com/in/muhammad-asad-5998571b7', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:muhammadasad5683@gmail.com', icon: 'email' },
  ],
  location: 'Lahore, Punjab, Pakistan',
  address: 'Lahore, Punjab, Pakistan',
  email: 'muhammadasad5683@gmail.com',
};

const urProfile: Profile = {
  ...enProfile,
  name: profileUr.name,
  eyebrow: profileUr.eyebrow,
  yearsLabel: profileUr.yearsLabel,
  tagline: profileUr.tagline,
  bio: profileUr.bio,
  location: profileUr.location,
  address: profileUr.address,
  stats: enProfile.stats.map((s, i) => ({ ...s, label: profileUr.statLabels[i] ?? s.label })),
  ctas: {
    primary: { ...enProfile.ctas.primary, label: profileUr.ctaPrimary },
    secondary: { ...enProfile.ctas.secondary, label: profileUr.ctaSecondary },
  },
};

// English source (for build/SEO + non-reactive callers); getProfile() returns the current locale.
export const profile: Profile = enProfile;
export const getProfile = (): Profile => (getLocale() === 'ur' ? urProfile : enProfile);
