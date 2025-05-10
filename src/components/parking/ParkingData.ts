
// Mock data for parking locations with specific spots
export const PARKING_LOCATIONS = [
  { 
    id: 1, 
    name: "Downtown Garage", 
    lat: 37.7749, 
    lng: -122.4194, 
    available: 15, 
    total: 50, 
    pricePerHour: 40, 
    spotNames: ["A-Block", "B-Block", "Premium", "Reserved", "VIP"],
    features: ["CCTV", "24/7 Security", "Covered Parking"]
  },
  { 
    id: 2, 
    name: "Central Mall Parking", 
    lat: 37.7847, 
    lng: -122.4100, 
    available: 8, 
    total: 100, 
    pricePerHour: 30, 
    spotNames: ["Level-1", "Level-2", "Premium", "Executive"],
    features: ["Car Wash Available", "EV Charging"]
  },
  { 
    id: 3, 
    name: "Riverside Lot", 
    lat: 37.7935, 
    lng: -122.3923, 
    available: 0, 
    total: 30, 
    pricePerHour: 20, 
    spotNames: ["East Wing", "West Wing", "South Block"],
    features: ["Open Parking"]
  },
  { 
    id: 4, 
    name: "Tech Park Garage", 
    lat: 37.7815, 
    lng: -122.4060, 
    available: 22, 
    total: 75, 
    pricePerHour: 45, 
    spotNames: ["Tower-A", "Tower-B", "Tower-C", "Visitor"],
    features: ["Valet Available", "Car Wash", "Tire Service"]
  }
];

export interface ParkingSpot {
  id: number;
  name: string;
  lat: number;
  lng: number;
  available: number;
  total: number;
  pricePerHour: number;
  spotNames: string[];
  features: string[];
}
