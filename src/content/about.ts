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
 * One card in the About page's "values" band. `kicker` and `title` are two
 * halves of one line — "ПОМАЛКУ" / "НО ПОДОБРО" reads as "Помалку, но
 * подобро" — rather than a label over a word, which is why there's no
 * separate bold "lead" line any more (КОРЕКЦИИ 3.1.1 dropped it when the
 * band grew from 3 cards to 5). `tone` picks one of the --wf-value-* hues —
 * this band is the one place on the site carrying five accents rather than
 * one, at the client's request.
 */
export type ValueColumn = {
  kicker: string;
  title: string;
  body: string;
  tone: "var(--wf-value-1)" | "var(--wf-value-2)" | "var(--wf-value-3)" | "var(--wf-value-4)" | "var(--wf-value-5)";
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
    eyebrow: "About us",
    title: "We didn't start Bookit to sell more trips.",
    intro:
      "We started it to create better ones. We believe the best journeys don't begin with an offer, a package, or a list of hotels. They begin with the person who's travelling — with what they want, what they're drawn to, and how they want to feel when they return home. **That's Bookit. Journeys that begin with you.**",
    grad: "var(--wf-brand-gradient-deep)",
    band: aboutMastheadBand,
    image: aboutPhoto[0],
  },

  story: [
    {
      eyebrow: "How it started",
      title: "Bookit is new. The people behind it aren't.",
      body: "Bookit started in 2026 with one simple idea: travel deserves more than ready-made packages and endless catalogue options.\n\nBehind Bookit is a team with more than 15 years of experience in the world of travel — years spent planning, solving problems, discovering, and learning what truly makes a journey a good one.\n\nWe created Bookit to use all that knowledge differently. Fewer templates. More listening. Less “this is the offer.” More “what do you have in mind?”\n\n**Because we don't just want to send you somewhere. We want to find the right somewhere for you.**",
      grad: "linear-gradient(135deg,#5a6b86,#2a3550)",
      image: aboutPhoto[1],
      align: "right",
    },
    {
      eyebrow: "How we think",
      title: "A good journey doesn't need more. It needs better.",
      body: "Not more cities. Not more hotels. Not more things you “have to” see. Just a better rhythm. A better choice. A better moment.\n\nSometimes we'll tell you to stay one more night. Sometimes to skip what everyone else visits. And sometimes to leave an afternoon completely unplanned.\n\n**Because our job is to shape the journey. Not to fill it.**",
      grad: "linear-gradient(135deg,#7a6a52,#2c2418)",
      image: aboutPhoto[2],
      align: "left",
    },
    {
      eyebrow: "What we do",
      title: "You bring the idea. We connect the dots.",
      body: "Flights. Hotels. That little hotel you didn't know existed. A guide who knows which street to take before everyone else arrives. A great restaurant for the third night, not the first. A transfer that's there exactly when it needs to be.\n\nAnd enough space between it all so the journey never feels like a schedule.\n\n**Every Bookit journey is built from the ground up, around the person who'll experience it.**",
      grad: "linear-gradient(135deg,#4f6f57,#1d2c20)",
      image: aboutPhoto[3],
      align: "right",
    },
  ] satisfies StoryRow[],

  purpose: {
    eyebrow: "Our standard",
    statement: "Would we recommend the same journey to someone we love?",
    grad: "var(--wf-brand-gradient-deep)",
    // Supporting facets that cross-fade as you scroll the pinned statement.
    facets: [
      "If the answer isn't yes, it isn't good enough.",
      "We want to work with people we value, partners we trust, and places that treat us with respect.",
      "We don't just want you to come home happy. We want you to start thinking about where to go next.",
    ],
  },

  values: [
    {
      kicker: "Personal",
      title: "Means personal",
      body: "If every traveller is different, there's no reason two journeys should look the same.",
      tone: "var(--wf-value-1)",
    },
    {
      kicker: "Less",
      title: "But better",
      body: "We don't measure a journey by how many places you'll visit.",
      tone: "var(--wf-value-2)",
    },
    {
      kicker: "The details",
      title: "Aren't details",
      body: "A good transfer. The right room. A better flight time. Those are exactly the things that make everything feel effortless.",
      tone: "var(--wf-value-3)",
    },
    {
      kicker: "We'll tell you",
      title: "What we think",
      body: "If something isn't worth it, we'll tell you. If there's a better way, we'll suggest it.",
      tone: "var(--wf-value-4)",
    },
    {
      kicker: "The world",
      title: "Deserves respect",
      body: "Towards the places we visit, the people who welcome us, and the way we travel through their home.",
      tone: "var(--wf-value-5)",
    },
  ] satisfies ValueColumn[],

  // "Why the name?" — the editorial split BT runs near the foot of the page.
  name: {
    eyebrow: "The idea behind the name",
    title: "Why Bookit?",
    body: "Every journey has a moment when it stops being just an idea. When “one day I'd love to…” becomes “let's book it.” That moment is Bookit.\n\nWhen the dream gets a date. When the place becomes a plan. When the excitement begins. **Our job is to make sure everything that comes after feels worth that decision.**",
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
  big: "5 REASONS WHY BOOKIT?",
  eyebrow: "What sets us apart",
  title: "You don't need more options. You need the right ones.",
};

