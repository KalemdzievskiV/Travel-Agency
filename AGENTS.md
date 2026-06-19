<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# bookit

A tailor-made **luxury travel agency in North Macedonia**, modelled on the look &
feel of [Black Tomato](https://www.blacktomato.com/). Editorial, cinematic,
feeling-led — *"Every journey starts with a feeling."*

## Design is not optional
All user-facing UI follows the **bookit / Wayfare design system**. Before writing
or changing any markup, styles, or copy, **read `.claude/skills/wayfare-design/SKILL.md`**
(invocable as `/wayfare-design`). It defines the tokens, primitives, layout, motion,
and brand voice, and points to the full reference in `Wayfare Design System/`.

Quick rules: use the tokens in `src/styles/wayfare/*` and the primitives in
`@/components/ui` — never ad-hoc hex/px. One coral accent per view. Bodoni Moda
serif headlines + Hanken Grotesk body. British English, no emoji.

**Everything must be responsive (360px → desktop).** Inline styles can't hold
media queries: use `clamp()` for fluid type/spacing, and the `wf-*` layout classes
in `src/styles/wayfare/responsive.css` (grids, split, footer, search, header) for
anything that reflows. New responsive layouts go in `responsive.css`, never as a
fixed inline `gridTemplateColumns`. Verify at ≤375px with no horizontal scroll.

## Stack
- Next.js 16 (App Router, Turbopack), React 19.2, TypeScript.
- Tailwind v4 bridged to the design tokens via `@theme` in `src/app/globals.css`.
- Fonts self-hosted with `next/font` (Bodoni Moda + Hanken Grotesk).
- `lucide-react` for icons; `motion` for animation; content typed in `src/content/`.
- English only for now, but copy lives in `src/content/` so i18n (MK/SQ) can be
  added later without touching components.

## Layout
- `src/app/` — routes: `/` (home), `/destinations`, `/destinations/[slug]`, `/trip-finder`.
- `src/components/ui/` — design-system primitives. `…/site/` — shell (header, footer,
  logo, enquiry modal). `…/sections/` — reusable page sections.
- `src/content/` — typed in-repo content (destinations, experiences, testimonials, site).

## Commands
- `npm run dev` — local dev. `npm run build` — production build + type check (run
  before considering UI work done). `npm run lint`.
