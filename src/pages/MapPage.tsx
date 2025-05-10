import React, { useState } from 'react';
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
  const [mapCenter, setMapCenter] = useState({ lat: 12.9716, lng: 77.5946 }); // Default: Bangalore

  const handleSelectLocation = (location: any) => {
    setSelectedLocation(location);
    
    // When a location is selected from the map, automatically populate some fields
    if (location.spotNames && location.spotNames.length > 0) {
      // Select a random spot as default
      const availableSpots = PARKING_SPOTS.filter(spot => spot.available);
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
    
    let total = selectedSpot.price_per_hour * duration;
    
    // Add costs of additional services
    additionalServices.forEach(serviceId => {
      const service = ADDITIONAL_SERVICES.find(s => s.id === serviceId);
      if (service && typeof service.price === 'number') {
        total += service.price;
      }
    });
    
    return total;
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
              <TabsTrigger value="spots" className="flex items-center gap-2">
                <CircleParking size={16} />
                Parking Spots
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2">
                <MapPin size={16} />
                Map View
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="spots" className="space-y-6">
              <SpotSelectionPanel
                date={date}
                setDate={setDate}
                startTime={startTime}
                setStartTime={setStartTime}
                duration={duration}
                setDuration={setDuration}
                spots={PARKING_SPOTS}
                selectedSpot={selectedSpot}
                onSpotSelect={handleSpotSelect}
                getSpotTypeColor={getSpotTypeColor}
              />
              
              {selectedSpot && (
                <AdditionalServices 
                  services={ADDITIONAL_SERVICES}
                  selectedServices={additionalServices}
                  toggleService={toggleService}
                />
              )}
            </TabsContent>
            
            <TabsContent value="map">
              <ParkingMap 
                onSelectLocation={handleSelectLocation}
              />
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
