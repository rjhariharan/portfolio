import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion';
import { 
  FaTerminal, 
  FaCalendarAlt, 
  FaChevronRight, 
  FaPlay, 
  FaGraduationCap, 
  FaBriefcase, 
  FaServer, 
  FaNetworkWired, 
  FaDatabase, 
  FaShieldAlt, 
  FaCodeBranch 
} from 'react-icons/fa';
import { useMagnetic } from '../../utils/useMagnetic';

interface Mission {
  id: number;
  nodeCode: string;
  role: string;
  company: string;
  period: string;
  description: string;
  categoryDetails: {
    features: string[];
    contributions: string[];
    apis: string[];
    architecture: string[];
  };
  tech: string[];
  type: "work" | "education";
  status: "ONLINE" | "STANDBY" | "COMPLETED";
  ping: number;
  metrics: { label: string; value: string }[];
  flow: {
    name: string;
    icon: any;
    desc: string;
  }[];
}

const missions: Mission[] = [
  {
    id: 1,
    nodeCode: "NODE-01 // PRODUCTION // VVENDU",
    role: "Software Developer",
    company: "Vvendu Project Stack",
    period: "Nov 2025 - Present",
    status: "ONLINE",
    ping: 42,
    type: "work",
    description: "Architected enterprise full-stack auction features, hierarchical dealer registrations, and secure communication APIs.",
    categoryDetails: {
      features: [
        "Designed and deployed granular 8-step dealer and lender registration systems.",
        "Implemented real-time data sync with Zone and Region dropdown bindings."
      ],
      contributions: [
        "Aligned mobile Lender registration with the web application's hierarchical schema.",
        "Optimized form state management reducing re-render latency by 40%."
      ],
      apis: [
        "Integrated master lender selection endpoint GET /api/zoneRegion/zones-and-regions.",
        "Created custom hook-based auth client interceptors for token renewals."
      ],
      architecture: [
        "Resolved Lombok compiler issues by refactoring models to standard Java beans.",
        "Engineered client-to-server request/response body parsing with AES-CBC encryption."
      ]
    },
    tech: ["React", "Spring Boot", "MySQL", "REST APIs", "React Native", "JWT Auth", "AES-CBC"],
    metrics: [
      { label: "Pipeline Steps", value: "8 Steps" },
      { label: "Build Integrity", value: "Lombok Fixed" },
      { label: "Security", value: "AES-CBC" }
    ],
    flow: [
      { name: "React Client", icon: FaServer, desc: "Renders UI & maps multi-step inputs" },
      { name: "AES-CBC Parser", icon: FaShieldAlt, desc: "Encrypts request payload bodies" },
      { name: "Spring Controller", icon: FaNetworkWired, desc: "Handles REST route mapping & JWT validation" },
      { name: "MySQL DB Link", icon: FaDatabase, desc: "Binds queries to JDBC data layers" }
    ]
  },
  {
    id: 2,
    nodeCode: "NODE-02 // FULLSTACK // TAP_ACADEMY",
    role: "Java Full Stack Developer Trainee",
    company: "Tap Academy",
    period: "May 2025 - Oct 2025",
    status: "STANDBY",
    ping: 98,
    type: "work",
    description: "Underwent intensive Java Full Stack development training covering frontend frameworks, relational databases, OOP principles, and MVC architectures.",
    categoryDetails: {
      features: [
        "Built responsive user interfaces utilizing React, HTML5, CSS3, and JavaScript.",
        "Designed and structured relational database schemas using MySQL."
      ],
      contributions: [
        "Implemented robust MVC application logic mappings using Spring Boot.",
        "Configured component state validations and clean lifecycle interfaces."
      ],
      apis: [
        "Integrated RESTful controller endpoints using Spring Web modules.",
        "Coded standard CRUD action bindings handling secure form payloads."
      ],
      architecture: [
        "Structured data model layouts using standard Java POJO representations.",
        "Configured JDBC persistence layers and DAO design patterns for clean database operations."
      ]
    },
    tech: ["Java", "Spring Boot", "React", "MySQL", "JDBC", "REST APIs", "HTML5/CSS3", "JavaScript"],
    metrics: [
      { label: "Data Pattern", value: "DAO / POJO" },
      { label: "Database Layer", value: "JDBC / MySQL" },
      { label: "Architecture", value: "Spring MVC" }
    ],
    flow: [
      { name: "React Frontend", icon: FaServer, desc: "Renders UI & maps form inputs" },
      { name: "Spring Controller", icon: FaNetworkWired, desc: "Handles REST routing & JWT validation" },
      { name: "DAO / POJO Layer", icon: FaServer, desc: "Parses objects into clean database interfaces" },
      { name: "MySQL DB Link", icon: FaDatabase, desc: "Binds queries to JDBC data layers" }
    ]
  },
  {
    id: 3,
    nodeCode: "NODE-03 // ACADEMIC // ECE",
    role: "B.E. in Electronics & Communication",
    company: "St. Joseph's College of Engineering & Technology",
    period: "2021 - 2025",
    status: "COMPLETED",
    ping: 0,
    type: "education",
    description: "Maintained a CGPA of 7.7 / 10 while acquiring core concepts in electronics engineering, microcontrollers, and wireless sensor telemetry.",
    categoryDetails: {
      features: [
        "Studied Advanced Sensor Networks, Industrial IoT configurations, and digital electronics logic.",
        "Programmed 8051 and PIC microcontrollers for hardware automation modules."
      ],
      contributions: [
        "Built secure smart lock hardware systems with remote TAMPER alerts and sensing arrays.",
        "Drafted serial communication channels (UART/SPI) to capture analog sensor telemetry."
      ],
      apis: [
        "Wrote ESP8266 Wi-Fi integration scripts to upload sensor statistics to database feeds.",
        "Configured local microcontroller buffers to trigger active alarms."
      ],
      architecture: [
        "Designed modular embedded firmware architectures minimizing RAM overhead.",
        "Implemented asynchronous logging queues to manage sensor events under power constraints."
      ]
    },
    tech: ["Industrial IoT", "Microcontrollers", "Sensors", "Digital Electronics", "Embedded C", "Wireless Networks"],
    metrics: [
      { label: "Focus", value: "Electronics / IoT" },
      { label: "Hardware", value: "Microcontrollers" },
      { label: "Telemetry", value: "UART / SPI" }
    ],
    flow: [
      { name: "TAMPER Sensor", icon: FaShieldAlt, desc: "Detects physical disturbance or voltage drops" },
      { name: "MCU Firmware", icon: FaServer, desc: "Processes raw analog sensor voltage ranges" },
      { name: "ESP8266 Link", icon: FaNetworkWired, desc: "Streams serial telemetry queues over Wi-Fi" },
      { name: "Data Repository", icon: FaDatabase, desc: "Logs state history for academic analysis" }
    ]
  }
];

