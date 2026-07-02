import { getLocale } from '@/lib/i18n';
import { systemsUr } from '@/data/i18n/systems.ur';

export type SystemProject = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  highlights: string[];
  protoHref?: string;
  image?: string;
};

const enSystems: SystemProject[] = [
  {
    slug: 'ev-charging',
    title: 'EV Charging Management System',
    subtitle: 'OCPP 1.6/2.0 · Real-Time · Multi-tenant',
    description:
      'A full charge-point management platform built on OCPP 1.6 and 2.0. Charge stations connect over WebSockets; the backend handles session lifecycle, real-time telemetry, and event processing via MQTT. Operators manage their network through a React admin dashboard — monitoring active sessions, setting pricing rules, configuring alerts, and viewing analytics. Multi-tenant architecture supports multiple operators on a single deployment, with Stripe-powered subscription billing and role-based access control.',
    stack: ['nodejs', 'postgresql', 'redis', 'websockets', 'mqtt', 'react', 'aws', 'docker'],
    highlights: [
      'OCPP 1.6 & 2.0 charge-point protocol over WebSockets',
      'Real-time telemetry ingestion via MQTT broker',
      'Multi-tenant operator dashboard with RBAC',
      'Stripe subscription billing & metered usage',
    ],
    protoHref: undefined,
    image: undefined,
  },
];

const urSystems: SystemProject[] = enSystems.map((s, i) => ({
  ...s,
  ...systemsUr[i],
}));

export const getSystems = (): SystemProject[] =>
  getLocale() === 'ur' ? urSystems : enSystems;

export const systems = enSystems;
