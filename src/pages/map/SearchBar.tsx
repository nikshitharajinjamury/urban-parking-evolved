
import React, { useRef, useEffect } from 'react';
import { Search, Filter, MapPin, Car } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onPlaceSelected?: (place: google.maps.places.PlaceResult) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchQuery, 
  setSearchQuery,
  onPlaceSelected 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (inputRef.current && window.google && window.google.maps && window.google.maps.places) {
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        types: ['geocode', 'establishment']
      });
      
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && onPlaceSelected) {
          onPlaceSelected(place);
          if (place.formatted_address) {
            setSearchQuery(place.formatted_address);
          } else if (place.name) {
            setSearchQuery(place.name);
          }
        }
      });
    }
  }, [onPlaceSelected, setSearchQuery]);

  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="Search for a location, address, or landmark"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2 justify-between">
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
        
        <Button size="sm" variant="default" className="bg-brand-purple hover:bg-brand-purple/90" asChild>
          <Link to="/driver-signup">Become a Valet Driver</Link>
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
