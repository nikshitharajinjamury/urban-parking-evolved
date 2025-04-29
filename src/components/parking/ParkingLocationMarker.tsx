
import React from 'react';
import { Car } from 'lucide-react';

interface ParkingLocationMarkerProps {
  id: number;
  name: string;
  lat: number;
  lng: number;
  available: number;
  total: number;
  pricePerHour: number;
  spotNames: string[];
  features: string[];
  isSelected: boolean;
  onClick: () => void;
}

const ParkingLocationMarker: React.FC<ParkingLocationMarkerProps> = ({
  id, 
  lat, 
  lng, 
  available, 
  isSelected,
  onClick
}) => {
  return (
    <div 
      className={`absolute z-10 ${available > 0 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      style={{ 
        left: `${lng}%`, 
        top: `${lat}%`, 
        transform: 'translate(-50%, -50%)'
      }}
      onClick={available > 0 ? onClick : undefined}
    >
      <div className={`
        flex flex-col items-center
        ${isSelected ? 'scale-110' : ''}
        ${available === 0 ? 'opacity-50' : ''}
        transition-all duration-200
      `}>
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center
          ${available > 0 ? 'bg-green-500' : 'bg-red-500'}
          ${isSelected ? 'ring-4 ring-brand-purple' : ''}
          shadow-md
        `}>
          <Car size={20} className="text-white" />
        </div>
        <div className="mt-1 bg-white px-2 py-1 rounded-md shadow text-xs font-medium">
          {available > 0 ? `${available} spots` : 'Full'}
        </div>
      </div>
    </div>
  );
};

export default ParkingLocationMarker;
