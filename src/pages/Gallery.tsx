import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';

// Sample client data - you'll replace with your actual clients
const clients = [
  {
    id: 'client-1',
    name: 'Client Name 1',
    coverImage: '/clients/client-1/cover.jpg',
    date: 'January 2025',
    location: 'Pretoria'
  },
  {
    id: 'client-2',
    name: 'Client Name 2',
    coverImage: '/clients/client-2/cover.jpg',
    date: 'January 2025',
    location: 'Johannesburg'
  },
  {
    id: 'client-3',
    name: 'Client Name 3',
    coverImage: '/clients/client-3/cover.jpg',
    date: 'December 2024',
    location: 'Centurion'
  },
  {
    id: 'client-4',
    name: 'Client Name 4',
    coverImage: '/clients/client-4/cover.jpg',
    date: 'December 2024',
    location: 'Sandton'
  },
];

const Gallery = () => {
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
              to="/"
              className="flex items-center gap-2 text-gold hover:text-cinematic-orange transition-colors group"
            >
              <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <h1 className="font-display text-2xl md:text-3xl font-bold">Client Gallery</h1>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Cinematic Stories
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-lg md:text-xl text-gray-300">
            Each client tells a unique story. Select a session below to explore the full cinematic experience.
          </p>
        </motion.div>

        {/* Client Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Link to={`/gallery/${client.id}`}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[3/4] bg-gradient-to-br from-gold/10 to-cinematic-orange/10"
                >
                  {/* Placeholder for client cover image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-cinematic-orange/20 flex items-center justify-center">
                    <div className="text-center p-4">
                      <p className="text-gray-400 text-sm mb-2">Add Cover Image</p>
                      <p className="text-xs text-gray-500">{client.coverImage}</p>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-display text-2xl font-bold mb-2 text-gold">
                      {client.name}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <span>{client.date}</span>
                      <span>{client.location}</span>
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(200, 155, 60, 0.15), transparent 70%)'
                    }}
                  />

                  {/* Light Leak */}
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                    className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-gold/20 to-transparent skew-x-12 pointer-events-none opacity-0 group-hover:opacity-100"
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {clients.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-xl mb-4">No client galleries yet.</p>
            <p className="text-gray-500">Add your first client session to get started.</p>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Gallery;
