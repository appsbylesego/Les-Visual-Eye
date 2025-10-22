import { motion } from 'framer-motion';
import { HiCamera, HiFilm, HiSparkles } from 'react-icons/hi';

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
      'Priority 3-10 day delivery'
    ],
    description: 'Perfect for campaigns, portfolios, or anyone ready for a full cinematic experience.',
    gradient: 'from-gold/30 to-cinematic-orange/30'
  }
];

const Packages = () => {
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

              {/* Button */}
              <a
                href="#contact"
                className="block w-full py-3 text-center bg-gold text-charcoal font-semibold rounded hover:bg-cinematic-orange hover:scale-105 transition-all duration-300"
              >
                Book This Shoot
              </a>
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
    </section>
  );
};

export default Packages;
