import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, ClockIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/outline';

const Home = () => {
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

  const specialties = [
    {
      name: 'Grilled Salmon Citrus',
      description: 'Perfectly seared salmon with citrus glaze, served on a bed of wild rice.',
      price: '$28',
      image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80',
      category: 'Signature Dish'
    },
    {
      name: 'Braised Short Ribs',
      description: 'Tender braised short ribs with red wine reduction and truffle mashed potatoes.',
      price: '$32',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80',
      category: 'Chef\'s Special'
    },
    {
      name: 'Pan-Seared Scallops',
      description: 'Pan-seared scallops with butternut squash purée and crispy sage.',
      price: '$30',
      image: 'https://images.unsplash.com/photo-1599021456807-2340ca98c153?auto=format&fit=crop&q=80',
      category: 'Seafood'
    }
  ];

  const stats = [
    { number: '10+', label: 'Years of Excellence' },
    { number: '50+', label: 'Signature Dishes' },
    { number: '200+', label: 'Wine Selection' },
    { number: '1000+', label: 'Happy Customers' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80')" }}
        ></div>
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 z-20"></div>
        
        <div className="relative z-30 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 opacity-0 animate-slide-down" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
              Experience Fine Dining
            </h1>
            <p className="text-xl text-gold-light mb-8 opacity-0 animate-slide-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
              Indulge in an extraordinary culinary journey at Oshaad
            </p>
            <Link 
              to="/reservation" 
              className="group relative inline-flex items-center px-8 py-3 text-lg font-medium overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-gold opacity-90 transform transition-transform duration-300 group-hover:scale-105"></span>
              <span className="relative text-white flex items-center">
                Make a Reservation
                <ChevronRightIcon className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-float">
          <div className="w-1 h-16 relative">
            <div className="absolute inset-0 bg-gradient-gold animate-slide-down" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite' }}></div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 bg-white" id="welcome" data-animate>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <SparklesIcon className="w-12 h-12 mx-auto text-gold mb-6 animate-float" />
            <h2 className="text-4xl font-serif mb-6 relative inline-block">
              Welcome to Oshaad
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-gold transform origin-left transition-transform duration-500" 
                style={{ transform: isVisible.welcome ? 'scaleX(1)' : 'scaleX(0)' }}></span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-12">
              At Oshaad, we believe in creating more than just meals – we craft memorable dining experiences. 
              Our passionate chefs combine traditional techniques with modern innovation to bring you 
              extraordinary flavors that celebrate both local ingredients and global inspiration.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="group" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="text-3xl font-serif text-primary mb-2 group-hover:scale-110 transform transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-24 bg-light relative overflow-hidden" id="specialties" data-animate>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-gold/20 to-transparent"></div>
        
        <div className="container relative">
          <h2 className="text-4xl font-serif text-center mb-16 relative inline-block">
            Our Specialties
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-gold"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {specialties.map((dish, index) => (
              <div 
                key={index} 
                className="group relative transform transition-all duration-300 hover:-translate-y-2"
                style={{ 
                  opacity: isVisible.specialties ? 1 : 0,
                  transform: isVisible.specialties ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease-out ${index * 200}ms`
                }}
              >
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <div 
                    className="aspect-w-16 aspect-h-12 bg-gray-200 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${dish.image})` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-gradient-gold px-3 py-1 rounded-full text-white text-sm font-medium">
                    {dish.category}
                  </div>
                </div>
                <h3 className="text-2xl font-serif mb-2 group-hover:text-primary transition-colors duration-300">
                  {dish.name}
                </h3>
                <p className="text-gray-600 mb-4">{dish.description}</p>
                <p className="text-primary font-medium text-lg">{dish.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link 
              to="/menu" 
              className="group relative inline-flex items-center px-8 py-3 text-lg font-medium overflow-hidden rounded-full border-2 border-primary text-primary hover:text-white transition-colors duration-300"
            >
              <span className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                Explore Full Menu
                <ChevronRightIcon className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden" id="experience" data-animate>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/20 to-transparent"></div>
        <div className="container relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif mb-8 relative inline-block">
                The Oshaad Experience
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-gold transform origin-left transition-transform duration-500"
                  style={{ transform: isVisible.experience ? 'scaleX(1)' : 'scaleX(0)' }}></span>
              </h2>
              <div className="space-y-8">
                {[
                  {
                    icon: <SparklesIcon className="w-8 h-8 text-gold" />,
                    title: "Elegant Atmosphere",
                    description: "Immerse yourself in our sophisticated dining environment, where every detail has been carefully curated for your comfort."
                  },
                  {
                    icon: <UserGroupIcon className="w-8 h-8 text-gold" />,
                    title: "Expert Service",
                    description: "Our dedicated staff provides attentive, personalized service to ensure an exceptional dining experience."
                  },
                  {
                    icon: <ClockIcon className="w-8 h-8 text-gold" />,
                    title: "Culinary Excellence",
                    description: "Experience the artistry of our master chefs as they create dishes that delight both the palate and the eye."
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-4 group"
                    style={{ 
                      opacity: isVisible.experience ? 1 : 0,
                      transform: isVisible.experience ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `all 0.6s ease-out ${index * 200}ms`
                    }}
                  >
                    <div className="flex-shrink-0 p-2 bg-secondary-dark rounded-lg transform transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-serif mb-2 text-gold-light">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-w-1 aspect-h-1 transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80" 
                    alt="Restaurant interior" 
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="aspect-w-1 aspect-h-1 transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1428515613728-6b4607e44363?auto=format&fit=crop&q=80" 
                    alt="Food preparation" 
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="mt-8">
                <div className="aspect-w-1 aspect-h-2 transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80" 
                    alt="Dining experience" 
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation CTA Section */}
      <section className="relative py-32" id="cta" data-animate>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        </div>
        <div className="relative z-10 container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-serif text-white mb-6">Reserve Your Table</h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-8"></div>
            <p className="text-xl text-gold-light mb-12">
              Join us for an unforgettable dining experience. Make your reservation 
              today and let us create a memorable evening for you.
            </p>
            <Link 
              to="/reservation" 
              className="group relative inline-flex items-center px-8 py-4 text-lg font-medium overflow-hidden rounded-full"
            >
              <span className="absolute inset-0 bg-gradient-gold opacity-90 transform transition-transform duration-300 group-hover:scale-105"></span>
              <span className="relative text-white flex items-center">
                Book Your Experience
                <ChevronRightIcon className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 