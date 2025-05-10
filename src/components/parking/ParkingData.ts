
// Mock data for parking locations with specific spots in Hyderabad, India
export const PARKING_LOCATIONS = [
  { 
    id: 1, 
    name: "Hitech City Parking Complex", 
    lat: 17.4435, 
    lng: 78.3772, 
    available: 15, 
    total: 50, 
    pricePerHour: 40, 
    spotNames: ["A-Block", "B-Block", "Premium", "Reserved", "VIP"],
    features: ["CCTV", "24/7 Security", "Covered Parking"]
  },
  { 
    id: 2, 
    name: "Jubilee Hills Mall Parking", 
    lat: 17.4315, 
    lng: 78.4069, 
    available: 8, 
    total: 100, 
    pricePerHour: 30, 
    spotNames: ["Level-1", "Level-2", "Premium", "Executive"],
    features: ["Car Wash Available", "EV Charging"]
  },
  { 
    id: 3, 
    name: "Gachibowli Stadium Parking", 
    lat: 17.4241, 
    lng: 78.3497, 
    available: 0, 
    total: 30, 
    pricePerHour: 20, 
    spotNames: ["East Wing", "West Wing", "South Block"],
    features: ["Open Parking"]
  },
  { 
    id: 4, 
    name: "Banjara Hills Garage", 
    lat: 17.4176, 
    lng: 78.4482, 
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
