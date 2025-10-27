import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { storage, db } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { HiCamera, HiUpload } from 'react-icons/hi';

const ProfilePictureUpload = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Create a reference to the storage location
      const storageRef = ref(storage, `profile-pictures/${user.uid}`);

      // Upload the file
      await uploadBytes(storageRef, file);

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Update user profile in Firebase Auth
      await updateProfile(user, {
        photoURL: downloadURL
      });

      // Update user document in Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        photoURL: downloadURL
      });

      // Force refresh to show new photo
      window.location.reload();
    } catch (err) {
      console.error('Error uploading profile picture:', err);
      setError('Failed to upload profile picture. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="relative group">
        {/* Profile Picture */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gold">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'Profile'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gold/10 flex items-center justify-center">
              <HiCamera className="text-4xl text-gold" />
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <HiUpload className="text-3xl text-white" />
          </div>
        </div>

        {/* Upload Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleButtonClick}
          disabled={uploading}
          className="absolute bottom-0 right-0 w-8 h-8 bg-gold text-charcoal rounded-full flex items-center justify-center hover:bg-cinematic-orange transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {uploading ? (
            <div className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
          ) : (
            <HiCamera className="text-lg" />
          )}
        </motion.button>
      </div>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-cinematic-orange text-sm mt-2"
        >
          {error}
        </motion.p>
      )}

      {/* Uploading Message */}
      {uploading && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gold text-sm mt-2"
        >
          Uploading...
        </motion.p>
      )}
    </div>
  );
};

export default ProfilePictureUpload;
