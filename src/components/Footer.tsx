
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark-purple text-white pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Car className="h-6 w-6 text-brand-purple" />
              <span className="font-display text-xl font-semibold">ParkSmart</span>
            </Link>
            <p className="text-sm text-gray-300 max-w-xs">
              Revolutionizing urban parking management with smart technology and seamless user experience.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" aria-label="Facebook" className="hover:text-brand-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-brand-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-brand-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-brand-purple transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-brand-purple transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-brand-purple transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-brand-purple transition-colors">Blog</Link></li>
              <li><Link to="/partners" className="hover:text-brand-purple transition-colors">Partner With Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-medium mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/parking" className="hover:text-brand-purple transition-colors">Parking Reservations</Link></li>
              <li><Link to="/valet" className="hover:text-brand-purple transition-colors">Valet Service</Link></li>
              <li><Link to="/maintenance" className="hover:text-brand-purple transition-colors">Car Maintenance</Link></li>
              <li><Link to="/subscriptions" className="hover:text-brand-purple transition-colors">Subscriptions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 mt-0.5 text-brand-purple" />
                <span>123 Smart Street, Tech City, Innovation State, 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-brand-purple" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-brand-purple" />
                <span>contact@parksmart.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© 2023 ParkSmart. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-brand-purple transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-brand-purple transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
