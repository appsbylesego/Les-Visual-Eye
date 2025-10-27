import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiCamera, HiFilm, HiSparkles, HiX } from 'react-icons/hi';

// Package details with shot breakdowns
const packageDetails: any = {
  1: {
    title: 'Cinematic Bundle',
    description: 'Be the star of your own story. This bundle is designed to capture you — expressive, emotional, and cinematic portraits that feel straight out of a film.',
    shots: [
      { category: 'Face Close-Ups', count: 2, description: 'Intense and expressive shots that capture your eyes, emotion, and energy.' },
      { category: 'Head & Shoulders Portrait', count: 2, description: 'A clean, confident composition — timeless and cinematic.' },
      { category: 'Half-Body Shot', count: 2, description: 'Waist-up portraits that show attitude, confidence, and movement.' },
      { category: 'Full-Body Portrait', count: 2, description: 'Elegant posing and full presence — captures your outfit, stance, and personality.' },
      { category: 'Walking / Motion Shot', count: 2, description: 'Natural movement and energy, as if caught mid-scene.' },
      { category: 'Looking Away Shot', count: 1, description: 'A reflective, cinematic moment — effortless and emotional.' },
      { category: 'Seated Pose', count: 1, description: 'Relaxed and grounded, with a storytelling composition.' },
      { category: 'Over-the-Shoulder Look Back', count: 1, description: 'Adds mystery and intrigue — a perfect movie-style frame.' },
      { category: 'Expression Series', count: 3, description: 'A range of emotions: smile, serious, confident — showing your versatility.' },
      { category: 'Dramatic Lighting Portrait', count: 2, description: 'Strong light and shadow contrast — your cinematic finale.' }
    ]
  },
  2: {
    title: 'Cinematic Deluxe',
    description: 'Includes everything in the Cinematic Bundle (18 photos) plus 12 additional shots for a total of 30 edited photos.',
    shots: [
      { category: 'Everything from Cinematic Bundle', count: 18, description: 'All 18 shots from the base bundle included.' },
      { category: 'Outfit Change Scene', count: 3, description: 'A new outfit or subtle accessory switch — one close-up, one motion, one full-body.' },
      { category: 'High-Quality Black & White Portraits', count: 2, description: 'Tight close-up in both landscape and portrait orientation — dramatic contrast, timeless and cinematic.' },
      { category: 'Street / Urban Vibe', count: 2, description: 'Candid-style portraits with background elements like walls, lights, or subtle motion.' },
      { category: 'Silhouette Shot', count: 1, description: 'Strong backlight or side light — minimal details, maximum mood.' },
      { category: 'Reflective Surface / Mirror Portrait', count: 2, description: 'Window, mirror, or shiny surface — creative reflection angles.' },
      { category: 'Profile / Side Portrait', count: 1, description: 'Clean side-angle showing structure and calm confidence.' },
      { category: 'Behind-the-Scenes Candid', count: 2, description: 'Laughs, outfit adjustments, or walking to the next shot — brings authenticity.' },
      { category: 'Light Flare / Bokeh Experiment', count: 2, description: 'Soft-focus, blurred light sources, or lens flares — pure cinematic atmosphere.' }
    ]
  },
  3: {
    title: 'Full Cinematic Experience',
    description: 'Step into your own film — every frame, a moment worth remembering. Includes everything in the Cinematic Deluxe Bundle (30 photos) plus an additional 20+ artistic shots for 50+ total edited images.',
    shots: [
      { category: 'Everything from Cinematic Deluxe', count: 30, description: 'All 30 shots from the Deluxe bundle included.' },
      { category: 'Environmental Story Sequence', count: 5, description: 'You interacting naturally with your surroundings — walking through a street, leaning by a wall, or adjusting your jacket. Feels like film stills.' },
      { category: 'Prop Interaction Shots', count: 3, description: 'Use subtle props like a chair, camera, book, sunglasses, or even a car door. Adds realism and depth.' },
      { category: 'Cinematic Framing Shots', count: 3, description: 'Creative compositions using objects in the foreground (like door frames, mirrors, railings). Adds visual storytelling and perspective.' },
      { category: 'Black & White Emotion Series', count: 4, description: 'Deeper emotional range — introspective, confident, joyful, and powerful expressions. Focus on light contrast and authenticity.' },
      { category: 'Cinematic Duo / Shadow Shot', count: 2, description: 'You interacting with your shadow, or using lighting to create dual tone imagery. Adds symbolism and artistic flair.' },
      { category: 'Chair / Grounded Portrait', count: 3, description: 'Low-angle or seated shots that focus on presence and attitude. Makes the subject look like a protagonist in a drama scene.' },
      { category: 'Long Lens Drama', count: 3, description: 'Captured from a distance with compression — blurred background, deep focus. Adds realism and "film lens" aesthetics.' },
      { category: 'Close-up Hands & Details', count: 2, description: 'Cinematic focus on small details — hands, accessories, or texture moments. Adds intimacy and story depth.' },
      { category: 'Light Experiment / Prism Shot', count: 2, description: 'Creative lighting, reflections, or glass effects for abstract cinematic visuals. Ends the session with artistic flair.' }
    ]
  }
};

