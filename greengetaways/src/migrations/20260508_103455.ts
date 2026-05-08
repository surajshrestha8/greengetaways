import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_destinations_continent" AS ENUM('africa', 'asia', 'europe', 'north-america', 'south-america', 'oceania', 'antarctica');
  CREATE TYPE "public"."enum_tours_tour_type" AS ENUM('adventure', 'beach', 'cultural', 'wildlife', 'city', 'cruise', 'honeymoon', 'family', 'luxury', 'budget');
  CREATE TYPE "public"."enum_tours_itinerary_meals" AS ENUM('breakfast', 'lunch', 'dinner');
  CREATE TYPE "public"."enum_tours_availability_departure_dates_status" AS ENUM('available', 'sold-out', 'blocked', 'private-only');
  CREATE TYPE "public"."enum_tours_difficulty" AS ENUM('easy', 'moderate', 'challenging', 'difficult');
  CREATE TYPE "public"."enum_tours_status" AS ENUM('active', 'sold-out', 'coming-soon', 'inactive');
  CREATE TYPE "public"."enum_activity_categories_category_type" AS ENUM('terrestrial', 'watercourse', 'aerial', 'tours', 'special');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('pending', 'approved', 'rejected');
  CREATE TYPE "public"."enum_bookings_payment_status" AS ENUM('pending', 'deposit', 'paid', 'refunded', 'failed');
  CREATE TYPE "public"."enum_bookings_payment_method" AS ENUM('credit-card', 'bank-transfer', 'paypal', 'cash');
  CREATE TYPE "public"."enum_bookings_status" AS ENUM('pending', 'confirmed', 'cancelled', 'completed', 'refunded');
  CREATE TYPE "public"."enum_bookings_seat_hold_status" AS ENUM('held', 'released', 'not-applicable');
  CREATE TYPE "public"."enum_blog_category" AS ENUM('travel-tips', 'destination-guides', 'travel-stories', 'travel-news', 'photography', 'culture', 'food', 'adventure');
  CREATE TYPE "public"."enum_blog_status" AS ENUM('draft', 'published', 'archived');
  CREATE TYPE "public"."enum_team_members_department" AS ENUM('management', 'operations', 'sales-marketing', 'guides', 'support', 'csr');
  CREATE TYPE "public"."enum_csr_projects_category" AS ENUM('child-sponsorship', 'environmental', 'cultural', 'community', 'porter-guide', 'responsible-tourism');
  CREATE TYPE "public"."enum_csr_projects_status" AS ENUM('planning', 'active', 'completed', 'on-hold');
  CREATE TYPE "public"."enum_special_services_service_type" AS ENUM('mice', 'wedding', 'filming', 'yoga', 'team-building', 'rock-climbing', 'homestay', 'educational', 'custom');
  CREATE TYPE "public"."enum_special_services_pricing_pricing_model" AS ENUM('fixed', 'per-person', 'per-day', 'custom');
  CREATE TYPE "public"."enum_special_services_status" AS ENUM('active', 'coming-soon', 'seasonal', 'inactive');
  CREATE TYPE "public"."enum_fleet_available_for_service_type" AS ENUM('airport-transfer', 'city-tours', 'long-distance', 'private-hire');
  CREATE TYPE "public"."enum_fleet_vehicle_type" AS ENUM('tourist-bus', 'mini-van', 'jeep', 'car', 'helicopter', 'other');
  CREATE TYPE "public"."enum_fleet_status" AS ENUM('active', 'maintenance', 'retired');
  CREATE TYPE "public"."enum_newsletter_subscribers_status" AS ENUM('active', 'unsubscribed');
  CREATE TYPE "public"."enum_tour_questions_status" AS ENUM('pending', 'answered', 'dismissed');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "destinations_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "destinations_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"highlight" varchar NOT NULL
  );
  
  CREATE TABLE "destinations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"country" varchar NOT NULL,
  	"continent" "enum_destinations_continent" NOT NULL,
  	"description" jsonb NOT NULL,
  	"short_description" varchar NOT NULL,
  	"featured_image_id" integer NOT NULL,
  	"climate_best_time_to_visit" varchar,
  	"climate_average_temperature" varchar,
  	"climate_weather_description" varchar,
  	"travel_info_currency" varchar,
  	"travel_info_language" varchar,
  	"travel_info_timezone" varchar,
  	"travel_info_visa_requirements" varchar,
  	"featured" boolean DEFAULT false,
  	"popularity_score" numeric,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tours_tour_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_tours_tour_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tours_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "tours_itinerary_meals" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_tours_itinerary_meals",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tours_itinerary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" numeric,
  	"title" varchar,
  	"description" jsonb,
  	"accommodation" varchar
  );
  
  CREATE TABLE "tours_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"highlight" varchar
  );
  
  CREATE TABLE "tours_availability_departure_dates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"available_seats" numeric,
  	"status" "enum_tours_availability_departure_dates_status" DEFAULT 'available',
  	"note" varchar
  );
  
  CREATE TABLE "tours_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL
  );
  
  CREATE TABLE "tours" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"region" varchar,
  	"max_altitude_meters" numeric,
  	"max_altitude_feet" numeric,
  	"max_altitude_location" varchar,
  	"best_season" varchar,
  	"accommodation_type" varchar,
  	"adventure_walk_hours" varchar,
  	"total_meals_breakfast" numeric,
  	"total_meals_lunch" numeric,
  	"total_meals_dinner" numeric,
  	"description" jsonb,
  	"short_description" varchar,
  	"featured_image_id" integer,
  	"duration_days" numeric,
  	"duration_nights" numeric,
  	"pricing_base_price" numeric,
  	"pricing_currency" varchar DEFAULT 'USD',
  	"pricing_discounted_price" numeric,
  	"pricing_price_includes" jsonb,
  	"pricing_price_excludes" jsonb,
  	"availability_start_date" timestamp(3) with time zone,
  	"availability_end_date" timestamp(3) with time zone,
  	"group_size_min" numeric DEFAULT 1,
  	"group_size_max" numeric,
  	"difficulty" "enum_tours_difficulty",
  	"age_requirement_minimum" numeric DEFAULT 0,
  	"age_requirement_maximum" numeric,
  	"status" "enum_tours_status" DEFAULT 'active',
  	"featured" boolean DEFAULT false,
  	"popularity_score" numeric,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"why_choose_us" jsonb,
  	"commitment_to_sustainability" jsonb,
  	"trekkers_responsibilities" jsonb,
  	"trekkers_preparation" jsonb,
  	"culture_and_community" jsonb,
  	"packing_list" jsonb,
  	"accommodation_info" jsonb,
  	"food_info" jsonb,
  	"best_time_to_trek" jsonb,
  	"typical_routine" jsonb,
  	"permit_info" jsonb,
  	"guide_requirement" jsonb,
  	"acclimatization_info" jsonb,
  	"currency_exchange_info" jsonb,
  	"required_documents" jsonb,
  	"women_participation" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tours_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"destinations_id" integer,
  	"activity_categories_id" integer
  );
  
  CREATE TABLE "activity_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"parent_category_id" integer,
  	"category_type" "enum_activity_categories_category_type" NOT NULL,
  	"icon_id" integer,
  	"featured_image_id" integer,
  	"order" numeric DEFAULT 0,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"customer_name" varchar NOT NULL,
  	"customer_photo_id" integer,
  	"customer_location" varchar,
  	"tour_id" integer,
  	"rating" numeric NOT NULL,
  	"title" varchar NOT NULL,
  	"review" varchar NOT NULL,
  	"travel_date" timestamp(3) with time zone NOT NULL,
  	"featured" boolean DEFAULT false,
  	"status" "enum_testimonials_status" DEFAULT 'pending' NOT NULL,
  	"verified_booking" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "bookings_travelers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"date_of_birth" timestamp(3) with time zone,
  	"passport_number" varchar,
  	"special_requirements" varchar
  );
  
  CREATE TABLE "bookings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"booking_reference" varchar NOT NULL,
  	"tour_id" integer NOT NULL,
  	"departure_date" timestamp(3) with time zone NOT NULL,
  	"number_of_travelers" numeric NOT NULL,
  	"customer_info_first_name" varchar NOT NULL,
  	"customer_info_last_name" varchar NOT NULL,
  	"customer_info_email" varchar NOT NULL,
  	"customer_info_phone" varchar NOT NULL,
  	"customer_info_address" varchar,
  	"customer_info_country" varchar,
  	"customer_info_passport_number" varchar,
  	"pricing_subtotal" numeric NOT NULL,
  	"pricing_taxes" numeric DEFAULT 0,
  	"pricing_discount" numeric DEFAULT 0,
  	"pricing_total" numeric NOT NULL,
  	"pricing_currency" varchar DEFAULT 'USD',
  	"payment_status" "enum_bookings_payment_status" DEFAULT 'pending' NOT NULL,
  	"payment_method" "enum_bookings_payment_method",
  	"payment_transaction_id" varchar,
  	"payment_paid_amount" numeric DEFAULT 0,
  	"payment_remaining_amount" numeric,
  	"status" "enum_bookings_status" DEFAULT 'pending' NOT NULL,
  	"seat_hold_status" "enum_bookings_seat_hold_status" DEFAULT 'not-applicable',
  	"seat_hold_seats" numeric DEFAULT 0,
  	"seat_hold_released_at" timestamp(3) with time zone,
  	"seat_hold_release_reason" varchar,
  	"special_requests" varchar,
  	"internal_notes" varchar,
  	"assigned_agent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog_category" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_blog_category",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "blog_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"author_id" integer NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"featured_image_id" integer NOT NULL,
  	"content" jsonb NOT NULL,
  	"read_time" numeric,
  	"status" "enum_blog_status" DEFAULT 'draft' NOT NULL,
  	"published_date" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"destinations_id" integer,
  	"tours_id" integer
  );
  
  CREATE TABLE "team_members_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"skill" varchar
  );
  
  CREATE TABLE "team_members_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"certification" varchar,
  	"year" numeric
  );
  
  CREATE TABLE "team_members_languages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" varchar
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"position" varchar NOT NULL,
  	"department" "enum_team_members_department",
  	"photo_id" integer NOT NULL,
  	"bio" jsonb,
  	"experience_years" numeric,
  	"experience_description" varchar,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"social_media_linkedin" varchar,
  	"social_media_facebook" varchar,
  	"featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "csr_projects_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "csr_projects_objectives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"objective" varchar NOT NULL
  );
  
  CREATE TABLE "csr_projects_impact_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"metric" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "csr_projects_timeline_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"milestone" varchar,
  	"date" timestamp(3) with time zone,
  	"completed" boolean DEFAULT false
  );
  
  CREATE TABLE "csr_projects_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"partner_name" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE "csr_projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "enum_csr_projects_category" NOT NULL,
  	"description" jsonb NOT NULL,
  	"short_description" varchar,
  	"featured_image_id" integer NOT NULL,
  	"impact_beneficiaries" numeric,
  	"impact_description" jsonb,
  	"timeline_start_date" timestamp(3) with time zone NOT NULL,
  	"timeline_end_date" timestamp(3) with time zone,
  	"location_region" varchar,
  	"location_specific_location" varchar,
  	"how_to_contribute" jsonb,
  	"status" "enum_csr_projects_status" DEFAULT 'active' NOT NULL,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "special_services_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "special_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "special_services_what_we_offer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"offering" varchar
  );
  
  CREATE TABLE "special_services_sample_itinerary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" numeric,
  	"title" varchar,
  	"description" jsonb
  );
  
  CREATE TABLE "special_services_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL
  );
  
  CREATE TABLE "special_services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"service_name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"service_type" "enum_special_services_service_type" NOT NULL,
  	"description" jsonb NOT NULL,
  	"short_description" varchar NOT NULL,
  	"featured_image_id" integer NOT NULL,
  	"pricing_pricing_model" "enum_special_services_pricing_pricing_model",
  	"pricing_starting_price" numeric,
  	"pricing_currency" varchar DEFAULT 'USD',
  	"pricing_pricing_note" varchar,
  	"requirements" jsonb,
  	"contact_info_contact_person" varchar,
  	"contact_info_email" varchar,
  	"contact_info_phone" varchar,
  	"featured" boolean DEFAULT false,
  	"status" "enum_special_services_status" DEFAULT 'active' NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "special_services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "fleet_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "fleet_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "fleet_safety_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "fleet_available_for" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"service_type" "enum_fleet_available_for_service_type"
  );
  
  CREATE TABLE "fleet" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"vehicle_name" varchar NOT NULL,
  	"vehicle_type" "enum_fleet_vehicle_type" NOT NULL,
  	"description" jsonb,
  	"capacity_passengers" numeric NOT NULL,
  	"capacity_luggage" varchar,
  	"specifications_make" varchar,
  	"specifications_model" varchar,
  	"specifications_year" numeric,
  	"specifications_registration_number" varchar,
  	"status" "enum_fleet_status" DEFAULT 'active' NOT NULL,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "newsletter_subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"subscribed_at" timestamp(3) with time zone NOT NULL,
  	"status" "enum_newsletter_subscribers_status" DEFAULT 'active' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tour_questions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"question" varchar NOT NULL,
  	"tour_id" integer NOT NULL,
  	"status" "enum_tour_questions_status" DEFAULT 'pending' NOT NULL,
  	"admin_answer" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"destinations_id" integer,
  	"tours_id" integer,
  	"activity_categories_id" integer,
  	"testimonials_id" integer,
  	"bookings_id" integer,
  	"blog_id" integer,
  	"team_members_id" integer,
  	"csr_projects_id" integer,
  	"special_services_id" integer,
  	"fleet_id" integer,
  	"newsletter_subscribers_id" integer,
  	"tour_questions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "destinations_gallery" ADD CONSTRAINT "destinations_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "destinations_gallery" ADD CONSTRAINT "destinations_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "destinations_highlights" ADD CONSTRAINT "destinations_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "destinations" ADD CONSTRAINT "destinations_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tours_tour_type" ADD CONSTRAINT "tours_tour_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_gallery" ADD CONSTRAINT "tours_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tours_gallery" ADD CONSTRAINT "tours_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_itinerary_meals" ADD CONSTRAINT "tours_itinerary_meals_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tours_itinerary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_itinerary" ADD CONSTRAINT "tours_itinerary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_highlights" ADD CONSTRAINT "tours_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_availability_departure_dates" ADD CONSTRAINT "tours_availability_departure_dates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_faqs" ADD CONSTRAINT "tours_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours" ADD CONSTRAINT "tours_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tours_rels" ADD CONSTRAINT "tours_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_rels" ADD CONSTRAINT "tours_rels_destinations_fk" FOREIGN KEY ("destinations_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_rels" ADD CONSTRAINT "tours_rels_activity_categories_fk" FOREIGN KEY ("activity_categories_id") REFERENCES "public"."activity_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activity_categories" ADD CONSTRAINT "activity_categories_parent_category_id_activity_categories_id_fk" FOREIGN KEY ("parent_category_id") REFERENCES "public"."activity_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activity_categories" ADD CONSTRAINT "activity_categories_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activity_categories" ADD CONSTRAINT "activity_categories_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_customer_photo_id_media_id_fk" FOREIGN KEY ("customer_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_tour_id_tours_id_fk" FOREIGN KEY ("tour_id") REFERENCES "public"."tours"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "bookings_travelers" ADD CONSTRAINT "bookings_travelers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bookings" ADD CONSTRAINT "bookings_tour_id_tours_id_fk" FOREIGN KEY ("tour_id") REFERENCES "public"."tours"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "bookings" ADD CONSTRAINT "bookings_assigned_agent_id_users_id_fk" FOREIGN KEY ("assigned_agent_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_category" ADD CONSTRAINT "blog_category_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_tags" ADD CONSTRAINT "blog_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_rels" ADD CONSTRAINT "blog_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_rels" ADD CONSTRAINT "blog_rels_destinations_fk" FOREIGN KEY ("destinations_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_rels" ADD CONSTRAINT "blog_rels_tours_fk" FOREIGN KEY ("tours_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members_expertise" ADD CONSTRAINT "team_members_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members_certifications" ADD CONSTRAINT "team_members_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members_languages" ADD CONSTRAINT "team_members_languages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "csr_projects_gallery" ADD CONSTRAINT "csr_projects_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "csr_projects_gallery" ADD CONSTRAINT "csr_projects_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."csr_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "csr_projects_objectives" ADD CONSTRAINT "csr_projects_objectives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."csr_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "csr_projects_impact_statistics" ADD CONSTRAINT "csr_projects_impact_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."csr_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "csr_projects_timeline_milestones" ADD CONSTRAINT "csr_projects_timeline_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."csr_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "csr_projects_partners" ADD CONSTRAINT "csr_projects_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "csr_projects_partners" ADD CONSTRAINT "csr_projects_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."csr_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "csr_projects" ADD CONSTRAINT "csr_projects_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "special_services_gallery" ADD CONSTRAINT "special_services_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "special_services_gallery" ADD CONSTRAINT "special_services_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."special_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "special_services_features" ADD CONSTRAINT "special_services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."special_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "special_services_what_we_offer" ADD CONSTRAINT "special_services_what_we_offer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."special_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "special_services_sample_itinerary" ADD CONSTRAINT "special_services_sample_itinerary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."special_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "special_services_faq" ADD CONSTRAINT "special_services_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."special_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "special_services" ADD CONSTRAINT "special_services_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "special_services_rels" ADD CONSTRAINT "special_services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."special_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "special_services_rels" ADD CONSTRAINT "special_services_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fleet_images" ADD CONSTRAINT "fleet_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "fleet_images" ADD CONSTRAINT "fleet_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fleet"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fleet_features" ADD CONSTRAINT "fleet_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fleet"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fleet_safety_features" ADD CONSTRAINT "fleet_safety_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fleet"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fleet_available_for" ADD CONSTRAINT "fleet_available_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fleet"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tour_questions" ADD CONSTRAINT "tour_questions_tour_id_tours_id_fk" FOREIGN KEY ("tour_id") REFERENCES "public"."tours"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_destinations_fk" FOREIGN KEY ("destinations_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tours_fk" FOREIGN KEY ("tours_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_activity_categories_fk" FOREIGN KEY ("activity_categories_id") REFERENCES "public"."activity_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_bookings_fk" FOREIGN KEY ("bookings_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_csr_projects_fk" FOREIGN KEY ("csr_projects_id") REFERENCES "public"."csr_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_special_services_fk" FOREIGN KEY ("special_services_id") REFERENCES "public"."special_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_fleet_fk" FOREIGN KEY ("fleet_id") REFERENCES "public"."fleet"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletter_subscribers_fk" FOREIGN KEY ("newsletter_subscribers_id") REFERENCES "public"."newsletter_subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tour_questions_fk" FOREIGN KEY ("tour_questions_id") REFERENCES "public"."tour_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "destinations_gallery_order_idx" ON "destinations_gallery" USING btree ("_order");
  CREATE INDEX "destinations_gallery_parent_id_idx" ON "destinations_gallery" USING btree ("_parent_id");
  CREATE INDEX "destinations_gallery_image_idx" ON "destinations_gallery" USING btree ("image_id");
  CREATE INDEX "destinations_highlights_order_idx" ON "destinations_highlights" USING btree ("_order");
  CREATE INDEX "destinations_highlights_parent_id_idx" ON "destinations_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "destinations_slug_idx" ON "destinations" USING btree ("slug");
  CREATE INDEX "destinations_featured_image_idx" ON "destinations" USING btree ("featured_image_id");
  CREATE INDEX "destinations_updated_at_idx" ON "destinations" USING btree ("updated_at");
  CREATE INDEX "destinations_created_at_idx" ON "destinations" USING btree ("created_at");
  CREATE INDEX "tours_tour_type_order_idx" ON "tours_tour_type" USING btree ("order");
  CREATE INDEX "tours_tour_type_parent_idx" ON "tours_tour_type" USING btree ("parent_id");
  CREATE INDEX "tours_gallery_order_idx" ON "tours_gallery" USING btree ("_order");
  CREATE INDEX "tours_gallery_parent_id_idx" ON "tours_gallery" USING btree ("_parent_id");
  CREATE INDEX "tours_gallery_image_idx" ON "tours_gallery" USING btree ("image_id");
  CREATE INDEX "tours_itinerary_meals_order_idx" ON "tours_itinerary_meals" USING btree ("order");
  CREATE INDEX "tours_itinerary_meals_parent_idx" ON "tours_itinerary_meals" USING btree ("parent_id");
  CREATE INDEX "tours_itinerary_order_idx" ON "tours_itinerary" USING btree ("_order");
  CREATE INDEX "tours_itinerary_parent_id_idx" ON "tours_itinerary" USING btree ("_parent_id");
  CREATE INDEX "tours_highlights_order_idx" ON "tours_highlights" USING btree ("_order");
  CREATE INDEX "tours_highlights_parent_id_idx" ON "tours_highlights" USING btree ("_parent_id");
  CREATE INDEX "tours_availability_departure_dates_order_idx" ON "tours_availability_departure_dates" USING btree ("_order");
  CREATE INDEX "tours_availability_departure_dates_parent_id_idx" ON "tours_availability_departure_dates" USING btree ("_parent_id");
  CREATE INDEX "tours_faqs_order_idx" ON "tours_faqs" USING btree ("_order");
  CREATE INDEX "tours_faqs_parent_id_idx" ON "tours_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "tours_slug_idx" ON "tours" USING btree ("slug");
  CREATE INDEX "tours_featured_image_idx" ON "tours" USING btree ("featured_image_id");
  CREATE INDEX "tours_updated_at_idx" ON "tours" USING btree ("updated_at");
  CREATE INDEX "tours_created_at_idx" ON "tours" USING btree ("created_at");
  CREATE INDEX "tours_rels_order_idx" ON "tours_rels" USING btree ("order");
  CREATE INDEX "tours_rels_parent_idx" ON "tours_rels" USING btree ("parent_id");
  CREATE INDEX "tours_rels_path_idx" ON "tours_rels" USING btree ("path");
  CREATE INDEX "tours_rels_destinations_id_idx" ON "tours_rels" USING btree ("destinations_id");
  CREATE INDEX "tours_rels_activity_categories_id_idx" ON "tours_rels" USING btree ("activity_categories_id");
  CREATE UNIQUE INDEX "activity_categories_slug_idx" ON "activity_categories" USING btree ("slug");
  CREATE INDEX "activity_categories_parent_category_idx" ON "activity_categories" USING btree ("parent_category_id");
  CREATE INDEX "activity_categories_icon_idx" ON "activity_categories" USING btree ("icon_id");
  CREATE INDEX "activity_categories_featured_image_idx" ON "activity_categories" USING btree ("featured_image_id");
  CREATE INDEX "activity_categories_updated_at_idx" ON "activity_categories" USING btree ("updated_at");
  CREATE INDEX "activity_categories_created_at_idx" ON "activity_categories" USING btree ("created_at");
  CREATE INDEX "testimonials_customer_photo_idx" ON "testimonials" USING btree ("customer_photo_id");
  CREATE INDEX "testimonials_tour_idx" ON "testimonials" USING btree ("tour_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "bookings_travelers_order_idx" ON "bookings_travelers" USING btree ("_order");
  CREATE INDEX "bookings_travelers_parent_id_idx" ON "bookings_travelers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "bookings_booking_reference_idx" ON "bookings" USING btree ("booking_reference");
  CREATE INDEX "bookings_tour_idx" ON "bookings" USING btree ("tour_id");
  CREATE INDEX "bookings_assigned_agent_idx" ON "bookings" USING btree ("assigned_agent_id");
  CREATE INDEX "bookings_updated_at_idx" ON "bookings" USING btree ("updated_at");
  CREATE INDEX "bookings_created_at_idx" ON "bookings" USING btree ("created_at");
  CREATE INDEX "blog_category_order_idx" ON "blog_category" USING btree ("order");
  CREATE INDEX "blog_category_parent_idx" ON "blog_category" USING btree ("parent_id");
  CREATE INDEX "blog_tags_order_idx" ON "blog_tags" USING btree ("_order");
  CREATE INDEX "blog_tags_parent_id_idx" ON "blog_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blog_slug_idx" ON "blog" USING btree ("slug");
  CREATE INDEX "blog_author_idx" ON "blog" USING btree ("author_id");
  CREATE INDEX "blog_featured_image_idx" ON "blog" USING btree ("featured_image_id");
  CREATE INDEX "blog_updated_at_idx" ON "blog" USING btree ("updated_at");
  CREATE INDEX "blog_created_at_idx" ON "blog" USING btree ("created_at");
  CREATE INDEX "blog_rels_order_idx" ON "blog_rels" USING btree ("order");
  CREATE INDEX "blog_rels_parent_idx" ON "blog_rels" USING btree ("parent_id");
  CREATE INDEX "blog_rels_path_idx" ON "blog_rels" USING btree ("path");
  CREATE INDEX "blog_rels_destinations_id_idx" ON "blog_rels" USING btree ("destinations_id");
  CREATE INDEX "blog_rels_tours_id_idx" ON "blog_rels" USING btree ("tours_id");
  CREATE INDEX "team_members_expertise_order_idx" ON "team_members_expertise" USING btree ("_order");
  CREATE INDEX "team_members_expertise_parent_id_idx" ON "team_members_expertise" USING btree ("_parent_id");
  CREATE INDEX "team_members_certifications_order_idx" ON "team_members_certifications" USING btree ("_order");
  CREATE INDEX "team_members_certifications_parent_id_idx" ON "team_members_certifications" USING btree ("_parent_id");
  CREATE INDEX "team_members_languages_order_idx" ON "team_members_languages" USING btree ("_order");
  CREATE INDEX "team_members_languages_parent_id_idx" ON "team_members_languages" USING btree ("_parent_id");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "csr_projects_gallery_order_idx" ON "csr_projects_gallery" USING btree ("_order");
  CREATE INDEX "csr_projects_gallery_parent_id_idx" ON "csr_projects_gallery" USING btree ("_parent_id");
  CREATE INDEX "csr_projects_gallery_image_idx" ON "csr_projects_gallery" USING btree ("image_id");
  CREATE INDEX "csr_projects_objectives_order_idx" ON "csr_projects_objectives" USING btree ("_order");
  CREATE INDEX "csr_projects_objectives_parent_id_idx" ON "csr_projects_objectives" USING btree ("_parent_id");
  CREATE INDEX "csr_projects_impact_statistics_order_idx" ON "csr_projects_impact_statistics" USING btree ("_order");
  CREATE INDEX "csr_projects_impact_statistics_parent_id_idx" ON "csr_projects_impact_statistics" USING btree ("_parent_id");
  CREATE INDEX "csr_projects_timeline_milestones_order_idx" ON "csr_projects_timeline_milestones" USING btree ("_order");
  CREATE INDEX "csr_projects_timeline_milestones_parent_id_idx" ON "csr_projects_timeline_milestones" USING btree ("_parent_id");
  CREATE INDEX "csr_projects_partners_order_idx" ON "csr_projects_partners" USING btree ("_order");
  CREATE INDEX "csr_projects_partners_parent_id_idx" ON "csr_projects_partners" USING btree ("_parent_id");
  CREATE INDEX "csr_projects_partners_logo_idx" ON "csr_projects_partners" USING btree ("logo_id");
  CREATE UNIQUE INDEX "csr_projects_slug_idx" ON "csr_projects" USING btree ("slug");
  CREATE INDEX "csr_projects_featured_image_idx" ON "csr_projects" USING btree ("featured_image_id");
  CREATE INDEX "csr_projects_updated_at_idx" ON "csr_projects" USING btree ("updated_at");
  CREATE INDEX "csr_projects_created_at_idx" ON "csr_projects" USING btree ("created_at");
  CREATE INDEX "special_services_gallery_order_idx" ON "special_services_gallery" USING btree ("_order");
  CREATE INDEX "special_services_gallery_parent_id_idx" ON "special_services_gallery" USING btree ("_parent_id");
  CREATE INDEX "special_services_gallery_image_idx" ON "special_services_gallery" USING btree ("image_id");
  CREATE INDEX "special_services_features_order_idx" ON "special_services_features" USING btree ("_order");
  CREATE INDEX "special_services_features_parent_id_idx" ON "special_services_features" USING btree ("_parent_id");
  CREATE INDEX "special_services_what_we_offer_order_idx" ON "special_services_what_we_offer" USING btree ("_order");
  CREATE INDEX "special_services_what_we_offer_parent_id_idx" ON "special_services_what_we_offer" USING btree ("_parent_id");
  CREATE INDEX "special_services_sample_itinerary_order_idx" ON "special_services_sample_itinerary" USING btree ("_order");
  CREATE INDEX "special_services_sample_itinerary_parent_id_idx" ON "special_services_sample_itinerary" USING btree ("_parent_id");
  CREATE INDEX "special_services_faq_order_idx" ON "special_services_faq" USING btree ("_order");
  CREATE INDEX "special_services_faq_parent_id_idx" ON "special_services_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "special_services_slug_idx" ON "special_services" USING btree ("slug");
  CREATE INDEX "special_services_featured_image_idx" ON "special_services" USING btree ("featured_image_id");
  CREATE INDEX "special_services_updated_at_idx" ON "special_services" USING btree ("updated_at");
  CREATE INDEX "special_services_created_at_idx" ON "special_services" USING btree ("created_at");
  CREATE INDEX "special_services_rels_order_idx" ON "special_services_rels" USING btree ("order");
  CREATE INDEX "special_services_rels_parent_idx" ON "special_services_rels" USING btree ("parent_id");
  CREATE INDEX "special_services_rels_path_idx" ON "special_services_rels" USING btree ("path");
  CREATE INDEX "special_services_rels_testimonials_id_idx" ON "special_services_rels" USING btree ("testimonials_id");
  CREATE INDEX "fleet_images_order_idx" ON "fleet_images" USING btree ("_order");
  CREATE INDEX "fleet_images_parent_id_idx" ON "fleet_images" USING btree ("_parent_id");
  CREATE INDEX "fleet_images_image_idx" ON "fleet_images" USING btree ("image_id");
  CREATE INDEX "fleet_features_order_idx" ON "fleet_features" USING btree ("_order");
  CREATE INDEX "fleet_features_parent_id_idx" ON "fleet_features" USING btree ("_parent_id");
  CREATE INDEX "fleet_safety_features_order_idx" ON "fleet_safety_features" USING btree ("_order");
  CREATE INDEX "fleet_safety_features_parent_id_idx" ON "fleet_safety_features" USING btree ("_parent_id");
  CREATE INDEX "fleet_available_for_order_idx" ON "fleet_available_for" USING btree ("_order");
  CREATE INDEX "fleet_available_for_parent_id_idx" ON "fleet_available_for" USING btree ("_parent_id");
  CREATE INDEX "fleet_updated_at_idx" ON "fleet" USING btree ("updated_at");
  CREATE INDEX "fleet_created_at_idx" ON "fleet" USING btree ("created_at");
  CREATE UNIQUE INDEX "newsletter_subscribers_email_idx" ON "newsletter_subscribers" USING btree ("email");
  CREATE INDEX "newsletter_subscribers_updated_at_idx" ON "newsletter_subscribers" USING btree ("updated_at");
  CREATE INDEX "newsletter_subscribers_created_at_idx" ON "newsletter_subscribers" USING btree ("created_at");
  CREATE INDEX "tour_questions_tour_idx" ON "tour_questions" USING btree ("tour_id");
  CREATE INDEX "tour_questions_updated_at_idx" ON "tour_questions" USING btree ("updated_at");
  CREATE INDEX "tour_questions_created_at_idx" ON "tour_questions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_destinations_id_idx" ON "payload_locked_documents_rels" USING btree ("destinations_id");
  CREATE INDEX "payload_locked_documents_rels_tours_id_idx" ON "payload_locked_documents_rels" USING btree ("tours_id");
  CREATE INDEX "payload_locked_documents_rels_activity_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("activity_categories_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_bookings_id_idx" ON "payload_locked_documents_rels" USING btree ("bookings_id");
  CREATE INDEX "payload_locked_documents_rels_blog_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_csr_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("csr_projects_id");
  CREATE INDEX "payload_locked_documents_rels_special_services_id_idx" ON "payload_locked_documents_rels" USING btree ("special_services_id");
  CREATE INDEX "payload_locked_documents_rels_fleet_id_idx" ON "payload_locked_documents_rels" USING btree ("fleet_id");
  CREATE INDEX "payload_locked_documents_rels_newsletter_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("newsletter_subscribers_id");
  CREATE INDEX "payload_locked_documents_rels_tour_questions_id_idx" ON "payload_locked_documents_rels" USING btree ("tour_questions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "destinations_gallery" CASCADE;
  DROP TABLE "destinations_highlights" CASCADE;
  DROP TABLE "destinations" CASCADE;
  DROP TABLE "tours_tour_type" CASCADE;
  DROP TABLE "tours_gallery" CASCADE;
  DROP TABLE "tours_itinerary_meals" CASCADE;
  DROP TABLE "tours_itinerary" CASCADE;
  DROP TABLE "tours_highlights" CASCADE;
  DROP TABLE "tours_availability_departure_dates" CASCADE;
  DROP TABLE "tours_faqs" CASCADE;
  DROP TABLE "tours" CASCADE;
  DROP TABLE "tours_rels" CASCADE;
  DROP TABLE "activity_categories" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "bookings_travelers" CASCADE;
  DROP TABLE "bookings" CASCADE;
  DROP TABLE "blog_category" CASCADE;
  DROP TABLE "blog_tags" CASCADE;
  DROP TABLE "blog" CASCADE;
  DROP TABLE "blog_rels" CASCADE;
  DROP TABLE "team_members_expertise" CASCADE;
  DROP TABLE "team_members_certifications" CASCADE;
  DROP TABLE "team_members_languages" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "csr_projects_gallery" CASCADE;
  DROP TABLE "csr_projects_objectives" CASCADE;
  DROP TABLE "csr_projects_impact_statistics" CASCADE;
  DROP TABLE "csr_projects_timeline_milestones" CASCADE;
  DROP TABLE "csr_projects_partners" CASCADE;
  DROP TABLE "csr_projects" CASCADE;
  DROP TABLE "special_services_gallery" CASCADE;
  DROP TABLE "special_services_features" CASCADE;
  DROP TABLE "special_services_what_we_offer" CASCADE;
  DROP TABLE "special_services_sample_itinerary" CASCADE;
  DROP TABLE "special_services_faq" CASCADE;
  DROP TABLE "special_services" CASCADE;
  DROP TABLE "special_services_rels" CASCADE;
  DROP TABLE "fleet_images" CASCADE;
  DROP TABLE "fleet_features" CASCADE;
  DROP TABLE "fleet_safety_features" CASCADE;
  DROP TABLE "fleet_available_for" CASCADE;
  DROP TABLE "fleet" CASCADE;
  DROP TABLE "newsletter_subscribers" CASCADE;
  DROP TABLE "tour_questions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_destinations_continent";
  DROP TYPE "public"."enum_tours_tour_type";
  DROP TYPE "public"."enum_tours_itinerary_meals";
  DROP TYPE "public"."enum_tours_availability_departure_dates_status";
  DROP TYPE "public"."enum_tours_difficulty";
  DROP TYPE "public"."enum_tours_status";
  DROP TYPE "public"."enum_activity_categories_category_type";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum_bookings_payment_status";
  DROP TYPE "public"."enum_bookings_payment_method";
  DROP TYPE "public"."enum_bookings_status";
  DROP TYPE "public"."enum_bookings_seat_hold_status";
  DROP TYPE "public"."enum_blog_category";
  DROP TYPE "public"."enum_blog_status";
  DROP TYPE "public"."enum_team_members_department";
  DROP TYPE "public"."enum_csr_projects_category";
  DROP TYPE "public"."enum_csr_projects_status";
  DROP TYPE "public"."enum_special_services_service_type";
  DROP TYPE "public"."enum_special_services_pricing_pricing_model";
  DROP TYPE "public"."enum_special_services_status";
  DROP TYPE "public"."enum_fleet_available_for_service_type";
  DROP TYPE "public"."enum_fleet_vehicle_type";
  DROP TYPE "public"."enum_fleet_status";
  DROP TYPE "public"."enum_newsletter_subscribers_status";
  DROP TYPE "public"."enum_tour_questions_status";`)
}
