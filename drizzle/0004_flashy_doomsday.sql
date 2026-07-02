ALTER TABLE "destinations" ADD COLUMN "lat" double precision;--> statement-breakpoint
ALTER TABLE "destinations" ADD COLUMN "lng" double precision;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "images" text[] DEFAULT '{}' NOT NULL;