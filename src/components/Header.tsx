import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, X, Car, User, CircleParking, CircleDollarSign, CircleHelp,
  LogOut, Settings, Calendar, Wrench, CreditCard
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const getInitials = () => {
    if (!user) return 'U';
    
    const email = user.email || '';
    if (email) {
      return email[0].toUpperCase();
    }
    
    return 'U';
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Car className="h-6 w-6 text-brand-purple" />
            <span className="font-display text-xl font-semibold">ParkSmart</span>
          </Link>
        </div>

        {!isMobile ? (
          <nav className="flex items-center gap-6">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/map" className="nav-link">Find Parking</Link>
            {user && <Link to="/reservations" className="nav-link">My Booking</Link>}
            <Link to="/pricing" className="nav-link">Pricing</Link>
            <Link to="/about" className="nav-link">About</Link>
            {user ? (
              <div className="ml-4 flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.email}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/services">
                        <Wrench className="mr-2 h-4 w-4" />
                        Services
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/subscriptions">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Subscriptions
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/reservations">
                        <Calendar className="mr-2 h-4 w-4" />
                        My Bookings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="ml-4 flex items-center gap-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </nav>
        ) : (
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="container pb-4 space-y-4 border-t pt-4 bg-background">
          <nav className="flex flex-col space-y-2">
            <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
            <Link to="/map" className="nav-link" onClick={toggleMenu}>Find Parking</Link>
            {user && <Link to="/reservations" className="nav-link" onClick={toggleMenu}>My Booking</Link>}
            <Link to="/pricing" className="nav-link" onClick={toggleMenu}>Pricing</Link>
            <Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link>
          </nav>
          <div className="flex flex-col space-y-2">
            {user ? (
              <>
                <div className="flex items-center space-x-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.email}</span>
                  </div>
                </div>
                <Link to="/profile" className="flex items-center space-x-2 px-4 py-2 text-sm" onClick={toggleMenu}>
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <Link to="/services" className="flex items-center space-x-2 px-4 py-2 text-sm" onClick={toggleMenu}>
                  <Wrench className="h-4 w-4" />
                  <span>Services</span>
                </Link>
                <Link to="/subscriptions" className="flex items-center space-x-2 px-4 py-2 text-sm" onClick={toggleMenu}>
                  <CreditCard className="h-4 w-4" />
                  <span>Subscriptions</span>
                </Link>
                <Link to="/reservations" className="flex items-center space-x-2 px-4 py-2 text-sm" onClick={toggleMenu}>
                  <Calendar className="h-4 w-4" />
                  <span>My Bookings</span>
                </Link>
                <Button onClick={handleSignOut} variant="destructive" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/login" onClick={toggleMenu}>Log In</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/signup" onClick={toggleMenu}>Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
