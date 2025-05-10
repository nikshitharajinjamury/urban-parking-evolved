
import { supabase } from './supabase';

export const initializeTestData = async () => {
  try {
    // Check if we already have parking slots
    const { data: existingSlots, error: checkError } = await supabase
      .from('parking_slots')
      .select('id')
      .limit(1);
    
    if (checkError) throw checkError;
    
    // Only add test data if there are no existing slots
    if (!existingSlots || existingSlots.length === 0) {
      console.log('No parking slots found, adding test data...');
      
      // First create a test location
      const { data: location, error: locationError } = await supabase
        .from('parking_locations')
        .insert({
          name: 'Central Parking',
          address: '123 Main Street, City Center',
          city: 'Metro City',
          latitude: 40.7128,
          longitude: -74.0060,
          total_slots: 15,
        })
        .select('id')
        .single();
      
      if (locationError) throw locationError;
      
      console.log('Created test location:', location);
      
      if (location && location.id) {
        // Create some parking slots with valid UUIDs that will match the mock data
        const parkingSlots = [];
        
        // Different types of parking spots
        const types = ['standard', 'compact', 'large', 'disabled', 'electric'];
        
        for (let i = 1; i <= 15; i++) {
          const slot = {
            name: `A-${i}`,
            location_id: location.id,
            price_per_hour: Math.floor(Math.random() * 50) + 30, // Random price between 30-80
            status: 'available',
            type: types[Math.floor(Math.random() * types.length)], // Random type
          };
          
          parkingSlots.push(slot);
        }
        
        const { data: slots, error: slotsError } = await supabase
          .from('parking_slots')
          .insert(parkingSlots)
          .select();
        
        if (slotsError) throw slotsError;
        
        console.log('Created test parking slots:', slots);
      }
    } else {
      console.log('Parking slots already exist, skipping initialization');
    }
  } catch (error) {
    console.error('Error initializing test data:', error);
  }
};
