import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getGautengLocations, type Location } from '../data/locations';
import { PACKAGES, getPackagesByIds } from '../data/packages';
import { calculateDistanceFromBase, getAvailablePackages, isMeetHalfwayEligible, getDistanceBand } from '../utils/distance';
import { HiLocationMarker, HiInformationCircle, HiCalendar } from 'react-icons/hi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker-custom.css';

interface BookingFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const BookingForm = ({ onSuccess, onCancel }: BookingFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [preferredDate, setPreferredDate] = useState<Date | null>(null);
  const [meetHalfway, setMeetHalfway] = useState(false);
  const [meetupLocation, setMeetupLocation] = useState('');
  const [notes, setNotes] = useState('');

  // Calculated state
  const [distance, setDistance] = useState<number | null>(null);
  const [availablePackageIds, setAvailablePackageIds] = useState<string[]>([]);
  const [showHalfwayOption, setShowHalfwayOption] = useState(false);

  const gautengLocations = getGautengLocations();

  // Get minimum date (today or tomorrow)
  const getMinDate = () => {
    return new Date();
  };

  // Check if date is Saturday or Sunday (for date picker filter)
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
  };

  // Calculate distance when location changes
  useEffect(() => {
    if (selectedLocation) {
      const dist = calculateDistanceFromBase(selectedLocation.lat, selectedLocation.lng);
      setDistance(dist);

      const available = getAvailablePackages(dist);
      setAvailablePackageIds(available);

      const halfwayEligible = isMeetHalfwayEligible(dist);
      setShowHalfwayOption(halfwayEligible);

      // Reset package selection if no longer available
      if (!available.includes(selectedPackage)) {
        setSelectedPackage('');
      }

      // Reset meet halfway if not eligible
      if (!halfwayEligible) {
        setMeetHalfway(false);
        setMeetupLocation('');
      }
    } else {
      setDistance(null);
      setAvailablePackageIds([]);
      setShowHalfwayOption(false);
    }
  }, [selectedLocation]);

  const availablePackages = getPackagesByIds(availablePackageIds);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !selectedLocation || !selectedPackage || distance === null) {
      setError('Please complete all required fields');
      return;
    }

    if (distance > 60) {
      setError('Sorry, this location is outside our service area (max 60km)');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create booking document in Firestore
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        packageId: selectedPackage,
        location: {
          name: selectedLocation.name,
          province: selectedLocation.province,
          lat: selectedLocation.lat,
          lng: selectedLocation.lng
        },
        distanceKm: Math.round(distance * 10) / 10,
        distanceBand: getDistanceBand(distance),
        preferredDate: preferredDate ? preferredDate.toISOString().split('T')[0] : null,
        meetHalfway,
        meetupLocation: meetHalfway ? meetupLocation : null,
        notes,
        status: 'pending',
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      });

      setSuccess(true);
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (err: any) {
      console.error('Error creating booking:', err);
      setError(err.message || 'Failed to create booking. Please try again.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-3xl font-bold text-gold mb-4">Booking Submitted!</h3>
        <p className="text-gray-300 text-lg mb-2">Your session request has been received.</p>
        <p className="text-gray-400">Check "My Bookings" to track your queue position.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Location Selection */}
      <div>
        <label className="block text-gold mb-2 font-semibold flex items-center gap-2">
          <HiLocationMarker />
          Your Location (Gauteng Only) *
        </label>
        <select
          value={selectedLocation?.name || ''}
          onChange={(e) => {
            const location = gautengLocations.find(loc => loc.name === e.target.value);
            setSelectedLocation(location || null);
          }}
          required
          className="w-full px-4 py-3 bg-charcoal border border-gold/30 rounded focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
        >
          <option value="">Select your area in Gauteng</option>
          {gautengLocations.map(location => (
            <option key={location.name} value={location.name}>{location.name}</option>
          ))}
        </select>
        <p className="text-xs text-gray-400 mt-2">
          Sessions available in Gauteng only • Saturdays & Sundays
        </p>

        {/* Distance Info */}
        {distance !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-4 bg-gold/10 border border-gold/30 rounded-lg"
          >
            <div className="flex items-start gap-2">
              <HiLocationMarker className="text-gold text-xl mt-0.5" />
              <div>
                <p className="text-gold font-semibold">Distance: ~{Math.round(distance)} km</p>
                <p className="text-gray-300 text-sm">{getDistanceBand(distance)}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Package Selection */}
      {availablePackages.length > 0 ? (
        <div>
          <label className="block text-gold mb-2 font-semibold">Select Package *</label>
          <div className="space-y-3">
            {availablePackages.map(pkg => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedPackage === pkg.id
                    ? 'border-gold bg-gold/10'
                    : 'border-gold/30 hover:border-gold/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-lg">{pkg.title}</h4>
                  <span className="text-gold font-bold text-xl">R{pkg.price}</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{pkg.description}</p>
                <div className="flex gap-4 text-sm text-gray-300">
                  <span>📸 {pkg.photoCount} photos</span>
                  <span>⏱️ {pkg.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : distance !== null ? (
        <div className="p-4 bg-cinematic-orange/10 border border-cinematic-orange/30 rounded-lg">
          <div className="flex items-start gap-2">
            <HiInformationCircle className="text-cinematic-orange text-xl mt-0.5" />
            <div>
              <p className="text-cinematic-orange font-semibold">Outside Service Area</p>
              <p className="text-gray-300 text-sm">Sorry, we currently don't serve locations beyond 60km.</p>
            </div>
          </div>
        </div>
      ) : null}

      {/* Meet Me Halfway Option */}
      {showHalfwayOption && selectedPackage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gold/10 border border-gold/30 rounded-lg"
        >
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={meetHalfway}
              onChange={(e) => setMeetHalfway(e.target.checked)}
              className="mt-1 w-5 h-5 accent-gold"
            />
            <div>
              <p className="text-gold font-semibold">Meet Me Halfway</p>
              <p className="text-gray-300 text-sm">You're in the 51-60km range. We can meet at a public location (travel fee applies: R150).</p>
            </div>
          </label>

          {meetHalfway && (
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              type="text"
              value={meetupLocation}
              onChange={(e) => setMeetupLocation(e.target.value)}
              placeholder="Suggest a meetup location (e.g., City Park)"
              className="mt-3 w-full px-4 py-3 bg-charcoal border border-gold/30 rounded focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
            />
          )}
        </motion.div>
      )}

      {/* Preferred Date */}
      <div>
        <label className="block text-gold mb-2 font-semibold flex items-center gap-2">
          <HiCalendar />
          Preferred Date (Saturdays & Sundays Only)
        </label>
        <DatePicker
          selected={preferredDate}
          onChange={(date: Date | null) => setPreferredDate(date)}
          filterDate={isWeekend}
          minDate={getMinDate()}
          dateFormat="MMMM d, yyyy"
          placeholderText="Click to select a weekend date"
          className="w-full px-4 py-3 bg-charcoal border border-gold/30 rounded focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-white"
          calendarClassName="bg-charcoal border-gold"
          wrapperClassName="w-full"
        />
        <p className="text-xs text-gray-400 mt-2">
          Only <span className="text-gold font-semibold">Saturdays & Sundays</span> are available. Weekdays are disabled.
        </p>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-gold mb-2 font-semibold">Additional Notes (Optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Tell us about your vision, outfit ideas, or any special requests..."
          className="w-full px-4 py-3 bg-charcoal border border-gold/30 rounded focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all resize-none"
        />
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-cinematic-orange/10 border border-cinematic-orange/30 rounded text-cinematic-orange"
        >
          {error}
        </motion.div>
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 border-2 border-gold/30 text-gray-300 font-semibold rounded hover:border-gold/50 transition-all"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading || !selectedPackage || distance === null || distance > 60}
          className="flex-1 py-3 bg-gradient-to-r from-gold to-cinematic-orange text-charcoal font-bold rounded hover:scale-105 hover:shadow-lg hover:shadow-gold/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? 'Submitting...' : 'Book Session'}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
