
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Car } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DriverSignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    driverLicense: '',
    vehicleModel: '',
    vehicleYear: '',
    experience: '',
    availability: [],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvailabilityChange = (day: string) => {
    setFormData((prev) => {
      const availability = [...(prev.availability as string[])];
      if (availability.includes(day)) {
        return {
          ...prev,
          availability: availability.filter(item => item !== day),
        };
      } else {
        return {
          ...prev,
          availability: [...availability, day],
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast({
        title: "Please accept the terms",
        description: "You must agree to the terms and conditions to apply as a driver.",
        variant: "destructive",
      });
      return;
    }

    if (formData.availability.length === 0) {
      toast({
        title: "Availability required",
        description: "Please select at least one day of availability.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    // This is a mock registration - in a real app, you'd connect to a backend
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock successful registration
      toast({
        title: "Application received",
        description: "Thank you for applying to be a ParkSmart driver! We'll review your application and contact you soon.",
      });
      
      navigate('/');
    }, 1500);
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-muted/30">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-2">
            <Car className="h-8 w-8 text-brand-purple" />
            <span className="font-display text-2xl font-semibold">ParkSmart</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
          Apply to be a valet driver
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-brand-purple hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="driverLicense">Driver's License Number</Label>
              <Input
                id="driverLicense"
                name="driverLicense"
                type="text"
                required
                value={formData.driverLicense}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicleModel">Vehicle Model</Label>
                <Input
                  id="vehicleModel"
                  name="vehicleModel"
                  type="text"
                  required
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  placeholder="e.g. Toyota Camry"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleYear">Vehicle Year</Label>
                <Input
                  id="vehicleYear"
                  name="vehicleYear"
                  type="text"
                  required
                  value={formData.vehicleYear}
                  onChange={handleChange}
                  placeholder="e.g. 2019"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Driving Experience (years)</Label>
              <Select 
                onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}
                defaultValue={formData.experience}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2">1-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5-10">5-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Availability</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox 
                      id={day} 
                      checked={(formData.availability as string[]).includes(day)} 
                      onCheckedChange={() => handleAvailabilityChange(day)}
                    />
                    <label
                      htmlFor={day}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {day}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={acceptTerms} 
                onCheckedChange={(checked) => setAcceptTerms(checked === true)}
              />
              <label
                htmlFor="terms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link to="/terms" className="text-brand-purple hover:underline">
                  terms and conditions
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Submitting application...' : 'Submit application'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverSignupPage;