export const reasons: Reason[] = [
  {
    no: "01",
    title: "First, we listen.",
    body: "We don't start with a hotel. Or a flight. Or a ready-made package. We start with you.\n\nHow you want to travel. What you want to see. How much time you want to slow down. What you'd never choose. And what would make this journey feel truly yours. Then we build everything around that.\n\n**Because to us, tailor-made doesn't mean changing a hotel in a fixed itinerary. It means starting with a blank page.**",
    grad: "linear-gradient(135deg,#3f6f7a,#1d3c45)",
    image: reasonPhoto[0],
  },
  {
    no: "02",
    title: "We'll tell you what we really think.",
    body: "Sometimes the best service is not simply saying “yes.”\n\nIf it's worth staying one more night, we'll tell you. If a hotel looks better on Instagram than it does in real life, we'll tell you. If there's a better route, a better time to go, or simply a better way to do it, we'll suggest it.\n\n**We're not here just to book what you ask for. We're here to help you choose better.**",
    grad: "linear-gradient(135deg,#5a6b86,#2a3550)",
    image: reasonPhoto[1],
  },
  {
    no: "03",
    title: "Your time is for travel.",
    body: "**Not for 47 open tabs.** You can compare hotels yourself. Read hundreds of reviews. Check whether the transfer will get you to the airport in time. Search for a restaurant that's actually worth it, or find out whether that TikTok “hidden gem” is still hidden. Or you can simply tell us what you're looking for.\n\n**We'll do the research, the checking, and connect all the details. You'll get the options that actually make sense.**",
    grad: "linear-gradient(135deg,#7a6a52,#2c2418)",
    image: reasonPhoto[2],
  },
  {
    no: "04",
    title: "You can do it yourself. You just don't have to.",
    body: "Bookit exists for the time you don't want to spend on planning, the details you don't want to double-check, and the places you might not find on your own.",
    grad: "linear-gradient(135deg,#15709B,#0E2A33)",
    // Client-supplied photo (КОРЕКЦИИ 3.1.1, "слика бр. 2") — a lone hiker's
    // footprints up a dune, replacing the picsum placeholder.
    image: "/images/about/reason-alone.png",
  },
  {
    no: "05",
    title: "The details are never just details.",
    body: "The right flight. The right room. A transfer waiting when it should be. A guide who knows the place, not just the itinerary. A restaurant reservation on the night it actually makes sense to be there.\n\nOn their own, they're small things. **Together, they're the difference between a trip you've organised and a journey that simply works.**\n\nWe work with carefully selected partners and places we trust, so you never have to think about what's happening behind the scenes.",
    grad: "linear-gradient(135deg,#4f6f57,#1d2c20)",
    image: reasonPhoto[3],
  },
  {
    no: "06",
    title: "And when you set off, we're still here.",
    body: "Our job doesn't end when your booking confirmation arrives.\n\nBefore you travel, we check the details. While you're away, you know who to call. And if something changes — a flight, a transfer, the weather, or the plan — you're not left to sort it out on your own from the other side of the world.\n\n**The best support is the kind you rarely need. But when you do, it makes all the difference.**",
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
    eyebrow: "Why travel with us",
    title: "When should you book it yourself?",
    intro:
      "**Sometimes, you really don't need us.** Going to Rome for three days? Know exactly which hotel you want? Found a direct flight and have a simple plan for a few good restaurants? **Book it.** Not every journey needs a travel designer. But when there are more places, different flights, private transfers, special hotels, experiences, kids, celebrations, long-haul destinations, or simply when someone else needs to think everything through — **that's when Bookit starts to make sense.**",
    grad: "linear-gradient(135deg,#5a6b86,#16130f)",
  },
  closing: "You should experience the journey. Not manage it.",
  closingBody:
    "From the first idea to the moment you unlock your front door again, we connect all the details so you can focus on the one part that truly belongs to you: **being there.**",
  // Six reasons not to go it alone — pinned, scroll-driven like the reference.
  // Slide backgrounds follow the client's numbered palette (КОРЕКЦИИ, p.5):
  // 1 #C06B4E, 2 #397F78, 3 #82964C, 4 #567FA4, 5 #7C526C, 6 #C8893F — one
  // per topic, in order, each paired with a matching deep shade for depth.
  topics: [
    {
      nav: "Booking a hotel is easy.",
      icon: "hotels",
      title: "Booking a hotel is easy.",
      body: "**Choosing the right hotel isn't always.** One has a better location. Another has better rooms. A third looks amazing in photos but simply doesn't suit the way you want to travel. And the fourth might be the one you would never find on your own.\n\n**Our job isn't to give you more options. It's to remove the wrong ones.**",
      grad: "linear-gradient(135deg,#C06B4E,#2A1811)",
      image: "https://picsum.photos/seed/bookit-why-time/1400/1800",
    },
    {
      nav: "47 tabs later…",
      icon: "time",
      title: "47 tabs later…",
      body: "One hotel tab turns into eleven. You check if there's a better flight. Read reviews. Compare rooms. Try to work out whether three nights are too many or too few. And somehow, you still don't feel sure.\n\n**We enjoy this part.** The research, the comparing, the checking, and connecting all the details — that's our job. We bring you the options that make sense.\n\n**Not every possible option.**",
      grad: "linear-gradient(135deg,#397F78,#0E201E)",
      image: "https://picsum.photos/seed/bookit-why-ideas/1400/1800",
    },
    {
      nav: "Popular doesn't always mean right.",
      icon: "choice",
      title: "Popular doesn't always mean right.",
      body: "The best-known hotel may not be the right hotel for you. The most popular tour may not be the way you want to experience a place. And what's a “must-see” for one person can be completely irrelevant to another.\n\nThat's why we first get to know how you travel. How much you want to see. How much you want to slow down. What excites you. What you'd skip without a second thought.\n\n**A great journey isn't built from the most popular choices. It's built from the right combination.**",
      grad: "linear-gradient(135deg,#82964C,#1A1E0F)",
      image: "https://picsum.photos/seed/bookit-why-value/1400/1800",
    },
    {
      nav: "The best details are the ones you don't have to think about.",
      icon: "details",
      title: "The best details are the ones you don't have to think about.",
      body: "Will the transfer know if your flight is delayed? Is there enough time between two connections? Is check-out at 11 when your flight is at 23:40? Does the room actually work for your family? Is the hotel in the right location for what you want to do?\n\n**These things rarely end up in the photos. But they often decide how good a journey feels.**\n\nWe take care of them. So you don't have to.",
      grad: "linear-gradient(135deg,#567FA4,#162029)",
      image: "https://picsum.photos/seed/bookit-why-peace/1400/1800",
    },
    {
      nav: "A good plan matters.",
      icon: "support",
      title: "A good plan matters.",
      body: "**The person behind it matters even more.** Flights get delayed. Weather changes. Sometimes things simply don't go according to plan.\n\nWhen you travel with Bookit, you have someone who knows who you are, knows your journey, and knows what needs to happen next.\n\n**Not a call centre. Not a ticket number. A person.** Our job doesn't end when you make the booking.",
      grad: "linear-gradient(135deg,#7C526C,#1B1218)",
      image: "https://picsum.photos/seed/bookit-why-watertight/1400/1800",
    },
    {
      nav: "And what about the price?",
      icon: "price",
      title: "And what about the price?",
      body: "**Will it be cheaper if you book it yourself?** Sometimes, yes. If the only measure is the lowest price for a flight and hotel, you may occasionally find a cheaper combination.\n\nBut the cheapest journey and the best value are not the same thing. Our job is to use your budget where it makes a difference — to know where it's worth spending more, where it isn't, and where a small change can make a big difference.\n\n**Not more. Better.**",
      grad: "linear-gradient(135deg,#C8893F,#281B0D)",
      image: "https://picsum.photos/seed/bookit-why-price/1400/1800",
    },
  ],
};

