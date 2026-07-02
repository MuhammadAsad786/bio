// Urdu overlay for data/case-studies.ts, keyed by app slug. `metricLabels` are aligned with the
// English metrics array order; metric VALUES (1-tap, 4.5★+ …) are kept from the English source.
type CaseStudyUr = {
  role: string;
  problem: string;
  challenge: string;
  solution: string;
  result: string;
  metricLabels: string[];
};

export const caseStudiesUr: Record<string, CaseStudyUr> = {
  'smart-view-for-samsung-tv': {
    role: 'سولو ڈویلپر — ڈیزائن، iOS اور Android، ریلیز',
    problem:
      'کاسٹنگ ایپس بدنامِ زمانہ حد تک غیر مستحکم ہیں: صارف توقع کرتے ہیں کہ فون فوراً کسی بھی Samsung TV پر مرر کرے، لیکن دریافت اور ہینڈشیک فرم ویئر کے سالوں اور نیٹ ورک سیٹ اپ کے لحاظ سے مختلف ہوتے ہیں۔',
    challenge:
      'قابلِ اعتماد لوکل-نیٹ ورک دریافت اور کم-لیٹنسی مررنگ پائپ لائن جو ایک دہائی کے Samsung ماڈلز پر کام کرے — بغیر بیٹری ختم کیے یا کنکشن گرائے۔',
    solution:
      'DIAL فال بیکس کے ساتھ SSDP/UPnP پر ڈیوائس دریافت، ایک مضبوط WebSocket کنٹرول چینل، اور فی ڈیوائس کلاس ٹیون کی گئی اڈاپٹیو مررنگ پائپ لائن بنائی۔ اسے واضح کنکشن اسٹیٹس کے ساتھ ون-ٹیپ، App-Store کے لیے تیار UI میں لپیٹ دیا۔',
    result:
      'مسلسل بلند اسٹور ریٹنگ اور لاکھوں انسٹالز، جہاں ریویوز میں “فوراً کنیکٹ ہوتی ہے / کبھی لیگ نہیں کرتی” ایک بار بار آنے والا موضوع ہے۔',
    metricLabels: ['کنیکٹ فلو', 'سپورٹ شدہ TV ماڈلز', 'اسٹور ریٹنگ'],
  },
  'screen-mirror-for-roku-tv': {
    role: 'سولو ڈویلپر — ڈیزائن، نیٹِو بِلڈ، ASO',
    problem:
      'Roku صارف ایک ہی ایپ سے میڈیا مرر کرنا اور اپنا ٹی وی کنٹرول کرنا چاہتے تھے، لیکن موجودہ آپشنز اشتہار سے بھرپور اور مصروف ہوم نیٹ ورکس پر ناقابلِ اعتماد تھے۔',
    challenge:
      'Roku کے ECP پروٹوکول کا استعمال کرتے ہوئے ایک تیز ریموٹ + مررنگ تجربہ جو نیٹ ورک میں رش کے باوجود بھی فعال رہے۔',
    solution:
      'فوری ریموٹ کنٹرول کے لیے Roku ECP، ایک صاف مررنگ راستہ، اور Wake-on-LAN/خودکار دوبارہ کنکشن نافذ کیا تاکہ ایپ “بس کام کرے۔” UI کو کم سے کم اور منیٹائزیشن کو غیر مزاحم رکھا۔',
    result:
      'مضبوط ریٹینشن اور ریٹنگز، جہاں صارف خاص طور پر رفتار اور صاف، کم-اشتہار انٹرفیس کی تعریف کرتے ہیں۔',
    metricLabels: ['ریموٹ ریسپانس', 'دوبارہ کنکشن', 'ٹاپ ریویوز'],
  },
};
