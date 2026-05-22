import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTerminal, FaMicrochip, FaPaperPlane, FaPlay, FaRedo, FaSpinner, FaChevronRight, FaTimes } from 'react-icons/fa';
import { askAI } from '../../services/askAI';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export default function AskAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'scan'>('chat');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Greetings, recruiter. R.J. AI assistant online. Ask me about R.J.'s engineering projects, skills, or run a diagnostic system scan.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  
  // System Scan State
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'complete'>('idle');
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [skillsMetrics, setSkillsMetrics] = useState({
    frontend: 0,
    backend: 0,
    architecture: 0,
    hardware: 0
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<any>(null);

  // Clear typing interval on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  // Listen to custom project trigger events
  useEffect(() => {
    const handleAskAIEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      const prompt = customEvent.detail.prompt;
      
      // Auto-open drawer & focus chat tab
      setIsOpen(true);
      setActiveTab('chat');

      // Execute search
      handleSearch(prompt);
    };

    window.addEventListener('ask-rj-ai', handleAskAIEvent);
    return () => window.removeEventListener('ask-rj-ai', handleAskAIEvent);
  }, [messages]); // Keep message log scope updated for the listener closure

  // Auto Scroll Chat only on new messages or when starting search/typing
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages, isTyping, isOpen, activeTab]);

  // Auto Scroll Diagnostic Logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [scanLogs]);

  // Run Diagnostic System Scan (cinematic, 5 seconds)
  const runDiagnostic = () => {
    if (scanState === 'scanning') return;
    
    setScanState('scanning');
    setScanProgress(0);
    setScanLogs([]);
    setSkillsMetrics({ frontend: 0, backend: 0, architecture: 0, hardware: 0 });

    const logStages = [
      { progress: 10, log: "[BOOT] Initializing R.J. AI diagnostic engine..." },
      { progress: 25, log: "[API] Checking serverless endpoints & functions routing..." },
      { progress: 40, log: "[SYSTEM] Loading project details for Vvendu & Smart Lock..." },
      { progress: 55, log: "[PERF] Verifying React bundle sizes and Lenis frame rates..." },
      { progress: 70, log: "[DEPLOY] Querying Netlify production environment maps..." },
      { progress: 85, log: "[SYSTEM] Bundling telemetry profiles..." },
      { progress: 100, log: "[SYSTEM] STATUS: PRODUCTION READY. All systems nominal." }
    ];

    let currentProgress = 0;
    const intervalTime = 50; // 5 seconds total
    
    const timer = setInterval(() => {
      currentProgress += 1;
      setScanProgress(currentProgress);

      const matchingStage = logStages.find(s => s.progress === currentProgress);
      if (matchingStage) {
        setScanLogs(prev => [...prev, matchingStage.log]);
      }

      setSkillsMetrics({
        frontend: Math.min(Math.round(currentProgress * 0.96), 96),
        backend: Math.min(Math.round(currentProgress * 0.92), 92),
        architecture: Math.min(Math.round(currentProgress * 0.88), 88),
        hardware: Math.min(Math.round(currentProgress * 0.85), 85)
      });

      if (currentProgress >= 100) {
        clearInterval(timer);
        setScanState('complete');
        
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: `System diagnostic complete.\nSTATUS: PRODUCTION READY\n\nTelemetry Metrics Loaded:\n• Frontend Engineering: 96%\n• Backend Development: 92%\n• System Architecture: 88%\n• IoT & Telemetry: 85%\n\nReal Gemini API serverless function: ONLINE. Ready for query.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    }, intervalTime);
  };

  const handleSearch = async (promptText: string) => {
    if (!promptText.trim() || isTyping) return;

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    const userMsg: Message = {
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsTyping(true);
    setTypingText('');

    try {
      const historyPayload = messages.map(m => ({
        sender: m.sender,
        text: m.text
      }));

      // Call the serverless function endpoint via askAI service
      const aiReply = await askAI(promptText, historyPayload);

      // Trigger typewriter slice rendering
      let currentCount = 0;
      typingIntervalRef.current = setInterval(() => {
        currentCount++;
        setTypingText(aiReply.slice(0, currentCount));
        if (currentCount >= aiReply.length) {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          setIsTyping(false);
          setMessages(prev => [
            ...prev,
            {
              sender: 'ai',
              text: aiReply,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
          setTypingText('');
        }
      }, 12);

    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: "System communication node error. Failed to retrieve real-time response. Please check your network connection.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const suggestions = [
    { label: "Explain VVendu architecture", query: "Explain the system architecture of the Vvendu Auction project." },
    { label: "Explain React skills", query: "What frontend skills and React libraries did you use in the portfolio?" },
    { label: "Explain Spring Boot experience", query: "Tell me about your Java and Spring Boot backend trainee experience." },
    { label: "Explain IoT projects", query: "Describe the hardware sensors and microcontrollers used in the Smart Lock system." },
    { label: "Explain mobile app plans", query: "What are your future plans for migrating Vvendu into a mobile app?" },
    { label: "Explain deployment workflow", query: "How is the portfolio configured for dual deployments on Netlify and GitHub Pages?" }
  ];

  return (
    <>
      {/* Floating Action Support Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-fuchsia text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 relative group"
          aria-label="Ask R.J. AI Support Drawer"
        >
          <FaRobot className="text-xl" />
          <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-[#050508]/90 border border-white/10 text-[10px] font-mono tracking-wider text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
            Ask R.J. AI
          </span>
          {/* Pulsing ring indicator */}
          <span className="absolute inset-0 rounded-full border border-accent-blue/30 animate-pulse animate-duration-3000" />
        </button>
      </div>

      {/* Slide-out Sidebar Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click handler */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-in Sidebar Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              data-lenis-prevent
              className="fixed top-0 right-0 h-screen w-full sm:w-[500px] z-50 bg-[#050508]/95 backdrop-blur-2xl border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-between"
            >
              
              {/* Drawer HUD Header */}
              <div className="px-6 py-5 border-b border-white/5 bg-black/40 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 font-mono text-[10px] tracking-wider mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-ping" />
                    <span className="text-white font-bold uppercase">R.J. AI System Console</span>
                  </div>
                  <span className="text-[9px] font-mono text-secondary/40 block">LOCAL_KNOWLEDGE_ENGINE_ACTIVE</span>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-secondary hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Close Drawer"
                >
                  <FaTimes size={12} />
                </button>
              </div>

              {/* Console Tabs */}
              <div className="px-6 py-3 border-b border-white/5 bg-black/20 flex space-x-2">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 py-2 text-[10px] font-mono font-bold uppercase rounded-lg border transition-all ${
                    activeTab === 'chat'
                      ? 'bg-accent-indigo/10 border-accent-indigo/30 text-white shadow-sm'
                      : 'bg-white/[0.01] border-transparent text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  Chat Console
                </button>
                <button
                  onClick={() => setActiveTab('scan')}
                  className={`flex-1 py-2 text-[10px] font-mono font-bold uppercase rounded-lg border transition-all ${
                    activeTab === 'scan'
                      ? 'bg-accent-indigo/10 border-accent-indigo/30 text-white shadow-sm'
                      : 'bg-white/[0.01] border-transparent text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  System Scan
                </button>
              </div>

              {/* Console Content Area */}
              <div className="flex-grow overflow-hidden flex flex-col justify-between">
                
                {/* Active Tab Screen */}
                <div className="flex-grow overflow-y-auto p-6 min-h-[300px]">
                  
                  {activeTab === 'chat' ? (
                    /* Chat Tab Messages list */
                    <div className="space-y-4">
                      {messages.map((msg, index) => (
                        <div 
                          key={index}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[90%] rounded-2xl p-4 text-xs leading-relaxed font-mono ${
                              msg.sender === 'user' 
                                ? 'bg-accent-indigo/15 border border-accent-indigo/20 text-white rounded-br-none shadow-[0_4px_12px_rgba(99,102,241,0.05)]' 
                                : 'bg-white/[0.02] border border-white/5 text-secondary rounded-bl-none'
                            }`}
                          >
                            <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed select-text">{msg.text}</pre>
                            <span className="text-[9px] text-secondary/30 block mt-2 text-right">{msg.timestamp}</span>
                          </div>
                        </div>
                      ))}

                      {/* Streaming Typewriter Element */}
                      {isTyping && typingText && (
                        <div className="flex justify-start">
                          <div className="max-w-[90%] rounded-2xl p-4 text-xs leading-relaxed font-mono bg-white/[0.02] border border-white/5 text-secondary rounded-bl-none">
                            <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed typing-cursor select-text">{typingText}</pre>
                          </div>
                        </div>
                      )}

                      {/* Initial Search Loading state */}
                      {isTyping && !typingText && (
                        <div className="flex justify-start">
                          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center space-x-2 text-secondary/50 font-mono text-xs">
                            <FaSpinner className="animate-spin text-accent-indigo" />
                            <span>Accessing R.J. Knowledge Nodes...</span>
                          </div>
                        </div>
                      )}

                      <div ref={chatEndRef} />
                    </div>
                  ) : (
                    /* Scan Tab HUD Diagnostics & System Scan */
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="flex items-center space-x-2">
                          <FaMicrochip className="text-accent-indigo animate-pulse-slow text-lg" />
                          <span className="text-xs uppercase font-mono tracking-widest text-white/90">Diagnostic Panel</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <span className={`w-2 h-2 rounded-full ${scanState === 'scanning' ? 'bg-yellow-500 animate-ping' : scanState === 'complete' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-accent-blue shadow-[0_0_8px_#3b82f6]'}`} />
                          <span className="text-[10px] font-mono text-secondary uppercase tracking-wider">
                            {scanState === 'scanning' ? 'Scanning...' : scanState === 'complete' ? 'Production Ready' : 'Online'}
                          </span>
                        </div>
                      </div>

                      {/* Skill telemetry bars */}
                      <div className="space-y-4 font-mono text-xs">
                        <div>
                          <div className="flex justify-between mb-1.5">
                            <span className="text-secondary/70">Frontend Engineering</span>
                            <span className="text-white/90 font-bold">{skillsMetrics.frontend}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-accent-blue transition-all" style={{ width: `${skillsMetrics.frontend}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1.5">
                            <span className="text-secondary/70">Backend Development</span>
                            <span className="text-white/90 font-bold">{skillsMetrics.backend}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-accent-indigo transition-all" style={{ width: `${skillsMetrics.backend}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1.5">
                            <span className="text-secondary/70">System Architecture</span>
                            <span className="text-white/90 font-bold">{skillsMetrics.architecture}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-accent-fuchsia transition-all" style={{ width: `${skillsMetrics.architecture}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1.5">
                            <span className="text-secondary/70">IoT & Telemetry</span>
                            <span className="text-white/90 font-bold">{skillsMetrics.hardware}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-white/30 transition-all" style={{ width: `${skillsMetrics.hardware}%` }} />
                          </div>
                        </div>
                      </div>

                      {/* Diagnostics terminal logs */}
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-secondary/40 block mb-2">Diagnostic Logs</span>
                        <div 
                          ref={logContainerRef}
                          className="h-36 rounded-xl bg-black/40 border border-white/5 p-4 font-mono text-[10px] text-secondary/70 overflow-y-auto space-y-1.5 leading-relaxed"
                        >
                          {scanLogs.length === 0 ? (
                            <div className="text-secondary/30 italic text-center pt-8">Diagnostic idle. Run scan to stream telemetry logs.</div>
                          ) : (
                            scanLogs.map((log, index) => (
                              <div key={index} className={log.includes('PRODUCTION READY') || log.includes('nominal') ? 'text-green-400 font-bold animate-pulse' : ''}>
                                {log}
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Run Scan Button */}
                      <div className="border-t border-white/5 pt-4 flex justify-center">
                        <button
                          onClick={runDiagnostic}
                          disabled={scanState === 'scanning'}
                          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider border transition-all ${
                            scanState === 'scanning'
                              ? 'border-yellow-500/30 bg-yellow-500/5 text-yellow-500 cursor-not-allowed'
                              : 'border-accent-blue/30 bg-accent-blue/5 hover:bg-accent-blue/15 text-accent-blue shadow-lg'
                          }`}
                        >
                          {scanState === 'scanning' ? (
                            <>
                              <FaSpinner className="animate-spin text-sm" />
                              <span>Scanning ({scanProgress}%)</span>
                            </>
                          ) : (
                            <>
                              {scanState === 'complete' ? <FaRedo className="text-sm" /> : <FaPlay className="text-sm" />}
                              <span>{scanState === 'complete' ? 'Re-Run System Scan' : 'Run System Scan'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* Footer Input Area (Only visible/relevant for Chat Tab) */}
                {activeTab === 'chat' && (
                  <div className="p-6 border-t border-white/5 bg-[#050508]/60">
                    
                    {/* Suggestion Chips */}
                    <div className="mb-4">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-secondary/40 block mb-2">Suggested Prompt Nodes</span>
                      <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 max-h-[85px] scrollbar-thin">
                        {suggestions.map((s, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSearch(s.query)}
                            disabled={isTyping}
                            className="text-[9px] font-mono text-secondary hover:text-white bg-white/5 hover:bg-accent-indigo/15 border border-white/5 hover:border-accent-indigo/25 px-2 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 shrink-0"
                          >
                            <span>{s.label}</span>
                            <FaChevronRight size={6} className="text-secondary/40 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Input Form */}
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch(query);
                      }}
                      className="flex items-center space-x-3 bg-black/40 border border-white/5 rounded-2xl p-1.5 pl-4 hover:border-white/10 transition-colors"
                    >
                      <FaTerminal className="text-secondary/40 shrink-0 text-xs" />
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask about projects, skills, or experience..."
                        disabled={isTyping}
                        className="bg-transparent border-0 outline-none focus:ring-0 text-xs font-mono text-white placeholder-secondary/30 flex-grow py-1 disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={isTyping || !query.trim()}
                        className="w-8 h-8 rounded-xl bg-accent-indigo hover:scale-[1.03] text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed shrink-0"
                      >
                        <FaPaperPlane size={10} />
                      </button>
                    </form>
                  </div>
                )}

              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
