
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { MapPin, Calendar, Clock, IndianRupee, X, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data
const activeReservations = [
  {
    id: 'res-001',
    location: 'Downtown Garage',
    spot: 'A-Block',
    date: '2023-06-15',
    startTime: '10:00 AM',
    endTime: '2:00 PM',
    status: 'active',
    totalPrice: 1599,
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=RES-001-DOWNTOWN-A15',
  },
];

const pastReservations = [
  {
    id: 'res-002',
    location: 'Central Mall Parking',
    spot: 'Level-1',
    date: '2023-06-10',
    startTime: '9:00 AM',
    endTime: '11:00 AM',
    status: 'completed',
    totalPrice: 599,
  },
  {
    id: 'res-003',
    location: 'Tech Park Garage',
    spot: 'Tower-A',
    date: '2023-06-05',
    startTime: '1:00 PM',
    endTime: '4:00 PM',
    status: 'completed',
    totalPrice: 1299,
  },
];

const ReservationsPage = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(activeReservations[0] || null);
  const { toast } = useToast();

  const handleCancelReservation = (reservationId: string) => {
    toast({
      title: "Booking Cancelled",
      description: `Booking #${reservationId} has been cancelled successfully.`,
    });
  };

  const handleShowQR = (reservation: any) => {
    setSelectedReservation(reservation);
    setShowQRCode(true);
  };

  return (
    <div className="container py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Booking</h1>
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
          {activeReservations.length === 0 ? (
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
              {activeReservations.map((reservation) => (
                <Card key={reservation.id} className="overflow-hidden">
                  <CardHeader className="bg-brand-purple text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {reservation.location}
                        </CardTitle>
                        <CardDescription className="text-white/80 mt-1">
                          Spot {reservation.spot}
                        </CardDescription>
                      </div>
                      <Badge className="bg-white text-brand-purple hover:bg-white/90">Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">{new Date(reservation.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">{reservation.startTime} - {reservation.endTime}</p>
                          <p className="text-sm text-muted-foreground">4 hours</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">123 Downtown Street, City Center</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-bold flex items-center">
                        <IndianRupee className="h-3.5 w-3.5" />
                        {reservation.totalPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => handleCancelReservation(reservation.id)}>
                        Cancel
                      </Button>
                      <Button onClick={() => handleShowQR(reservation)}>
                        View QR
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastReservations.length === 0 ? (
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
                        <h3 className="font-medium">{reservation.location}</h3>
                        <Badge variant="outline" className="text-xs">Completed</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Spot {reservation.spot}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(reservation.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {reservation.startTime} - {reservation.endTime}
                      </p>
                      <p className="font-medium mt-1 flex items-center">
                        <IndianRupee className="h-3.5 w-3.5" />
                        {reservation.totalPrice.toFixed(2)}
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

      {/* QR Code Modal */}
      {showQRCode && selectedReservation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Parking Pass</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowQRCode(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <img 
                  src={selectedReservation.qrCode}
                  alt="QR Code"
                  className="mx-auto"
                />
              </div>
              
              <div className="space-y-2 mb-4">
                <h3 className="font-bold text-lg">{selectedReservation.location}</h3>
                <p className="text-sm text-muted-foreground">Spot {selectedReservation.spot}</p>
                <p className="font-medium">
                  {new Date(selectedReservation.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
                <p className="font-medium">{selectedReservation.startTime} - {selectedReservation.endTime}</p>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">
                Show this QR code at the parking entrance and exit.
              </p>
              
              <div className="flex gap-2">
                <Button variant="outline" className="w-full" onClick={() => setShowQRCode(false)}>
                  Close
                </Button>
                <Button className="w-full">
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationsPage;
