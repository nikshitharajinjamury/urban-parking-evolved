import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { IndianRupee, CreditCard, CircleDollarSign, CheckCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const SubscriptionsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("pricing");

  const subscriptions = [
    {
      id: "basic",
      name: "Basic Plan",
      price: "₹800/month",
      amount: 800,
      features: ["Unlimited parking up to 3 hours/day", "Access to standard spots", "Mobile app access"],
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: "₹1,500/month",
      amount: 1500,
      features: ["Unlimited parking", "Access to all spots including premium", "Valet service included", "Priority booking"],
      popular: true,
    },
    {
      id: "yearly",
      name: "Yearly Plan",
      price: "₹15,000/year",
      amount: 15000,
      features: ["All premium features", "20% discount on yearly subscription", "Free car wash monthly", "Reserved parking guarantee"],
    },
  ];

  const pricingOptions = [
    {
      id: "hourly",
      name: "Hourly Parking",
      description: "Pay only for what you use",
      priceRange: "₹20 - ₹50 per hour",
      features: [
        "Standard spots: ₹20-30/hr",
        "Premium spots: ₹35-45/hr",
        "VIP spots: ₹50/hr",
        "Dynamic pricing based on demand"
      ]
    },
    {
      id: "daily",
      name: "Daily Pass",
      description: "Perfect for day trips",
      priceRange: "₹150 - ₹350 per day",
      features: [
        "Standard spots: ₹150-200/day", 
        "Premium spots: ₹250-300/day", 
        "VIP spots: ₹350/day",
        "Complimentary valet service"
      ]
    },
    {
      id: "weekend",
      name: "Weekend Pass",
      description: "Great for weekend getaways",
      priceRange: "₹400 - ₹800 per weekend",
      features: [
        "Standard spots: ₹400-500/weekend", 
        "Premium spots: ₹600-700/weekend", 
        "VIP spots: ₹800/weekend",
        "Extended hours access"
      ]
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
      
      // Create a checkout session with Stripe
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-checkout', {
        body: {
          planId,
          amount,
          successUrl: `${window.location.origin}/subscriptions?success=true`,
          cancelUrl: `${window.location.origin}/subscriptions?canceled=true`
        }
      });

      if (checkoutError) {
        throw checkoutError;
      }

      if (checkoutData?.url) {
        // Redirect to Stripe Checkout
        window.location.href = checkoutData.url;
      } else {
        throw new Error("No checkout URL returned");
      }
      
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
      <h1 className="text-3xl font-bold mb-8">Pricing & Subscription Plans</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="pricing" className="flex items-center gap-2">
            <CircleDollarSign size={16} />
            Parking Rates
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <CreditCard size={16} />
            Subscription Plans
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pricing" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Pay-as-you-go Parking Options</h2>
            <p className="text-muted-foreground mt-2">Flexible pricing options for every need</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingOptions.map((option) => (
              <Card key={option.id} className="flex flex-col border-2">
                <CardHeader>
                  <CardTitle>{option.name}</CardTitle>
                  <p className="text-muted-foreground">{option.description}</p>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <div className="mb-4">
                    <p className="text-2xl font-bold">{option.priceRange}</p>
                  </div>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {option.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Button asChild className="w-full">
                      <Link to="/map">Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="bg-muted p-6 rounded-lg mt-8">
            <h3 className="text-lg font-medium mb-4">Dynamic Pricing Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Location Based</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Premium locations (mall entrances, business districts): +20-30% price</li>
                  <li>Standard locations: Base price</li>
                  <li>Remote locations: -10-20% price</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Time Based</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Peak hours (9am-11am, 4pm-7pm): +15-25% price</li>
                  <li>Standard hours: Base price</li>
                  <li>Off-peak hours (late night): -15-25% price</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Demand Based</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>High occupancy (80-100%): +10-20% price</li>
                  <li>Medium occupancy (50-80%): Base price</li>
                  <li>Low occupancy (0-50%): -10-20% price</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Special Events</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Major events (concerts, sports): +25-40% price</li>
                  <li>Local festivals: +15-25% price</li>
                  <li>Weekend rates: +10% price</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="subscription" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Subscription Plans</h2>
            <p className="text-muted-foreground mt-2">Choose the plan that fits your parking needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptions.map((subscription) => (
              <Card key={subscription.id} className={`flex flex-col ${subscription.popular ? 'border-brand-purple border-2' : ''}`}>
                {subscription.popular && (
                  <div className="bg-brand-purple text-white text-center py-1">
                    <span className="text-xs font-semibold uppercase">Most Popular</span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{subscription.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-2xl font-bold mb-4">{subscription.price}</p>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {subscription.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Button 
                      onClick={() => handleSubscribe(subscription.id, subscription.amount)}
                      disabled={loading === subscription.id}
                      className="w-full"
                    >
                      {loading === subscription.id ? "Processing..." : "Subscribe Now"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionsPage;
