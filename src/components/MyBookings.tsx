import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, orderBy, onSnapshot, type DocumentData } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getPackageById } from '../data/packages';
import { HiCalendar, HiLocationMarker, HiClock, HiCheckCircle, HiXCircle } from 'react-icons/hi';

interface Booking extends DocumentData {
  id: string;
  packageId: string;
  location: {
    name: string;
    province: string;
  };
  distanceKm: number;
  distanceBand: string;
  preferredDate: string | null;
  meetHalfway: boolean;
  meetupLocation: string | null;
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

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
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

    // Real-time listener for user's bookings
    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', user.uid),
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
        console.error('Error fetching bookings:', error);
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
        <p className="text-gray-400">Loading your bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <HiCalendar className="text-gold text-4xl" />
        </div>
        <h3 className="font-display text-2xl font-bold mb-2">No Bookings Yet</h3>
        <p className="text-gray-400 mb-6">You haven't made any booking requests.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking, index) => {
        const pkg = getPackageById(booking.packageId);
        const status = statusConfig[booking.status];

        return (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-charcoal/50 border-2 border-gold/30 rounded-lg p-6 hover:border-gold/50 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-gold mb-1">
                  {pkg?.title || booking.packageId}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 ${status.bg} ${status.color} text-xs font-semibold rounded-full`}>
                    {status.label}
                  </span>
                  {booking.status === 'queued' && booking.queuePosition && (
                    <span className="px-3 py-1 bg-blue-400/10 text-blue-400 text-xs font-semibold rounded-full">
                      Queue #{booking.queuePosition}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gold">R{pkg?.price}</p>
                <p className="text-sm text-gray-400">{pkg?.photoCount} photos</p>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-start gap-3">
                <HiLocationMarker className="text-gold text-xl mt-0.5" />
                <div>
                  <p className="text-white font-semibold">{booking.location.name}</p>
                  <p className="text-gray-400 text-sm">{booking.distanceBand}</p>
                  <p className="text-gray-500 text-xs">~{booking.distanceKm} km away</p>
                </div>
              </div>

              {booking.preferredDate && (
                <div className="flex items-start gap-3">
                  <HiCalendar className="text-gold text-xl mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Preferred Date</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(booking.preferredDate).toLocaleDateString('en-ZA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <HiClock className="text-gold text-xl mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Requested On</p>
                  <p className="text-gray-400 text-sm">
                    {booking.createdAt?.toDate?.().toLocaleDateString('en-ZA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) || 'Just now'}
                  </p>
                </div>
              </div>

              {booking.meetHalfway && (
                <div className="flex items-start gap-3">
                  <HiCheckCircle className="text-gold text-xl mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Meet Me Halfway</p>
                    <p className="text-gray-400 text-sm">
                      {booking.meetupLocation || 'Location TBD'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Notes */}
            {booking.notes && (
              <div className="p-4 bg-charcoal/50 rounded-lg border border-gold/20">
                <p className="text-sm text-gray-400 mb-1">Your Notes:</p>
                <p className="text-gray-300">{booking.notes}</p>
              </div>
            )}

            {/* Status Message */}
            {booking.status === 'pending' && (
              <div className="mt-4 p-3 bg-cinematic-orange/10 border border-cinematic-orange/30 rounded text-sm">
                <p className="text-cinematic-orange">
                  ⏳ Your booking is being reviewed. You'll be notified once it's approved or queued.
                </p>
              </div>
            )}

            {booking.status === 'queued' && (
              <div className="mt-4 p-3 bg-blue-400/10 border border-blue-400/30 rounded text-sm">
                <p className="text-blue-400">
                  🎬 You're in the queue! Check back soon for updates on your position.
                </p>
              </div>
            )}

            {booking.status === 'approved' && (
              <div className="mt-4 p-3 bg-green-400/10 border border-green-400/30 rounded text-sm">
                <p className="text-green-400">
                  ✅ Your booking is approved! Les will contact you via chat to finalize details.
                </p>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default MyBookings;
