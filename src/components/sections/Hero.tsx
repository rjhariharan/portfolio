import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaDownload, FaReact, FaJava, FaDatabase, FaMobileAlt } from 'react-icons/fa';

export default function Hero() {
  const roles = [
    "Software Developer", 
    "Full Stack Developer", 
    "React Developer", 
    "Spring Boot Developer", 
    "Mobile App Developer"
  ];

  // Custom Typewriter logic
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer: any;

    if (!isDeleting) {
      // Typing
      if (roleText.length < currentRole.length) {
        timer = setTimeout(() => {
          setRoleText(currentRole.substring(0, roleText.length + 1));
        }, typingSpeed);
      } else {
        // Wait before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(50); // Delete faster
        }, 1500);
      }
    } else {
      // Deleting
      if (roleText.length > 0) {
        timer = setTimeout(() => {
          setRoleText(currentRole.substring(0, roleText.length - 1));
        }, typingSpeed);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setTypingSpeed(100); // Reset typing speed
      }
    }

    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIndex]);

  const floatBadges = [
    { icon: FaReact, color: "text-[#61dafb]", shadow: "shadow-[#61dafb]/20", position: "-top-2 -left-2", animation: "animate-float-slow" },
    { icon: FaJava, color: "text-[#f89820]", shadow: "shadow-[#f89820]/20", position: "top-8 -right-4", animation: "animate-float-medium" },
    { icon: FaDatabase, color: "text-[#00758f]", shadow: "shadow-[#00758f]/20", position: "bottom-4 -left-4", animation: "animate-float-fast" },
    { icon: FaMobileAlt, color: "text-[#3b82f6]", shadow: "shadow-[#3b82f6]/20", position: "-bottom-2 -right-2", animation: "animate-float-slow" }
  ];

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars radius={100} depth={50} count={6000} factor={6} saturation={0} fade speed={1.2} />
        </Canvas>
      </div>

      {/* Radiant glow background */}
      <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full bg-accent-indigo/5 blur-[120px] pointer-events-none animate-glow-pulse -z-10" />

      <div className="container mx-auto px-6 md:px-12 z-10 flex flex-col-reverse lg:flex-row items-center justify-between mt-12 md:mt-20">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Tagline label */}
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-mono tracking-widest text-accent-blue uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
              <span>Available for Opportunities</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight mb-4 text-white">
              Hi, I'm <span className="text-gradient">R.J. Hariharan</span>
            </h1>
            
            {/* Typing Container */}
            <div className="h-10 sm:h-12 mb-6">
              <p className="text-xl sm:text-2xl lg:text-3xl text-secondary font-light">
                I build things as a{" "}
                <span className="text-white font-semibold typing-cursor">
                  {roleText}
                </span>
              </p>
            </div>

            <p className="text-secondary/70 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed text-sm sm:text-base">
              Full-stack software developer focusing on building responsive, highly functional web systems. Proficient in React, Spring Boot, REST APIs, and secure architecture patterns.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
              <a 
                href="/rjhariharanresume.pdf" 
                download="rjresume.pdf"
                className="group relative px-8 py-3.5 bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-bold rounded-full overflow-hidden w-full sm:w-auto text-center flex items-center justify-center space-x-2 shadow-lg shadow-accent-indigo/20 hover:shadow-accent-indigo/40 hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center space-x-2">
                  <span>Download Resume</span>
                  <FaDownload className="text-sm group-hover:translate-y-0.5 transition-transform duration-300" />
                </span>
              </a>
              
              <div className="flex items-center justify-center space-x-4">
                <a 
                  href="https://github.com/rjhariharan" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3.5 bg-white/5 border border-white/10 rounded-full hover:border-accent-blue hover:text-accent-blue hover:bg-white/10 transition-all duration-300 hover:scale-110"
                  aria-label="GitHub Profile"
                >
                  <FaGithub size={20} />
                </a>
                <a 
                  href="https://in.linkedin.com/in/rjhariharan" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3.5 bg-white/5 border border-white/10 rounded-full hover:border-accent-indigo hover:text-accent-indigo hover:bg-white/10 transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Profile Image & Badges */}
        <div className="w-full lg:w-1/2 flex justify-center mt-6 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Radiant glowing backdrop blobs */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue to-accent-fuchsia rounded-full blur-[80px] opacity-25 animate-pulse"></div>
            
            {/* Outer border circular frame with rotation glow */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full p-[2px] bg-gradient-to-tr from-accent-blue/40 via-accent-indigo/20 to-accent-fuchsia/40 shadow-2xl">
              <div className="w-full h-full rounded-full bg-[#08080c] overflow-hidden flex items-center justify-center p-1.5">
                <img 
                  src="/portfoliologo.jpg" 
                  alt="R.J. Hariharan Profile Logo" 
                  className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-700 select-none pointer-events-none"
                />
              </div>

              {/* Floating badges */}
              {floatBadges.map((badge, idx) => {
                const BadgeIcon = badge.icon;
                return (
                  <div 
                    key={idx}
                    className={`absolute ${badge.position} ${badge.animation} w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-lg ${badge.shadow}`}
                  >
                    <BadgeIcon className={`${badge.color} text-lg sm:text-xl`} />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer pointer-events-auto"
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-secondary/40 text-[10px] tracking-widest uppercase mb-2 font-mono">Scroll Down</span>
        <div className="w-[1px] h-10 bg-white/15 relative overflow-hidden">
          <motion.div 
            className="w-full h-1/3 bg-accent-blue absolute top-0"
            animate={{ y: ['-100%', '300%'] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
