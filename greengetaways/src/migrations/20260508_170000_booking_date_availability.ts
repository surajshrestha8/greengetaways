import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'enum_tours_availability_departure_dates_status'
      ) THEN
        CREATE TYPE "public"."enum_tours_availability_departure_dates_status" AS ENUM (
          'available',
          'sold-out',
          'blocked',
          'private-only'
        );
      END IF;
    END $$;

    ALTER TABLE "tours_availability_departure_dates"
      ADD COLUMN IF NOT EXISTS "status" "public"."enum_tours_availability_departure_dates_status" DEFAULT 'available';

    ALTER TABLE "tours_availability_departure_dates"
      ADD COLUMN IF NOT EXISTS "note" varchar;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'enum_bookings_seat_hold_status'
      ) THEN
        CREATE TYPE "public"."enum_bookings_seat_hold_status" AS ENUM (
          'held',
          'released',
          'not-applicable'
        );
      END IF;
    END $$;

    ALTER TABLE "bookings"
      ADD COLUMN IF NOT EXISTS "seat_hold_status" "public"."enum_bookings_seat_hold_status" DEFAULT 'not-applicable';

    ALTER TABLE "bookings"
      ADD COLUMN IF NOT EXISTS "seat_hold_seats" numeric DEFAULT 0;

    ALTER TABLE "bookings"
      ADD COLUMN IF NOT EXISTS "seat_hold_released_at" timestamp(3) with time zone;

    ALTER TABLE "bookings"
      ADD COLUMN IF NOT EXISTS "seat_hold_release_reason" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "bookings"
      DROP COLUMN IF EXISTS "seat_hold_release_reason";

    ALTER TABLE "bookings"
      DROP COLUMN IF EXISTS "seat_hold_released_at";

    ALTER TABLE "bookings"
      DROP COLUMN IF EXISTS "seat_hold_seats";

    ALTER TABLE "bookings"
      DROP COLUMN IF EXISTS "seat_hold_status";

    DROP TYPE IF EXISTS "public"."enum_bookings_seat_hold_status";

    ALTER TABLE "tours_availability_departure_dates"
      DROP COLUMN IF EXISTS "note";

    ALTER TABLE "tours_availability_departure_dates"
      DROP COLUMN IF EXISTS "status";

    DROP TYPE IF EXISTS "public"."enum_tours_availability_departure_dates_status";
  `)
}
