
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Car } from 'lucide-react';

// Mock data for parking locations
const PARKING_LOCATIONS = [
  { id: 1, name: "Downtown Garage", lat: 25, lng: 25, available: 15, total: 50, pricePerHour: 4.99 },
  { id: 2, name: "Central Mall Parking", lat: 35, lng: 60, available: 8, total: 100, pricePerHour: 3.50 },
  { id: 3, name: "Riverside Lot", lat: 70, lng: 40, available: 0, total: 30, pricePerHour: 2.99 },
  { id: 4, name: "Tech Park Garage", lat: 60, lng: 75, available: 22, total: 75, pricePerHour: 5.50 },
  { id: 5, name: "North Station Parking", lat: 15, lng: 70, available: 5, total: 25, pricePerHour: 4.25 },
  { id: 6, name: "Airport Long-Term", lat: 80, lng: 20, available: 45, total: 200, pricePerHour: 6.00 },
];

interface ParkingSpot {
  id: number;
  name: string;
  lat: number;
  lng: number;
  available: number;
  total: number;
  pricePerHour: number;
}

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
      <div className="absolute top-4 left-4 z-10 bg-white rounded-md shadow-md p-2">
        <button className="p-2 hover:bg-gray-100 rounded-md" title="Center map on your location">
          <Navigation size={20} className="text-brand-purple" />
        </button>
      </div>
      
      {/* This is a simplified map representation. In a real app, you'd use Google Maps, Mapbox, etc. */}
      <div className="map-container relative bg-white">
        {/* Simplified map grid background */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border border-gray-100"></div>
          ))}
        </div>
        
        {/* User location marker */}
        <div 
          className="absolute z-20 animate-pulse"
          style={{ 
            left: `${userLocation.lng}%`, 
            top: `${userLocation.lat}%`, 
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="relative">
            <div className="h-5 w-5 bg-blue-500 rounded-full"></div>
            <div className="absolute -inset-1 bg-blue-500 rounded-full opacity-30 animate-ping"></div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-1 rounded whitespace-nowrap">
              You are here
            </div>
          </div>
        </div>
        
        {/* Parking spots */}
        {PARKING_LOCATIONS.map((location) => (
          <div 
            key={location.id}
            className={`absolute z-10 ${location.available > 0 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            style={{ 
              left: `${location.lng}%`, 
              top: `${location.lat}%`, 
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => location.available > 0 && handleLocationClick(location)}
          >
            <div className={`
              flex flex-col items-center
              ${location.id === selectedLocation?.id ? 'scale-110' : ''}
              ${location.available === 0 ? 'opacity-50' : ''}
              transition-all duration-200
            `}>
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center
                ${location.available > 0 ? 'bg-green-500' : 'bg-red-500'}
                ${location.id === selectedLocation?.id ? 'ring-4 ring-brand-purple' : ''}
                shadow-md
              `}>
                <Car size={20} className="text-white" />
              </div>
              <div className="mt-1 bg-white px-2 py-1 rounded-md shadow text-xs font-medium">
                {location.available > 0 ? `${location.available} spots` : 'Full'}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Selected Location Info */}
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-30">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-lg">{selectedLocation.name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <MapPin size={14} />
                <span>2.3 miles away</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${selectedLocation.available > 10 ? 'bg-green-100 text-green-800' : selectedLocation.available > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  {selectedLocation.available > 0 ? `${selectedLocation.available} spots left` : 'No spots available'}
                </div>
                <div className="text-sm font-medium">${selectedLocation.pricePerHour.toFixed(2)}/hr</div>
              </div>
            </div>
            <button 
              className="bg-brand-purple text-white px-4 py-2 rounded-md hover:bg-brand-secondary-purple transition-colors"
              disabled={selectedLocation.available === 0}
            >
              Reserve
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingMap;
