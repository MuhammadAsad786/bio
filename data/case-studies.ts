import type { CaseStudy } from '@/lib/types';
import { getLocale } from '@/lib/i18n';
import { caseStudiesUr } from '@/data/i18n/case-studies.ur';

// Deep-dive write-ups attached to specific apps by slug (see app/apps/[slug]/page.tsx).
// A "Case study" block renders on the detail page, and a badge appears on the featured card.
// TODO: replace this PLACEHOLDER copy/metrics with the real story and figures.
const enCaseStudies: Record<string, CaseStudy> = {
  'smart-view-for-samsung-tv': {
    role: 'Solo developer — design, iOS & Android, release',
    problem:
      'Casting apps are notoriously flaky: users expect a phone to mirror to any Samsung TV instantly, but discovery and handshakes differ across firmware years and network setups.',
    challenge:
      'Reliable local-network discovery and a low-latency mirroring pipeline that works across a decade of Samsung models — without draining the battery or dropping the connection.',
    solution:
      'Built device discovery over SSDP/UPnP with DIAL fallbacks, a resilient WebSocket control channel, and an adaptive mirroring pipeline tuned per device class. Wrapped it in a one-tap, App-Store-ready UI with clear connection states.',
    result:
      'A consistently high store rating and millions of installs, with “connects instantly / never lags” a recurring theme in reviews.',
    metrics: [
      { value: '1-tap', label: 'Connect flow' },
      { value: '10+ yrs', label: 'TV models supported' },
      { value: '4.5★+', label: 'Store rating' },
    ],
  },
  'screen-mirror-for-roku-tv': {
    role: 'Solo developer — design, native build, ASO',
    problem:
      'Roku users wanted to mirror media and control their TV from one app, but existing options were ad-heavy and unreliable on busy home networks.',
    challenge:
      'A snappy remote + mirroring experience using Roku’s ECP protocol that stays responsive even when the network is congested.',
    solution:
      'Implemented Roku ECP for instant remote control, a clean mirroring path, and Wake-on-LAN/auto-reconnect so the app “just works.” Kept the UI minimal and the monetization unobtrusive.',
    result:
      'Strong retention and ratings, with users specifically calling out the speed and the clean, ad-light interface.',
    metrics: [
      { value: 'Instant', label: 'Remote response' },
      { value: 'Auto', label: 'Reconnect' },
      { value: '5★', label: 'Top reviews' },
    ],
  },
};

const urCaseStudies: Record<string, CaseStudy> = Object.fromEntries(
  Object.entries(enCaseStudies).map(([slug, cs]) => {
    const u = caseStudiesUr[slug];
    if (!u) return [slug, cs];
    return [
      slug,
      {
        ...cs,
        role: u.role,
        problem: u.problem,
        challenge: u.challenge,
        solution: u.solution,
        result: u.result,
        metrics: cs.metrics.map((m, i) => ({ ...m, label: u.metricLabels[i] ?? m.label })),
      },
    ];
  }),
);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return (getLocale() === 'ur' ? urCaseStudies : enCaseStudies)[slug];
}
