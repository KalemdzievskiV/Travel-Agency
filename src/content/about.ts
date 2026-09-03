// About-section content for bookit. Feeling-led copy in British English,
// grounded in North Macedonia & the Balkans. The 5-reasons and how-it-works
// sequences now run on the client's own photography (see `@/content/media`);
// everything else still carries tonal-gradient placeholders (the `grad` pattern
// shared with destinations/trips) until their photos arrive. Kept here (not the
// DB) like other static site copy.
import { aboutMastheadBand, aboutPhoto, aboutWorldImage, processPhoto, reasonPhoto, aboutNameImage } from "@/content/media";

export type StoryRow = {
  eyebrow: string;
  title: string;
  body: string;
  grad: string;
  image: string;
  /** Which side the image sits on at desktop. */
  align: "left" | "right";
};

/**
 * One card in the About page's "our values" band. `kicker` is the small word
 * that runs above the name ("be" / „бидете"), `lead` the bold line under it,
 * and `tone` picks one of the --wf-value-* hues — this band is the one place
 * on the site carrying three accents rather than one, at the client's request.
 */
export type ValueColumn = {
  kicker: string;
  title: string;
  lead: string;
  body: string;
  tone: "var(--wf-value-1)" | "var(--wf-value-2)" | "var(--wf-value-3)";
};
export type Reason = { no: string; title: string; body: string; grad: string; image: string };
/** Opening title panel of the 5-reasons sequence (the reference's "WHY US?" slide). */
export type ReasonsIntro = { big: string; eyebrow: string; title: string };
export type ProcessStep = { no: string; title: string; body: string; grad: string; image: string };
/**
 * One topic of the "why not do it yourself?" sequence. `icon` names a glyph in
 * WhySplit's TOPIC_ICONS rather than being looked up by position: the English
 * and Macedonian topic lists are ordered differently and are different lengths,
 * so a positional array silently mismatched them (the Macedonian "Hotels"
 * topic drew a clock, which is what the 3.1 corrections flagged).
 */
export type WhyTopicIcon =
  | "time" | "ideas" | "value" | "peace" | "watertight"
  | "hotels" | "choice" | "details" | "support" | "price";
export type WhyTopic = { nav: string; title: string; body: string; grad: string; image: string; icon: WhyTopicIcon };

