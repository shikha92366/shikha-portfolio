import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SiteMetadata } from './components/layout/SiteMetadata';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Home is loaded eagerly for instant LCP
import { Home } from './pages/Home';

// Route-level code splitting for all other pages
const Journal = lazy(() => import('./pages/Journal'));
const JournalEntry = lazy(() => import('./pages/JournalEntry'));
const Documentation = lazy(() => import('./pages/Documentation'));
const DocumentationArticle = lazy(() => import('./pages/DocumentationArticle'));
const Software = lazy(() => import('./pages/Software'));
const Hardware = lazy(() => import('./pages/Hardware'));
const About = lazy(() => import('./pages/About'));
const Experience = lazy(() => import('./pages/Experience'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const Achievements = lazy(() => import('./pages/Achievements'));
const Resume = lazy(() => import('./pages/Resume'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminRedirect = lazy(() => import('./pages/AdminRedirect'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, [pathname, hash]);

  return null;
}

function PageFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex items-center gap-3 font-mono text-xs text-[#83b4ff]">
        <div className="w-2 h-2 rounded-full bg-[#83b4ff] animate-ping" />
        <span>Loading page…</span>
      </div>
    </div>
  );
}

export function AppContent() {

  return (
    <div className="min-h-screen bg-[#080c12] text-[#9ba7b8] flex flex-col selection:bg-[#83b4ff]/20 selection:text-[#83b4ff]">
      <ScrollToTop />
      <SiteMetadata />

      <Navbar />

      {/* Main Page Content */}
      <main id="main-content" tabIndex={-1} className="site-width flex-grow">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<JournalEntry />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/documentation/:slug" element={<DocumentationArticle />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/software" element={<Software />} />
            <Route path="/hardware" element={<Hardware />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminRedirect />} />
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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
