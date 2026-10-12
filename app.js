/* ============================================================
   مرسم أسماء — Asma's Studio
   Moomken Media Center · personal growth tracker (Oct–Dec 2026)
   Single static page. No build step, no backend.
   Progress syncs through a private GitHub Gist (same model as the other trackers).
   ============================================================ */
(function () {
'use strict';

/* ============================================================
   1 · CONTENT
   ============================================================ */

var EMPLOYEE = { name: 'أسماء', en: 'Asma' };
var MANAGER_LABEL = 'المشرف';
var MANAGER_PIN = '2001';

/* season: Sunday 11 Oct → Thursday 31 Dec 2026 (12 weeks) */
var START = new Date(2026, 9, 11);
var END   = new Date(2026, 11, 31, 23, 59);

var AJ = 'https://elearning.aljazeera.net/ar/courses/';
var ODV = 'https://moomken-my.sharepoint.com/personal/a_abukhutwah_moomken_org/_layouts/15/onedrive.aspx?parent=%2Fpersonal%2Fa_abukhutwah_moomken_org%2FDocuments%2FAsma%20Studio&id=%2Fpersonal%2Fa_abukhutwah_moomken_org%2FDocuments%2FAsma%20Studio%2F';
function od(name) { return ODV + encodeURIComponent(name); }

/* pigments */
var PIG = {
  P:  { c: '#8A6BB0', l: 'Violet' },
  C1: { c: '#D9798B', l: 'Rose Madder' },
  C2: { c: '#4A63B5', l: 'Ultramarine' },
  C3: { c: '#2F8C8C', l: 'Viridian Teal' },
  C4: { c: '#D9A441', l: 'Yellow Ochre' },
  C5: { c: '#6E9A52', l: 'Sap Green' },
  C6: { c: '#B8603E', l: 'Burnt Sienna' }
};

var TAGS = {
  am:   { l: 'Alan Moore · Storytelling', c: 'tag-am' },
  sfs:  { l: 'Strategy School',            c: 'tag-sfs' },
  free: { l: 'لونٌ مرافق',                 c: 'tag-free' },
  mm:   { l: 'تطبيق على ممكن',             c: 'tag-mm' }
};
var KIND = {
  lesson: 'درس', practice: 'تمرين', review: 'جلسة ملاحظات', mission: 'مهمة',
  project: 'مشروع', milestone: 'محطة كبيرة', write: 'كتابة', course: 'دورة قصيرة'
};

/* task fields: id · c (tag) · k (kind) · w (week) · t (text) · m (applied on Moomken work) · sub (link) · url */
var CHAPTERS = [
  {
    id: 'P', n: 0, prologue: true, name: 'المسودّة بالقلم', en: 'The Pencil Sketch', weeks: null,
    course: 'ما سلّمتِه قبل أن نبدأ',
    desc: 'كل لوحة تبدأ بخطوطٍ خفيفة بالقلم الرصاص. خطوطك الأولى كانت أصدق صفحتين: رسالتك إلى سُموتة، وخارطة تطويرك الشخصي — ومنهما رُسم هذا المرسم كلّه.',
    read: [],
    tasks: [
      { id: 'p1', c: 'mm', k: 'write', t: '«إلى سُموتة» — رسالتك إلى نسختك الأصغر: ما مررتِ به، وما تعلّمتِه، وما تطمحين إليه', pre: 1 },
      { id: 'p2', c: 'mm', k: 'write', t: 'خارطة التطوير الشخصي — التحريك، التوثيق البصري، رسوم كتب الأطفال، والكتابة والسرد', pre: 1 }
    ]
  },
  {
    id: 'C1', n: 1, name: 'الورقة المبلّلة', en: 'Wetting the Paper', weeks: [1, 2],
    course: 'Alan Moore — Storytelling · 01 – 06',
    desc: 'قبل أي لون تُبلَّل الورقة. نثبّت أولًا روتينًا صغيرًا — المثابرة والاستمرارية كما كتبتِ — ثم نستمع إلى آلن مور، أحد أعظم كتّاب القصص المصوّرة، وهو يشرح لماذا الكتابة «سحر». وفي آخر الفصل نبدأ بجمع الحكايات من حولنا.',
    read: ['06', '01', '10'],
    tasks: [
      { id: 'a1', c: 'mm',   k: 'mission',  w: 1, t: '«موعدان ثابتان»: اختاري يومين ثابتين في الأسبوع وساعةً في كل منهما للمرسم — واكتبيهما هنا. الروتين أولًا.', sub: 1 },
      { id: 'a2', c: 'am',   k: 'lesson',   w: 1, t: '01 Storytelling Introduction · 02 Writing as enchantment' },
      { id: 'a3', c: 'am',   k: 'lesson',   w: 1, t: '03 Becoming a writer · 04 Four weapons' },
      { id: 'a4', c: 'am',   k: 'practice', w: 1, t: '«الأسلحة الأربعة»: طبّقي أدوات آلن مور على حكايةٍ واحدة من حكايات جدّتك — في صفحة واحدة', sub: 1 },
      { id: 'a5', c: 'am',   k: 'lesson',   w: 2, t: '05 Learning to read · 06 Imagination – fire of the gods' },
      { id: 'a6', c: 'mm',   k: 'practice', w: 2, m: 1, t: '«بذور الحملات»: 10 حكايات أو تفاصيل من الموروث الشفوي (حكاية، مثل، حرفة، طقس) تصلح كلٌّ منها لحملة رقمية — جملةٌ لكل بذرة', sub: 1 },
      { id: 'a7', c: 'free', k: 'course',   w: 2, t: 'Pixar in a Box · The Art of Storytelling — كيف تبني بيكسار قصصها', url: 'https://www.khanacademy.org/computing/pixar/storytelling' },
      { id: 'a8', c: 'mm',   k: 'review',   w: 2, t: 'جلسة ملاحظات ودّية مع المشرف على «بذور الحملات»' }
    ]
  },
  {
    id: 'C2', n: 2, name: 'الخط الأول', en: 'The First Line', weeks: [3, 4],
    course: 'Alan Moore — Storytelling · 07 – 16',
    desc: 'اللغة أداة، والإيقاع موسيقى، والبنية هيكل اللوحة. هنا تُمسكين القلم كما تُمسكين الفرشاة: تجرّبين، تمحين، وتعيدين — على نصوص ممكن الحقيقية، حتى يصبح لكل منشورٍ خطٌّ أول واثق.',
    read: ['03', '15', '09'],
    tasks: [
      { id: 'b1', c: 'am',   k: 'lesson',   w: 3, t: '07 Language as technology · 08 The neurology of writing' },
      { id: 'b2', c: 'am',   k: 'lesson',   w: 3, t: '09 Hemingway vs. Baudelaire · 10 Fascinating rhythm' },
      { id: 'b3', c: 'am',   k: 'practice', w: 3, m: 1, t: '«همنغواي أم بودلير؟»: أعيدي كتابة منشورٍ حقيقي لممكن بأسلوبين — مقتضبٍ جاف، ثم شاعريٍّ مزخرف — واختاري ما يناسب الجمهور ولماذا', sub: 1 },
      { id: 'b4', c: 'am',   k: 'lesson',   w: 3, t: '11 Inventive language · 12 Structure' },
      { id: 'b5', c: 'am',   k: 'lesson',   w: 4, t: '13 Genre · 14 Mode · 15 Time and timing' },
      { id: 'b6', c: 'am',   k: 'lesson',   w: 4, t: '16 Misdirection — فنّ المفاجأة' },
      { id: 'b7', c: 'mm',   k: 'practice', w: 4, m: 1, t: 'سكربت إعلان فيديو مدّته 30 ثانية لإحدى «بذور الحملات»: خطّافٌ في 3 ثوانٍ، ثم حكاية، ثم دعوة', sub: 1 },
      { id: 'b8', c: 'free', k: 'course',   w: 4, t: 'الجزيرة: «لكل منصة خصوصيتها.. كيف نكتب لجمهور الميديا الاجتماعية؟»', url: AJ + 'course-3908' },
      { id: 'b9', c: 'mm',   k: 'review',   w: 4, t: 'جلسة ملاحظات على السكربت والنسختين' }
    ]
  },
  {
    id: 'C3', n: 3, name: 'الغسلة الأولى', en: 'The First Wash', weeks: [5, 6],
    course: 'Strategy Finishing School · 01 – 03',
    desc: 'الغسلة الأولى تحدّد ضوء اللوحة كلّها. الحملة الرقمية لا تبدأ من فكرةٍ جميلة بل من الناس: البحث، والإصغاء، ثم «البصيرة» — الحقيقة الإنسانية الصغيرة التي تجعل الجمهور يقول: هذا أنا.',
    read: ['08', '16'],
    tasks: [
      { id: 'c1', c: 'sfs',  k: 'mission',  w: 5, t: 'تجهيز مجلد Strategy Finishing School وتصفّح الوحدات' },
      { id: 'c2', c: 'sfs',  k: 'lesson',   w: 5, t: '01 · Strategy Fundamentals — ما الاستراتيجية أصلًا؟' },
      { id: 'c3', c: 'sfs',  k: 'lesson',   w: 5, t: '02 · Research — كيف نبحث عن الجمهور' },
      { id: 'c4', c: 'mm',   k: 'practice', w: 5, m: 1, t: '«الإصغاء الاجتماعي»: اجمعي 30 تعليقًا حقيقيًا من جمهور صفحات ممكن أو صفحات مشابهة، وصنّفيها: ماذا يحبّون؟ ماذا يزعجهم؟ عمَّ يسألون؟', sub: 1 },
      { id: 'c5', c: 'sfs',  k: 'lesson',   w: 6, t: '03 · Insights — من المعلومة إلى البصيرة' },
      { id: 'c6', c: 'sfs',  k: 'practice', w: 6, m: 1, t: '3 بصائر عن هذا الجمهور بصيغة: «نعرف أنّ… لكنّ… لأنّ…»', sub: 1 },
      { id: 'c7', c: 'free', k: 'course',   w: 6, t: 'HubSpot Academy · Social Media Marketing', url: 'https://academy.hubspot.com/courses/social-media' },
      { id: 'c8', c: 'free', k: 'course',   w: 6, t: 'الجزيرة: «إدارة حسابات إنستغرام»', url: AJ + 'course-78' },
      { id: 'c9', c: 'mm',   k: 'review',   w: 6, t: 'جلسة نقاش: أيّ البصائر أقوى؟ ولماذا؟' }
    ]
  },
  {
    id: 'C4', n: 4, name: 'طبقات اللون', en: 'Layering Colour', weeks: [7, 8],
    course: 'Strategy Finishing School · 04 · 14 · 06 · 18',
    desc: 'طبقةٌ فوق طبقة: من البصيرة إلى موجزٍ إبداعي في صفحة واحدة، ثم إلى خطة منصّات — أين نظهر، وبأي شكل، وكيف نعرف أننا نجحنا. وهنا تتعرّفين على الإعلان المموّل من مصادره الرسمية.',
    read: ['07', '17', '15'],
    tasks: [
      { id: 'd1', c: 'sfs',  k: 'lesson',   w: 7, t: '04 · Briefing — أساسيات الموجز' },
      { id: 'd2', c: 'sfs',  k: 'lesson',   w: 7, t: '14 · Creative Briefing — الموجز الإبداعي (واستعيني بقالب 17 · Planners Template)' },
      { id: 'd3', c: 'mm',   k: 'project',  w: 7, m: 1, t: 'Creative Brief لحملةٍ واحدة من «بذورك» — في صفحة واحدة', sub: 1 },
      { id: 'd4', c: 'sfs',  k: 'lesson',   w: 8, t: '06 · Communications Planning · 18 · Platform Playbook' },
      { id: 'd5', c: 'mm',   k: 'practice', w: 8, m: 1, t: 'خطة المنصّات: أي منصة لأي رسالة، الشكل (ريلز، كاروسيل، ستوري)، ميزانية تقريبية للإعلان المموّل، و3 مؤشرات نجاح (KPIs)', sub: 1 },
      { id: 'd6', c: 'free', k: 'course',   w: 8, t: 'HubSpot Academy · Digital Advertising', url: 'https://academy.hubspot.com/courses/digital-advertising' },
      { id: 'd7', c: 'free', k: 'course',   w: 8, t: 'أساسيات الإعلان المموّل من المصدر: Google Skillshop أو Meta Blueprint — اختاري واحدة', url: 'https://skillshop.withgoogle.com/' },
      { id: 'd8', c: 'mm',   k: 'milestone',w: 8, t: 'اعرضي الموجز وخطة المنصّات على المشرف في 10 دقائق' }
    ]
  },
  {
    id: 'C5', n: 5, name: 'الشخصيات والمكان', en: 'Character & Place', weeks: [9, 10],
    course: 'Alan Moore — Storytelling · 17 – 26',
    desc: 'الآن يدخل الناس إلى اللوحة: شخصيةٌ تُحَبّ، ومكانٌ يشبهنا — من سفوح الجبال إلى أزقّة المدينة. هنا تلتقي فرشاتك بقلمك: ترسمين شخصية حملتك بالألوان المائية، وتكتبين حكايتها.',
    read: ['11', '02', '04'],
    tasks: [
      { id: 'e1', c: 'am',   k: 'lesson',   w: 9,  t: '17 Character · 18 Extreme character' },
      { id: 'e2', c: 'mm',   k: 'practice', w: 9,  m: 1, t: 'شخصية الحملة: ارسميها بالألوان المائية + بطاقة تعريف (اسمها، عمرها، ما تخافه، ما تحلم به)', sub: 1 },
      { id: 'e3', c: 'am',   k: 'lesson',   w: 9,  t: '19 Place · 20 Creating place · 21 Period' },
      { id: 'e4', c: 'am',   k: 'practice', w: 9,  t: '«المكان»: لوحةٌ مائية لمكان الحملة + فقرةٌ تصفه بالحواس الخمس', sub: 1 },
      { id: 'e5', c: 'am',   k: 'lesson',   w: 10, t: '22 Considering media · 23 Comic cuts · 24 Screen gems' },
      { id: 'e6', c: 'am',   k: 'lesson',   w: 10, t: '25 Words, music and performance · 26 Future media' },
      { id: 'e7', c: 'mm',   k: 'practice', w: 10, m: 1, t: 'ستوري بورد من 6 إطارات لكاروسيل أو ريلز يحكي حكاية الشخصية في مكانها', sub: 1 },
      { id: 'e8', c: 'free', k: 'course',   w: 10, t: 'Al Jazeera · Vertical Storytelling — السرد العمودي للهاتف', url: 'https://elearning.aljazeera.net/en/courses/vertical-storytelling' },
      { id: 'e9', c: 'mm',   k: 'review',   w: 10, t: 'جلسة ملاحظات على الشخصية والستوري بورد' }
    ]
  },
  {
    id: 'C6', n: 6, name: 'المعرض', en: 'The Exhibition', weeks: [11, 12],
    course: 'Alan Moore — Storytelling · 27 – 33 + المشروع الختامي',
    desc: 'كل ما رسمتِه وكتبتِه يجتمع على جدارٍ واحد: حملةٌ رقمية كاملة من البصيرة إلى المنشور، تعرضينها أمام فريق المركز الإعلامي كما يُفتتح معرضٌ أول. هذه هي اللوحة التي كانت سُموتة تنتظرها.',
    read: ['05', '12', '13'],
    tasks: [
      { id: 'f1', c: 'am',   k: 'lesson',   w: 11, t: '27 The need for progress · 28 Forward movements · 29 Approaches to the future' },
      { id: 'f2', c: 'am',   k: 'lesson',   w: 11, t: '30 Lost in the funhouse · 31 The evolution of writing' },
      { id: 'f3', c: 'mm',   k: 'project',  w: 11, m: 1, t: 'الحملة الختامية: بصيرة ← موجز ← 6 منشورات على الأقل بالألوان المائية مع نصوصها ← سكربت ريلز ← خطة منصّات وإعلان مموّل ← مؤشرات نجاح', sub: 1 },
      { id: 'f4', c: 'am',   k: 'lesson',   w: 12, t: '32 Permission to write · 33 Extroduction' },
      { id: 'f5', c: 'mm',   k: 'review',   w: 12, t: 'بروفة العرض + ملاحظات المشرف' },
      { id: 'f6', c: 'mm',   k: 'milestone',w: 12, t: '🎨 «المعرض»: اعرضي حملتك أمام فريق المركز الإعلامي (10 – 15 دقيقة)' },
      { id: 'f7', c: 'mm',   k: 'write',    w: 12, t: 'رسالةٌ ثانية: «إلى سُموتة في ديسمبر» — ماذا تغيّر منذ رسالتك الأولى؟', sub: 1 }
    ]
  }
];

/* ---------- the drying lines: every painting opens a PDF in the «Asma Studio» OneDrive folder ---------- */
var LINES = [
  { id: 'L1', ar: 'الحبل الأول — حملات رقمية', en: 'Digital Campaigns', ids: ['07', '08', '09', '15', '03', '04'] },
  { id: 'L2', ar: 'الحبل الثاني — قصةٌ وصورة', en: 'Story & Image', ids: ['01', '02', '06', '10', '11'] },
  { id: 'L3', ar: 'الحبل الثالث — حملات التغيير… والأحلام', en: 'Change & Dreams', ids: ['16', '17', '05', '12', '13'] }
];
var AJI = 'معهد الجزيرة للإعلام', HIN = 'مؤسسة هنداوي';
var PAINTINGS = {
  '01': { t: 'أدوات كتابة القصة', a: AJI, f: '01-أدوات-كتابة-القصة.pdf', c: '#D9798B', m: 'hills', ch: 1,
          d: 'صندوق أدوات السرد: البداية، الشخصية، التفاصيل، والإيقاع — بلغةٍ عملية تنفعك في كل منشور.' },
  '02': { t: 'كيف تحكي القصة في التلفزيون', a: AJI, f: '02-كيف-تحكي-القصة-في-التلفزيون.pdf', c: '#4A63B5', m: 'frame', ch: 5,
          d: 'الصورة أولًا ثم الكلمة: كيف يُكتب السكربت ليُرى لا ليُقرأ — أساسٌ لسكربتات الريلز والإعلانات.' },
  '03': { t: 'الكتابة لمنصات الإعلام الرقمي', a: AJI, f: '03-الكتابة-لمنصات-الإعلام-الرقمي.pdf', c: '#2F8C8C', m: 'phone', ch: 2,
          d: 'لكل منصّة لغتها: العنوان، الإيجاز، والجمهور الذي يقرأ على الهاتف وهو يمرّر بإصبعه.' },
  '04': { t: 'صحافة الموبايل 2.0', a: AJI, f: '04-صحافة-الموبايل-2.0.pdf', c: '#6E9A52', m: 'phone', ch: 5,
          d: 'إنتاج المحتوى كاملًا من الهاتف: فكرة، تصوير، مونتاج، ونشر — لحملاتٍ سريعة وخفيفة.' },
  '05': { t: 'التصوير الوثائقي في العالم العربي', a: AJI, f: '05-التصوير-الوثائقي-في-العالم-العربي.pdf', c: '#B8603E', m: 'sun', ch: 6,
          d: 'كيف نوثّق الناس والأماكن بصدق — خطوةٌ نحو حلمك في توثيق الحِرف والحكايات.' },
  '06': { t: 'السرد في الصحافة', a: AJI, f: '06-السرد-في-الصحافة.pdf', c: '#8A6BB0', m: 'moon', ch: 1,
          d: 'بناء القصة المتأنية: المشهد، الشخصية، والتفاصيل التي تجعل القارئ يكمل حتى النهاية.' },
  '07': { t: 'الإعلانات والتصميم', a: HIN, f: '07-الإعلانات-والتصميم.pdf', c: '#D9A441', m: 'burst', ch: 4,
          d: 'كيف تولد الفكرة الإعلانية وكيف تتحوّل إلى صورةٍ ونص — أقرب كتابٍ لعمل المصمّمة الكاتبة.' },
  '08': { t: 'الجمهور: التسويق في عالم رقمي', a: HIN, f: '08-الجمهور-التسويق-في-عالم-رقمي.pdf', c: '#2F8C8C', m: 'dots', ch: 3,
          d: 'من هو جمهورك، وكيف يتصرّف على الإنترنت، ولماذا يشارك ما يشارك — أساس البحث والبصيرة.' },
  '09': { t: 'إغواء العقل الباطن', a: HIN, f: '09-إغواء-العقل-الباطن.pdf', c: '#D9798B', m: 'swirl', ch: 2,
          d: 'لماذا تؤثّر فينا بعض الصور والرسائل دون أن ننتبه؟ علم النفس وراء الإعلان المؤثّر.' },
  '10': { t: 'ماكينة الأفكار', a: HIN, f: '10-ماكينة-الأفكار.pdf', c: '#D9A441', m: 'burst', ch: 1,
          d: 'طرقٌ عملية لتوليد الأفكار بانتظام بدل انتظار الإلهام — رفيقة «بذور الحملات».' },
  '11': { t: 'الثقافة البصرية', a: HIN, f: '11-الثقافة-البصرية.pdf', c: '#4A63B5', m: 'eye', ch: 5,
          d: 'كيف نرى ونقرأ الصور، ولماذا تعني الصورة الواحدة أشياء مختلفة لأناسٍ مختلفين.' },
  '12': { t: 'الفيلم الوثائقي', a: HIN, f: '12-الفيلم-الوثائقي.pdf', c: '#6E9A52', m: 'frame', ch: 6,
          d: 'مقدمةٌ قصيرة لعالم الوثائقي: الحقيقة، والقصة، ووجهة النظر — لأحلامك القادمة.' },
  '13': { t: 'أدب الأطفال', a: HIN, f: '13-أدب-الأطفال.pdf', c: '#D9798B', m: 'moon', ch: 6,
          d: 'كيف تُكتب القصص للصغار ولماذا تبقى معهم طويلًا — لكتب الأطفال التي تحلمين برسمها.' },
  '15': { t: 'The ABCDs of Storytelling', a: 'Think with Google · YouTube', f: '15-Google-ABCDs-Storytelling-Playbook.pdf', c: '#B8603E', m: 'phone', ch: 2, lat: 1,
          d: 'دليل Google الرسمي لإعلانات الفيديو: Attract · Brand · Connect · Direct — كيف يشدّ الإعلان في الثواني الأولى.' },
  '16': { t: 'SBC Training Manual', a: 'UNICEF', f: '16-SBC-Training-Manual-UNICEF.pdf', c: '#2F8C8C', m: 'dots', ch: 3, lat: 1,
          d: 'دليل يونيسف التدريبي للتغيير الاجتماعي والسلوكي: كيف تُصمَّم حملةٌ تغيّر عادةً لا رأيًا فقط.' },
  '17': { t: 'خطة التواصل للتغيير الاجتماعي والسلوكي', a: 'UNICEF', f: '17-خطة-التواصل-للتغيير-الاجتماعي-والسلوكي.pdf', c: '#8A6BB0', m: 'hills', ch: 4,
          d: 'خطوة بخطوة: من المشكلة إلى الجمهور إلى الرسالة والقنوات — قالبٌ جاهز لحملات ممكن التوعوية.' }
};

/* ---------- companion swatches: short courses, Arabic + English ---------- */
var SWATCHES = [
  { t: 'Pixar in a Box — The Art of Storytelling', src: 'Khan Academy', l: 'EN', ch: 1, c: '#D9798B', d: 'كيف تبني بيكسار شخصياتها وحكاياتها — دروس قصيرة وتمارين.', url: 'https://www.khanacademy.org/computing/pixar/storytelling' },
  { t: 'لكل منصة خصوصيتها.. كيف نكتب لجمهور الميديا الاجتماعية؟', src: 'Al Jazeera', l: 'AR', ch: 2, c: '#4A63B5', d: 'الخطّاف، الكابشن، والجمهور على كل منصة.', url: AJ + 'course-3908' },
  { t: 'من الفكرة إلى النشر.. كيف تصنع قصتك الرقمية؟', src: 'Al Jazeera', l: 'AR', ch: 2, c: '#8A6BB0', d: 'من منتجٍ في AJ+: رحلة الفكرة حتى تُنشر.', url: AJ + 'course-183' },
  { t: 'Social Media Marketing', src: 'HubSpot', l: 'EN', ch: 3, c: '#2F8C8C', d: 'استراتيجية السوشيال ميديا، المحتوى، والقياس — مع شهادة.', url: 'https://academy.hubspot.com/courses/social-media' },
  { t: 'إدارة حسابات إنستغرام', src: 'Al Jazeera', l: 'AR', ch: 3, c: '#D9798B', d: 'محتوى متّسق وهوية بصرية واضحة لصفحة واحدة.', url: AJ + 'course-78' },
  { t: 'Content Marketing', src: 'HubSpot', l: 'EN', ch: 4, c: '#D9A441', d: 'كيف تخطّطين محتوى يجذب ويبقى — من الفكرة إلى التقويم.', url: 'https://academy.hubspot.com/courses/content-marketing' },
  { t: 'Digital Advertising', src: 'HubSpot', l: 'EN', ch: 4, c: '#B8603E', d: 'الإعلان المموّل على المنصات: الاستهداف، الميزانية، والقياس.', url: 'https://academy.hubspot.com/courses/digital-advertising' },
  { t: 'Google Ads & YouTube Ads', src: 'Google Skillshop', l: 'EN', ch: 4, c: '#4A63B5', d: 'المصدر الرسمي لتعلّم إعلانات Google ويوتيوب — مع شهادات.', url: 'https://skillshop.withgoogle.com/' },
  { t: 'Meta Blueprint', src: 'Meta', l: 'EN', ch: 4, c: '#2F8C8C', d: 'إعلانات فيسبوك وإنستغرام من المصدر: الحملات والجمهور والقياس.', url: 'https://www.facebook.com/business/learn' },
  { t: 'الوسائط المتعددة.. أدواتك لتشكيل سرد قصصي جذاب', src: 'Al Jazeera', l: 'AR', ch: 5, c: '#6E9A52', d: 'حين يلتقي النص بالصورة والفيديو في قصة واحدة.', url: AJ + 'course-58' },
  { t: 'Vertical Storytelling', src: 'Al Jazeera', l: 'EN', ch: 5, c: '#D9798B', d: 'السرد العمودي للهاتف: ريلز وستوريز تحكي ولا تكتفي بالعرض.', url: 'https://elearning.aljazeera.net/en/courses/vertical-storytelling' },
  { t: 'Canva Design School', src: 'Canva', l: 'EN', ch: 6, c: '#8A6BB0', d: 'تصميم منشورات الحملة وقوالبها بسرعة — ولوحاتك المائية في قلبها.', url: 'https://www.canva.com/designschool/courses/' }
];

/* ---------- sketchbook: later ---------- */
var LATER = [
  { h: '🎞️ التحريك والرسوم المتحركة', items: [
    { t: 'Pixar in a Box — كل الوحدات', s: 'Khan Academy · من الشخصيات إلى التحريك', l: 'en', url: 'https://www.khanacademy.org/computing/pixar' }
  ] },
  { h: '🎬 المونتاج والوثائقي', items: [
    { t: 'المونتاج.. رؤية تقنية وإبداعية', s: 'معهد الجزيرة', l: 'ar', url: AJ + 'course-86' },
    { t: 'DaVinci Resolve — التدريب الرسمي', s: 'Blackmagic Design · كتب ودروس', l: 'en', url: 'https://www.blackmagicdesign.com/products/davinciresolve/training' },
    { t: 'Impact Field Guide', s: 'Doc Society · كيف يصنع الوثائقي أثرًا', l: 'en', url: 'https://impactguide.org/' }
  ] },
  { h: '📷 التصوير والتوثيق', items: [
    { t: 'من العين إلى العدسة.. أساسيات التصوير', s: 'معهد الجزيرة', l: 'ar', url: AJ + 'course-1933' }
  ] },
  { h: '📚 رسوم كتب الأطفال', items: [
    { t: 'African Storybook', s: 'مكتبة مفتوحة لقصص الأطفال المصوّرة بلغات محلية', l: 'en', url: 'https://www.africanstorybook.org/' }
  ] }
];

/* her own words, and the craft — rotating in the bubble */
var QUOTES = [
  'لا تسعي للكمال… بل للتجربة 🎨',
  'كلُّ مُرٍّ سيمُرّ ✦',
  'اقرئي، تعلّمي، جرّبي بمثالٍ محلول… ثم جرّبي وحدك.',
  'أستمتع بالطريق أكثر من الوصول.',
  'الجهل بالآخر إعاقة… والقصة جسر.',
  'المثابرة · الاستمرارية · الروتين.',
  'ضربةٌ صغيرة كل يوم… تصنع لوحة.',
  'حملةٌ جيدة تُرى… وتُحَسّ.'
];

/* ============================================================
   2 · STATE + PERSISTENCE (GitHub Gist)
   ============================================================ */

var LS_CFG = 'asmaTracker.cfg', LS_STATE = 'asmaTracker.state';
var DEFAULT_FILE = 'asma-progress.json';

var S = {
  statuses: {}, links: {}, when: {}, finale: 0, updatedAt: 0,
  role: null, gistId: '', token: '', file: DEFAULT_FILE,
  sync: 'local', lastSync: null, open: {}, justDone: {}
};

function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

function apply(d) {
  S.statuses = d.statuses || {}; S.links = d.links || {}; S.when = d.when || {};
  S.finale = d.finale || 0; S.updatedAt = d.updatedAt || 0;
}
function loadLocal() {
  try { var c = JSON.parse(lsGet(LS_CFG) || '{}');
    S.role = c.role || null; S.gistId = c.gistId || ''; S.token = c.token || ''; S.file = c.file || DEFAULT_FILE;
  } catch (e) {}
  try { apply(JSON.parse(lsGet(LS_STATE) || '{}')); } catch (e) {}
}
function saveCfg() {
  lsSet(LS_CFG, JSON.stringify({ role: S.role, gistId: (S.gistId || '').trim(), token: (S.token || '').trim(), file: (S.file || DEFAULT_FILE).trim() }));
}
function payload() { return { statuses: S.statuses, links: S.links, when: S.when, finale: S.finale, updatedAt: S.updatedAt }; }
function saveLocal() { lsSet(LS_STATE, JSON.stringify(payload())); }

var pushTimer = null, pushPending = false;
function setSync(st) { S.sync = st; paintSync(); }

function pull(manual) {
  if (!S.gistId) { if (manual) setSync('local'); return Promise.resolve(); }
  setSync('syncing');
  var h = { Accept: 'application/vnd.github+json' };
  if (S.token) h.Authorization = 'Bearer ' + S.token.trim();
  return fetch('https://api.github.com/gists/' + S.gistId.trim(), { headers: h, cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (g) {
      var f = g.files && g.files[S.file];
      var remote = f && f.content ? JSON.parse(f.content) : {};
      if ((remote.updatedAt || 0) > S.updatedAt) { apply(remote); saveLocal(); render(); }
      else if ((remote.updatedAt || 0) < S.updatedAt) schedulePush();
      S.lastSync = new Date(); setSync('ok');
    })
    .catch(function () { setSync('error'); });
}
function schedulePush() {
  pushPending = true;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(push, 1500);
}
function push() {
  pushPending = false;
  if (!S.gistId || !S.token) return;
  setSync('syncing');
  var body = { files: {} };
  body.files[S.file] = { content: JSON.stringify(payload(), null, 2) };
  fetch('https://api.github.com/gists/' + S.gistId.trim(), {
    method: 'PATCH',
    headers: { Accept: 'application/vnd.github+json', Authorization: 'Bearer ' + S.token.trim(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(function (r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    S.lastSync = new Date(); setSync('ok');
  }).catch(function () { setSync('error'); });
}
function touch() { S.updatedAt = Date.now(); saveLocal(); render(); schedulePush(); }
function setStatus(id, st) {
  S.statuses[id] = st;
  if (st === 'done') S.justDone[id] = 1;
  if (st !== 'todo' && !S.when[id]) S.when[id] = Date.now();
  if (st === 'todo') delete S.when[id];
  touch();
}
function setLink(id, url) { if (url) S.links[id] = url; else delete S.links[id]; touch(); }

/* ============================================================
   3 · DATES + DERIVED DATA
   ============================================================ */

var DAY = 864e5;
function weekStart(w) { return new Date(START.getTime() + (w - 1) * 7 * DAY); }
function weekEnd(w) { return w === 12 ? new Date(2026, 11, 31) : new Date(START.getTime() + ((w - 1) * 7 + 6) * DAY); }
function fmt(d) { return d.getDate() + '/' + (d.getMonth() + 1); }
var MONTHS_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
var MONTHS_EN = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
function fmtLong(d) { return d.getDate() + ' ' + MONTHS_AR[d.getMonth()]; }
function weekOf(ts) { var w = Math.floor((ts - START.getTime()) / (7 * DAY)) + 1; return w < 1 ? 1 : w > 12 ? 12 : w; }

function currentWeek() {
  var now = new Date();
  if (now < START) return 0;
  if (now > END) return 13;
  return Math.min(12, Math.floor((now - START) / (7 * DAY)) + 1);
}

function stat(t) { var s = S.statuses[t.id]; if (s) return s; return t.pre ? 'done' : 'todo'; }
function chById(id) { return CHAPTERS.filter(function (c) { return c.id === id; })[0]; }
function chByN(n) { return CHAPTERS.filter(function (c) { return c.n === n && !c.prologue; })[0]; }

function computed() {
  var out = { chs: [], done: 0, pending: 0, total: 0, byWeek: {}, active: {} };
  for (var w = 1; w <= 12; w++) out.byWeek[w] = { done: 0, total: 0 };
  CHAPTERS.forEach(function (ch) {
    var d = 0, p = 0;
    ch.tasks.forEach(function (t) {
      var st = stat(t);
      if (!ch.prologue) { out.total++; if (st === 'done') out.done++; if (st === 'pending') out.pending++; }
      if (st === 'done') d++; else if (st === 'pending') p++;
      if (t.w) { out.byWeek[t.w].total++; if (st === 'done') out.byWeek[t.w].done++; }
    });
    out.chs.push({ ch: ch, done: d, pending: p, total: ch.tasks.length,
      pct: ch.tasks.length ? Math.round(d / ch.tasks.length * 100) : 0,
      paint: ch.tasks.length ? (d + p * 0.35) / ch.tasks.length : 0,
      complete: d === ch.tasks.length });
  });
  Object.keys(S.when).forEach(function (id) { out.active[weekOf(S.when[id])] = 1; });
  out.pct = out.total ? Math.round(out.done / out.total * 100) : 0;
  var idx = out.chs.findIndex(function (x) { return !x.complete; });
  out.currentIdx = idx === -1 ? out.chs.length - 1 : idx;
  out.allDone = idx === -1;
  out.layers = out.chs.filter(function (x) { return x.complete && !x.ch.prologue; }).length;
  /* routine streak: consecutive active weeks ending at this week (or last week, if this one hasn't started yet) */
  var wk = Math.max(1, Math.min(12, currentWeek())), s = 0, k = out.active[wk] ? wk : wk - 1;
  while (k >= 1 && out.active[k]) { s++; k--; }
  out.streak = s;
  return out;
}

/* ============================================================
   4 · THE PAINTING — one layer per chapter
   ============================================================ */

function paintingSVG(C, full) {
  function p(id) { if (full) return 1; var x = C.chs.filter(function (y) { return y.ch.id === id; })[0]; return x ? Math.min(1, x.paint) : 0; }
  function layer(id, sketch, paint) {
    var v = p(id);
    return '<g class="layer" data-l="' + id + '">' +
      '<g class="sketch" filter="url(#pencil)" fill="none" stroke="#9A9282" stroke-width="1.3" stroke-linecap="round" style="opacity:' + (0.6 * (1 - v * 0.85)).toFixed(2) + '">' + sketch + '</g>' +
      '<g class="paint" filter="url(#wc)" style="opacity:' + v.toFixed(2) + '">' + paint + '</g></g>';
  }
  var MT = 'M0 215 L70 168 L120 190 L205 118 L282 178 L350 142 L432 186 L515 128 L600 172 L600 270 L0 270 Z';
  var HL = 'M0 262 C 90 222, 170 240, 250 252 S 430 214, 600 246 L600 340 L0 340 Z';
  var FG = 'M0 352 C 120 322, 240 360, 340 338 S 520 318, 600 342 L600 420 L0 420 Z';
  var houses = [[170, 236, 34, 24], [208, 230, 28, 30], [240, 240, 36, 22], [282, 234, 24, 26]];
  var olives = [[110, 262, 22], [140, 270, 16], [360, 252, 20], [400, 262, 24], [440, 256, 16], [520, 270, 20]];
  var flowers = [[40, 378, '#D9798B'], [70, 392, '#8A6BB0'], [96, 372, '#D9A441'], [150, 396, '#D9798B'], [480, 384, '#D9A441'], [512, 372, '#D9798B'], [546, 392, '#8A6BB0'], [570, 376, '#D9798B'], [250, 400, '#8A6BB0']];

  var sky = layer('C1',
    '<path d="M60 70 C 120 50, 180 80, 240 62"/><path d="M330 110 C 380 96, 430 120, 480 104"/>',
    '<defs><linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9A9B6"/><stop offset=".55" stop-color="#F6D8C2"/><stop offset="1" stop-color="#F8E7C4"/></linearGradient></defs>' +
    '<rect x="-20" y="-20" width="640" height="300" fill="url(#skyG)"/>' +
    '<ellipse cx="150" cy="70" rx="90" ry="18" fill="#fff" opacity=".7"/><ellipse cx="410" cy="108" rx="80" ry="14" fill="#fff" opacity=".6"/>');
  var sun = layer('C4',
    '<circle cx="462" cy="92" r="38"/><path d="M110 120 q9 -9 18 0 q9 -9 18 0"/><path d="M170 98 q7 -7 14 0 q7 -7 14 0"/><path d="M226 128 q6 -6 12 0 q6 -6 12 0"/>',
    '<circle cx="462" cy="92" r="44" fill="#EFC66F" opacity=".55"/><circle cx="462" cy="92" r="32" fill="#D9A441"/>' +
    '<g stroke="#3D3B4A" stroke-width="3" fill="none" stroke-linecap="round"><path d="M110 120 q9 -9 18 0 q9 -9 18 0"/><path d="M170 98 q7 -7 14 0 q7 -7 14 0"/><path d="M226 128 q6 -6 12 0 q6 -6 12 0"/></g>');
  var mountains = layer('C2',
    '<path d="' + MT + '"/>',
    '<path d="' + MT + '" fill="#7F92D0"/><path d="M205 118 L240 150 L222 170 L256 190 L282 178 Z M515 128 L548 160 L530 174 L600 172 Z" fill="#4A63B5" opacity=".55"/>');
  var hills = layer('C3',
    '<path d="' + HL + '"/>',
    '<path d="' + HL + '" fill="#5FB1AE"/><path d="M0 300 C 140 270, 300 300, 600 280 L600 340 L0 340 Z" fill="#2F8C8C" opacity=".6"/>');
  var village = layer('C5',
    houses.map(function (h) { return '<rect x="' + h[0] + '" y="' + h[1] + '" width="' + h[2] + '" height="' + h[3] + '"/>'; }).join('') +
    olives.map(function (o) { return '<circle cx="' + o[0] + '" cy="' + (o[1] - o[2]) + '" r="' + o[2] + '"/><path d="M' + o[0] + ' ' + o[1] + ' v12"/>'; }).join(''),
    houses.map(function (h) {
      return '<rect x="' + h[0] + '" y="' + h[1] + '" width="' + h[2] + '" height="' + h[3] + '" fill="#FBF3E3"/>' +
        '<rect x="' + (h[0] + h[2] / 2 - 4) + '" y="' + (h[1] + h[3] - 12) + '" width="8" height="12" rx="4" fill="#B8603E"/>' +
        '<rect x="' + (h[0] + 5) + '" y="' + (h[1] + 5) + '" width="6" height="6" fill="#4A63B5" opacity=".7"/>';
    }).join('') +
    olives.map(function (o) {
      return '<path d="M' + o[0] + ' ' + (o[1] + 12) + ' v-14" stroke="#7A5A3A" stroke-width="4"/>' +
        '<circle cx="' + o[0] + '" cy="' + (o[1] - o[2]) + '" r="' + o[2] + '" fill="#6E9A52"/><circle cx="' + (o[0] - o[2] / 3) + '" cy="' + (o[1] - o[2] * 1.2) + '" r="' + (o[2] * 0.55) + '" fill="#8DB46F"/>';
    }).join(''));
  var front = layer('C6',
    '<path d="' + FG + '"/>' + flowers.map(function (f) { return '<circle cx="' + f[0] + '" cy="' + f[1] + '" r="8"/>'; }).join(''),
    '<path d="' + FG + '" fill="#9BBF7A"/><path d="M0 390 C 200 370, 400 400, 600 380 L600 420 L0 420 Z" fill="#6E9A52" opacity=".7"/>' +
    flowers.map(function (f) { return '<path d="M' + f[0] + ' ' + (f[1] + 6) + ' v18" stroke="#5B8A45" stroke-width="2"/><circle cx="' + f[0] + '" cy="' + f[1] + '" r="9" fill="' + f[2] + '"/><circle cx="' + f[0] + '" cy="' + f[1] + '" r="3" fill="#FBF3E3"/>'; }).join('') +
    '<text x="560" y="410" text-anchor="end" font-family="Caveat" font-size="26" fill="#B8603E" style="direction:ltr">Asma ✦ 2026</text>');
  return '<rect width="600" height="420" fill="#FFFEFA"/>' + sky + sun + mountains + hills + village + front;
}

/* ============================================================
   5 · RENDER
   ============================================================ */

var $ = function (s) { return document.querySelector(s); };
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }
/* keep Latin runs (course lesson titles, numbers) reading left-to-right inside Arabic lines */
function txt(s) { return esc(s).replace(/[0-9A-Za-z][0-9A-Za-z .,'’–·()\-:+]*[0-9A-Za-z)]/g, function (m) { return '<bdi dir="ltr">' + m + '</bdi>'; }); }
function safeUrl(u) { u = String(u || '').trim(); return /^https?:\/\//i.test(u) ? u : ''; }

var prevComplete = null;

function render() {
  var C = computed();
  var nowComplete = C.chs.filter(function (x) { return x.complete; }).map(function (x) { return x.ch.id; });
  if (prevComplete) {
    nowComplete.forEach(function (id) {
      if (prevComplete.indexOf(id) === -1) {
        var ch = chById(id);
        if (ch && !ch.prologue) setTimeout(function () { celebrate(ch, C); }, 300);
      }
    });
  }
  prevComplete = nowComplete;

  renderStats(C); renderPainting(C); renderWeek(C); renderPalette(C); renderStrokes(C);
  renderChapters(C); renderManager(C); renderFinale(C);
  paintSync();
  S.justDone = {};
}

function paintSync() {
  var map = {
    local:   { c: '#8a96a8', t: 'حفظ محلي فقط — افتحي «إعدادات الحفظ» لتفعيل المزامنة' },
    idle:    { c: '#D9A441', t: 'جاهز للمزامنة' },
    syncing: { c: '#D9A441', t: 'جارٍ المزامنة…' },
    ok:      { c: '#2F8C8C', t: 'متزامن' + (S.lastSync ? ' · آخر مزامنة ' + S.lastSync.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '') },
    error:   { c: '#B8603E', t: 'تعذّرت المزامنة — تحقّقي من الـ Gist ID والتوكن واسم الملف' }
  };
  var m = map[S.sync] || map.local;
  var d = $('#syncDot'); if (d) { d.style.background = m.c; d.classList.toggle('pulse', S.sync === 'syncing'); }
  var t = $('#syncTxt'); if (t) t.textContent = m.t;
  var rb = $('#roleBadge'); if (rb) rb.textContent = S.role === 'asma' ? EMPLOYEE.name + ' 🎨' : S.role === 'manager' ? MANAGER_LABEL : '—';
}

function renderStats(C) {
  var el = $('#stats'); if (!el) return;
  var wk = currentWeek();
  var cells = [
    { c: 's1', v: C.done + '/' + C.total, l: 'ضربة فرشاة' },
    { c: 's2', v: C.layers + '/6', l: 'طبقة اكتملت' },
    { c: 's3', v: C.pending, l: 'قيد المراجعة' },
    { c: 's4', v: wk === 0 ? '—' : wk > 12 ? '✓' : wk + '/12', l: 'الأسبوع' }
  ];
  el.innerHTML = cells.map(function (x) {
    return '<div class="stat ' + x.c + '"><b>' + esc(x.v) + '</b><span>' + x.l + '</span></div>';
  }).join('');
}

function renderPainting(C) {
  var svg = $('#painting'); if (!svg) return;
  svg.innerHTML = paintingSVG(C);
  var pc = $('#canvasPct');
  if (pc) pc.textContent = C.allDone ? 'finished ✦ 100%' : 'painted ' + C.pct + '%';
}

function pageIcon(st, c) {
  c = c || '#2F8C8C';
  if (st === 'done') return '<svg class="t-ico" viewBox="0 0 30 30"><path d="M15 3c6 0 12 5 12 12s-5 12-12 12S3 22 3 15 8 3 15 3z" fill="' + c + '" opacity=".9"/><path d="M10 15.5l3.4 3.4 6.6-7.4" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  if (st === 'pending') return '<svg class="t-ico" viewBox="0 0 30 30"><path d="M15 3c6 0 12 5 12 12s-5 12-12 12S3 22 3 15 8 3 15 3z" fill="' + c + '" opacity=".28"/><path d="M8 22 L20 9 l2.4 2.2 L10.6 24.4 7 25z" fill="#7A5A3A"/><path d="M20 9l2.4 2.2 1.8-2-2.4-2.2z" fill="#3D3B4A"/></svg>';
  return '<svg class="t-ico" viewBox="0 0 30 30"><circle cx="15" cy="15" r="11" fill="#fff" stroke="#CDBF9F" stroke-width="1.6" stroke-dasharray="3 3"/></svg>';
}

function renderWeek(C) {
  var el = $('#weekCard'); if (!el) return;
  var wk = currentWeek();
  var w = Math.max(1, Math.min(12, wk));
  var tasks = [];
  CHAPTERS.forEach(function (ch) { ch.tasks.forEach(function (t) { if (t.w === w) tasks.push({ t: t, ch: ch }); }); });
  var late = [];
  if (wk > 1) CHAPTERS.forEach(function (ch) { ch.tasks.forEach(function (t) { if (t.w && t.w < w && stat(t) === 'todo') late.push({ t: t, ch: ch }); }); });
  var ws = weekStart(w), we = weekEnd(w);
  var head = wk === 0 ? 'يبدأ الموسم الأحد 11 أكتوبر' : wk > 12 ? 'اكتملت اللوحة — يا لها من رحلة ✦' : 'ضربات هذا الأسبوع';
  var li = function (x) {
    var st = stat(x.t);
    return '<li class="' + st + '" data-jump="' + x.ch.id + '">' + pageIcon(st, PIG[x.ch.id].c) + '<span>' + txt(x.t.t) + '</span></li>';
  };
  el.innerHTML =
    '<div class="wk-cal"><div class="m">' + MONTHS_EN[ws.getMonth()] + '</div><div class="d">' + ws.getDate() + '</div><div class="w">الأسبوع ' + w + '</div></div>' +
    '<div><div class="wk-head"><h3>' + head + '</h3><span class="rng">' + fmtLong(ws) + ' — ' + fmtLong(we) + '</span></div>' +
    (tasks.length ? '<ul class="wk-list">' + tasks.map(li).join('') + '</ul>' : '<div class="wk-empty">لا مهام مسجّلة لهذا الأسبوع.</div>') +
    (late.length ? '<div class="wk-head" style="margin-top:12px"><h3 style="font-size:16px;color:var(--sienna)">من الأسابيع الماضية (' + late.length + ')</h3></div><ul class="wk-list">' + late.slice(0, 4).map(li).join('') + '</ul>' : '') +
    '</div>';
  el.querySelectorAll('[data-jump]').forEach(function (n) {
    n.addEventListener('click', function () { openChapter(n.getAttribute('data-jump')); });
  });
}

function openChapter(id) {
  S.open[id] = true; render();
  var card = document.getElementById('ch-' + id);
  if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* the palette: one paint well per chapter */
function renderPalette(C) {
  var el = $('#palette'); if (!el) return;
  el.innerHTML = C.chs.map(function (x, i) {
    var isCur = !C.allDone && i === C.currentIdx, locked = i > C.currentIdx && !x.complete;
    var pg = PIG[x.ch.id];
    return '<button class="well' + (x.complete ? ' complete' : '') + (isCur ? ' current' : '') + (locked ? ' locked' : '') + '" data-jump="' + x.ch.id + '" style="--c:' + pg.c + ';--p:' + x.pct + '" title="' + esc(pg.l) + '">' +
      '<span class="well-cup"><span class="pig"></span><span class="ring"></span><span class="pct">' + (x.complete ? '✦' : x.pct + '%') + '</span></span>' +
      '<span class="well-name">' + esc(x.ch.name) + '</span><span class="well-en">' + esc(pg.l) + '</span></button>';
  }).join('') +
  '<svg class="brush" viewBox="0 0 240 30" aria-hidden="true"><rect x="0" y="11" width="150" height="8" rx="4" fill="#8E5B3A"/><rect x="146" y="9" width="40" height="12" rx="2" fill="#C9CCD3"/><path d="M186 8 C 212 6, 232 12, 240 15 C 232 18, 212 24, 186 22 Z" fill="#3D3B4A"/><path d="M226 13 C 234 14, 238 15, 240 15 C 238 16, 234 17, 226 17 Z" fill="#D9798B"/></svg>';
  el.querySelectorAll('[data-jump]').forEach(function (n) { n.addEventListener('click', function () { openChapter(n.getAttribute('data-jump')); }); });
}

/* 12 brushstrokes */
var STROKE = 'M6 30 C 20 14, 60 10, 110 14 C 150 17, 180 12, 194 20 C 198 26, 190 40, 160 42 C 120 45, 70 40, 30 44 C 12 46, 2 40, 6 30 Z';
function renderStrokes(C) {
  var el = $('#strokes'); if (!el) return;
  var wk = currentWeek(), html = '';
  for (var w = 1; w <= 12; w++) {
    var b = C.byWeek[w], frac = b.total ? b.done / b.total : 0;
    var ch = CHAPTERS.filter(function (c) { return c.weeks && c.weeks.indexOf(w) > -1; })[0];
    var col = ch ? PIG[ch.id].c : '#999';
    var o = Math.max(C.active[w] ? 0.35 : 0, frac);
    html += '<div class="stk' + (w === wk ? ' now' : '') + (C.active[w] ? ' active' : '') + '" style="--c:' + col + ';--o:' + o.toFixed(2) + '">' +
      '<svg viewBox="0 0 200 56" preserveAspectRatio="none"><path class="bg" d="' + STROKE + '" filter="url(#wc)"/><path class="fg" d="' + STROKE + '" filter="url(#wc)"/></svg>' +
      '<span class="dotw" title="عملتِ في هذا الأسبوع"></span>' +
      '<div class="lbl"><b>W' + w + '</b><span>' + fmt(weekStart(w)) + ' – ' + fmt(weekEnd(w)) + '</span></div></div>';
  }
  el.innerHTML = html +
    '<div class="streak" style="grid-column:1/-1"><span class="chip">🖌️ سلسلة الروتين: ' + C.streak + (C.streak === 1 ? ' أسبوع' : ' أسابيع') + ' متتالية</span>' +
    '<span style="color:var(--muted);font-size:14px">النقطة الداكنة = أسبوعٌ عملتِ فيه · كثافة اللون = نسبة ما اعتُمد من مهامه</span></div>';
}

function paintingsFor(ch) { return (ch.read || []).map(function (k) { return PAINTINGS[k] ? { k: k, p: PAINTINGS[k] } : null; }).filter(Boolean); }

function renderChapters(C) {
  var el = $('#chapters'); if (!el) return;
  el.innerHTML = C.chs.map(function (x, i) {
    var ch = x.ch, pg = PIG[ch.id];
    var isCur = !C.allDone && i === C.currentIdx;
    var locked = i > C.currentIdx && !x.complete;
    var open = S.open[ch.id] !== undefined ? S.open[ch.id] : isCur;
    var dates = ch.weeks ? 'الأسبوعان ' + ch.weeks[0] + ' و' + ch.weeks[1] + ' · ' + fmtLong(weekStart(ch.weeks[0])) + ' – ' + fmtLong(weekEnd(ch.weeks[1])) : 'سُلِّمت قبل البداية';

    var reads = paintingsFor(ch).map(function (r) {
      return '<a class="read-chip" href="' + esc(od(r.p.f)) + '" target="_blank" rel="noopener" data-pnt="' + r.k + '">🖼️ ' + esc(r.p.t) + ' <small>PDF</small></a>';
    }).join('');

    var tasks = ch.tasks.map(function (t) {
      var st = stat(t), tg = TAGS[t.c] || TAGS.mm;
      var link = S.links[t.id];
      var acts = '';
      if (S.role === 'asma' && !t.pre) {
        if (st === 'todo') acts = btn('rose', 'أنجزتُها 🖌️', t.id, 'pending');
        else if (st === 'pending') acts = btn('ghost', 'تراجع', t.id, 'todo');
      } else if (S.role === 'manager' && !t.pre) {
        if (st === 'pending') acts = btn('teal', 'اعتماد ✓', t.id, 'done') + btn('ghost', 'إرجاع', t.id, 'todo');
        else if (st === 'todo') acts = btn('ghost', 'اعتماد مباشر', t.id, 'done');
        else acts = btn('ghost', 'إلغاء', t.id, 'pending');
      }
      var sub = '';
      if (t.sub && S.role === 'asma' && st !== 'done') {
        sub = '<button class="t-attach" data-attach="' + t.id + '">📎 ' + (link ? 'تعديل الرابط' : 'أرفقي رابط عملك') + '</button>' +
          '<div class="t-sub" id="sub-' + t.id + '"><input type="url" dir="ltr" placeholder="رابط عملك (Drive / Canva / Docs)…" data-linkin="' + t.id + '" value="' + esc(link || '') + '">' +
          '<button class="btn btn-ink btn-xs" data-linksave="' + t.id + '">حفظ الرابط</button></div>';
      }
      return '<div class="task ' + st + (S.justDone[t.id] ? ' just-done' : '') + '">' + pageIcon(st, pg.c) +
        '<div class="t-main"><div class="t-txt">' + txt(t.t) + '</div>' +
          '<div class="t-tags"><span class="tag ' + tg.c + '">' + tg.l + '</span>' +
          (t.m && t.c !== 'mm' ? '<span class="tag tag-mm">تطبيق على ممكن</span>' : '') +
          '<span class="tag tag-kind">' + (KIND[t.k] || '') + '</span>' +
          (t.w ? '<span class="tag tag-wk">W' + t.w + '</span>' : '') +
          (t.url ? '<a class="t-link" href="' + esc(t.url) + '" target="_blank" rel="noopener">افتحي الدورة ↗</a>' : '') +
          (safeUrl(link) ? '<a class="t-link" href="' + esc(safeUrl(link)) + '" target="_blank" rel="noopener">📎 العمل المرفق</a>' : '') +
          '</div>' + sub + '</div>' +
        '<div class="t-act"><span class="t-state st-' + st + '">' + (st === 'done' ? 'تمّ ✦' : st === 'pending' ? 'قيد المراجعة' : 'لم تبدأ') + '</span>' + acts + '</div>' +
      '</div>';
    }).join('');

    return '<article class="ch rv' + (x.complete ? ' done' : '') + (isCur ? ' current' : '') + (locked ? ' locked' : '') + (open ? ' open' : '') + (ch.prologue ? ' prologue' : '') + '" id="ch-' + ch.id + '" style="--c:' + pg.c + '">' +
      '<header class="ch-head" data-toggle="' + ch.id + '">' +
        '<div class="ch-num"><div><small>' + (ch.prologue ? 'البداية' : 'الطبقة') + '</small><b>' + (ch.prologue ? '✎' : ch.n) + '</b></div></div>' +
        '<div class="ch-titles"><div class="ch-en">' + esc(ch.en) + '</div><h3>' + esc(ch.name) + '</h3><div class="ch-meta">' + txt(ch.course) + ' · ' + dates + '</div></div>' +
        '<div class="ch-prog"><div class="row"><span dir="ltr">' + x.done + ' / ' + x.total + '</span><span dir="ltr">' + x.pct + '%</span></div><div class="ch-bar"><i style="width:' + x.pct + '%"></i></div></div>' +
        '<button class="ch-toggle" aria-label="فتح أو طي الفصل">⌄</button>' +
      '</header>' +
      '<div class="ch-body"><div class="ch-inner">' +
        '<p class="ch-desc">' + esc(ch.desc) + '</p>' +
        (reads ? '<div class="ch-read"><span style="font-size:13px;color:var(--muted);align-self:center">من حبال التجفيف:</span>' + reads + '</div>' : '') +
        '<div class="tasks">' + tasks + '</div>' +
      '</div></div>' +
    '</article>';
  }).join('');

  el.querySelectorAll('[data-toggle]').forEach(function (h) {
    h.addEventListener('click', function () {
      var id = h.getAttribute('data-toggle'), card = document.getElementById('ch-' + id);
      var willOpen = !card.classList.contains('open');
      S.open[id] = willOpen; card.classList.toggle('open', willOpen);
    });
  });
  bindTaskButtons(el);
  el.querySelectorAll('[data-attach]').forEach(function (b) {
    b.addEventListener('click', function () {
      var box = document.getElementById('sub-' + b.getAttribute('data-attach'));
      if (box) { box.classList.toggle('on'); var inp = box.querySelector('input'); if (inp && box.classList.contains('on')) inp.focus(); }
    });
  });
  el.querySelectorAll('[data-linksave]').forEach(function (b) {
    b.addEventListener('click', function () {
      var id = b.getAttribute('data-linksave');
      var inp = el.querySelector('[data-linkin="' + id + '"]');
      var u = safeUrl(inp && inp.value);
      if (inp && inp.value && !u) { toast('الرابط يجب أن يبدأ بـ https://'); return; }
      setLink(id, u); toast(u ? 'حُفظ الرابط 📎 — سيراه المشرف' : 'حُذف الرابط');
    });
  });
  observeReveals();
}

function btn(kind, label, id, to) {
  return '<button class="btn btn-' + kind + ' btn-sm" data-task="' + id + '" data-to="' + to + '">' + label + '</button>';
}
function bindTaskButtons(root) {
  root.querySelectorAll('[data-task]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      ripple(b, e);
      var id = b.getAttribute('data-task'), to = b.getAttribute('data-to');
      if (to === 'done') { splash(b, 26); }
      else if (to === 'pending') { splash(b, 12); toast('ضربةٌ جميلة 🖌️ المهمة الآن قيد المراجعة — بانتظار اعتماد المشرف'); }
      setStatus(id, to);
    });
  });
}

/* ---------- manager panel ---------- */
function renderManager(C) {
  var sec = $('#mgrSec'), el = $('#mgrPanel');
  if (!sec || !el) return;
  if (S.role !== 'manager') { sec.classList.add('hidden'); return; }
  sec.classList.remove('hidden');
  var pend = [];
  CHAPTERS.forEach(function (ch) { ch.tasks.forEach(function (t) { if (stat(t) === 'pending') pend.push({ ch: ch, t: t }); }); });
  var list = pend.length ? pend.map(function (p) {
    var l = safeUrl(S.links[p.t.id]);
    return '<div class="mgr-item"><span class="mi-txt">' + txt(p.t.t) + '<span class="mi-lvl">الطبقة ' + p.ch.n + ' · ' + esc(p.ch.name) + ' · W' + p.t.w + '</span></span>' +
      (l ? '<a class="mi-link" href="' + esc(l) + '" target="_blank" rel="noopener">📎 افتح العمل</a>' : '') +
      '<button class="btn btn-teal btn-xs" data-task="' + p.t.id + '" data-to="done">اعتماد ✓</button>' +
      '<button class="btn btn-ghost-l btn-xs" data-task="' + p.t.id + '" data-to="todo">إرجاع</button></div>';
  }).join('') : '<div class="mgr-empty">لا شيء قيد المراجعة حاليًا ✦</div>';
  el.innerHTML = '<h3>لوحة المشرف</h3>' +
    '<p class="mgr-lead">' + (pend.length ? 'لديك ' + pend.length + ' مهمة قيد المراجعة.' : 'كل المهام معتمدة — الأمور على أتمّ وجه.') +
    ' الإنجاز الكلي: ' + C.pct + '% · الأسبوع ' + Math.max(1, Math.min(12, currentWeek())) + ' من 12 · سلسلة الروتين: ' + C.streak + '.</p>' +
    '<div class="mgr-list">' + list + '</div>';
  bindTaskButtons(el);
}

/* ---------- the finale: a covered canvas ---------- */
function clothSVG() {
  return '<svg viewBox="0 0 640 470" preserveAspectRatio="none"><defs>' +
    '<linearGradient id="clothG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E8DCC6"/><stop offset=".22" stop-color="#F7EFE0"/><stop offset=".45" stop-color="#E2D4BA"/><stop offset=".7" stop-color="#F5ECDB"/><stop offset="1" stop-color="#DDCDB0"/></linearGradient></defs>' +
    '<path d="M30 10 C 200 -6, 440 -6, 610 10 C 622 140, 630 300, 640 446 C 560 470, 480 440, 400 462 C 320 440, 240 470, 160 452 C 90 470, 40 448, 0 460 C 10 300, 20 140, 30 10 Z" fill="url(#clothG)"/>' +
    '<path d="M150 20 C 160 160, 150 320, 168 450 M320 14 C 312 160, 330 300, 318 450 M470 20 C 480 170, 466 320, 486 456" stroke="rgba(150,120,80,.22)" stroke-width="6" fill="none"/>' +
    '<g transform="translate(320 230)"><circle r="34" fill="#D9798B" opacity=".9" filter="url(#wcSoft)"/><text y="9" text-anchor="middle" font-size="26">🎨</text></g></svg>';
}
function renderFinale(C) {
  var el = $('#finale'); if (!el) return;
  var daysLeft = Math.max(0, Math.ceil((END - new Date()) / DAY));
  var open = C.allDone;
  el.classList.toggle('open', open);
  el.innerHTML =
    '<div class="kick">الختام · The Unveiling</div>' +
    '<div class="fin-easel"><div class="canvas-frame"><svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice">' + paintingSVG(C, true) + '</svg></div><div class="cloth">' + clothSVG() + '</div></div>' +
    (open
      ? '<h3>رُفع القماش — واكتمل المعرض!</h3><p>ست طبقات، اثنا عشر أسبوعًا، وحملةٌ عرضتِها بنفسك. ما كان تحت القماش صار لكِ — مرّي على المكتب ✦</p>'
      : '<h3>في آخر المرسم… لوحةٌ مغطّاة</h3><p>ما تحت القماش يبقى سرًّا حتى تكتمل الطبقة السادسة. كلُّ مهمةٍ تُنجَز تقرّب لحظة رفع الغطاء — وحين يُفتتح «المعرض»، يُرفع باسمك.</p>') +
    '<div class="fin-meter"><i style="width:' + C.pct + '%"></i></div>' +
    '<div class="fin-sub"><bdi dir="ltr">' + C.done + ' / ' + C.total + '</bdi> مهمة · ' + (open ? 'اكتمل' : 'متبقٍّ ' + daysLeft + ' يومًا حتى 31 ديسمبر') + '</div>' +
    (S.role === 'manager' ? '<div class="fin-mgr">🔒 <b>للمشرف فقط:</b> ما تحت القماش من اختيارك — جهّزه قبل يوم «المعرض» (الأسبوع 12). يُرفع الغطاء تلقائيًا عند اعتماد آخر مهمة، وأسماء لا ترى هذه الملاحظة.</div>' : '');
}

/* ---------- drying lines ---------- */
var isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;

function rnd(seed) { var s = seed % 2147483647; if (s <= 0) s += 2147483646; return function () { s = s * 16807 % 2147483647; return (s - 1) / 2147483646; }; }
function motif(m, c, r) {
  var a = '';
  if (m === 'sun')   a = '<circle cx="80" cy="60" r="26" fill="' + c + '" opacity=".9"/><rect x="0" y="92" width="160" height="110" fill="' + c + '" opacity=".35"/>';
  if (m === 'moon')  a = '<circle cx="104" cy="52" r="22" fill="' + c + '" opacity=".85"/><circle cx="112" cy="46" r="20" fill="#FFFEFA"/><path d="M0 150 C 50 120, 110 160, 160 132 L160 200 L0 200Z" fill="' + c + '" opacity=".45"/>';
  if (m === 'hills') a = '<path d="M0 120 C 40 90, 80 110, 160 84 L160 200 L0 200Z" fill="' + c + '" opacity=".55"/><path d="M0 150 C 60 130, 110 160, 160 138 L160 200 L0 200Z" fill="' + c + '" opacity=".85"/>';
  if (m === 'phone') a = '<rect x="50" y="34" width="60" height="110" rx="12" fill="none" stroke="' + c + '" stroke-width="7"/><rect x="60" y="50" width="40" height="40" fill="' + c + '" opacity=".6"/><path d="M60 102h40M60 114h28" stroke="' + c + '" stroke-width="5"/>';
  if (m === 'frame') a = '<rect x="26" y="40" width="108" height="76" fill="' + c + '" opacity=".5"/><rect x="26" y="40" width="108" height="76" fill="none" stroke="' + c + '" stroke-width="6"/><circle cx="58" cy="128" r="10" fill="' + c + '"/><circle cx="102" cy="128" r="10" fill="' + c + '"/>';
  if (m === 'burst') { for (var i = 0; i < 9; i++) { var an = i / 9 * 6.283; a += '<path d="M80 80 L' + (80 + Math.cos(an) * 60).toFixed(0) + ' ' + (80 + Math.sin(an) * 60).toFixed(0) + '" stroke="' + c + '" stroke-width="' + (6 + r() * 6).toFixed(0) + '" stroke-linecap="round" opacity=".7"/>'; } a += '<circle cx="80" cy="80" r="20" fill="' + c + '"/>'; }
  if (m === 'dots')  { for (var j = 0; j < 14; j++) a += '<circle cx="' + (20 + r() * 120).toFixed(0) + '" cy="' + (20 + r() * 120).toFixed(0) + '" r="' + (6 + r() * 14).toFixed(0) + '" fill="' + c + '" opacity="' + (0.35 + r() * 0.5).toFixed(2) + '"/>'; }
  if (m === 'swirl') a = '<path d="M80 80 m-6 0 a6 6 0 1 1 12 0 a14 14 0 1 1 -28 0 a24 24 0 1 1 48 0 a36 36 0 1 1 -72 0 a48 48 0 1 1 96 0" fill="none" stroke="' + c + '" stroke-width="8" stroke-linecap="round" opacity=".8"/>';
  if (m === 'eye')   a = '<path d="M14 80 C 50 34, 110 34, 146 80 C 110 126, 50 126, 14 80Z" fill="' + c + '" opacity=".35"/><circle cx="80" cy="80" r="24" fill="' + c + '"/><circle cx="80" cy="80" r="9" fill="#2A2A35"/>';
  return a;
}
function miniPainting(k, p) {
  var r = rnd(parseInt(k, 10) * 977 + 13);
  var bg = '', i;
  for (i = 0; i < 4; i++) bg += '<circle cx="' + (r() * 160).toFixed(0) + '" cy="' + (r() * 200).toFixed(0) + '" r="' + (40 + r() * 50).toFixed(0) + '" fill="' + p.c + '" opacity="' + (0.12 + r() * 0.16).toFixed(2) + '"/>';
  return '<svg viewBox="0 0 160 200" preserveAspectRatio="xMidYMid slice"><g filter="url(#wc)">' + bg + motif(p.m, p.c, r) + '</g></svg>';
}
function ropeSVG() {
  return '<svg viewBox="0 0 1000 40" preserveAspectRatio="none"><path d="M0 6 Q 500 46 1000 6" stroke="#9C7A55" stroke-width="2.4" fill="none"/><path d="M0 6 Q 500 46 1000 6" stroke="rgba(255,255,255,.35)" stroke-width=".8" fill="none" stroke-dasharray="4 5"/></svg>';
}
function renderLines() {
  var el = $('#lines'); if (!el) return;
  el.innerHTML = LINES.map(function (L, li) {
    var n = L.ids.length;
    return '<div class="line"><div class="line-cap"><span>' + esc(L.ar) + '</span><span class="en">' + esc(L.en) + '</span></div>' +
      '<div class="rope">' + ropeSVG() + '</div><div class="line-row">' +
      L.ids.map(function (k, i) {
        var p = PAINTINGS[k]; if (!p) return '';
        var mid = (n - 1) / 2, sag = Math.round((1 - Math.pow((i - mid) / (mid || 1), 2)) * 14);
        var rt = ((i % 2 ? 1 : -1) * (0.6 + (i * 37 % 10) / 10)).toFixed(1);
        return '<a class="pnt" href="' + esc(od(p.f)) + '" target="_blank" rel="noopener" data-pnt="' + k + '" style="--rt:' + rt + 'deg;--dl:-' + (i * 0.9 + li).toFixed(1) + 's;--mt:' + sag + 'px">' +
          '<span class="peg"></span><div class="pnt-paper"><div class="pnt-art">' + miniPainting(k, p) +
          '<span class="pnt-pdf">PDF</span><div class="pnt-title' + (p.lat ? ' lat' : '') + '">' + esc(p.t) + '</div></div></div>' +
          '<div class="pnt-cap">' + esc(p.a) + '</div></a>';
      }).join('') + '</div></div>';
  }).join('');
  $('#labelCard').innerHTML = '<div class="peek-hint">' + (isTouch ? 'المسي أي لوحة لتري تفاصيلها… ثم المسيها مجددًا لتفتحي الـ PDF ✦' : 'مرّري المؤشّر على أي لوحة لتري تفاصيلها — واضغطي لتفتحي الـ PDF ✦') + '</div>';

  el.querySelectorAll('[data-pnt]').forEach(function (n) {
    var k = n.getAttribute('data-pnt');
    n.addEventListener('mouseenter', function () { peek(k); });
    n.addEventListener('focus', function () { peek(k); });
    n.addEventListener('click', function (e) {
      if (isTouch && !n.classList.contains('peek')) { e.preventDefault(); peek(k, true); }
    });
  });
}
function peek(k, mark) {
  var p = PAINTINGS[k]; if (!p) return;
  document.querySelectorAll('.pnt.peek').forEach(function (x) { x.classList.remove('peek'); });
  var n = document.querySelector('.pnt[data-pnt="' + k + '"]');
  if (n && (mark || isTouch)) n.classList.add('peek');
  var ch = chByN(p.ch);
  $('#labelCard').innerHTML =
    '<div class="lbl-in" style="--c:' + p.c + '"><div class="lbl-sw"></div><div>' +
      '<h4>' + esc(p.t) + '</h4><div class="pa">من إصدارات ' + esc(p.a) + '</div>' +
      '<p>' + esc(p.d) + '</p>' +
      '<div class="lbl-row"><a class="btn btn-teal btn-sm" href="' + esc(od(p.f)) + '" target="_blank" rel="noopener">📖 افتحي الـ PDF</a>' +
      (ch ? '<span class="tag tag-free">رفيقة الطبقة ' + ch.n + ' · ' + esc(ch.name) + '</span>' : '') + '</div></div></div>';
}

/* ---------- swatches ---------- */
function renderSwatches() {
  var el = $('#swatches'); if (!el) return;
  el.innerHTML = SWATCHES.map(function (s) {
    var ch = chByN(s.ch);
    return '<a class="sw rv" href="' + esc(s.url) + '" target="_blank" rel="noopener" style="--c:' + s.c + '">' +
      '<div class="sw-chip"><span class="lang">' + s.l + '</span><span class="src">' + esc(s.src) + '</span></div>' +
      '<div class="sw-body"><div class="sw-ch">الطبقة ' + s.ch + ' · ' + esc(ch ? ch.name : '') + '</div>' +
      '<h4' + (s.l === 'EN' ? ' dir="ltr" style="text-align:right;font-family:Gotham;font-size:15px"' : '') + '>' + esc(s.t) + '</h4><p>' + esc(s.d) + '</p><span class="sw-go">ابدئي ↗</span></div></a>';
  }).join('');
}

function renderLater() {
  var el = $('#laterBody'); if (!el) return;
  el.innerHTML = LATER.map(function (g) {
    return '<div class="lt-group"><h5>' + esc(g.h) + '</h5><ul>' + g.items.map(function (it) {
      return '<li><a href="' + esc(it.url) + '" target="_blank" rel="noopener">' + esc(it.t) +
        '<span class="lang-tag">' + (it.l === 'ar' ? 'عربي' : 'EN') + '</span><small>' + esc(it.s) + '</small></a></li>';
    }).join('') + '</ul></div>';
  }).join('');
}

/* ============================================================
   6 · DELIGHT — living ink, paint splashes, toasts
   ============================================================ */

var INKS = ['#D9798B', '#2F8C8C', '#D9A441', '#4A63B5', '#8A6BB0', '#6E9A52'];

/* paint-splash confetti */
var cvs = document.getElementById('confetti'), ctx = cvs.getContext('2d'), parts = [], rafId = null;
function sizeCanvas() { cvs.width = innerWidth; cvs.height = innerHeight; }
addEventListener('resize', sizeCanvas); sizeCanvas();
function splash(el, n) { var r = el.getBoundingClientRect(); spawn(r.left + r.width / 2, r.top + r.height / 2, n || 24, 1); }
function rain(n) { for (var i = 0; i < (n || 100); i++) spawn(Math.random() * innerWidth, -30 - Math.random() * innerHeight * 0.4, 1, 0.55); }
function spawn(x, y, n, p) {
  for (var i = 0; i < n; i++) parts.push({ x: x, y: y, vx: (Math.random() - 0.5) * 10 * p, vy: (Math.random() * -8 - 3) * p,
    g: 0.26 + Math.random() * 0.16, s: 4 + Math.random() * 9, a: 0.55 + Math.random() * 0.4, sq: 0.6 + Math.random() * 0.6,
    rot: Math.random() * 6.28, col: INKS[(Math.random() * INKS.length) | 0] });
  if (!rafId) rafId = requestAnimationFrame(step);
}
function step() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  for (var i = parts.length - 1; i >= 0; i--) {
    var q = parts[i];
    q.vy += q.g; q.vx *= 0.99; q.x += q.vx; q.y += q.vy;
    if (q.y > cvs.height + 40) { parts.splice(i, 1); continue; }
    ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.rot); ctx.globalAlpha = q.a;
    ctx.fillStyle = q.col; ctx.beginPath(); ctx.ellipse(0, 0, q.s, q.s * q.sq, 0, 0, 6.283); ctx.fill();
    ctx.globalAlpha = q.a * 0.4; ctx.beginPath(); ctx.arc(q.s * 1.3, q.s * 0.4, q.s * 0.35, 0, 6.283); ctx.fill();
    ctx.restore();
  }
  if (parts.length) rafId = requestAnimationFrame(step); else { rafId = null; ctx.clearRect(0, 0, cvs.width, cvs.height); }
}
function toast(msg) {
  var box = $('#toasts'); if (!box) return;
  var t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; box.appendChild(t);
  setTimeout(function () { t.classList.add('leave'); setTimeout(function () { t.remove(); }, 400); }, 4200);
}
function celebrate(ch, C) {
  rain(120); setTimeout(function () { rain(60); }, 500);
  var last = C.allDone, pg = PIG[ch.id];
  var v = document.createElement('div'); v.className = 'cele';
  v.innerHTML = '<div class="cele-card" style="--c:' + pg.c + '"><div class="cele-bloom"></div>' +
    '<h2>' + (last ? 'اكتملت اللوحة يا أسماء! 🎨' : 'اكتملت الطبقة ' + ch.n + ' ✦') + '</h2>' +
    '<p>' + (last ? 'ست طبقات، ولوحةٌ موقّعة باسمك — ورُفع القماش في آخر المرسم. مرّي على المكتب ✦'
                  : 'تمّ «' + esc(ch.name) + '» — وانسكب لون ' + pg.l + ' على لوحتك. ' + (6 - C.layers) + ' طبقات تنتظرك.') + '</p>' +
    '<button class="btn btn-rose" id="celeClose">' + (last ? 'إلى اللوحة ✦' : 'إلى الطبقة التالية ←') + '</button></div>';
  document.body.appendChild(v);
  function close() { v.remove(); var t = last ? $('#finaleSec') : $('#heroCanvas'); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  v.querySelector('#celeClose').addEventListener('click', close);
  v.addEventListener('click', function (e) { if (e.target === v) close(); });
}
function ripple(b, e) {
  var r = b.getBoundingClientRect(), s = document.createElement('span'), d = Math.max(r.width, r.height);
  s.className = 'ripple'; s.style.width = s.style.height = d + 'px';
  s.style.left = (e.clientX - r.left - d / 2) + 'px'; s.style.top = (e.clientY - r.top - d / 2) + 'px';
  b.appendChild(s); setTimeout(function () { s.remove(); }, 600);
}
function startQuotes() {
  var el = $('#bubbleTxt'); if (!el) return;
  var qi = Math.floor(Math.random() * QUOTES.length);
  function type() {
    var q = QUOTES[qi % QUOTES.length]; qi++; var i = 0; el.textContent = '';
    (function tick() { if (i <= q.length) { el.textContent = q.slice(0, i++); setTimeout(tick, 45); } else setTimeout(erase, 4200); })();
    function erase() { (function tick() { var s = el.textContent; if (s.length) { el.textContent = s.slice(0, -1); setTimeout(tick, 16); } else setTimeout(type, 500); })(); }
  }
  type();
}
var io = null;
function observeReveals() {
  if (!('IntersectionObserver' in window)) { document.querySelectorAll('.rv').forEach(function (n) { n.classList.add('in'); }); return; }
  if (!io) io = new IntersectionObserver(function (en) {
    en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
  }, { threshold: 0.06 });
  document.querySelectorAll('.rv:not(.in)').forEach(function (n) { io.observe(n); });
}

/* ============================================================
   7 · WIRING
   ============================================================ */
function showRolePicker(show) { var v = $('#rolePicker'); if (v) v.classList.toggle('hidden', !show); }

function init() {
  loadLocal();
  renderLines(); renderSwatches(); renderLater();

  $('#inGist').value = S.gistId; $('#inToken').value = S.token; $('#inFile').value = S.file || DEFAULT_FILE;
  if (S.gistId) S.sync = 'idle';

  showRolePicker(!S.role);
  function assumeRole(role, b) {
    S.role = role; saveCfg(); showRolePicker(false); render();
    if (b) splash(b, 30);
    if (role === 'asma') { toast('أهلًا يا أسماء 🎨 المرسم جاهز، والورقة مبلّلة — حرّكي المؤشّر في الأعلى وارسمي بالحبر'); }
  }
  document.querySelectorAll('[data-role]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.getAttribute('data-role') === 'manager') { var row = $('#pinRow'); if (row) { row.classList.remove('hidden'); $('#pinInput').focus(); } return; }
      assumeRole('asma', b);
    });
  });
  var pinGo = $('#pinGo');
  var tryPin = function () {
    var v = ($('#pinInput').value || '').trim();
    if (v === MANAGER_PIN) { $('#pinErr').classList.add('hidden'); assumeRole('manager', pinGo); }
    else { $('#pinErr').classList.remove('hidden'); $('#pinInput').select(); }
  };
  pinGo.addEventListener('click', tryPin);
  $('#pinInput').addEventListener('keydown', function (e) { if (e.key === 'Enter') tryPin(); });

  $('#btnSwitchRole').addEventListener('click', function () { showRolePicker(true); });
  $('#btnSyncNow').addEventListener('click', function () { pull(true); });
  $('#btnSetup').addEventListener('click', function () { $('#setupPanel').classList.toggle('hidden'); });
  $('#btnSaveSetup').addEventListener('click', function () {
    S.gistId = $('#inGist').value.trim(); S.token = $('#inToken').value.trim(); S.file = ($('#inFile').value.trim() || DEFAULT_FILE);
    saveCfg(); $('#setupPanel').classList.add('hidden');
    S.sync = S.gistId ? 'idle' : 'local'; toast('تم الحفظ — جارٍ الاتصال…'); pull(true);
  });

  render(); observeReveals(); startQuotes();
  if (S.gistId) pull();
  setInterval(function () { if (S.gistId && !pushPending) pull(); }, 60000);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