// ── Flagship: Who we are / Our purpose ──────────────────────────────
export const aboutPage = {
  hero: {
    eyebrow: "Who we are",
    title: "We are a team of people who genuinely know the world of travel",
    intro:
      "Our mission is to create unforgettable experiences that carefully connect our clients with the world, and inspire them to explore it with curiosity, respect and a sense of wonder.",
    grad: "var(--wf-brand-gradient-deep)",
    band: aboutMastheadBand,
    image: aboutPhoto[0],
  },

  story: [
    {
      eyebrow: "How it began",
      title: "It all started with a feeling",
      body: "bookit was founded in 2026 by two friends who wanted to change the world of standard package deals and journeys that all look alike.\n\nOur aim is to grow into award-winning creators of personalised journeys, conceived with inspiration, creativity and exceptional attention to every detail.\n\nFor us, the most important question has always been: how do you want to feel? Everything else is in the details.",
      grad: "linear-gradient(135deg,#5a6b86,#2a3550)",
      image: aboutPhoto[1],
      align: "right",
    },
    {
      eyebrow: "How we think",
      title: "Singular, different and bold",
      body: "We create experiences that leave a lasting impression. The journeys we create shape us too — an idea we learned from the legendary travel writer Bruce Chatwin, who spoke of the importance of living with a constant desire to discover.\n\nWhen we plan a journey, we set out to remove every obstacle standing between you and the world. Because you aren't only looking for the familiar, but for the unexpected, the unknown, and everything still waiting to be discovered.\n\nBut real knowledge stands behind every great adventure. Over the years we've built a team of people who live for travel — curious explorers with impeccable organisation and attention to every detail.\n\nThey are the people who will help you find the right path — even when the finest experience begins precisely with getting a little lost.",
      grad: "linear-gradient(135deg,#7a6a52,#2c2418)",
      image: aboutPhoto[2],
      align: "left",
    },
    {
      eyebrow: "What we do",
      title: "We'll show you the world — in a wholly new light",
      body: "We create journeys for those who want to draw genuinely close to the world, far from the tourist traps and the lists of places merely to be ticked off.\n\nInstead, we open space for deeper, more honest and more personal encounters with different cultures, traditions and ways of life.\n\nToday we arrange journeys across all seven continents, and we create each one from the very beginning. Which is exactly why no two journeys are ever the same.\n\nTrekking with the tribes of Borneo, discovering traditional leatherwork in Morocco, or living the thrilling atmosphere of the Palio in Siena. The world is vast, wild and full of surprises. Your journeys should be too.",
      grad: "linear-gradient(135deg,#4f6f57,#1d2c20)",
      image: aboutPhoto[3],
      align: "right",
    },
  ] satisfies StoryRow[],

  purpose: {
    eyebrow: "Our purpose",
    statement: "To take people on journeys they will remember for ever",
    grad: "var(--wf-brand-gradient-deep)",
    // Supporting facets that cross-fade as you scroll the pinned statement.
    facets: [
      "For our travellers, a journey is more than visiting somewhere new — it is an experience that changes how they see the world, and themselves.",
      "With our partners on the ground we build fair, long-standing relationships that succeed together.",
      "The places we are privileged to visit, we take care to protect and to leave better than we found them.",
    ],
  },

  values: [
    {
      kicker: "Be",
      title: "Curious",
      lead: "Our world is wide, varied and full of possibility",
      body: "We like to ask questions. How could this be better? Where next? What is genuinely possible, and what do our travellers actually want? Put simply: we love questions, and we value the people who bring new ideas.",
      tone: "var(--wf-value-1)",
    },
    {
      kicker: "Be",
      title: "Thoughtful",
      lead: "Because attention begins with thinking",
      body: "Good things come to those who think. And in our world, to think is to care — not only for our travellers, but for one another, and for the planet we all share.",
      tone: "var(--wf-value-2)",
    },
    {
      kicker: "Be",
      title: "Humble",
      lead: "Let others do the talking",
      body: "We don't let success carry us away, and we don't follow the noise around us. We are confident in what we do, dignified and calm under pressure, proud of what we achieve but never arrogant.",
      tone: "var(--wf-value-3)",
    },
  ] satisfies ValueColumn[],

  // "Why the name?" — the editorial split BT runs near the foot of the page.
  name: {
    eyebrow: "The idea behind the name",
    title: "Why Bookit?",
    body: "Every journey begins as an idea, but it becomes real the moment you say: “Book it.” That moment is exactly where the name Bookit comes from.\n\nBookit is the instant a daydream gets a date on it, a destination becomes a plan, and the plan becomes a journey. Our job is to make that decision easy, and to see that everything which follows is carefully considered, personal and worth remembering.",
    grad: "linear-gradient(135deg,#6a4f6a,#241a24)",
    image: aboutNameImage,
    align: "left",
  } satisfies StoryRow,

  // Full-bleed closing feeling band ("your world. your trips.").
  world: {
    eyebrow: "Your world",
    title: "Your journey, made to your measure",
    body: "No two journeys are alike, because no two travellers are. We build each experience around you — your pace, the people you travel with, and the feeling you want to come away with. From the first idea to the last detail, everything is shaped so the journey is singular and entirely yours.",
    grad: "linear-gradient(135deg,#3f6f7a,#16130f)",
    image: aboutWorldImage,
  },
};

// ── Why book with us → 5 reasons ────────────────────────────────────
// Photography is the client's own set (see `@/content/media`), one per reason
// in order; the gradients stay as the fallback behind them.
export const reasonsIntro: ReasonsIntro = {
  big: "WHY US?",
  eyebrow: "What sets us apart",
  title: "5 reasons to book your journey with bookit",
};

export const reasons: Reason[] = [
  {
    no: "01",
    title: "People who make the difference",
    body: "We believe an extraordinary team stands behind every unforgettable journey. Our genuine love of travel and our commitment to creating singular experiences are what set us apart in this industry.\n\nWith curiosity, care and a personal approach, we build meaningful, long-standing relationships founded on trust with every client.",
    grad: "linear-gradient(135deg,#3f6f7a,#1d3c45)",
    image: reasonPhoto[0],
  },
  {
    no: "02",
    title: "Experiences you won't find elsewhere",
    body: "Years of experience, creativity and a carefully built network of partners let us create journeys that simply don't appear in standard offerings.\n\nOur team opens the door to special places, authentic experiences and thoughtfully considered details that turn every journey into something rich and unforgettable.",
    grad: "linear-gradient(135deg,#5a6b86,#2a3550)",
    image: reasonPhoto[1],
  },
  {
    no: "03",
    title: "Exceptional partners",
    body: "Our long-standing, close partnerships with trusted local experts are what distinguish us from the rest.\n\nBecause of that closeness, services are created specifically for us — carefully adapted to what our clients need and to our own creative ideas for singular journeys.",
    grad: "linear-gradient(135deg,#7a6a52,#2c2418)",
    image: reasonPhoto[2],
  },
  {
    no: "04",
    title: "Creativity that inspires",
    body: "We stand out through an original approach, striking content and inventive ideas that keep changing the way journeys are experienced.\n\nThrough contemporary marketing, new concepts, a vision for the future of travel and singular partnerships, we inspire our audience to discover the world in a different, more exciting and more considered way.",
    grad: "linear-gradient(135deg,#4f6f57,#1d2c20)",
    image: reasonPhoto[3],
  },
  {
    no: "05",
    title: "Made to measure",
    body: "We create wholly personalised journeys, carefully shaped around the wishes, needs and expectations of each client.\n\nWith honest recommendations, a personal approach and attention to every detail, we aim for each journey to be better than imagined. What sets us apart is our love of building long-term relationships with our clients, and of improving what comes next on the strength of their feedback.",
    grad: "linear-gradient(135deg,#6a4f6a,#241a24)",
    image: reasonPhoto[4],
  },
];

