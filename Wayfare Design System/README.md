# Wayfare Design System

> An editorial, luxury **tailor-made travel** brand and design system.
> *Every journey starts with a feeling.*

Wayfare is a fictional luxury travel company: a small studio of travellers and
planners who craft fully personalised itineraries — not templates, not
off-the-shelf tours. The brand sells a *feeling* first and a destination second.
The design language is cinematic and editorial: full-bleed photography, a
high-contrast serif for headlines, a quiet warm-neutral palette, and a single
coral accent — "the tomato".

This repository is a **design system**: design tokens, reusable React component
primitives, foundation specimen cards, and two full product UI kits (a marketing
website and an iOS app). Use it to build on-brand Wayfare interfaces, mocks and
prototypes.

---

## Sources & provenance

- **Aesthetic reference:** [Black Tomato](https://www.blacktomato.com/) — the
  user asked to model the look & feel on this luxury bespoke-travel brand. Wayfare
  is an **original** brand built *in that editorial-luxury style*; it does **not**
  reuse Black Tomato's name, logo, or proprietary copy/programmes.
- **Repo attached at kickoff:** [`KalemdzievskiV/Travel-Agency`](https://github.com/KalemdzievskiV/Travel-Agency)
  — turned out to be a bare `create-next-app` scaffold (no brand, screens or
  assets), so nothing was extracted from it. Explore it only if it later gains
  real content.

> ⚠️ **Font substitutions (flagged).** The Black Tomato look relies on commercial
> faces (Saol Display + Founders Grotesk). Wayfare substitutes the closest free
> Google Fonts — **Bodoni Moda** (display) and **Hanken Grotesk** (text). Swap in
> licensed faces in `tokens/fonts.css` for production. See *Visual Foundations*.

---

## Content fundamentals — how Wayfare writes

The voice is **warm, confident, and quietly editorial** — a well-travelled
friend, never a salesperson.

- **Person:** Speaks as **"we"**, addresses the reader as **"you"**. Inclusive
  and personal ("designed around *you*").
- **Tone:** Evocative and emotional, but restrained — it suggests feeling rather
  than shouting it. Sentences are often short and declarative for rhythm:
  *"So let's begin. Let's do something remarkable."*
- **The core idea:** Lead with *feeling*, not logistics. The signature line —
  *"It's not where you want to go; it's how you want to feel."* — reframes every
  CTA around emotion (the "Feelings Engine", feeling-led search).
- **Casing:** Sentence case for headlines and body. **UPPERCASE only for
  eyebrows / labels** (with wide letter-spacing). Never all-caps a sentence.
- **Spelling:** **British English** ("personalised", "tailor-made",
  "favourite", "kilometres"). Keep "tailor-made" hyphenated.
- **Numerals & specifics:** Concrete, credible specifics build trust —
  *"100+ destinations"*, *"Est. 2005"*, *"no planning fees"*, *"within 24 hours"*.
  Avoid invented stat-slop.
- **Emoji:** **Never.** No emoji anywhere in the brand.
- **Headlines** are short and serif, often with one *italic* word for emphasis
  (*"Every journey starts with a feeling."*). Sub-copy is plain grotesk.
- **Buttons:** verbs of intent, not generic — "Plan my trip", "Start your
  journey", "Enquire now", "Read the story" — rather than "Submit" / "Click here".

Example block:
> **THE PURSUIT OF FEELING** *(eyebrow)*
> **Every journey starts with a feeling.** *(serif headline)*
> Fully personalised itineraries for couples, families and solo travellers —
> designed around how you want to feel, not where the crowds go. *(grotesk body)*

---

## Visual foundations

**Overall feel:** editorial travel magazine meets concierge service. Photography
leads; the UI is a quiet, warm frame around it. Lots of negative space.

- **Colour:** A warm cream canvas (`--wf-cream #F6F2EA`), near-black warm ink
  (`--wf-ink-900 #16130F`), and a single coral accent (`--wf-coral-500 #E14E31`,
  "the tomato") used *sparingly* — one primary action per view, eyebrows, small
  highlights. Neutrals are warm (browned greys, never blue-greys). Imagery
  supplies all other colour. Semantic colours are earthy and muted, never neon.
- **Typography:** **Bodoni Moda** display serif (high contrast, tight tracking
  `-0.02em`, weights 400–600, frequent *italic* accent word) for all headlines;
  **Hanken Grotesk** for body/UI (400–700, line-height 1.65 for long-form).
  **Eyebrows** are 12px, 600, UPPERCASE, `.18em` tracking — the connective tissue
  of every layout.
- **Backgrounds:** Full-bleed photography and video heroes; alternating
  cream / `--wf-sand` / ink-900 section bands for rhythm. **No gradients as
  decoration** — gradients appear *only* as image protection overlays
  (`--wf-overlay-bottom`) so captions stay legible. No patterns or textures.
- **Imagery vibe:** Warm, natural, cinematic, slightly desaturated — wild
  landscapes and intimate human moments. In this kit, real photos are replaced
  by **warm tonal gradient placeholders labelled "Your photo"** — drop in real
  imagery to finish.
- **Corner radii:** Restrained. Cards & buttons use `--wf-radius-md (4px)`;
  pills (`999px`) only for chips/filters and circular icon buttons. Luxury reads
  square-ish — avoid big rounded corners.
- **Cards:** Two archetypes. (1) **DestinationCard** — full-bleed photo, bottom
  protection gradient, region eyebrow + serif title overlaid, optional badge /
  price / rating, heart save. Hovers with a slow image zoom (`scale 1.05`,
  600ms). (2) **Card** — editorial content tile on paper, image on top, hairline
  border, eyebrow + serif title + body.
- **Borders & elevation:** The brand prefers **hairline borders**
  (`1px var(--wf-border)`) over heavy shadows. Shadows are soft, low and
  warm-tinted (`--wf-shadow-sm/md`). Cards lift gently on hover.
- **Motion:** Calm and slow. Primary easing `cubic-bezier(.22,1,.36,1)`
  (`--wf-ease-out`). Image reveals/zooms ~600ms; UI transitions 160–280ms.
  Fades and gentle scale — **no bounces, no spins, no infinite loops** on content.
- **Hover states:** Buttons darken (coral 500→600); ghost buttons get a faint
  coral-050 wash; outline buttons invert to ink fill; cards raise shadow + zoom
  image; nav links get a 1.5px underline.
- **Press states:** Buttons nudge down `translateY(1px)` — subtle, no shrink.
- **Transparency & blur:** Used sparingly — the sticky header is transparent over
  the hero then becomes solid cream on scroll; circular save buttons over photos
  use a translucent ink fill with `backdrop-filter: blur`.
- **Layout:** Max content width `1280px` (`1480px` wide); long-form text capped at
  `~680px` measure. Generous section padding (96–128px on desktop). 4px spacing base.

See the **Design System** tab for live specimen cards (Type, Colors, Spacing, Brand).

---

## Iconography

Wayfare uses a **thin-stroke, line-based icon style** (≈1.6–1.7px stroke, round
caps/joins, 24px grid) — understated and editorial, matching the serif headlines.

- There is **no production icon font** (this is an original brand). The UI kits
  ship a small **inline SVG line-icon set** (`ui_kits/website/chrome.jsx` →
  `Icon`, `ui_kits/app/app.jsx` → `AIcon`): search, chevron, arrow, phone, menu,
  close, star, map-pin, globe, award, calendar, users, compass, heart, bag, user.
- **Recommended substitute / extension:** [**Lucide**](https://lucide.dev) — its
  stroke weight and geometric line style match the in-kit set almost exactly. Use
  it from CDN when you need icons beyond the bundled handful. *(Flagged: Lucide is
  a substitute, not an official brand asset.)*
- **The star glyph** is the one filled icon (used for ratings), tinted coral.
- **Brand mark:** a minimal **compass / four-point star** (`assets/wayfare-mark.svg`
  and `…-reversed.svg`) with one coral facet — paired with the "Wayfare" serif
  wordmark. No emoji, ever. Avoid hand-drawing new pictorial illustrations.

---

## Index / manifest

**Root**
- `styles.css` — global entry point (consumers link this). `@import`s only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`
- `assets/` — `wayfare-mark.svg`, `wayfare-mark-reversed.svg`
- `README.md` (this file) · `SKILL.md`
- `_dev_fallback.jsx` — dev-only: mirrors component sources so UI kits preview
  before the real `_ds_bundle.js` is compiled. Auto-generated; harmless no-op once
  the bundle loads. (`_ds_bundle.js`, `_ds_manifest.json` are compiler output.)

**Components** (`window.WayfareDesignSystem_5f474a.*`)
- `components/core/` — **Button**, **Eyebrow**, **Badge**, **Tag**
- `components/forms/` — **Input**
- `components/search/` — **SearchBar** (the where/when/who booking widget)
- `components/cards/` — **DestinationCard**, **Card**
- Each has `.jsx` + `.d.ts` + `.prompt.md`, plus one `@dsCard` HTML per directory.

**Foundations** (`guidelines/foundations/`) — specimen cards for the Design System tab
(Colors ×4, Type ×4, Spacing ×3, Brand ×2).

**UI kits**
- `ui_kits/website/` — Wayfare.com: home (hero + feeling intro + popular
  destinations + experiences + testimonials + press/why), destinations listing,
  trip finder, enquiry modal. Entry: `index.html`.
- `ui_kits/app/` — iOS app: explore, feelings search, trips, destination detail.
  Entry: `index.html`.

**Starting points:** Button, SearchBar, DestinationCard, the website, and the app.

---

## Using the system

Consumers link one file and read components off the global namespace:

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
<script>
  const { Button, DestinationCard, SearchBar } = window.WayfareDesignSystem_5f474a;
</script>
```

For mocks & prototypes, copy the assets you need and build static HTML. For
production, import from the bundle and replace photo placeholders + substitute
fonts with licensed files.
