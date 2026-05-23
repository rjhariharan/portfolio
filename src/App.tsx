import { useState, lazy, Suspense } from 'react';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/layout/CustomCursor';
import LoadingScreen from './components/layout/LoadingScreen';

// Core sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

// Heavy sections lazy loaded to reduce initial bundle size
const Certifications = lazy(() => import('./components/sections/Certifications'));
const Experience = lazy(() => import('./components/sections/Experience'));
const TerminalSection = lazy(() => import('./components/sections/TerminalSection'));
const AskAI = lazy(() => import('./components/sections/AskAI'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  // Disable Lenis smooth scroll on mobile — native momentum scroll is far more performant
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: !isMobile, prevent: (node) => node.hasAttribute('data-lenis-prevent') }}>
      {/* Loading Screen Overlay */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <div className="relative w-full min-h-screen bg-background text-primary overflow-hidden bg-grid-pattern">
          {/* Global Follow Cursor */}
          <CustomCursor />

          {/* Floating Neon Background Blobs — hidden on mobile to prevent GPU-intensive blur repaints */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none hidden md:block">
            {/* Blob 1: Blue */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-accent-blue/10 blur-[100px] animate-blob" />
            {/* Blob 2: Violet */}
            <div className="absolute top-2/3 -right-20 w-[450px] h-[450px] rounded-full bg-accent-violet/10 blur-[130px] animate-blob [animation-delay:4s]" />
            {/* Blob 3: Fuchsia */}
            <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-accent-fuchsia/5 blur-[90px] animate-blob [animation-delay:2s]" />
          </div>

          {/* Floating Glassmorphic Nav Dock */}
          <Navbar />
          
          {/* Main Sections */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            
            <Suspense fallback={<div className="h-48 flex items-center justify-center font-mono text-xs text-secondary/30">Loading Credentials Node...</div>}>
              <Certifications />
            </Suspense>
            
            <Suspense fallback={<div className="h-48 flex items-center justify-center font-mono text-xs text-secondary/30">Retrieving Mission Logs...</div>}>
              <Experience />
            </Suspense>
            
            <Suspense fallback={<div className="h-48 flex items-center justify-center font-mono text-xs text-secondary/30">Spawning Shell Interface...</div>}>
              <TerminalSection />
            </Suspense>
            
            <Contact />
          </main>

          {/* Ask AI Support Drawer (moved outside main to ensure it overlays Navbar on mobile) */}
          <Suspense fallback={null}>
            <AskAI />
          </Suspense>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </ReactLenis>
  );
}

export default App;
