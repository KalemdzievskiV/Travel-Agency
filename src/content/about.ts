// About-section content for bookit. Placeholder, feeling-led copy in British
// English, grounded in North Macedonia & the Balkans — the client will supply
// final text and photography later. Imagery uses tonal-gradient placeholders
// (the `grad` pattern shared with destinations/trips); swap `grad` for real
// images when they arrive. Kept here (not the DB) like other static site copy.

export type StoryRow = {
  eyebrow: string;
  title: string;
  body: string;
  grad: string;
  image: string;
  /** Which side the image sits on at desktop. */
  align: "left" | "right";
};

export type ValueColumn = { title: string; body: string };
export type Reason = { no: string; title: string; body: string; grad: string; image: string };
/** Opening title panel of the 5-reasons sequence (the reference's "WHY US?" slide). */
export type ReasonsIntro = { big: string; eyebrow: string; title: string };
export type ProcessStep = { no: string; title: string; body: string; grad: string; image: string };
export type WhyTopic = { nav: string; title: string; body: string; grad: string; image: string };

// ── Flagship: Who we are / Our purpose ──────────────────────────────
export const aboutPage = {
  hero: {
    eyebrow: "Who we are",
    title: "We are a team of people who genuinely know the world of travel",
    intro:
      "Our mission is to create unforgettable experiences that carefully connect our clients with the world, and inspire them to explore it with curiosity, respect and a sense of wonder.",
    grad: "var(--wf-brand-gradient-deep)",
    image: "https://picsum.photos/seed/bookit-about-hero/1400/1700",
  },

  story: [
    {
      eyebrow: "How it began",
      title: "It all started with a feeling",
      body: "bookit was founded in 2026 by two friends who wanted to change the world of standard package deals and journeys that all look alike.\n\nOur aim is to grow into award-winning creators of personalised journeys, conceived with inspiration, creativity and exceptional attention to every detail.\n\nFor us, the most important question has always been: how do you want to feel? Everything else is in the details.",
      grad: "linear-gradient(135deg,#5a6b86,#2a3550)",
      image: "https://picsum.photos/seed/bookit-about-feeling/1400/1700",
      align: "right",
    },
    {
      eyebrow: "How we think",
      title: "Singular, different and bold",
      body: "We create experiences that leave a lasting impression. The journeys we create shape us too — an idea we learned from the legendary travel writer Bruce Chatwin, who spoke of the importance of living with a constant desire to discover.\n\nWhen we plan a journey, we set out to remove every obstacle standing between you and the world. Because you aren't only looking for the familiar, but for the unexpected, the unknown, and everything still waiting to be discovered.\n\nBut real knowledge stands behind every great adventure. Over the years we've built a team of people who live for travel — curious explorers with impeccable organisation and attention to every detail.\n\nThey are the people who will help you find the right path — even when the finest experience begins precisely with getting a little lost.",
      grad: "linear-gradient(135deg,#7a6a52,#2c2418)",
      image: "https://picsum.photos/seed/bookit-about-lake/1400/1700",
      align: "left",
    },
    {
      eyebrow: "What we do",
      title: "We'll show you the world — in a wholly new light",
      body: "We create journeys for those who want to draw genuinely close to the world, far from the tourist traps and the lists of places merely to be ticked off.\n\nInstead, we open space for deeper, more honest and more personal encounters with different cultures, traditions and ways of life.\n\nToday we arrange journeys across all seven continents, and we create each one from the very beginning. Which is exactly why no two journeys are ever the same.\n\nTrekking with the tribes of Borneo, discovering traditional leatherwork in Morocco, or living the thrilling atmosphere of the Palio in Siena. The world is vast, wild and full of surprises. Your journeys should be too.",
      grad: "linear-gradient(135deg,#4f6f57,#1d2c20)",
      image: "https://picsum.photos/seed/bookit-about-curious/1400/1700",
      align: "right",
    },
  ] satisfies StoryRow[],

  purpose: {
    eyebrow: "Our purpose",
    statement: "To move people through journeys they will never forget",
    grad: "var(--wf-brand-gradient-deep)",
    // Supporting facets that cross-fade as you scroll the pinned statement.
    facets: [
      "For our travellers — journeys that change how they see a place, and themselves.",
      "For our partners on the ground — work that is fair, lasting and shared.",
      "For the corners of the world we are lucky to share — left better than we found them.",
    ],
  },

  values: [
    {
      title: "Curious",
      body: "We ask one more question, take the longer road, and follow the detail others walk past. Curiosity is how the remarkable gets found.",
    },
    {
      title: "Thoughtful",
      body: "We sweat the things you will never see, so the things you do feel effortless. Care, not flash, is what makes a trip hold together.",
    },
    {
      title: "Humble",
      body: "We know the ground because we listen to the people who live on it. Every journey is shaped by local hands, and we never forget whose home it is.",
    },
  ] satisfies ValueColumn[],

  // "Why the name?" — the editorial split BT runs near the foot of the page.
  name: {
    eyebrow: "Why the name",
    title: "Why ‘bookit’",
    body: "Booking a trip is the moment everything changes — the instant a daydream gets a date on it. We named ourselves for that moment: the quiet, decisive yes. Everything we do is built to make saying it feel effortless, and to make what follows worth it.",
    grad: "linear-gradient(135deg,#6a4f6a,#241a24)",
    image: "https://picsum.photos/seed/bookit-about-name/1400/1700",
    align: "left",
  } satisfies StoryRow,

  // Full-bleed closing feeling band ("your world. your trips.").
  world: {
    eyebrow: "Your world",
    title: "Your world, your journey",
    body: "No two journeys we plan are ever quite alike. Like a suit cut to fit, each trip is shaped around you — your pace, your people, the feeling you’re chasing — so it could only ever be yours.",
    grad: "linear-gradient(135deg,#3f6f7a,#16130f)",
    image: "https://picsum.photos/seed/bookit-about-world/2000/1200",
  },
};

