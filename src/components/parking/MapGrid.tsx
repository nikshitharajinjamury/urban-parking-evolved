
import React from 'react';

const MapGrid = () => {
  return (
    <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
      {Array.from({ length: 100 }).map((_, i) => (
        <div key={i} className="border border-gray-100"></div>
      ))}
    </div>
  );
};

export default MapGrid;
