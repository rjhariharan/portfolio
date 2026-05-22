import { useState } from 'react';
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
import Certifications from './components/sections/Certifications';
import Experience from './components/sections/Experience';
import AskAI from './components/sections/AskAI';
import Contact from './components/sections/Contact';
import TerminalSection from './components/sections/TerminalSection';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ReactLenis root>
      {/* Loading Screen Overlay */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <div className="relative w-full min-h-screen bg-[#030303] text-primary overflow-hidden bg-grid-pattern">
          {/* Global Follow Cursor */}
          <CustomCursor />

          {/* Floating Neon Background Blobs */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            {/* Blob 1: Blue */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-accent-blue/10 blur-[100px] animate-blob" />
            {/* Blob 2: Violet */}
            <div className="absolute top-2/3 -right-20 w-80 h-80 sm:w-[450px] sm:h-[450px] rounded-full bg-accent-violet/10 blur-[130px] animate-blob [animation-delay:4s]" />
            {/* Blob 3: Fuchsia */}
            <div className="absolute top-1/2 left-1/3 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-accent-fuchsia/5 blur-[90px] animate-blob [animation-delay:2s]" />
          </div>

          {/* Floating Glassmorphic Nav Dock */}
          <Navbar />
          
          {/* Main Sections */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Certifications />
            <Experience />
            <TerminalSection />
            <AskAI />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </ReactLenis>
  );
}

export default App;
