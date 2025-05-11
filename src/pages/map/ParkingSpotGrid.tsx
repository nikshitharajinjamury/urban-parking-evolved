
import { ParkingSpot, Service, Booking, ParkingLocation } from '@/types/parking';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IndianRupee, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { PARKING_LOCATIONS } from '@/components/parking/ParkingData';

interface ParkingSpotGridProps {
  spots: ParkingSpot[];
  selectedSpot: ParkingSpot | null;
  onSpotSelect: (spot: ParkingSpot) => void;
  getSpotTypeColor: (type: string) => string;
  selectedLocation?: any;
}

const ParkingSpotGrid: React.FC<ParkingSpotGridProps> = ({ 
  spots, 
  selectedSpot, 
  onSpotSelect,
  getSpotTypeColor,
  selectedLocation 
}) => {
  const [dbSpots, setDbSpots] = useState<ParkingSpot[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter spots based on selected location
  const filterSpotsByLocation = (allSpots: ParkingSpot[]) => {
    if (!selectedLocation) return allSpots;
    
    // In a real app, we would filter by location_id
    // For now, let's simulate this by using the selected location name
    // and dynamically generating spots for that location
    const locationSpots: ParkingSpot[] = [];
    const basePrice = selectedLocation.pricePerHour;
    
    // For each spot type in the location, create a few spots
    if (selectedLocation.spotNames) {
      selectedLocation.spotNames.forEach((spotName: string, spotTypeIndex: number) => {
        // Determine available spots percentage for this section
        const totalSpotsInSection = 5; // 5 spots per section
        const availableRatio = selectedLocation.available / selectedLocation.total;
        const availableSpotsInSection = Math.max(0, Math.round(totalSpotsInSection * availableRatio));
        
        // Generate spots for this section
        for (let i = 0; i < totalSpotsInSection; i++) {
          // Pricing tiers based on spot type
          let spotPrice = basePrice;
          let spotType = 'standard';
          
          if (spotName.toLowerCase().includes('premium') || spotName.toLowerCase().includes('vip')) {
            spotPrice = basePrice * 1.5;
            spotType = 'premium';
          } else if (spotName.toLowerCase().includes('executive') || spotName.toLowerCase().includes('reserved')) {
            spotPrice = basePrice * 1.3;
            spotType = 'executive';
          }
          
          // Randomly assign availability but ensure we match the overall availability
          const isAvailable = i < availableSpotsInSection;
          
          locationSpots.push({
            id: `${selectedLocation.id}-${spotTypeIndex}-${i}`,
            name: `${spotName}-${i+1}`,
            location_id: selectedLocation.id.toString(),
            price_per_hour: spotPrice,
            type: spotType,
            status: isAvailable ? 'available' : 'occupied',
            available: isAvailable,
            dynamic_multiplier: spots[0]?.dynamic_multiplier || 1 // Use the dynamic multiplier from passed spots
          });
        }
      });
    }
    
    return locationSpots;
  };
  
  // Fetch actual parking spots from the database or generate them based on selected location
  useEffect(() => {
    const fetchParkingSpots = async () => {
      try {
        setLoading(true);
        
        // Try to get spots from database first
        const { data, error } = await supabase
          .from('parking_slots')
          .select('*');
        
        if (error) {
          console.error('Error fetching parking spots:', error);
          // On error, fall back to simulated spots
          const locationFilteredSpots = filterSpotsByLocation(spots);
          setDbSpots(locationFilteredSpots);
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
            available: spot.status === 'available',
            dynamic_multiplier: spots.find(s => s.id === spot.id)?.dynamic_multiplier || 1
          }));
          
          // Filter by selected location if needed
          if (selectedLocation) {
            const filteredSpots = formattedSpots.filter(
              spot => spot.location_id === selectedLocation.id.toString()
            );
            setDbSpots(filteredSpots.length > 0 ? filteredSpots : filterSpotsByLocation(spots));
          } else {
            setDbSpots(formattedSpots);
          }
        } else {
          // Fallback to simulated spots if no database spots
          const locationFilteredSpots = filterSpotsByLocation(spots);
          setDbSpots(locationFilteredSpots);
        }
      } catch (err) {
        console.error('Failed to fetch parking spots:', err);
        // On error, fall back to simulated spots
        const locationFilteredSpots = filterSpotsByLocation(spots);
        setDbSpots(locationFilteredSpots);
      } finally {
        setLoading(false);
      }
    };
    
    fetchParkingSpots();
  }, [spots, selectedLocation]);
  
  // Use database spots if available, otherwise use the location-filtered spots
  const displaySpots = dbSpots.length > 0 ? dbSpots : spots;
  
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-purple"></div>
      </div>
    );
  }
  
  if (displaySpots.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No parking spots available. Please select a location from the map.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2 max-h-[300px] overflow-y-auto">
        {displaySpots.map((spot) => {
          const hasDynamicPricing = spot.dynamic_multiplier && spot.dynamic_multiplier !== 1;
          
          return (
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
              <div className="flex justify-between items-center w-full mb-1">
                <span className="font-medium">{spot.name}</span>
                {hasDynamicPricing && <Sparkles className="h-3 w-3 text-amber-500" />}
              </div>
              <span className="text-sm flex items-center gap-1">
                <IndianRupee className="h-3 w-3" />{spot.price_per_hour}/h
              </span>
              <div className={`mt-1 w-full h-2 rounded-full ${spot.available ? 'bg-green-200' : 'bg-red-200'}`}>
                <div 
                  className={`h-full rounded-full ${spot.available ? 'bg-green-500' : 'bg-red-500'}`} 
                  style={{ width: '100%' }} 
                />
              </div>
            </Button>
          );
        })}
      </div>
      
      <div className="flex justify-between text-sm text-muted-foreground px-1 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Occupied</span>
        </div>
        {displaySpots.some(spot => spot.dynamic_multiplier && spot.dynamic_multiplier !== 1) && (
          <div className="flex items-center gap-2">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span>Dynamic pricing</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkingSpotGrid;
