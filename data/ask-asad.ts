// ─────────────────────────────────────────────────────────────────────────────
//  EDIT ME — this single file drives the "Ask Asad" assistant: a fully LOCAL,
//  no-AI, no-network scripted Q&A. Add or reword questions freely.
//
//  • Each AskNode is a question a visitor can tap.
//  • `a` is the reply — ONE string per chat bubble (the bot "types" each one).
//  • `follow` lists the follow-up questions offered next (by id).
//  • `reveal: true` shows the contact card after the answer — this is the lead
//    funnel: a visitor only sees the email/contact CTA once they say they want
//    to work together.
//  • `askCategories` is the "Browse topics" menu — every node should appear in
//    one category so it stays reachable.
//
//  Keep answers warm, concrete and client-focused: the goal is to turn interest
//  into a message. Mostly authored copy, with a few live figures pulled from the
//  portfolio data so they never go stale.
// ─────────────────────────────────────────────────────────────────────────────
import { profile, getProfile } from './profile';
import { appCount, installsLabel, featuredApps } from './apps';
import { getLocale } from '@/lib/i18n';
import { askUr } from './i18n/ask-asad.ur';

export type AskNode = {
  id: string;
  q: string; // the question (a tappable chip, echoed as the visitor's message)
  a: string[]; // the reply — one entry per chat bubble
  follow?: string[]; // ids of follow-up questions to offer after this answer
  reveal?: boolean; // show the contact card after this answer (the lead funnel)
};

export type AskCategory = {
  id: string;
  label: string; // topic chip shown in the "Browse topics" menu
  intro: string; // line the bot says when the topic is opened
  nodes: string[]; // question ids in this topic
};

// A few live figures from the portfolio so the bot never contradicts the site.
const topApps = featuredApps.map((a) => a.name);

const enConfig = {
  name: 'Ask Asad',
  tagline: "Asad's portfolio assistant",
  status: 'Usually replies within a day',
  // TODO: this is the placeholder email from data/profile.ts — set your real one there.
  email: profile.email,
  contactHref: '#contact',
  // Shown on the contact card once a visitor says they want to work together.
  contactLead:
    "Tell me a little about your project — what you're building, your timeline, and what you need (mobile app / backend / full system / infrastructure). Asad reads every message and replies personally.",
};
const urConfig = {
  ...enConfig,
  name: askUr.config.name,
  tagline: askUr.config.tagline,
  status: askUr.config.status,
  contactLead: askUr.config.contactLead,
};
export const getAskConfig = () => (getLocale() === 'ur' ? urConfig : enConfig);

// Live figures for the CURRENT locale — getProfile() is Urdu in the Urdu state, so {location} /
// {years} carry Urdu values; appCount/installs are locale-independent.
function figures(): Record<string, string> {
  const p = getProfile();
  return {
    name: getAskConfig().name,
    years: p.yearsLabel,
    yearsLower: p.yearsLabel.toLowerCase(),
    appCount: String(appCount),
    installs: installsLabel,
    location: p.location,
    topApps: topApps.slice(0, 5).join(getLocale() === 'ur' ? '، ' : ', '),
  };
}
const fillWith = (fig: Record<string, string>) => (s: string): string =>
  s.replace(/\{(\w+)\}/g, (_, k: string) => (k in fig ? fig[k] : `{${k}}`));

// Opening bubbles when the chat is first opened. English answers use the English profile, so they
// stay English; the Urdu ones fill {token}s from the current-locale figures.
const enGreeting: string[] = [
  `👋 Hi! I'm ${enConfig.name} — here to help you explore Asad's work.`,
  'Tap a question below, or jump straight to “Work with Asad”.',
];
export const getAskGreeting = (): string[] =>
  getLocale() === 'ur' ? askUr.greeting.map(fillWith(figures())) : enGreeting;

// The first set of chips (a curated mix across topics + the funnel entry).
export const askIntroNodes: string[] = [
  'what-apps',
  'experience',
  'tech-stack',
  'top-apps',
  'process',
  'available',
];

