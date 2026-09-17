ALTER TABLE "filter_options" ADD COLUMN "label_mk" text;--> statement-breakpoint
-- The trip finder's "feeling" dropdown now reads this group instead of a list
-- in code, so bring the options in line with what visitors saw: the wording
-- from the dictionaries (en/mk "feelings") and the order of the old code list.
UPDATE "filter_options" o SET
  "label" = v.label,
  "label_mk" = v.label_mk,
  "sort_order" = v.sort_order,
  "updated_at" = now()
FROM (VALUES
  ('contentment', 'Relaxed', 'Мирно', 0),
  ('challenged', 'Excited', 'Предизвикано', 1),
  ('wonder', 'Inspired', 'Восхитено', 2),
  ('freedom', 'Free', 'Слободно', 3),
  ('revitalised', 'Fulfilled', 'Живо', 4)
) AS v(key, label, label_mk, sort_order), "filter_groups" g
WHERE o."group_id" = g."id" AND g."key" = 'feeling' AND o."key" = v.key;--> statement-breakpoint
-- Trips are now matched on their feeling tags rather than the legacy
-- trips.feelings array. Re-tag from that array, which restores the tags lost
-- when the "freedom" option was deleted and re-created.
INSERT INTO "trip_filter_options" ("trip_id", "option_id")
SELECT t."id", o."id"
FROM "trips" t
CROSS JOIN LATERAL unnest(t."feelings") AS f(name)
JOIN "filter_groups" g ON g."key" = 'feeling'
JOIN "filter_options" o ON o."group_id" = g."id" AND o."key" = lower(f.name)
ON CONFLICT DO NOTHING;
