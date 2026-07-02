// Canonical content types — the single source of truth for everything in data/*.ts.
// Data files import ONLY types from here and reference icons by string key (see lib/icons.ts),
// so they stay plain data with zero React imports and remain safe for non-developers to edit.

export type Social = {
  label: string; // accessible label, e.g. "GitHub"
  href: string; // full URL or mailto:
  icon: string; // key into lib/icons.ts, e.g. "github"
};

export type Stat = { value: string; label: string };

export type CTA = { label: string; href: string };

export type Profile = {
  name: string;
  eyebrow: string; // e.g. "Mobile App Developer"
  role: string; // e.g. "iOS · Android · Cross-platform"
  yearsLabel: string; // e.g. "7+ Years"
  tagline: string; // one value sentence under the hero
  bio: string; // longer paragraph for the About section
  photo?: string; // optional headshot for the About card; falls back to initials avatar
  stats: Stat[];
  ctas: { primary: CTA; secondary: CTA };
  socials: Social[];
  location: string; // shown in the contact section
  address: string; // multiline address for the contact section
  email: string;
};

// --- Portfolio-strength sections (timeline / metrics / process / FAQ / case studies) ---

export type ExperienceEntry = {
  company: string;
  role: string;
  period?: string; // optional, e.g. "2022 — Present" (omit to hide dates)
  location?: string;
  summary: string;
  highlights: string[]; // 1–3 bullet outcomes
};

export type ProcessStep = {
  icon: string; // key into lib/icons.ts
  title: string;
  text: string;
  more?: string; // extra detail revealed when the card is hovered/expanded
};

export type Faq = { q: string; a: string };

export type Metric = {
  icon: string; // key into lib/icons.ts
  value: string; // e.g. "100M+"
  label: string; // e.g. "Downloads"
};

export type CaseStudy = {
  problem: string;
  role: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: Stat[]; // headline outcome figures
  video?: string; // optional root-relative demo clip (run through asset())
  links?: { label: string; href: string }[];
};

// --- Used by later milestones (Skills / Projects / Clients) ---

// Per-technology detail data, merged from the AUTO-GENERATED data/tech-data.ts (scraped
// description/version/changelog from Wikipedia + endoflife.date + GitHub) plus seeded
// example/flow. Drives the /stack/<slug>/ detail pages. `descriptionUr` is the Urdu
// description (scraped where available); other prose is localized via data/i18n/tech-data.ur.ts.
export type TechData = {
  description?: string; // English summary (Wikipedia extract / seed)
  descriptionUr?: string; // Urdu summary (Urdu Wikipedia / overlay) — falls back to English
  version?: string; // latest version, e.g. "2.4.0"
  released?: string; // ISO date or human date of the latest release
  changes?: string[]; // bullets from the latest release notes
  example?: string; // short "how it works" code/usage snippet
  exampleLang?: string; // language label for the code block, e.g. "kotlin"
  flow?: string[]; // ordered steps for the TechFlow diagram
  homepage?: string;
  repo?: string; // GitHub "owner/name"
  docs?: string; // documentation URL
  wikiUrl?: string; // Wikipedia article URL ("Read more")
};

export type SkillItem = { name: string; icon?: string; color?: string; tech?: TechData };
export type SkillGroup = { label: string; items: SkillItem[] };

export type ProjectImage = { src: string; alt: string };

export type Project = {
  slug: string; // unique URL segment -> /projects/<slug>/
  title: string;
  role: string;
  year: string;
  client?: string;
  summary: string; // card blurb
  description: string; // detail-page paragraph(s)
  cover: string; // grid card image (root-relative; run through asset())
  images: ProjectImage[]; // carousel on the detail page
  platforms: string[]; // e.g. ['iOS', 'Android']
  tech: string[]; // tag chips
  highlights: string[]; // bullet list on the detail page
  links?: { label: string; href: string }[];
};

export type Client = {
  name: string;
  logo: string; // root-relative; run through asset()
  url?: string;
  testimonial?: string;
  author?: string; // person giving the testimonial
  authorRole?: string; // e.g. 'CTO · Northwind'
  rating?: number; // 1–5 stars
};
