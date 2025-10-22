import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="relative py-20 px-4 md:px-8 lg:px-16 bg-charcoal overflow-hidden">
      {/* Background Gradient Animation */}
      <motion.div
        animate={{
          background: [
            'linear-gradient(135deg, #0A0A0A 0%, #1a1510 100%)',
            'linear-gradient(135deg, #1a1510 0%, #0A0A0A 100%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute inset-0 -z-10"
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative aspect-[3/4] rounded-lg overflow-hidden group"
            >
              {/* Placeholder for Les's portrait */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/30 to-cinematic-orange/30 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-400 mb-2">Add Your Portrait Here</p>
                  <p className="text-sm text-gray-500">Recommended: Cinematic portrait with golden highlights</p>
                </div>
              </div>

              {/* Cinematic Glow on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gold/20 blur-2xl" />
              </div>
            </motion.div>

            {/* Decorative Element */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-10 -right-10 w-40 h-40 border-2 border-gold/20 rounded-full pointer-events-none"
            />
          </motion.div>

          {/* Right Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              >
                About Les
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100px' }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="h-1 bg-gradient-to-r from-gold to-transparent mb-8"
              />
            </div>

            {/* Text Content - Line by Line Animation */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-300 leading-relaxed"
            >
              I'm Lesego — but you can call me Les.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-300 leading-relaxed"
            >
              I turn moments into cinematic experiences.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-300 leading-relaxed"
            >
              Every shoot captures emotion, atmosphere, and authenticity.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-300 leading-relaxed"
            >
              Whether it's a close-up full of raw feeling or a motion shot with golden-hour light, I focus on creating images that make you feel like the main character of your story.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-gold font-semibold mt-8"
            >
              Let's make your moments unforgettable.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              viewport={{ once: true }}
            >
              <a
                href="#contact"
                className="inline-block mt-6 px-8 py-4 bg-gold text-charcoal font-semibold rounded hover:bg-cinematic-orange hover:scale-105 hover:glow-gold transition-all duration-300"
              >
                Work With Me
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
