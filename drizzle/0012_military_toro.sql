ALTER TABLE "destinations" ADD COLUMN "price_from" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "destinations" ADD COLUMN "on_sale" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "destinations" ADD COLUMN "sale_price_from" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "on_sale" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "sale_price_from" text DEFAULT '' NOT NULL;