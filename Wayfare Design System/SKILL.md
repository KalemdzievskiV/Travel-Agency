---
name: wayfare-design
description: Use this skill to generate well-branded interfaces and assets for Wayfare, an editorial luxury tailor-made travel brand — either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation
- **Brand:** Wayfare — luxury, tailor-made travel. Voice: warm, editorial, British English, feeling-led ("Every journey starts with a feeling"). No emoji ever.
- **Foundations:** `styles.css` → `tokens/*`. Cream canvas, warm ink, one coral accent (`--wf-coral-500`). Bodoni Moda display serif + Hanken Grotesk body. Eyebrows are UPPERCASE, wide-tracked. Restrained radii, hairline borders, soft shadows, calm slow motion.
- **Components** (`window.WayfareDesignSystem_5f474a`): Button, Eyebrow, Badge, Tag, Input, SearchBar, DestinationCard, Card.
- **UI kits:** `ui_kits/website/` (marketing site) and `ui_kits/app/` (iOS app) — read these for full-screen patterns.
- **Icons:** thin-stroke line set (inline in the kits); extend with [Lucide](https://lucide.dev). Brand mark in `assets/`.

## Caveats to carry forward
- **Fonts are substitutes** (Bodoni Moda / Hanken Grotesk stand in for Saol Display / Founders Grotesk). Swap licensed faces in `tokens/fonts.css` for production.
- **Imagery is placeholder** — warm tonal gradients labelled "Your photo". Replace with real travel photography.
