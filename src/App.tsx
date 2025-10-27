import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Hero from './components/Hero/Hero';
import Portfolio from './components/Portfolio/Portfolio';
import Packages from './components/Packages/Packages';
import About from './components/About/About';
import BehindTheLens from './components/BehindTheLens/BehindTheLens';
import Contact from './components/Contact/Contact';
import LoadingScreen from './components/shared/LoadingScreen';
import Gallery from './pages/Gallery';
import ClientPortfolio from './pages/ClientPortfolio';
import Login from './pages/Login';
import ClientPortal from './pages/ClientPortal';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function HomePage() {
  return (
    <main>
      <Hero />
      <Portfolio />
      <Packages />
      <About />
      <BehindTheLens />
      <Contact />

      {/* Footer */}
      <footer className="py-8 px-4 bg-charcoal border-t border-gold/20 text-center">
        <p className="text-gray-400">
          © 2025 Les Visual Eye. Cinematic Photography by Lesego.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Every frame tells a story.
        </p>
      </footer>
    </main>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for cinematic effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-charcoal text-white">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen key="loading" onLoadComplete={() => {}} />
            ) : (
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/gallery/:clientId" element={<ClientPortfolio />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/portal"
                  element={
                    <ProtectedRoute>
                      <ClientPortal />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            )}
          </AnimatePresence>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
