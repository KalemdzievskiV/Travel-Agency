# Wayfare — iOS app UI kit

A high-fidelity recreation of the **Wayfare mobile app**, in an iOS 26 device
frame. Open `index.html`.

## Screens / flow
- **Explore** — greeting, horizontal feeling chips, "Your journeys" cards,
  feeling-themed explore grid.
- **Feel** (search) — the Feelings Engine on a dark canvas: pick a feeling →
  suggested trips.
- **Trips** — booked / planning journeys with status.
- **Destination detail** — full-bleed image header, overview, highlights, and a
  sticky "Enquire now" price bar. Tap any card to open; back chevron to close.

Switch sections with the bottom tab bar (Explore · Feel · Trips · Saved · You).

## Composition
- `app.jsx` holds the screens, tab bar and detail overlay; `data.js` the sample
  content; `ios-frame.jsx` the device bezel (status bar, dynamic island, home
  indicator). Composes design-system primitives via
  `window.WayfareDesignSystem_5f474a` (Button) plus the inline `AIcon` line set.
- Loads `../../_ds_bundle.js` for production; `../../_dev_fallback.jsx` for
  pre-compile preview.

## To finish for production
- Replace tonal gradient placeholders (`grad` in `data.js`) with real photos.
- Substitute licensed fonts in `tokens/fonts.css`.
