import { motion } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video/Image Overlay */}
      <div className="absolute inset-0 bg-charcoal">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/50 to-charcoal/90 z-10" />
        {/* Placeholder for video background - user will add their video */}
        <div className="absolute inset-0 bg-[url('/hero-placeholder.jpg')] bg-cover bg-center opacity-40" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Small Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-gold text-sm md:text-base tracking-widest mb-4 uppercase"
        >
          A Story Told in Every Frame
        </motion.p>

        {/* Large Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-2 text-shadow-glow"
        >
          LES VISUAL EYE
        </motion.h1>

        {/* Gold Underline */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '200px' }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent mb-6"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="text-lg md:text-xl lg:text-2xl max-w-3xl mb-12 font-light"
        >
          Cinematic Portraits. Real Emotion. Main Character Energy.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#contact"
            className="px-8 py-4 bg-gold text-charcoal font-semibold rounded hover:scale-105 hover:glow-gold transition-all duration-300"
          >
            Book a Shoot
          </a>
          <a
            href="#portfolio"
            className="px-8 py-4 border-2 border-gold text-gold font-semibold rounded hover:bg-gold hover:text-charcoal hover:glow-gold transition-all duration-300"
          >
            View Portfolio
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { duration: 1, delay: 3 },
            y: { duration: 1.5, repeat: Infinity, repeatType: 'loop' }
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <HiArrowDown className="text-gold text-3xl" />
        </motion.div>
      </div>

      {/* Film Grain Overlay */}
      <div className="absolute inset-0 z-10 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
    </section>
  );
};

export default Hero;
