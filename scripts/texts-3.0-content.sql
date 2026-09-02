-- Revision 3.0 ("Texts" briefs) — the database half of the copy change.
--
-- Macedonian copy for the five experience categories, plus the trip tagging
-- that fixes the duplicate-recommendations problem the ДОЖИВУВАЊА brief raised
-- in §18. Everything else in that revision is in messages/mk.json and
-- src/content/about.ts.
--
-- Idempotent: re-running it sets the same values and re-inserts nothing.
--
--   docker exec -i bookit-pg psql -U bookit -d bookit < scripts/texts-3.0-content.sql
--
-- NOTE: run this against whichever database the site you are looking at uses.
-- The local dev database is missing the Macedonian columns entirely, so it is
-- behind whatever the client reviewed.

BEGIN;

-- ── Category copy ─────────────────────────────────────────────────────────
-- "Групи" becomes "Со друштво" per §8: "групи" reads as a coach tour of 40
-- people, where these are private trips with friends.

UPDATE experience_categories SET
  title_mk    = 'Семејства',
  subtitle_mk = 'Заедно е најубавата дестинација.',
  hero_text_mk= 'Заедно е најубавата дестинација.',
  concept_mk  = 'Добро семејно патување не значи сите да сакаат исто. Значи секој да има причина да го сака.

Го прилагодуваме ритамот на денот, хотелите, трансферите и искуствата според возраста, интересите и енергијата на твоето семејство.

Доволно авантура за децата. Доволно простор за родителите. И што е можно помалку „уште колку има?“.',
  faqs_mk = ARRAY[
    'Може ли патувањето да се прилагоди на возраста на децата? | Да. Темпото, времето на трансфери, хотелите и активностите ги планираме според возраста и интересите на децата.',
    'Може ли да организирате connected rooms, babysitting и приватни водичи? | Да — и токму ваквите детали ги решаваме однапред.',
    'Колку порано да започнеме? | За школски распусти и најбарани периоди, колку порано толку подобро. Но умееме да работиме и брзо кога треба.'
  ]
WHERE slug = 'families';

UPDATE experience_categories SET
  title_mk    = 'Парови',
  subtitle_mk = 'Повеќе време за двајца. Помалку од сè останато.',
  hero_text_mk= 'Повеќе време за двајца. Помалку од сè останато.',
  concept_mk  = 'Некои парови сакаат бавни утра покрај море. Други сакаат Patagonia, ранец и цел ден надвор.

Не постои една верзија на романтично патување.

Затоа го создаваме околу вас двајца — вашиот ритам, интереси и начин на кој сакате да бидете заедно.'
WHERE slug = 'couples';

UPDATE experience_categories SET
  title_mk    = 'Со друштво',
  subtitle_mk = 'Различни желби. Една добра приказна.',
  hero_text_mk= 'Различни желби. Една добра приказна.',
  concept_mk  = 'Еден сака плажа. Друг планина. Некој веќе резервирал ресторан за првата вечер.

Наша работа е сето тоа да стане едно патување.

Од викенд со најблиските до роденден, годишнина или голема авантура на другиот крај на светот — ја преземаме логистиката, ги усогласуваме желбите и оставаме доволно простор за моментите што не можат да се планираат.'
WHERE slug = 'groups';

UPDATE experience_categories SET
  title_mk    = 'Меден месец',
  subtitle_mk = 'Првото големо патување по „Да“.',
  hero_text_mk= 'Првото големо патување по „Да“.',
  concept_mk  = 'Свадбата има распоред. Медениот месец не мора.

Бавни утра. Места што долго сте сакале да ги видите. Неколку изненадувања за кои едниот можеби не треба да знае однапред.

Не креираме „honeymoon package“. Креираме патување што изгледа како вас двајца.'
WHERE slug = 'honeymoon';

UPDATE experience_categories SET
  title_mk    = 'Соло',
  subtitle_mk = 'Целиот свет. Во твој ритам.',
  hero_text_mk= 'Целиот свет. Во твој ритам.',
  concept_mk  = 'Да патуваш сам не значи да бидеш сам. Значи да избираш без компромис.

Остани уште еден ден ако ти се останува. Смени го планот. Запознај луѓе или исчезни на неколку часа.

Ние ќе ги организираме сигурноста, логистиката и поддршката. Слободата ја оставаме на тебе.'
WHERE slug = 'solo';

-- ── §18: give each category its own recommendations ───────────────────────
-- A category page calls tripsForWho(), which reads trips tagged with the "who"
-- filter option of the same key and, finding none, falls back to the six most
-- recent trips. groups/honeymoon/solo had nothing tagged, so all three showed
-- the same six — the "веднаш го руши чувството дека Bookit внимателно
-- curated-ира" complaint. These are a first editorial pass, meant to be
-- adjusted in the admin.

INSERT INTO trip_filter_options (trip_id, option_id)
SELECT t.id, o.id
FROM (VALUES
  -- Со друштво: places that carry a group well — a city base, a coast, a road trip.
  ('groups',    'Italy: Rome, Florence & the Coast'),
  ('groups',    'Greece: Athens & the Cyclades'),
  ('groups',    'Morocco: Souks to Sahara'),
  ('groups',    'The American West'),
  ('groups',    'Thailand: Bangkok, Chiang Mai & the Islands'),
  -- Меден месец: two contrasting stays, per the category's own copy.
  ('honeymoon', 'Islands & Temples: Thailand & Bali'),
  ('honeymoon', 'Safari & Spice: Kenya & Zanzibar'),
  ('honeymoon', 'Italy: Rome to the Amalfi Coast'),
  ('honeymoon', 'Japan in Depth'),
  ('honeymoon', 'Emirates & Oman'),
  -- Соло: safe to move through alone, and rewarding at your own pace.
  ('solo',      'Japan: Tokyo to Kyoto'),
  ('solo',      'Peru: Andes to Amazon'),
  ('solo',      'Vietnam: North to South'),
  ('solo',      'Iceland: The Ring Road'),
  ('solo',      'Patagonia Explorer')
) AS v(who, trip)
JOIN trips t ON t.title = v.trip
JOIN filter_options o ON o.key = v.who
JOIN filter_groups g ON g.id = o.group_id AND g.key = 'who'
WHERE NOT EXISTS (
  SELECT 1 FROM trip_filter_options x WHERE x.trip_id = t.id AND x.option_id = o.id
);

COMMIT;
