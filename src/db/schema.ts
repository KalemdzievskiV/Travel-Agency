import {
  pgTable,
  pgEnum,
  serial,
  text,
  integer,
  doublePrecision,
  boolean,
  timestamp,
  uniqueIndex,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ── Auth ──────────────────────────────────────────────────────────
export const userRole = pgEnum("user_role", ["admin", "editor"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  role: userRole("role").notNull().default("editor"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ── Destinations ──────────────────────────────────────────────────
export const destinations = pgTable(
  "destinations",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    region: text("region").notNull(),
    regionId: integer("region_id").references(() => regions.id, { onDelete: "set null" }),
    title: text("title").notNull(),
    teaser: text("teaser").notNull().default(""),
    intro: text("intro").notNull().default(""),
    badge: text("badge").notNull().default(""),
    // Editorial guide fields — when to go / what it feels like / what not to miss.
    whenToGo: text("when_to_go").notNull().default(""),
    image: text("image"),
    grad: text("grad"),
    // Geo coordinates — used to plot the destination on trip route maps.
    lat: doublePrecision("lat"),
    lng: doublePrecision("lng"),
    highlights: text("highlights").array().notNull().default([]),
    bestMonths: text("best_months").array().notNull().default([]),
    feelings: text("feelings").array().notNull().default([]),
    // "General notes" (ОПШТИ НАПОМЕНИ) — editable FAQ per destination,
    // one "Question | Answer" per array item.
    generalNotes: text("general_notes").array().notNull().default([]),
    // Macedonian copy (nullable — falls back to the English fields).
    titleMk: text("title_mk"),
    teaserMk: text("teaser_mk"),
    introMk: text("intro_mk"),
    whenToGoMk: text("when_to_go_mk"),
    badgeMk: text("badge_mk"),
    highlightsMk: text("highlights_mk").array(),
    generalNotesMk: text("general_notes_mk").array(),
    published: boolean("published").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("destinations_slug_idx").on(t.slug)],
);

// ── Experiences ───────────────────────────────────────────────────
export const experiences = pgTable(
  "experiences",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    eyebrow: text("eyebrow").notNull().default(""),
    title: text("title").notNull(),
    body: text("body").notNull().default(""),
    image: text("image"),
    grad: text("grad"),
    published: boolean("published").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("experiences_slug_idx").on(t.slug)],
);

// ── Experience categories ("WHO" — Families, Couples, Groups, …) ───
// Each is an editorial landing page with Concept / Our recommendations / FAQs
// tabs and a carousel of trips tagged with the matching "who" filter option.
export const experienceCategories = pgTable(
  "experience_categories",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    subtitle: text("subtitle").notNull().default(""),
    // Short intro shown under the hero.
    heroText: text("hero_text").notNull().default(""),
    image: text("image"),
    grad: text("grad"),
    // Tab content.
    concept: text("concept").notNull().default(""),
    recommendations: text("recommendations").notNull().default(""),
    // FAQs — one "Question | Answer" per array item.
    faqs: text("faqs").array().notNull().default([]),
    // Key of the "who" filter option whose tagged trips fill the carousel.
    whoOptionKey: text("who_option_key").notNull().default(""),
    // Macedonian copy (nullable — falls back to English).
    titleMk: text("title_mk"),
    subtitleMk: text("subtitle_mk"),
    heroTextMk: text("hero_text_mk"),
    conceptMk: text("concept_mk"),
    recommendationsMk: text("recommendations_mk"),
    faqsMk: text("faqs_mk").array(),
    published: boolean("published").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("experience_categories_slug_idx").on(t.slug)],
);

// ── Hotels / stays ────────────────────────────────────────────────
// Curated places to stay, each tied to a destination. Browsable on their own
// (later) and shown under "Where to stay" on destination pages.
export const hotels = pgTable(
  "hotels",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    teaser: text("teaser").notNull().default(""),
    description: text("description").notNull().default(""),
    destinationId: integer("destination_id").references(() => destinations.id, { onDelete: "set null" }),
    lat: doublePrecision("lat"),
    lng: doublePrecision("lng"),
    image: text("image"),
    grad: text("grad"),
    images: text("images").array().notNull().default([]),
    priceFrom: text("price_from").notNull().default(""),
    stars: integer("stars"),
    // Free-form style tags — e.g. beachfront, boutique, adults-only.
    style: text("style").array().notNull().default([]),
    // Macedonian copy (nullable — falls back to English).
    nameMk: text("name_mk"),
    teaserMk: text("teaser_mk"),
    descriptionMk: text("description_mk"),
    published: boolean("published").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("hotels_slug_idx").on(t.slug)],
);

