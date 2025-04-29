
import React from 'react';

interface SpotType {
  name: string;
  color: string;
}

interface SpotTypeIndicatorProps {
  spotTypes: SpotType[];
}

const SpotTypeIndicator: React.FC<SpotTypeIndicatorProps> = ({ spotTypes }) => {
  return (
    <div className="flex gap-4 mb-4">
      {spotTypes.map((type) => (
        <div key={type.name} className="flex items-center gap-1">
          <div className={`w-3 h-3 rounded-full ${type.color.split(' ')[0]}`}></div>
          <span className="text-sm">{type.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SpotTypeIndicator;
