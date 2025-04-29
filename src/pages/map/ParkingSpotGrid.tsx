
import React from 'react';
import { Button } from '@/components/ui/button';
import { IndianRupee } from 'lucide-react';

interface ParkingSpot {
  id: string;
  type: string;
  price: number;
  available: boolean;
}

interface ParkingSpotGridProps {
  spots: ParkingSpot[];
  selectedSpot: string | null;
  handleSelectSpot: (spotId: string) => void;
  getSpotTypeColor: (type: string) => string;
}

const ParkingSpotGrid: React.FC<ParkingSpotGridProps> = ({ 
  spots, 
  selectedSpot, 
  handleSelectSpot,
  getSpotTypeColor 
}) => {
  return (
    <div className="grid grid-cols-4 gap-2 max-h-[300px] overflow-y-auto">
      {spots.map((spot) => (
        <Button
          key={spot.id}
          variant="outline"
          className={`
            h-auto flex flex-col py-3 px-2
            ${!spot.available ? 'opacity-50 cursor-not-allowed' : ''}
            ${selectedSpot === spot.id ? 'ring-2 ring-brand-purple' : ''}
            ${getSpotTypeColor(spot.type)}
          `}
          disabled={!spot.available}
          onClick={() => handleSelectSpot(spot.id)}
        >
          <span className="font-medium">{spot.id}</span>
          <span className="text-sm flex items-center">
            <IndianRupee className="h-3 w-3" />{spot.price}/h
          </span>
        </Button>
      ))}
    </div>
  );
};

export default ParkingSpotGrid;
