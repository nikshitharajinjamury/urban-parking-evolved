import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { IndianRupee } from 'lucide-react';
import { Car } from 'lucide-react';
import { ParkingSpot, Service } from '@/types/parking';

interface ReservationSummaryProps {
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

const ReservationSummary: React.FC<ReservationSummaryProps> = ({
  selectedSpot,
  spots,
  date,
  startTime,
  duration,
  additionalServices,
  services,
  calculateTotal,
  handleReservation
}) => {
  if (!selectedSpot) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Car className="w-16 h-16 mx-auto mb-4 opacity-20" />
        <p>Select a parking spot to make a reservation</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium">Selected Spot: {selectedSpot.name}</h3>
        <p className="text-sm text-muted-foreground">
          {date ? format(date, "dd MMM yyyy") : "No date selected"} - {startTime} ({duration} hours)
        </p>
      </div>
      
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Parking Fee</span>
          <span className="flex items-center">
            <IndianRupee className="h-3.5 w-3.5" />
            {spots.find(s => s.id === selectedSpot.id)?.price_per_hour * duration}
          </span>
        </div>
        
        {additionalServices.length > 0 && (
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Additional Services</span>
            <span className="flex items-center">
              <IndianRupee className="h-3.5 w-3.5" />
              {additionalServices.reduce((total, serviceId) => {
                const service = services.find(s => s.id === serviceId);
                return total + (typeof service?.price === 'number' ? service.price : 0);
              }, 0)}
            </span>
          </div>
        )}
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Service Fee</span>
          <span className="flex items-center">
            <IndianRupee className="h-3.5 w-3.5" />20
          </span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2">
          <span>Total</span>
          <span className="flex items-center">
            <IndianRupee className="h-3.5 w-3.5" />{calculateTotal() + 20}
          </span>
        </div>
      </div>
      
      <Button className="w-full" size="lg" onClick={handleReservation}>
        Reserve Now
      </Button>
    </div>
  );
};

export default ReservationSummary;
