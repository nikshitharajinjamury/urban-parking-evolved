
import React from 'react';
import DateTimeSelection from './DateTimeSelection';
import SpotTypeIndicator from './SpotTypeIndicator';
import ParkingSpotGrid from './ParkingSpotGrid';
import { DURATION_OPTIONS, SPOT_TYPES } from './constants';
import { ParkingSpot } from '@/types/parking';
import { Card, CardContent } from '@/components/ui/card';
import { IndianRupee, Clock, AlertCircle } from 'lucide-react';

interface SpotSelectionPanelProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  duration: number;
  setDuration: (duration: number) => void;
  spots: ParkingSpot[];
  selectedSpot: ParkingSpot | null;
  onSpotSelect: (spot: ParkingSpot) => void;
  getSpotTypeColor: (type: string) => string;
  selectedLocation?: any;
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
  onSpotSelect,
  getSpotTypeColor,
  selectedLocation
}) => {
  const handleSpotSelect = (spot: ParkingSpot) => {
    onSpotSelect(spot);
  };

  // Get current time (hour) to determine if it's peak hour
  const currentHour = new Date().getHours();
  const isPeakHour = (currentHour >= 9 && currentHour <= 11) || (currentHour >= 16 && currentHour <= 19);
  const isWeekend = [0, 6].includes(new Date().getDay());
  
  // Check if any spot has dynamic pricing
  const hasDynamicPricing = spots.some(spot => spot.dynamic_multiplier && spot.dynamic_multiplier !== 1);

  return (
    <div className="grid grid-cols-1 gap-4">
      {selectedLocation && (
        <Card className="bg-brand-soft-purple border-brand-purple mb-2">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-lg">{selectedLocation.name}</h3>
                <p className="text-sm">
                  {selectedLocation.available} of {selectedLocation.total} spots available
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedLocation.available > 10 
                  ? 'bg-green-100 text-green-800' 
                  : selectedLocation.available > 0 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-red-100 text-red-800'
              }`}>
                {selectedLocation.available > 0 ? 'Available' : 'Full'}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Available Parking Spots</h2>
          {hasDynamicPricing && (
            <div className="flex items-center text-sm text-amber-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>Dynamic pricing in effect</span>
            </div>
          )}
        </div>
        
        {isPeakHour && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-2 mb-4 flex items-start">
            <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-800">
              <span className="font-medium">Peak hour pricing:</span> Prices are currently {isWeekend ? "35%" : "25%"} higher due to high demand {isWeekend && "and weekend rates"}.
            </p>
          </div>
        )}
        
        <SpotTypeIndicator spotTypes={SPOT_TYPES} />
        
        <ParkingSpotGrid
          spots={spots}
          selectedSpot={selectedSpot}
          onSpotSelect={handleSpotSelect}
          getSpotTypeColor={getSpotTypeColor}
          selectedLocation={selectedLocation}
        />
      </div>
    </div>
  );
};

export default SpotSelectionPanel;
