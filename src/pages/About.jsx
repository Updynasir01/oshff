import React, { useState, useEffect } from 'react';
import { SparklesIcon, UserGroupIcon, HeartIcon, StarIcon } from '@heroicons/react/outline';

const About = () => {
  const [isVisible, setIsVisible] = useState({});

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

  const values = [
    {
      icon: <SparklesIcon className="w-8 h-8 text-gold" />,
      title: "Culinary Excellence",
      description: "We strive for perfection in every dish, combining traditional techniques with modern innovation."
    },
    {
      icon: <UserGroupIcon className="w-8 h-8 text-gold" />,
      title: "Exceptional Service",
      description: "Our dedicated team ensures every guest receives personalized attention and memorable experiences."
    },
    {
      icon: <HeartIcon className="w-8 h-8 text-gold" />,
      title: "Passion for Food",
      description: "We pour our hearts into creating dishes that inspire and delight our guests."
    },
    {
      icon: <StarIcon className="w-8 h-8 text-gold" />,
      title: "Quality Ingredients",
      description: "We source the finest ingredients from local producers and trusted suppliers."
    }
  ];

  const team = [
    {
      name: "Chef Michael Anderson",
      role: "Executive Chef",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80",
      description: "With over 15 years of culinary experience, Chef Michael brings his passion for innovative cuisine to every dish."
    },
    {
      name: "Sarah Williams",
      role: "Restaurant Manager",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&q=80",
      description: "Sarah ensures that every guest receives exceptional service and leaves with unforgettable memories."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 z-20"></div>
        
        <div className="relative z-30 text-center">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 opacity-0 animate-slide-down" 
              style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            Our Story
          </h1>
          <p className="text-xl text-gold-light mb-8 opacity-0 animate-slide-up" 
             style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            A journey of passion, flavor, and excellence
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 container mx-auto px-4" id="story" data-animate>
        <div className="max-w-4xl mx-auto text-center">
          <SparklesIcon className="w-12 h-12 mx-auto text-gold mb-6 animate-float" />
          <h2 className="text-4xl font-serif mb-6 relative inline-block">
            Our Journey
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-gold transform origin-left transition-transform duration-500"
              style={{ transform: isVisible.story ? 'scaleX(1)' : 'scaleX(0)' }}></span>
          </h2>
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-gray-600 mb-8">
              Founded with a passion for exceptional dining experiences, Oshaad Restaurant has been serving 
              our community with delectable dishes and memorable moments. Our commitment to quality ingredients, 
              innovative recipes, and impeccable service sets us apart in the culinary landscape.
            </p>
            <p className="text-lg text-gray-600">
              Our team of experienced chefs brings together traditional flavors and modern techniques to create 
              dishes that delight and inspire. Every plate that leaves our kitchen is crafted with care and 
              attention to detail, ensuring an unforgettable dining experience for our guests.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden" id="values" data-animate>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-primary/20 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-6">Our Values</h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="text-center group"
                style={{ 
                  opacity: isVisible.values ? 1 : 0,
                  transform: isVisible.values ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease-out ${index * 200}ms`
                }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-secondary-dark rounded-lg transform transition-transform duration-300 group-hover:scale-110">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-serif text-gold-light mb-4">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 container mx-auto px-4" id="team" data-animate>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-6 relative inline-block">
            Meet Our Team
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-gold transform origin-left transition-transform duration-500"
              style={{ transform: isVisible.team ? 'scaleX(1)' : 'scaleX(0)' }}></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <div 
              key={index}
              className="group relative"
              style={{ 
                opacity: isVisible.team ? 1 : 0,
                transform: isVisible.team ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease-out ${index * 200}ms`
              }}
            >
              <div className="relative aspect-w-16 aspect-h-12 overflow-hidden rounded-lg mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-serif text-secondary mb-2">{member.name}</h3>
              <p className="text-primary font-medium mb-4">{member.role}</p>
              <p className="text-gray-600">{member.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About; 