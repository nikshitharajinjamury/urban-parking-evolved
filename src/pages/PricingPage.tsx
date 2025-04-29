
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Car, CircleDollarSign, Briefcase } from 'lucide-react';

const PricingPage = () => {
  return (
    <div className="container py-12 px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold sm:text-4xl mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground">
          Choose the plan that's right for you and start parking smarter today.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Basic Plan */}
        <Card className="border-2 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Car className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle>Basic</CardTitle>
            <div className="mt-4 flex items-baseline text-gray-900">
              <span className="text-3xl font-bold tracking-tight">Free</span>
            </div>
            <CardDescription className="mt-2">
              Perfect for occasional parking needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-sm">Find available parking spots</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-sm">Pay-as-you-go pricing</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-sm">Digital parking passes</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-sm">Email receipts</p>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card className="border-2 border-brand-purple shadow-lg relative">
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2">
            <span className="bg-brand-purple text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              Popular
            </span>
          </div>
          
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-brand-soft-purple flex items-center justify-center mb-4">
              <CircleDollarSign className="h-6 w-6 text-brand-purple" />
            </div>
            <CardTitle>Premium</CardTitle>
            <div className="mt-4 flex items-baseline text-gray-900">
              <span className="text-3xl font-bold tracking-tight">$9.99</span>
              <span className="ml-1 text-xl font-semibold text-gray-500">/month</span>
            </div>
            <CardDescription className="mt-2">
              For regular commuters and daily drivers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-sm">All Basic features</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-sm"><strong>10% off</strong> all parking reservations</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-sm">Priority reservations</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-sm">Exclusive partner discounts</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-sm">24/7 customer support</p>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link to="/signup">Get Premium</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Business Plan */}
        <Card className="border-2 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle>Business</CardTitle>
            <div className="mt-4 flex items-baseline text-gray-900">
              <span className="text-3xl font-bold tracking-tight">$29.99</span>
              <span className="ml-1 text-xl font-semibold text-gray-500">/month</span>
            </div>
            <CardDescription className="mt-2">
              For businesses and teams with multiple vehicles.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-sm">All Premium features</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-sm"><strong>15% off</strong> all parking reservations</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-sm">Manage up to 5 vehicles</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-sm">Team management dashboard</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-sm">Monthly expense reports</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-sm">Dedicated account manager</p>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" asChild>
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 text-left">
          <div>
            <h3 className="text-lg font-medium mb-2">How does pay-per-use pricing work?</h3>
            <p className="text-muted-foreground">
              Our pay-per-use pricing varies by parking location. Each location sets their own rates that may vary based on time of day, duration, and demand. You'll always see the price before confirming your reservation.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Can I cancel my subscription?</h3>
            <p className="text-muted-foreground">
              Yes, you can cancel your Premium or Business subscription at any time. Your benefits will continue until the end of your billing period.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Is there a minimum commitment period?</h3>
            <p className="text-muted-foreground">
              No, our subscriptions are month-to-month with no long-term commitment required.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Do you offer corporate accounts?</h3>
            <p className="text-muted-foreground">
              Yes, we offer custom corporate solutions for businesses with more than 5 vehicles or specialized needs. Please contact our sales team for more information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
