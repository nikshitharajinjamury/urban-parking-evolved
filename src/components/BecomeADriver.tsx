
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car, Briefcase, BadgeCheck } from 'lucide-react';

const BecomeADriver = () => {
  return (
    <div className="bg-gradient-to-r from-brand-purple/5 to-brand-blue/5 py-16 px-4 sm:px-6 lg:px-8 rounded-2xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-4">Join Our Valet Driver Network</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Become a ParkSmart valet driver and earn money on your own schedule while helping others park with ease.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="bg-background rounded-lg p-6 shadow-sm">
            <div className="h-12 w-12 bg-brand-purple/10 rounded-full flex items-center justify-center mb-4">
              <Car className="h-6 w-6 text-brand-purple" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Flexible Hours</h3>
            <p className="text-muted-foreground">
              Work when you want. Set your own schedule and availability based on your lifestyle.
            </p>
          </div>

          <div className="bg-background rounded-lg p-6 shadow-sm">
            <div className="h-12 w-12 bg-brand-purple/10 rounded-full flex items-center justify-center mb-4">
              <Briefcase className="h-6 w-6 text-brand-purple" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Competitive Pay</h3>
            <p className="text-muted-foreground">
              Earn competitive rates plus tips. Get paid weekly directly to your bank account.
            </p>
          </div>

          <div className="bg-background rounded-lg p-6 shadow-sm">
            <div className="h-12 w-12 bg-brand-purple/10 rounded-full flex items-center justify-center mb-4">
              <BadgeCheck className="h-6 w-6 text-brand-purple" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Easy Onboarding</h3>
            <p className="text-muted-foreground">
              Quick approval process. Just provide your license, insurance, and pass a background check.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-brand-purple hover:bg-brand-purple/90">
            <Link to="/driver-signup">Apply to Drive</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BecomeADriver;
