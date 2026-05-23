import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useMagnetic } from '../../utils/useMagnetic';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

interface NavLinkProps {
  link: { name: string; href: string };
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
}

function NavLink({ link, isActive, onClick }: NavLinkProps) {
  const ref = useMagnetic<HTMLAnchorElement>();
  return (
    <a 
      ref={ref}
      href={link.href} 
      className="text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-colors relative block"
      onClick={onClick}
    >
      {/* Slider Highlight */}
      {isActive && (
        <motion.span 
          layoutId="activeNavIndicator"
          className="absolute inset-0 bg-primary/5 border border-primary/10 rounded-full"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className={`relative z-10 transition-colors duration-300 ${
        isActive ? 'text-accent-blue font-bold' : 'text-secondary hover:text-primary'
      }`}>
        {link.name}
      </span>
    </a>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const { theme, toggleTheme } = useTheme();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active link checking
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const top = (section as HTMLElement).offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(navLinks[i].href.slice(1));
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 md:px-8 py-4 pointer-events-none">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-5xl rounded-full border border-primary/5 bg-cardBg/40 backdrop-blur-md transition-all duration-300 py-3 px-6 flex justify-between items-center pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] ${
            isScrolled ? 'bg-cardBg/80 border-primary/10 md:py-3.5' : 'bg-transparent border-transparent py-4 md:py-5'
          }`}
        >
          {/* Logo with tablogo.png */}
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('close-rj-ai'));
              document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xl md:text-2xl font-bold font-display tracking-tight text-primary hover:opacity-95 transition-all flex items-center gap-2.5"
          >
            <img src={`${import.meta.env.BASE_URL}tablogo.png`} alt="R.J. Logo" className="w-6 h-6 md:w-7 md:h-7 object-contain rounded-lg shadow-sm" />
            <div className="flex items-center gap-1">
              <span className="text-accent-blue font-extrabold">R.J.</span>
              <span className="text-secondary/80">Hariharan</span>
            </div>
          </a>

          {/* Desktop Nav and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4 relative">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => {
                const sectionName = link.href.slice(1);
                const isActive = activeSection === sectionName;
                return (
                  <NavLink
                    key={link.name}
                    link={link}
                    isActive={isActive}
                    onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('close-rj-ai'));
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                );
              })}
            </div>

            {/* Micro-animated Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-primary/5 bg-primary/5 text-primary hover:bg-primary/10 transition-all pointer-events-auto flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              aria-label="Toggle Theme Mode"
            >
              {theme === 'dark' ? <FaSun size={14} className="text-amber-400" /> : <FaMoon size={14} className="text-indigo-600" />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-primary focus:outline-none w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-50 pointer-events-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className={`block w-6 h-0.5 bg-primary transform transition duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-primary transition duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-primary transform transition duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          {/* Scroll Progress Indicator attached to floating nav */}
          <motion.div 
            className="absolute bottom-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-fuchsia origin-left"
            style={{ scaleX, borderRadius: '999px' }}
          />
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-left max-w-sm mx-auto w-full">
              {/* Mobile Theme Toggle */}
              <div className="flex items-center justify-between border-b border-primary/10 pb-4 mb-2">
                <span className="text-xs uppercase font-mono tracking-widest text-secondary font-bold">Theme Mode</span>
                <motion.button
                  onClick={toggleTheme}
                  className="w-10 h-10 rounded-2xl bg-primary/5 border border-primary/5 text-primary flex items-center justify-center"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {theme === 'dark' ? <FaSun size={16} className="text-amber-400" /> : <FaMoon size={16} className="text-indigo-600" />}
                </motion.button>
              </div>

              {navLinks.map((link, idx) => {
                const sectionName = link.href.slice(1);
                const isActive = activeSection === sectionName;
                return (
                  <motion.a 
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -30, opacity: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    key={link.name}
                    href={link.href} 
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      window.dispatchEvent(new CustomEvent('close-rj-ai'));
                      setTimeout(() => {
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                      }, 200);
                    }}
                    className={`text-3xl font-bold font-display tracking-tight flex items-center gap-4 transition-all ${
                      isActive ? 'text-accent-blue translate-x-2' : 'text-secondary hover:text-primary'
                    }`}
                  >
                    <span className="text-xs font-mono text-secondary/35">0{idx + 1}.</span>
                    <span>{link.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
