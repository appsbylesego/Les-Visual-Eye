import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { HiLogout, HiCalendar, HiChat, HiPlus, HiHome } from 'react-icons/hi';
import { useNavigate, Link } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import MyBookings from '../components/MyBookings';
import ChatList from '../components/ChatList';
import ProfilePictureUpload from '../components/ProfilePictureUpload';

type View = 'dashboard' | 'bookings' | 'new-booking' | 'chat';

const ClientPortal = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

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
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold">Client Portal</h1>
              <p className="text-sm text-gray-400 mt-1">Welcome back, {user?.displayName}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 bg-charcoal/50 hover:bg-charcoal text-gold border border-gold/30 rounded-lg transition-all duration-300"
              >
                <HiHome />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 rounded-lg transition-all duration-300"
              >
                <HiLogout />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {/* Dashboard View */}
          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Welcome Section */}
              <div className="mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Your Cinematic Journey
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-gold to-transparent mb-6" />
                <p className="text-lg text-gray-300">
                  Book sessions, track your queue position, and chat directly with Les.
                </p>
              </div>

              {/* Dashboard Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* My Bookings Card */}
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  onClick={() => setCurrentView('bookings')}
                  className="bg-charcoal/50 border-2 border-gold/30 rounded-lg p-6 hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 cursor-pointer"
                >
                  <HiCalendar className="text-4xl text-gold mb-4" />
                  <h3 className="font-display text-2xl font-bold mb-2">My Bookings</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    View and manage your booked sessions
                  </p>
                  <button className="text-gold font-semibold hover:text-cinematic-orange transition-colors">
                    View Bookings →
                  </button>
                </motion.div>

                {/* New Booking Card */}
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  onClick={() => setCurrentView('new-booking')}
                  className="bg-gradient-to-br from-gold/20 to-cinematic-orange/20 border-2 border-gold rounded-lg p-6 hover:border-cinematic-orange transition-all duration-300 hover:shadow-lg hover:shadow-gold/30 cursor-pointer"
                >
                  <HiPlus className="text-4xl text-gold mb-4" />
                  <h3 className="font-display text-2xl font-bold mb-2">New Booking</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Book a new cinematic session
                  </p>
                  <button className="text-gold font-semibold hover:text-cinematic-orange transition-colors">
                    Book Now →
                  </button>
                </motion.div>

                {/* Chat Card */}
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  onClick={() => setCurrentView('chat')}
                  className="bg-charcoal/50 border-2 border-gold/30 rounded-lg p-6 hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <HiChat className="text-4xl text-gold" />
                    <span className="px-3 py-1 bg-green-400/20 text-green-400 text-xs font-semibold rounded-full">
                      Live
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2">Chat with Les</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Direct messaging for shoot details
                  </p>
                  <button className="text-gold font-semibold hover:text-cinematic-orange transition-colors">
                    Open Chat →
                  </button>
                </motion.div>
              </div>

              {/* Profile Section */}
              <div className="bg-charcoal/50 border-2 border-gold/30 rounded-lg p-8">
                <h3 className="font-display text-2xl font-bold mb-6">Your Profile</h3>
                <div className="flex items-center gap-6">
                  <ProfilePictureUpload />
                  <div>
                    <p className="text-xl font-semibold">{user?.displayName}</p>
                    <p className="text-gray-400">{user?.email}</p>
                    <p className="text-sm text-gold mt-2">Client Account</p>
                    <p className="text-xs text-gray-500 mt-1">Click the camera icon to upload a profile picture</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* My Bookings View */}
          {currentView === 'bookings' && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">My Bookings</h2>
                  <div className="w-32 h-1 bg-gradient-to-r from-gold to-transparent" />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentView('new-booking')}
                    className="px-6 py-3 bg-gradient-to-r from-gold to-cinematic-orange text-charcoal font-semibold rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-gold/50 transition-all"
                  >
                    + New Booking
                  </button>
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className="px-6 py-3 border-2 border-gold/30 text-gold font-semibold rounded-lg hover:border-gold/50 transition-all"
                  >
                    Back
                  </button>
                </div>
              </div>

              <MyBookings />
            </motion.div>
          )}

          {/* New Booking View */}
          {currentView === 'new-booking' && (
            <motion.div
              key="new-booking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-8">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Book a Session</h2>
                <div className="w-32 h-1 bg-gradient-to-r from-gold to-transparent mb-4" />
                <p className="text-gray-300">
                  Select your location to see available packages based on distance.
                </p>
              </div>

              <div className="max-w-3xl">
                <BookingForm
                  onSuccess={() => setCurrentView('bookings')}
                  onCancel={() => setCurrentView('dashboard')}
                />
              </div>
            </motion.div>
          )}

          {/* Chat View */}
          {currentView === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Messages</h2>
                  <div className="w-32 h-1 bg-gradient-to-r from-gold to-transparent" />
                </div>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="px-6 py-3 border-2 border-gold/30 text-gold font-semibold rounded-lg hover:border-gold/50 transition-all"
                >
                  Back
                </button>
              </div>

              <ChatList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ClientPortal;
