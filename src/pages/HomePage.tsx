
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, CreditCard, Shield, CarFront, Wallet, Wrench, Award } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Smart Parking <br />
                <span className="text-brand-soft-green">Made Simple</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-lg">
                Find, reserve and pay for parking spots across the city with just a few taps. Save time and drive stress-free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link to="/map">Find Parking</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20" asChild>
                  <Link to="/signup">Create Account</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/90 border-2 border-brand-purple" />
                  ))}
                </div>
                <p className="text-sm font-medium">Join 10,000+ drivers using ParkSmart</p>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="/placeholder.svg" 
                alt="ParkSmart App Demo" 
                className="rounded-lg shadow-2xl w-full max-w-md mx-auto transform translate-y-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How ParkSmart Works</h2>
            <p className="text-lg text-muted-foreground">
              Our platform makes finding and reserving parking spots seamless and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-brand-soft-purple flex items-center justify-center mb-4">
                  <MapPin className="text-brand-purple h-6 w-6" />
                </div>
                <CardTitle>Find Nearby Spots</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Discover available parking spots near your destination with our interactive map.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-brand-soft-green flex items-center justify-center mb-4">
                  <Clock className="text-green-700 h-6 w-6" />
                </div>
                <CardTitle>Reserve in Advance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Book your parking spot ahead of time to ensure availability when you arrive.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-brand-soft-orange flex items-center justify-center mb-4">
                  <CreditCard className="text-orange-700 h-6 w-6" />
                </div>
                <CardTitle>Easy Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Pay securely through our app with multiple payment options available.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-brand-soft-purple flex items-center justify-center mb-4">
                  <Shield className="text-brand-purple h-6 w-6" />
                </div>
                <CardTitle>Safe & Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Rest easy knowing your vehicle is in a monitored and secure parking location.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Services</h2>
            <p className="text-lg text-muted-foreground">
              Enhance your parking experience with our value-added services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <CarFront className="text-brand-purple h-6 w-6" />
                </div>
                <CardTitle>Valet Parking</CardTitle>
                <CardDescription>Let our professional valets park your car</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                      <svg className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>No waiting for parking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                      <svg className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Door-to-door service</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                      <svg className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Professional, vetted drivers</span>
                  </li>
                </ul>
                <Button className="w-full">Learn More</Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <Wrench className="text-brand-purple h-6 w-6" />
                </div>
                <CardTitle>Car Maintenance</CardTitle>
                <CardDescription>Service your car while parked</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                      <svg className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Car washing services</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                      <svg className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Oil changes and basic repairs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                      <svg className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Tire pressure and fluid checks</span>
                  </li>
                </ul>
                <Button className="w-full">Learn More</Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <Award className="text-brand-purple h-6 w-6" />
                </div>
                <CardTitle>Premium Membership</CardTitle>
                <CardDescription>Unlock exclusive benefits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                      <svg className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Priority reservations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                      <svg className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Discounted rates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                      <svg className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>24/7 premium support</span>
                  </li>
                </ul>
                <Button className="w-full">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-brand-dark-purple text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to transform your parking experience?</h2>
              <p className="text-lg opacity-90">
                Join thousands of satisfied users who have simplified their parking routine with ParkSmart.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20" asChild>
                  <Link to="/map">Find Spots Near Me</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-brand-purple">150+</div>
                  <div className="text-sm mt-2">Parking Locations</div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-brand-purple">24/7</div>
                  <div className="text-sm mt-2">Customer Support</div>
                </div>
              </div>
              <div className="space-y-4 mt-6">
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-brand-purple">10K+</div>
                  <div className="text-sm mt-2">Happy Users</div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-brand-purple">99%</div>
                  <div className="text-sm mt-2">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
