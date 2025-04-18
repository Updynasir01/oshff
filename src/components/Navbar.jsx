import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reservation', path: '/reservation' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-secondary/95 backdrop-blur-md py-4 shadow-lg' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="relative group"
          >
            <span className={`text-2xl font-serif ${scrolled ? 'text-white' : 'text-white'} transition-colors duration-300`}>
              Oshaad
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative group ${
                  isActive(link.path) 
                    ? 'text-primary' 
                    : scrolled ? 'text-white' : 'text-white'
                } hover:text-primary transition-colors duration-300`}
              >
                <span className="relative">
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold transition-all duration-300 group-hover:w-full ${
                    isActive(link.path) ? 'w-full' : ''
                  }`}></span>
                </span>
              </Link>
            ))}
            <Link
              to="/reservation"
              className="relative group inline-flex items-center px-6 py-2 overflow-hidden"
            >
              <span className={`absolute inset-0 border-2 ${
                scrolled ? 'border-primary' : 'border-white'
              } rounded-full transition-all duration-300 group-hover:border-primary`}></span>
              <span className="absolute inset-0 bg-gradient-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
              <span className={`relative ${
                scrolled ? 'text-white' : 'text-white'
              } group-hover:text-white transition-colors duration-300 font-medium`}>
                Book a Table
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 focus:outline-none group"
          >
            <div className="absolute inset-0 transform transition-transform duration-300 flex items-center justify-center">
              {isOpen ? (
                <XIcon className={`w-6 h-6 ${scrolled ? 'text-white' : 'text-white'} transform rotate-0 transition-all duration-300 group-hover:rotate-180 group-hover:text-primary`} />
              ) : (
                <MenuIcon className={`w-6 h-6 ${scrolled ? 'text-white' : 'text-white'} transform rotate-0 transition-all duration-300 group-hover:rotate-180 group-hover:text-primary`} />
              )}
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden ${
          isOpen 
            ? 'max-h-screen opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        } transition-all duration-300 ease-in-out overflow-hidden`}>
          <div className="py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block relative group ${
                  isActive(link.path) 
                    ? 'text-primary' 
                    : 'text-white'
                } hover:text-primary transition-colors duration-300`}
              >
                <span className="relative inline-block">
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold transition-all duration-300 group-hover:w-full ${
                    isActive(link.path) ? 'w-full' : ''
                  }`}></span>
                </span>
              </Link>
            ))}
            <Link
              to="/reservation"
              onClick={() => setIsOpen(false)}
              className="block relative group"
            >
              <span className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
              <span className="relative inline-block px-6 py-2 text-white border-2 border-white group-hover:border-transparent rounded-lg transition-colors duration-300">
                Book a Table
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 