
import React, { useState, useEffect } from 'react';
import { PARKING_LOCATIONS, ParkingSpot } from './parking/ParkingData';
import GoogleMap from './parking/GoogleMap';
import LocationInfoPanel from './parking/LocationInfoPanel';

interface ParkingMapProps {
  onSelectLocation?: (location: ParkingSpot) => void;
}

const ParkingMap: React.FC<ParkingMapProps> = ({ onSelectLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState<ParkingSpot | null>(null);
  
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
    }
  };
  
  return (
    <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-md">
      <GoogleMap 
        markers={mapMarkers}
        onMarkerClick={handleMarkerClick}
        selectedMarkerId={selectedLocation?.id}
      />
      
      {/* Selected Location Info */}
      {selectedLocation && <LocationInfoPanel location={selectedLocation} />}
    </div>
  );
};

export default ParkingMap;
