
import React from 'react';
import { MapPin, CircleHelp, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ParkingSpot {
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

interface LocationInfoPanelProps {
  location: ParkingSpot;
  onViewSlots?: () => void;
}

const LocationInfoPanel: React.FC<LocationInfoPanelProps> = ({ location, onViewSlots }) => {
  return (
    <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-30">
      <div className="flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-lg">{location.name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <MapPin size={14} />
              <span>2.3 miles away</span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <div className={`px-2 py-0.5 text-xs rounded-full ${location.available > 10 ? 'bg-green-100 text-green-800' : location.available > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                {location.available > 0 ? `${location.available} spots left` : 'No spots available'}
              </div>
              <div className="text-sm font-medium flex items-center">
                <IndianRupee className="h-3 w-3" />
                {location.pricePerHour}/hr
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Button 
              className="bg-brand-purple text-white w-full hover:bg-brand-secondary-purple transition-colors"
              disabled={location.available === 0}
              onClick={onViewSlots}
            >
              View Slots
            </Button>
            
            <Button 
              variant="outline"
              className="w-full"
              disabled={location.available === 0}
            >
              Reserve
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Available in sections:</p>
            <div className="flex flex-wrap gap-1">
              {location.spotNames.map((spotName, index) => (
                <span key={index} className="px-2 py-0.5 bg-brand-soft-purple text-xs rounded-full">
                  {spotName}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-xs text-muted-foreground mb-1">Features:</p>
            <div className="flex flex-wrap gap-1">
              {location.features.map((feature, index) => (
                <span key={index} className="px-2 py-0.5 bg-gray-100 text-xs rounded-full flex items-center gap-1">
                  <CircleHelp className="h-3 w-3" />
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfoPanel;
