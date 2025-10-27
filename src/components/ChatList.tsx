import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, orderBy, onSnapshot, type DocumentData } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getPackageById } from '../data/packages';
import { HiChat, HiClock } from 'react-icons/hi';
import Chat from './Chat';

interface Booking extends DocumentData {
  id: string;
  userId: string;
  userName: string;
  packageId: string;
  status: string;
  createdAt: any;
}

const ChatList = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Get user's approved/queued bookings (only these have chat access)
    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', user.uid),
      where('status', 'in', ['queued', 'approved']),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        clearTimeout(timeout);
        const bookingsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Booking[];

        setBookings(bookingsData);
        setLoading(false);
      },
      (error) => {
        clearTimeout(timeout);
        console.error('Error fetching chat bookings:', error);
        setLoading(false);
      }
    );

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Loading your chats...</p>
      </div>
    );
  }

  // If a booking is selected, show the chat interface
  if (selectedBooking) {
    return (
      <div className="h-[600px]">
        <Chat
          bookingId={selectedBooking.id}
          clientId={selectedBooking.userId}
          clientName={selectedBooking.userName}
          onClose={() => setSelectedBooking(null)}
        />
      </div>
    );
  }

  // No approved/queued bookings
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 bg-charcoal/50 border-2 border-gold/30 rounded-lg">
        <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <HiChat className="text-gold text-4xl" />
        </div>
        <h3 className="font-display text-2xl font-bold mb-2">No Active Chats</h3>
        <p className="text-gray-400 mb-6">
          Chat becomes available once your booking is approved or queued.
        </p>
        <p className="text-sm text-gray-500">
          You can view your pending bookings in the "My Bookings" section.
        </p>
      </div>
    );
  }

  // Show list of bookings with chat access
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="font-display text-2xl font-bold mb-2">Your Active Conversations</h3>
        <p className="text-gray-400 text-sm">
          Click on a booking to start or continue the conversation with Les
        </p>
      </div>

      {bookings.map((booking, index) => {
        const pkg = getPackageById(booking.packageId);

        return (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setSelectedBooking(booking)}
            className="bg-charcoal/50 border-2 border-gold/30 rounded-lg p-6 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/20 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                  <HiChat className="text-2xl text-gold" />
                </div>
                <div className="flex-1">
                  <h4 className="font-display text-xl font-bold text-gold mb-1">
                    {pkg?.title || booking.packageId}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <HiClock className="text-gold" />
                    <span>
                      Booked: {booking.createdAt?.toDate?.().toLocaleDateString('en-ZA') || 'Recently'}
                    </span>
                  </div>
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    booking.status === 'approved'
                      ? 'bg-green-400/10 text-green-400'
                      : 'bg-blue-400/10 text-blue-400'
                  }`}>
                    {booking.status === 'approved' ? 'Approved' : 'In Queue'}
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 bg-gold/10 text-gold border border-gold/30 rounded-lg hover:bg-gold/20 transition-all font-semibold">
                Open Chat →
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ChatList;
