import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HiArrowLeft, HiX, HiZoomIn, HiZoomOut, HiPlay, HiPause, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

// Photo categories with exact structure
const photoCategories = [
  { id: 'face-closeups', title: 'Face Close-Ups', count: 2, description: 'Intense and expressive shots that capture your eyes, emotion, and energy.' },
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
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [mouseTimeout, setMouseTimeout] = useState<number | null>(null);

  const client = clientData[clientId || ''] || {
    name: 'Sample Client',
    date: 'January 2025',
    location: 'Location',
    photos: {}
  };

  // Create flat array of all photos for slideshow
  const allPhotos: Array<{ categoryTitle: string; photoIndex: number; categoryId: string }> = [];
  photoCategories.forEach(category => {
    for (let i = 0; i < category.count; i++) {
      allPhotos.push({
        categoryTitle: category.title,
        photoIndex: i,
        categoryId: category.id
      });
    }
  });

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 1));

  // Slideshow auto-play
  useEffect(() => {
    if (isSlideshow && isPlaying) {
      const interval = setInterval(() => {
        setSlideshowIndex(prev => (prev + 1) % allPhotos.length);
      }, 3000); // Change photo every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isSlideshow, isPlaying, allPhotos.length]);

  const handleNextSlide = () => {
    setSlideshowIndex(prev => (prev + 1) % allPhotos.length);
  };

  const handlePrevSlide = () => {
    setSlideshowIndex(prev => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  const startSlideshow = () => {
    setIsSlideshow(true);
    setIsPlaying(true);
    setSlideshowIndex(0);
    setShowControls(true);

    // Start the auto-hide timer immediately when slideshow begins
    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    setMouseTimeout(timeout);
  };

  // Handle mouse movement to show/hide controls
  const handleMouseMove = () => {
    setShowControls(true);

    // Clear existing timeout
    if (mouseTimeout) {
      clearTimeout(mouseTimeout);
    }

    // Hide controls after 3 seconds of no mouse movement
    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    setMouseTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (mouseTimeout) {
        clearTimeout(mouseTimeout);
      }
    };
  }, [mouseTimeout]);

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
          <p className="text-lg text-gray-300 mb-8">
            18 frames capturing every emotion, every angle, every story.
          </p>

          {/* Slideshow Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startSlideshow}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold to-cinematic-orange text-charcoal font-bold rounded-lg hover:shadow-lg hover:shadow-gold/50 transition-all duration-300 group"
          >
            <HiPlay className="text-2xl group-hover:scale-110 transition-transform" />
            <span>Start Cinematic Slideshow</span>
          </motion.button>
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

      {/* Cinematic Slideshow Modal */}
      <AnimatePresence>
        {isSlideshow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseMove={handleMouseMove}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center cursor-none"
            style={{ cursor: showControls ? 'default' : 'none' }}
          >
            {/* Controls - Show/Hide on Mouse Movement */}
            <AnimatePresence>
              {showControls && (
                <>
                  {/* Close Button */}
                  <motion.button
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsSlideshow(false);
                      setIsPlaying(false);
                    }}
                    className="absolute top-6 right-6 p-4 bg-charcoal/80 text-gold rounded-lg hover:bg-charcoal transition-colors z-10"
                  >
                    <HiX className="text-3xl" />
                  </motion.button>

                  {/* Progress Bar */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 left-0 right-0 h-1 bg-charcoal/50 z-10"
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-gold to-cinematic-orange"
                      initial={{ width: '0%' }}
                      animate={{ width: `${((slideshowIndex + 1) / allPhotos.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Photo Counter */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-6 left-6 px-4 py-2 bg-charcoal/80 text-gold rounded-lg z-10"
                  >
                    <span className="font-semibold">{slideshowIndex + 1} / {allPhotos.length}</span>
                  </motion.div>

                  {/* Category Label */}
                  <motion.div
                    key={`label-${slideshowIndex}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-charcoal/80 rounded-lg z-10"
                  >
                    <p className="text-gold font-semibold">{allPhotos[slideshowIndex]?.categoryTitle}</p>
                    <p className="text-gray-400 text-sm text-center">Photo {allPhotos[slideshowIndex]?.photoIndex + 1}</p>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Main Image - Full Screen */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slideshowIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Full-screen image container */}
                <div className="relative w-full h-full">
                  {/* Placeholder for actual slideshow image - will cover full screen */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/30 to-cinematic-orange/30">
                    {/* This will be replaced with: <img src={actualImagePath} className="w-full h-full object-contain" alt="" /> */}
                    {/* No placeholder text - clean full-screen image experience */}
                  </div>

                  {/* Cinematic Vignette */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 100%)'
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls - Show/Hide on Mouse Movement */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-10"
                >
                  <div className="max-w-2xl mx-auto flex items-center justify-center gap-4">
                    {/* Previous Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handlePrevSlide}
                      className="p-4 bg-charcoal/80 text-gold rounded-lg hover:bg-charcoal transition-colors"
                    >
                      <HiChevronLeft className="text-2xl" />
                    </motion.button>

                    {/* Play/Pause Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-6 bg-gradient-to-r from-gold to-cinematic-orange text-charcoal rounded-full hover:shadow-lg hover:shadow-gold/50 transition-all"
                    >
                      {isPlaying ? (
                        <HiPause className="text-3xl" />
                      ) : (
                        <HiPlay className="text-3xl" />
                      )}
                    </motion.button>

                    {/* Next Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleNextSlide}
                      className="p-4 bg-charcoal/80 text-gold rounded-lg hover:bg-charcoal transition-colors"
                    >
                      <HiChevronRight className="text-2xl" />
                    </motion.button>
                  </div>

                  {/* Instructions */}
                  <p className="text-center text-gray-400 text-sm mt-4">
                    Use arrow keys or buttons to navigate • Press ESC to exit
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Keyboard Navigation */}
            <div className="hidden" onKeyDown={(e) => {
              if (e.key === 'ArrowRight') handleNextSlide();
              if (e.key === 'ArrowLeft') handlePrevSlide();
              if (e.key === 'Escape') setIsSlideshow(false);
              if (e.key === ' ') setIsPlaying(!isPlaying);
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientPortfolio;
