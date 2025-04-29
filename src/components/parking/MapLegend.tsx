
import React from 'react';

const MapLegend = () => {
  return (
    <div className="absolute top-4 right-4 z-10 bg-white rounded-md shadow-md p-2">
      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Full</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Your Location</span>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