// ── Why book with us → 5 reasons ────────────────────────────────────
// Placeholder photography via Lorem Picsum (seeded → stable random travel
// images). Swap `image` for the client's real photos when they arrive.
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
    image: "https://picsum.photos/seed/bookit-people/1400/1800",
  },
  {
    no: "02",
    title: "Experiences you won't find elsewhere",
    body: "Years of experience, creativity and a carefully built network of partners let us create journeys that simply don't appear in standard offerings.\n\nOur team opens the door to special places, authentic experiences and thoughtfully considered details that turn every journey into something rich and unforgettable.",
    grad: "linear-gradient(135deg,#5a6b86,#2a3550)",
    image: "https://picsum.photos/seed/bookit-bespoke/1400/1800",
  },
  {
    no: "03",
    title: "Exceptional partners",
    body: "Our long-standing, close partnerships with trusted local experts are what distinguish us from the rest.\n\nBecause of that closeness, services are created specifically for us — carefully adapted to what our clients need and to our own creative ideas for singular journeys.",
    grad: "linear-gradient(135deg,#7a6a52,#2c2418)",
    image: "https://picsum.photos/seed/bookit-partners/1400/1800",
  },
  {
    no: "04",
    title: "Creativity that inspires",
    body: "We stand out through an original approach, striking content and inventive ideas that keep changing the way journeys are experienced.\n\nThrough contemporary marketing, new concepts, a vision for the future of travel and singular partnerships, we inspire our audience to discover the world in a different, more exciting and more considered way.",
    grad: "linear-gradient(135deg,#4f6f57,#1d2c20)",
    image: "https://picsum.photos/seed/bookit-creative/1400/1800",
  },
  {
    no: "05",
    title: "Made to measure",
    body: "We create wholly personalised journeys, carefully shaped around the wishes, needs and expectations of each client.\n\nWith honest recommendations, a personal approach and attention to every detail, we aim for each journey to be better than imagined. What sets us apart is our love of building long-term relationships with our clients, and of improving what comes next on the strength of their feedback.",
    grad: "linear-gradient(135deg,#6a4f6a,#241a24)",
    image: "https://picsum.photos/seed/bookit-care/1400/1800",
  },
];

