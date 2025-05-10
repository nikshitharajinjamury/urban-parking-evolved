import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

const ServicesPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  console.log('Current user:', user);

  const services = [
    {
      id: "petrol",
      name: "Petrol Refueling",
      description: "Market-dependent rates",
    },
    {
      id: "cleaning",
      name: "Car Cleaning",
      description: "₹100-₹300 (depending on the type of cleaning)",
    },
    {
      id: "repairs",
      name: "Minor Repairs",
      description: "Flexible pricing based on the issue",
    },
  ];

  const handleBookService = async (serviceId: string) => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to book a service",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(serviceId);
      
      // Create a service booking
      const { data, error } = await supabase
        .from('service_bookings')
        .insert({
          user_id: user.id,
          service_id: serviceId,
          status: 'pending',
          created_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Booking error:', error);
        throw error;
      }

      console.log('Booking successful:', data);

      toast({
        title: "Service Booked",
        description: "We'll contact you shortly to confirm the details",
      });
    } catch (error: any) {
      console.error('Full error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to book service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="container py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Our Services</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{service.description}</p>
              <Button 
                onClick={() => handleBookService(service.id)}
                disabled={loading === service.id}
              >
                {loading === service.id ? "Booking..." : "Book Service"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
