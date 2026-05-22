import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaCertificate, FaCode, FaMicrochip } from 'react-icons/fa';

interface Certification {
  title: string;
  provider: string;
  icon: any;
  color: string;
  glowColor: string;
  description: string;
  associatedSkills: string[];
  credentialId: string;
}

const certifications: Certification[] = [
  {
    title: "Web Development Fundamentals",
    provider: "Complete Web Development Bootcamp",
    icon: FaCode,
    color: "from-[#3b82f6] to-[#6366f1]",
    glowColor: "rgba(99, 102, 241, 0.4)",
    description: "Deep dive into frontend development architectures, modern frameworks, state management, and responsive layouts.",
    associatedSkills: ["React", "JavaScript", "TypeScript", "Tailwind CSS"],
    credentialId: "WD-BOOTCAMP-2024-854"
  },
  {
    title: "IoT Specialization",
    provider: "Advanced Sensor Networks & Integration",
    icon: FaMicrochip,
    color: "from-[#6366f1] to-[#d946ef]",
    glowColor: "rgba(217, 70, 239, 0.4)",
    description: "Architected secure app-controlled automation hardware integrations, sensor messaging protocols, and data processing workflows.",
    associatedSkills: ["Java", "Microcontrollers", "Sensors", "Firebase"],
    credentialId: "IoT-ASN-SEC-9243"
  }
];

function HolographicCard({ cert }: { cert: Certification }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Calculate mouse position inside card to draw holographic glare
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["30%", "70%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["30%", "70%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const IconComponent = cert.icon;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative p-8 rounded-3xl bg-[#050508]/40 border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden cursor-crosshair h-full flex flex-col justify-between"
    >
      {/* Glare effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.4) 0%, transparent 60%)`
        }}
      />

      {/* Holographic background spotlight */}
      <div 
        className={`absolute -right-20 -top-20 w-44 h-44 rounded-full bg-gradient-to-br ${cert.color} opacity-5 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} 
      />

      {/* Laser Scanning Line Sweep */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-indigo to-transparent opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-[1.8s] ease-linear pointer-events-none" />

      <div style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}>
        {/* Top Row with Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cert.color} p-[1px] flex items-center justify-center mb-6`}
             style={{ boxShadow: `0 0 15px ${cert.glowColor}` }}
        >
          <div className="w-full h-full bg-primary/[0.04] dark:bg-[#08080c] rounded-2xl flex items-center justify-center text-primary group-hover:text-accent-indigo transition-colors duration-300">
            <IconComponent size={24} />
          </div>
        </div>

        {/* Title & Info */}
        <h3 className="text-2xl font-bold mb-2 text-primary group-hover:text-accent-blue transition-colors duration-300 font-display">
          {cert.title}
        </h3>
        <p className="text-xs font-semibold text-accent-indigo mb-4 uppercase tracking-wider font-mono">
          {cert.provider}
        </p>
        <p className="text-secondary/70 leading-relaxed text-sm mb-6">
          {cert.description}
        </p>

        {/* Associated Skills */}
        <div className="space-y-2 mb-6">
          <span className="text-[10px] uppercase font-mono tracking-widest text-secondary/40 block">Skill Binds</span>
          <div className="flex flex-wrap gap-1.5">
            {cert.associatedSkills.map((sk) => (
              <span key={sk} className="tag-pill text-[9px] font-mono px-2 py-0.5 rounded-full">
                {sk}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom status verified tag */}
      <div 
        style={{ transform: "translateZ(10px)" }}
        className="flex items-center justify-between border-t border-white/5 pt-4 mt-4"
      >
        <div className="flex items-center space-x-2 text-[10px] font-mono text-secondary/40">
          <FaCertificate className="text-accent-fuchsia animate-pulse" />
          <span>VERIFIED SYSTEM KEY</span>
        </div>
        <span className="text-[9px] font-mono text-secondary/35 uppercase select-none">{cert.credentialId}</span>
      </div>

    </motion.div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden section-alt-2">
      {/* Decorative Blob */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-accent-indigo/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="mb-16 md:text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Credentials Vault</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-fuchsia mb-8 md:mx-auto"></div>
            <p className="text-secondary max-w-2xl mx-auto">
              Holographic certificates validating engineering proficiency, system logic, and microcontrollers architectures.
            </p>
          </motion.div>
        </div>

        {/* Grid Vault */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certifications.map((cert) => (
            <div key={cert.title} className="h-full">
              <HolographicCard cert={cert} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