const packages = [
  {
    id: 1,
    icon: HiCamera,
    title: 'Cinematic Bundle',
    price: 'R400',
    tagline: 'Be the main character.',
    features: [
      '18 fully edited cinematic portraits',
      '1-hour photoshoot',
      'Guided posing and direction',
      'Professional color grading',
      '3–5 day delivery'
    ],
    description: 'Perfect for portraits, personal branding, or your social aesthetic.',
    gradient: 'from-gold/20 to-cinematic-orange/20'
  },
  {
    id: 2,
    icon: HiFilm,
    title: 'Cinematic Deluxe',
    price: 'R700',
    tagline: 'Step into your own movie scene.',
    features: [
      '30 edited cinematic photos',
      '1.5-hour session',
      'Short cinematic video clips (slow motion)',
      'Advanced retouching and color grading',
      '3–5 day delivery'
    ],
    description: 'For models, artists, and creators who want both photos and cinematic motion.',
    gradient: 'from-cinematic-orange/20 to-gold/20',
    featured: true
  },
  {
    id: 3,
    icon: HiSparkles,
    title: 'Full Cinematic Experience',
    price: 'R1,200',
    tagline: 'Your full story — shot like a film.',
    features: [
      '50 edited portraits',
      '2-hour shoot with full creative direction',
      'Cinematic video reel (30–60 seconds)',
      'Multiple outfit changes',
      'Priority 5–10 day delivery'
    ],
    description: 'Perfect for campaigns, portfolios, or anyone ready for a full cinematic experience.',
    gradient: 'from-gold/30 to-cinematic-orange/30'
  }
];

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  return (
    <section id="packages" className="relative py-20 px-4 md:px-8 lg:px-16 cinematic-gradient">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          The Cinematic Experience
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Choose your story. Every package is crafted to capture your personality with cinematic precision.
        </p>
      </motion.div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotateY: 2 }}
            className={`relative bg-charcoal rounded-lg overflow-hidden group ${
              pkg.featured ? 'ring-2 ring-gold' : ''
            }`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-50`} />

            {/* Content */}
            <div className="relative z-10 p-8">
              {/* Icon */}
              <div className="mb-6">
                <pkg.icon className="text-gold text-5xl" />
              </div>

              {/* Title & Price */}
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                {pkg.title}
              </h3>
              <p className="text-4xl font-bold text-gold mb-3">{pkg.price}</p>
              <p className="text-cinematic-orange italic mb-6">{pkg.tagline}</p>

              {/* Features */}
              <div className="mb-6 space-y-2">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <span className="text-gold mr-2">✓</span>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-6">{pkg.description}</p>

              {/* Buttons */}
              <div className="space-y-3">
                {/* View Package Button - for all packages */}
                <button
                  onClick={() => setSelectedPackage(pkg.id)}
                  className="block w-full py-3 text-center bg-charcoal border-2 border-gold text-gold font-semibold rounded hover:bg-gold hover:text-charcoal hover:scale-105 transition-all duration-300"
                >
                  View Package Details
                </button>

                {/* Book Button */}
                <a
                  href="#contact"
                  className="block w-full py-3 text-center bg-gold text-charcoal font-semibold rounded hover:bg-cinematic-orange hover:scale-105 transition-all duration-300"
                >
                  Book This Shoot
                </a>
              </div>
            </div>

            {/* Hover Glow Effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(200, 155, 60, 0.2), transparent 70%)'
              }}
            />

            {/* Light Leak Animation */}
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
              className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-gold/30 to-transparent skew-x-12 pointer-events-none opacity-0 group-hover:opacity-100"
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-xl md:text-2xl text-gray-300 mb-6">
          Every session is more than just a shoot — it's a cinematic story crafted around you.
        </p>
        <p className="text-lg text-gold mb-8">Ready to take the lead?</p>
        <a
          href="#contact"
          className="inline-block px-10 py-4 bg-gold text-charcoal font-bold text-lg rounded hover:bg-cinematic-orange hover:scale-105 hover:glow-gold transition-all duration-300"
        >
          Book Your Session
        </a>
      </motion.div>

      {/* Package Details Modal */}
      <AnimatePresence>
        {selectedPackage && packageDetails[selectedPackage] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedPackage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ duration: 0.3 }}
              className="relative bg-charcoal rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto border-2 border-gold/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPackage(null)}
                className="sticky top-4 right-4 float-right p-3 bg-gold/20 hover:bg-gold/30 text-gold rounded-lg transition-colors z-10"
              >
                <HiX className="text-2xl" />
              </button>

              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="mb-8">
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-gold mb-4">
                    {packageDetails[selectedPackage].title}
                  </h2>
                  <p className="text-lg text-gray-300">
                    {packageDetails[selectedPackage].description}
                  </p>
                </div>

                {/* Shot Breakdown */}
                <div className="space-y-6">
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-6 text-cinematic-orange">
                    What You'll Get:
                  </h3>

                  {packageDetails[selectedPackage].shots.map((shot: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-charcoal/50 border border-gold/20 rounded-lg p-6 hover:border-gold/40 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gold to-cinematic-orange rounded-full flex items-center justify-center font-bold text-charcoal">
                          {shot.count}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-xl text-gold mb-2">
                            {shot.category}
                          </h4>
                          <p className="text-gray-300">
                            {shot.description}
                          </p>
                        </div>
                      </div>

                      {/* Example Photo Placeholder */}
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                        {Array.from({ length: Math.min(shot.count, 3) }).map((_, photoIndex) => (
                          <div
                            key={photoIndex}
                            className="aspect-[3/4] bg-gradient-to-br from-gold/10 to-cinematic-orange/10 rounded-lg flex items-center justify-center"
                          >
                            <p className="text-gray-500 text-xs text-center p-2">
                              Example photo {photoIndex + 1}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-10 text-center">
                  <a
                    href="#contact"
                    onClick={() => setSelectedPackage(null)}
                    className="inline-block px-10 py-4 bg-gradient-to-r from-gold to-cinematic-orange text-charcoal font-bold text-lg rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-gold/50 transition-all duration-300"
                  >
                    Book This Package
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Packages;