const bootLogsTemplate = [
  "INITIALIZING TELEMETRY HANDSHAKE...",
  "VERIFYING SESSION CRYPTO AUTH...",
  "ESTABLISHING SECURE SSH PIPELINE...",
  "SYNCING MISSION CONTRIBUTIONS MATRIX...",
  "SYSTEM STATUS: ONLINE"
];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 25,
    stiffness: 80,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} className="text-3xl md:text-4xl font-bold font-display text-white">0</span>;
}

interface MissionNodeButtonProps {
  mission: Mission;
  isActive: boolean;
  onClick: () => void;
}

function MissionNodeButton({ mission, isActive, onClick }: MissionNodeButtonProps) {
  const ref = useMagnetic<HTMLButtonElement>();
  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative flex items-start gap-4 glow-card ${
        isActive 
          ? 'bg-gradient-to-r from-accent-indigo/10 to-accent-fuchsia/10 border-accent-indigo/30 text-white shadow-[0_0_20px_rgba(99,102,241,0.05)]' 
          : 'bg-white/[0.01] border-white/5 text-secondary hover:border-white/20 hover:text-white'
      }`}
    >
      {/* Status Ping LED */}
      <div className="absolute top-4 right-4 flex items-center space-x-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${
          mission.status === "ONLINE" ? "bg-green-400 animate-pulse" :
          mission.status === "STANDBY" ? "bg-yellow-400" : "bg-accent-blue"
        }`} />
        <span className="text-[8px] font-mono text-secondary/30">{mission.status}</span>
      </div>

      {/* Node Category Icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
        isActive 
          ? 'bg-[#0f0f18] border-accent-indigo/60 text-accent-indigo' 
          : 'bg-white/5 border-white/5 text-secondary'
      }`}>
        {mission.type === "education" ? <FaGraduationCap size={16} /> : <FaBriefcase size={14} />}
      </div>
      
      <div>
        <span className="text-[9px] font-mono text-accent-blue/70 block mb-0.5">{mission.nodeCode.split(" // ")[0]}</span>
        <span className="text-sm font-bold font-display block truncate max-w-[180px]">{mission.company}</span>
        <span className="text-[10px] font-mono text-secondary/50 block mt-1">{mission.period}</span>
      </div>
    </motion.button>
  );
}


export default function Experience() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"features" | "contributions" | "apis" | "architecture">("features");
  const [selectedFlowIdx, setSelectedFlowIdx] = useState<number | null>(null);

  const activeMission = missions[activeIdx];

  // Trigger boot sequence when selecting a tab
  useEffect(() => {
    setIsBooting(true);
    setBootLogs([]);
    setSelectedFlowIdx(null);
    
    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < bootLogsTemplate.length) {
        setBootLogs((prev) => [...prev, `[OK] ${bootLogsTemplate[currentLogIndex]}`]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setIsBooting(false);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [activeIdx]);

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-black/40">
      {/* Background neon radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-accent-indigo/5 blur-[120px] pointer-events-none -z-10 animate-glow-pulse" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="mb-16 md:text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-gradient">Deployment History</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-fuchsia mb-8 md:mx-auto"></div>
            <p className="text-secondary max-w-2xl mx-auto">
              Real-world systems telemetry detailing features, security optimizations, and deployment flows.
            </p>
          </motion.div>
        </div>

        {/* Dynamic System Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-12">
          {[
            { label: "Active Deployments", value: 3, suffix: "" },
            { label: "APIs Integrated", value: 15, suffix: "+" },
            { label: "System Modules", value: 8, suffix: "" },
            { label: "Secure Protocols", value: 5, suffix: "+" },
          ].map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={stat.label}
              className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-accent-indigo/20 transition-all duration-300"
            >
              {/* Corner tech indicators */}
              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-accent-blue/40 rounded-bl-lg" />
              <span className="text-[10px] font-mono text-secondary/40 uppercase tracking-widest mb-1.5">{stat.label}</span>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </motion.div>
          ))}
        </div>

        {/* Mission Timeline Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Left panel: Timeline node selection (Cols 4) */}
          <div className="lg:col-span-4 flex flex-col justify-start relative pr-0 lg:pr-4">
            <div className="space-y-4 relative z-10">
              <span className="text-[10px] uppercase font-mono tracking-widest text-secondary/40 px-2 block mb-2">Telemetry Nodes</span>
              
              {missions.map((m, idx) => (
                <MissionNodeButton
                  key={m.id}
                  mission={m}
                  isActive={activeIdx === idx}
                  onClick={() => setActiveIdx(idx)}
                />
              ))}
            </div>
          </div>

          {/* Right panel: Active terminal mission logs & Architecture (Cols 8) */}
          <div className="lg:col-span-8 rounded-3xl bg-[#030303]/40 border border-white/5 flex flex-col justify-between overflow-hidden relative shadow-2xl backdrop-blur-md">
            
            {/* Header window control bar */}
            <div className="px-6 py-4 bg-[#050508] border-b border-white/5 flex items-center justify-between select-none">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-wider">
                <FaTerminal className="text-accent-indigo animate-pulse" />
                <span className="text-secondary/40">node_telemetry_handler.sh</span>
              </div>
              <div className="flex items-center space-x-3 text-secondary/30 font-mono text-[9px]">
                {activeMission.ping > 0 && (
                  <span>LATENCY: {activeMission.ping}ms</span>
                )}
                <span>PID: {3490 + activeIdx}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-fuchsia" />
              </div>
            </div>

            {/* Inner Dashboard */}
            <div 
              data-lenis-prevent
              className="p-6 md:p-8 flex-grow min-h-[460px] max-h-[560px] overflow-y-auto scrollbar-thin"
            >
              <AnimatePresence mode="wait">
                {isBooting ? (
                  <motion.div
                    key="booting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-xs text-[#a5b4fc]/70 space-y-2 leading-relaxed h-full flex flex-col justify-center"
                  >
                    {bootLogs.map((log, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <FaPlay className="text-[6px] text-accent-indigo shrink-0" />
                        <span>{log}</span>
                      </div>
                    ))}
                    <div className="w-4 h-4 border-2 border-accent-indigo border-t-transparent rounded-full animate-spin mt-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="logs-loaded"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Header info */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4 gap-3">
                      <div>
                        <h3 className="text-2xl font-bold font-display text-white">{activeMission.role}</h3>
                        <span className="text-sm font-semibold text-accent-indigo mt-0.5 block">{activeMission.company}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-secondary/50 font-mono text-xs shrink-0 self-start sm:self-auto bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                        <FaCalendarAlt size={12} />
                        <span>{activeMission.period}</span>
                      </div>
                    </div>

                    {/* Overview description */}
                    <p className="text-secondary/70 text-sm md:text-base leading-relaxed">
                      {activeMission.description}
                    </p>

                    {/* Interactive Architecture Map */}
                    <div className="border border-white/5 bg-[#050508] rounded-2xl p-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-accent-indigo block mb-4">
                        Data Pipeline & Architecture Flow
                      </span>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                        {/* Connecting Line background decoration */}
                        <div className="absolute top-[22px] left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-fuchsia hidden md:block opacity-30" />

                        {activeMission.flow.map((node, i) => {
                          const NodeIcon = node.icon;
                          const isSelected = selectedFlowIdx === i;
                          return (
                            <div 
                              key={node.name}
                              className="flex flex-col items-center text-center cursor-pointer group"
                              onClick={() => setSelectedFlowIdx(isSelected ? null : i)}
                            >
                              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border relative z-10 transition-all duration-300 ${
                                isSelected 
                                  ? 'bg-[#0f0f18] border-accent-indigo text-accent-indigo shadow-[0_0_15px_rgba(99,102,241,0.3)] scale-110' 
                                  : 'bg-[#08080c] border-white/5 text-secondary group-hover:border-white/20 group-hover:text-white'
                              }`}>
                                <NodeIcon size={16} />
                                {/* Pulsing particle link indicator */}
                                {isSelected && (
                                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent-fuchsia animate-ping" />
                                )}
                              </div>
                              <span className="text-[11px] font-bold mt-2 font-display text-white/80">{node.name}</span>
                              <span className="text-[9px] font-mono text-secondary/40 mt-0.5">STEP 0{i + 1}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Selected Node Description panel */}
                      <AnimatePresence mode="wait">
                        {selectedFlowIdx !== null && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 p-3 bg-white/[0.02] border border-white/5 rounded-xl font-mono text-xs text-secondary/80 flex items-start space-x-3"
                          >
                            <FaCodeBranch className="text-accent-fuchsia shrink-0 mt-0.5" />
                            <div>
                              <span className="text-white font-bold block mb-1">
                                {activeMission.flow[selectedFlowIdx].name} Spec:
                              </span>
                              {activeMission.flow[selectedFlowIdx].desc}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Interactive Tabbed Detail Categories */}
                    <div className="space-y-4">
                      {/* Tabs */}
                      <div className="flex border-b border-white/5 overflow-x-auto scrollbar-none gap-2">
                        {([
                          { key: "features", label: "Features" },
                          { key: "contributions", label: "Contributions" },
                          { key: "apis", label: "APIs Integrated" },
                          { key: "architecture", label: "Architecture" }
                        ] as const).map((tab) => (
                          <button
                            key={tab.key}
                            onClick={() => setActiveCategory(tab.key)}
                            className={`pb-2.5 px-2 text-xs font-mono uppercase tracking-wider border-b-2 transition-all shrink-0 ${
                              activeCategory === tab.key 
                                ? 'border-accent-indigo text-white font-bold' 
                                : 'border-transparent text-secondary/40 hover:text-secondary'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      {/* Tab Content */}
                      <motion.ul 
                        key={activeCategory}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-3"
                      >
                        {activeMission.categoryDetails[activeCategory].map((det, i) => (
                          <motion.li 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            key={i} 
                            className="flex items-start text-xs sm:text-sm text-secondary/80 leading-relaxed"
                          >
                            <FaChevronRight className="text-accent-fuchsia text-[9px] mt-1.5 mr-3 shrink-0" />
                            <span>{det}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer stack bar */}
            <div className="px-6 py-4 bg-[#050508] border-t border-white/5 flex flex-wrap gap-2 items-center select-none">
              <span className="text-[9px] font-mono text-secondary/35 uppercase mr-2">Telemetry Environment:</span>
              {activeMission.tech.map((t) => (
                <span key={t} className="text-[9px] font-mono text-white/50 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
