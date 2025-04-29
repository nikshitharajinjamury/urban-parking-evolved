
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
  { name: 'Standard', color: 'bg-blue-100 text-blue-800' },
  { name: 'Premium', color: 'bg-green-100 text-green-800' },
  { name: 'Valet', color: 'bg-yellow-100 text-yellow-800' },
];

// Available parking spots
export const PARKING_SPOTS = [
  { id: 'B-1', type: 'Standard', price: 40, available: true },
  { id: 'B-2', type: 'Standard', price: 40, available: true },
  { id: 'B-3', type: 'Standard', price: 40, available: true },
  { id: 'B-4', type: 'Standard', price: 40, available: true },
  { id: 'B-5', type: 'Standard', price: 40, available: true },
  { id: 'B-6', type: 'Standard', price: 40, available: false },
  { id: 'B-7', type: 'Standard', price: 40, available: true },
  { id: 'B-8', type: 'Standard', price: 40, available: true },
  { id: 'B-9', type: 'Standard', price: 40, available: false },
  { id: 'B-10', type: 'Standard', price: 40, available: true },
  { id: 'B-11', type: 'Standard', price: 40, available: true },
  { id: 'B-12', type: 'Standard', price: 40, available: true },
  { id: 'B-13', type: 'Premium', price: 70, available: false },
  { id: 'B-14', type: 'Premium', price: 70, available: true },
  { id: 'B-15', type: 'Premium', price: 70, available: true },
  { id: 'B-16', type: 'Premium', price: 70, available: true },
  { id: 'B-17', type: 'Premium', price: 70, available: false },
  { id: 'B-18', type: 'Premium', price: 70, available: false },
  { id: 'B-19', type: 'Valet', price: 100, available: true },
  { id: 'B-20', type: 'Valet', price: 100, available: true },
];

// Additional services options
export const ADDITIONAL_SERVICES = [
  { id: 'fuel', name: 'Fuel Refill', price: 'Market Price', icon: 'fuel' },
  { id: 'wash', name: 'Car Wash', price: 299, icon: 'car-wash' },
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