// ── Remarkable experiences (НЕОБИЧНИ ИСКУСТВА) ─────────────────────
// Admin-curated "remarkable" moments shown on the Experiences hub. Each can
// point at a trip so the card links through to it.
export const remarkableExperiences = pgTable(
  "remarkable_experiences",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    teaser: text("teaser").notNull().default(""),
    description: text("description").notNull().default(""),
    image: text("image"),
    grad: text("grad"),
    // Optional trip this experience showcases — the card links to it.
    tripId: integer("trip_id").references(() => trips.id, { onDelete: "set null" }),
    // Macedonian copy (nullable — falls back to English).
    titleMk: text("title_mk"),
    teaserMk: text("teaser_mk"),
    descriptionMk: text("description_mk"),
    published: boolean("published").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("remarkable_experiences_slug_idx").on(t.slug)],
);

// ── Testimonials ──────────────────────────────────────────────────
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  quote: text("quote").notNull(),
  who: text("who").notNull(),
  where: text("where").notNull().default(""),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ── Trips (itineraries linked to destinations) ────────────────────
export const trips = pgTable(
  "trips",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull().default(""),
    description: text("description").notNull().default(""),
    durationDays: integer("duration_days"),
    priceFrom: text("price_from").notNull().default(""),
    image: text("image"),
    grad: text("grad"),
    // Gallery images for the trip carousel (URLs). The single `image` above
    // stays the hero/card image; this is the additional set.
    images: text("images").array().notNull().default([]),
    feelings: text("feelings").array().notNull().default([]),
    // The sellable product: a day-by-day plan and fixed departure dates.
    itinerary: text("itinerary").array().notNull().default([]),
    departures: text("departures").array().notNull().default([]),
    // "Important notes" (ВАЖНИ НАПОМЕНИ): what's included / not included (one
    // item per line) and a free-text visa & entry note.
    included: text("included").array().notNull().default([]),
    notIncluded: text("not_included").array().notNull().default([]),
    visaNotes: text("visa_notes").notNull().default(""),
    includedMk: text("included_mk").array(),
    notIncludedMk: text("not_included_mk").array(),
    visaNotesMk: text("visa_notes_mk"),
    published: boolean("published").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("trips_slug_idx").on(t.slug)],
);

// Many-to-many: a trip visits one or more destinations, in order.
export const tripDestinations = pgTable(
  "trip_destinations",
  {
    tripId: integer("trip_id")
      .notNull()
      .references(() => trips.id, { onDelete: "cascade" }),
    destinationId: integer("destination_id")
      .notNull()
      .references(() => destinations.id, { onDelete: "cascade" }),
    position: integer("position").notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.tripId, t.destinationId] })],
);

// ── Regions (destinations grouped for the mega-menu / listing) ────
export const regions = pgTable(
  "regions",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    label: text("label").notNull(),
    labelMk: text("label_mk"),
    image: text("image"),
    grad: text("grad"),
    sortOrder: integer("sort_order").notNull().default(0),
    published: boolean("published").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("regions_slug_idx").on(t.slug)],
);

