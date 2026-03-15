CREATE TABLE "generation_metatags" (
	"id" serial PRIMARY KEY NOT NULL,
	"generation_number" integer NOT NULL,
	"locale" varchar(5) NOT NULL,
	"meta_title" text NOT NULL,
	"meta_description" text NOT NULL,
	"og_image" text,
	"canonical_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "location_metatags" (
	"id" serial PRIMARY KEY NOT NULL,
	"location_slug" varchar(100) NOT NULL,
	"locale" varchar(5) NOT NULL,
	"meta_title" text NOT NULL,
	"meta_description" text NOT NULL,
	"og_image" text,
	"canonical_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "page_metatags" (
	"id" serial PRIMARY KEY NOT NULL,
	"page_key" varchar(100) NOT NULL,
	"locale" varchar(5) NOT NULL,
	"meta_title" text NOT NULL,
	"meta_description" text NOT NULL,
	"og_image" text,
	"canonical_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pokemon_metatags" (
	"id" serial PRIMARY KEY NOT NULL,
	"national_dex_number" integer NOT NULL,
	"locale" varchar(5) NOT NULL,
	"meta_title" text NOT NULL,
	"meta_description" text NOT NULL,
	"og_image" text,
	"canonical_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "region_metatags" (
	"id" serial PRIMARY KEY NOT NULL,
	"region_slug" varchar(50) NOT NULL,
	"locale" varchar(5) NOT NULL,
	"meta_title" text NOT NULL,
	"meta_description" text NOT NULL,
	"og_image" text,
	"canonical_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "type_metatags" (
	"id" serial PRIMARY KEY NOT NULL,
	"type_slug" varchar(50) NOT NULL,
	"locale" varchar(5) NOT NULL,
	"meta_title" text NOT NULL,
	"meta_description" text NOT NULL,
	"og_image" text,
	"canonical_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "generation_metatag_num_locale_idx" ON "generation_metatags" USING btree ("generation_number","locale");--> statement-breakpoint
CREATE UNIQUE INDEX "location_metatag_slug_locale_idx" ON "location_metatags" USING btree ("location_slug","locale");--> statement-breakpoint
CREATE UNIQUE INDEX "page_metatag_key_locale_idx" ON "page_metatags" USING btree ("page_key","locale");--> statement-breakpoint
CREATE UNIQUE INDEX "pokemon_metatag_dex_locale_idx" ON "pokemon_metatags" USING btree ("national_dex_number","locale");--> statement-breakpoint
CREATE UNIQUE INDEX "region_metatag_slug_locale_idx" ON "region_metatags" USING btree ("region_slug","locale");--> statement-breakpoint
CREATE UNIQUE INDEX "type_metatag_slug_locale_idx" ON "type_metatags" USING btree ("type_slug","locale");