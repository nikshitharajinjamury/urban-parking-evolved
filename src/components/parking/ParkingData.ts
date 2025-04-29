
// Mock data for parking locations with specific spots
export const PARKING_LOCATIONS = [
  { 
    id: 1, 
    name: "Downtown Garage", 
    lat: 25, 
    lng: 25, 
    available: 15, 
    total: 50, 
    pricePerHour: 40, 
    spotNames: ["A-Block", "B-Block", "Premium", "Reserved", "VIP"],
    features: ["CCTV", "24/7 Security", "Covered Parking"]
  },
  { 
    id: 2, 
    name: "Central Mall Parking", 
    lat: 35, 
    lng: 60, 
    available: 8, 
    total: 100, 
    pricePerHour: 30, 
    spotNames: ["Level-1", "Level-2", "Premium", "Executive"],
    features: ["Car Wash Available", "EV Charging"]
  },
  { 
    id: 3, 
    name: "Riverside Lot", 
    lat: 70, 
    lng: 40, 
    available: 0, 
    total: 30, 
    pricePerHour: 20, 
    spotNames: ["East Wing", "West Wing", "South Block"],
    features: ["Open Parking"]
  },
  { 
    id: 4, 
    name: "Tech Park Garage", 
    lat: 60, 
    lng: 75, 
    available: 22, 
    total: 75, 
    pricePerHour: 45, 
    spotNames: ["Tower-A", "Tower-B", "Tower-C", "Visitor"],
    features: ["Valet Available", "Car Wash", "Tire Service"]
  },
  { 
    id: 5, 
    name: "North Station Parking", 
    lat: 15, 
    lng: 70, 
    available: 5, 
    total: 25, 
    pricePerHour: 35, 
    spotNames: ["Platform Side", "Exit Side", "Long-term"],
    features: ["Railway Station Access", "Covered Parking"]
  },
  { 
    id: 6, 
    name: "Airport Long-Term", 
    lat: 80, 
    lng: 20, 
    available: 45, 
    total: 200, 
    pricePerHour: 50, 
    spotNames: ["Terminal-1", "Terminal-2", "Economy", "Premium", "Valet"],
    features: ["Shuttle Service", "24/7 Security", "Car Wash"]
  },
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
