import { ParkingSpot, Service } from '@/types/parking';

// Parking spot types and durations for selection
export const DURATION_OPTIONS = [
  { value: 1, label: '1h' },
  { value: 2, label: '2h' },
  { value: 3, label: '3h' },
  { value: 4, label: '4h' },
  { value: 5, label: '5h' },
  { value: 8, label: '8h' },
  { value: 12, label: '12h' },
  { value: 24, label: '24h' },
];

// Types of parking spots
export const SPOT_TYPES = [
  {
    name: 'standard',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    name: 'premium',
    color: 'bg-purple-100 text-purple-800'
  },
  {
    name: 'valet',
    color: 'bg-green-100 text-green-800'
  }
];

// Available parking spots
export const PARKING_SPOTS: ParkingSpot[] = [
  {
    id: '0573a50b-21df-4d28-af39-77aad96ca73e',
    name: 'B-5',
    location_id: '',
    price_per_hour: 50,
    status: 'available',
    type: 'standard',
    available: true
  },
  {
    id: '06637a43-8e9f-40f1-8b6c-219370413f5a',
    name: 'B-10',
    location_id: '',
    price_per_hour: 50,
    status: 'available',
    type: 'standard',
    available: true
  },
  {
    id: '11aed483-2c38-4371-9a5d-310b72e1aceb',
    name: 'B-2',
    location_id: '',
    price_per_hour: 80,
    status: 'available',
    type: 'standard',
    available: true
  },
  {
    id: '175af635-5699-43cd-b381-d6425cd5ddcd',
    name: 'B-3',
    location_id: '',
    price_per_hour: 80,
    status: 'available',
    type: 'standard',
    available: true
  },
  {
    id: '1e736930-291f-4706-ba82-3714d2d6d5ba',
    name: 'B-3',
    location_id: '',
    price_per_hour: 80,
    status: 'available',
    type: 'standard',
    available: true
  },
  {
    id: '70158b87-398f-4c28-9e85-190b518c5ebf',
    name: 'B-8',
    location_id: '',
    price_per_hour: 50,
    status: 'available',
    type: 'standard',
    available: true
  },
  {
    id: '7cde3405-d948-4596-be71-24d9c9208da8',
    name: 'B-5',
    location_id: '',
    price_per_hour: 50,
    status: 'available',
    type: 'standard',
    available: true
  },
  {
    id: '8302dfa3-d2e0-4db0-af4c-5e368e12d96c',
    name: 'B-2',
    location_id: '',
    price_per_hour: 80,
    status: 'available',
    type: 'standard',
    available: true
  },
  {
    id: '910d9c48-7f8f-4ac1-b59b-b494eb2737b5',
    name: 'B-1',
    location_id: '',
    price_per_hour: 50,
    status: 'available',
    type: 'standard',
    available: true
  },
  {
    id: '9824c0b8-49f7-45bf-af62-8f4927edf3db',
    name: 'B-9',
    location_id: '',
    price_per_hour: 50,
    status: 'available',
    type: 'standard',
    available: true
  }
];

// Additional services options
export const ADDITIONAL_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Car Wash',
    price: 299,
    icon: 'car-wash'
  },
  {
    id: '2',
    name: 'Interior Cleaning',
    price: 199,
    icon: 'cleaning'
  },
  {
    id: '3',
    name: 'Oil Check',
    price: 99,
    icon: 'oil'
  },
  { id: 'fuel', name: 'Fuel Refill', price: 'Market Price', icon: 'fuel' },
  { id: 'air', name: 'Tire Air Check', price: 50, icon: 'circle-check' },
  { id: 'repair', name: 'Minor Repairs', price: 'Varies', icon: 'circle-help' },
];

// Subscription plans
export const SUBSCRIPTION_PLANS = [
  { 
    id: 'basic', 
    name: 'Basic', 
    price: 800, 
    period: 'month',
    details: 'Unlimited parking up to 3 hours/day'
  },
  { 
    id: 'premium', 
    name: 'Premium', 
    price: 1500, 
    period: 'month',
    details: 'Unlimited parking with valet service'
  },
  { 
    id: 'yearly', 
    name: 'Yearly Basic', 
    price: 8000, 
    period: 'year',
    details: 'Save ₹1,600 with yearly subscription'
  }
];
