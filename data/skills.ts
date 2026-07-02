import type { SkillGroup, SkillItem } from '@/lib/types';
import { techData } from '@/data/tech-data';
import { techDataUr } from '@/data/i18n/tech-data.ur';
import { getLocale, t } from '@/lib/i18n';

// Grouped skills shown in the Skills section. `icon` references a key in lib/icons.ts;
// `color` is the brand colour used to build the 3D app-icon tile (Skill3DIcon) — tuned to
// each technology's official brand hue, and kept distinct WITHIN each group so no two
// adjacent tiles read as the same colour.
export const skills: SkillGroup[] = [
  {
    label: t('skills.group.languages'),
    items: [
      { name: 'Java', icon: 'java', color: '#E76F00' }, // Java orange
      { name: 'Kotlin', icon: 'kotlin', color: '#7F52FF' }, // Kotlin purple
      { name: 'Jetpack Compose', icon: 'compose', color: '#4285F4' }, // Google blue
      { name: 'Objective-C', icon: 'objectivec', color: '#1565C0' }, // deeper blue, distinct from Compose
      { name: 'SwiftUI', icon: 'swift', color: '#F05138' }, // Swift orange
      { name: 'Next.js', icon: 'nextjs', color: '#0B0B0C' }, // Next.js black
    ],
  },
  {
    label: t('skills.group.backend'),
    items: [
      // Ordered so no two same-hue tiles sit adjacent (greens are spread out).
      { name: 'Node.js', icon: 'nodejs', color: '#339933' }, // Node green
      { name: 'Express', icon: 'express', color: '#25292E' }, // Express black
      { name: 'Python', icon: 'python', color: '#3776AB' }, // Python blue
      { name: 'Django', icon: 'django', color: '#0C4B33' }, // Django dark green
      { name: 'PHP', icon: 'php', color: '#777BB4' }, // PHP purple
      { name: 'Laravel', icon: 'laravel', color: '#FF2D20' }, // Laravel red
      { name: 'Spring', icon: 'spring', color: '#6DB33F' }, // Spring green
      { name: 'GraphQL', icon: 'graphql', color: '#E10098' }, // GraphQL pink
      { name: 'REST APIs', icon: 'rest', color: '#14B8A6' }, // teal
    ],
  },
  {
    label: t('skills.group.databases'),
    items: [
      { name: 'PostgreSQL', icon: 'postgresql', color: '#4169E1' }, // Postgres blue
      { name: 'MongoDB', icon: 'mongodb', color: '#47A248' }, // MongoDB green
      { name: 'Redis', icon: 'redis', color: '#DC382D' }, // Redis red
      { name: 'Firebase', icon: 'firebase', color: '#FFA000' }, // Firebase amber
      { name: 'Realtime Database', icon: 'realtimedb', color: '#7E57C2' }, // distinct from Firebase
      { name: 'WebSockets', icon: 'websockets', color: '#10B981' }, // emerald
      { name: 'Socket.IO', icon: 'socketio', color: '#25292E' }, // Socket.IO black
      { name: 'MQTT', icon: 'mqtt', color: '#660066' }, // MQTT purple (IoT messaging)
      { name: 'Bluetooth / BLE', icon: 'bluetooth', color: '#0082FC' }, // BLE blue
      { name: 'OCPP 1.6', icon: 'ocpp', color: '#2563EB' }, // EV charging protocol over WebSockets — blue
      { name: 'OCPP 2.0.1', icon: 'ocpp', color: '#DC2626' }, // distinct from OCPP 1.6 — red
      { name: 'MySQL', icon: 'mysql', color: '#00758F' }, // MySQL teal
    ],
  },
  {
    label: t('skills.group.cloud'),
    items: [
      // Blues (DigitalOcean / Docker / CI-CD) kept non-adjacent.
      { name: 'DigitalOcean', icon: 'digitalocean', color: '#0080FF' }, // DigitalOcean blue
      { name: 'AWS', icon: 'aws', color: '#FF9900' }, // AWS orange
      { name: 'VPS Deployment', icon: 'vps', color: '#374151' }, // server dark gray
      { name: 'Linux / Ubuntu', icon: 'ubuntu', color: '#E95420' }, // Ubuntu orange
      { name: 'Docker', icon: 'docker', color: '#2496ED' }, // Docker blue
      { name: 'Nginx', icon: 'nginx', color: '#009639' }, // Nginx green
      { name: 'Gunicorn', icon: 'gunicorn', color: '#499848' }, // Gunicorn green
      { name: 'Celery', icon: 'celery', color: '#37814A' }, // Celery dark green
      { name: 'RabbitMQ', icon: 'rabbitmq', color: '#FF6600' }, // RabbitMQ orange
      { name: 'GitHub Actions', icon: 'githubactions', color: '#2088FF' }, // Actions blue
      { name: 'Git', icon: 'git', color: '#F05133' }, // Git orange-red
      { name: 'CI/CD', icon: 'cicd', color: '#6366F1' }, // pipelines indigo
    ],
  },
  {
    label: t('skills.group.web'),
    items: [
      { name: 'React', icon: 'react', color: '#149ECA' }, // React blue (mid-tone for the white glyph)
      { name: 'Tailwind CSS', icon: 'tailwind', color: '#06B6D4' }, // Tailwind cyan
      { name: 'Framer Motion', icon: 'framer', color: '#0055FF' }, // Framer / Motion blue — page & UI animation
      { name: 'HTML', icon: 'html', color: '#E34F26' }, // HTML5 orange
      { name: 'CSS', icon: 'css', color: '#1572B6' }, // CSS3 blue
      { name: 'Bootstrap', icon: 'bootstrap', color: '#7952B3' }, // Bootstrap purple
      { name: 'WordPress', icon: 'wordpress', color: '#21759B' }, // WordPress blue
    ],
  },
  {
    label: t('skills.group.mobile'),
    items: [
      { name: 'Android', icon: 'android', color: '#3DDC84' }, // Android green
      { name: 'iOS', icon: 'apple', color: '#1D1D1F' }, // Apple near-black (was washed gray)
      { name: 'App Store', icon: 'appstore', color: '#0A84FF' }, // iOS blue
      { name: 'Play Store', icon: 'playstore', color: '#01875F' }, // Google Play green
    ],
  },
];

