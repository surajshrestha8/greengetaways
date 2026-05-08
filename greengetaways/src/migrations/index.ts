import * as migration_20260508_170000_booking_date_availability from './20260508_170000_booking_date_availability'

export const migrations = [
  {
    up: migration_20260508_170000_booking_date_availability.up,
    down: migration_20260508_170000_booking_date_availability.down,
    name: '20260508_170000_booking_date_availability',
  },
]
