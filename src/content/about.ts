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
export type ProcessStep = { no: string; title: string; body: string; grad: string; image: string };
export type WhyTopic = { nav: string; title: string; body: string; grad: string; image: string };

// ── Flagship: Who we are / Our purpose ──────────────────────────────
export const aboutPage = {
  hero: {
    eyebrow: "Who we are",
    title: "Tailor-made creators of remarkable journeys",
    intro:
      "We are a small studio of travel designers in North Macedonia, planning journeys for people who care less about where they go and more about how they want to feel.",
    grad: "var(--wf-brand-gradient-deep)",
    image: "https://picsum.photos/seed/bookit-about-hero/1400/1700",
  },

  story: [
    {
      eyebrow: "What we're about",
      title: "It begins with a feeling",
      body: "Every trip we plan starts with a single question — how do you want to feel when you come home? Restored, challenged, closer to the people beside you. We design backwards from the answer, so the logistics serve the feeling rather than the other way round.",
      grad: "linear-gradient(135deg,#5a6b86,#2a3550)",
      image: "https://picsum.photos/seed/bookit-about-feeling/1400/1700",
      align: "right",
    },
    {
      eyebrow: "Where we started",
      title: "Born by the lake, made for the world",
      body: "bookit grew out of a simple frustration with package travel — itineraries that moved people through places without ever letting them in. We started close to home, on the shores of Lake Ohrid, and now plan journeys across the Balkans, the Mediterranean and beyond.",
      grad: "linear-gradient(135deg,#7a6a52,#2c2418)",
      image: "https://picsum.photos/seed/bookit-about-lake/1400/1700",
      align: "left",
    },
    {
      eyebrow: "How we think",
      title: "Curious by nature, precise by habit",
      body: "Our planners are equal parts wanderer and engineer. We chase the unexpected — the family who still smoke their own trout, the monastery that opens only at dawn — then build the kind of seamless plan that lets you forget the plan entirely.",
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
export const reasons: Reason[] = [
  {
    no: "01",
    title: "Remarkable people",
    body: "You plan with a real person who knows the ground — not a call centre. The same planner stays with you from first idea to the moment you land back home.",
    grad: "linear-gradient(135deg,#3f6f7a,#1d3c45)",
    image: "https://picsum.photos/seed/bookit-people/1400/1800",
  },
  {
    no: "02",
    title: "Journeys you can't buy off a shelf",
    body: "Nothing we design is a template. Every itinerary is built from scratch around your pace, your people and the feeling you're chasing.",
    grad: "linear-gradient(135deg,#5a6b86,#2a3550)",
    image: "https://picsum.photos/seed/bookit-bespoke/1400/1800",
  },
  {
    no: "03",
    title: "Brilliant partners on the ground",
    body: "Years of trust with guides, hosts and fixers across the Balkans mean doors open for you that a guidebook never lists.",
    grad: "linear-gradient(135deg,#7a6a52,#2c2418)",
    image: "https://picsum.photos/seed/bookit-partners/1400/1800",
  },
  {
    no: "04",
    title: "Creativity that earns its place",
    body: "We don't add the unusual for its own sake. Every idea has to make the journey feel more like yours — otherwise it doesn't make the plan.",
    grad: "linear-gradient(135deg,#4f6f57,#1d2c20)",
    image: "https://picsum.photos/seed/bookit-creative/1400/1800",
  },
  {
    no: "05",
    title: "Looked after, start to finish",
    body: "No planning fees, clear pricing, and on-the-ground support whenever you need it. We're a message away for the whole journey.",
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
      "You absolutely could. But here is what changes when you don't have to.",
    grad: "linear-gradient(135deg,#5a6b86,#16130f)",
  },
  closing:
    "The trip is still yours. We just carry everything that would otherwise get in the way of enjoying it.",
  // Five reasons not to go it alone — pinned, scroll-driven like the reference.
  topics: [
    {
      nav: "Time",
      title: "Your time, given back",
      body: "Planning a trip properly swallows weeks — tabs, reviews, second-guessing. We do the searching and only ever bring you the best of it, so the time you'd have lost stays yours.",
      grad: "linear-gradient(135deg,#15709B,#0E2A33)",
      image: "https://picsum.photos/seed/bookit-why-time/1400/1800",
    },
    {
      nav: "Ideas",
      title: "Ideas you'd never find alone",
      body: "The best moments rarely show up in a search. Years on the ground mean we can open doors a guidebook never lists — the family who still smoke their own trout, the monastery that opens only at dawn.",
      grad: "linear-gradient(135deg,#1E7FB8,#123A40)",
      image: "https://picsum.photos/seed/bookit-why-ideas/1400/1800",
    },
    {
      nav: "Value",
      title: "Better value than it looks",
      body: "No planning fees, clear pricing, and relationships that get you more for what you spend — not less. We also spare you the costly mistakes that only reveal themselves once you've arrived.",
      grad: "linear-gradient(135deg,#0C747E,#0E2A33)",
      image: "https://picsum.photos/seed/bookit-why-value/1400/1800",
    },
    {
      nav: "Peace of mind",
      title: "Nothing left to worry about",
      body: "If a flight shifts or a day turns, you have someone to call — not a queue. We stay close from the moment you leave to the moment you're home, quietly handling whatever comes up.",
      grad: "linear-gradient(135deg,#3F8A2E,#10302A)",
      image: "https://picsum.photos/seed/bookit-why-peace/1400/1800",
    },
    {
      nav: "Watertight",
      title: "Watertight, end to end",
      body: "Every booking is checked, confirmed and protected, with one plan that holds together from first flight to final night. You travel; we make sure it all simply works.",
      grad: "linear-gradient(135deg,#11919B,#0E2A33)",
      image: "https://picsum.photos/seed/bookit-why-watertight/1400/1800",
    },
  ] satisfies WhyTopic[],
};

// ── Why book with us → How it all works ─────────────────────────────
export const howItWorks: ProcessStep[] = [
  {
    no: "01",
    title: "Tell us how you want to feel",
    body: "Share the shape of the trip — the people, the pace, the feeling you're after. No detail is too small, and nothing is fixed yet.",
    grad: "linear-gradient(135deg,#3f6f7a,#1d3c45)",
    image: "https://picsum.photos/seed/bookit-how-1/1600/2000",
  },
  {
    no: "02",
    title: "We dream up the possibilities",
    body: "Your planner sketches out where you could go and what it could become, drawing on the ground we know and the partners we trust.",
    grad: "linear-gradient(135deg,#5a6b86,#2a3550)",
    image: "https://picsum.photos/seed/bookit-how-2/1600/2000",
  },
  {
    no: "03",
    title: "We talk it through",
    body: "A proper conversation, not a quote. We refine the idea together until it feels unmistakably like yours.",
    grad: "linear-gradient(135deg,#7a6a52,#2c2418)",
    image: "https://picsum.photos/seed/bookit-how-3/1600/2000",
  },
  {
    no: "04",
    title: "Your journey, designed in full",
    body: "You receive a considered proposal — itinerary, stays and experiences — with clear pricing and no planning fees.",
    grad: "linear-gradient(135deg,#4f6f57,#1d2c20)",
    image: "https://picsum.photos/seed/bookit-how-4/1600/2000",
  },
  {
    no: "05",
    title: "We perfect the details",
    body: "We adjust, swap and fine-tune until every day sits right. Only then do we confirm a thing.",
    grad: "linear-gradient(135deg,#6a4f6a,#241a24)",
    image: "https://picsum.photos/seed/bookit-how-5/1600/2000",
  },
  {
    no: "06",
    title: "You travel, we stay close",
    body: "From the moment you leave to the moment you're home, we're a message away — quietly handling anything the day throws up.",
    grad: "linear-gradient(135deg,#3f5a4f,#161f18)",
    image: "https://picsum.photos/seed/bookit-how-6/1600/2000",
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
