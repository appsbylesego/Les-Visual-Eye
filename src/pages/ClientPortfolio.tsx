import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HiArrowLeft, HiX, HiZoomIn, HiZoomOut } from 'react-icons/hi';

// Photo categories with exact structure
const photoCategories = [
  { id: 'face-closeups', title: 'Face Close-ups', count: 2, description: 'Intense and expressive shots that capture your eyes, emotion, and energy.' },
  { id: 'head-shoulders', title: 'Head & Shoulders Portrait', count: 2, description: 'A clean, confident composition — timeless and cinematic.' },
  { id: 'half-body', title: 'Half-Body Shot', count: 2, description: 'Waist-up portraits that show attitude, confidence, and movement.' },
  { id: 'full-body', title: 'Full-Body Portrait', count: 2, description: 'Elegant posing and full presence — captures your outfit, stance, and personality.' },
  { id: 'walking-motion', title: 'Walking / Motion Shot', count: 2, description: 'Natural movement and energy, as if caught mid-scene.' },
  { id: 'looking-away', title: 'Looking Away Shot', count: 1, description: 'A reflective, cinematic moment — effortless and emotional.' },
  { id: 'seated-pose', title: 'Seated Pose', count: 1, description: 'Relaxed and grounded, with a storytelling composition.' },
  { id: 'over-shoulder', title: 'Over-the-Shoulder Look Back', count: 1, description: 'Adds mystery and intrigue — a perfect movie-style frame.' },
  { id: 'expression-series', title: 'Expression Series', count: 3, description: 'A range of emotions: smile, serious, confident — showing your versatility.' },
  { id: 'dramatic-lighting', title: 'Dramatic Lighting Portrait', count: 2, description: 'Strong light and shadow contrast — your cinematic finale.' },
];

// Sample client data
const clientData: any = {
  'client-1': {
    name: 'Client Name 1',
    date: 'January 2025',
    location: 'Pretoria',
    photos: {
      'face-closeups': [
        '/clients/client-1/face-1.jpg',
        '/clients/client-1/face-2.jpg',
      ],
      'head-shoulders': [
        '/clients/client-1/head-1.jpg',
        '/clients/client-1/head-2.jpg',
      ],
      // Add more categories...
    }
  },
  // Add more clients...
};

const ClientPortfolio = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const client = clientData[clientId || ''] || {
    name: 'Sample Client',
    date: 'January 2025',
    location: 'Location',
    photos: {}
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 1));

  return (
    <div className="min-h-screen bg-charcoal text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-40 bg-charcoal/95 backdrop-blur-sm border-b border-gold/20"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link
              to="/gallery"
              className="flex items-center gap-2 text-gold hover:text-cinematic-orange transition-colors group"
            >
              <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Gallery</span>
            </Link>
            <div className="text-right">
              <h1 className="font-display text-xl md:text-2xl font-bold">{client.name}</h1>
              <p className="text-sm text-gray-400">{client.date} • {client.location}</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Portfolio Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Client Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Cinematic Session
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-lg text-gray-300">
            18 frames capturing every emotion, every angle, every story.
          </p>
        </motion.div>

        {/* Photo Categories */}
        <div className="space-y-16">
          {photoCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Category Header */}
              <div className="text-center md:text-left">
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-2 text-gold">
                  {category.title}
                  <span className="text-lg text-gray-400 ml-2">({category.count} Photo{category.count > 1 ? 's' : ''})</span>
                </h3>
                <p className="text-gray-400 italic">{category.description}</p>
              </div>

              {/* Photos Grid */}
              <div className={`grid gap-4 ${
                category.count === 1
                  ? 'grid-cols-1 md:grid-cols-1 max-w-2xl mx-auto'
                  : category.count === 2
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {Array.from({ length: category.count }).map((_, photoIndex) => (
                  <motion.div
                    key={photoIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: photoIndex * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    onClick={() => setSelectedImage(`${category.id}-${photoIndex}`)}
                    className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[3/4] bg-gradient-to-br from-gold/10 to-cinematic-orange/10"
                  >
                    {/* Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-cinematic-orange/20 flex items-center justify-center">
                      <div className="text-center p-4">
                        <p className="text-gray-400 text-sm">{category.title}</p>
                        <p className="text-gray-500 text-xs mt-1">Photo {photoIndex + 1}</p>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center">
                        <HiZoomIn className="text-gold text-5xl mb-2 mx-auto" />
                        <p className="text-white font-semibold">View Full Size</p>
                      </div>
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0 bg-gold/10 blur-xl" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-Screen Image Viewer */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center p-4"
            onClick={() => {
              setSelectedImage(null);
              setZoomLevel(1);
            }}
          >
            {/* Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                className="p-3 bg-charcoal/80 text-gold rounded-lg hover:bg-charcoal transition-colors"
              >
                <HiZoomOut className="text-2xl" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
                className="p-3 bg-charcoal/80 text-gold rounded-lg hover:bg-charcoal transition-colors"
              >
                <HiZoomIn className="text-2xl" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                  setZoomLevel(1);
                }}
                className="p-3 bg-charcoal/80 text-gold rounded-lg hover:bg-charcoal transition-colors"
              >
                <HiX className="text-2xl" />
              </motion.button>
            </div>

            {/* Zoom Level Indicator */}
            <div className="absolute top-4 left-4 px-4 py-2 bg-charcoal/80 text-gold rounded-lg">
              <span className="font-semibold">{Math.round(zoomLevel * 100)}%</span>
            </div>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-7xl max-h-full overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ scale: zoomLevel }}
                transition={{ duration: 0.3 }}
                className="origin-center"
              >
                {/* Placeholder for full-size image */}
                <div className="bg-gradient-to-br from-gold/30 to-cinematic-orange/30 rounded-lg aspect-[3/4] w-full max-w-3xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <p className="text-white text-xl mb-2">Full-Size Image</p>
                    <p className="text-gray-300 text-sm">ID: {selectedImage}</p>
                    <p className="text-gray-400 text-xs mt-2">Add actual image here</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Navigation hint */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
              Click outside to close • Use zoom buttons to adjust size
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientPortfolio;
