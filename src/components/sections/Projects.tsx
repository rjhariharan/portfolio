import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaDatabase, FaServer, FaLock, FaNetworkWired, FaCode, FaLaptopCode, FaCheckCircle, FaRobot } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  features: string[];
  tech: string[];
  github: string;
  demo: string;
  images: string[];
  metrics: { label: string; value: string }[];
  flowNodes: { id: string; name: string; icon: any; color: string }[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Vvendu Auction Platform",
    category: "Full Stack",
    description: "Enterprise auction platform facilitating dynamic bidding, hierarchical role registration, and admin monitoring dashboards.",
    longDescription: "A full-scale digital auction environment built for automotive/lending businesses. Integrates hierarchical role permissions, step-based registration pipelines, and audit logs. Solved complex performance bottlenecks in Lombok bean rendering by refactoring backend model representations.",
    features: [
      "8-Step Dealer & Lender registration workflows",
      "Dynamic zone-region population via REST endpoints",
      "Admin master table panel control and community allocations",
      "Silent background session validation & automatic transitions"
    ],
    tech: ["React", "Spring Boot", "MySQL", "Tailwind CSS", "JWT Auth", "REST APIs"],
    github: "",
    demo: "https://vvendu.com",
    images: [
      "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    metrics: [
      { label: "Sign-Up Complexity", value: "8 Steps" },
      { label: "Active Modules", value: "5 Web Apps" },
      { label: "Query Routing", value: "Dynamic Zone" }
    ],
    flowNodes: [
      { id: "ui", name: "Dealer UI (React)", icon: FaLaptopCode, color: "text-[#61dafb]" },
      { id: "filter", name: "AES-CBC Cipher", icon: FaLock, color: "text-[#d946ef]" },
      { id: "api", name: "Spring Boot Controller", icon: FaServer, color: "text-[#6db33f]" },
      { id: "db", name: "Relational Schema", icon: FaDatabase, color: "text-[#4479a1]" }
    ]
  },
  {
    id: 2,
    title: "Futuristic Personal Portfolio",
    category: "Frontend",
    description: "An ultra-premium, interactive developer portfolio showcasing advanced coding and animation proficiency.",
    longDescription: "Designed to represent my frontend capabilities. Features a custom canvas particle system, mouse-follow lighting, typing roler widgets, filter layouts, details preview overlays, and Apple-like scroll flows.",
    features: [
      "Framer Motion layout shifts and GSAP cursor followers",
      "SVG progress indicators with scroll reveals",
      "Fully responsive custom styling, glassmorphism cards and neon color gradients",
      "Dynamic loader simulation with loading statement output loops"
    ],
    tech: ["React", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js", "Lenis Scroll"],
    github: "https://github.com/rjhariharan/portfolio",
    demo: "#",
    images: [
      `${import.meta.env.BASE_URL}portfolio_hero.png`
    ],
    metrics: [
      { label: "Design Level", value: "Awwwards" },
      { label: "Scroll Library", value: "Lenis Smooth" },
      { label: "Framerate Target", value: "60 FPS" }
    ],
    flowNodes: [
      { id: "input", name: "User Interaction", icon: FaNetworkWired, color: "text-[#f7df1e]" },
      { id: "state", name: "Framer Motion Springs", icon: FaCode, color: "text-[#d946ef]" },
      { id: "render", name: "Vite Client Render", icon: FaLaptopCode, color: "text-[#61dafb]" }
    ]
  },
  {
    id: 3,
    title: "IoT Smart Lock System",
    category: "IoT",
    description: "Secure, application-controlled lock automation hardware with remote entry logs and real-time monitoring.",
    longDescription: "An IoT architecture enabling access point configurations. Leverages sensor networks to monitor access gates and relay events to a central dashboard, protecting industrial entry ports.",
    features: [
      "Microcontroller integration using secure network messaging",
      "Real-time locking state triggers and action logs",
      "Sensor integrations monitoring tampering attempts",
      "Dashboard UI displaying telemetry trends"
    ],
    tech: ["IoT Hub", "Sensor Networks", "Automation", "Data Analysis", "Java"],
    github: "https://github.com/rjhariharan/SmartLockSystem.git",
    demo: "#",
    images: [
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    metrics: [
      { label: "Sensor Hookups", value: "Tamper Alerts" },
      { label: "Security Logging", value: "Firebase DB" },
      { label: "Trigger Speed", value: "<150ms" }
    ],
    flowNodes: [
      { id: "sensor", name: "Hardware Tamper Sensor", icon: FaNetworkWired, color: "text-[#f05032]" },
      { id: "controller", name: "Microcontroller Hub", icon: FaCode, color: "text-[#f89820]" },
      { id: "cloud", name: "Firebase Logs", icon: FaDatabase, color: "text-[#ffca28]" }
    ]
  },
  {
    id: 4,
    title: "Foodyguy Order Platform",
    category: "Full Stack",
    description: "Full-stack food ordering platform leveraging classic Java POJO architecture, DAO design patterns, and JDBC data layer binds.",
    longDescription: "Built to model restaurant logistics operations. Structured tables for cart items, customer logins, and order updates, communicating via JDBC with a local MySQL server.",
    features: [
      "POJO design patterns for items and orders mapping",
      "DAO interface implementations ensuring persistence separation",
      "JDBC database connector binding local SQL instances",
      "Robust input validations preventing sql injections"
    ],
    tech: ["Java", "JDBC", "MySQL Database", "REST APIs", "DAO Patterns"],
    github: "https://github.com/RJHariharan/Foodyguy",
    demo: "#",
    images: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    metrics: [
      { label: "Model Layer", value: "Java POJO" },
      { label: "Access Pattern", value: "DAO Classes" },
      { label: "Connector", value: "JDBC Pool" }
    ],
    flowNodes: [
      { id: "client", name: "Java Web Client", icon: FaLaptopCode, color: "text-[#f89820]" },
      { id: "dao", name: "DAO Interface", icon: FaCode, color: "text-[#6366f1]" },
      { id: "jdbc", name: "JDBC Driver Binds", icon: FaNetworkWired, color: "text-[#d946ef]" },
      { id: "mysql", name: "MySQL Server Instance", icon: FaDatabase, color: "text-[#4479a1]" }
    ]
  }
];

export default function Projects() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [viewMode, setViewMode] = useState<"ui" | "architecture">("ui");
  const [imageIndex, setImageIndex] = useState(0);

  const activeProject = projects[activeProjectIdx];

  const handleNextImage = () => {
    setImageIndex((prev) => (prev + 1) % activeProject.images.length);
  };

  const handlePrevImage = () => {
    setImageIndex((prev) => (prev - 1 + activeProject.images.length) % activeProject.images.length);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-primary/[0.02] dark:bg-black/10">
      {/* Glow spot */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent-blue/5 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-16 md:text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Product Launches</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-fuchsia mb-8 md:mx-auto"></div>
            <p className="text-secondary max-w-2xl mx-auto">
              Inspect application specs, live integrations, and transactional data flow charts.
            </p>
          </motion.div>
        </div>

        {/* Unified Launch Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Left: Active Console (Cols 9) */}
          <div className="lg:col-span-9 order-2 lg:order-1 rounded-3xl bg-cardBg/40 dark:bg-white/[0.02] border border-primary/5 dark:border-white/5 flex flex-col justify-between overflow-hidden glow-card">
            
            {/* View Mode Header toggler */}
            <div className="px-6 py-4 bg-primary/[0.03] dark:bg-[#050508] border-b border-primary/[0.06] dark:border-white/5 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="text-secondary/40 ml-4">Terminal: {activeProject.title.replace(/\s+/g, '').toLowerCase()}.sh</span>
              </div>
              <div className="flex space-x-2 bg-primary/[0.04] dark:bg-white/5 p-1 rounded-xl border border-primary/[0.06] dark:border-white/5">
                <button
                  onClick={() => setViewMode("ui")}
                  className={`px-3 py-1 text-[10px] font-mono rounded-lg transition-all ${
                    viewMode === "ui" ? 'bg-accent-indigo text-white shadow-md' : 'text-secondary hover:text-primary dark:hover:text-white'
                  }`}
                >
                  UI Mockup
                </button>
                <button
                  onClick={() => setViewMode("architecture")}
                  className={`px-3 py-1 text-[10px] font-mono rounded-lg transition-all ${
                    viewMode === "architecture" ? 'bg-accent-indigo text-white shadow-md' : 'text-secondary hover:text-primary dark:hover:text-white'
                  }`}
                >
                  Data Flow Arch
                </button>
              </div>
            </div>

            {/* Main Interactive Screen */}
            <div className="p-6 md:p-8 flex-grow">
              <AnimatePresence mode="wait">
                {viewMode === "ui" ? (
                  <motion.div
                    key="ui-mode"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="relative rounded-2xl overflow-hidden border border-primary/[0.08] dark:border-white/10 bg-primary/[0.04] dark:bg-black/40 h-64 md:h-72 flex items-center justify-center group"
                  >
                    <img 
                      src={activeProject.images[imageIndex]} 
                      alt={activeProject.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    {/* Carousel navigation */}
                    {activeProject.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cardBg/70 dark:bg-black/70 border border-primary/10 dark:border-white/10 flex items-center justify-center text-primary dark:text-white hover:bg-cardBg dark:hover:bg-black transition-colors"
                        >
                          <FaChevronLeft size={12} />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cardBg/70 dark:bg-black/70 border border-primary/10 dark:border-white/10 flex items-center justify-center text-primary dark:text-white hover:bg-cardBg dark:hover:bg-black transition-colors"
                        >
                          <FaChevronRight size={12} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5">
                          {activeProject.images.map((_, i) => (
                            <span 
                              key={i} 
                              className={`w-1.5 h-1.5 rounded-full transition-all ${
                                imageIndex === i ? 'bg-white w-3' : 'bg-white/30'
                              }`} 
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="architecture-mode"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-2xl border border-primary/[0.06] dark:border-white/10 bg-primary/[0.03] dark:bg-[#050508]/80 h-64 md:h-72 flex flex-col items-center justify-center p-6 relative overflow-hidden"
                  >
                    {/* Animated laser grid backing */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                    
                    <span className="text-[9px] uppercase font-mono tracking-widest text-accent-indigo absolute top-4 left-6">System Pipeline Visualization</span>
                    
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative z-10 w-full max-w-2xl">
                      {activeProject.flowNodes.map((node, i) => {
                        const NodeIcon = node.icon;
                        const isLast = i === activeProject.flowNodes.length - 1;
                        return (
                          <div key={node.id} className="flex flex-col md:flex-row items-center justify-center w-full md:w-auto">
                            <div className="flex flex-col items-center">
                              <div className="w-12 h-12 rounded-xl bg-primary/[0.03] dark:bg-white/[0.02] border border-primary/[0.06] dark:border-white/10 flex items-center justify-center relative shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                                <NodeIcon className={`text-xl ${node.color}`} />
                                {/* Pulsing ring indicator */}
                                <span className="absolute inset-0 rounded-xl border border-accent-indigo/20 animate-ping opacity-25" />
                              </div>
                              <span className="text-[10px] font-mono mt-2 text-center text-primary/80 dark:text-white/80 whitespace-nowrap">{node.name}</span>
                            </div>
                            
                            {!isLast && (
                              <div className="flex items-center justify-center my-2 md:my-0 md:mx-4">
                                {/* Flow line */}
                                <div className="w-[1px] h-4 md:w-8 md:h-[1px] bg-gradient-to-r from-accent-indigo to-accent-fuchsia relative overflow-hidden">
                                  <motion.div 
                                    className="absolute inset-y-0 left-0 w-2 bg-white blur-[1px]"
                                    animate={{ left: ["0%", "100%"] }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 mt-6 border-y border-primary/[0.06] dark:border-white/5 py-4">
                {activeProject.metrics.map((m, i) => (
                  <div key={i} className="text-center font-mono border-r border-primary/[0.06] dark:border-white/5 last:border-r-0">
                    <span className="text-xs text-secondary/40 block uppercase tracking-wider mb-1">{m.label}</span>
                    <span className="text-sm font-bold text-primary block">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Specifications Area */}
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-primary mb-1.5">{activeProject.title}</h3>
                  <p className="text-xs text-secondary/70 leading-relaxed">{activeProject.longDescription}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent-indigo block">Specs Checklist</span>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {activeProject.features.map((feat, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-secondary/80 leading-relaxed">
                        <FaCheckCircle className="text-accent-indigo shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* CTAs Footer bar */}
            <div className="px-6 py-4 bg-primary/[0.03] dark:bg-[#050508] border-t border-primary/[0.06] dark:border-white/5 flex items-center justify-between flex-wrap gap-4 select-none">
              <div className="flex flex-wrap gap-1.5">
                {activeProject.tech.map((t) => (
                  <span key={t} className="tag-pill text-[9px] font-mono px-2 py-0.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex space-x-3 shrink-0">
                <button
                  onClick={() => {
                    const event = new CustomEvent('ask-rj-ai', {
                      detail: {
                        prompt: `Tell me about ${activeProject.title}`
                      }
                    });
                    window.dispatchEvent(event);
                  }}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-accent-indigo/10 hover:bg-accent-indigo/20 border border-accent-indigo/20 text-xs font-mono font-semibold text-accent-blue transition-all"
                >
                  <FaRobot size={12} className="text-accent-blue" />
                  <span>Ask AI About This Project</span>
                </button>
                {activeProject.github && activeProject.github !== "" && (
                  <a 
                    href={activeProject.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-primary/5 dark:bg-white/5 hover:bg-primary/10 dark:hover:bg-white/10 border border-primary/5 dark:border-white/5 hover:border-primary/10 dark:hover:border-white/10 text-xs font-mono font-semibold text-primary transition-all"
                  >
                    <FaGithub size={12} />
                    <span>Repository</span>
                  </a>
                )}
                {activeProject.demo && activeProject.demo !== "#" && (
                  <a 
                    href={activeProject.demo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-indigo text-xs font-mono font-semibold text-white shadow-md hover:scale-[1.03] transition-all"
                  >
                    <FaExternalLinkAlt size={10} />
                    <span>Launch Live</span>
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Right: Product Selector Tabs (Cols 3) */}
          <div className="lg:col-span-3 order-1 lg:order-2 space-y-3 flex flex-col justify-start">
            <span className="text-[10px] uppercase font-mono tracking-widest text-secondary/40 px-2">Launch Index</span>
            {projects.map((proj, idx) => {
              const isActive = activeProjectIdx === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    setActiveProjectIdx(idx);
                    setImageIndex(0);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden glow-card ${
                    isActive 
                      ? 'bg-gradient-to-r from-accent-blue/10 to-accent-indigo/10 border-accent-blue/30 text-primary' 
                      : 'bg-primary/[0.01] dark:bg-white/[0.01] border-primary/[0.06] dark:border-white/5 text-secondary hover:border-primary/15 dark:hover:border-white/20 hover:text-primary'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold font-display block truncate">{proj.title}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-ping" />}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-secondary/50">{proj.category}</span>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