// ── Why book with us → Why not just do it yourself? ─────────────────
/**
 * Typed explicitly rather than inferred: the Macedonian block below is declared
 * `typeof whyNotDiy`, so an inferred literal type here would pin every locale
 * to the English topics' exact `icon` strings.
 */
export type WhyNotDiy = {
  hero: { eyebrow: string; title: string; intro: string; grad: string };
  closing: string;
  closingBody: string;
  topics: WhyTopic[];
};
export const whyNotDiy: WhyNotDiy = {
  hero: {
    eyebrow: "Why book with us",
    title: "Why not just do it yourself?",
    intro:
      "If all you need is flights and a place to stay, you can book that online today in a few clicks.\n\nBut if you want your precious free time to genuinely be worth it — the journey to enrich you and leave a lasting impression — you need a trusted partner with real experience, knowledge and a feel for every detail.\n\nThat is where we come in.",
    grad: "linear-gradient(135deg,#5a6b86,#16130f)",
  },
  closing: "The journey is yours. We take care of everything else.",
  closingBody:
    "From the planning to the last detail, we look after everything that might otherwise pull your attention away from what matters most — enjoying the journey completely.",
  // Five reasons not to go it alone — pinned, scroll-driven like the reference.
  topics: [
    {
      nav: "Time management",
      icon: "time",
      title: "Your time is precious",
      body: "We invest the time you don't have, to create a journey where every detail answers what you actually want.\n\nWhether you want to see a familiar destination from a new angle, escape the everyday, indulge, take on a challenge or learn something new — we design each experience specifically for you.\n\nSo you come home rested, filled with new energy, and certain you made the very most of your precious free time.",
      grad: "linear-gradient(135deg,#15709B,#0E2A33)",
      image: "https://picsum.photos/seed/bookit-why-time/1400/1800",
    },
    {
      nav: "Idea generation",
      icon: "ideas",
      title: "Ideas that inspire",
      body: "Creating singular ideas is one of our greatest strengths. We know the world up close, and we have the knowledge, the experience and the real contacts to turn any journey into an experience that leaves a lasting impression.\n\nWe make sure you miss nothing that matters, and that you come home with memories you'll be talking about for months — even years.",
      grad: "linear-gradient(135deg,#1E7FB8,#123A40)",
      image: "https://picsum.photos/seed/bookit-why-ideas/1400/1800",
    },
    {
      nav: "Money saving",
      icon: "value",
      title: "More value for your budget",
      body: "What is the perfect journey worth? Our carefully considered programmes are full of singular ideas and experiences, shaped entirely around you.\n\nAt first glance the offer may look like a considerable investment, but every detail is chosen so you get the most value for your budget. Booking every service yourself would often cost you more — and there's every chance you'd miss something genuinely special.",
      grad: "linear-gradient(135deg,#0C747E,#0E2A33)",
      image: "https://picsum.photos/seed/bookit-why-value/1400/1800",
    },
    {
      nav: "Peace of mind",
      icon: "peace",
      title: "Nothing to worry about",
      body: "We are always there for you — discreetly in the background, ready to help if you have a question, need advice, or something unforeseen comes up.\n\nOr you can simply send us a postcard from some far-off island, just to tell us you're having a wonderful time.",
      grad: "linear-gradient(135deg,#3F8A2E,#10302A)",
      image: "https://picsum.photos/seed/bookit-why-peace/1400/1800",
    },
    {
      nav: "Watertight",
      icon: "watertight",
      title: "Complete security",
      body: "Even in the event that one of our partners cannot deliver a service, we are protected — and so, therefore, are you.",
      grad: "linear-gradient(135deg,#11919B,#0E2A33)",
      image: "https://picsum.photos/seed/bookit-why-watertight/1400/1800",
    },
  ],
};

