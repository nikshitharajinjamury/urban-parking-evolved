
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Car, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <Link to="/reservations" className="nav-link">My Booking</Link>
            <Link to="/pricing" className="nav-link">Pricing</Link>
            <Link to="/about" className="nav-link">About</Link>
            <div className="ml-4 flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
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
            <Link to="/reservations" className="nav-link" onClick={toggleMenu}>My Booking</Link>
            <Link to="/pricing" className="nav-link" onClick={toggleMenu}>Pricing</Link>
            <Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link>
          </nav>
          <div className="flex flex-col space-y-2">
            <Button variant="outline" asChild className="w-full">
              <Link to="/login" onClick={toggleMenu}>Log In</Link>
            </Button>
            <Button asChild className="w-full">
              <Link to="/signup" onClick={toggleMenu}>Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
