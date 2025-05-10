
import React, { useEffect, useRef, useState } from 'react';

interface Marker {
  id: number;
  lat: number;
  lng: number;
  name: string;
  available: number;
  total: number;
  isSelected: boolean;
}

interface GoogleMapProps {
  markers?: Marker[];
  onMarkerClick?: (marker: Marker) => void;
  selectedMarkerId?: number;
  center?: { lat: number; lng: number };
}

const GoogleMap: React.FC<GoogleMapProps> = ({ 
  markers = [], 
  onMarkerClick, 
  selectedMarkerId,
  center = { lat: 37.7749, lng: -122.4194 } // Default: San Francisco
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<number, google.maps.Marker>>(new Map());
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  
  // Initialize the map
  useEffect(() => {
    // Make sure Google Maps API has loaded
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API not loaded");
      return;
    }

    if (mapRef.current && !googleMapRef.current) {
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 13,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        styles: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      // Try to get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setUserLocation(userPos);
            
            // Add user location marker
            new window.google.maps.Marker({
              position: userPos,
              map: googleMapRef.current,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#4285F4',
                fillOpacity: 0.8,
                strokeColor: '#ffffff',
                strokeWeight: 2
              },
              title: 'Your Location'
            });
          },
          () => {
            console.log('Error: The Geolocation service failed.');
          }
        );
      }
    }
  }, [center]);

  // Add or update markers on the map
  useEffect(() => {
    if (!googleMapRef.current || !window.google) return;
    
    // Clear existing markers
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current.clear();
    
    console.log("Adding markers:", markers);
    
    // Add new markers
    markers.forEach((markerData) => {
      const isSelected = markerData.id === selectedMarkerId;
      
      // Create marker icon based on availability
      const icon = {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: isSelected ? 12 : 10,
        fillColor: markerData.available > 0 ? '#10B981' : '#EF4444',
        fillOpacity: 0.8,
        strokeColor: isSelected ? '#6D28D9' : '#ffffff',
        strokeWeight: isSelected ? 3 : 2
      };

      // Create the marker
      const marker = new window.google.maps.Marker({
        position: { lat: markerData.lat, lng: markerData.lng },
        map: googleMapRef.current,
        icon,
        title: markerData.name
      });
      
      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <div class="font-bold">${markerData.name}</div>
            <div>${markerData.available} / ${markerData.total} spots available</div>
          </div>
        `
      });
      
      // Add click event
      marker.addListener('click', () => {
        if (onMarkerClick) {
          onMarkerClick(markerData);
        }
        
        // Open info window
        infoWindow.open(googleMapRef.current, marker);
      });
      
      // Store the marker reference
      markersRef.current.set(markerData.id, marker);
    });

    // Adjust the map to fit all the markers
    if (markers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => {
        bounds.extend({ lat: marker.lat, lng: marker.lng });
      });
      googleMapRef.current.fitBounds(bounds);
      
      // Don't zoom in too far
      const listener = window.google.maps.event.addListener(googleMapRef.current, 'idle', function() {
        if (googleMapRef.current && googleMapRef.current.getZoom() > 16) {
          googleMapRef.current.setZoom(16);
        }
        window.google.maps.event.removeListener(listener);
      });
    }
  }, [markers, selectedMarkerId, onMarkerClick]);

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 text-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Full</span>
        </div>
      </div>
      <button
        className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2"
        onClick={() => {
          if (userLocation) {
            googleMapRef.current?.panTo(userLocation);
            googleMapRef.current?.setZoom(15);
          }
        }}
      >
        <div className="w-8 h-8 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
          </svg>
        </div>
      </button>
    </div>
  );
};

export default GoogleMap;
