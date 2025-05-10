
import React from 'react';
import ReservationSummary from './ReservationSummary';
import SubscriptionPlans from './SubscriptionPlans';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, CircleDollarSign } from 'lucide-react';
import { ADDITIONAL_SERVICES, SUBSCRIPTION_PLANS, PARKING_SPOTS } from './constants';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { BookingPanelProps, ParkingSpot, Service } from '@/types/parking';

const BookingPanel: React.FC<BookingPanelProps> = ({
  tab,
  setTab,
  selectedSpot,
  date,
  startTime,
  duration,
  additionalServices,
  calculateTotal,
  handleSubscribe,
  toggleService
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleReservation = async () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to make a reservation",
        variant: "destructive",
      });
      return;
    }

    if (!selectedSpot || !date) {
      toast({
        title: "Incomplete Information",
        description: "Please select a spot and date to continue.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Parse and format the start time
      const [hours, minutes, period] = startTime.match(/(\d+):(\d+) (AM|PM)/).slice(1);
      let startHour = parseInt(hours);
      if (period === 'PM' && startHour !== 12) startHour += 12;
      if (period === 'AM' && startHour === 12) startHour = 0;
      
      const startDate = new Date(date);
      startDate.setHours(startHour, parseInt(minutes));
      const endDate = new Date(startDate.getTime() + duration * 60 * 60 * 1000);

      console.log('Selected spot:', selectedSpot);
      console.log('Booking from', startDate, 'to', endDate);
      
      // Check for existing bookings
      const { data: existingBookings, error: checkError } = await supabase
        .from('bookings')
        .select('*')
        .eq('slot_id', selectedSpot.id)
        .eq('status', 'confirmed')
        .or(`start_time.lte.${endDate.toISOString()},end_time.gte.${startDate.toISOString()}`);

      if (checkError) {
        console.error('Supabase check error:', checkError);
        throw checkError;
      }

      if (existingBookings && existingBookings.length > 0) {
        toast({
          title: "Slot Unavailable",
          description: "This parking slot is already booked for the selected time.",
          variant: "destructive",
        });
        return;
      }

      // First, verify that the slot exists in the parking_slots table
      const { data: slotExists, error: slotCheckError } = await supabase
        .from('parking_slots')
        .select('id')
        .eq('id', selectedSpot.id)
        .single();
        
      if (slotCheckError || !slotExists) {
        console.error('Slot does not exist in database:', selectedSpot.id);
        toast({
          title: "Invalid Parking Slot",
          description: "The selected parking slot doesn't exist in our system. Please select another spot.",
          variant: "destructive",
        });
        return;
      }

      // Create the booking
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          slot_id: selectedSpot.id,
          start_time: startDate.toISOString(),
          end_time: endDate.toISOString(),
          status: 'confirmed',
          total_amount: calculateTotal() + 20,
          payment_status: 'pending',
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (bookingError) {
        console.error('Supabase booking error:', bookingError, bookingError.details, bookingError.message);
        toast({
          title: "Booking Failed",
          description: bookingError.message || "Failed to make reservation. Please try again later.",
          variant: "destructive",
        });
        return;
      }

      // Update slot status
      const { error: slotError } = await supabase
        .from('parking_slots')
        .update({ 
          status: 'occupied',
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedSpot.id);

      if (slotError) throw slotError;

      toast({
        title: "Booking Successful!",
        description: `You've reserved spot ${selectedSpot.name} for ${duration} hours.`,
      });

      navigate('/reservations');
    } catch (error) {
      console.error('Error making reservation:', error);
      toast({
        title: "Booking Failed",
        description: "Failed to make reservation. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
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
          
          <ReservationSummary
            selectedSpot={selectedSpot}
            spots={PARKING_SPOTS}
            date={date}
            startTime={startTime}
            duration={duration}
            additionalServices={additionalServices}
            services={ADDITIONAL_SERVICES}
            calculateTotal={calculateTotal}
            handleReservation={handleReservation}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="subscription">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
          <h2 className="text-xl font-bold mb-4">Subscription Plans</h2>
          <SubscriptionPlans 
            plans={SUBSCRIPTION_PLANS}
            handleSubscribe={handleSubscribe}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default BookingPanel;
