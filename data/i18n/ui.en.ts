// English UI strings — the source of truth + the UiKey type. Urdu lives in ui.ur.ts (a Partial,
// so missing keys fall back to English). `{token}` braces are interpolated by t() in lib/i18n.ts.
// Data-driven copy (apps, bio, FAQs, reviews, the Ask Asad script…) is NOT here — it lives in the
// data/*.ts files and their data/i18n/*.ur.ts overlays.

export const en = {
  // ---- Common / chrome ----
  'cta.available': 'Available for new projects',
  'common.findMeOn': 'Find me on',
  'a11y.skipToContent': 'Skip to content',
  'a11y.primaryNav': 'Primary',
  'a11y.mobileNav': 'Mobile',
  'a11y.footerNav': 'Footer',
  'site.title': 'Asad — Full-Stack Engineer & System Architect',
  'site.description':
    'Full-stack engineer & system architect — mobile apps, real-time backends, EV & IoT platforms, and enterprise SaaS.',

  // ---- Language switcher ----
  'lang.toUrdu': 'اردو',
  'lang.toEnglish': 'English',
  'lang.aria': 'Change language',

  // ---- Custom-cursor labels (desktop hover hints) ----
  'cursor.view': 'View',
  'cursor.scroll': 'Scroll',
  'cursor.ask': 'Ask Asad',
  'cursor.close': 'Close',
  'cursor.light': 'Light',
  'cursor.dark': 'Dark',
  'cursor.drag': 'Drag',
  'cursor.toggle': 'Toggle',
  'cursor.lang': 'Language',

  // ---- Theme toggle / copy email / demo ----
  'theme.toLight': 'Switch to light mode',
  'theme.toDark': 'Switch to dark mode',
  'copy.copied': 'Email copied',
  'copy.copy': 'Copy email address',
  'demo.eyebrow': 'See it in action',
  'demo.title': 'Built to feel effortless',

  // ---- Navigation (Header + Footer) ----
  'nav.about': 'About',
  'nav.experience': 'Experience',
  'nav.skills': 'Skills',
  'nav.work': 'Work',
  'nav.process': 'Process',
  'nav.reviews': 'Reviews',
  'nav.faq': 'FAQ',
  'nav.systems': 'Systems',
  'nav.contact': 'Contact',
  'header.openMenu': 'Open menu',
  'header.closeMenu': 'Close menu',

  // ---- Hero ----
  'hero.iBuildFor': 'I build for',
  'hero.word.ios': 'iOS',
  'hero.word.android': 'Android',
  'hero.word.web': 'the web',
  'hero.word.realtime': 'real-time',
  'hero.downloads': '{count} downloads',
  'hero.acrossStores': 'across the App Store & Google Play',
  'hero.scroll': 'Scroll to content',

  // ---- About ----
  'about.eyebrow': 'About',
  'about.title': 'Building complete systems — mobile, backend, and everything in between',
  'about.para2':
    'I build across the full stack: native mobile apps, real-time backends, IoT device integrations, cloud infrastructure, and enterprise dashboards — whatever the product needs.',
  'about.focusHeading': 'What I focus on',
  'about.focus.native.title': 'Native iOS & Android',
  'about.focus.native.text': 'SwiftUI & Objective-C on iOS; Kotlin & Jetpack Compose on Android.',
  'about.focus.casting.title': 'Payments & Subscription Systems',
  'about.focus.casting.text': 'Payment gateways, in-app purchases, subscriptions, and billing — Stripe, RevenueCat, Google Pay, and Apple Pay.',
  'about.focus.connectivity.title': 'Real-Time Systems & Device Connectivity',
  'about.focus.connectivity.text': 'WebSockets, IoT integrations, Bluetooth, REST/GraphQL APIs, and hardware communication over local networks.',
  'about.focus.cloud.title': 'Backend & Cloud Infrastructure',
  'about.focus.cloud.text': 'Firebase, AWS, scalable APIs, authentication, push notifications, and databases at production scale.',
  'about.focus.enterprise.title': 'Enterprise & SaaS Platforms',
  'about.focus.enterprise.text': 'Admin dashboards, CRM systems, analytics, multi-user business apps, and role-based access control.',
  'about.focus.backend.title': 'Backend & data',
  'about.focus.backend.text': 'Firebase (Realtime DB, Auth, FCM), REST APIs, SQLite, Room & Core Data.',
  'about.focus.architecture.title': 'Clean architecture & testing',
  'about.focus.architecture.text': 'MVVM / Clean Architecture, dependency injection, unit & UI tests.',
  'about.focus.ship.title': 'Ship & monetize',
  'about.focus.ship.text': 'In-app purchases & subscriptions, AdMob, ASO and CI/CD release pipelines.',

  // ---- Statement ----
  'statement.eyebrow': 'Why work with me',
  'statement.headline.main': 'From first sketch to',
  'statement.headline.accent': 'production.',
  'statement.body':
    'Seven years designing and shipping complete systems — mobile apps people love, real-time backends that scale, and enterprise platforms that run businesses.',
  'metrics.downloads': 'Downloads',
  'metrics.apps': 'Apps shipped',
  'metrics.rating': 'Avg. rating',
  'metrics.years': 'Years experience',

  // ---- Experience ----
  'exp.eyebrow': 'Experience',
  'exp.title': '7 years building mobile and full-stack products',
  'exp.description':
    'A track record of shipping production systems — mobile apps, real-time backends, IoT integrations, and enterprise platforms.',

  // ---- Skills ----
  'skills.eyebrow': 'The Stack',
  'skills.title': 'The tools behind every ship',
  'skills.description':
    'Mobile, backend, cloud, databases, and real-time systems — a full-stack toolkit chosen to ship fast and scale in production.',
  'skills.tab.all': 'All',
  'skills.filterAria': 'Filter skills by category',
  'skills.group.languages': 'Languages & Frameworks',
  'skills.group.backend': 'Backend & APIs',
  'skills.group.databases': 'Databases & Realtime',
  'skills.group.cloud': 'Cloud & DevOps',
  'skills.group.web': 'Web & Frontend',
  'skills.group.mobile': 'Mobile & Stores',

  // ---- Apps / Portfolio ----
  'apps.eyebrow': 'Portfolio',
  'apps.title': '{count} apps shipped. {installs} downloads earned.',
  'apps.description':
    'Scalable mobile and technology products — utilities, real-time systems, and enterprise tools — shipped to the App Store and Google Play. Tap any app to see its screenshots and details.',
  'apps.caseStudy': 'Case study',
  'apps.viewDetails': 'View details',
  'apps.screenshotAlt': '{name} screenshot {n}',
  'apps.iconAlt': '{name} icon',
  'catalogue.filterPlatformAria': 'Filter apps by platform',
  'catalogue.filterCategoryAria': 'Filter apps by category',
  'catalogue.all': 'All',
  'catalogue.allCategories': 'All categories',
  'catalogue.platform.ios': 'iOS',
  'catalogue.platform.android': 'Android',

  // ---- Process ----
  'process.eyebrow': 'How I work',
  'process.title': 'From idea to launch — and beyond',
  'process.description':
    "A clear, repeatable process so you always know what's happening and what's next.",

  // ---- Works with ----
  'worksWith.eyebrow': 'Integrations',
  'worksWith.title': 'Works with the platforms businesses run on',
  'worksWith.description':
    'From payment gateways and cloud platforms to device protocols and third-party APIs — built to integrate with whatever your stack requires.',

  // ---- Reviews ----
  'reviews.eyebrow': 'What people say',
  'reviews.title': 'Trusted by clients and users',
  'reviews.description':
    "Feedback from the people I've built apps with — and the people who use them every day.",
  'reviews.prev': 'Previous reviews',
  'reviews.next': 'Next reviews',
  'reviews.stars': '{rating} out of 5 stars',
  'reviews.goTo': 'Go to review {n}',

  // ---- FAQ ----
  'faq.eyebrow': 'FAQ',
  'faq.title': 'Questions, answered',
  'faq.description': 'The things people usually want to know before getting in touch.',
  'faq.stillHaveQ': 'Still have a question?',
  'faq.askPre': 'Tap',
  'faq.askPost': "in the corner, or send a message — it's usually answered within a day.",
  'faq.getInTouch': 'Get in touch',

  // ---- Contact ----
  'contact.title': "Let's build your next product",
  'contact.subtitle':
    'Have a product idea, system to build, or a role in mind? Send a message — I read every one and reply within 24 hours.',
  'contact.reachDirectly': 'Reach me directly',
  'contact.reachSub': "Prefer email or socials? Here's the fastest way to find me.",
  'contact.email': 'Email',
  'contact.meta.location': 'Location',
  'contact.meta.response': 'Response time',
  'contact.meta.responseValue': 'Within 24 hours',
  'contact.meta.openTo': 'Open to',
  'contact.meta.openToValue': 'Freelance & full-time',

  // ---- Contact form ----
  'form.title': 'Send a message',
  'form.subtitle': "Tell me about your project — I'll reply within 24 hours.",
  'form.name': 'Name',
  'form.namePlaceholder': 'Your name',
  'form.email': 'Email',
  'form.emailPlaceholder': 'you@company.com',
  'form.subject': "What's this about?",
  'form.message': 'Message',
  'form.messagePlaceholder': "A few lines about what you're building…",
  'form.send': 'Send message',
  'form.sending': 'Sending…',
  'form.success': "Thanks — your message has been sent. I'll reply within 24 hours.",
  'form.errPrefix': 'Error: ',
  'form.errGeneric': 'Something went wrong. Please try again.',
  'form.errNetwork': 'Network error. Please try again or email me directly.',
  'form.disabledPre': 'Set',
  'form.disabledPost': 'to enable the form.',
  'form.subjectPrefix': 'Portfolio — ',
  'form.inquiry.project': 'Project inquiry',
  'form.inquiry.job': 'Job opportunity',
  'form.inquiry.collab': 'Collaboration',
  'form.inquiry.other': 'Something else',

  // ---- Systems section ----
  'systems.eyebrow': "Systems I've Built",
  'systems.title': 'End-to-end platforms — not just apps',
  'systems.description':
    'Complete system-architecture projects: real-time backends, device integrations, enterprise dashboards, and cloud infrastructure.',
  'systems.stack': 'Tech stack',
  'systems.highlights': 'Key features',
  'systems.viewPrototype': 'View prototype',

  // ---- Ask Asad (chrome only; the script lives in data/ask-asad.ts) ----
  'ask.launcherAria': '{name} — chat about his work',
  'ask.dialogAria': '{name} — assistant',
  'ask.close': 'Close chat',
  'ask.browseTopics': '📋 Browse topics',
  'ask.startOver': '↺ Start over',
  'ask.workWith': '🤝 Work with Asad',
  'ask.topics': '↩ Topics',
  'ask.menuPrompt': 'Sure — what would you like to know?',
  'ask.sendRequirements': 'Send your requirements',

  // ---- App detail page ----
  'app.metaTitle': '{name} — Muhammad Asad',
  'app.allApps': 'All apps',
  'app.preview': 'Preview',
  'app.screenshotsFrom': '{count} screenshots from {store}',
  'app.aboutThis': 'About this app',
  'app.information': 'Information',
  'app.info.platform': 'Platform',
  'app.info.developer': 'Developer',
  'app.info.category': 'Category',
  'app.info.rating': 'Rating',
  'app.info.downloads': 'Downloads',
  'app.info.version': 'Version',
  'app.info.size': 'Size',
  'app.info.updated': 'Updated',
  'app.info.ageRating': 'Age rating',
  'app.info.languages': 'Languages',
  'app.downloads': '{count} downloads',
  'app.sizeValue': '{n} MB',
  'app.lang.one': '{count} language',
  'app.lang.other': '{count} languages',
  'app.caseStudy': 'Case study',
  'app.howBuilt': 'How it was built',
  'app.cs.problem': 'The problem',
  'app.cs.challenge': 'The challenge',
  'app.cs.solution': 'The solution',
  'app.cs.result': 'The result',
  'app.moreIn': 'More in {category}',
  'app.viewAppStore': 'View on the App Store',
  'app.getOnPlay': 'Get it on Google Play',

  // ---- Tech stack detail (/stack/<slug>/) ----
  'stack.viewAria': 'View details for {name}',
  'stack.metaTitle': '{name} — Tech stack · Muhammad Asad',
  'stack.allSkills': 'All skills',
  'stack.latest': 'Latest',
  'stack.updated': 'Updated {date}',
  'stack.about': 'Overview',
  'stack.readMore': 'Read more',
  'stack.howItWorks': 'How it works',
  'stack.flow': 'The flow',
  'stack.flowSub': 'Step by step, from source to running.',
  'stack.latestChanges': 'Latest changes',
  'stack.links': 'Links',
  'stack.link.website': 'Website',
  'stack.link.docs': 'Documentation',
  'stack.link.source': 'Source code',
  'stack.moreIn': 'More in {group}',

  // ---- 404 ----
  'nf.code': '404',
  'nf.title': 'Page not found',
  'nf.body': "The page you're looking for doesn't exist or has moved.",
  'nf.back': 'Back home',

  // ---- Footer ----
  'footer.tagline': '{eyebrow} — building mobile apps, backends, and complete systems.',
  'footer.copy': '© {name} — Full-Stack Engineer & System Architect',
  'footer.built': 'Built with Next.js · Deployed on GitHub Pages',
} as const;

export type UiKey = keyof typeof en;
