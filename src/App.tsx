import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero/Hero';
import Portfolio from './components/Portfolio/Portfolio';
import Packages from './components/Packages/Packages';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import LoadingScreen from './components/shared/LoadingScreen';
import Gallery from './pages/Gallery';
import ClientPortfolio from './pages/ClientPortfolio';

function HomePage() {
  return (
    <main>
      <Hero />
      <Portfolio />
      <Packages />
      <About />
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
      <div className="min-h-screen bg-charcoal text-white">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" onLoadComplete={() => {}} />
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/gallery/:clientId" element={<ClientPortfolio />} />
            </Routes>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}

export default App;
