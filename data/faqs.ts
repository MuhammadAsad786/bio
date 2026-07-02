import type { Faq } from '@/lib/types';
import { getLocale } from '@/lib/i18n';
import { overlayByIndex } from '@/lib/i18n/merge';
import { faqsUr } from '@/data/i18n/faqs.ur';

// Common questions clients ask before reaching out. Native <details> accordion — no JS needed.
// TODO: replace these placeholder answers with your real availability, rates and terms.
const enFaqs: Faq[] = [
  {
    q: 'Are you available for new projects?',
    a: 'Yes — I take on a limited number of mobile projects at a time to keep quality high. Reach out via the contact form with a short description and timeline and I’ll get back to you.',
  },
  {
    q: 'How do you work — fixed scope, hourly, or retainer?',
    a: 'All three. Small, well-defined builds work well as fixed scope; ongoing work and maintenance fit a monthly retainer; open-ended R&D is usually hourly. We’ll pick whatever fits your project.',
  },
  {
    q: 'Which platforms and technologies do you cover?',
    a: 'Native iOS (SwiftUI, Objective-C) and Android (Kotlin, Jetpack Compose), plus real-time device control over the local network (Google Cast, DIAL, SSDP/UPnP, WebSockets) for TV remotes, mirroring and casting.',
  },
  {
    q: 'What timezone are you in and how do you communicate?',
    a: 'I work remotely and overlap comfortably with most timezones. Expect clear, regular updates and reviewable increments rather than a black box until launch.',
  },
  {
    q: 'Can you sign an NDA or do white-label work?',
    a: 'Absolutely. I’m happy to sign an NDA, and I regularly build white-label apps that ship under the client’s own developer account and brand.',
  },
  {
    q: 'Do you handle App Store / Play Store submission?',
    a: 'Yes — I take care of store submission, ASO basics, in-app purchases/subscriptions and release pipelines, and can support the app after launch.',
  },
];

const urFaqs = overlayByIndex(enFaqs, faqsUr);
export const getFaqs = (): Faq[] => (getLocale() === 'ur' ? urFaqs : enFaqs);