// ── Why book with us → How it all works ─────────────────────────────
export const howItWorks: ProcessStep[] = [
  {
    no: "01",
    title: "Start anywhere.",
    body: "Maybe you already know you want to go to Japan. Maybe you only know you want sunshine in February. Or maybe you have a photo, a hotel, or a place you saw somewhere and just can't get out of your head.\n\n**That's more than enough to begin.**\n\nExplore our destinations and experiences, use the Trip Finder, or simply come to us with your idea. You don't need to have a finished plan. **That's what we're here for.**",
    grad: "linear-gradient(135deg,#3f6f7a,#1d3c45)",
    image: processPhoto[0],
  },
  {
    no: "02",
    title: "Tell us a little more than just “where.”",
    body: "Where you want to go matters. But we also want to know **how** you want to travel.\n\nSlow or full of movement? A hotel in the centre or somewhere away from it all? A plan for every day or room for spontaneity? A family trip, honeymoon, adventure, or simply an escape?\n\n**The better we understand you, the less your journey will feel like someone else's.**",
    grad: "linear-gradient(135deg,#5a6b86,#2a3550)",
    image: processPhoto[1],
  },
  {
    no: "03",
    title: "Then we talk.",
    body: "The form is just the beginning.\n\nSomeone from our team will get in touch to better understand the journey — what matters to you, what doesn't, what you've already seen, and what you want this trip to feel like.\n\nThere's no script. No sales pitch. **Just a good conversation about where we could go from here.**",
    grad: "linear-gradient(135deg,#7a6a52,#2c2418)",
    image: processPhoto[2],
  },
  {
    no: "04",
    title: "We connect the dots.",
    body: "The destination is only one part of it.\n\nThen come the itinerary, the right pace, the hotels, flights, transfers, the people you'll meet, and the experiences worth making part of the journey.\n\nFrom all of that, we create a first proposal built around you. Not a catalogue of twenty hotels. Not ten different itineraries. **One carefully considered idea to start with.**",
    grad: "linear-gradient(135deg,#4f6f57,#1d2c20)",
    image: processPhoto[3],
  },
  {
    no: "05",
    title: "The first proposal doesn't have to be the final one.",
    body: "Maybe you want one more night by the sea. Maybe a hotel just doesn't feel right. Maybe you spotted something in the meantime and now want it to be part of the plan.\n\nGreat. We change it. Refine it. Add to it. Rethink it.\n\n**Until you look at the journey and think: “Yes. This feels like us.”**",
    grad: "linear-gradient(135deg,#6a4f6a,#241a24)",
    image: processPhoto[4],
  },
  {
    no: "06",
    title: "And then, book it.",
    body: "Once everything feels right, we turn the idea into reality.\n\nWe take care of the bookings and organisation, connect all the pieces, and make sure everything behind the scenes works exactly as it should.\n\n**All that's left for you is the best part before the journey begins — looking forward to it.**",
    grad: "linear-gradient(135deg,#3f5a4f,#161f18)",
    image: processPhoto[5],
  },
  {
    no: "07",
    title: "Now stop planning.",
    body: "**And start travelling.**\n\nBefore you leave, you'll have all the information you need. While you're away, there's still someone behind the journey who knows your plan. And if something changes or you simply need something, you'll know exactly who to call.\n\n**From here, your job is very simple.** Be there.",
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
    title: "Не го започнавме Bookit за да продаваме повеќе патувања.",
    intro:
      "Го започнавме за да создаваме подобри. Веруваме дека најдоброто патување не започнува со понуда, пакет или листа на хотели. Започнува со човекот што ќе патува. Со тоа што го сака. Со тоа што не го сака. И со чувството со кое сака да се врати дома. **Тоа е Bookit. Патувања што почнуваат од тебе.**",
  },
  story: [
    {
      ...aboutPage.story[0],
      eyebrow: "Како започна",
      title: "Bookit е нов. Луѓето зад него не се.",
      body: "Bookit започна во 2026 година од едноставна идеја: патувањето заслужува повеќе од готов пакет и неколку опции од каталог.\n\nЗад Bookit стојат луѓе со повеќе од 15 години искуство во светот на патувањата години поминати во организирање, решавање, откривање и учење што навистина прави едно патување добро.\n\nГо создадовме Bookit за сето тоа знаење да го употребиме на поинаков начин. Помалку шаблони. Повеќе слушање. Помалку „ова е понудата“. Повеќе „што замислуваш?“\n\n**Затоа што не сакаме само да те испратиме некаде. Сакаме да го погодиме вистинското некаде за тебе.**",
    },
    {
      ...aboutPage.story[1],
      eyebrow: "Како размислуваме",
      title: "Добро патување не мора да има повеќе. Треба да има подобро.",
      body: "Не повеќе градови. Не повеќе хотели. Не повеќе работи што „мора“ да се видат. Туку подобар ритам. Подобар избор. Подобар момент.\n\nПонекогаш ќе ти кажеме да останеш уште една ноќ. Понекогаш да прескокнеш нешто што сите го посетуваат. А понекогаш да оставиш едно попладне без никаков план.\n\n**Затоа што наше е да го организираме патувањето. Не да го преполниме.**",
    },
    {
      ...aboutPage.story[2],
      eyebrow: "Што правиме",
      title: "Ти носиш идеја. Ние ги поврзуваме точките.",
      body: "Летови. Хотели. Мал хотел што не си знаел дека постои. Водич што знае која улица да ја фати пред да пристигнат сите други. Добар ресторан за третата вечер, не за првата. Трансфер што е таму кога треба да биде.\n\nИ доволно простор помеѓу сето тоа за патувањето да не изгледа како распоред.\n\n**Секое Bookit патување го градиме од почеток, околу човекот што ќе го живее.**",
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
  // Superseded by КОРЕКЦИИ 3.1.1: the client settled the open 3-vs-5-values
  // decision noted above in favour of five, each card now one line split
  // across kicker + title ("Помалку" / "Но подобро" reads as one sentence),
  // with no separate "lead" line under it.
  values: [
    {
      kicker: "Лично",
      title: "Значи лично",
      body: "Ако секој патник е различен, нема причина две патувања да изгледаат исто.",
      tone: "var(--wf-value-1)",
    },
    {
      kicker: "Помалку",
      title: "Но подобро",
      body: "Не го мериме патувањето според бројот на места што ќе ги посетиш.",
      tone: "var(--wf-value-2)",
    },
    {
      kicker: "Деталите",
      title: "Не се детали",
      body: "Добар трансфер, вистинската соба, подобар час на лет, токму тие работи прават сè да изгледа лесно.",
      tone: "var(--wf-value-3)",
    },
    {
      kicker: "Ќе ти кажеме",
      title: "Што мислиме",
      body: "Ако нешто не вреди, ќе ти кажеме. Ако постои подобар начин, ќе го предложиме.",
      tone: "var(--wf-value-4)",
    },
    {
      kicker: "Светот",
      title: "Заслужува почит",
      body: "Кон местата што ги посетуваме, луѓето што нè пречекуваат и начинот на кој патуваме низ нивниот дом.",
      tone: "var(--wf-value-5)",
    },
  ],
  name: {
    ...aboutPage.name,
    eyebrow: "Идејата зад името",
    title: "Зошто Bookit?",
    body: "Секое патување има еден момент кога престанува да биде идеја. Кога „еден ден би сакал…“ станува **„ајде, резервирај го.“** Токму тој момент е Bookit.\n\nКога сонот добива датум. Кога местото станува план. Кога почнува исчекувањето. **Наша работа е сè што доаѓа после тоа да биде вредно за таа одлука.**",
  },
  world: {
    ...aboutPage.world,
    eyebrow: "Твојот свет",
    title: "Твоето патување, создадено по твоја мерка",
    body: "Не постојат две исти патувања, затоа што не постојат двајца исти патници. Секое искуство го создаваме според тебе — твоето темпо, луѓето со кои патуваш и чувството што сакаш да го доживееш. Од првата идеја до последниот детал, сè е внимателно обликувано за патувањето да биде единствено и целосно твое.",
  },
};

const reasonsIntroMk: ReasonsIntro = {
  big: "5 причини зошто Bookit?",
  eyebrow: "Што нè издвојува",
  title: "Не ти требаат повеќе опции. Ти требаат вистинските.",
};

// The `no` field carries 01–06, so these titles must not repeat the number.
const reasonsMk: Reason[] = [
  {
    ...reasons[0],
    no: "01",
    title: "Прво те слушаме",
    body: "Не започнуваме со хотел. Не со лет. И не со готов пакет. Започнуваме со тебе.\n\nКако сакаш да патуваш. Што сакаш да видиш. Колку сакаш да одмориш. Што никогаш не би го избрал. И што би го направило ова патување навистина твое. Потоа го градиме сето останато околу тоа.\n\n**Затоа што tailor-made за нас не значи да смениме хотел во готова програма. Значи да започнеме од празна страница.**",
  },
  {
    ...reasons[1],
    no: "02",
    title: "Ќе ти кажеме што мислиме",
    body: "Понекогаш најдобрата услуга не е да кажеме „да“.\n\nАко вреди да останеш уште една вечер, ќе ти кажеме. Ако хотелот изгледа подобро на Instagram отколку во живо, ќе ти кажеме. Ако постои подобра рута, подобар период или подобар начин, ќе го предложиме.\n\n**Не сме тука само да резервираме што ќе побараш. Тука сме да ти помогнеме да избереш подобро.**",
  },
  {
    ...reasons[2],
    no: "03",
    title: "Твоето време е за патување",
    body: "**Не за 47 отворени табови.** Можеш сам да споредуваш хотели. Да читаш стотици reviews. Да проверуваш дали трансферот стигнува навреме за летот. Да бараш кој ресторан навистина вреди и дали она „hidden gem“ од TikTok сè уште е hidden. Или можеш да ни кажеш што бараш.\n\n**Ние ќе го направиме истражувањето, проверките и поврзувањето на сите детали. Тебе ќе ти ги донесеме изборите што имаат смисла.**",
  },
  // New in 3.1, inserted "меѓу 03 и 04" — which makes six statements on a page
  // still titled "5 причини". The client wrote the headings that way twice and
  // confirmed it; the count is theirs to change.
  //
  // TODO(3.1): they sent a photograph for this one by email. It has not
  // arrived, so this carries a placeholder in the same shape as the others and
  // the gradient continues the family.
  {
    no: "04",
    title: "Можеш и сам. Само не мораш",
    body: "Bookit постои за времето што не сакаш да го потрошиш на организација, деталите што не сакаш да ги проверуваш двапати и местата што можеби немаше сам да ги најдеш.",
    grad: "linear-gradient(135deg,#15709B,#0E2A33)",
    // Client-supplied photo (КОРЕКЦИИ 3.1.1, "слика бр. 2") — a lone hiker's
    // footprints up a dune, replacing the picsum placeholder.
    image: "/images/about/reason-alone.png",
  },
  {
    // Indices shifted +1 from the original "01–05" spread when reason "04"
    // above was inserted as a new sixth object rather than reusing a slot —
    // reasons[3] is now that "04" entry (was reasons[3] = old EN "04" before
    // the insert), so this must reach one further to keep landing on the
    // English "05" ("The details are never just details").
    ...reasons[4],
    no: "05",
    title: "Деталите не се детали",
    body: "Вистинскиот лет. Вистинската соба. Трансфер што те чека кога треба. Водич што го познава местото, не само програмата. Резервација во ресторан во вечерта кога навистина има смисла да бидеш таму.\n\nПоединечно се мали работи. **Заедно се разликата помеѓу патување што си го организирал и патување што едноставно функционира.**\n\nРаботиме со внимателно избрани партнери и локалци на кои им веруваме, за ти да не мора да размислуваш што се случува зад сцената.",
  },
  {
    ...reasons[5],
    no: "06",
    title: "И кога ќе тргнеш, ние остануваме тука",
    body: "Нашата работа не завршува кога ќе стигне потврдата за резервација.\n\nПред патувањето ги проверуваме деталите. Додека патуваш, знаеш кому да се јавиш. А ако нешто се промени лет, трансфер, време или план не остануваш сам да го решаваш од другиот крај на светот.\n\n**Најдобрата поддршка е онаа што ретко ќе ти треба. Но кога ќе ти затреба, прави огромна разлика.**",
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
      grad: "linear-gradient(135deg,#C8893F,#281B0D)",
      image: "https://picsum.photos/seed/bookit-why-price/1400/1800",
    },
  ],
};

// The `no` field carries 01–07; titles carry the words only.
const howItWorksMk: ProcessStep[] = [
  {
    ...howItWorks[0],
    title: "Започни од каде било.",
    body: "Можеби веќе знаеш дека сакаш да одиш во Јапонија. Можеби знаеш само дека сакаш сонце во февруари. А можеби имаш фотографија, хотел или место што го виде некаде и не можеш да го извадиш од глава.\n\n**Сето тоа е доволно за почеток.**\n\nРазгледај ги нашите дестинации и доживувања, користи го Trip Finder или едноставно дојди со своја идеја. Не мора да имаш готов план. **Затоа сме ние тука.**",
  },
  {
    ...howItWorks[1],
    title: "Кажи ни малку повеќе од „каде“.",
    body: "Каде сакаш да одиш е важно. Но сакаме да знаеме и како сакаш да патуваш.\n\nБавно или со многу движење? Хотел во центар или некаде далеку од сè? План за секој ден или простор за спонтаност? Семејно патување, меден месец, авантура или едноставно бегство?\n\n**Колку подобро те разбереме, толку помалку ќе личи патувањето на нечие друго.**",
  },
  {
    ...howItWorks[2],
    title: "Потоа разговараме.",
    body: "Формата е само почеток.\n\nНекој од нашиот тим ќе те контактира за подобро да ја разбереме идејата што ти е важно, што не ти е, што веќе си видел и што сакаш ова патување да биде поинаку.\n\nНема скрипта. Нема продажна презентација. **Само добар разговор за тоа каде би можеле да одиме.**",
  },
  {
    ...howItWorks[3],
    title: "Ние ги поврзуваме точките.",
    body: "Дестинацијата е само една од нив.\n\nПотоа доаѓаат програмата, вистинскиот ритам, хотелите, летовите, трансферите, луѓето што ќе ги сретнеш и искуствата што вреди да бидат дел од патувањето.\n\nОд сето тоа создаваме прв предлог направен околу тебе. Не каталог од дваесет хотели. Не десет различни програми. **Една внимателно осмислена идеја од која почнуваме.**",
  },
  {
    ...howItWorks[4],
    title: "Првиот предлог не мора да биде последниот.",
    body: "Можеби сакаш уште една ноќ покрај море. Можеби некој хотел едноставно не те убедува. Можеби си видел нешто во меѓувреме и сега мора да биде дел од планот.\n\nОдлично. Го менуваме. Го стегаме. Го прошируваме. Повторно размислуваме.\n\n**Сè додека не го погледнеш патувањето и не помислиш: „Да. Ова сме ние.“**",
  },
  {
    ...howItWorks[5],
    title: "И тогаш book it.",
    body: "Кога сè изгледа како што треба, од идеја преминуваме во реалност.\n\nНие ги преземаме резервациите и организацијата, ги поврзуваме сите елементи и се грижиме работите зад сцената да се случат кога и како што треба.\n\n**Тебе ти останува најубавиот дел пред патувањето.** Да почнеш да го очекуваш.",
  },
  {
    ...howItWorks[6],
    title: "Сега престани да планираш.",
    body: "**И почни да патуваш.**\n\nПред да тргнеш, ќе ги имаш информациите што ти требаат. Додека патуваш, зад тебе останува човек што го познава твојот план. А ако нешто се смени или едноставно ти затребаме, знаеш кому се јавуваш.\n\n**Твојата работа од тука е многу поедноставна.** Биди таму.",
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
