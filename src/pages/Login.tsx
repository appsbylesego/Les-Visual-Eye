import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { HiArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
      navigate('/portal');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-white flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-gold/5 -z-10" />
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-gold hover:text-cinematic-orange transition-colors group"
      >
        <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-semibold">Back to Home</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        {/* Card */}
        <div className="bg-charcoal/50 backdrop-blur-sm border-2 border-gold/30 rounded-lg p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl md:text-5xl font-bold mb-4"
            >
              Client Portal
            </motion.h1>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-300 text-lg"
            >
              Sign in to book sessions, view your queue position, and chat with Les.
            </motion.p>
          </div>

          {/* Sign In Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-gray-100 text-charcoal font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <FcGoogle className="text-2xl" />
            <span>{loading ? 'Signing in...' : 'Sign in with Google'}</span>
          </motion.button>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-cinematic-orange/10 border border-cinematic-orange/30 rounded text-cinematic-orange text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Privacy Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gray-400 text-sm text-center mt-6"
          >
            For your safety, all communication is via secure login. We'll never ask for your password.
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 space-y-3"
          >
            <p className="text-gold font-semibold text-sm">What you get access to:</p>
            <div className="space-y-2 text-gray-300 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-gold">✓</span>
                <span>Book cinematic sessions with distance-based pricing</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gold">✓</span>
                <span>View your position in the booking queue</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gold">✓</span>
                <span>Direct chat with Les for shoot details</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gold">✓</span>
                <span>Track booking status and updates</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-gray-500 text-xs text-center mt-6"
        >
          By signing in, you agree to our privacy policy and terms of service.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
