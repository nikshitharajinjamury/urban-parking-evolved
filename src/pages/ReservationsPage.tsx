import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Clock, IndianRupee, X, ChevronRight, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Booking } from '@/types/parking';
// @ts-ignore
import QRCode from 'react-qr-code';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ReservationsPage = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Booking | null>(null);
  const [activeReservations, setActiveReservations] = useState<Booking[]>([]);
  const [pastReservations, setPastReservations] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log("Current logged in user:", user);

  useEffect(() => {
    console.log('Active Reservations:', activeReservations);
    console.log('Past Reservations:', pastReservations);
  }, [activeReservations, pastReservations]);

  useEffect(() => {
    if (!user) return;

    // Initial fetch
    fetchReservations();

    // Set up real-time subscription for bookings table
    const bookingsSubscription = supabase
      .channel('bookings_changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'bookings',
          filter: `user_id=eq.${user.id}` // Only listen to this user's bookings
        },
        async (payload) => {
          console.log('Real-time booking update:', payload);
          // Refresh the bookings data immediately when there's a change
          await fetchReservations();
        }
      )
      .subscribe();

    // Cleanup subscription when component unmounts
    return () => {
      bookingsSubscription.unsubscribe();
    };
  }, [user]); // Only re-run if user changes

  const fetchReservations = async () => {
    if (!user) {
      console.log("No user found");
      return;
    }

    try {
      console.log('Fetching bookings for user:', user.id);
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          parking_slots (
            name,
            location_id,
            parking_locations (
              name,
              address
            )
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Raw booking data:', data);

      if (data) {
        const now = new Date();
        const active = data.filter(booking => {
          const endTime = new Date(booking.end_time);
          return booking.status === 'confirmed' && endTime >= now;
        });

        const past = data.filter(booking => {
          const endTime = new Date(booking.end_time);
          return booking.status === 'completed' || 
                 booking.status === 'cancelled' || 
                 endTime < now;
        });

        console.log('Filtered active bookings:', active);
        console.log('Filtered past bookings:', past);

        setActiveReservations(active);
        setPastReservations(past);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load bookings. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', reservationId);

      if (error) throw error;

      // Update the parking slot status back to available
      const { data: booking } = await supabase
        .from('bookings')
        .select('slot_id')
        .eq('id', reservationId)
        .single();

      if (booking?.slot_id) {
        await supabase
          .from('parking_slots')
          .update({ status: 'available' })
          .eq('id', booking.slot_id);
      }

      await fetchReservations();
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled successfully.",
      });
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleShowQR = (reservation: Booking) => {
    setSelectedReservation(reservation);
    setShowQRCode(true);
  };

  if (loading) {
    return (
      <div className="container py-8 px-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <Button asChild>
          <Link to="/map">Find New Parking</Link>
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : activeReservations.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto bg-muted rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No active bookings</h3>
              <p className="text-muted-foreground mb-6">You don't have any active parking bookings.</p>
              <Button asChild>
                <Link to="/map">Find Parking</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeReservations.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardHeader className="bg-brand-purple text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {booking.parking_slots?.parking_locations?.name || 'Unknown Location'}
                        </CardTitle>
                        <CardDescription className="text-white/80 mt-1">
                          Spot {booking.parking_slots?.name}
                        </CardDescription>
                      </div>
                      <Badge className="bg-white text-brand-purple hover:bg-white/90">
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">
                            {new Date(booking.start_time).toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">
                            {new Date(booking.start_time).toLocaleTimeString('en-US', { 
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })} - {new Date(booking.end_time).toLocaleTimeString('en-US', { 
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </p>
                        </div>
                      </div>
                      {booking.parking_slots?.parking_locations?.address && (
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground">
                            {booking.parking_slots.parking_locations.address}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-bold flex items-center">
                        <IndianRupee className="h-3.5 w-3.5" />
                        {booking.total_amount.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleShowQR(booking)}
                      >
                        <QrCode className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleCancelReservation(booking.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : pastReservations.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto bg-muted rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No past bookings</h3>
              <p className="text-muted-foreground">Your booking history will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pastReservations.map((reservation) => (
                <Card key={reservation.id}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4">
                    <div className="space-y-1 mb-4 sm:mb-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{reservation.slot_id}</h3>
                        <Badge variant="outline" className="text-xs">
                          {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Spot {reservation.slot_id}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(reservation.start_time).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {reservation.start_time} - {reservation.end_time}
                      </p>
                      <p className="font-medium mt-1 flex items-center">
                        <IndianRupee className="h-3.5 w-3.5" />
                        {(reservation.total_amount || 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex gap-2 sm:flex-col">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Receipt
                      </Button>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
                        <Link to={`/reservations/${reservation.id}`}>
                          Details
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Parking QR Code</DialogTitle>
          </DialogHeader>
          {selectedReservation && (
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <QRCode 
                  value={JSON.stringify({
                    bookingId: selectedReservation.id,
                    spotId: selectedReservation.slot_id,
                    startTime: selectedReservation.start_time,
                    endTime: selectedReservation.end_time
                  })}
                  size={200}
                  level="H"
                />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="font-bold text-lg">{selectedReservation.parking_slots?.parking_locations?.name || 'Unknown Location'}</h3>
                <p className="text-sm text-muted-foreground">Spot {selectedReservation.parking_slots?.name}</p>
                <p className="font-medium">
                  {new Date(selectedReservation.start_time).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedReservation.start_time).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })} - {new Date(selectedReservation.end_time).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReservationsPage;
