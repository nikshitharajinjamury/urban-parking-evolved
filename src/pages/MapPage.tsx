
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Search, Calendar as CalendarIcon, Clock, Filter, Car, MapPin, CircleParking, CircleDollarSign, IndianRupee } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ParkingMap from '@/components/ParkingMap';

// Parking spot types and durations for selection
const DURATION_OPTIONS = [
  { value: 1, label: '1h' },
  { value: 2, label: '2h' },
  { value: 3, label: '3h' },
  { value: 4, label: '4h' },
  { value: 5, label: '5h' },
  { value: 8, label: '8h' },
  { value: 12, label: '12h' },
  { value: 24, label: '24h' },
];

// Types of parking spots
const SPOT_TYPES = [
  { name: 'Standard', color: 'bg-blue-100 text-blue-800' },
  { name: 'Premium', color: 'bg-green-100 text-green-800' },
  { name: 'Valet', color: 'bg-yellow-100 text-yellow-800' },
];

// Available parking spots
const PARKING_SPOTS = [
  { id: 'B-1', type: 'Standard', price: 40, available: true },
  { id: 'B-2', type: 'Standard', price: 40, available: true },
  { id: 'B-3', type: 'Standard', price: 40, available: true },
  { id: 'B-4', type: 'Standard', price: 40, available: true },
  { id: 'B-5', type: 'Standard', price: 40, available: true },
  { id: 'B-6', type: 'Standard', price: 40, available: false },
  { id: 'B-7', type: 'Standard', price: 40, available: true },
  { id: 'B-8', type: 'Standard', price: 40, available: true },
  { id: 'B-9', type: 'Standard', price: 40, available: false },
  { id: 'B-10', type: 'Standard', price: 40, available: true },
  { id: 'B-11', type: 'Standard', price: 40, available: true },
  { id: 'B-12', type: 'Standard', price: 40, available: true },
  { id: 'B-13', type: 'Premium', price: 70, available: false },
  { id: 'B-14', type: 'Premium', price: 70, available: true },
  { id: 'B-15', type: 'Premium', price: 70, available: true },
  { id: 'B-16', type: 'Premium', price: 70, available: true },
  { id: 'B-17', type: 'Premium', price: 70, available: false },
  { id: 'B-18', type: 'Premium', price: 100, available: false },
  { id: 'B-19', type: 'Valet', price: 100, available: true },
  { id: 'B-20', type: 'Valet', price: 100, available: true },
];

// Additional services options
const ADDITIONAL_SERVICES = [
  { id: 'fuel', name: 'Fuel Refill', price: 'Market Price', icon: 'fuel' },
  { id: 'wash', name: 'Car Wash', price: 299, icon: 'car-wash' },
  { id: 'air', name: 'Tire Air Check', price: 50, icon: 'circle-check' },
  { id: 'repair', name: 'Minor Repairs', price: 'Varies', icon: 'circle-info' },
];

// Subscription plans
const SUBSCRIPTION_PLANS = [
  { 
    id: 'basic', 
    name: 'Basic', 
    price: 800, 
    period: 'month',
    details: 'Unlimited parking up to 3 hours/day'
  },
  { 
    id: 'premium', 
    name: 'Premium', 
    price: 1500, 
    period: 'month',
    details: 'Unlimited parking with valet service'
  },
  { 
    id: 'yearly', 
    name: 'Yearly Basic', 
    price: 8000, 
    period: 'year',
    details: 'Save ₹1,600 with yearly subscription'
  }
];

const MapPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState(2);
  const [startTime, setStartTime] = useState('9:00 AM');
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'spots' | 'map'>('spots');
  const [tab, setTab] = useState('hourly');

  const handleSelectLocation = (location: any) => {
    setSelectedLocation(location);
  };

  const handleSelectSpot = (spotId: string) => {
    const spot = PARKING_SPOTS.find(s => s.id === spotId);
    if (spot && spot.available) {
      setSelectedSpot(spotId);
    }
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
      description: `You've reserved spot ${selectedSpot} for ${duration} hours.`,
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
    
    const spot = PARKING_SPOTS.find(s => s.id === selectedSpot);
    if (!spot) return 0;
    
    let total = spot.price * duration;
    
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

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Find Parking</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6 flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for a location, address, or landmark"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" className="flex items-center gap-2">
                <Filter size={14} />
                <span>Filters</span>
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-2">
                <MapPin size={14} />
                <span>Near Me</span>
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-2">
                <Car size={14} />
                <span>Vehicle Type</span>
              </Button>
            </div>
          </div>
          
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h2 className="text-lg font-medium mb-4">Select Date, Time & Parking Spot</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "dd-MM-yyyy") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Start Time</label>
                      <select
                        className="w-full rounded-md border border-input bg-transparent px-3 py-2"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      >
                        {Array.from({ length: 24 }).map((_, i) => {
                          const hour = i % 12 === 0 ? 12 : i % 12;
                          const period = i < 12 ? 'AM' : 'PM';
                          const timeString = `${hour}:00 ${period}`;
                          return (
                            <option key={i} value={timeString}>
                              {timeString}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Duration</label>
                      <div className="grid grid-cols-4 gap-2">
                        {DURATION_OPTIONS.map((option) => (
                          <Button
                            key={option.value}
                            type="button"
                            variant={duration === option.value ? "default" : "outline"}
                            className={duration === option.value ? "bg-blue-600" : ""}
                            onClick={() => setDuration(option.value)}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium mb-4">Available Parking Spots</h2>
                  <div className="flex gap-4 mb-4">
                    {SPOT_TYPES.map((type) => (
                      <div key={type.name} className="flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full ${type.color.split(' ')[0]}`}></div>
                        <span className="text-sm">{type.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 max-h-[300px] overflow-y-auto">
                    {PARKING_SPOTS.map((spot) => (
                      <Button
                        key={spot.id}
                        variant="outline"
                        className={`
                          h-auto flex flex-col py-3 px-2
                          ${!spot.available ? 'opacity-50 cursor-not-allowed' : ''}
                          ${selectedSpot === spot.id ? 'ring-2 ring-brand-purple' : ''}
                          ${getSpotTypeColor(spot.type)}
                        `}
                        disabled={!spot.available}
                        onClick={() => handleSelectSpot(spot.id)}
                      >
                        <span className="font-medium">{spot.id}</span>
                        <span className="text-sm flex items-center">
                          <IndianRupee className="h-3 w-3" />{spot.price}/h
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="map">
              <ParkingMap onSelectLocation={handleSelectLocation} />
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="hourly" className="flex items-center gap-1">
                <Clock size={14} />
                Hourly
              </TabsTrigger>
              <TabsTrigger value="subscription" className="flex items-center gap-1">
                <CircleDollarSign size={14} />
                Subscription
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="hourly" className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Reserve Parking</h2>
                
                {selectedSpot ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium">Selected Spot: {selectedSpot}</h3>
                      <p className="text-sm text-muted-foreground">
                        {date ? format(date, "dd MMM yyyy") : "No date selected"} - {startTime} ({duration} hours)
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-medium">Additional Services</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {ADDITIONAL_SERVICES.map((service) => (
                          <div
                            key={service.id}
                            className={`
                              border rounded-lg p-3 cursor-pointer
                              ${additionalServices.includes(service.id) ? 'border-brand-purple bg-brand-soft-purple' : 'border-gray-200'}
                            `}
                            onClick={() => toggleService(service.id)}
                          >
                            <div className="flex justify-between">
                              <span className="font-medium">{service.name}</span>
                              <span>
                                {typeof service.price === 'number' ? (
                                  <span className="flex items-center">
                                    <IndianRupee className="h-3 w-3" />{service.price}
                                  </span>
                                ) : (
                                  service.price
                                )}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Parking Fee</span>
                        <span className="flex items-center">
                          <IndianRupee className="h-3.5 w-3.5" />
                          {PARKING_SPOTS.find(s => s.id === selectedSpot)?.price * duration}
                        </span>
                      </div>
                      
                      {additionalServices.length > 0 && (
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Additional Services</span>
                          <span className="flex items-center">
                            <IndianRupee className="h-3.5 w-3.5" />
                            {additionalServices.reduce((total, serviceId) => {
                              const service = ADDITIONAL_SERVICES.find(s => s.id === serviceId);
                              return total + (typeof service?.price === 'number' ? service.price : 0);
                            }, 0)}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Service Fee</span>
                        <span className="flex items-center">
                          <IndianRupee className="h-3.5 w-3.5" />20
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2">
                        <span>Total</span>
                        <span className="flex items-center">
                          <IndianRupee className="h-3.5 w-3.5" />{calculateTotal() + 20}
                        </span>
                      </div>
                    </div>
                    
                    <Button className="w-full" size="lg" onClick={handleReservation}>
                      Reserve Now
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Car className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p>Select a parking spot to make a reservation</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="subscription">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Subscription Plans</h2>
                <div className="space-y-4">
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <div key={plan.id} className="border rounded-lg p-4 hover:border-brand-purple transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg">{plan.name}</h3>
                        <Badge variant="outline" className="bg-brand-soft-purple">
                          {plan.period === 'month' ? 'Monthly' : 'Yearly'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{plan.details}</p>
                      <div className="flex justify-between items-end">
                        <div className="font-bold text-xl flex items-center">
                          <IndianRupee className="h-4 w-4" />
                          {plan.price}
                          <span className="text-sm font-normal text-muted-foreground">/{plan.period}</span>
                        </div>
                        <Button 
                          onClick={() => handleSubscribe(plan.id)}
                          variant="outline"
                        >
                          Subscribe
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
