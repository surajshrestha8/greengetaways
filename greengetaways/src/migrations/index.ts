import * as migration_20260508_170000_booking_date_availability from './20260508_170000_booking_date_availability';
import * as migration_20260621_122816 from './20260621_122816';

export const migrations = [
  {
    up: migration_20260508_170000_booking_date_availability.up,
    down: migration_20260508_170000_booking_date_availability.down,
    name: '20260508_170000_booking_date_availability',
  },
  {
    up: migration_20260621_122816.up,
    down: migration_20260621_122816.down,
    name: '20260621_122816'
  },
];
