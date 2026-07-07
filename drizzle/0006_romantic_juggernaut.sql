CREATE TABLE "hotels" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"teaser" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"destination_id" integer,
	"lat" double precision,
	"lng" double precision,
	"image" text,
	"grad" text,
	"images" text[] DEFAULT '{}' NOT NULL,
	"price_from" text DEFAULT '' NOT NULL,
	"stars" integer,
	"style" text[] DEFAULT '{}' NOT NULL,
	"name_mk" text,
	"teaser_mk" text,
	"description_mk" text,
	"published" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hotels" ADD CONSTRAINT "hotels_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "hotels_slug_idx" ON "hotels" USING btree ("slug");