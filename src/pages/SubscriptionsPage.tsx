
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { IndianRupee, CreditCard, CheckCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const SubscriptionsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("subscription");

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
      
      // Use window.STRIPE_PUBLIC_KEY directly
      const stripePublicKey = window.STRIPE_PUBLIC_KEY || 'pk_test_51RECoGPd7yAFrHXYQQbnJcrLHCFwLNomcxso70EgPll9cAbqUmaHz8DMj9jWcnuj1O9FgFyHXkqCc7xocR8BItrT00UnJcpNzf';
      
      // In a real implementation, we would create a Checkout Session with Stripe
      // For now, let's simulate the process with a delay
      toast({
        title: "Processing Subscription",
        description: "Setting up your subscription...",
      });
      
      // Simulate a successful subscription process after a delay
      setTimeout(() => {
        toast({
          title: "Subscription Activated!",
          description: `You've successfully subscribed to the ${planId} plan.`,
        });
        setLoading(null);
      }, 2000);
      
    } catch (error: any) {
      console.error('Full error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process subscription. Please try again.",
        variant: "destructive",
      });
      setLoading(null);
    }
  };

  return (
    <div className="container py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Subscription Plans</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-1 mb-6">
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <CreditCard size={16} />
            Subscription Plans
          </TabsTrigger>
        </TabsList>
        
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
