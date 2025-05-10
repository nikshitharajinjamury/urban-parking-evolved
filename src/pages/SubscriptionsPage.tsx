import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

const SubscriptionsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const subscriptions = [
    {
      id: "basic",
      name: "Basic Plan",
      price: "₹800/month",
      amount: 800,
      features: ["Unlimited parking up to 3 hours/day"],
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: "₹1,500/month",
      amount: 1500,
      features: ["Unlimited parking", "Valet service included"],
    },
    {
      id: "yearly",
      name: "Yearly Plan",
      price: "Special offers available",
      amount: 15000,
      features: ["All premium features", "20% discount on yearly subscription"],
    },
  ];

  const handleSubscribe = async (planId: string, amount: number) => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to subscribe",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(planId);
      
      // Create a subscription
      const { data, error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          plan_id: planId,
          amount: amount,
          status: 'pending',
          start_date: new Date().toISOString(),
        });

      if (error) {
        console.error('Subscription error:', error);
        throw error;
      }

      console.log('Subscription successful:', data);

      toast({
        title: "Subscription Initiated",
        description: "You'll be redirected to the payment page",
      });

      // Here you would typically redirect to a payment gateway
      // For now, we'll just show a success message
      
    } catch (error: any) {
      console.error('Full error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="container py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Subscription Plans</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptions.map((subscription) => (
          <Card key={subscription.id}>
            <CardHeader>
              <CardTitle>{subscription.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">{subscription.price}</p>
              <ul className="space-y-2 mb-4">
                {subscription.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => handleSubscribe(subscription.id, subscription.amount)}
                disabled={loading === subscription.id}
              >
                {loading === subscription.id ? "Processing..." : "Subscribe Now"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
