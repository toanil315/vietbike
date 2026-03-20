import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bike, User, LayoutDashboard, Search, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Fleet', href: '/bikes' },
    { name: 'Locations', href: '/#locations' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20 flex items-center px-4 md:px-8",
        scrolled 
          ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-outline-variant/10 h-16" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-primary/20">
            <Bike size={22} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-on-surface">
            VIET<span className="text-primary">BIKE</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:text-primary relative group",
                  location.pathname === link.href ? "text-primary" : "text-secondary"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                  location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                )}></span>
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-outline-variant/20 mx-2"></div>

          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="p-2 text-secondary hover:text-primary transition-colors"
              title="Admin Dashboard"
            >
              <LayoutDashboard size={20} />
            </Link>
            <Link
              to="/bikes"
              className="bg-on-surface text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary transition-all duration-500 shadow-xl shadow-black/5 active:scale-95"
            >
              Book a Ride
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface transition-colors hover:bg-primary/10 hover:text-primary" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 bg-white rounded-[2.5rem] shadow-2xl border border-outline-variant/10 p-8 flex flex-col gap-6 md:hidden z-50"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-xl font-bold transition-colors",
                  location.pathname === link.href ? "text-primary" : "text-on-surface"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-outline-variant/10 my-2"></div>
            <Link
              to="/admin"
              className="flex items-center gap-3 text-lg font-bold text-secondary"
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard size={20} />
              Admin Dashboard
            </Link>
            <Link
              to="/bikes"
              className="bg-primary text-white px-6 py-5 rounded-3xl text-center font-black uppercase tracking-widest shadow-xl shadow-primary/20"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
