import type { UiKey } from './ui.en';

// Urdu UI strings. Typed Partial so a missing key falls back to English in t(). Tech/brand
// names and Western digits are kept as-is inside Urdu sentences. Authored translation — review
// recommended by a native speaker before launch.
export const ur: Partial<Record<UiKey, string>> = {
  // ---- Common / chrome ----
  'cta.available': 'نئے پراجیکٹس کے لیے دستیاب',
  'common.findMeOn': 'مجھے یہاں تلاش کریں',
  'a11y.skipToContent': 'مواد پر جائیں',
  'a11y.primaryNav': 'بنیادی',
  'a11y.mobileNav': 'موبائل',
  'a11y.footerNav': 'فوٹر',
  'site.title': 'اسد — فل اسٹیک ڈویلپر',
  'site.description':
    'فل اسٹیک ڈویلپر — موبائل ایپس، ریئل-ٹائم بیک اینڈز، EV اور IoT پلیٹ فارمز، اور انٹرپرائز SaaS۔',

  // ---- Language switcher ----
  'lang.toUrdu': 'اردو',
  'lang.toEnglish': 'English',
  'lang.aria': 'زبان تبدیل کریں',

  // ---- Custom-cursor labels ----
  'cursor.view': 'دیکھیں',
  'cursor.scroll': 'اسکرول',
  'cursor.ask': 'اسد سے پوچھیں',
  'cursor.close': 'بند کریں',
  'cursor.light': 'روشن',
  'cursor.dark': 'گہرا',
  'cursor.drag': 'گھسیٹیں',
  'cursor.toggle': 'ٹوگل',
  'cursor.lang': 'زبان',

  // ---- Theme toggle / copy email / demo ----
  'theme.toLight': 'روشن موڈ پر جائیں',
  'theme.toDark': 'گہرے موڈ پر جائیں',
  'copy.copied': 'ای میل کاپی ہو گیا',
  'copy.copy': 'ای میل ایڈریس کاپی کریں',
  'demo.eyebrow': 'عملی مظاہرہ دیکھیں',
  'demo.title': 'بے عیب تجربے کے لیے بنایا گیا',

  // ---- Navigation ----
  'nav.about': 'تعارف',
  'nav.experience': 'تجربہ',
  'nav.skills': 'مہارتیں',
  'nav.work': 'کام',
  'nav.process': 'طریقۂ کار',
  'nav.reviews': 'آراء',
  'nav.faq': 'عمومی سوالات',
  'nav.systems': 'سسٹمز',
  'nav.contact': 'رابطہ',
  'header.openMenu': 'مینو کھولیں',
  'header.closeMenu': 'مینو بند کریں',

  // ---- Hero ----
  'hero.iBuildFor': 'میں بناتا ہوں',
  'hero.word.ios': 'iOS',
  'hero.word.android': 'Android',
  'hero.word.web': 'ویب',
  'hero.word.realtime': 'ریئل-ٹائم',
  'hero.downloads': '{count} ڈاؤن لوڈز',
  'hero.acrossStores': 'App Store اور Google Play پر',
  'hero.scroll': 'مواد تک اسکرول کریں',

  // ---- About ----
  'about.eyebrow': 'تعارف',
  'about.title': 'مکمل سسٹمز بنانا — موبائل، بیک اینڈ، اور سب کچھ درمیان میں',
  'about.para2':
    'میں پورے اسٹیک میں کام کرتا ہوں: نیٹِو موبائل ایپس، ریئل-ٹائم بیک اینڈز، IoT ڈیوائس انٹیگریشنز، کلاؤڈ انفراسٹرکچر، اور انٹرپرائز ڈیش بورڈز — جو بھی پروڈکٹ کو چاہیے۔',
  'about.focusHeading': 'میں کس چیز پر توجہ دیتا ہوں',
  'about.focus.native.title': 'نیٹِو iOS اور Android',
  'about.focus.native.text': 'iOS پر SwiftUI اور Objective-C؛ Android پر Kotlin اور Jetpack Compose۔',
  'about.focus.casting.title': 'پیمنٹ اور سبسکرپشن سسٹمز',
  'about.focus.casting.text': 'پیمنٹ گیٹ ویز، اِن-ایپ خریداری، سبسکرپشنز، اور بلنگ — Stripe، RevenueCat، Google Pay، اور Apple Pay۔',
  'about.focus.connectivity.title': 'ریئل-ٹائم سسٹمز اور ڈیوائس کنیکٹیویٹی',
  'about.focus.connectivity.text': 'WebSockets، IoT انٹیگریشن، Bluetooth، REST/GraphQL APIs، اور لوکل نیٹ ورک پر ہارڈویئر کمیونیکیشن۔',
  'about.focus.cloud.title': 'بیک اینڈ اور کلاؤڈ انفراسٹرکچر',
  'about.focus.cloud.text': 'Firebase، AWS، اسکیل ایبل APIs، تصدیق، پش نوٹیفکیشنز، اور پروڈکشن اسکیل پر ڈیٹا بیس۔',
  'about.focus.enterprise.title': 'انٹرپرائز اور SaaS پلیٹ فارمز',
  'about.focus.enterprise.text': 'ایڈمن ڈیش بورڈز، CRM سسٹمز، اینالیٹکس، ملٹی-یوزر بزنس ایپس، اور رول-بیسڈ ایکسیس کنٹرول۔',
  'about.focus.backend.title': 'بیک اینڈ اور ڈیٹا',
  'about.focus.backend.text': 'Firebase (Realtime DB، Auth، FCM)، REST APIs، SQLite، Room اور Core Data۔',
  'about.focus.architecture.title': 'کلین آرکیٹیکچر اور ٹیسٹنگ',
  'about.focus.architecture.text': 'MVVM / Clean Architecture، ڈیپینڈنسی انجیکشن، یونٹ اور UI ٹیسٹس۔',
  'about.focus.ship.title': 'لانچ اور منیٹائزیشن',
  'about.focus.ship.text': 'اِن-ایپ خریداری اور سبسکرپشنز، AdMob، ASO اور CI/CD ریلیز پائپ لائنز۔',

  // ---- Statement ----
  'statement.eyebrow': 'میرے ساتھ کام کیوں کریں',
  'statement.headline.main': 'پہلے خاکے سے لے کر',
  'statement.headline.accent': 'پروڈکشن تک۔',
  'statement.body':
    'سات سال مکمل سسٹمز ڈیزائن اور شائع کرتے ہوئے — وہ موبائل ایپس جنہیں لوگ پسند کرتے ہیں، ریئل-ٹائم بیک اینڈز جو اسکیل ہوتے ہیں، اور انٹرپرائز پلیٹ فارمز جو کاروبار چلاتے ہیں۔',
  'metrics.downloads': 'ڈاؤن لوڈز',
  'metrics.apps': 'شائع شدہ ایپس',
  'metrics.rating': 'اوسط ریٹنگ',
  'metrics.years': 'سالہ تجربہ',

  // ---- Experience ----
  'exp.eyebrow': 'تجربہ',
  'exp.title': 'موبائل اور فل-اسٹیک پروڈکٹس بنانے کا 7 سالہ سفر',
  'exp.description':
    'پروڈکشن سسٹمز شائع کرنے کا ثابت شدہ ریکارڈ — موبائل ایپس، ریئل-ٹائم بیک اینڈز، IoT انٹیگریشنز، اور انٹرپرائز پلیٹ فارمز۔',

  // ---- Skills ----
  'skills.eyebrow': 'ٹیک اسٹیک',
  'skills.title': 'ہر ایپ کے پیچھے کے ٹولز',
  'skills.description':
    'موبائل، بیک اینڈ، کلاؤڈ، ڈیٹا بیسز، اور ریئل-ٹائم سسٹمز — تیزی سے شائع کرنے اور پروڈکشن میں اسکیل کرنے کے لیے چُنا گیا فل-اسٹیک ٹول کِٹ۔',
  'skills.tab.all': 'سب',
  'skills.filterAria': 'زمرے کے لحاظ سے مہارتیں چھانٹیں',
  'skills.group.languages': 'زبانیں اور فریم ورکس',
  'skills.group.backend': 'بیک اینڈ اور APIs',
  'skills.group.databases': 'ڈیٹابیسز اور ریئل ٹائم',
  'skills.group.cloud': 'کلاؤڈ اور DevOps',
  'skills.group.web': 'ویب اور فرنٹ اینڈ',
  'skills.group.mobile': 'موبائل اور اسٹورز',

  // ---- Apps / Portfolio ----
  'apps.eyebrow': 'پورٹ فولیو',
  'apps.title': '{count} ایپس شائع کیں۔ {installs} ڈاؤن لوڈز حاصل کیے۔',
  'apps.description':
    'اسکیل ایبل موبائل اور ٹیکنالوجی پروڈکٹس — یوٹیلیٹیز، ریئل-ٹائم سسٹمز، اور انٹرپرائز ٹولز — App Store اور Google Play پر شائع کیے گئے۔ اسکرین شاٹس اور تفصیلات دیکھنے کے لیے کسی بھی ایپ پر ٹیپ کریں۔',
  'apps.caseStudy': 'کیس اسٹڈی',
  'apps.viewDetails': 'تفصیلات دیکھیں',
  'apps.screenshotAlt': '{name} اسکرین شاٹ {n}',
  'apps.iconAlt': '{name} آئیکن',
  'catalogue.filterPlatformAria': 'پلیٹ فارم کے لحاظ سے ایپس چھانٹیں',
  'catalogue.filterCategoryAria': 'زمرے کے لحاظ سے ایپس چھانٹیں',
  'catalogue.all': 'سب',
  'catalogue.allCategories': 'تمام زمرے',
  'catalogue.platform.ios': 'iOS',
  'catalogue.platform.android': 'Android',

  // ---- Process ----
  'process.eyebrow': 'میں کیسے کام کرتا ہوں',
  'process.title': 'خیال سے لانچ تک — اور اس کے بعد بھی',
  'process.description':
    'ایک واضح، قابلِ تکرار طریقۂ کار تاکہ آپ کو ہمیشہ معلوم رہے کہ کیا ہو رہا ہے اور آگے کیا ہے۔',

  // ---- Works with ----
  'worksWith.eyebrow': 'انٹیگریشنز',
  'worksWith.title': 'ان پلیٹ فارمز کے ساتھ کام کرتا ہے جن پر کاروبار چلتے ہیں',
  'worksWith.description':
    'پیمنٹ گیٹ ویز اور کلاؤڈ پلیٹ فارمز سے لے کر ڈیوائس پروٹوکولز اور تھرڈ-پارٹی APIs تک — آپ کے اسٹیک کو جو بھی چاہیے، اس کے ساتھ انٹیگریٹ کرنے کے لیے بنایا گیا۔',

  // ---- Reviews ----
  'reviews.eyebrow': 'لوگ کیا کہتے ہیں',
  'reviews.title': 'کلائنٹس اور صارفین کا اعتماد',
  'reviews.description':
    'ان لوگوں کی رائے جن کے ساتھ میں نے ایپس بنائیں — اور ان لوگوں کی جو انہیں روزانہ استعمال کرتے ہیں۔',
  'reviews.prev': 'پچھلی آراء',
  'reviews.next': 'اگلی آراء',
  'reviews.stars': '5 میں سے {rating} ستارے',
  'reviews.goTo': 'رائے {n} پر جائیں',

  // ---- FAQ ----
  'faq.eyebrow': 'عمومی سوالات',
  'faq.title': 'سوالات، جواب کے ساتھ',
  'faq.description': 'وہ باتیں جو لوگ عام طور پر رابطہ کرنے سے پہلے جاننا چاہتے ہیں۔',
  'faq.stillHaveQ': 'اب بھی کوئی سوال ہے؟',
  'faq.askPre': 'کونے میں',
  'faq.askPost': 'پر ٹیپ کریں، یا پیغام بھیجیں — عموماً ایک دن میں جواب مل جاتا ہے۔',
  'faq.getInTouch': 'رابطہ کریں',

  // ---- Contact ----
  'contact.title': 'آئیے آپ کی اگلی پروڈکٹ بناتے ہیں',
  'contact.subtitle':
    'کوئی پروڈکٹ کا خیال، سسٹم بنانا ہو، یا کوئی عہدہ ذہن میں ہے؟ پیغام بھیجیں — میں ہر پیغام پڑھتا ہوں اور 24 گھنٹوں میں جواب دیتا ہوں۔',
  'contact.reachDirectly': 'مجھ سے براہِ راست رابطہ کریں',
  'contact.reachSub': 'ای میل یا سوشل ترجیح دیتے ہیں؟ مجھ تک پہنچنے کا تیز ترین طریقہ یہ ہے۔',
  'contact.email': 'ای میل',
  'contact.meta.location': 'مقام',
  'contact.meta.response': 'جواب کا وقت',
  'contact.meta.responseValue': '24 گھنٹوں کے اندر',
  'contact.meta.openTo': 'دستیاب برائے',
  'contact.meta.openToValue': 'فری لانس اور فُل-ٹائم',

  // ---- Contact form ----
  'form.title': 'پیغام بھیجیں',
  'form.subtitle': 'اپنے پراجیکٹ کے بارے میں بتائیں — میں 24 گھنٹوں میں جواب دوں گا۔',
  'form.name': 'نام',
  'form.namePlaceholder': 'آپ کا نام',
  'form.email': 'ای میل',
  'form.emailPlaceholder': 'you@company.com',
  'form.subject': 'یہ کس بارے میں ہے؟',
  'form.message': 'پیغام',
  'form.messagePlaceholder': 'چند سطریں کہ آپ کیا بنا رہے ہیں…',
  'form.send': 'پیغام بھیجیں',
  'form.sending': 'بھیجا جا رہا ہے…',
  'form.success': 'شکریہ — آپ کا پیغام بھیج دیا گیا ہے۔ میں 24 گھنٹوں میں جواب دوں گا۔',
  'form.errPrefix': 'خرابی: ',
  'form.errGeneric': 'کچھ غلط ہو گیا۔ براہِ کرم دوبارہ کوشش کریں۔',
  'form.errNetwork': 'نیٹ ورک کی خرابی۔ براہِ کرم دوبارہ کوشش کریں یا براہِ راست ای میل کریں۔',
  'form.disabledPre': 'فارم فعال کرنے کے لیے',
  'form.disabledPost': 'سیٹ کریں۔',
  'form.subjectPrefix': 'پورٹ فولیو — ',
  'form.inquiry.project': 'پراجیکٹ انکوائری',
  'form.inquiry.job': 'ملازمت کا موقع',
  'form.inquiry.collab': 'اشتراک',
  'form.inquiry.other': 'کچھ اور',

  // ---- Ask Asad (chrome) ----
  'ask.launcherAria': '{name} — اس کے کام کے بارے میں بات کریں',
  'ask.dialogAria': '{name} — اسسٹنٹ',
  'ask.close': 'چیٹ بند کریں',
  'ask.browseTopics': '📋 موضوعات دیکھیں',
  'ask.startOver': '↺ دوبارہ شروع کریں',
  'ask.workWith': '🤝 اسد کے ساتھ کام کریں',
  'ask.topics': '↩ موضوعات',
  'ask.menuPrompt': 'ضرور — آپ کیا جاننا چاہیں گے؟',
  'ask.sendRequirements': 'اپنی ضروریات بھیجیں',

  // ---- App detail page ----
  'app.metaTitle': '{name} — محمد اسد',
  'app.allApps': 'تمام ایپس',
  'app.preview': 'پیش منظر',
  'app.screenshotsFrom': '{store} سے {count} اسکرین شاٹس',
  'app.aboutThis': 'اس ایپ کے بارے میں',
  'app.information': 'معلومات',
  'app.info.platform': 'پلیٹ فارم',
  'app.info.developer': 'ڈویلپر',
  'app.info.category': 'زمرہ',
  'app.info.rating': 'ریٹنگ',
  'app.info.downloads': 'ڈاؤن لوڈز',
  'app.info.version': 'ورژن',
  'app.info.size': 'سائز',
  'app.info.updated': 'اپ ڈیٹ شدہ',
  'app.info.ageRating': 'عمر کی درجہ بندی',
  'app.info.languages': 'زبانیں',
  'app.downloads': '{count} ڈاؤن لوڈز',
  'app.sizeValue': '{n} MB',
  'app.lang.one': '{count} زبان',
  'app.lang.other': '{count} زبانیں',
  'app.caseStudy': 'کیس اسٹڈی',
  'app.howBuilt': 'یہ کیسے بنائی گئی',
  'app.cs.problem': 'مسئلہ',
  'app.cs.challenge': 'چیلنج',
  'app.cs.solution': 'حل',
  'app.cs.result': 'نتیجہ',
  'app.moreIn': '{category} میں مزید',
  'app.viewAppStore': 'App Store پر دیکھیں',
  'app.getOnPlay': 'Google Play پر حاصل کریں',

  // ---- Tech stack detail ----
  'stack.viewAria': '{name} کی تفصیلات دیکھیں',
  'stack.metaTitle': '{name} — ٹیک اسٹیک · محمد اسد',
  'stack.allSkills': 'تمام مہارتیں',
  'stack.latest': 'تازہ ترین',
  'stack.updated': '{date} کو اپ ڈیٹ ہوا',
  'stack.about': 'جائزہ',
  'stack.readMore': 'مزید پڑھیں',
  'stack.howItWorks': 'یہ کیسے کام کرتا ہے',
  'stack.flow': 'مرحلہ وار بہاؤ',
  'stack.flowSub': 'سورس سے چلنے تک، مرحلہ وار۔',
  'stack.latestChanges': 'تازہ ترین تبدیلیاں',
  'stack.links': 'لنکس',
  'stack.link.website': 'ویب سائٹ',
  'stack.link.docs': 'دستاویزات',
  'stack.link.source': 'سورس کوڈ',
  'stack.moreIn': '{group} میں مزید',

  // ---- 404 ----
  'nf.code': '404',
  'nf.title': 'صفحہ نہیں ملا',
  'nf.body': 'آپ جو صفحہ تلاش کر رہے ہیں وہ موجود نہیں یا منتقل ہو چکا ہے۔',
  'nf.back': 'واپس ہوم',

  // ---- Footer ----
  'footer.tagline': '{eyebrow} — موبائل ایپس، بیک اینڈز، اور مکمل سسٹمز بنانا۔',
  'footer.copy': '© {name} — فل اسٹیک ڈویلپر',

  // ---- Systems section ----
  'systems.eyebrow': 'میرے بنائے گئے سسٹمز',
  'systems.title': 'مکمل پلیٹ فارمز — صرف ایپس نہیں',
  'systems.description':
    'مکمل سسٹم آرکیٹیکچر پراجیکٹس: ریئل-ٹائم بیک اینڈز، ڈیوائس انٹیگریشنز، انٹرپرائز ڈیش بورڈز، اور کلاؤڈ انفراسٹرکچر۔',
  'systems.stack': 'ٹیک اسٹیک',
  'systems.highlights': 'اہم خصوصیات',
  'systems.viewPrototype': 'پروٹوٹائپ دیکھیں',
  'footer.built': 'Next.js سے بنایا گیا · GitHub Pages پر تعینات',
};
