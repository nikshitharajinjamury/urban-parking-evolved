
import React from 'react';

interface SpotType {
  name: string;
  color: string;
}

interface SpotTypeIndicatorProps {
  spotTypes: SpotType[];
  activeType?: string;
  onTypeClick?: (type: string) => void;
}

const SpotTypeIndicator: React.FC<SpotTypeIndicatorProps> = ({ 
  spotTypes, 
  activeType,
  onTypeClick 
}) => {
  const handleClick = (type: string) => {
    if (onTypeClick) {
      onTypeClick(type);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {spotTypes.map((type) => (
        <div 
          key={type.name} 
          className={`flex items-center gap-1 px-2 py-1 rounded-full border transition-all
            ${activeType === type.name ? 'border-brand-purple bg-brand-purple/10' : 'border-transparent'} 
            ${onTypeClick ? 'cursor-pointer hover:bg-muted' : ''}
          `}
          onClick={() => handleClick(type.name)}
        >
          <div className={`w-3 h-3 rounded-full ${type.color.split(' ')[0]}`}></div>
          <span className="text-sm">{type.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SpotTypeIndicator;
