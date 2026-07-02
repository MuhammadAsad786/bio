import type { ExperienceEntry } from '@/lib/types';
import { getLocale } from '@/lib/i18n';
import { overlayByIndex } from '@/lib/i18n/merge';
import { experienceUr } from '@/data/i18n/experience.ur';

// Career timeline (most recent first) — from Muhammad Asad's LinkedIn.
const enExperience: ExperienceEntry[] = [
  {
    company: 'Biotic Apps Studio',
    role: 'Founder & Managing Director',
    location: 'Lahore, Punjab, Pakistan',
    summary:
      'Founder of Biotic Apps Studio — building and shipping complete technology products end to end: native Android & iOS, Flutter, web frontends, Node.js/Firebase backends, cloud infrastructure, real-time WebSocket & MQTT systems, and enterprise SaaS dashboards.',
    highlights: [
      'Design and ship full-stack systems: mobile apps, backends, databases, and cloud infrastructure.',
      'Run the studio: client delivery, product strategy, and end-to-end system architecture.',
    ],
  },
  {
    company: 'iPlexSoft',
    role: 'Senior iOS Developer',
    location: 'Karachi, Sindh, Pakistan',
    summary: 'Senior iOS developer at iPlexSoft, building and shipping production apps to the App Store.',
    highlights: ['Developed and shipped native iOS apps using Swift and Xcode.'],
  },
  {
    company: 'iPlexSoft',
    role: 'Senior Flutter Developer',
    location: 'Karachi, Sindh, Pakistan',
    summary: 'Flutter development at iPlexSoft, building cross-platform mobile features (full-time, on-site).',
    highlights: ['Delivered Flutter app features on a full-time, on-site team.'],
  },
  {
    company: 'iPlexSoft',
    role: 'Senior Android Developer',
    location: 'Lahore, Punjab, Pakistan',
    summary: 'Senior Android developer at iPlexSoft, shipping production apps to Google Play.',
    highlights: [
      'Shipped apps on Google Play, including “معكم للمستشارين” and Shopzy Cashier — a restaurant management system.',
      'Skills: Kotlin, Project Management and more.',
    ],
  },
  {
    company: 'CodeCoy Technologies',
    role: 'Android Developer',
    location: 'Johar Town, Lahore',
    summary: 'Full-time Android developer building real-time, data-driven apps.',
    highlights: ['Worked with Firebase Realtime Database, RxJava and more.'],
  },
  {
    company: 'Blinkedge',
    role: 'Mobile App Developer',
    location: 'Lahore District, Punjab, Pakistan',
    summary: 'Mobile app development across Android and cross-platform projects.',
    highlights: [],
  },
];

const urExperience = overlayByIndex(enExperience, experienceUr);
export const getExperience = (): ExperienceEntry[] =>
  getLocale() === 'ur' ? urExperience : enExperience;