// ── Why book with us → Why not just do it yourself? ─────────────────
export const whyNotDiy = {
  hero: {
    eyebrow: "Why book with us",
    title: "Why not just do it yourself?",
    intro:
      "If all you need is flights and a place to stay, you can book that online today in a few clicks.\n\nBut if you want your precious free time to genuinely be worth it — the journey to enrich you and leave a lasting impression — you need a trusted partner with real experience, knowledge and a feel for every detail.\n\nThat is where we come in.",
    grad: "linear-gradient(135deg,#5a6b86,#16130f)",
  },
  closing:
    "The trip is still yours. We just carry everything that would otherwise get in the way of enjoying it.",
  // Five reasons not to go it alone — pinned, scroll-driven like the reference.
  topics: [
    {
      nav: "Time management",
      title: "Your time is precious",
      body: "We invest the time you don't have, to create a journey where every detail answers what you actually want.\n\nWhether you want to see a familiar destination from a new angle, escape the everyday, indulge, take on a challenge or learn something new — we design each experience specifically for you.\n\nSo you come home rested, filled with new energy, and certain you made the very most of your precious free time.",
      grad: "linear-gradient(135deg,#15709B,#0E2A33)",
      image: "https://picsum.photos/seed/bookit-why-time/1400/1800",
    },
    {
      nav: "Idea generation",
      title: "Ideas that inspire",
      body: "Creating singular ideas is one of our greatest strengths. We know the world up close, and we have the knowledge, the experience and the real contacts to turn any journey into an experience that leaves a lasting impression.\n\nWe make sure you miss nothing that matters, and that you come home with memories you'll be talking about for months — even years.",
      grad: "linear-gradient(135deg,#1E7FB8,#123A40)",
      image: "https://picsum.photos/seed/bookit-why-ideas/1400/1800",
    },
    {
      nav: "Money saving",
      title: "More value for your budget",
      body: "What is the perfect journey worth? Our carefully considered programmes are full of singular ideas and experiences, shaped entirely around you.\n\nAt first glance the offer may look like a considerable investment, but every detail is chosen so you get the most value for your budget. Booking every service yourself would often cost you more — and there's every chance you'd miss something genuinely special.",
      grad: "linear-gradient(135deg,#0C747E,#0E2A33)",
      image: "https://picsum.photos/seed/bookit-why-value/1400/1800",
    },
    {
      nav: "Peace of mind",
      title: "Nothing to worry about",
      body: "We are always there for you — discreetly in the background, ready to help if you have a question, need advice, or something unforeseen comes up.\n\nOr you can simply send us a postcard from some far-off island, just to tell us you're having a wonderful time.",
      grad: "linear-gradient(135deg,#3F8A2E,#10302A)",
      image: "https://picsum.photos/seed/bookit-why-peace/1400/1800",
    },
    {
      nav: "Watertight",
      title: "Complete security",
      body: "Even in the event that one of our partners cannot deliver a service, we are protected — and so, therefore, are you.",
      grad: "linear-gradient(135deg,#11919B,#0E2A33)",
      image: "https://picsum.photos/seed/bookit-why-watertight/1400/1800",
    },
  ] satisfies WhyTopic[],
};

