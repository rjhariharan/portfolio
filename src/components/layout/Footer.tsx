import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/rjhariharan", label: "GitHub" },
    { icon: FaLinkedin, href: "https://in.linkedin.com/in/rjhariharan", label: "LinkedIn" },
    { icon: FaInstagram, href: "https://www.instagram.com/rjhariharan_", label: "Instagram" }
  ];

  return (
    <footer className="relative bg-background overflow-hidden pt-16 pb-12 border-t border-primary/[0.05] dark:border-white/[0.04]">
      {/* Separation gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <p className="text-lg font-bold font-display text-primary">R.J. Hariharan</p>
          <p className="text-xs text-secondary/65 mt-1 font-mono uppercase tracking-wider">
            Full-Stack Software Engineer
          </p>
        </div>

        {/* Mid Copyright */}
        <div className="text-center">
          <p className="text-xs text-secondary/50 font-mono">
            &copy; {currentYear} R.J. Hariharan. Built with React & Framer Motion.
          </p>
        </div>

        {/* Social Buttons */}
        <div className="flex space-x-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a 
                key={social.label}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-primary/5 dark:bg-white/5 border border-primary/5 dark:border-white/5 flex items-center justify-center text-secondary hover:text-accent-blue hover:bg-primary/10 dark:hover:bg-white/10 hover:border-accent-blue/30 transition-colors duration-300"
              >
                <Icon size={18} />
              </motion.a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
