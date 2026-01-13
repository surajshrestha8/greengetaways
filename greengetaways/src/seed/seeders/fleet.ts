import { faker } from '@faker-js/faker'
import type { Payload } from 'payload'
import { createRichText, logComplete, logStart, randomInRange } from '../utils'

interface FleetVehicleData {
  vehicleName: string
  vehicleType: 'tourist-bus' | 'mini-van' | 'jeep' | 'car' | 'helicopter' | 'other'
  description: string
  passengers: number
  luggage: string
  features: string[]
  specifications: {
    make: string
    model: string
    year: number
  }
  safetyFeatures: string[]
  availableFor: ('airport-transfer' | 'city-tours' | 'long-distance' | 'private-hire')[]
}

const FLEET_VEHICLES: FleetVehicleData[] = [
  {
    vehicleName: 'Luxury Tourist Coach A1',
    vehicleType: 'tourist-bus',
    description: 'Our flagship tourist coach featuring premium seating, panoramic windows, and entertainment system. Perfect for large group tours and long-distance journeys.',
    passengers: 35,
    luggage: 'Large luggage compartment (35+ large bags)',
    features: ['Air Conditioning', 'Reclining Seats', 'Entertainment System', 'WiFi', 'USB Charging', 'Reading Lights', 'Panoramic Windows'],
    specifications: { make: 'Yutong', model: 'ZK6122H9', year: 2022 },
    safetyFeatures: ['ABS Braking', 'Seat Belts', 'Fire Extinguisher', 'First Aid Kit', 'Emergency Exit', 'GPS Tracking'],
    availableFor: ['long-distance', 'city-tours'],
  },
  {
    vehicleName: 'Luxury Tourist Coach A2',
    vehicleType: 'tourist-bus',
    description: 'Another premium coach in our fleet, maintained to the highest standards for comfortable group travel.',
    passengers: 35,
    luggage: 'Large luggage compartment (35+ large bags)',
    features: ['Air Conditioning', 'Reclining Seats', 'Entertainment System', 'WiFi', 'USB Charging', 'Reading Lights'],
    specifications: { make: 'Yutong', model: 'ZK6122H9', year: 2021 },
    safetyFeatures: ['ABS Braking', 'Seat Belts', 'Fire Extinguisher', 'First Aid Kit', 'Emergency Exit', 'GPS Tracking'],
    availableFor: ['long-distance', 'city-tours'],
  },
  {
    vehicleName: 'Hiace Mini Van Premium',
    vehicleType: 'mini-van',
    description: 'Comfortable 12-seater mini van ideal for small groups and airport transfers. Well-maintained with professional drivers.',
    passengers: 12,
    luggage: 'Rear compartment (12 medium bags)',
    features: ['Air Conditioning', 'Comfortable Seating', 'Luggage Space', 'USB Charging'],
    specifications: { make: 'Toyota', model: 'Hiace', year: 2023 },
    safetyFeatures: ['ABS Braking', 'Seat Belts', 'First Aid Kit', 'GPS Tracking'],
    availableFor: ['airport-transfer', 'city-tours', 'long-distance', 'private-hire'],
  },
  {
    vehicleName: 'Hiace Mini Van Standard',
    vehicleType: 'mini-van',
    description: 'Reliable 12-seater mini van for group transfers and tours.',
    passengers: 12,
    luggage: 'Rear compartment (12 medium bags)',
    features: ['Air Conditioning', 'Comfortable Seating', 'Luggage Space'],
    specifications: { make: 'Toyota', model: 'Hiace', year: 2022 },
    safetyFeatures: ['ABS Braking', 'Seat Belts', 'First Aid Kit', 'GPS Tracking'],
    availableFor: ['airport-transfer', 'city-tours', 'long-distance'],
  },
  {
    vehicleName: 'Scorpio 4x4 Adventure',
    vehicleType: 'jeep',
    description: 'Rugged 4x4 vehicle perfect for off-road adventures and mountain road transfers. Ideal for Upper Mustang and other remote areas.',
    passengers: 7,
    luggage: 'Roof rack + rear space (7 bags)',
    features: ['4x4 Drive', 'Air Conditioning', 'High Clearance', 'Roof Rack', 'USB Charging'],
    specifications: { make: 'Mahindra', model: 'Scorpio S11', year: 2023 },
    safetyFeatures: ['4WD System', 'Seat Belts', 'First Aid Kit', 'Recovery Equipment', 'GPS Tracking'],
    availableFor: ['long-distance', 'private-hire'],
  },
  {
    vehicleName: 'Bolero 4x4 Mountain',
    vehicleType: 'jeep',
    description: 'Tough and reliable 4x4 for mountain roads and remote area access.',
    passengers: 7,
    luggage: 'Roof rack + rear space (7 bags)',
    features: ['4x4 Drive', 'High Clearance', 'Roof Rack'],
    specifications: { make: 'Mahindra', model: 'Bolero', year: 2022 },
    safetyFeatures: ['4WD System', 'Seat Belts', 'First Aid Kit', 'Recovery Equipment'],
    availableFor: ['long-distance', 'private-hire'],
  },
  {
    vehicleName: 'Toyota Fortuner Luxury',
    vehicleType: 'jeep',
    description: 'Premium SUV for VIP transfers and luxury tours. Combines comfort with capability.',
    passengers: 6,
    luggage: 'Rear compartment (4 large bags)',
    features: ['4x4 Drive', 'Leather Seats', 'Climate Control', 'Premium Audio', 'USB Charging', 'Sunroof'],
    specifications: { make: 'Toyota', model: 'Fortuner', year: 2023 },
    safetyFeatures: ['ABS Braking', 'Airbags', 'Seat Belts', 'First Aid Kit', 'GPS Tracking'],
    availableFor: ['airport-transfer', 'city-tours', 'long-distance', 'private-hire'],
  },
  {
    vehicleName: 'Toyota Prado Executive',
    vehicleType: 'jeep',
    description: 'Executive-class SUV for discerning travelers and corporate clients.',
    passengers: 5,
    luggage: 'Spacious boot (4 large bags)',
    features: ['4x4 Drive', 'Leather Interior', 'Climate Control', 'Premium Audio', 'Cooled Seats', 'Entertainment System'],
    specifications: { make: 'Toyota', model: 'Land Cruiser Prado', year: 2022 },
    safetyFeatures: ['ABS Braking', 'Multiple Airbags', 'Seat Belts', 'First Aid Kit', 'GPS Tracking', 'Parking Sensors'],
    availableFor: ['airport-transfer', 'city-tours', 'private-hire'],
  },
  {
    vehicleName: 'Honda CR-V City',
    vehicleType: 'car',
    description: 'Comfortable compact SUV for city tours and airport transfers.',
    passengers: 4,
    luggage: 'Boot space (3 large bags)',
    features: ['Air Conditioning', 'Comfortable Seating', 'USB Charging', 'Bluetooth'],
    specifications: { make: 'Honda', model: 'CR-V', year: 2023 },
    safetyFeatures: ['ABS Braking', 'Airbags', 'Seat Belts', 'First Aid Kit'],
    availableFor: ['airport-transfer', 'city-tours', 'private-hire'],
  },
  {
    vehicleName: 'Eurocopter Everest Explorer',
    vehicleType: 'helicopter',
    description: 'High-altitude helicopter for Everest tours, mountain flights, and emergency evacuations. Experienced pilots with thousands of mountain flying hours.',
    passengers: 5,
    luggage: 'Limited (hand luggage only)',
    features: ['Panoramic Windows', 'Intercom System', 'Climate Control', 'High Altitude Certified'],
    specifications: { make: 'Airbus', model: 'AS350 B3e', year: 2020 },
    safetyFeatures: ['Twin Engine Safety', 'Emergency Beacon', 'First Aid Kit', 'Survival Equipment', 'Satellite Communication'],
    availableFor: ['private-hire'],
  },
  {
    vehicleName: 'Bell Mountain Ranger',
    vehicleType: 'helicopter',
    description: 'Reliable helicopter for scenic flights and charter services.',
    passengers: 4,
    luggage: 'Limited (hand luggage only)',
    features: ['Panoramic Windows', 'Intercom System', 'High Altitude Operations'],
    specifications: { make: 'Bell', model: '407', year: 2019 },
    safetyFeatures: ['Emergency Beacon', 'First Aid Kit', 'Survival Equipment', 'GPS Navigation'],
    availableFor: ['private-hire'],
  },
  {
    vehicleName: 'Mercedes Sprinter VIP',
    vehicleType: 'other',
    description: 'Luxury VIP van with executive seating configuration for corporate and premium group transfers.',
    passengers: 8,
    luggage: 'Separate compartment (8 large bags)',
    features: ['Executive Seating', 'Table', 'WiFi', 'Mini Fridge', 'Premium Audio', 'Privacy Glass', 'USB Charging'],
    specifications: { make: 'Mercedes-Benz', model: 'Sprinter 516', year: 2022 },
    safetyFeatures: ['ABS Braking', 'Airbags', 'Seat Belts', 'First Aid Kit', 'GPS Tracking'],
    availableFor: ['airport-transfer', 'city-tours', 'private-hire'],
  },
]

