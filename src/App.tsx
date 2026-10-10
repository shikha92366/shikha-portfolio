import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { GameModeOverlay } from './components/home/GameModeOverlay';

// Home is loaded eagerly for instant LCP
import { Home } from './pages/Home';

// Route-level code splitting for all other pages
const Software = lazy(() => import('./pages/Software'));
const Hardware = lazy(() => import('./pages/Hardware'));
const About = lazy(() => import('./pages/About'));
const Experience = lazy(() => import('./pages/Experience'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const Achievements = lazy(() => import('./pages/Achievements'));
const Resume = lazy(() => import('./pages/Resume'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
}

function PageFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex items-center gap-3 font-mono text-xs text-[#64ffda]">
        <div className="w-2 h-2 rounded-full bg-[#64ffda] animate-ping" />
        <span>LOADING TELEMETRY...</span>
      </div>
    </div>
  );
}

export function AppContent() {
  const [gameModeOpen, setGameModeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#8892b0] flex flex-col selection:bg-[#64ffda]/20 selection:text-[#64ffda]">
      <ScrollToTop />

      {/* Top Navbar */}
      <Navbar
        onToggleGameMode={() => setGameModeOpen(!gameModeOpen)}
        gameModeActive={gameModeOpen}
      />

      {/* Interactive Circuit Mini-game Overlay */}
      <GameModeOverlay
        isOpen={gameModeOpen}
        onClose={() => setGameModeOpen(false)}
      />

      {/* Main Page Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/software" element={<Software />} />
            <Route path="/hardware" element={<Hardware />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