// ── Why book with us → How it all works ─────────────────────────────
export const howItWorks: ProcessStep[] = [
  {
    no: "01",
    title: "A place for ideas and inspiration",
    body: "This website is a place for ideas and inspiration — the space where every new journey begins. You can browse destinations alphabetically through our A–Z list, or use the Trip Finder if you'd rather discover something new and unexpected.",
    grad: "linear-gradient(135deg,#3f6f7a,#1d3c45)",
    image: "https://picsum.photos/seed/bookit-how-1/1600/2000",
  },
  {
    no: "02",
    title: "Nothing here is fixed",
    body: "Nothing you see here is set in stone. When you get in touch, we treat every suggested programme as a starting point for inspiration, not a rigid plan. Your journey will be carefully and precisely shaped around you, around what you want, and around the people you're travelling with.",
    grad: "linear-gradient(135deg,#5a6b86,#2a3550)",
    image: "https://picsum.photos/seed/bookit-how-2/1600/2000",
  },
  {
    no: "03",
    title: "Tell us your idea",
    body: "If you have an idea you don't see here, do share it with us. Unless it involves robbing the Louvre, we can — and gladly will — try to arrange very nearly anything.",
    grad: "linear-gradient(135deg,#7a6a52,#2c2418)",
    image: "https://picsum.photos/seed/bookit-how-3/1600/2000",
  },
  {
    no: "04",
    title: "We can arrange almost anything",
    body: "When we say we can arrange anything, we mean it — from timeless adventures like a family safari in Botswana, to the wholly unusual, like being left in the middle of the Amazon rainforest with nothing but a GPS phone in your hand.\n\nWhether you're after classic elegance or an adventure beyond every boundary, we'll turn your idea into an unforgettable journey.",
    grad: "linear-gradient(135deg,#4f6f57,#1d2c20)",
    image: "https://picsum.photos/seed/bookit-how-4/1600/2000",
  },
  {
    no: "05",
    title: "Look for the turquoise",
    body: "Wherever you notice bookit's distinctive turquoise, that's your sign you can click and go further. Use the “Start planning” buttons across the site to reach us through our online form.",
    grad: "linear-gradient(135deg,#6a4f6a,#241a24)",
    image: "https://picsum.photos/seed/bookit-how-5/1600/2000",
  },
  {
    no: "06",
    title: "We start planning straight away",
    body: "The moment you send the form, we begin planning your journey. One of our travel experts will be in touch with a first proposal. From there we refine it together until we've created a journey that answers exactly what you wanted.",
    grad: "linear-gradient(135deg,#3f5a4f,#161f18)",
    image: "https://picsum.photos/seed/bookit-how-6/1600/2000",
  },
  {
    no: "07",
    title: "We stay with you throughout",
    body: "We never leave you alone in the process. We're here to perfect your programme together until every detail is exactly as you imagined it.\n\nAnd once the journey begins, we remain available — one call is all it takes, should you need us.",
    grad: "linear-gradient(135deg,#3f6f7a,#16130f)",
    image: "https://picsum.photos/seed/bookit-how-7/1600/2000",
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
const aboutPageMk: typeof aboutPage = {
  hero: {
    ...aboutPage.hero,
    eyebrow: "Кои сме ние",
    title: "Ние сме тим од луѓе кои навистина го познаваат светот на патувањата",
    intro:
      "Нашата мисија е да создаваме незаборавни искуства што внимателно ги поврзуваат нашите клиенти со светот и ги инспирираат да го истражуваат со љубопитност, почит и чувство на восхит.",
  },
  story: [
    {
      ...aboutPage.story[0],
      eyebrow: "Како започна",
      title: "Сè започна со едно чувство",
      body: "Bookit е основан во 2026 година од двајца пријатели со желба да го променат светот на стандардните пакет-аранжмани и патувањата што изгледаат исто.\n\nЦелта ни е да прераснеме во наградувани креатори на персонализирани патувања, осмислени со инспирација, креативност и исклучително внимание кон секој детаљ.\n\nЗа нас, најважното прашање отсекогаш било: како сакате да се чувствувате? Сè останато се крие во деталите.",
    },
    {
      ...aboutPage.story[1],
      eyebrow: "Како размислуваме",
      title: "Уникатни, поинакви и храбри",
      body: "Создаваме искуства што оставаат траен впечаток. Патувањата што ги создаваме, нè обликуваат и нас. Оваа идеја ја научивме од легендарниот патописец Брус Четвин, кој зборуваше за важноста да се живее со постојана желба за откривање.\n\nКога планираме патување, настојуваме да ги отстраниме сите пречки што стојат помеѓу вас и светот. Затоа што вие не го барате само познатото, туку неочекуваното, непознатото и сè што допрва треба да се открие.\n\nНо, зад секоја голема авантура стои вистинско знаење. Низ годините изградивме тим од луѓе кои живеат за патувањата — љубопитни истражувачи со беспрекорно чувство за организација и внимание кон секој детаљ.\n\nТие се луѓето што ќе ви помогнат да го пронајдете вистинскиот пат — дури и кога најубавото искуство започнува токму со тоа малку да се изгубите.",
    },
    {
      ...aboutPage.story[2],
      eyebrow: "Што правиме",
      title: "Ќе ви го покажеме светот — но во сосема ново светло",
      body: "Создаваме патувања за оние што сакаат вистински да му се приближат на светот — подалеку од туристичките замки и листите со места што само треба да се „штиклираат“.\n\nНаместо тоа, отвораме простор за подлабоки, поискрени и полични средби со различни култури, традиции и начини на живот.\n\nДенес организираме патувања на сите седум континенти, а секое од нив го создаваме од самиот почеток. Токму затоа, не постојат две исти патувања.\n\nПешачење со племињата на Борнео, запознавање со традиционалната изработка на кожа во Мароко или доживување на возбудливата атмосфера на Палиото во Сиена. Светот е огромен, див и полн со изненадувања. Такви треба да бидат и вашите патувања.",
    },
  ],
  purpose: {
    ...aboutPage.purpose,
    eyebrow: "Нашата цел",
    statement: "Да ги пренесеме луѓето низ патувања што никогаш нема да ги заборават",
    facets: [
      "За нашите патници — патувања што менуваат како гледаат на едно место, и на себеси.",
      "За нашите партнери на терен — работа што е праведна, трајна и споделена.",
      "За катчињата од светот што имаме среќа да ги споделиме — оставени подобри отколку што ги најдовме.",
    ],
  },
  values: [
    {
      title: "Љубопитни",
      body: "Поставуваме уште едно прашање, го одбираме подолгиот пат и го следиме детаљот што другите го одминуваат. Љубопитноста е начинот на кој се пронаоѓа извонредното.",
    },
    {
      title: "Внимателни",
      body: "Се мачиме околу работите што никогаш нема да ги видите, за оние што ги гледате да делуваат без напор. Грижата, а не блескот, е она што држи едно патување на купче.",
    },
    {
      title: "Скромни",
      body: "Го познаваме теренот бидејќи ги слушаме луѓето што живеат на него. Секое патување е обликувано од локални раце и никогаш не забораваме чиј дом е тоа.",
    },
  ],
  name: {
    ...aboutPage.name,
    eyebrow: "Зошто името",
    title: "Зошто „bookit“",
    body: "Резервирањето патување е мигот кога сѐ се менува — трен кога сонот добива датум. Се именувавме по тој миг: тивкото, решително „да“. Сѐ што правиме е создадено за да го олесни изговарањето на тоа „да“ и да го направи вредно она што следува.",
  },
  world: {
    ...aboutPage.world,
    eyebrow: "Твојот свет",
    title: "Твојот свет, твоето патување",
    body: "Ниту едно патување што го планираме не е сосема исто. Како костум скроен по мерка, секое патување е обликувано околу вас — вашето темпо, вашите луѓе, чувството што го бркате — за да може да биде единствено ваше.",
  },
};

const reasonsIntroMk: ReasonsIntro = {
  big: "ЗОШТО НИЕ?",
  eyebrow: "Што нè издвојува",
  title: "5 причини да се пријавите на патување преку Bookit",
};

const reasonsMk: Reason[] = [
  {
    ...reasons[0],
    title: "Луѓе што прават разлика",
    body: "Веруваме дека зад секое незаборавно патување стои извонреден тим. Нашата искрена љубов кон патувањата и посветеноста на создавање уникатни искуства нè издвојуваат во индустријата.\n\nСо љубопитност, внимание и личен пристап, градиме значајни, долгорочни односи засновани на доверба со секој наш клиент.",
  },
  {
    ...reasons[1],
    title: "Уникатни доживувања",
    body: "Благодарение на нашето долгогодишно искуство, креативност и внимателно изградена мрежа на партнери, создаваме патувања што не можат да се најдат во стандардните понуди.\n\nНашиот тим отвора пристап до посебни места, автентични искуства и внимателно осмислени детали што го претвораат секое патување во богато и незаборавно доживување.",
  },
  {
    ...reasons[2],
    title: "Врвни партнери",
    body: "Нашите долгогодишни и силни партнерства со доверливи локални експерти нè издвојуваат од останатите.\n\nБлагодарение на оваа тесна соработка, услугите се креираат специјално за нас — внимателно приспособени на потребите на нашите клиенти и на нашите креативни идеи за уникатни патувања.",
  },
  {
    ...reasons[3],
    title: "Креативност што инспирира",
    body: "Се издвојуваме со оригинален пристап, впечатливи содржини и иновативни идеи што постојано го менуваат начинот на кој се доживуваат патувањата.\n\nПреку современ маркетинг, нови концепти, визија за иднината на патувањето и уникатни партнерства, ја инспирираме нашата публика да го открие светот на поинаков, повозбудлив и посмислен начин.",
  },
  {
    ...reasons[4],
    title: "Создадено по мерка",
    body: "Креираме целосно персонализирани патувања, внимателно приспособени на желбите, потребите и очекувањата на секој клиент.\n\nСо искрени препораки, личен пристап и внимание кон секој детаљ, се стремиме секое патување да биде подобро од замисленото. Она што нè издвојува е љубовта кон градењето долгорочни односи со нашите клиенти и постојаното унапредување на идните искуства врз основа на нивните повратни мислења.",
  },
];

const whyNotDiyMk: typeof whyNotDiy = {
  hero: {
    ...whyNotDiy.hero,
    eyebrow: "Зошто да патувате со нас",
    title: "Зошто да не организирате сами?",
    intro:
      "Доколку ви се потребни само авионски билети и сместување, денес лесно можете да ги резервирате онлајн — потребни се само неколку клика.\n\nНо, доколку сакате вашето драгоцено слободно време навистина да вреди, а патувањето да ве збогати и да остави траен впечаток, потребен ви е доверлив партнер со вистинско искуство, знаење и чувство за секој детаљ.\n\nЗатоа тука сме ние за вас.",
  },
  closing: "Патувањето сепак е ваше. Ние само го носиме сето она што инаку би ви пречело да уживате во него.",
  topics: [
    {
      ...whyNotDiy.topics[0],
      nav: "Вашето време",
      title: "Вашето време е драгоцено",
      body: "Ние го вложуваме времето што вам ви недостига за да создадеме патување во кое секој детаљ одговара на вашите желби.\n\nБез разлика дали сакате да откриете позната дестинација од нова перспектива, да избегате од секојдневието, да уживате, да се соочите со нов предизвик или да научите нешто ново — го осмислуваме секое искуство специјално за вас.\n\nЗа дома да се вратите одморени, исполнети со нова енергија и сигурни дека максимално сте го искористиле вашето драгоцено слободно време.",
    },
    {
      ...whyNotDiy.topics[1],
      nav: "Идеи",
      title: "Идеи што инспирираат",
      body: "Создавањето уникатни идеи е една од нашите најголеми предности. Го познаваме светот одблизу и имаме знаење, искуство и вистински контакти за да го претвориме секое патување во искуство што остава траен впечаток.\n\nСе грижиме да не пропуштите ништо важно и да создадете спомени за кои ќе зборувате со месеци, па дури и со години.",
    },
    {
      ...whyNotDiy.topics[2],
      nav: "Вредност",
      title: "Повеќе вредност за вашиот буџет",
      body: "Колку вреди совршеното патување? Нашите внимателно осмислени програми се исполнети со уникатни идеи и искуства, целосно приспособени на вас.\n\nНа прв поглед, понудата можеби изгледа како значителна инвестиција, но секој детаљ е внимателно избран за да добиете максимална вредност за вашиот буџет. Самостојното резервирање на сите услуги честопати би ве чинело повеќе — а постои и можност да пропуштите некое навистина посебно искуство.",
    },
    {
      ...whyNotDiy.topics[3],
      nav: "Без грижи",
      title: "Без грижи",
      body: "Секогаш сме тука за вас — дискретно во позадина, подготвени да помогнеме доколку имате прашање, потреба од совет или се појави непредвидена ситуација.\n\nА можете и едноставно да ни испратите разгледница од некој далечен остров, само за да ни кажете дека одлично си поминувате.",
    },
    {
      ...whyNotDiy.topics[4],
      nav: "Сигурност",
      title: "Целосна сигурност",
      body: "Дури и во случај некој од нашите партнери да не може да ја исполни услугата, ние сме заштитени — а со тоа и вие.",
    },
  ],
};

const howItWorksMk: ProcessStep[] = [
  {
    ...howItWorks[0],
    title: "Место за идеи и инспирација",
    body: "Овој веб-сајт е место за идеи и инспирација, простор каде што започнува секое ново патување.\n\nМожете да ги разгледувате дестинациите по азбучен ред, преку нашата листа од А до Ш, или да ја користите алатката Trip Finder доколку сакате да откриете нешто ново и неочекувано.",
  },
  {
    ...howItWorks[1],
    title: "Ништо тука не е фиксно",
    body: "Ништо што ќе видите тука не е фиксно. Кога ќе нè контактирате, секоја предложена програма ја користиме како почетна инспирација, а не како строго зададен план.\n\nВашето патување ќе биде внимателно и прецизно приспособено на вас, на вашите желби и на луѓето со кои патувате.",
  },
  {
    ...howItWorks[2],
    title: "Споделете ја вашата идеја",
    body: "Доколку имате идеја што не ја гледате тука, слободно споделете ја со нас.\n\nОсвен ако не станува збор за ограбување на Лувр, можеме и со задоволство ќе се потрудиме да организираме речиси сè.",
  },
  {
    ...howItWorks[3],
    title: "Организираме речиси сè",
    body: "Кога велиме дека можеме да организираме сè, навистина го мислиме тоа — од безвременски авантури, како семејно сафари во Боцвана, до целосно невообичаени искуства, како да ве оставиме среде Амазонската прашума само со GPS-телефон во рака.\n\nБез разлика дали посакувате класична елеганција или авантура надвор од сите граници, ние ќе ја претвориме вашата идеја во незаборавно патување.",
  },
  {
    ...howItWorks[4],
    title: "Побарајте ја тиркизната боја",
    body: "Секаде каде што ќе ја забележите препознатливата тиркизна боја на Bookit, тоа е знак дека можете да кликнете и да продолжите понатаму.\n\nКористете ги копчињата „Започнете со планирање“ низ веб-сајтот за да нè контактирате преку нашата онлајн форма.",
  },
  {
    ...howItWorks[5],
    title: "Веднаш започнуваме со планирање",
    body: "Веднаш штом ќе ја испратите формата, започнуваме со планирање на вашето патување.\n\nЕден од нашите експерти за патувања ќе ве контактира со првичен предлог. Потоа, заедно ќе го доработуваме сè додека не создадеме патување што целосно одговара на вашите желби.",
  },
  {
    ...howItWorks[6],
    title: "Со вас сме до крај",
    body: "Никогаш не ве оставаме сами во процесот. Тука сме заедно да ја усовршуваме вашата програма сè додека секој детаљ не биде токму онаков каков што сте го замислиле.\n\nА кога ќе започне патувањето, остануваме достапни — доволен е само еден повик доколку ви затреба нашата помош.",
  },
];

const regenerativeMk: typeof regenerative = {
  ...regenerative,
  eyebrow: "Зошто да резервирате со нас",
  title: "Патување што дава повеќе отколку што зема",
  intro: "Веруваме дека едно патување треба да остави едно место подобро отколку што го затекнало. Ја градиме нашата работа околу заедниците и пределите што ги овозможуваат овие патувања — и таа работа ќе ја споделуваме овде.",
};

/** Locale-aware accessor for the About-section content. */
export function getAbout(locale: string) {
  return locale === "mk"
    ? { aboutPage: aboutPageMk, reasons: reasonsMk, reasonsIntro: reasonsIntroMk, whyNotDiy: whyNotDiyMk, howItWorks: howItWorksMk, regenerative: regenerativeMk }
    : { aboutPage, reasons, reasonsIntro, whyNotDiy, howItWorks, regenerative };
}