// Slug for the /stack/<slug>/ detail route. Derived from `name` (NOT `icon`, which collides —
// `ocpp` is reused, `apple` powers iOS) so every technology gets a unique, stable URL.
// "OCPP 1.6" → "ocpp-1-6", "Next.js" → "next-js", "Socket.IO" → "socket-io".
export const skillSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// Merge the AUTO-GENERATED tech-data (scraped description/version/changelog + seeded
// example/flow) onto each skill. Runs once at module load, before the flat exports below.
for (const group of skills) {
  for (const item of group.items) {
    const d = techData[skillSlug(item.name)];
    if (d) item.tech = d; // English/scraped (description is bilingual via descriptionUr)
  }
}

// `skills` labels are baked English (group labels double as stable grouping keys in allSkills).
// GROUP_KEYS lets us re-evaluate the LABELS in the current locale at render time.
const GROUP_KEYS = [
  'skills.group.languages',
  'skills.group.backend',
  'skills.group.databases',
  'skills.group.cloud',
  'skills.group.web',
  'skills.group.mobile',
] as const;
export const getSkillGroups = (): SkillGroup[] =>
  skills.map((g, i) => ({ ...g, label: t(GROUP_KEYS[i]) }));
export const localizeSkillGroup = (enLabel: string): string => {
  const i = skills.findIndex((g) => g.label === enLabel);
  return i >= 0 ? t(GROUP_KEYS[i]) : enLabel;
};
// Localized flow-diagram steps for the /stack page (Urdu overlay → English fallback).
export const localizeTechFlow = (slug: string, flow?: string[]): string[] | undefined =>
  getLocale() === 'ur' ? (techDataUr[slug]?.flow ?? flow) : flow;

// Flat list of every skill with its (English) group label — used by the detail route's
// generateStaticParams, lookup, and "related" tiles. Display labels are localized at render.
export type FlatSkill = SkillItem & { group: string };
export const allSkills: FlatSkill[] = skills.flatMap((g) =>
  g.items.map((item) => ({ ...item, group: g.label })),
);

export const getSkillBySlug = (slug: string): FlatSkill | undefined =>
  allSkills.find((s) => skillSlug(s.name) === slug);
