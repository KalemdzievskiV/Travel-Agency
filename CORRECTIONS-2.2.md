# Corrections 2.2 — tracking list

Source: `КОРЕКЦИИ 2.2.docx` (33 annotated screenshots). Image numbers below refer
to that document's order, so a line can always be traced back to what the client
circled.

Status: `[ ]` todo · `[~]` in progress · `[x]` done · `[?]` blocked on a decision

---

## A. Copy (fast, mostly `messages/{mk,en}.json`)

- [x] **A1** Home intro rewritten — new Macedonian supplied verbatim (img 1). `intro.*`
- [x] **A2** `Маршрутата` → **Програма** — `tripPage.itineraryHeading`, `cards.itinerary` (img 16)
- [x] **A3** `Каде да отседнете` → **Предлог сместувања** — `destinationPage.whereToStay` (img 14)
- [x] **A4** `Повеќе места` → **Популарни дестинации** — `destinationPage.morePlaces` (img 15)
- [x] **A5** Standard sub-line under "Патувања во X", identical on every destination (img 13):
      *"Овие патувања се само почетна инспирација. Вашето ќе го создадеме според вашите
      желби, ќе го приспособуваме и усовршуваме сè додека не стане токму она што го
      замислувате."* — new key, not per-destination DB copy
- [x] **A6** About: new heading *"Да ги однесеме луѓето на патувања што ќе ги паметат
      засекогаш"* + three rewritten sub-points (img 28)
- [x] **A7** why-not-diy CTA: *"Патувањето е ваше. Ние се грижиме за сè останато."* +
      body + button **Започнете го патувањето** (img 33)

## B. About sections (copy fully supplied)

> These already existed in `src/content/about.ts` (`values`, `name`, `world`) —
> they were copy replacements, not new builds. Same for A6 (`purpose`).

- [x] **B1** **Она во што веруваме** — "Три принципи од кои никогаш не отстапуваме":
      Љубопитни / Внимателни / Скромни (img 29)
- [x] **B2** **Идеа позади името — Зошто Bookit?** (img 30)
- [x] **B3** **Твојот свет** — "Твоето патување, создадено по твоја мерка" (img 31)

## C. Removals

- [x] **C1** Remove the IATA / VIRTUOSO / ABTA / ATTA trust badges (img 32).
      *"за жал нема да можеме за почеток да ги имаме"* — these are accreditation
      claims the agency does not hold, so this should ship early rather than sit
      on a live site. One line: `about/page.tsx:112` + the `TrustBadges` import.

## D. Styling nudges (small, repetitive)

- [~] **D1** Cards taller + narrower (img 2–3, 4–5, 19). Journey cards done
      (3/4.2 → 3/5, gutter 20 → 26px, matching the client's 245×405 reference).
      **Still to do: the other two instances, img 4–5 and img 19.**
- [x] **D2** Icons larger (img 6)
- [x] **D3** "Африка" above ЕГИПЕТ set bold (img 13) — already satisfied by the
      600→700 weight fix; verified computing at 700
- [x] **D4** Country page: pull the text block up (img 12)
- [x] **D5** Accommodation icons narrower + taller (img 14)
- [x] **D6** "Општи напомени" — centre the text (img 14)
- [x] **D7** Text pulled up a row in several places to close dead space (img 20)
- [x] **D8** About: tighten the vertical gaps between images (img 26–27)
- [x] **D9** About: narrow the "ДА ГИ ПРЕНЕСЕМЕ ЛУЃЕТО" block (img 28)
- [x] **D10** AVIO form: bold the field labels (img 25–26)

## E. Backgrounds (use the artwork already committed)

- [x] **E1** White backdrop on the section at img 21–22
- [x] **E2** Dark section at img 23 — narrow it and apply the dark backdrop
- [x] **E3** White backdrop at img 24, "and anywhere else you think it fits"
- [x] **E4** AVIO page — white backdrop (img 26)

Backgrounds now use the recoloured vectors (`bg-lines-1/2/3.svg`) rather than the
PNGs. `Landing3.png` remains unused; `Landing1.png` is the dark band backdrop.

## F. Structural (large — own branch each)

- [ ] **F1** **World map for `/destinations`** (img 7–11)
      Replace the text header + left region list with an interactive world map:
      regions tint on hover, per the Black Tomato reference the client pasted.
      Existing country/trip listing stays underneath. "ALL DESTINATIONS" in the
      mega-menu and the button at img 11 both point here.
      `leaflet` is already a dependency but is the wrong tool — it is a tile map.
      This needs a stylised SVG world with per-region paths plus a region→country
      mapping. Largest item in the document.

- [ ] **F2** **Trip page re-layout** (img 16–18)
      Today: full-width gallery on top, then `Маршрутата` with the map above the
      day list. Wanted: gallery moved down and left as a carousel, map + day-by-day
      on the right, short intro text in the space the gallery vacates.
      Touches `trips/[slug]/page.tsx`, `TripGallery`, `TripItineraryMap`. Must stay
      responsive to 360px.

---

## Open questions

- [?] **Q1 — Feelings list.** Client wants Опуштено / Возбудено / Инспирирано /
      Слободно / Исполнето (img 24–25). This is **not** a five-word edit. The
      values live in three places:
      1. `src/content/site.ts:62` — English display strings
      2. DB `filter_options`, group `feeling` — keys *and* labels, both English
         (`challenged, contentment, freedom, revitalised, wonder`)
      3. `src/content/destinations.ts` — legacy, imported nowhere, safe to ignore

      **The blocker:** `filter_options` has no `label_mk` column — not in the DB and
      not in `schema.ts` either, so it is a real gap rather than a pending
      migration. Every filter label in the trip finder is English-only regardless
      of locale. Two ways out:
      (a) migration adding `label_mk`, consistent with the rest of the schema; or
      (b) translate in `messages` keyed on `fo.key`, leaving the DB English.
      Trip-finder filtering matches on `key`, so renaming keys would break saved
      links — labels should change, keys should not.

- [x] **Q2 — A5 sub-line.** Resolved without a decision: `destinationPage.tripsIntro`
      already existed as one shared string across every destination, which is exactly
      what the client asked for. Replaced in place.

- [?] **Q3 — F1 map asset.** Which world SVG, and does the client want the exact
      Black Tomato region breakdown (Arctic Circle, Indian Subcontinent, South
      Pacific…) or the seven regions already in the DB?

---

## Known issues carried in from earlier (not from this document)

- Local DB is behind `schema.ts` — `trips` is missing `included`, `not_included`,
  `visa_notes` and their `_mk` variants, so the "Важни напомени" section never
  renders locally and could not be verified.
- `Landing5.png` is 1538 KB; WebP would take it to ~150 KB (all five: 2.6 MB → ~300 KB).
- `AGENTS.md` and `.claude/skills/wayfare-design/SKILL.md` still say "Bodoni Moda +
  Hanken Grotesk". Actual fonts are **Oswald** (display) + **Nunito Sans** (body,
  variable: `wdth 75`, `YTLC 540`).
- The client's "body text 18px" applies only to the 19 paragraphs that do not set
  their own size; 59 others still render at 17/16/14px.
