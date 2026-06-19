import {
  pgTable,
  pgEnum,
  serial,
  text,
  integer,
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
    title: text("title").notNull(),
    teaser: text("teaser").notNull().default(""),
    intro: text("intro").notNull().default(""),
    priceFrom: text("price_from").notNull().default(""),
    rating: text("rating").notNull().default(""),
    badge: text("badge").notNull().default(""),
    duration: text("duration").notNull().default(""),
    image: text("image"),
    grad: text("grad"),
    highlights: text("highlights").array().notNull().default([]),
    bestMonths: text("best_months").array().notNull().default([]),
    feelings: text("feelings").array().notNull().default([]),
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
    feelings: text("feelings").array().notNull().default([]),
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

// ── Relations ─────────────────────────────────────────────────────
export const tripsRelations = relations(trips, ({ many }) => ({
  tripDestinations: many(tripDestinations),
}));

export const destinationsRelations = relations(destinations, ({ many }) => ({
  tripDestinations: many(tripDestinations),
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

// Inferred types for use across the app.
export type User = typeof users.$inferSelect;
export type Destination = typeof destinations.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Trip = typeof trips.$inferSelect;