// ── Why book with us → How it all works ─────────────────────────────
export const howItWorks: ProcessStep[] = [
  {
    no: "01",
    title: "A place for ideas and inspiration",
    body: "This website is a place for ideas and inspiration — the space where every new journey begins. You can browse destinations alphabetically through our A–Z list, or use the Trip Finder if you'd rather discover something new and unexpected.",
    grad: "linear-gradient(135deg,#3f6f7a,#1d3c45)",
    image: processPhoto[0],
  },
  {
    no: "02",
    title: "Nothing here is fixed",
    body: "Nothing you see here is set in stone. When you get in touch, we treat every suggested programme as a starting point for inspiration, not a rigid plan. Your journey will be carefully and precisely shaped around you, around what you want, and around the people you're travelling with.",
    grad: "linear-gradient(135deg,#5a6b86,#2a3550)",
    image: processPhoto[1],
  },
  {
    no: "03",
    title: "Tell us your idea",
    body: "If you have an idea you don't see here, do share it with us. Unless it involves robbing the Louvre, we can — and gladly will — try to arrange very nearly anything.",
    grad: "linear-gradient(135deg,#7a6a52,#2c2418)",
    image: processPhoto[2],
  },
  {
    no: "04",
    title: "We can arrange almost anything",
    body: "When we say we can arrange anything, we mean it — from timeless adventures like a family safari in Botswana, to the wholly unusual, like being left in the middle of the Amazon rainforest with nothing but a GPS phone in your hand.\n\nWhether you're after classic elegance or an adventure beyond every boundary, we'll turn your idea into an unforgettable journey.",
    grad: "linear-gradient(135deg,#4f6f57,#1d2c20)",
    image: processPhoto[3],
  },
  {
    no: "05",
    title: "Look for the green",
    body: "Wherever you notice bookit's distinctive green, that's your sign you can click and go further. Use the “Plan a trip” buttons across the site to reach us through our online form.",
    grad: "linear-gradient(135deg,#6a4f6a,#241a24)",
    image: processPhoto[4],
  },
  {
    no: "06",
    title: "We start planning straight away",
    body: "The moment you send the form, we begin planning your journey. One of our travel experts will be in touch with a first proposal. From there we refine it together until we've created a journey that answers exactly what you wanted.",
    grad: "linear-gradient(135deg,#3f5a4f,#161f18)",
    image: processPhoto[5],
  },
  {
    no: "07",
    title: "We stay with you throughout",
    body: "We never leave you alone in the process. We're here to perfect your programme together until every detail is exactly as you imagined it.\n\nAnd once the journey begins, we remain available — one call is all it takes, should you need us.",
    grad: "linear-gradient(135deg,#3f6f7a,#16130f)",
    image: processPhoto[6],
  },
];

// ── Regenerative travel (stub) ──────────────────────────────────────
export const regenerative = {
  eyebrow: "Why book with us",
  title: "Travel that gives more than it takes",
  intro:
    "We believe a journey should leave a place better than it found it. We're building the way we work around the communities and landscapes that make these trips possible — and we'll share that work here.",
  grad: "linear-gradient(135deg,#4f6f57,#16130f)",
  image: "https://picsum.photos/seed/bookit-about-regen/2000/1200",
};

