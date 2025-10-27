import { motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { HiMail, HiLocationMarker } from 'react-icons/hi';
// import emailjs from 'emailjs-com'; // Uncomment when ready to configure EmailJS

// Distance calculation helper (simplified - user will need to configure)
const calculateDistance = (location: string): number => {
  // Placeholder logic - in production, use a geocoding API
  // For now, returning mock distances based on keywords
  const lowerLocation = location.toLowerCase();

  if (lowerLocation.includes('pretoria') || lowerLocation.includes('tshwane')) return 10;
  if (lowerLocation.includes('johannesburg') || lowerLocation.includes('joburg')) return 45;
  if (lowerLocation.includes('centurion')) return 15;
  if (lowerLocation.includes('midrand')) return 30;

  return 70; // Default: far away
};

const getAvailablePackages = (distance: number) => {
  if (distance <= 15) {
    return ['Cinematic Bundle (R400)', 'Cinematic Deluxe (R700)', 'Full Cinematic Experience (R1,200)'];
  } else if (distance <= 50) {
    return ['Cinematic Deluxe (R700)', 'Full Cinematic Experience (R1,200)'];
  } else if (distance <= 60) {
    return ['Meet Me Halfway (R700+)', 'Full Cinematic Experience (R1,200+)'];
  }
  return [];
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    package: '',
    meetHalfway: false,
    preferredLocation: '',
    message: ''
  });

  const [distance, setDistance] = useState<number | null>(null);
  const [availablePackages, setAvailablePackages] = useState<string[]>([]);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleLocationChange = (loc: string) => {
    setFormData({ ...formData, location: loc });
    if (loc.length > 2) {
      const dist = calculateDistance(loc);
      setDistance(dist);
      const packages = getAvailablePackages(dist);
      setAvailablePackages(packages);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');

    // EmailJS configuration - USER NEEDS TO ADD THEIR CREDENTIALS
    try {
      // Replace with your EmailJS credentials
      // await emailjs.send(
      //   'YOUR_SERVICE_ID',
      //   'YOUR_TEMPLATE_ID',
      //   {
      //     from_name: formData.name,
      //     from_email: formData.email,
      //     location: formData.location,
      //     package: formData.package,
      //     meet_halfway: formData.meetHalfway ? 'Yes' : 'No',
      //     preferred_location: formData.preferredLocation,
      //     message: formData.message
      //   },
      //   'YOUR_PUBLIC_KEY'
      // );

      // For now, just simulate success
      setTimeout(() => {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          location: '',
          package: '',
          meetHalfway: false,
          preferredLocation: '',
          message: ''
        });
        setDistance(null);
        setAvailablePackages([]);
      }, 1000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Email send failed:', error);
    }
  };

  return (
    <section id="contact" className="relative py-20 px-4 md:px-8 lg:px-16 bg-charcoal overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-gold/5 -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Book Your Session
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to step in front of the lens? Choose your package, tell me your vision, and let's create something unforgettable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label className="block text-gold mb-2 font-semibold">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-charcoal border border-gold/30 rounded focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                  placeholder="Your Name"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label className="block text-gold mb-2 font-semibold">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-charcoal border border-gold/30 rounded focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                  placeholder="your.email@example.com"
                />
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label className="block text-gold mb-2 font-semibold flex items-center">
                  <HiLocationMarker className="mr-2" />
                  Location / City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="w-full px-4 py-3 bg-charcoal border border-gold/30 rounded focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                  placeholder="e.g., Pretoria, Johannesburg"
                />
                {distance !== null && (
                  <p className="mt-2 text-sm text-gray-400">
                    Estimated distance: ~{distance}km
                  </p>
                )}
              </motion.div>

              {/* Package Selection */}
              {availablePackages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-gold mb-2 font-semibold">Select Package *</label>
                  <select
                    required
                    value={formData.package}
                    onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                    className="w-full px-4 py-3 bg-charcoal border border-gold/30 rounded focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                  >
                    <option value="">Choose a package...</option>
                    {availablePackages.map((pkg) => (
                      <option key={pkg} value={pkg}>{pkg}</option>
                    ))}
                  </select>
                </motion.div>
              )}

              {distance !== null && distance > 50 && distance <= 60 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <label className="flex items-center text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.meetHalfway}
                      onChange={(e) => setFormData({ ...formData, meetHalfway: e.target.checked })}
                      className="mr-3 w-5 h-5 accent-gold"
                    />
                    I can meet halfway (Travel fee may apply)
                  </label>

                  {formData.meetHalfway && (
                    <input
                      type="text"
                      value={formData.preferredLocation}
                      onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                      className="w-full px-4 py-3 bg-charcoal border border-gold/30 rounded focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                      placeholder="Preferred meetup location"
                    />
                  )}
                </motion.div>
              )}

              {distance !== null && distance > 60 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-cinematic-orange/10 border border-cinematic-orange/30 rounded"
                >
                  <p className="text-gray-300">
                    Sorry, currently outside our service area. Contact us if you have a special request.
                  </p>
                </motion.div>
              )}

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <label className="block text-gold mb-2 font-semibold">Tell Me Your Vision</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-charcoal border border-gold/30 rounded focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                  placeholder="Describe your ideal shoot, mood, or any specific ideas..."
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                type="submit"
                disabled={submitStatus === 'sending' || (distance !== null && distance > 60)}
                className="w-full py-4 bg-gold text-charcoal font-bold text-lg rounded hover:bg-cinematic-orange hover:scale-105 hover:glow-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-gold/10 border border-gold/30 rounded text-gold text-center"
                >
                  Message sent successfully! I'll respond to your email soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-cinematic-orange/10 border border-cinematic-orange/30 rounded text-cinematic-orange text-center"
                >
                  Something went wrong. Please try again or email directly.
                </motion.div>
              )}

              {/* Safety Note */}
              <p className="text-sm text-gray-400 text-center">
                <HiMail className="inline mr-1" />
                For your safety, all communication is via email. We'll respond promptly to confirm your session.
              </p>
            </form>
          </motion.div>

          {/* Right Side - Portrait/Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Cinematic Portrait */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-cinematic-orange/20 flex items-center justify-center">
                <p className="text-gray-400 text-center px-4">Add a cinematic portrait or motion clip here</p>
              </div>
            </div>

            {/* Service Area Info */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-charcoal/50 border border-gold/30 rounded-lg p-6 space-y-4 transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:border-gold/50"
            >
              <h3 className="font-display text-2xl font-bold text-gold">Service Areas</h3>
              <div className="space-y-2 text-gray-300">
                <p><span className="text-gold">0-15km:</span> All packages available (R400-R1,200)</p>
                <p><span className="text-gold">15-30km:</span> Deluxe or Full Experience (R700-R1,200)</p>
                <p><span className="text-gold">31-50km:</span> Full Experience (R1,200)</p>
                <p><span className="text-gold">Beyond 51km +:</span> Unavailable</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
