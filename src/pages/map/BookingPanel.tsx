
import React from 'react';
import ReservationSummary from './ReservationSummary';
import SubscriptionPlans from './SubscriptionPlans';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, CircleDollarSign } from 'lucide-react';
import { ADDITIONAL_SERVICES, SUBSCRIPTION_PLANS, PARKING_SPOTS } from './constants';

interface BookingPanelProps {
  tab: string;
  setTab: (tab: string) => void;
  selectedSpot: string | null;
  date: Date | undefined;
  startTime: string;
  duration: number;
  additionalServices: string[];
  calculateTotal: () => number;
  handleReservation: () => void;
  handleSubscribe: (planId: string) => void;
  toggleService: (serviceId: string) => void;
}

const BookingPanel: React.FC<BookingPanelProps> = ({
  tab,
  setTab,
  selectedSpot,
  date,
  startTime,
  duration,
  additionalServices,
  calculateTotal,
  handleReservation,
  handleSubscribe,
  toggleService
}) => {
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