// ═══════════════════════════════════════════════════════════════════
// Macedonian (МК). Text-only overrides — gradients/images/aligns are spread
// from the English objects so they stay in sync. Selected via getAbout(locale).
// ═══════════════════════════════════════════════════════════════════
// ─────────────────────────────────────────────────────────────────────────
// Macedonian copy, revision 3.0 (the "Texts" briefs).
//
// The voice changed with it: the whole site moved from formal "вие" to
// informal "ти". Keep new copy in the second person singular — a lapse back
// into "вашето патување" reads as a different brand two paragraphs later.
//
// Two things the briefs asked for that are NOT done here, because they change
// structure rather than words: the `world` section below was marked for
// deletion ("јас би ја отстранил како посебна секција"), and `values` still
// carries the three 3.1 values the client sent verbatim, where 3.0 proposes a
// different set of five. Both need a decision before they move.
// ─────────────────────────────────────────────────────────────────────────
const aboutPageMk: typeof aboutPage = {
  hero: {
    ...aboutPage.hero,
    eyebrow: "За нас",
    title: "Не започнавме Bookit за да продаваме повеќе патувања.",
    intro:
      "Го започнавме за да создаваме подобри. Веруваме дека најдоброто патување не започнува со понуда, пакет или листа на хотели. Започнува со човекот што ќе патува. Со тоа што го сака. Со тоа што не го сака. И со чувството со кое сака да се врати дома.\n\nТоа е Bookit. Патувања што почнуваат од тебе.",
  },
  story: [
    {
      ...aboutPage.story[0],
      eyebrow: "Како започна",
      title: "Bookit е нов. Луѓето зад него не се.",
      body: "Bookit започна во 2026 година од едноставна идеја: патувањето заслужува повеќе од готов пакет и неколку опции од каталог.\n\nЗад Bookit стојат луѓе со повеќе од 15 години искуство во светот на патувањата — години поминати во организирање, решавање, откривање и учење што навистина прави едно патување добро.\n\nГо создадовме Bookit за сето тоа знаење да го употребиме на поинаков начин. Помалку шаблони. Повеќе слушање. Помалку „ова е понудата“. Повеќе „што замислуваш?“\n\nЗатоа што не сакаме само да те испратиме некаде. Сакаме да го погодиме вистинското некаде за тебе.",
    },
    {
      ...aboutPage.story[1],
      eyebrow: "Како размислуваме",
      title: "Добро патување не мора да има повеќе. Треба да има подобро.",
      body: "Не повеќе градови. Не повеќе хотели. Не повеќе работи што „мора“ да се видат. Туку подобар ритам. Подобар избор. Подобар момент.\n\nПонекогаш ќе ти кажеме да останеш уште една ноќ. Понекогаш да прескокнеш нешто што сите го посетуваат. А понекогаш да оставиш едно попладне без никаков план.\n\nЗатоа што наше е да го организираме патувањето. Не да го преполниме.",
    },
    {
      ...aboutPage.story[2],
      eyebrow: "Што правиме",
      title: "Ти носиш идеја. Ние ги поврзуваме точките.",
      body: "Летови. Хотели. Мал хотел што не си знаел дека постои. Водич што знае која улица да ја фати пред да пристигнат сите други. Добар ресторан за третата вечер, не за првата. Трансфер што е таму кога треба да биде.\n\nИ доволно простор помеѓу сето тоа за патувањето да не изгледа како распоред.\n\nСекое Bookit патување го градиме од почеток, околу човекот што ќе го живее.",
    },
  ],
  purpose: {
    ...aboutPage.purpose,
    eyebrow: "Нашето мерило",
    statement: "Би го препорачале ли истото патување на некого што го сакаме?",
    facets: [
      "Ако одговорот не е да, не е доволно добро.",
      "Сакаме да работиме со луѓе што ги цениме, со партнери на кои им веруваме и со места кон кои се однесуваме со почит.",
      "Не сакаме само да те вратиме дома задоволен. Сакаме да почнеш да размислуваш каде одиме следно.",
    ],
  },
  // Client-supplied copy (FINAL 3.1), verbatim. Revision 3.0 proposes five
  // different values in its place — left alone pending a decision, since
  // replacing approved copy and adding two more colour tones is not a
  // like-for-like swap.
  values: [
    {
      kicker: "Бидете",
      title: "Љубопитни",
      lead: "Нашиот свет е голем, разновиден и полн со можности",
      body: "Сакаме да поставуваме прашања. Како ова може да биде подобро? Каде понатаму? Што е навистина возможно и што навистина сакаат нашите патници? Едноставно кажано, ги сакаме прашањата и ги цениме луѓето што носат нови идеи и иновации.",
      tone: "var(--wf-value-1)",
    },
    {
      kicker: "Бидете",
      title: "Промислени",
      lead: "Затоа што вниманието започнува со размислување",
      body: "Добрите работи им се случуваат на оние што размислуваат. А во нашиот свет, да размислуваш значи да се грижиш. Не само за нашите патници, туку и едни за други. И за планетата што сите ја делиме.",
      tone: "var(--wf-value-2)",
    },
    {
      kicker: "Бидете",
      title: "Скромни",
      lead: "Нека другите зборуваат за вас",
      body: "Не дозволуваме успехот да нè понесе и не се водиме по вревата околу нас. Имаме самодоверба во она што го правиме, остануваме достоинствени и смирени под притисок, горди на нашите достигнувања, но никогаш арогантни.",
      tone: "var(--wf-value-3)",
    },
  ],
  name: {
    ...aboutPage.name,
    eyebrow: "Идејата зад името",
    title: "Зошто Bookit?",
    body: "Секое патување има еден момент кога престанува да биде идеја. Кога „еден ден би сакал…“ станува „ајде, резервирај го.“\n\nТокму тој момент е Bookit. Кога сонот добива датум. Кога местото станува план. Кога почнува исчекувањето.\n\nНаша работа е сè што доаѓа после тоа да биде вредно за таа одлука.",
  },
  world: {
    ...aboutPage.world,
    eyebrow: "Твојот свет",
    title: "Твоето патување, создадено по твоја мерка",
    body: "Не постојат две исти патувања, затоа што не постојат двајца исти патници. Секое искуство го создаваме според тебе — твоето темпо, луѓето со кои патуваш и чувството што сакаш да го доживееш. Од првата идеја до последниот детал, сè е внимателно обликувано за патувањето да биде единствено и целосно твое.",
  },
};

