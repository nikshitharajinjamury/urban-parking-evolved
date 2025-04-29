
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IndianRupee } from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  details: string;
}

interface SubscriptionPlansProps {
  plans: SubscriptionPlan[];
  handleSubscribe: (planId: string) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ plans, handleSubscribe }) => {
  return (
    <div className="space-y-4">
      {plans.map((plan) => (
        <div key={plan.id} className="border rounded-lg p-4 hover:border-brand-purple transition-colors">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">{plan.name}</h3>
            <Badge variant="outline" className="bg-brand-soft-purple">
              {plan.period === 'month' ? 'Monthly' : 'Yearly'}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{plan.details}</p>
          <div className="flex justify-between items-end">
            <div className="font-bold text-xl flex items-center">
              <IndianRupee className="h-4 w-4" />
              {plan.price}
              <span className="text-sm font-normal text-muted-foreground">/{plan.period}</span>
            </div>
            <Button 
              onClick={() => handleSubscribe(plan.id)}
              variant="outline"
            >
              Subscribe
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
