import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, SparklesIcon } from '@heroicons/react/outline';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Predefined categories
const CATEGORIES = [
  'appetizers',
  'main-courses',
  'desserts',
  'drinks',
  'specials'
];

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('appetizers');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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

  // Fetch menu items when component mounts
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/menu`);
        setMenuItems(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to load menu items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Filter items based on selected category
  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

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
            Our Menu
          </h1>
          <p className="text-xl text-gold-light mb-8 opacity-0 animate-slide-up" 
             style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            Discover our culinary masterpieces
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 container mx-auto px-4" id="categories" data-animate>
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORIES.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`relative group px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category 
                  ? 'text-white' 
                  : 'text-secondary hover:text-white'
              }`}
              style={{ 
                opacity: isVisible.categories ? 1 : 0,
                transform: isVisible.categories ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease-out ${index * 100}ms`
              }}
            >
              <span className={`absolute inset-0 rounded-full transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-gradient-gold opacity-100' 
                  : 'bg-gradient-gold opacity-0 group-hover:opacity-100'
              }`}></span>
              <span className="relative capitalize">{category.replace('-', ' ')}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Menu Items Section */}
      <section className="pb-24 container mx-auto px-4" id="menu-items" data-animate>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading menu items...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No items available in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredItems.map((item, index) => (
              <div 
                key={item._id}
                className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ 
                  opacity: isVisible['menu-items'] ? 1 : 0,
                  transform: isVisible['menu-items'] ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease-out ${index * 200}ms`
                }}
              >
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                  <img 
                    src={`${API_URL}/${item.image}`}
                    alt={item.name}
                    className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-serif text-secondary group-hover:text-primary transition-colors duration-300">
                      {item.name}
                    </h3>
                    <span className="text-xl font-medium text-primary">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients && item.ingredients.map((ingredient, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gold-light/10 text-primary"
                      >
                        {ingredient}
                      </span>
                    ))}
                    {item.dietaryInfo && Object.entries(item.dietaryInfo).map(([key, value]) => 
                      value && (
                        <span 
                          key={key}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                        >
                          <SparklesIcon className="w-4 h-4 mr-1" />
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Reservation CTA */}
      <section className="relative py-24 bg-secondary" id="cta" data-animate>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-primary/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif text-white mb-6">Ready to Experience Our Cuisine?</h2>
          <p className="text-xl text-gold-light mb-12 max-w-2xl mx-auto">
            Join us for an unforgettable dining experience. Make your reservation today 
            and let us create a memorable evening for you.
          </p>
          <Link 
            to="/reservation" 
            className="group relative inline-flex items-center px-8 py-4 text-lg font-medium overflow-hidden rounded-full"
          >
            <span className="absolute inset-0 bg-gradient-gold opacity-90 transform transition-transform duration-300 group-hover:scale-105"></span>
            <span className="relative text-white flex items-center">
              Reserve Your Table
              <ChevronRightIcon className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Menu; 