const reasonsIntroMk: ReasonsIntro = {
  big: "ЗОШТО BOOKIT?",
  eyebrow: "Што нè издвојува",
  title: "Не ти требаат повеќе опции. Ти требаат вистинските.",
};

// The `no` field carries 01–05, so these titles must not repeat the number.
const reasonsMk: Reason[] = [
  {
    ...reasons[0],
    title: "Прво те слушаме",
    body: "Не започнуваме со хотел. Не со лет. И не со готов пакет. Започнуваме со тебе.\n\nКако сакаш да патуваш. Што сакаш да видиш. Колку сакаш да забавиш. Што никогаш не би го избрал. И што би направило ова патување навистина твое.\n\nПотоа го градиме сето останато околу тоа. Затоа што tailor-made за нас не значи да смениме хотел во готова програма. Значи да започнеме од празна страница.",
  },
  {
    ...reasons[1],
    title: "Ќе ти кажеме што мислиме",
    body: "Понекогаш најдобрата услуга не е да кажеме „да“. Ако вреди да останеш уште една вечер, ќе ти кажеме. Ако хотелот изгледа подобро на Instagram отколку во живо, ќе ти кажеме. Ако постои подобра рута, подобар период или подобар начин, ќе го предложиме.\n\nНе сме тука само да резервираме што ќе побараш. Тука сме да ти помогнеме да избереш подобро.",
  },
  {
    ...reasons[2],
    title: "Твоето време е за патување",
    body: "Не за 47 отворени tabs.\n\nМожеш сам да споредуваш хотели. Да читаш стотици reviews. Да проверуваш дали трансферот стигнува навреме за летот. Да бараш кој ресторан навистина вреди и дали она „hidden gem“ од TikTok сè уште е hidden.\n\nИли можеш да ни кажеш што бараш. Ние ќе го направиме истражувањето, проверките и поврзувањето на сите детали. Тебе ќе ти ги донесеме изборите што имаат смисла.",
  },
  {
    ...reasons[3],
    title: "Деталите не се детали",
    body: "Вистинскиот лет. Вистинската соба. Трансфер што те чека кога треба. Водич што го познава местото, не само маршрутата. Резервација во ресторан во вечерта кога навистина има смисла да бидеш таму.\n\nПоединечно се мали работи. Заедно се разликата помеѓу патување што си го организирал и патување што едноставно функционира.\n\nРаботиме со внимателно избрани партнери и локални луѓе на кои им веруваме, за ти да не мора да размислуваш што се случува зад сцената.",
  },
  {
    ...reasons[4],
    title: "И кога ќе тргнеш, ние остануваме тука",
    body: "Нашата работа не завршува кога ќе стигне потврдата за резервација.\n\nПред патувањето ги проверуваме деталите. Додека патуваш, знаеш кому да се јавиш. А ако нешто се промени — лет, трансфер, време или план — не остануваш сам да го решаваш од другиот крај на светот.\n\nНајдобрата поддршка е онаа што ретко ќе ти треба. Но кога ќе ти затреба, прави огромна разлика.",
  },
];

