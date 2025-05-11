import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CircleParking, MapPin } from 'lucide-react';
import ParkingMap from '@/components/ParkingMap';
import SearchBar from './map/SearchBar';
import SpotSelectionPanel from './map/SpotSelectionPanel';
import BookingPanel from './map/BookingPanel';
import AdditionalServices from './map/AdditionalServices';
import { 
  PARKING_SPOTS, 
  SPOT_TYPES, 
  ADDITIONAL_SERVICES 
} from './map/constants';
import { ParkingSpot } from '@/types/parking';
import { PARKING_LOCATIONS } from '@/components/parking/ParkingData';

const MapPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState(2);
  const [startTime, setStartTime] = useState('9:00 AM');
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'spots' | 'map'>('map'); // Default to map view
  const [tab, setTab] = useState('hourly');
  const [mapCenter, setMapCenter] = useState({ lat: 17.3850, lng: 78.4867 }); // Default: Hyderabad, India
  
  // Get current time (hour) to apply dynamic pricing
  const currentHour = new Date().getHours();
  // Determine if it's peak hour (9-11 AM or 4-7 PM)
  const isPeakHour = (currentHour >= 9 && currentHour <= 11) || (currentHour >= 16 && currentHour <= 19);
  // Determine if it's weekend
  const isWeekend = [0, 6].includes(new Date().getDay());
  
  // Calculate dynamic pricing multiplier based on time factors
  const getDynamicPriceMultiplier = () => {
    let multiplier = 1.0; // Base price
    
    // Time-based adjustments
    if (isPeakHour) multiplier *= 1.25; // +25% during peak hours
    else if (currentHour >= 22 || currentHour <= 5) multiplier *= 0.8; // -20% during late night
    
    // Day-based adjustments
    if (isWeekend) multiplier *= 1.1; // +10% on weekends
    
    // Occupancy-based adjustments (using first location as example)
    const location = selectedLocation || PARKING_LOCATIONS[0];
    if (location) {
      const occupancyRate = 1 - (location.available / location.total);
      if (occupancyRate > 0.8) multiplier *= 1.2; // +20% when >80% full
      else if (occupancyRate < 0.5) multiplier *= 0.9; // -10% when <50% full
    }
    
    return multiplier;
  };
  
  // Apply dynamic pricing to the spots
  const getDynamicSpots = () => {
    const multiplier = getDynamicPriceMultiplier();
    return PARKING_SPOTS.map(spot => ({
      ...spot,
      price_per_hour: Math.round(spot.price_per_hour * multiplier),
      dynamic_multiplier: multiplier
    }));
  };
  
  // Get dynamically priced spots
  const dynamicSpots = getDynamicSpots();
  
  const handleSelectLocation = (location: any) => {
    setSelectedLocation(location);
    // Auto-switch to spots view when a location is selected
    setViewMode('spots');
    
    // When a location is selected from the map, automatically populate some fields
    if (location.spotNames && location.spotNames.length > 0) {
      // Select a random spot as default
      const availableSpots = dynamicSpots.filter(spot => spot.available);
      if (availableSpots.length > 0) {
        setSelectedSpot(availableSpots[Math.floor(Math.random() * availableSpots.length)]);
      }
    }
  };

  const handleSpotSelect = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
  };

  const toggleService = (serviceId: string) => {
    setAdditionalServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleReservation = () => {
    if (!selectedSpot) {
      toast({
        title: "No parking spot selected",
        description: "Please select a parking spot to continue.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking Successful!",
      description: `You've reserved spot ${selectedSpot.id} for ${duration} hours.`,
    });

    navigate('/reservations');
  };

  const handleSubscribe = (planId: string) => {
    toast({
      title: "Subscription Selected",
      description: "Redirecting to payment page...",
    });
    // In a real app, you would redirect to checkout or payment page
  };

  const calculateTotal = () => {
    if (!selectedSpot) return 0;
    
    // Find the spot with current price from the dynamic spots
    const spotWithPrice = dynamicSpots.find(spot => spot.id === selectedSpot.id);
    const parkingFee = spotWithPrice ? spotWithPrice.price_per_hour * duration : 0;
    
    // We're removing the additional service fees as requested
    return parkingFee;
  };

  const getSpotTypeColor = (type: string) => {
    const spotType = SPOT_TYPES.find(t => t.name === type);
    return spotType ? spotType.color : 'bg-gray-100 text-gray-800';
  };

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    if (place.geometry?.location) {
      const newCenter = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      setMapCenter(newCenter);
    }
  };

  // Use useEffect to force map view on initial load
  useEffect(() => {
    // Force map view on component mount
    setViewMode('map');
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Find Parking</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            onPlaceSelected={handlePlaceSelected}
          />
          
          <Tabs value={viewMode} onValueChange={(value: string) => setViewMode(value as 'spots' | 'map')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="map" className="flex items-center gap-2">
                <MapPin size={16} />
                Map View
              </TabsTrigger>
              <TabsTrigger value="spots" className="flex items-center gap-2">
                <CircleParking size={16} />
                Parking Spots
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="map" className="min-h-[500px]">
              <ParkingMap 
                onSelectLocation={handleSelectLocation}
                onViewSpots={() => setViewMode('spots')}
              />
            </TabsContent>
            
            <TabsContent value="spots" className="space-y-6">
              <SpotSelectionPanel
                date={date}
                setDate={setDate}
                startTime={startTime}
                setStartTime={setStartTime}
                duration={duration}
                setDuration={setDuration}
                spots={dynamicSpots}
                selectedSpot={selectedSpot}
                onSpotSelect={handleSpotSelect}
                getSpotTypeColor={getSpotTypeColor}
                selectedLocation={selectedLocation}
              />
              
              {selectedSpot && (
                <AdditionalServices 
                  services={ADDITIONAL_SERVICES}
                  selectedServices={additionalServices}
                  toggleService={toggleService}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <BookingPanel
            tab={tab}
            setTab={setTab}
            selectedSpot={selectedSpot}
            date={date}
            startTime={startTime}
            duration={duration}
            additionalServices={additionalServices}
            calculateTotal={calculateTotal}
            handleSubscribe={handleSubscribe}
            toggleService={toggleService}
          />
        </div>
      </div>
    </div>
  );
};

export default MapPage;
