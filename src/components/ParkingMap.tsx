
import React, { useState, useEffect } from 'react';
import { PARKING_LOCATIONS, ParkingSpot } from './parking/ParkingData';
import GoogleMap from './parking/GoogleMap';
import LocationInfoPanel from './parking/LocationInfoPanel';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ParkingMapProps {
  onSelectLocation?: (location: ParkingSpot) => void;
}

const ParkingMap: React.FC<ParkingMapProps> = ({ onSelectLocation }) => {
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState<ParkingSpot | null>(null);
  const [showSlots, setShowSlots] = useState(false);
  
  // Format the parking locations data for the GoogleMap component
  const mapMarkers = PARKING_LOCATIONS.map(location => ({
    id: location.id,
    lat: location.lat,
    lng: location.lng,
    name: location.name,
    available: location.available,
    total: location.total,
    isSelected: selectedLocation?.id === location.id
  }));
  
  const handleMarkerClick = (marker: { id: number }) => {
    const location = PARKING_LOCATIONS.find(loc => loc.id === marker.id);
    if (location) {
      setSelectedLocation(location);
      if (onSelectLocation) {
        onSelectLocation(location);
      }

      // Show a toast notification
      toast({
        title: location.name,
        description: `${location.available} of ${location.total} parking spots available`,
      });
    }
  };
  
  // Close the slots panel
  const handleCloseSlots = () => {
    setShowSlots(false);
  };

  // Open the slots view
  const handleViewSlots = () => {
    setShowSlots(true);
  };
  
  return (
    <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-md">
      <GoogleMap 
        markers={mapMarkers}
        onMarkerClick={handleMarkerClick}
        selectedMarkerId={selectedLocation?.id}
      />
      
      {/* Selected Location Info */}
      {selectedLocation && <LocationInfoPanel location={selectedLocation} onViewSlots={handleViewSlots} />}
      
      {/* Parking Slots Panel */}
      {showSlots && selectedLocation && (
        <div className="absolute top-0 right-0 bottom-0 z-40 w-full md:w-96 bg-white shadow-lg overflow-y-auto transition-all duration-300">
          <div className="p-4 bg-brand-purple text-white flex justify-between items-center">
            <h3 className="font-bold">{selectedLocation.name} - Available Slots</h3>
            <button onClick={handleCloseSlots} className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="p-4">
            <div className="mb-4">
              <span className="text-lg font-medium">{selectedLocation.available} of {selectedLocation.total} spots available</span>
            </div>
            
            {/* Sections/Areas */}
            <div className="space-y-4">
              {selectedLocation.spotNames.map((section, idx) => (
                <Card key={idx} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-3 bg-gray-50 border-b">
                      <span className="font-medium">{section}</span>
                    </div>
                    <div className="p-4 grid grid-cols-4 gap-2">
                      {/* Generate slots for this section */}
                      {Array(5).fill(0).map((_, i) => {
                        // Randomly determine if a spot is available, but ensure some availability
                        // matches the overall availability percentage of the location
                        const availabilityRatio = selectedLocation.available / selectedLocation.total;
                        const isAvailable = Math.random() < availabilityRatio;
                        
                        return (
                          <div 
                            key={i} 
                            className={`p-2 text-center rounded ${
                              isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {section.charAt(0)}-{i+1}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-6 flex justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span>Occupied</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingMap;
