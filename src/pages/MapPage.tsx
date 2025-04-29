
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Clock, Filter, Car } from 'lucide-react';
import ParkingMap from '@/components/ParkingMap';

interface ParkingSpot {
  id: number;
  name: string;
  lat: number;
  lng: number;
  available: number;
  total: number;
  pricePerHour: number;
}

const MapPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<ParkingSpot | null>(null);
  const [hours, setHours] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 10]);

  const handleSelectLocation = (location: ParkingSpot) => {
    setSelectedLocation(location);
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
                <Clock size={14} />
                <span>Now</span>
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-2">
                <Car size={14} />
                <span>Standard Vehicle</span>
              </Button>
            </div>
          </div>
          
          <ParkingMap onSelectLocation={handleSelectLocation} />
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Reserve Parking</h2>
            
            {selectedLocation ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium">{selectedLocation.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedLocation.available} spots available out of {selectedLocation.total}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input type="date" min={new Date().toISOString().split('T')[0]} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Arrival Time</label>
                    <Select defaultValue="12:00">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }).map((_, i) => {
                          const hour = i % 12 === 0 ? 12 : i % 12;
                          const period = i < 12 ? 'AM' : 'PM';
                          return (
                            <SelectItem key={i} value={`${i}:00`}>
                              {hour}:00 {period}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <Select value={hours.toString()} onValueChange={(value) => setHours(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }).map((_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1} {i === 0 ? 'hour' : 'hours'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="pt-4 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Service Options</h3>
                    
                    <Tabs defaultValue="standard" className="w-full">
                      <TabsList className="grid grid-cols-2 w-full">
                        <TabsTrigger value="standard">Standard</TabsTrigger>
                        <TabsTrigger value="valet">Valet</TabsTrigger>
                      </TabsList>
                      <TabsContent value="standard">
                        <div className="border rounded-lg p-4 mt-2 bg-gray-50">
                          <p className="text-sm">Self-parking in a designated spot</p>
                          <p className="font-bold mt-2">${selectedLocation.pricePerHour.toFixed(2)}/hr</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="valet">
                        <div className="border rounded-lg p-4 mt-2 bg-gray-50">
                          <p className="text-sm">Valet will park and retrieve your car</p>
                          <p className="font-bold mt-2">${(selectedLocation.pricePerHour + 5).toFixed(2)}/hr</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Parking Fee</span>
                      <span>${(selectedLocation.pricePerHour * hours).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Service Fee</span>
                      <span>$1.99</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2">
                      <span>Total</span>
                      <span>${(selectedLocation.pricePerHour * hours + 1.99).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" size="lg">
                    Reserve Now
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Car className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Select a parking location on the map to make a reservation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
