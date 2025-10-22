import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  'All',
  'Cinematic Faces',
  'Golden Hour',
  'Urban Vibes',
  'The Look Back',
  'Motion Frames'
];

// Placeholder images - user will replace with their actual portfolio
const portfolioItems = [
  { id: 1, category: 'Cinematic Faces', title: 'Cinematic Portrait 1', image: '/portfolio/1.jpg' },
  { id: 2, category: 'Golden Hour', title: 'Golden Hour 1', image: '/portfolio/2.jpg' },
  { id: 3, category: 'Urban Vibes', title: 'Urban Portrait 1', image: '/portfolio/3.jpg' },
  { id: 4, category: 'The Look Back', title: 'Look Back 1', image: '/portfolio/4.jpg' },
  { id: 5, category: 'Motion Frames', title: 'Motion 1', image: '/portfolio/5.jpg' },
  { id: 6, category: 'Cinematic Faces', title: 'Cinematic Portrait 2', image: '/portfolio/6.jpg' },
  { id: 7, category: 'Golden Hour', title: 'Golden Hour 2', image: '/portfolio/7.jpg' },
  { id: 8, category: 'Urban Vibes', title: 'Urban Portrait 2', image: '/portfolio/8.jpg' },
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredItems = selectedCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <section id="portfolio" className="relative py-20 px-4 md:px-8 lg:px-16 bg-charcoal">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          The Portfolio
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Every frame. Every emotion. Every story told through my lens.
        </p>

        {/* Explore More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-cinematic-orange text-charcoal font-bold rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-gold/50 transition-all duration-300"
          >
            <span>Explore More</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-gold text-charcoal scale-105'
                : 'bg-charcoal border border-gold text-gold hover:bg-gold hover:text-charcoal'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[3/4]"
            onClick={() => setSelectedImage(item.id)}
          >
            {/* Placeholder - replace with actual images */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-cinematic-orange/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-400 text-sm">Add Image</p>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div>
                <p className="text-gold text-sm uppercase tracking-wider">{item.category}</p>
                <h3 className="text-white font-semibold text-lg">{item.title}</h3>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 bg-gold/10 blur-xl" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gold transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <div className="max-w-5xl w-full aspect-[3/4] bg-gradient-to-br from-gold/20 to-cinematic-orange/20 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Selected Image: {selectedImage}</p>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Portfolio;
