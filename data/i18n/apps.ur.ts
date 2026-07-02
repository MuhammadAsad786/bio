// Urdu overlay for data/apps.ts. App `name`s are real store-listing titles and are kept as
// published (Latin); only the descriptive `summary` and the `category` are localized. Brand
// names (Samsung, Roku, HP…) stay Latin inside the Urdu summaries.

// Category map — applied to BOTH APP_CATEGORIES and each app's `category` from one source, so the
// display label and the `===` filter key stay in sync within the Urdu build.
export const categoryUr: Record<string, string> = {
  'TV Remotes & Casting': 'ٹی وی ریموٹس اور کاسٹنگ',
  'Utilities & Productivity': 'یوٹیلیٹیز اور پروڈکٹیویٹی',
  Security: 'سیکیورٹی',
  'Lifestyle & Entertainment': 'لائف اسٹائل اور تفریح',
};

// Per-app summary, keyed by slug (icon basename).
export const appSummaryUr: Record<string, string> = {
  'coin-identifier-scanner-value':
    'اپنے کیمرے کو سکے پر تان کر آن-ڈیوائس ویژن سے اسے پہچانیں اور اس کی قیمت کا اندازہ لگائیں۔',
  'smart-view-for-samsung-tv':
    'اپنی iPhone اسکرین کو مرر کریں اور تصاویر، ویڈیو اور آڈیو Samsung اسمارٹ ٹی ویز پر کاسٹ کریں۔',
  'smart-print-for-hp-printers':
    'دستاویزات، PDFs اور تصاویر براہِ راست اپنے فون سے Wi-Fi پر پرنٹ کریں۔',
  'screen-mirror-for-roku-tv':
    'اپنی Android اسکرین اور میڈیا کو چند ٹیپس میں Roku اور TCL Roku ٹی ویز پر کاسٹ کریں۔',
  'universal-remote-for-roku-tv':
    'آپ کی iPhone پر مکمل Roku ریموٹ — نیویگیشن، کی بورڈ، ایپس اور کاسٹنگ۔',
  'qr-code-reader-barcode-scanner':
    'تیز، بے جھنجھٹ QR اور بارکوڈ اسکیننگ، تاریخچہ اور فوری اقدامات کے ساتھ۔',
  'remotix-tv-remote-control':
    'آپ کے گھر کے اسمارٹ ٹی ویز اور اسٹریمنگ باکسز کے لیے ایک یونیورسل Wi-Fi ریموٹ۔',
  'remotex-universal-remote-app':
    'متعدد اسمارٹ-ٹی وی برانڈز کنٹرول کرنے اور اپنی iPhone سے میڈیا کاسٹ کرنے کے لیے ایک ہی ایپ۔',
  'smart-control-mobile-tv-remote':
    'اسمارٹ ٹی ویز کے لیے ایک جیبی ریموٹ، صاف اور جیسچر-دوست کنٹرول پیڈ کے ساتھ۔',
  'smartview-for-samsung-smart-tv':
    'اپنی Android اسکرین کو Samsung اور LG اسمارٹ ٹی ویز پر کاسٹ اور مرر کریں۔',
  'samsung-smart-view-tv-mirror':
    'فوری کنیکٹ اور میڈیا کاسٹنگ کے ساتھ اپنے فون کو Samsung ٹی ویز پر مرر کریں۔',
  'smart-view-for-samsung-tv-2': 'Samsung اسمارٹ ٹی ویز کے لیے اسکرین مررنگ اور Miracast۔',
  'samsung-smart-view-tv-cast':
    'اپنے نیٹ ورک پر تصاویر اور ویڈیو Samsung اور Vizio اسمارٹ ٹی ویز پر کاسٹ کریں۔',
  'smart-view-for-samsung-tv-cast': 'Samsung اسمارٹ ٹی ویز اور LCD ڈسپلیز پر اسکرین کاسٹنگ۔',
  'roku-mirror-screen-amp-cast-tv':
    'اپنے Android ڈیوائس سے Roku اور TCL Roku ٹی ویز پر مرر اور کاسٹ کریں۔',
  'fire-stick-fire-tv-remote':
    'مکمل نیویگیشن اور کی بورڈ کے ساتھ Amazon Fire TV اور Fire Stick کے لیے ایک ریموٹ۔',
  'remote-for-apple-tv': 'لوکل نیٹ ورک پر Android فون سے اپنا Apple TV کنٹرول کریں۔',
  'tv-remote-for-vizio-smart-tv':
    'فوری ایپ لانچرز کے ساتھ Vizio اسمارٹ ٹی ویز کے لیے ایک SmartCast ریموٹ۔',
  'ac-remote-control-all-carrier':
    'برانڈز کی وسیع رینج کو سپورٹ کرنے والا ایک یونیورسل ایئر-کنڈیشنر ریموٹ۔',
  'apple-carplay-app-for-android':
    'Android فونز کے لیے ایک سادہ CarPlay طرز کا ڈرائیونگ ڈیش بورڈ۔',
  'instant-vpn-fast-vpn-client': 'نجی براؤزنگ کے لیے ایک ہلکا، ون-ٹیپ VPN پراکسی کلائنٹ۔',
  'authenticator-app-cloud-backup':
    'انکرپٹڈ کلاؤڈ بیک اپ اور آسان ڈیوائس ٹرانسفر کے ساتھ ایک 2FA TOTP اتھینٹیکیٹر۔',
  'authenticator-app-2fa-secure': 'اپنے آن لائن اکاؤنٹس کے لیے محفوظ دو-عنصری (TOTP) کوڈز بنائیں۔',
  'santa-christmas-prank-call':
    'خاندانی تفریح کے لیے ایک تہوارانہ جعلی Santa وائس/ویڈیو کال تجربہ۔',
  'turbans-photo-editor': 'اپنی تصاویر میں روایتی پگڑیاں اور ثقافتی ملبوسات آزمائیں۔',
  'full-audery-body-scanner-xray': 'تفریح کے لیے ایک نوویلٹی آگمینٹڈ-ریئلٹی کیمرہ پرینک ایپ۔',
  'fahad-tutoring-solutions': 'طلبہ کے لیے ایک ٹیوشن اور سیکھنے کے وسائل کی ایپ۔',
  'anytime-work': 'قریبی کام تلاش کرنے کے لیے ایک سادہ جابز اور گِگ-ورک براؤزر۔',
};