export async function seedFleet(payload: Payload, mediaId: number): Promise<number[]> {
  logStart('Fleet')
  const fleetIds: number[] = []

  for (const vehicle of FLEET_VEHICLES) {
    const regPrefix = vehicle.vehicleType === 'helicopter' ? '9N-' : 'BA '
    const regNum = vehicle.vehicleType === 'helicopter'
      ? `A${faker.string.alpha({ length: 2, casing: 'upper' })}${faker.string.numeric(1)}`
      : `${randomInRange(1, 99)} PA ${randomInRange(1000, 9999)}`

    const fleet = await payload.create({
      collection: 'fleet',
      data: {
        vehicleName: vehicle.vehicleName,
        vehicleType: vehicle.vehicleType,
        images: [{ image: mediaId }],
        description: createRichText(vehicle.description),
        capacity: {
          passengers: vehicle.passengers,
          luggage: vehicle.luggage,
        },
        features: vehicle.features.map((feature) => ({ feature })),
        specifications: {
          ...vehicle.specifications,
          registrationNumber: `${regPrefix}${regNum}`,
        },
        safetyFeatures: vehicle.safetyFeatures.map((feature) => ({ feature })),
        status: Math.random() > 0.9 ? 'maintenance' : 'active',
        availableFor: vehicle.availableFor.map((serviceType) => ({ serviceType })),
        featured: fleetIds.length < 4,
      },
    })
    fleetIds.push(fleet.id)
  }

  logComplete('Fleet', fleetIds.length)
  return fleetIds
}
