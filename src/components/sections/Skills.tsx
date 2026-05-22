import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaJava, FaGitAlt, FaMobileAlt, FaCode, FaServer, FaCogs, FaDatabase } from 'react-icons/fa';
import { SiSpringboot, SiTypescript, SiJavascript, SiTailwindcss, SiNodedotjs, SiFirebase, SiMysql } from 'react-icons/si';

interface EcosystemNode {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Mobile" | "Tools";
  icon: any;
  color: string;
  glowColor: string;
  experience: string;
  projects: string[];
  strengths: string[];
  capabilities: string;
  top: string; // percentage position for responsive positioning
  left: string;
  connections: string[]; // connected Node IDs
}

const skillsEcosystem: EcosystemNode[] = [
  {
    id: "react",
    name: "React",
    category: "Frontend",
    icon: FaReact,
    color: "text-[#61dafb]",
    glowColor: "rgba(97, 218, 251, 0.4)",
    experience: "6+ Months Production Work",
    projects: ["Vvendu Auction Platform", "Futuristic Personal Portfolio"],
    strengths: ["Component tree reconciliation", "Custom React hooks", "Dynamic state optimization"],
    capabilities: "Experienced in building fluid, animated dashboards, responsive docks, and full pagination galleries.",
    top: "30%",
    left: "25%",
    connections: ["ts", "js", "tailwind", "boot", "native"]
  },
  {
    id: "ts",
    name: "TypeScript",
    category: "Frontend",
    icon: SiTypescript,
    color: "text-[#3178c6]",
    glowColor: "rgba(49, 120, 198, 0.4)",
    experience: "6+ Months Development",
    projects: ["Futuristic Personal Portfolio"],
    strengths: ["Strict compiler checks", "Interface declarations", "Type mapping security"],
    capabilities: "Leverages type safety rules to ensure backend contract validations and prevent interface type leaks.",
    top: "15%",
    left: "15%",
    connections: ["react", "js"]
  },
  {
    id: "js",
    name: "JavaScript",
    category: "Frontend",
    icon: SiJavascript,
    color: "text-[#f7df1e]",
    glowColor: "rgba(247, 223, 30, 0.3)",
    experience: "1+ Year Core Programming",
    projects: ["Vvendu Platform", "Foodyguy Platform", "Smart Lock System"],
    strengths: ["Asynchronous DOM scripting", "ES6+ array manipulations", "Fetch API operations"],
    capabilities: "Proficient in event cycles, async operations, and promise validation callbacks.",
    top: "18%",
    left: "40%",
    connections: ["react", "ts", "node"]
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    icon: SiTailwindcss,
    color: "text-[#38bdf8]",
    glowColor: "rgba(56, 189, 248, 0.3)",
    experience: "1+ Year Layout Styling",
    projects: ["Vvendu Auction Platform", "Futuristic Personal Portfolio"],
    strengths: ["Utility-first layout grids", "Responsive break design", "Custom theme configs"],
    capabilities: "Expertise in designing custom neon highlights, glass layouts, animations, and fluid media queries.",
    top: "45%",
    left: "12%",
    connections: ["react"]
  },
  {
    id: "boot",
    name: "Spring Boot",
    category: "Backend",
    icon: SiSpringboot,
    color: "text-[#6db33f]",
    glowColor: "rgba(109, 179, 63, 0.4)",
    experience: "6+ Months Production Core",
    projects: ["Vvendu Auction Platform"],
    strengths: ["Spring REST Controllers", "JWT Filter Configurations", "Bean lifecycle resolutions"],
    capabilities: "Integrated multi-step registration pipelines, dynamic zone filters, and Lombok-free entities standardizations.",
    top: "35%",
    left: "60%",
    connections: ["java", "react", "mysql", "jwt", "api"]
  },
  {
    id: "java",
    name: "Java",
    category: "Backend",
    icon: FaJava,
    color: "text-[#f89820]",
    glowColor: "rgba(248, 152, 32, 0.4)",
    experience: "1+ Year Core Logic",
    projects: ["Vvendu Auction", "Foodyguy Ordering", "Smart Lock System"],
    strengths: ["OOP structures & inheritance", "JDBC Data Source routing", "Secure decryption models"],
    capabilities: "Designed custom AES-CBC decryptors, JPA entities mapping, and relational database data layers.",
    top: "16%",
    left: "75%",
    connections: ["boot", "mysql"]
  },
  {
    id: "node",
    name: "Node.js",
    category: "Backend",
    icon: SiNodedotjs,
    color: "text-[#339933]",
    glowColor: "rgba(51, 153, 51, 0.3)",
    experience: "6+ Months Web Apps",
    projects: ["Vvendu Post-Transaction Systems"],
    strengths: ["Express routing", "Package integrations", "JSON operations"],
    capabilities: "Supported operational data processing workflows utilizing MERN application builds.",
    top: "55%",
    left: "78%",
    connections: ["js", "boot"]
  },
  {
    id: "api",
    name: "REST APIs",
    category: "Backend",
    icon: FaCode,
    color: "text-[#6366f1]",
    glowColor: "rgba(99, 102, 241, 0.4)",
    experience: "6+ Months Integrations",
    projects: ["Vvendu Auction Platform", "Foodyguy Service Layers"],
    strengths: ["Payload mappings", "Secure endpoints filtering", "HTTP status contracts"],
    capabilities: "Designed secure data transfers, status handling, and optimized lookup mappings.",
    top: "58%",
    left: "48%",
    connections: ["boot", "jwt"]
  },
  {
    id: "jwt",
    name: "JWT Auth",
    category: "Backend",
    icon: FaCode,
    color: "text-[#d946ef]",
    glowColor: "rgba(217, 70, 239, 0.4)",
    experience: "6+ Months Production Security",
    projects: ["Vvendu Auction Platform"],
    strengths: ["Token generation & validation", "Claims parsing algorithms", "Security context filters"],
    capabilities: "Established authentication filters protecting REST controllers and backend administrative panels.",
    top: "78%",
    left: "58%",
    connections: ["boot", "api"]
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "Database",
    icon: SiMysql,
    color: "text-[#4479a1]",
    glowColor: "rgba(68, 121, 161, 0.3)",
    experience: "1+ Year Schemas",
    projects: ["Vvendu Auction Platform", "Foodyguy Ordering"],
    strengths: ["Relational data design", "JDBC routing layers", "Query configurations"],
    capabilities: "Configured local server connections, entity models mapping, and database transaction consistency.",
    top: "70%",
    left: "30%",
    connections: ["boot", "java"]
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "Database",
    icon: SiFirebase,
    color: "text-[#ffca28]",
    glowColor: "rgba(255, 202, 40, 0.3)",
    experience: "6+ Months Integration",
    projects: ["Smart Lock Telemetry Logs"],
    strengths: ["Real-time state binds", "Telemetry logs collections", "NoSQL configurations"],
    capabilities: "Monitored hardware lock status inputs and event triggers remotely.",
    top: "82%",
    left: "18%",
    connections: ["mysql"]
  },
  {
    id: "native",
    name: "React Native",
    category: "Mobile",
    icon: FaMobileAlt,
    color: "text-[#3b82f6]",
    glowColor: "rgba(59, 130, 246, 0.4)",
    experience: "6+ Months Development",
    projects: ["Vvendu Auction Mobile Client"],
    strengths: ["Secure device keychain configs", "Native layout structures", "Encrypted payload streams"],
    capabilities: "Implemented payload parsers encrypting requests before transmission to Spring Boot backend APIs.",
    top: "52%",
    left: "33%",
    connections: ["react"]
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "Tools",
    icon: FaGitAlt,
    color: "text-[#f05032]",
    glowColor: "rgba(240, 80, 50, 0.3)",
    experience: "1+ Year Version Control",
    projects: ["All Project Repositories"],
    strengths: ["Production branch merges", "Conflict reconciliations", "Continuous updates commits"],
    capabilities: "Familiar with Agile version cycles, code sync states, and local repository maintenance.",
    top: "78%",
    left: "42%",
    connections: ["react", "boot"]
  }
];

