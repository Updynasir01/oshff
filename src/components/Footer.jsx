import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-secondary text-white pt-20 pb-8 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-primary"></div>
      
      <div className="container relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="group">
            <h3 className="text-xl font-serif text-primary mb-6 relative inline-block">
              About Oshaad
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-gold transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </h3>
            <p className="text-gray-300 mb-4 animate-fade-in">
              Experience the finest dining with our carefully crafted dishes and exceptional service.
            </p>
            <div className="w-12 h-1 bg-primary transform origin-left transition-transform duration-300 group-hover:scale-x-150"></div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif text-primary mb-6 relative inline-block group">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-gold transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </h3>
            <ul className="space-y-3">
              {['Menu', 'Reservations', 'About Us', 'Contact'].map((item, index) => (
                <li key={item} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '')}`}
                    className="text-gray-300 hover:text-primary transition-all duration-300 relative group inline-block"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif text-primary mb-6 relative inline-block group">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-gold transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-center space-x-2 group animate-slide-up">
                <span className="w-5 h-px bg-primary transform origin-left transition-all duration-300 group-hover:w-8"></span>
                <span>123 Restaurant Street</span>
              </li>
              <li className="text-gray-300 flex items-center space-x-2 group animate-slide-up" style={{ animationDelay: '100ms' }}>
                <span className="w-5 h-px bg-primary transform origin-left transition-all duration-300 group-hover:w-8"></span>
                <span>City, Country</span>
              </li>
              <li className="text-gray-300 flex items-center space-x-2 group animate-slide-up" style={{ animationDelay: '200ms' }}>
                <span className="w-5 h-px bg-primary transform origin-left transition-all duration-300 group-hover:w-8"></span>
                <span>Phone: +1234567890</span>
              </li>
              <li className="text-gray-300 flex items-center space-x-2 group animate-slide-up" style={{ animationDelay: '300ms' }}>
                <span className="w-5 h-px bg-primary transform origin-left transition-all duration-300 group-hover:w-8"></span>
                <span>Email: info@oshaad.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-serif text-primary mb-6 relative inline-block group">
              Opening Hours
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-gold transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-300 animate-slide-up">Monday - Friday</li>
              <li className="text-gold-light animate-slide-up" style={{ animationDelay: '100ms' }}>9:00 AM - 10:00 PM</li>
              <li className="text-gray-300 animate-slide-up" style={{ animationDelay: '200ms' }}>Saturday - Sunday</li>
              <li className="text-gold-light animate-slide-up" style={{ animationDelay: '300ms' }}>10:00 AM - 11:00 PM</li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex justify-center space-x-8 mb-8">
            {['Facebook', 'Instagram', 'Twitter'].map((platform, index) => (
              <a
                key={platform}
                href="#"
                className="group relative"
                aria-label={platform}
              >
                <span className="absolute -inset-2 bg-gradient-gold opacity-0 rounded-full blur-sm transition-opacity duration-300 group-hover:opacity-20"></span>
                <svg 
                  className="h-6 w-6 text-gray-300 transform transition-all duration-300 group-hover:text-primary group-hover:scale-110" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {platform === 'Facebook' && (
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  )}
                  {platform === 'Instagram' && (
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  )}
                  {platform === 'Twitter' && (
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  )}
                </svg>
              </a>
            ))}
          </div>
          <p className="text-center text-gray-400 group">
            © {new Date().getFullYear()} 
            <span className="mx-2 text-primary">Oshaad Restaurant</span>
            <span className="relative inline-block">
              All rights reserved
              <span className="absolute -bottom-1 left-0 w-full h-px bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 