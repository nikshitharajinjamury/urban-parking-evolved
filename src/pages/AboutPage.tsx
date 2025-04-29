
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Car, MapPin, Clock, Shield, Settings, Users, Building, Zap } from 'lucide-react';

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-brand-dark-purple text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Revolutionizing Urban Parking
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-lg">
                ParkSmart is on a mission to transform the way people park in cities through smart technology, seamless experiences, and innovative solutions.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-brand-purple to-brand-secondary-purple rounded-lg overflow-hidden flex items-center justify-center">
                <Car className="w-24 h-24 text-white opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="/placeholder.svg" 
                alt="Our Mission" 
                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                We're on a mission to eliminate the stress and inefficiency of urban parking. By leveraging technology and data, we're creating a future where finding and paying for parking is completely seamless.
              </p>
              <p className="text-lg text-muted-foreground">
                Our platform connects drivers with available parking spaces in real-time, reducing congestion, emissions, and the frustration of circling the block.
              </p>
              <div className="pt-4">
                <Button asChild>
                  <Link to="/map">Find Parking Near You</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Core Values</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              These principles guide everything we do as we work to transform urban parking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <Zap className="h-10 w-10 text-brand-purple mb-4" />
              <h3 className="text-xl font-medium mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                We're constantly exploring new technologies and approaches to solve parking challenges.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <Users className="h-10 w-10 text-brand-purple mb-4" />
              <h3 className="text-xl font-medium mb-2">Accessibility</h3>
              <p className="text-muted-foreground">
                We believe parking should be accessible to everyone, regardless of location or ability.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <Shield className="h-10 w-10 text-brand-purple mb-4" />
              <h3 className="text-xl font-medium mb-2">Security</h3>
              <p className="text-muted-foreground">
                We prioritize the security of your vehicle, your data, and your payments.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <Settings className="h-10 w-10 text-brand-purple mb-4" />
              <h3 className="text-xl font-medium mb-2">Efficiency</h3>
              <p className="text-muted-foreground">
                We optimize every aspect of parking to save you time, money, and frustration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Meet Our Leadership</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our diverse team brings together expertise from technology, urban planning, and transportation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-brand-purple/30 to-brand-secondary-purple/30 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <h3 className="text-xl font-medium">Sarah Johnson</h3>
              <p className="text-brand-purple font-medium">CEO & Founder</p>
              <p className="text-sm text-muted-foreground mt-2">
                Former urban mobility executive with 15+ years experience in smart city initiatives.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-brand-purple/30 to-brand-secondary-purple/30 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <h3 className="text-xl font-medium">Michael Chen</h3>
              <p className="text-brand-purple font-medium">CTO</p>
              <p className="text-sm text-muted-foreground mt-2">
                Tech innovator with background in IoT systems and smart infrastructure.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-brand-purple/30 to-brand-secondary-purple/30 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <h3 className="text-xl font-medium">Jessica Patel</h3>
              <p className="text-brand-purple font-medium">COO</p>
              <p className="text-sm text-muted-foreground mt-2">
                Operations expert specializing in scaling tech platforms across urban environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Partners</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              We collaborate with leading organizations to expand our parking network and enhance our services.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 h-24 flex items-center justify-center">
                <Building className="w-12 h-12 text-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-brand-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your parking experience?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of drivers who have already discovered the smarter way to park.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/map">Find Parking</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-purple" asChild>
              <Link to="/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
