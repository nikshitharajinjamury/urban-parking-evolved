
import React, { useState, useEffect } from 'react';
import { PARKING_LOCATIONS, ParkingSpot } from './parking/ParkingData';
import ParkingLocationMarker from './parking/ParkingLocationMarker';
import UserLocationMarker from './parking/UserLocationMarker';
import MapLegend from './parking/MapLegend';
import LocationInfoPanel from './parking/LocationInfoPanel';
import NavigationControl from './parking/NavigationControl';
import MapGrid from './parking/MapGrid';

interface ParkingMapProps {
  onSelectLocation?: (location: ParkingSpot) => void;
}

const ParkingMap: React.FC<ParkingMapProps> = ({ onSelectLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState<ParkingSpot | null>(null);
  const [userLocation, setUserLocation] = useState({ lat: 40, lng: 40 });
  
  // Simulate getting user's location
  useEffect(() => {
    // In a real app, we would use browser geolocation
    const timer = setTimeout(() => {
      setUserLocation({ lat: 45, lng: 45 });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleLocationClick = (location: ParkingSpot) => {
    setSelectedLocation(location);
    if (onSelectLocation) {
      onSelectLocation(location);
    }
  };
  
  return (
    <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-md">
      <NavigationControl />
      <MapLegend />
      
      {/* This is a simplified map representation. In a real app, you'd use Google Maps, Mapbox, etc. */}
      <div className="map-container relative bg-white">
        <MapGrid />
        
        {/* User location marker */}
        <UserLocationMarker lat={userLocation.lat} lng={userLocation.lng} />
        
        {/* Parking spots */}
        {PARKING_LOCATIONS.map((location) => (
          <ParkingLocationMarker
            key={location.id}
            id={location.id}
            name={location.name}
            lat={location.lat}
            lng={location.lng}
            available={location.available}
            total={location.total}
            pricePerHour={location.pricePerHour}
            spotNames={location.spotNames}
            features={location.features}
            isSelected={selectedLocation?.id === location.id}
            onClick={() => handleLocationClick(location)}
          />
        ))}
      </div>
      
      {/* Selected Location Info */}
      {selectedLocation && <LocationInfoPanel location={selectedLocation} />}
    </div>
  );
};

export default ParkingMap;