const categoryIcons = {
  All: FaCogs,
  Frontend: FaReact,
  Backend: FaServer,
  Database: FaDatabase,
  Mobile: FaMobileAlt,
  Tools: FaGitAlt
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Frontend" | "Backend" | "Database" | "Mobile" | "Tools">("All");
  const [selectedNode, setSelectedNode] = useState<EcosystemNode>(skillsEcosystem[0]);
  const [hoveredNode, setHoveredNode] = useState<EcosystemNode | null>(null);

  const displayNode = hoveredNode || selectedNode;

  // Connection line renderer
  const renderLines = () => {
    return skillsEcosystem.flatMap((node) => {
      // If the node is filtered out, skip rendering connections
      const isNodeActive = activeCategory === "All" || node.category === activeCategory;
      if (!isNodeActive) return [];

      return node.connections.flatMap((targetId) => {
        const target = skillsEcosystem.find((n) => n.id === targetId);
        if (!target) return [];

        const isTargetActive = activeCategory === "All" || target.category === activeCategory;
        if (!isTargetActive) return [];

        // Ensure we only draw line once (avoid double loops react-ts, ts-react)
        if (node.id > target.id) return [];

        const isHighlighted = 
          (hoveredNode && (hoveredNode.id === node.id || hoveredNode.id === target.id)) ||
          (selectedNode.id === node.id || selectedNode.id === target.id);

        return (
          <line
            key={`${node.id}-${target.id}`}
            x1={node.left}
            y1={node.top}
            x2={target.left}
            y2={target.top}
            stroke={isHighlighted ? "url(#neonLineGlow)" : "rgba(255,255,255,0.04)"}
            strokeWidth={isHighlighted ? "2" : "0.5"}
            className="transition-all duration-500"
          />
        );
      });
    });
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-black/40">
      {/* Moving background spotlight gradients */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-accent-blue/5 blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-1/3 w-[350px] h-[350px] rounded-full bg-accent-fuchsia/5 blur-[110px] pointer-events-none -z-10 animate-glow-pulse" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-16 md:text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Technical Ecosystem</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-fuchsia mb-8 md:mx-auto"></div>
            <p className="text-secondary max-w-2xl mx-auto">
              An interactive constellation of core languages, database systems, backend frameworks, and architectural tools.
            </p>
          </motion.div>
        </div>

        {/* Categories Menu */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl mx-auto">
          {(["All", "Frontend", "Backend", "Database", "Mobile", "Tools"] as const).map((cat) => {
            const CatIcon = categoryIcons[cat];
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  // Auto focus first item in the category list
                  if (cat !== "All") {
                    const first = skillsEcosystem.find(s => s.category === cat);
                    if (first) setSelectedNode(first);
                  } else {
                    setSelectedNode(skillsEcosystem[0]);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono border transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-accent-blue/20 to-accent-indigo/20 border-accent-blue/40 text-white shadow-lg'
                    : 'bg-white/[0.01] border-white/5 text-secondary hover:border-white/20 hover:text-white'
                }`}
              >
                <CatIcon size={12} />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Dashboard Command Center Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Left panel: Constellation Map (Span 3) */}
          <div className="lg:col-span-3 min-h-[400px] md:min-h-[480px] rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden flex items-center justify-center p-6 select-none">
            
            {/* Dashed Orbital Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[18%] h-[18%] rounded-full border border-white/[0.02] absolute" />
              <div className="w-[42%] h-[42%] rounded-full border border-dashed border-white/[0.02] absolute animate-spin [animation-duration:90s]" />
              <div className="w-[70%] h-[70%] rounded-full border border-dashed border-white/[0.015] absolute animate-spin [animation-duration:150s]" />
              <div className="w-[95%] h-[95%] rounded-full border border-white/[0.01] absolute" />
            </div>

            {/* Central Core Signal */}
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center animate-pulse">
                <FaCogs className="text-accent-blue animate-spin [animation-duration:8s]" size={16} />
              </div>
              <span className="text-[8px] font-mono text-secondary/30 mt-2 uppercase tracking-widest">Core Engine</span>
            </div>

            {/* Connection Lines Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="neonLineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#d946ef" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              {renderLines()}
            </svg>

            {/* Interactive Nodes Layer */}
            <div className="absolute inset-0 w-full h-full z-10">
              {skillsEcosystem.map((node) => {
                const NodeIcon = node.icon;
                const isNodeActiveCategory = activeCategory === "All" || node.category === activeCategory;
                const isSelected = selectedNode.id === node.id;
                const isHovered = hoveredNode?.id === node.id;
                
                return (
                  <motion.div
                    key={node.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                    style={{
                      top: node.top,
                      left: node.left,
                      opacity: isNodeActiveCategory ? 1 : 0.15,
                      pointerEvents: isNodeActiveCategory ? 'auto' : 'none'
                    }}
                    onClick={() => setSelectedNode(node)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    whileHover={{ scale: 1.15 }}
                  >
                    <div 
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isSelected || isHovered
                          ? 'bg-[#0f0f18] border-accent-indigo/60 border-2'
                          : 'bg-[#050508] border-white/5 border hover:border-white/20'
                      }`}
                      style={{
                        boxShadow: isSelected || isHovered ? `0 0 20px ${node.glowColor}` : 'none'
                      }}
                    >
                      <NodeIcon className={`text-base sm:text-lg transition-transform ${node.color}`} />
                    </div>
                    {/* Small tag shown on active nodes */}
                    {(isSelected || isHovered) && (
                      <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-14 left-1/2 -translate-x-1/2 text-[9px] font-mono font-semibold bg-black/90 border border-white/10 px-2 py-0.5 rounded-full text-white whitespace-nowrap"
                      >
                        {node.name}
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* Right panel: HUD Ecosystem Inspector (Span 2) */}
          <div className="lg:col-span-2 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col justify-between overflow-hidden">
            
            {/* Header Inspector */}
            <div className="p-6 border-b border-white/5 bg-[#050508] flex items-center justify-between select-none">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-secondary/40">Ecosystem Inspector</span>
              </div>
              <span className="text-[9px] font-mono text-secondary/30">Node_ID: {displayNode.id}</span>
            </div>

            {/* Body Info */}
            <div className="p-6 space-y-6 flex-grow overflow-y-auto">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold font-display text-white mb-1">{displayNode.name}</h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent-blue px-2 py-0.5 bg-accent-blue/10 border border-accent-blue/20 rounded-full">
                    {displayNode.category}
                  </span>
                </div>
                <div 
                  className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center"
                  style={{ boxShadow: `0 0 20px ${displayNode.glowColor}` }}
                >
                  <displayNode.icon className={`text-2xl ${displayNode.color}`} />
                </div>
              </div>

              {/* Specs List */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div>
                  <h4 className="text-[10px] uppercase font-mono tracking-wider text-secondary/40 mb-1">Exposure</h4>
                  <p className="text-sm font-semibold text-white">{displayNode.experience}</p>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase font-mono tracking-wider text-secondary/40 mb-1.5">Active Deployments</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {displayNode.projects.map((proj, i) => (
                      <span key={i} className="text-[10px] font-mono text-secondary/80 bg-white/5 border border-white/5 px-2 py-0.5 rounded-md">
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase font-mono tracking-wider text-secondary/40 mb-1.5">Key Strengths</h4>
                  <ul className="space-y-1.5">
                    {displayNode.strengths.map((str, i) => (
                      <li key={i} className="text-xs text-secondary/70 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-accent-indigo" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase font-mono tracking-wider text-secondary/40 mb-1">Architecture Capability</h4>
                  <p className="text-xs text-secondary/60 leading-relaxed font-mono bg-black/40 border border-white/5 p-3 rounded-xl">
                    {displayNode.capabilities}
                  </p>
                </div>
              </div>

            </div>

            {/* Footer command prompt status */}
            <div className="p-4 bg-[#050508] border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-secondary/40 select-none">
              <span>STATUS: SECURE_BIND</span>
              <span>SYS_INIT: OK</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
