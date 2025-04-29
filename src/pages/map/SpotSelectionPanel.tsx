
import React from 'react';
import DateTimeSelection from './DateTimeSelection';
import SpotTypeIndicator from './SpotTypeIndicator';
import ParkingSpotGrid from './ParkingSpotGrid';
import { DURATION_OPTIONS, SPOT_TYPES } from './constants';

interface ParkingSpot {
  id: string;
  type: string;
  price: number;
  available: boolean;
}

interface SpotSelectionPanelProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  duration: number;
  setDuration: (duration: number) => void;
  spots: ParkingSpot[];
  selectedSpot: string | null;
  handleSelectSpot: (spotId: string) => void;
  getSpotTypeColor: (type: string) => string;
}

const SpotSelectionPanel: React.FC<SpotSelectionPanelProps> = ({
  date,
  setDate,
  startTime,
  setStartTime,
  duration,
  setDuration,
  spots,
  selectedSpot,
  handleSelectSpot,
  getSpotTypeColor
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2 className="text-lg font-medium mb-4">Select Date, Time & Parking Spot</h2>
        
        <DateTimeSelection
          date={date}
          setDate={setDate}
          startTime={startTime}
          setStartTime={setStartTime}
          duration={duration}
          setDuration={setDuration}
          durationOptions={DURATION_OPTIONS}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-medium mb-4">Available Parking Spots</h2>
        <SpotTypeIndicator spotTypes={SPOT_TYPES} />
        
        <ParkingSpotGrid
          spots={spots}
          selectedSpot={selectedSpot}
          handleSelectSpot={handleSelectSpot}
          getSpotTypeColor={getSpotTypeColor}
        />
      </div>
    </div>
  );
};

export default SpotSelectionPanel;
