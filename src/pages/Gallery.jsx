import React, { useState, useEffect } from 'react';
import { SparklesIcon } from '@heroicons/react/outline';

const Gallery = () => {
  const [isVisible, setIsVisible] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

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

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80',
      category: 'Interior',
      title: 'Main Dining Hall'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
      category: 'Ambiance',
      title: 'Evening Atmosphere'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80',
      category: 'Dishes',
      title: 'Signature Salmon'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80',
      category: 'Dishes',
      title: 'Braised Short Ribs'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80',
      category: 'Interior',
      title: 'Private Dining Room'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1428515613728-6b4607e44363?auto=format&fit=crop&q=80',
      category: 'Kitchen',
      title: 'Chef\'s Table'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 z-20"></div>
        
        <div className="relative z-30 text-center">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 opacity-0 animate-slide-down" 
              style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            Our Gallery
          </h1>
          <p className="text-xl text-gold-light mb-8 opacity-0 animate-slide-up" 
             style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            Experience the ambiance and culinary artistry
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 container mx-auto px-4" id="gallery" data-animate>
        <div className="text-center mb-16">
          <SparklesIcon className="w-12 h-12 mx-auto text-gold mb-6 animate-float" />
          <h2 className="text-4xl font-serif mb-6 relative inline-block">
            Moments & Memories
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-gold transform origin-left transition-transform duration-500"
              style={{ transform: isVisible.gallery ? 'scaleX(1)' : 'scaleX(0)' }}></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collection of images showcasing our restaurant's 
            ambiance, signature dishes, and memorable moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative cursor-pointer"
              onClick={() => setSelectedImage(image)}
              style={{ 
                opacity: isVisible.gallery ? 1 : 0,
                transform: isVisible.gallery ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease-out ${index * 200}ms`
              }}
            >
              <div className="relative aspect-w-16 aspect-h-12 overflow-hidden rounded-lg">
                <img
                  src={image.src}
                  alt={image.title}
                  className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="text-gold-light text-sm font-medium mb-2 block">
                      {image.category}
                    </span>
                    <h3 className="text-xl font-serif">{image.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full animate-scale">
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/70 to-transparent rounded-b-lg">
              <span className="text-gold-light text-sm font-medium mb-2 block">
                {selectedImage.category}
              </span>
              <h3 className="text-2xl font-serif">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery; 