const enAskNodes: AskNode[] = [
  // ── About ──────────────────────────────────────────────────────────────────
  {
    id: 'who',
    q: 'Who is Muhammad Asad?',
    a: [
      'Muhammad Asad is a full-stack developer and the founder of Biotic Apps Studio, based in Lahore, Pakistan and working with clients worldwide.',
      `With ${profile.yearsLabel.toLowerCase()} of experience and ${appCount}+ apps shipped, he builds complete systems — native mobile apps, real-time backends, IoT integrations, EV charging platforms, and enterprise SaaS dashboards.`,
    ],
    follow: ['what-apps', 'experience', 'biotic'],
  },
  {
    id: 'biotic',
    q: 'What is Biotic Apps Studio?',
    a: [
      "Biotic Apps Studio is Asad's full-stack product studio. It designs and ships complete systems end to end — native Android & iOS, Flutter, web frontends, Node.js backends, cloud infrastructure, and device integrations.",
      'You work directly with Asad, not a sales layer, so communication stays clear and fast.',
    ],
    follow: ['services', 'process', 'available'],
  },
  {
    id: 'where',
    q: 'Where is Asad based?',
    a: [`He's based in ${profile.location}, and works remotely with clients across every timezone.`],
    follow: ['available', 'services'],
  },
  // ── Experience ─────────────────────────────────────────────────────────────
  {
    id: 'experience',
    q: 'How much experience does he have?',
    a: [
      `${profile.yearsLabel} building mobile apps, with ${appCount}+ shipped across the App Store and Google Play and ${installsLabel} downloads in total.`,
      "That's real, published, in-market work — not demos.",
    ],
    follow: ['companies', 'track-record', 'top-apps'],
  },
  {
    id: 'companies',
    q: 'Where has he worked?',
    a: [
      'He founded Biotic Apps Studio, and previously worked as a Senior Flutter Developer and Senior Android Developer at iPlexSoft, an Android Developer at CodeCoy Technologies, and a Mobile App Developer at Blinkedge.',
    ],
    follow: ['track-record', 'tech-stack'],
  },
  {
    id: 'track-record',
    q: "What's his track record?",
    a: [
      `${installsLabel} downloads across ${appCount}+ apps, with strong store ratings — including a 5.0★ authenticator and multiple 4.5★+ utility apps — plus production backend systems and platforms.`,
    ],
    follow: ['top-apps', 'ev-system', 'available'],
  },
  // ── Projects & apps ────────────────────────────────────────────────────────
  {
    id: 'what-apps',
    q: 'What kind of products has he built?',
    a: [
      `${appCount}+ mobile apps plus backend systems and platforms — utilities, real-time IoT integrations, security, enterprise SaaS, and EV charging management.`,
      'He builds across the full stack: mobile apps that ship to the stores, real-time backends that scale, and enterprise dashboards that run businesses.',
    ],
    follow: ['ev-system', 'utilities', 'security', 'view-apps'],
  },
  {
    id: 'ev-system',
    q: 'Tell me about the EV Charging Management System',
    a: [
      'This is a full charge-point management platform built on OCPP 1.6 and 2.0 — the open protocol that charge stations speak.',
      'Stations connect over WebSockets; the backend handles real-time telemetry via MQTT, session lifecycle, pricing rules, and alerts. Operators manage everything through a React dashboard. Multi-tenant with Stripe billing.',
    ],
    follow: ['realtime', 'tech-stack', 'available'],
  },
  {
    id: 'utilities',
    q: 'Any utility & productivity apps?',
    a: [
      'Plenty — including Smart Print for HP Printers, a QR Code & Barcode Scanner, Coin Identifier (on-device vision), an AC remote, and a one-tap VPN.',
    ],
    follow: ['top-apps', 'view-apps', 'available'],
  },
  {
    id: 'security',
    q: 'Does he build security apps?',
    a: [
      'Yes — 2FA TOTP authenticators with encrypted cloud backup and easy device transfer. One of them holds a 5.0★ rating.',
    ],
    follow: ['top-apps', 'view-apps'],
  },
  {
    id: 'top-apps',
    q: 'What are some of his best apps?',
    a: [`A few highlights: ${topApps.slice(0, 5).join(', ')}.`, 'You can browse the full catalogue on the site.'],
    follow: ['view-apps', 'ev-system', 'available'],
  },
  {
    id: 'view-apps',
    q: 'Can I see the apps?',
    a: ['Absolutely — scroll to the Work section to browse every app, with screenshots and store links.'],
    follow: ['available', 'services'],
  },
  // ── Skills & tech ──────────────────────────────────────────────────────────
  {
    id: 'tech-stack',
    q: 'What technologies does he use?',
    a: [
      'Native: Kotlin & Jetpack Compose (Android), SwiftUI & Objective-C (iOS). Cross-platform: Flutter. Web: React, Next.js and Tailwind CSS.',
      'Plus Firebase, SQL, realtime databases and WebSockets on the data side.',
    ],
    follow: ['platforms', 'realtime', 'web'],
  },
  {
    id: 'platforms',
    q: 'Which platforms can he build for?',
    a: ['iOS and Android natively, cross-platform with Flutter, and the web — so your product can reach every screen.'],
    follow: ['cross-platform', 'services'],
  },
  {
    id: 'realtime',
    q: 'How does the real-time / device connectivity work?',
    a: [
      'Real-time systems use WebSockets for bidirectional communication, MQTT for IoT telemetry, and BLE/WiFi for direct device control — the same foundation behind the EV charging platform and device-integration apps.',
    ],
    follow: ['ev-system', 'tech-stack'],
  },
  {
    id: 'cross-platform',
    q: 'Does he do cross-platform (Flutter)?',
    a: [
      'Yes — he was a Senior Flutter Developer and builds cross-platform apps when one codebase for iOS and Android is the right call.',
    ],
    follow: ['platforms', 'services'],
  },
  {
    id: 'web',
    q: 'Does he build web too?',
    a: ['Yes — modern web with React, Next.js and Tailwind CSS (this very site is one example).'],
    follow: ['services', 'available'],
  },
  // ── Services & process ─────────────────────────────────────────────────────
  {
    id: 'services',
    q: 'What services does he offer?',
    a: [
      'Complete product development: mobile apps (native iOS & Android, Flutter), backends (Node.js, Firebase, PostgreSQL), cloud infrastructure (AWS, VPS), real-time systems (WebSockets, MQTT, OCPP), and enterprise dashboards.',
      'He also builds white-label apps and platforms that ship under your own brand, and handles store submission end to end.',
    ],
    follow: ['process', 'white-label', 'available'],
  },
  {
    id: 'process',
    q: 'How does he work?',
    a: [
      'Five clear stages: Discovery → Design → Build → Ship → Support.',
      'You get a defined scope, reviewable increments instead of a black box, and someone who handles the store submission and release for you.',
    ],
    follow: ['store-submission', 'timeline', 'available'],
  },
  {
    id: 'store-submission',
    q: 'Does he handle App Store / Play Store submission?',
    a: ['Yes — store submission, ASO basics, in-app purchases & subscriptions, and the release pipeline are all handled for you.'],
    follow: ['maintenance', 'available'],
  },
  {
    id: 'white-label',
    q: 'Can he sign an NDA or do white-label work?',
    a: ["Both, gladly. He'll sign an NDA, and regularly ships white-label apps under the client's own brand and store accounts."],
    follow: ['available', 'pricing'],
  },
  {
    id: 'maintenance',
    q: 'Do you support the app after launch?',
    a: ['Yes — post-launch monitoring, OS-update compatibility, and data-driven improvements based on real ratings and analytics.'],
    follow: ['available', 'pricing'],
  },
  {
    id: 'timeline',
    q: 'How long does an app take?',
    a: [
      'It depends on scope, but most focused builds ship in phases so you see progress early.',
      'Share your idea and Asad will give you a realistic timeline.', // TODO: add your typical ranges if you like
    ],
    follow: ['pricing', 'available'],
  },
  {
    id: 'pricing',
    q: 'What does it cost?',
    a: [
      'Asad works fixed-scope, hourly, or on a monthly retainer — whichever fits your project best.',
      'Pricing depends on scope, so the best next step is to share a few details and get a tailored quote.', // TODO: add starting prices if you want
    ],
    follow: ['quote', 'available'],
  },
  // ── Work together (the lead funnel) ────────────────────────────────────────
  {
    id: 'available',
    q: 'Are you available for new projects?',
    a: [
      '✅ Yes — Asad is currently taking on a limited number of new projects.',
      'Would you like to start a project, collaborate, or get a quote?',
    ],
    follow: ['start-project', 'collaborate', 'quote'],
  },
  {
    id: 'start-project',
    q: "I'd like to start a project",
    a: ["That's exactly what Asad loves to hear. 🚀 Here's how to reach him:"],
    reveal: true,
  },
  {
    id: 'collaborate',
    q: "I'm interested in collaborating",
    a: ["Wonderful — Asad is open to collaborations and partnerships. Let's talk:"],
    reveal: true,
  },
  {
    id: 'quote',
    q: 'Can I get a quote?',
    a: ['Happy to help. Send a short brief and Asad will reply with a tailored estimate:'],
    reveal: true,
  },
  {
    id: 'hire',
    q: 'I want to hire Asad',
    a: ["Excellent choice. 🙌 Here's the fastest way to get started:"],
    reveal: true,
  },
];

