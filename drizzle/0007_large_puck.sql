ALTER TABLE "destinations" ADD COLUMN "general_notes" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "destinations" ADD COLUMN "general_notes_mk" text[];--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "included" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "not_included" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "visa_notes" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "included_mk" text[];--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "not_included_mk" text[];--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "visa_notes_mk" text;