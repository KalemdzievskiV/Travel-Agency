# Wayfare — Website UI kit

A high-fidelity recreation of **Wayfare.com**, the luxury travel marketing site.
Open `index.html`.

## Screens / flow
- **Home** — full-bleed hero (film/photo placeholder) with the feeling-led search
  bar; "Pursuit of Feeling" editorial intro; popular destinations grid;
  experiences (dark band); rotating testimonials; press logos + "why Wayfare".
- **Destinations** — dark page header, sticky filter chips, destination grid.
- **Trip Finder** — the "Feelings Engine": pick a feeling + month → results.
- **Enquiry modal** — name/email/destination form on any "Enquire" CTA.

Navigate via the header; "Enquire now" opens the modal.

## Composition
- Built on the design-system primitives via `window.WayfareDesignSystem_5f474a`
  (Button, Eyebrow, SearchBar, Tag, Input). Shared chrome (Header, Footer,
  SectionHead, Icon) lives in `chrome.jsx`; screens in `screens.jsx`; sample
  content in `data.js`.
- Loads `../../_ds_bundle.js` for production; `../../_dev_fallback.jsx` lets it
  render before the bundle is compiled (no-op once the bundle is present).

## To finish for production
- Replace tonal gradient placeholders (`grad` in `data.js`, hero/experience
  blocks) with real photography / a hero video.
- Substitute licensed fonts in `tokens/fonts.css`.
