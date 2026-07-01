CREATE TABLE "regions" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"label" text NOT NULL,
	"image" text,
	"grad" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "destinations" ADD COLUMN "region_id" integer;--> statement-breakpoint
CREATE UNIQUE INDEX "regions_slug_idx" ON "regions" USING btree ("slug");--> statement-breakpoint
ALTER TABLE "destinations" ADD CONSTRAINT "destinations_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE set null ON UPDATE no action;