import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTerminal, FaPaperPlane, FaSpinner, FaChevronRight, FaTimes } from 'react-icons/fa';
import { askAI } from '../../services/askAI';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export default function AskAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Greetings, recruiter. R.J. AI assistant online. Ask me about R.J.'s engineering projects, skills, or experience.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);
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
      
      // Auto-open drawer
      setIsOpen(true);

      // Execute search
      handleSearch(prompt);
    };

    window.addEventListener('ask-rj-ai', handleAskAIEvent);
    return () => window.removeEventListener('ask-rj-ai', handleAskAIEvent);
  }, [messages]); // Keep message log scope updated for the listener closure

  // Listen to close event
  useEffect(() => {
    const handleCloseEvent = () => {
      setIsOpen(false);
    };
    window.addEventListener('close-rj-ai', handleCloseEvent);
    return () => window.removeEventListener('close-rj-ai', handleCloseEvent);
  }, []);

  // Auto Scroll Chat only on new messages or when starting search/typing
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages, isTyping, isOpen]);

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
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-fuchsia text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 relative group"
          aria-label="Ask R.J. AI Support Drawer"
        >
          <FaRobot className="text-lg md:text-xl" />
          <span className="absolute right-14 md:right-16 px-3 py-1.5 rounded-xl bg-cardBg/95 border border-primary/10 text-[10px] font-mono tracking-wider text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
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
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-in Sidebar Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              data-lenis-prevent
              className="fixed top-0 right-0 h-screen w-full sm:w-[500px] z-[65] bg-cardBg/95 backdrop-blur-2xl border-l border-primary/10 shadow-[0_0_50px_rgba(0,0,0,0.15)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              
              {/* Drawer HUD Header */}
              <div className="px-6 py-5 border-b border-primary/10 bg-primary/[0.02] flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 font-mono text-[10px] tracking-wider mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-ping" />
                    <span className="text-primary font-bold uppercase">R.J. AI System Console</span>
                  </div>
                  <span className="text-[9px] font-mono text-secondary/50 block">LOCAL_KNOWLEDGE_ENGINE_ACTIVE</span>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-xl bg-primary/5 border border-primary/5 flex items-center justify-center text-secondary hover:text-primary hover:bg-primary/10 transition-all"
                  aria-label="Close Drawer"
                >
                  <FaTimes size={12} />
                </button>
              </div>

              {/* Console Content Area (Pure Chat Console) */}
              <div className="flex-grow overflow-hidden flex flex-col justify-between">
                
                <div className="flex-grow overflow-y-auto p-6 min-h-[300px]">
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <div 
                        key={index}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[90%] rounded-2xl p-4 text-xs leading-relaxed font-mono ${
                            msg.sender === 'user' 
                              ? 'bg-accent-indigo/15 border border-accent-indigo/20 text-primary dark:text-white rounded-br-none shadow-[0_4px_12px_rgba(99,102,241,0.05)]' 
                              : 'bg-primary/5 border border-primary/5 text-primary dark:text-secondary rounded-bl-none'
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
                        <div className="max-w-[90%] rounded-2xl p-4 text-xs leading-relaxed font-mono bg-primary/5 border border-primary/5 text-primary dark:text-secondary rounded-bl-none">
                          <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed typing-cursor select-text">{typingText}</pre>
                        </div>
                      </div>
                    )}

                    {/* Initial Search Loading state */}
                    {isTyping && !typingText && (
                      <div className="flex justify-start">
                        <div className="bg-primary/5 border border-primary/5 rounded-2xl p-4 flex items-center space-x-2 text-secondary/50 font-mono text-xs">
                          <FaSpinner className="animate-spin text-accent-indigo" />
                          <span>Accessing R.J. Knowledge Nodes...</span>
                        </div>
                      </div>
                    )}

                    <div ref={chatEndRef} />
                  </div>
                </div>

                {/* Footer Input Area */}
                <div className="p-6 border-t border-primary/10 bg-primary/[0.01]">
                  
                  {/* Suggestion Chips */}
                  <div className="mb-4">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-secondary/50 block mb-2">Suggested Prompt Nodes</span>
                    <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 max-h-[85px] scrollbar-thin">
                      {suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSearch(s.query)}
                          disabled={isTyping}
                          className="text-[9px] font-mono text-secondary hover:text-primary bg-primary/5 hover:bg-accent-indigo/15 border border-primary/5 hover:border-accent-indigo/25 px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 shrink-0"
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
                    className="flex items-center space-x-3 bg-primary/[0.02] dark:bg-black/20 border border-primary/10 rounded-2xl p-1.5 pl-4 hover:border-primary/20 transition-colors"
                  >
                    <FaTerminal className="text-secondary/40 shrink-0 text-xs" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Ask about projects, skills, or experience..."
                      disabled={isTyping}
                      className="bg-transparent border-0 outline-none focus:ring-0 text-xs font-mono text-primary placeholder-secondary/30 flex-grow py-1 disabled:opacity-50"
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

              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
