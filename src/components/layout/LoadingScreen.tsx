import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const initializationLogs = [
  "INITIALIZING VIRTUAL ENVIRONMENT...",
  "LOADING CORE COMPONENTS...",
  "ESTABLISHING SECURE CONNECTION...",
  "TUNING INTERACTIVE ANIMATIONS...",
  "SYNCHRONIZING PORTFOLIO DATABASE...",
  "INJECTING CREATIVE ENERGY...",
  "SYSTEMS ONLINE. ENJOY THE EXPERIENCE!"
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Scroll block
    document.body.style.overflow = 'hidden';

    const duration = 1800; // Total duration in ms
    const intervalTime = 20; // Step interval
    const totalSteps = duration / intervalTime;
    const increment = 100 / totalSteps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              document.body.style.overflow = '';
              onComplete();
            }, 800); // Wait for exit animation to complete
          }, 300);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  // Rotate log messages based on progress
  useEffect(() => {
    const nextLogIndex = Math.min(
      Math.floor((progress / 100) * initializationLogs.length),
      initializationLogs.length - 1
    );
    if (nextLogIndex !== logIndex) {
      setLogIndex(nextLogIndex);
    }
  }, [progress, logIndex]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-[#030303] z-[99999] flex flex-col justify-between p-8 md:p-12 select-none overflow-hidden"
        >
          {/* Top Info */}
          <div className="flex justify-between items-center text-xs md:text-sm text-secondary/40 font-mono">
            <div>R.J. HARIHARAN &copy; 2026</div>
            <div className="hidden sm:block">FUTURISTIC DEVELOPER ENVIRONMENT v2.4.0</div>
            <div>STATUS: BOOTING</div>
          </div>

          {/* Center Counter */}
          <div className="flex flex-col items-center justify-center flex-grow">
            <div className="relative font-display font-extrabold text-[15vw] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 select-none">
              {Math.floor(progress)}
              <span className="text-[5vw] text-accent-blue ml-2 font-normal">%</span>
            </div>
            
            {/* Loading Bar */}
            <div className="w-full max-w-md h-[2px] bg-white/5 rounded-full overflow-hidden mb-6 relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-fuchsia"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Terminal log messages */}
            <div className="h-6 overflow-hidden flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={logIndex}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs md:text-sm font-mono text-accent-indigo uppercase tracking-wider"
                >
                  {initializationLogs[logIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] md:text-xs text-secondary/30 font-mono space-y-2 sm:space-y-0">
            <div>SYSTEM: ONLINE</div>
            <div>COMPILING DESIGN TOKENS... SUCCESS</div>
            <div>READY FOR RECRUITERS</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
