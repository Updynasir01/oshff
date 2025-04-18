import React, { useState, useEffect } from 'react';
import { CalendarIcon, ClockIcon, UserIcon, UserGroupIcon, PhoneIcon, SparklesIcon } from '@heroicons/react/outline';

const Reservation = () => {
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    occasion: '',
    specialRequests: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log(formData);
  };

  const timeSlots = [
    '11:30', '12:00', '12:30', '13:00', '13:30', '14:00',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
  ];

  const occasions = [
    'Birthday', 'Anniversary', 'Business Dinner', 'Date Night', 'Family Gathering', 'Other'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 z-20"></div>
        
        <div className="relative z-30 text-center">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 opacity-0 animate-slide-down" 
              style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            Make a Reservation
          </h1>
          <p className="text-xl text-gold-light mb-8 opacity-0 animate-slide-up" 
             style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            Reserve your table for an unforgettable dining experience
          </p>
        </div>
      </section>

      {/* Reservation Form Section */}
      <section className="py-24 container mx-auto px-4" id="reservation-form" data-animate>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <SparklesIcon className="w-12 h-12 mx-auto text-gold mb-6 animate-float" />
            <h2 className="text-4xl font-serif mb-6 relative inline-block">
              Book Your Table
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-gold transform origin-left transition-transform duration-500"
                style={{ transform: isVisible['reservation-form'] ? 'scaleX(1)' : 'scaleX(0)' }}></span>
            </h2>
            <p className="text-lg text-gray-600">
              Please fill in the form below and we'll confirm your reservation shortly
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Date Selection */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CalendarIcon className="w-5 h-5 inline-block mr-2 text-primary" />
                  Select Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  required
                />
              </div>

              {/* Time Selection */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ClockIcon className="w-5 h-5 inline-block mr-2 text-primary" />
                  Select Time
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  required
                >
                  <option value="">Select a time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              {/* Number of Guests */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <UserGroupIcon className="w-5 h-5 inline-block mr-2 text-primary" />
                  Number of Guests
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                  <option value="9+">9+ Guests</option>
                </select>
              </div>

              {/* Occasion */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <SparklesIcon className="w-5 h-5 inline-block mr-2 text-primary" />
                  Special Occasion
                </label>
                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                >
                  <option value="">Select occasion (optional)</option>
                  {occasions.map(occasion => (
                    <option key={occasion} value={occasion}>{occasion}</option>
                  ))}
                </select>
              </div>

              {/* Contact Information */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <UserIcon className="w-5 h-5 inline-block mr-2 text-primary" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  required
                />
              </div>

              {/* Phone */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <PhoneIcon className="w-5 h-5 inline-block mr-2 text-primary" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Special Requests */}
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                placeholder="Any dietary restrictions or special requests?"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="group relative inline-flex items-center px-8 py-4 text-lg font-medium overflow-hidden rounded-full"
              >
                <span className="absolute inset-0 bg-gradient-gold opacity-90 transform transition-transform duration-300 group-hover:scale-105"></span>
                <span className="relative text-white flex items-center">
                  Confirm Reservation
                  <SparklesIcon className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden" id="info" data-animate>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-primary/20 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <ClockIcon className="w-8 h-8 text-gold" />,
                title: "Opening Hours",
                content: "Lunch: 11:30 AM - 2:30 PM\nDinner: 6:00 PM - 10:00 PM"
              },
              {
                icon: <UserGroupIcon className="w-8 h-8 text-gold" />,
                title: "Group Bookings",
                content: "For parties of 9 or more, please contact us directly for special arrangements."
              },
              {
                icon: <SparklesIcon className="w-8 h-8 text-gold" />,
                title: "Special Events",
                content: "We offer customized menus and private dining spaces for special occasions."
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="text-center"
                style={{ 
                  opacity: isVisible.info ? 1 : 0,
                  transform: isVisible.info ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease-out ${index * 200}ms`
                }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-secondary-dark rounded-lg transform transition-transform duration-300 hover:scale-110">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-serif text-gold-light mb-4">{item.title}</h3>
                <p className="text-gray-300 whitespace-pre-line">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservation; 