// Current locale: overlay translated q + filled answers per node id; untranslated nodes fall back.
export const getAskNodes = (): AskNode[] => {
  if (getLocale() !== 'ur') return enAskNodes;
  const f = fillWith(figures());
  return enAskNodes.map((n) => {
    const u = askUr.nodes[n.id];
    return u ? { ...n, q: u.q ?? n.q, a: (u.a ?? n.a).map(f) } : n;
  });
};

const enCategories: AskCategory[] = [
  {
    id: 'about',
    label: 'About Asad',
    intro: "Here's a bit about Asad:",
    nodes: ['who', 'biotic', 'where', 'experience', 'companies', 'track-record'],
  },
  {
    id: 'apps',
    label: 'Projects & products',
    intro: 'His products and systems:',
    nodes: ['what-apps', 'ev-system', 'utilities', 'security', 'top-apps', 'view-apps'],
  },
  {
    id: 'tech',
    label: 'Skills & tech',
    intro: 'The tech Asad works with:',
    nodes: ['tech-stack', 'platforms', 'realtime', 'cross-platform', 'web'],
  },
  {
    id: 'services',
    label: 'Services & process',
    intro: 'How Asad can help:',
    nodes: ['services', 'process', 'store-submission', 'white-label', 'maintenance', 'timeline', 'pricing'],
  },
  {
    id: 'work',
    label: 'Work with Asad',
    intro: "Let's talk about your project:",
    nodes: ['available', 'start-project', 'collaborate', 'quote', 'hire'],
  },
];

export const getAskCategories = (): AskCategory[] => {
  if (getLocale() !== 'ur') return enCategories;
  return enCategories.map((c) => {
    const u = (askUr.categories as Record<string, { label: string; intro: string }>)[c.id];
    return u ? { ...c, label: u.label, intro: u.intro } : c;
  });
};