// ── Filter taxonomy (admin-managed facets) ────────────────────────
// A group is a facet (e.g. "Feeling", "Who"); an option is a value within it
// (e.g. "Challenged"). Trips and destinations are tagged with options. When /
// duration / price facets are NOT stored here — they're derived from the trip's
// own duration/price/dates at query time.
export const filterGroups = pgTable(
  "filter_groups",
  {
    id: serial("id").primaryKey(),
    key: text("key").notNull(),
    label: text("label").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    published: boolean("published").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("filter_groups_key_idx").on(t.key)],
);

export const filterOptions = pgTable(
  "filter_options",
  {
    id: serial("id").primaryKey(),
    groupId: integer("group_id")
      .notNull()
      .references(() => filterGroups.id, { onDelete: "cascade" }),
    key: text("key").notNull(),
    label: text("label").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("filter_options_group_key_idx").on(t.groupId, t.key)],
);

export const tripFilterOptions = pgTable(
  "trip_filter_options",
  {
    tripId: integer("trip_id")
      .notNull()
      .references(() => trips.id, { onDelete: "cascade" }),
    optionId: integer("option_id")
      .notNull()
      .references(() => filterOptions.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.tripId, t.optionId] })],
);

export const destinationFilterOptions = pgTable(
  "destination_filter_options",
  {
    destinationId: integer("destination_id")
      .notNull()
      .references(() => destinations.id, { onDelete: "cascade" }),
    optionId: integer("option_id")
      .notNull()
      .references(() => filterOptions.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.destinationId, t.optionId] })],
);

// ── Relations ─────────────────────────────────────────────────────
export const tripsRelations = relations(trips, ({ many }) => ({
  tripDestinations: many(tripDestinations),
  tripFilterOptions: many(tripFilterOptions),
}));

export const destinationsRelations = relations(destinations, ({ one, many }) => ({
  region: one(regions, {
    fields: [destinations.regionId],
    references: [regions.id],
  }),
  tripDestinations: many(tripDestinations),
  destinationFilterOptions: many(destinationFilterOptions),
}));

export const regionsRelations = relations(regions, ({ many }) => ({
  destinations: many(destinations),
}));

export const tripDestinationsRelations = relations(
  tripDestinations,
  ({ one }) => ({
    trip: one(trips, {
      fields: [tripDestinations.tripId],
      references: [trips.id],
    }),
    destination: one(destinations, {
      fields: [tripDestinations.destinationId],
      references: [destinations.id],
    }),
  }),
);

export const filterGroupsRelations = relations(filterGroups, ({ many }) => ({
  options: many(filterOptions),
}));

export const filterOptionsRelations = relations(filterOptions, ({ one, many }) => ({
  group: one(filterGroups, {
    fields: [filterOptions.groupId],
    references: [filterGroups.id],
  }),
  tripFilterOptions: many(tripFilterOptions),
  destinationFilterOptions: many(destinationFilterOptions),
}));

export const tripFilterOptionsRelations = relations(tripFilterOptions, ({ one }) => ({
  trip: one(trips, { fields: [tripFilterOptions.tripId], references: [trips.id] }),
  option: one(filterOptions, { fields: [tripFilterOptions.optionId], references: [filterOptions.id] }),
}));

export const destinationFilterOptionsRelations = relations(destinationFilterOptions, ({ one }) => ({
  destination: one(destinations, {
    fields: [destinationFilterOptions.destinationId],
    references: [destinations.id],
  }),
  option: one(filterOptions, {
    fields: [destinationFilterOptions.optionId],
    references: [filterOptions.id],
  }),
}));

// Inferred types for use across the app.
export type User = typeof users.$inferSelect;
export type Destination = typeof destinations.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type ExperienceCategoryRow = typeof experienceCategories.$inferSelect;
export type HotelRow = typeof hotels.$inferSelect;
export type RemarkableExperienceRow = typeof remarkableExperiences.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Trip = typeof trips.$inferSelect;
export type FilterGroup = typeof filterGroups.$inferSelect;
export type FilterOption = typeof filterOptions.$inferSelect;
export type Region = typeof regions.$inferSelect;
