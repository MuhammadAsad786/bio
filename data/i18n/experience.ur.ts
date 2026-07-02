import type { ExperienceEntry } from '@/lib/types';

// Urdu overlay for data/experience.ts, aligned by array index (order is fixed). Company names
// stay Latin; product names inside highlights (Shopzy Cashier, “معكم للمستشارين”) are kept as-is.
export const experienceUr: Array<Partial<ExperienceEntry>> = [
  {
    role: 'بانی و مینیجنگ ڈائریکٹر',
    location: 'لاہور، پنجاب، پاکستان',
    summary:
      'Biotic Apps Studio کے بانی — Android، Flutter اور ویب پر موبائل ایپ ڈویلپمنٹ اور خدمات کی قیادت، اور کلائنٹ و اِن-ہاؤس پروڈکٹس کو سرے سے آخر تک شائع کرنا۔',
    highlights: [
      'Android، Flutter اور ویب پر پروڈکشن موبائل ایپس بناتا اور شائع کرتا ہوں۔',
      'اسٹوڈیو چلانا: کلائنٹ ڈیلیوری، ٹیم اور خدمات۔',
    ],
  },
  {
    role: 'سینئر Flutter ڈویلپر',
    location: 'کراچی، سندھ، پاکستان',
    summary:
      'iPlexSoft میں Flutter ڈویلپمنٹ، کراس-پلیٹ فارم موبائل فیچرز بنانا (فُل-ٹائم، آن-سائٹ)۔',
    highlights: ['فُل-ٹائم، آن-سائٹ ٹیم میں Flutter ایپ فیچرز فراہم کیے۔'],
  },
  {
    role: 'سینئر Android ڈویلپر',
    location: 'لاہور، پنجاب، پاکستان',
    summary: 'iPlexSoft میں سینئر Android ڈویلپر، Google Play پر پروڈکشن ایپس شائع کرنا۔',
    highlights: [
      'Google Play پر ایپس شائع کیں، بشمول “معكم للمستشارين” اور Shopzy Cashier — ایک ریستوران مینجمنٹ سسٹم۔',
      'مہارتیں: Kotlin، پراجیکٹ مینجمنٹ اور مزید۔',
    ],
  },
  {
    role: 'Android ڈویلپر',
    location: 'جوہر ٹاؤن، لاہور',
    summary: 'فُل-ٹائم Android ڈویلپر، ریئل-ٹائم، ڈیٹا پر مبنی ایپس بنانا۔',
    highlights: ['Firebase Realtime Database، RxJava اور مزید کے ساتھ کام کیا۔'],
  },
  {
    role: 'موبائل ایپ ڈویلپر',
    location: 'لاہور ضلع، پنجاب، پاکستان',
    summary: 'Android اور کراس-پلیٹ فارم پراجیکٹس پر موبائل ایپ ڈویلپمنٹ۔',
    highlights: [],
  },
];
