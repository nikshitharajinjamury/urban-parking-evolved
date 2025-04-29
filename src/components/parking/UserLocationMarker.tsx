
import React from 'react';

interface UserLocationMarkerProps {
  lat: number;
  lng: number;
}

const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({ lat, lng }) => {
  return (
    <div 
      className="absolute z-20 animate-pulse"
      style={{ 
        left: `${lng}%`, 
        top: `${lat}%`, 
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
  );
};

export default UserLocationMarker;