const whyNotDiyMk: typeof whyNotDiy = {
  hero: {
    ...whyNotDiy.hero,
    eyebrow: "Зошто да патуваш со нас",
    title: "Кога да си резервираш сам?",
    // One paragraph, as the client set it in 3.1 — the three-paragraph split
    // was ours. Bold runs are theirs; em-dashes are gone at their request
    // ("да нема цртички во текстот"), including the one before "тогаш".
    intro:
      "**Понекогаш навистина не ти требаме.** Одиш три дена во Рим? Знаеш во кој хотел сакаш да престојуваш? Имаш директен лет и единствен план ти е добра храна и многу шетање? **Резервирај го.** Не секое патување има потреба од travel designer. Но кога има повеќе места, различни летови, приватни трансфери, посебни хотели, искуства, деца, прослава, далечна дестинација или едноставно сакаш некој друг добро да размисли за сè **тогаш Bookit почнува да има смисла.**",
  },
  closing: "Ти треба да го доживееш патувањето. Не да го менаџираш.",
  closingBody:
    "Од првата идеја до моментот кога повторно ќе ја отклучиш вратата дома, ние ги поврзуваме деталите за ти да можеш да се концентрираш на единствениот дел што навистина е твој. **Да бидеш таму.**",
  // 3.1: "и лево и десно истото" — the left rail carried short category words
  // ("Хотели", "Време") against full sentences on the right. Both sides now
  // read the same line, so `nav` is the title.
  topics: [
    {
      ...whyNotDiy.topics[0],
      icon: "hotels",
      nav: "Да резервираш хотел е лесно.",
      title: "Да резервираш хотел е лесно.",
      body: "**Да знаеш кој хотел не секогаш.** Еден има подобра локација. Друг подобри соби. Третиот изгледа прекрасно на фотографија, но едноставно не одговара на начинот на кој сакаш да патуваш. А четвртиот можеби никогаш немаше ни да го најдеш. **Нашата работа не е да ти дадеме повеќе опции. Туку да ги тргнеме погрешните.**",
    },
    {
      ...whyNotDiy.topics[1],
      icon: "time",
      nav: "47 tabs подоцна…",
      title: "47 tabs подоцна…",
      body: "Еден hotel таб станал единаесет. Проверуваш дали има подобар лет. Читаш reviews. Споредуваш соби. Се обидуваш да откриеш дали три ноќи се многу или малку. И повторно не си сосема сигурен. **Ние уживаме во тој дел.** Истражувањето, споредувањето, проверувањето и спојувањето на сите детали е наша работа. Ти треба да ги донесеш добрите одлуки. **Не да ги бараш сите можни опции.**",
    },
    {
      ...whyNotDiy.topics[2],
      icon: "choice",
      nav: "Популарно не секогаш значи вистинско.",
      title: "Популарно не секогаш значи вистинско.",
      body: "Најпознатиот хотел можеби не е твојот хотел. Најпопуларната тура можеби воопшто не е начинот на кој сакаш да го видиш местото. И она што е „must-see“ за еден човек може да биде целосно неважно за друг. Затоа прво сакаме да дознаеме како патуваш. Колку брзаш. Колку планираш. Што те возбудува. Што би го прескокнал без размислување. **Добро патување не се создава од најпопуларните избори. Туку од вистинската комбинација.**",
    },
    {
      ...whyNotDiy.topics[3],
      icon: "details",
      nav: "Најдобрите детали се оние за кои не мораш да размислуваш.",
      title: "Најдобрите детали се оние за кои не мораш да размислуваш.",
      body: "Дали трансферот знае дека летот доцни. Дали имаш доволно време помеѓу две врски. Дали check-out е во 11, а летот во 23:40. Дали собата навистина одговара на твоето семејство. Дали хотелот е на вистинското место за она што сакаш да го правиш. **Тие работи ретко завршуваат на фотографиите. Но често одлучуваат колку добро ќе се чувствува патувањето.** Ние се грижиме за нив. Ти не мораш.",
    },
    {
      ...whyNotDiy.topics[4],
      icon: "support",
      nav: "Добриот план е важен.",
      title: "Добриот план е важен.",
      body: "**Некој зад него уште повеќе.** Летови доцнат. Времето се менува. Понекогаш нешто едноставно не оди според планот. Кога патуваш со **Bookit**, имаш човек кој го знае твоето патување и знае што треба да се случи следно. **Не call centre. Не ticket number. Човек.** Нашата работа не завршува кога ќе ја направиш резервацијата.",
    },
    // Sixth topic, new in 3.0 — the price question the brief asked to answer
    // head-on. No English counterpart to spread from, so it is written out in
    // full; the gradient continues the family above it.
    {
      icon: "price",
      nav: "А што е со цената?",
      title: "А што е со цената?",
      body: "**Ќе биде ли поевтино ако резервираш сам?** Понекогаш да. Ако единственото мерило е најниската цена за лет и хотел, понекогаш ќе најдеш поевтина комбинација. Но најевтиното патување и најдобрата вредност не се иста работа. Наша работа е да го употребиме твојот буџет таму каде што прави разлика. Да знаеме каде вреди да потрошиш повеќе. Каде не вреди. И каде малата промена може да направи голема разлика. **Не повеќе. Подобро.**",
      grad: "linear-gradient(135deg,#15709B,#0E2A33)",
      image: "https://picsum.photos/seed/bookit-why-price/1400/1800",
    },
  ],
};

