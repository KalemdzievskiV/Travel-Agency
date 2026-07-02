CREATE TABLE "experience_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"subtitle" text DEFAULT '' NOT NULL,
	"hero_text" text DEFAULT '' NOT NULL,
	"image" text,
	"grad" text,
	"concept" text DEFAULT '' NOT NULL,
	"recommendations" text DEFAULT '' NOT NULL,
	"faqs" text[] DEFAULT '{}' NOT NULL,
	"who_option_key" text DEFAULT '' NOT NULL,
	"title_mk" text,
	"subtitle_mk" text,
	"hero_text_mk" text,
	"concept_mk" text,
	"recommendations_mk" text,
	"faqs_mk" text[],
	"published" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "experience_categories_slug_idx" ON "experience_categories" USING btree ("slug");