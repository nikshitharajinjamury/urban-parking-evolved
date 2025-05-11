
export interface ParkingSpot {
  id: string;
  name: string;
  location_id: string;
  price_per_hour: number;
  status: 'available' | 'occupied' | 'maintenance';
  type: string;
  available: boolean;
  dynamic_multiplier?: number;
}

export interface BookingPanelProps {
  tab: string;
  setTab: (tab: string) => void;
  selectedSpot: ParkingSpot | null;
  date: Date | undefined;
  startTime: string;
  duration: number;
  additionalServices: string[];
  calculateTotal: () => number;
  handleSubscribe: (planId: string) => void;
  toggleService: (serviceId: string) => void;
}

export interface ReservationSummaryProps {
  selectedSpot: ParkingSpot | null;
  spots: ParkingSpot[];
  date: Date | undefined;
  startTime: string;
  duration: number;
  additionalServices: string[];
  services: Service[];
  calculateTotal: () => number;
  handleReservation: () => void;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  icon: string;
}

export interface Booking {
  id: string;
  user_id: string;
  slot_id: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  total_amount: number;
  payment_status: string;
  created_at?: string;
  parking_slots?: {
    name: string;
    location_id: string;
    parking_locations?: {
      name: string;
      address: string;
    }
  }
}

export interface ParkingLocation {
  id: string;
  name: string;
  address: string;
  total_slots: number;
} 
