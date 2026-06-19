---
name: wayfare-design
description: Use for ANY UI work on the bookit travel site — pages, components, sections, styling, copy. Editorial-luxury "Black Tomato" aesthetic (the Wayfare design system) rebranded as bookit. Defines colours, type, spacing, motion, components, and brand voice. Read this before writing or changing any user-facing markup or styles.
user-invocable: true
---

# bookit design — how we build the interface

bookit is a tailor-made luxury travel studio in **North Macedonia**, modelled on
the look & feel of [Black Tomato](https://www.blacktomato.com/). The visual
language is the **Wayfare design system** (an original editorial-luxury brand);
we use it verbatim but the product is branded **bookit**. Every screen should
feel like a travel magazine wrapped around photography: cinematic imagery, a
high-contrast serif, a quiet warm-neutral palette, and a single coral accent.

> Brand voice in one line: *"It's not where you want to go; it's how you want to feel."*

## Always do this first
1. This is a **modified Next.js 16** — per `AGENTS.md`, read the relevant guide in
   `node_modules/next/dist/docs/` before writing framework code (App Router, async
   `params`/`searchParams`, `next/font`, Turbopack defaults).
2. Reuse the existing primitives and tokens. Do **not** hand-roll colours, fonts,
   radii, or shadows — pull them from the design tokens.

## Where everything lives (in this repo)
- **Design tokens** (source of truth): `src/styles/wayfare/{colors,typography,spacing,effects}.css`
  — imported in `src/app/globals.css`, which also exposes a **Tailwind v4 `@theme`
  bridge** so utilities map to brand tokens.
- **UI primitives** (typed React): `src/components/ui/` — `Button`, `Eyebrow`,
  `Badge`, `Tag`, `Input`, `SearchBar`, `Card`, `DestinationCard`, `Icon`.
  Import from `@/components/ui`.
- **Site shell**: `src/components/site/` — `Logo`, `SiteHeader`, `SiteFooter`,
  `EnquiryProvider` (+ `useEnquiry`), `EnquireButton`.
- **Reusable sections**: `src/components/sections/` — `SectionHead`,
  `DestinationGrid`, `DestinationsBrowser`.
- **Content** (typed, in-repo): `src/content/` — `destinations`, `experiences`,
  `testimonials`, `site` (nav, contact, press, feelings, footer).
- **Brand assets**: `public/brand/` (compass mark, normal + reversed).
- **Full reference**: the original kit lives in `Wayfare Design System/` — read
  its `README.md`, `guidelines/foundations/*`, and `ui_kits/*` for the complete
  rules, specimen cards, and full-screen layout patterns.

## How to style
- **Prefer the brand Tailwind utilities** wired in `globals.css`: `bg-cream`,
  `bg-ink`, `bg-sand`, `text-ink`, `text-coral`, `border-border`, `font-display`,
  `font-sans`, `rounded-md`, `shadow-md`, etc. These resolve to `--wf-*` tokens.
- When a component needs values utilities don't cover, use inline styles that
  reference the **CSS variables directly** (`var(--wf-coral-500)`,
  `var(--wf-space-8)`, `var(--wf-ease-out)`) — that's how the ported primitives
  are written. Never paste raw hex/px that a token already defines.
- Interactive primitives are client components (`"use client"`); presentational
  ones (`Eyebrow`, `Badge`, `Icon`, `SectionHead`) are server-safe.

## Responsiveness is mandatory
Every page and component must work from **360px phones up to wide desktop** — this
is part of "done", not a follow-up. The primitives use inline styles, and **inline
styles cannot hold media queries**, so follow this split:

- **Fluid type & spacing → `clamp()` inline.** Never ship a fixed large font or
  pad. Use `clamp(min, vw, max)`, e.g. a hero `fontSize: "clamp(40px, 8.5vw, 78px)"`,
  section padding `"clamp(64px, 9vw, 104px) 0"`. Display headings, section padding,
  and modal padding should all be fluid.
- **Layout that must change at a breakpoint → a class** from
  `src/styles/wayfare/responsive.css` (inline styles can't do this). Available:
  - `wf-wrap` + `wf-wrap--wide` / `wf-wrap--default` — centres content and applies
    the responsive horizontal gutter. Put the gutter on the wrapper, not the section
    (give the `<section>` vertical padding + background only).
  - `wf-grid` + `wf-grid-2|3|4` — card grids that step 4/3 → 2 → 1 column.
    `DestinationGrid` already uses these via its `columns` prop.
  - `wf-split` (+ child `wf-split__aside`) — content/sticky-sidebar that stacks.
  - `wf-footer-grid`, `wf-form-grid`, `wf-searchbar` — footer, form pairs, search widget.
  - Header nav collapses to the `wf-nav-toggle` mobile menu below 860px.
- If you need a brand-new responsive layout, **add a class to `responsive.css`** —
  do not inline a fixed `gridTemplateColumns` or a desktop-only width.
- Breakpoints in use: 980 (tablet), 860 (nav), 720 (search), 640/520 (phone).
- Test at **≤375px** before calling UI done: no horizontal scroll, tap targets
  ≥ ~40px, nav reachable, images/cards full-width, text not clipped.

## Foundations (the short version)
- **Colour:** cream canvas (`--wf-cream`), warm near-black ink (`--wf-ink-900`),
  one coral accent (`--wf-coral-500`, "the tomato") used **sparingly** — one
  primary action per view. Warm neutrals only (never blue-greys). Imagery
  supplies all other colour. Alternate cream / `--wf-sand` / ink-900 section bands.
- **Type:** Bodoni Moda display serif (headlines, tight `-0.02em` tracking, a
  frequent *italic* accent word) + Hanken Grotesk body (line-height ~1.65).
  **Eyebrows** are 12px, 600, UPPERCASE, `.18em` tracking — above most headlines.
  *(Both are substitutes for Saol Display / Founders Grotesk — swap licensed
  faces in `src/styles/wayfare/typography.css` + `layout.tsx` for production.)*
- **Shape:** restrained radii — `--wf-radius-md` (4px) for cards/buttons; pills
  only for chips and circular icon buttons. Luxury reads square-ish.
- **Depth:** hairline borders (`1px var(--wf-border)`) over heavy shadows; soft,
  warm-tinted shadows; cards lift gently on hover (slow 600ms image zoom).
- **Motion:** calm and slow — ease `--wf-ease-out`, image reveals ~600ms, UI
  160–280ms. No bounces, spins, or infinite loops. Respect reduced-motion.
- **Imagery:** warm, cinematic, slightly desaturated. Placeholders are tonal
  gradients labelled "Your photo" — replace with real travel photography.
- **Layout:** max width `--wf-container` (1280) / wide 1480; long-form text capped
  ~680px; generous section padding (96–128px desktop); 4px spacing base.

## Brand voice (write copy this way)
- Speak as **"we"**, address the reader as **"you"**. Warm, editorial, never salesy.
- **British English** ("personalised", "tailor-made", "favourite").
- Lead with **feeling**, not logistics. Sentence case everywhere; UPPERCASE only
  for eyebrows/labels. Headlines short and serif, often one *italic* word.
- CTAs are verbs of intent: "Plan my trip", "Start your journey", "Enquire now"
  — never "Submit" / "Click here".
- Concrete, credible specifics ("no planning fees", "within 24 hours"). Avoid
  invented stat-slop. **No emoji, ever.**
- For bookit specifically: ground it in **North Macedonia & the Balkans** (Ohrid,
  Mavrovo, Matka, Prespa) alongside wider Mediterranean journeys.

## Icons
Use the bundled `Icon` set (`@/components/ui`) first; for anything beyond it use
[`lucide-react`](https://lucide.dev) (already installed) — its thin-stroke style
matches. The filled `star` glyph (tinted coral) is for ratings.

## Definition of done for UI work
- Uses tokens/primitives, not ad-hoc values. Coral used once per view.
- Eyebrow → serif headline → grotesk body rhythm where appropriate.
- British English, feeling-led copy, no emoji.
- **Fully responsive** (see *Responsiveness is mandatory*): fluid `clamp()` type,
  `wf-*` layout classes for anything that reflows, verified at ≤375px with no
  horizontal scroll. Keyboard-accessible; `next build` type-checks clean.
