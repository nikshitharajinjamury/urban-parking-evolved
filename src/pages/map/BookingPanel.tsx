
import React, { useState } from 'react';
import ReservationSummary from './ReservationSummary';
import SubscriptionPlans from './SubscriptionPlans';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, CircleDollarSign, Loader2 } from 'lucide-react';
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
  const [isProcessing, setIsProcessing] = useState(false);

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
      setIsProcessing(true);
      
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
      
      // Check for existing bookings within the selected time range
      const { data: existingBookings, error: checkError } = await supabase
        .from('bookings')
        .select('*')
        .eq('slot_id', selectedSpot.id)
        .eq('status', 'confirmed');

      if (checkError) {
        console.error('Supabase check error:', checkError);
        throw checkError;
      }

      // Check for time overlaps manually
      const hasOverlap = existingBookings && existingBookings.some(booking => {
        const bookingStart = new Date(booking.start_time);
        const bookingEnd = new Date(booking.end_time);
        
        // Check if there's any overlap in time ranges
        return (
          (startDate >= bookingStart && startDate < bookingEnd) || // New start time falls within existing booking
          (endDate > bookingStart && endDate <= bookingEnd) || // New end time falls within existing booking
          (startDate <= bookingStart && endDate >= bookingEnd) // New booking completely encompasses existing booking
        );
      });

      if (hasOverlap) {
        toast({
          title: "Slot Unavailable",
          description: "This parking slot is already booked for the selected time.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // Get stripe public key
      const stripePublicKey = window.STRIPE_PUBLIC_KEY || 'pk_test_51RECoGPd7yAFrHXYQQbnJcrLHCFwLNomcxso70EgPll9cAbqUmaHz8DMj9jWcnuj1O9FgFyHXkqCc7xocR8BItrT00UnJcpNzf';
      
      // Calculate total
      const total = calculateTotal();
      
      // Show payment processing message
      toast({
        title: "Payment Processing",
        description: "Processing your payment...",
      });
      
      // Simulate payment process and booking creation
      setTimeout(async () => {
        try {
          // Create the booking directly
          const { data: booking, error: bookingError } = await supabase
            .from('bookings')
            .insert({
              user_id: user.id,
              slot_id: selectedSpot.id,
              start_time: startDate.toISOString(),
              end_time: endDate.toISOString(),
              status: 'confirmed',
              total_amount: total,
              payment_status: 'completed',
              payment_intent_id: `pi_${Math.random().toString(36).substr(2, 9)}_${Date.now()}` // Mock payment ID
            })
            .select();

          if (bookingError) {
            console.error('Booking creation error:', bookingError);
            toast({
              title: "Booking Failed",
              description: "Failed to create booking record. Please try again.",
              variant: "destructive",
            });
            setIsProcessing(false);
            return;
          }
          
          toast({
            title: "Booking Successful!",
            description: `You've reserved spot ${selectedSpot.name} for ${duration} hours.`,
          });
          navigate('/reservations');
        } catch (error) {
          console.error('Error in booking process:', error);
          toast({
            title: "Booking Failed",
            description: "Failed to make reservation. Please try again later.",
            variant: "destructive",
          });
          setIsProcessing(false);
        }
      }, 2000);
    } catch (error) {
      console.error('Error making reservation:', error);
      toast({
        title: "Booking Failed",
        description: "Failed to make reservation. Please try again later.",
        variant: "destructive",
      });
      setIsProcessing(false);
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
          
          {isProcessing && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
              <div className="flex flex-col items-center">
                <Loader2 className="h-8 w-8 animate-spin text-brand-purple" />
                <p className="mt-2">Processing payment...</p>
              </div>
            </div>
          )}
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
