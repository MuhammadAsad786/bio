// Client / user testimonials shown in the Reviews section.
// Keep `rating` 1–5 (whole stars). `quote` is the review body; `name`/`role` identify the reviewer.
// These are sample/placeholder reviews — swap in real ones when available.

import { getLocale } from '@/lib/i18n';
import { overlayBy } from '@/lib/i18n/merge';
import { reviewsUr } from '@/data/i18n/reviews.ur';

export type Review = {
  /** Review body shown as the quote. */
  quote: string;
  /** Reviewer display name. */
  name: string;
  /** Reviewer title / company / context (e.g. "CEO, Acme" or "App Store user"). */
  role: string;
  /** Whole-star rating, 1–5. */
  rating: number;
};

const enReviews: Review[] = [
  // Real LinkedIn recommendation.
  {
    quote:
      'He is young and energetic to code. He is a team player with the ability to understand the work and environment. I would recommend him highly for any type of organisation because of his sincerity, loyalty, and responsibility. Wish him all the best for his future.',
    name: 'Waseem Akram Arain',
    role: 'App Developer — worked with Muhammad on the same team',
    rating: 5,
  },
  // Real app / client reviews.
  {
    quote:
      'The smart view tv cast is too much app i\'ve seen. It works so fast and it detected my TV is so smoothly. Go Ahead',
    name: 'Willian Pacho',
    role: 'Google Play user',
    rating: 5,
  },
  {
    quote:
      'Samsung Smart View – Cast To is a very useful and easy-to-use app. It allows smooth screen sharing from mobile to Samsung TV, Android TV, Roku, and Fire TV. The Miracast and Chromecast support makes the connection fast and stable. You can easily cast videos, photos, games, and music on a big screen with good quality. The interface is simple and user-friendly. Highly recommended for anyone who wants to enjoy mobile content on a larger screen. ⚡️',
    name: 'Muhammad Mohib',
    role: 'Google Play user',
    rating: 5,
  },
  {
    quote:
      'EXCEPTIONAL EXPERIENCE! I have worked with many developers in the past and this was my best experience by far. I\'m so happy with how everything turned out and it was perfect from day one. Clear communication, amazing work ethic, AND above and beyond work. Can\'t wait to work with you again!',
    name: 'theAlphacop',
    role: 'Client',
    rating: 5,
  },
  {
    quote:
      'Great work! He quickly understood what I needed and delivered exactly as expected — super easy to work with, would hire again.',
    name: 'oripik',
    role: 'Client',
    rating: 5,
  },
];

const urReviews = overlayBy(enReviews, (r) => r.name, reviewsUr);
export const getReviews = (): Review[] => (getLocale() === 'ur' ? urReviews : enReviews);
