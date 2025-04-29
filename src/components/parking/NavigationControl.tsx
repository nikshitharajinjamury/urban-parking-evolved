
import React from 'react';
import { Navigation } from 'lucide-react';

const NavigationControl = () => {
  return (
    <div className="absolute top-4 left-4 z-10 bg-white rounded-md shadow-md p-2">
      <button className="p-2 hover:bg-gray-100 rounded-md" title="Center map on your location">
        <Navigation size={20} className="text-brand-purple" />
      </button>
    </div>
  );
};

export default NavigationControl;
