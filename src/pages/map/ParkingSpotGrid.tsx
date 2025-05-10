
import { ParkingSpot, Service, Booking, ParkingLocation } from '@/types/parking';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IndianRupee } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ParkingSpotGridProps {
  spots: ParkingSpot[];
  selectedSpot: ParkingSpot | null;
  onSpotSelect: (spot: ParkingSpot) => void;
  getSpotTypeColor: (type: string) => string;
}

const ParkingSpotGrid: React.FC<ParkingSpotGridProps> = ({ 
  spots, 
  selectedSpot, 
  onSpotSelect,
  getSpotTypeColor 
}) => {
  const [dbSpots, setDbSpots] = useState<ParkingSpot[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch actual parking spots from the database
  useEffect(() => {
    const fetchParkingSpots = async () => {
      try {
        const { data, error } = await supabase
          .from('parking_slots')
          .select('*');
        
        if (error) {
          console.error('Error fetching parking spots:', error);
          return;
        }
        
        if (data && data.length > 0) {
          // Map database spots to our component's expected format
          const formattedSpots = data.map(spot => ({
            id: spot.id,
            name: spot.name,
            location_id: spot.location_id,
            price_per_hour: parseFloat(spot.price_per_hour),
            type: spot.type,
            status: spot.status,
            available: spot.status === 'available'
          }));
          
          setDbSpots(formattedSpots);
        } else {
          // Fallback to mock data if no database spots
          setDbSpots(spots.map(spot => ({
            ...spot,
            // Ensure each mock spot has a properly formatted ID
            id: spot.id.toString()
          })));
        }
      } catch (err) {
        console.error('Failed to fetch parking spots:', err);
        setDbSpots(spots);
      } finally {
        setLoading(false);
      }
    };
    
    fetchParkingSpots();
  }, [spots]);
  
  // Use database spots if available, otherwise use the passed-in spots
  const displaySpots = dbSpots.length > 0 ? dbSpots : spots;
  
  if (loading) {
    return <div className="flex justify-center py-8">Loading parking spots...</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-2 max-h-[300px] overflow-y-auto">
      {displaySpots.map((spot) => (
        <Button
          key={spot.id}
          variant="outline"
          className={`
            h-auto flex flex-col py-3 px-2
            ${!spot.available ? 'opacity-50 cursor-not-allowed' : ''}
            ${selectedSpot?.id === spot.id ? 'ring-2 ring-brand-purple' : ''}
            ${getSpotTypeColor(spot.type)}
          `}
          disabled={!spot.available}
          onClick={() => onSpotSelect(spot)}
        >
          <span className="font-medium">{spot.name}</span>
          <span className="text-sm flex items-center">
            <IndianRupee className="h-3 w-3" />{spot.price_per_hour}/h
          </span>
        </Button>
      ))}
    </div>
  );
};

export default ParkingSpotGrid;
