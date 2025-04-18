import React, { useState, useEffect } from 'react';
import { PhoneIcon, MailIcon, LocationMarkerIcon, ClockIcon, SparklesIcon, ChevronRightIcon } from '@heroicons/react/outline';

const Contact = () => {
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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

  const contactInfo = [
    {
      icon: <LocationMarkerIcon className="w-6 h-6 text-primary" />,
      title: "Address",
      content: "123 Luxury Lane\nCityville, ST 12345"
    },
    {
      icon: <PhoneIcon className="w-6 h-6 text-primary" />,
      title: "Phone",
      content: "+1 (234) 567-8900"
    },
    {
      icon: <MailIcon className="w-6 h-6 text-primary" />,
      title: "Email",
      content: "reservations@oshaad.com"
    },
    {
      icon: <ClockIcon className="w-6 h-6 text-primary" />,
      title: "Hours",
      content: "Lunch: 11:30 AM - 2:30 PM\nDinner: 6:00 PM - 10:00 PM"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 z-20"></div>
        
        <div className="relative z-30 text-center">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 opacity-0 animate-slide-down" 
              style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            Contact Us
          </h1>
          <p className="text-xl text-gold-light mb-8 opacity-0 animate-slide-up" 
             style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            Get in touch with us for inquiries and reservations
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 container mx-auto px-4" id="contact-details" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SparklesIcon className="w-12 h-12 mx-auto text-gold mb-6 animate-float" />
            <h2 className="text-4xl font-serif mb-6 relative inline-block">
              Connect With Oshaad
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-gold transform origin-left transition-transform duration-500"
                style={{ transform: isVisible['contact-details'] ? 'scaleX(1)' : 'scaleX(0)' }}></span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We value your feedback and inquiries. Please reach out to us using the form below 
              or through our contact details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div
              style={{ 
                opacity: isVisible['contact-details'] ? 1 : 0,
                transform: isVisible['contact-details'] ? 'translateX(0)' : 'translateX(-20px)',
                transition: `all 0.6s ease-out 200ms`
              }}
            >
              <h3 className="text-3xl font-serif text-secondary mb-8">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="group relative inline-flex items-center px-8 py-3 text-lg font-medium overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-gold opacity-90 transform transition-transform duration-300 group-hover:scale-105"></span>
                  <span className="relative text-white flex items-center">
                    Send Message
                    <ChevronRightIcon className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div
              style={{ 
                opacity: isVisible['contact-details'] ? 1 : 0,
                transform: isVisible['contact-details'] ? 'translateX(0)' : 'translateX(20px)',
                transition: `all 0.6s ease-out 400ms`
              }}
            >
              <h3 className="text-3xl font-serif text-secondary mb-8">Contact Details</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-gradient-gold transform transition-all duration-300 group-hover:scale-110">
                        {React.cloneElement(item.icon, { className: "w-6 h-6 text-primary group-hover:text-white" })}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 whitespace-pre-line">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Placeholder for future implementation */}
      {/* <section className="py-24 bg-light" id="map" data-animate>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif text-center mb-12">Find Us</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
             Map implementation would go here 
             <div className="bg-gray-200 h-full flex items-center justify-center">
              <p className="text-gray-500">Map Loading...</p>
            </div> 
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Contact; 