
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from './use-toast';

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  is_driver: boolean;
  created_at: string;
  updated_at: string;
}

interface DriverProfile {
  id: string;
  driver_license: string | null;
  vehicle_model: string | null;
  vehicle_year: string | null;
  experience: string | null;
  availability: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [driverProfile, setDriverProfile] = useState<DriverProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchProfile() {
      if (!user) {
        setProfile(null);
        setDriverProfile(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          throw profileError;
        }
        
        setProfile(profileData);

        // Check if user is a driver, fetch driver profile
        if (profileData.is_driver) {
          const { data: driverData, error: driverError } = await supabase
            .from('driver_profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (driverError && driverError.code !== 'PGRST116') { // Not found is fine
            throw driverError;
          }
          
          setDriverProfile(driverData);
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        toast({
          title: 'Error loading profile',
          description: error.message || 'Could not load your profile data.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [user, toast]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
      
      return true;
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error updating profile',
        description: error.message || 'Could not update your profile.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const updateDriverProfile = async (updates: Partial<DriverProfile>) => {
    if (!user || !profile?.is_driver) return;

    try {
      const { error } = await supabase
        .from('driver_profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setDriverProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: 'Driver profile updated',
        description: 'Your driver profile has been updated successfully.',
      });
      
      return true;
    } catch (error: any) {
      console.error('Error updating driver profile:', error);
      toast({
        title: 'Error updating driver profile',
        description: error.message || 'Could not update your driver profile.',
        variant: 'destructive',
      });
      return false;
    }
  };

  return {
    profile,
    driverProfile,
    isLoading,
    updateProfile,
    updateDriverProfile,
  };
}