// The `no` field carries 01–07; titles carry the words only.
const howItWorksMk: ProcessStep[] = [
  {
    ...howItWorks[0],
    title: "Започни од каде било.",
    body: "Можеби веќе знаеш дека сакаш Јапонија. Можеби знаеш само дека сакаш сонце во февруари. А можеби имаш фотографија, хотел или место што го виде некаде и не можеш да го извадиш од глава.\n\nСето тоа е доволно за почеток.\n\nРазгледај ги нашите дестинации и доживувања, користи го Пронаоѓачот на патувања или едноставно дојди со своја идеја. Не мора да имаш готов план. Затоа сме ние тука.",
  },
  {
    ...howItWorks[1],
    title: "Кажи ни малку повеќе од „каде“.",
    body: "Каде сакаш да одиш е важно. Но сакаме да знаеме и како сакаш да патуваш.\n\nБавно или со многу движење? Хотел во центар или некаде далеку од сè? План за секој ден или простор за спонтаност? Семејно патување, меден месец, авантура или едноставно бегство?\n\nКолку подобро те разбереме, толку помалку ќе личи патувањето на нечие друго.",
  },
  {
    ...howItWorks[2],
    title: "Потоа разговараме.",
    body: "Формата е само почеток.\n\nЕден од нашиот тим ќе те контактира за подобро да ја разбереме идејата — што ти е важно, што не ти е, што веќе си видел и што сакаш ова патување да биде поинаку.\n\nНема скрипта. Нема продажна презентација. Само добар разговор за тоа каде би можеле да одиме.",
  },
  {
    ...howItWorks[3],
    title: "Ние ги поврзуваме точките.",
    body: "Дестинацијата е само една од нив.\n\nПотоа доаѓаат маршрутата, вистинскиот ритам, хотелите, летовите, трансферите, луѓето што ќе ги сретнеш и искуствата што вреди да бидат дел од патувањето.\n\nОд сето тоа создаваме прв предлог направен околу тебе. Не каталог од дваесет хотели. Не десет различни маршрути. Една внимателно осмислена идеја од која почнуваме.",
  },
  {
    ...howItWorks[4],
    title: "Првиот предлог не мора да биде последниот.",
    body: "Можеби сакаш уште една ноќ покрај море. Можеби некој хотел едноставно не те убедува. Можеби си видел нешто во меѓувреме и сега мора да биде дел од планот.\n\nОдлично. Го менуваме. Го стегаме. Го прошируваме. Повторно размислуваме.\n\nСè додека не го погледнеш патувањето и не помислиш: „Да. Ова сме ние.“",
  },
  {
    ...howItWorks[5],
    title: "И тогаш — book it.",
    body: "Кога сè изгледа како што треба, од идеја преминуваме во реалност.\n\nНие ги преземаме резервациите и организацијата, ги поврзуваме сите елементи и се грижиме работите зад сцената да се случат кога и како што треба.\n\nТебе ти останува најубавиот дел пред патувањето. Да почнеш да го очекуваш.",
  },
  {
    ...howItWorks[6],
    title: "Сега престани да планираш. И почни да патуваш.",
    body: "Пред да тргнеш, ќе ги имаш информациите што ти требаат. Додека патуваш, зад тебе останува човек што го познава твојот план. А ако нешто се смени или едноставно ти затребаме, знаеш кому се јавуваш.\n\nТвојата работа од тука е многу поедноставна. Биди таму.",
  },
];

const regenerativeMk: typeof regenerative = {
  ...regenerative,
  eyebrow: "Зошто да резервираш со нас",
  title: "Патување што дава повеќе отколку што зема",
  intro: "Веруваме дека едно патување треба да остави едно место подобро отколку што го затекнало. Ја градиме нашата работа околу заедниците и пределите што ги овозможуваат овие патувања — и таа работа ќе ја споделуваме овде.",
};

/** Locale-aware accessor for the About-section content. */
export function getAbout(locale: string) {
  return locale === "mk"
    ? { aboutPage: aboutPageMk, reasons: reasonsMk, reasonsIntro: reasonsIntroMk, whyNotDiy: whyNotDiyMk, howItWorks: howItWorksMk, regenerative: regenerativeMk }
    : { aboutPage, reasons, reasonsIntro, whyNotDiy, howItWorks, regenerative };
}
