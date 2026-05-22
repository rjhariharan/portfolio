import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaServer, FaMobileAlt, FaClock, FaCompass } from 'react-icons/fa';

const stats = [
  { value: "6+", label: "Months Experience", desc: "Production codebase work" },
  { value: "10+", label: "Projects Completed", desc: "Web, Mobile & IoT applications" },
  { value: "15+", label: "Tech Stack Tools", desc: "Frontend & backend languages" },
  { value: "5+", label: "APIs Integrated", desc: "Secure token protocols" }
];

const timeline = [
  {
    icon: FaGraduationCap,
    title: "Foundations & OOP",
    period: "Phase 1",
    desc: "Mastered OOP in Java, database configurations, and built order systems (Foodyguy).",
    color: "text-accent-blue"
  },
  {
    icon: FaCode,
    title: "Modern Frontends & IoT",
    period: "Phase 2",
    desc: "Learned React, Tailwind CSS, and automated IoT smart lock sensor gateways.",
    color: "text-accent-indigo"
  },
  {
    icon: FaServer,
    title: "Enterprise Development",
    period: "Phase 3",
    desc: "Refactored Vvendu Auction modules, cleaned Lombok dependencies, and built dealer dashboards.",
    color: "text-accent-violet"
  },
  {
    icon: FaMobileAlt,
    title: "Mobile Security & Encryption",
    period: "Phase 4",
    desc: "Configured React Native clients with payload decryption and JWT tokens.",
    color: "text-accent-fuchsia"
  }
];

export default function About() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setTime(new Date().toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <section id="about" className="py-24 relative overflow-hidden section-alt">
      {/* Background spotlights */}
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-accent-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-accent-fuchsia/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="mb-16 md:text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Inside My Brand</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-fuchsia mb-8 md:mx-auto"></div>
            <p className="text-secondary max-w-2xl mx-auto">
              A comprehensive overview of my technical stack, live status tracking, and developer journey timeline.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Card 1: Stats Grid (Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 p-6 sm:p-8 rounded-3xl card-bg flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-accent-blue mb-2 block">Metrics</span>
              <h3 className="text-xl font-bold font-display text-primary mb-6">Capabilities by the Numbers</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((s, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-primary/[0.02] dark:bg-white/[0.01] border border-primary/[0.06] dark:border-white/5">
                  <span className="text-3xl sm:text-4xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-indigo block mb-1">
                    {s.value}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-primary block mb-0.5">{s.label}</span>
                  <span className="text-[10px] sm:text-xs text-secondary/50 block font-mono">{s.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Currently Building (Span 1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 sm:p-8 rounded-3xl card-bg flex flex-col justify-between group hover:border-accent-indigo/20 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-accent-indigo">Active Status</span>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
              </div>
              <h3 className="text-xl font-bold font-display text-primary mb-4">Currently Building</h3>
              <p className="text-xs sm:text-sm text-secondary/70 leading-relaxed mb-6">
                Integrating secure API communication patterns with AES payload decryption workflows.
              </p>
            </div>

            <div className="space-y-2 border-t border-white/5 pt-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-secondary/80">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                <span>Spring Boot REST Controllers</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-secondary/80">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-indigo" />
                <span>JWT Authentication flow</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-secondary/80">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-fuchsia" />
                <span>Framer & GSAP UI layers</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Location / Timezone (Span 1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 sm:p-8 rounded-3xl card-bg flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-accent-fuchsia mb-2 block">Coordinates</span>
              <h3 className="text-xl font-bold font-display text-primary mb-4">Location & Time</h3>
            </div>

            <div className="my-4">
              <div className="flex items-center space-x-3 text-secondary/70 mb-2">
                <FaCompass className="text-accent-fuchsia shrink-0" size={16} />
                <span className="text-xs sm:text-sm font-semibold text-primary">Mayiladuthurai, TN, India</span>
              </div>
              <p className="text-[11px] font-mono text-secondary/40 ml-7">11.1085° N, 79.6548° E</p>
            </div>

            <div className="border-t border-muted pt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-secondary/50">
                <FaClock size={14} />
                <span className="text-xs uppercase font-mono">IST</span>
              </div>
              <span className="text-lg font-mono font-bold text-white tracking-widest bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                {time || "--:--:--"}
              </span>
            </div>
          </motion.div>

          {/* Card 4: Journey Timeline Scroll Box (Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 p-6 sm:p-8 rounded-3xl card-bg flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-accent-blue mb-2 block">Evolution</span>
              <h3 className="text-xl font-bold font-display text-primary mb-6">Journey Timeline</h3>
            </div>

            {/* Scrollable Timeline Box */}
            <div 
              data-lenis-prevent
              className="md:max-h-60 md:overflow-y-auto pr-2 space-y-4 scrollbar-thin overflow-y-visible max-h-none"
            >
              {timeline.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex gap-4 p-3 rounded-xl bg-primary/[0.02] dark:bg-white/[0.01] border border-primary/[0.05] dark:border-white/5 hover:bg-primary/[0.04] dark:hover:bg-white/[0.02] transition-colors">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 ${item.color}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-sm font-bold text-primary">{item.title}</span>
                        <span className="text-[10px] font-mono text-secondary/40 px-2 py-0.5 bg-white/5 rounded-full uppercase">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-xs text-secondary/70 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>


        </div>

      </div>
    </section>
  );
}
