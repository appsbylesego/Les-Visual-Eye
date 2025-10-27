import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { HiLogout, HiUsers, HiCalendar, HiCheckCircle, HiClock, HiChat } from 'react-icons/hi';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, type DocumentData } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getPackageById } from '../data/packages';
import Chat from '../components/Chat';
import ProfilePictureUpload from '../components/ProfilePictureUpload';

interface Booking extends DocumentData {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  packageId: string;
  location: {
    name: string;
    province: string;
  };
  distanceKm: number;
  distanceBand: string;
  preferredDate: string | null;
  notes: string;
  status: 'pending' | 'queued' | 'approved' | 'completed' | 'cancelled';
  queuePosition?: number;
  createdAt: any;
}

const statusConfig = {
  pending: { color: 'text-cinematic-orange', bg: 'bg-cinematic-orange/10', label: 'Pending Review' },
  queued: { color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'In Queue' },
  approved: { color: 'text-green-400', bg: 'bg-green-400/10', label: 'Approved' },
  completed: { color: 'text-gold', bg: 'bg-gold/10', label: 'Completed' },
  cancelled: { color: 'text-gray-400', bg: 'bg-gray-400/10', label: 'Cancelled' }
};

const AdminDashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedChat, setSelectedChat] = useState<Booking | null>(null);

  // Redirect if not admin
  useEffect(() => {
    if (user && !isAdmin) {
      navigate('/client-portal');
    }
  }, [user, isAdmin, navigate]);

  // Fetch all bookings (admin sees everything)
  useEffect(() => {
    const q = query(
      collection(db, 'bookings'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Booking[];

      setBookings(bookingsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: Booking['status']) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        status: newStatus,
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const updateQueuePosition = async (bookingId: string, position: number) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        queuePosition: position,
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error('Error updating queue position:', error);
    }
  };

  // Filter bookings by status
  const filteredBookings = selectedStatus === 'all'
    ? bookings
    : bookings.filter(b => b.status === selectedStatus);

  // Stats
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    queued: bookings.filter(b => b.status === 'queued').length,
    approved: bookings.filter(b => b.status === 'approved').length,
    completed: bookings.filter(b => b.status === 'completed').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Chat Modal */}
      <AnimatePresence>
        {selectedChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedChat(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl h-[700px]"
            >
              <Chat
                bookingId={selectedChat.id}
                clientId={selectedChat.userId}
                clientName={selectedChat.userName}
                onClose={() => setSelectedChat(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <h1 className="font-display text-2xl md:text-3xl font-bold text-gold">Admin Dashboard</h1>
              <p className="text-sm text-gray-400 mt-1">Manage all bookings and client requests</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3">
                <ProfilePictureUpload />
                <div>
                  <p className="text-sm font-semibold text-white">{user?.displayName}</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              </div>
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

      <div className="container mx-auto px-4 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-charcoal/50 border-2 border-gold/30 rounded-lg p-6"
          >
            <HiCalendar className="text-3xl text-gold mb-2" />
            <p className="text-3xl font-bold">{stats.total}</p>
            <p className="text-sm text-gray-400">Total Bookings</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-charcoal/50 border-2 border-cinematic-orange/30 rounded-lg p-6"
          >
            <HiClock className="text-3xl text-cinematic-orange mb-2" />
            <p className="text-3xl font-bold">{stats.pending}</p>
            <p className="text-sm text-gray-400">Pending</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-charcoal/50 border-2 border-blue-400/30 rounded-lg p-6"
          >
            <HiUsers className="text-3xl text-blue-400 mb-2" />
            <p className="text-3xl font-bold">{stats.queued}</p>
            <p className="text-sm text-gray-400">Queued</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-charcoal/50 border-2 border-green-400/30 rounded-lg p-6"
          >
            <HiCheckCircle className="text-3xl text-green-400 mb-2" />
            <p className="text-3xl font-bold">{stats.approved}</p>
            <p className="text-sm text-gray-400">Approved</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-charcoal/50 border-2 border-gold/30 rounded-lg p-6"
          >
            <HiCheckCircle className="text-3xl text-gold mb-2" />
            <p className="text-3xl font-bold">{stats.completed}</p>
            <p className="text-sm text-gray-400">Completed</p>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['all', 'pending', 'queued', 'approved', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
                selectedStatus === status
                  ? 'bg-gold text-charcoal'
                  : 'bg-charcoal/50 border border-gold/30 text-gray-300 hover:border-gold/50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-charcoal/50 border-2 border-gold/30 rounded-lg">
            <p className="text-gray-400">No bookings found for this filter.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking, index) => {
              const pkg = getPackageById(booking.packageId);
              const status = statusConfig[booking.status];

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-charcoal/50 border-2 border-gold/30 rounded-lg p-6 hover:border-gold/50 transition-all"
                >
                  {/* Booking Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-gold mb-1">
                        {booking.userName}
                      </h3>
                      <p className="text-sm text-gray-400">{booking.userEmail}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Booked: {booking.createdAt?.toDate?.().toLocaleDateString('en-ZA') || 'Just now'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gold">R{pkg?.price}</p>
                      <p className="text-sm text-gray-400">{pkg?.title}</p>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-charcoal/50 rounded border border-gold/20">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Location</p>
                      <p className="text-white font-semibold">{booking.location.name}</p>
                      <p className="text-xs text-gray-400">{booking.distanceBand}</p>
                    </div>
                    {booking.preferredDate && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Preferred Date</p>
                        <p className="text-white font-semibold">
                          {new Date(booking.preferredDate).toLocaleDateString('en-ZA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 ${status.bg} ${status.color} text-xs font-semibold rounded-full`}>
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Notes */}
                  {booking.notes && (
                    <div className="mb-4 p-3 bg-charcoal/30 rounded border border-gold/10">
                      <p className="text-xs text-gray-500 mb-1">Client Notes:</p>
                      <p className="text-gray-300 text-sm">{booking.notes}</p>
                    </div>
                  )}

                  {/* Admin Actions */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gold/20">
                    <button
                      onClick={() => setSelectedChat(booking)}
                      className="px-4 py-2 bg-gold/10 text-gold border border-gold/30 rounded hover:bg-gold/20 transition-all text-sm font-semibold flex items-center gap-2"
                    >
                      <HiChat className="text-lg" />
                      Chat
                    </button>
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'approved')}
                      disabled={booking.status === 'approved'}
                      className="px-4 py-2 bg-green-400/10 text-green-400 border border-green-400/30 rounded hover:bg-green-400/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'queued')}
                      disabled={booking.status === 'queued'}
                      className="px-4 py-2 bg-blue-400/10 text-blue-400 border border-blue-400/30 rounded hover:bg-blue-400/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                    >
                      Add to Queue
                    </button>
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'completed')}
                      disabled={booking.status === 'completed'}
                      className="px-4 py-2 bg-gold/10 text-gold border border-gold/30 rounded hover:bg-gold/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                    >
                      Mark Complete
                    </button>
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                      disabled={booking.status === 'cancelled'}
                      className="px-4 py-2 bg-gray-400/10 text-gray-400 border border-gray-400/30 rounded hover:bg-gray-400/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                    >
                      Cancel
                    </button>

                    {booking.status === 'queued' && (
                      <div className="flex items-center gap-2 ml-auto">
                        <label className="text-sm text-gray-400">Queue Position:</label>
                        <input
                          type="number"
                          min="1"
                          value={booking.queuePosition || 1}
                          onChange={(e) => updateQueuePosition(booking.id, parseInt(e.target.value))}
                          className="w-20 px-3 py-2 bg-charcoal border border-gold/30 rounded text-white text-center"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
