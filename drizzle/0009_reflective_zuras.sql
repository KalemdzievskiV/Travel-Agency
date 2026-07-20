ALTER TABLE "experience_categories" ADD COLUMN "kind" text DEFAULT 'who' NOT NULL;--> statement-breakpoint
ALTER TABLE "experience_categories" ADD COLUMN "destination_ids" integer[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "experience_categories" ADD COLUMN "destinations_heading" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "experience_categories" ADD COLUMN "destinations_intro" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "experience_categories" ADD COLUMN "destinations_heading_mk" text;--> statement-breakpoint
ALTER TABLE "experience_categories" ADD COLUMN "destinations_intro_mk" text;