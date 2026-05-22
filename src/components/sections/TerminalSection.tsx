import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FaTerminal } from 'react-icons/fa';

interface HistoryItem {
  command: string;
  output: string;
}

export default function TerminalSection() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: "Initializing secure terminal connection...\nWelcome to R.J. Hariharan Core Shell v1.0.0\nType 'help' to see all available command options.\n--------------------------------------------------"
    }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when command list expands
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output = "";

    switch (cmd) {
      case "help":
        output = `Available CLI Commands:
  about    - Displays full developer biography
  skills   - Lists technical stacks by categories
  projects - Displays active application specs
  contact  - Outputs secure email, phone & social coordinates
  clear    - Resets command line output log buffer`;
        break;

      case "about":
        output = `R.J. Hariharan - Full Stack Software Developer
--------------------------------------------------
Experience : 6+ Months Professional Full-Stack Experience
Key Projects: Refactored enterprise Vvendu Auction modules, Java model structures,
             and configured encrypted mobile-to-API communication flows.
Core Focus : Web APIs, encrypted requests/responses, and microservices.`;
        break;

      case "skills":
        output = `Technical Arsenal Summary:
--------------------------------------------------
[Frontend] : React, JavaScript, TypeScript, Tailwind CSS
[Backend]  : Java, Spring Boot, REST APIs, JWT Auth, Node.js
[Database] : MySQL, Firebase
[Mobile]   : React Native
[Tools]    : Git & GitHub, Sensors, Automation`;
        break;

      case "projects":
        output = `Featured Project Catalog:
--------------------------------------------------
1. Vvendu Auction Platform (React, Spring Boot, MySQL | Live: vvendu.com)
2. Personal Brand Portfolio (React, Tailwind, Lenis, GSAP | Source: /portfolio)
3. IoT Smart Lock System (Java, TAMPER Sensors, Microcontrollers)
4. Foodyguy Order Platform (Java POJO, DAO pattern, JDBC, MySQL)`;
        break;

      case "contact":
        output = `Contact Information:
--------------------------------------------------
Email    : rjhariharan1@gmail.com
Phone    : +91 9342305427
Location : Mayiladuthurai, Tamil Nadu, India
GitHub   : https://github.com/rjhariharan
LinkedIn : https://in.linkedin.com/in/rjhariharan
Instagram: https://www.instagram.com/rjhariharan_`;
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        output = `Command not found: "${cmd}". Type "help" to display options.`;
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput("");
  };

  return (
    <section id="terminal" className="py-24 relative overflow-hidden section-alt-2">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Header */}
        <div className="mb-16 md:text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Command Terminal</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-fuchsia mb-8 md:mx-auto"></div>
            <p className="text-secondary max-w-2xl mx-auto">
              Run interactive commands directly from your keyboard to fetch profile details or technical configurations.
            </p>
          </motion.div>
        </div>

        {/* Terminal Shell Window */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onClick={focusInput}
          className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-[#050508] shadow-2xl overflow-hidden cursor-text"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0f] border-b border-white/5 select-none">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex items-center space-x-1.5 text-secondary/40 font-mono text-[10px] sm:text-xs">
              <FaTerminal />
              <span>rjhariharan@portfolio: ~</span>
            </div>
            <div className="w-14" /> {/* Spacer */}
          </div>

          {/* Terminal Logs Output */}
          <div 
            ref={terminalContainerRef}
            data-lenis-prevent
            className="p-6 font-mono text-xs sm:text-sm text-secondary/95 min-h-[300px] max-h-[400px] overflow-y-auto space-y-4 scrollbar-thin"
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                {item.command !== "welcome" && (
                  <div className="flex items-center space-x-2 text-white">
                    <span className="text-accent-blue font-bold">rjhariharan@portfolio:~$</span>
                    <span>{item.command}</span>
                  </div>
                )}
                <pre className="text-secondary/70 whitespace-pre-wrap leading-relaxed">{item.output}</pre>
              </div>
            ))}
            
            {/* Input Line */}
            <form onSubmit={handleCommand} className="flex items-center space-x-2 pt-1">
              <span className="text-accent-blue font-bold shrink-0">rjhariharan@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow bg-transparent text-white outline-none border-none caret-accent-indigo"
                placeholder="type command here..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
