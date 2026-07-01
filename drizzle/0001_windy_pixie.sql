CREATE TABLE "destination_filter_options" (
	"destination_id" integer NOT NULL,
	"option_id" integer NOT NULL,
	CONSTRAINT "destination_filter_options_destination_id_option_id_pk" PRIMARY KEY("destination_id","option_id")
);
--> statement-breakpoint
CREATE TABLE "filter_groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"label" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "filter_options" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_id" integer NOT NULL,
	"key" text NOT NULL,
	"label" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trip_filter_options" (
	"trip_id" integer NOT NULL,
	"option_id" integer NOT NULL,
	CONSTRAINT "trip_filter_options_trip_id_option_id_pk" PRIMARY KEY("trip_id","option_id")
);
--> statement-breakpoint
ALTER TABLE "destination_filter_options" ADD CONSTRAINT "destination_filter_options_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "destination_filter_options" ADD CONSTRAINT "destination_filter_options_option_id_filter_options_id_fk" FOREIGN KEY ("option_id") REFERENCES "public"."filter_options"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "filter_options" ADD CONSTRAINT "filter_options_group_id_filter_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."filter_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trip_filter_options" ADD CONSTRAINT "trip_filter_options_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trip_filter_options" ADD CONSTRAINT "trip_filter_options_option_id_filter_options_id_fk" FOREIGN KEY ("option_id") REFERENCES "public"."filter_options"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "filter_groups_key_idx" ON "filter_groups" USING btree ("key");--> statement-breakpoint
CREATE UNIQUE INDEX "filter_options_group_key_idx" ON "filter_options" USING btree ("group_id","key");