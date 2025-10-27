import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiX } from 'react-icons/hi';

// Behind the scenes images - user will add actual photos
const behindTheScenes = [
  { id: 1, image: '/behind-the-lens/1.jpg', alt: 'Les with client 1' },
  { id: 2, image: '/behind-the-lens/2.jpg', alt: 'Les with client 2' },
  { id: 3, image: '/behind-the-lens/3.jpg', alt: 'Les with client 3' },
  { id: 4, image: '/behind-the-lens/4.jpg', alt: 'Les with client 4' },
  { id: 5, image: '/behind-the-lens/5.jpg', alt: 'Les with client 5' },
  { id: 6, image: '/behind-the-lens/6.jpg', alt: 'Les with client 6' },
];

const BehindTheLens = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="behind-the-lens" className="relative py-20 px-4 md:px-8 lg:px-16 bg-charcoal">
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold"
            >
              Behind the Lens with Les
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-gold italic"
            >
              Real people. Real energy. Real moments.
            </motion.p>

            <div className="w-32 h-1 bg-gradient-to-r from-gold to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-4 text-gray-300 text-lg leading-relaxed"
            >
              <p>
                Every shoot tells a story — and I believe the story isn't complete without a final frame.
              </p>
              <p>
                At the end of each session, I take a few portraits with my clients — natural, relaxed, and authentic.
                It's more than a photo; it's a moment of connection, a behind-the-scenes memory of the cinematic experience we created together.
              </p>
              <p>
                These images remind me why I do what I do — capturing emotion, building connections, and making every person feel like the main character of their story.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-cinematic-orange text-charcoal font-bold rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-gold/50 transition-all duration-300"
              >
                <span>Book Your Cinematic Session</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              {behindTheScenes.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => setSelectedImage(item.id)}
                  className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[3/4]"
                >
                  {/* Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-cinematic-orange/20 flex items-center justify-center">
                    <div className="text-center p-4">
                      <p className="text-gray-400 text-sm">Add Photo</p>
                      <p className="text-gray-500 text-xs mt-1">{item.image}</p>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 bg-gold/20 blur-xl" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Caption */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-center text-gray-400 italic text-sm mt-6"
            >
              Every story ends with a frame like this 🎬
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-4 bg-gold/20 hover:bg-gold/30 text-gold rounded-lg transition-colors"
          >
            <HiX className="text-3xl" />
          </button>

          {/* Image Container */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-5xl w-full aspect-[3/4] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Placeholder for full-size image */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/30 to-cinematic-orange/30 flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-white text-xl mb-2">Behind the Lens Image</p>
                <p className="text-gray-300 text-sm">Image {selectedImage}</p>
                <p className="text-gray-400 text-xs mt-2">Replace with actual photo</p>
              </div>
            </div>
          </motion.div>

          {/* Hint */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
            Click outside to close
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default BehindTheLens;
