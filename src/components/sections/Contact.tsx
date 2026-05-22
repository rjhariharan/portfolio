import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaInstagram, FaCheckCircle, FaExclamationTriangle, FaCopy, FaCheck } from 'react-icons/fa';

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, val: string, label: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(val);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("https://formspree.io/f/xrbazypb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (err) {
      setError("Unable to submit message at this time. Please email directly.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    { icon: FaEnvelope, label: "Email", value: "rjhariharan1@gmail.com", href: "mailto:rjhariharan1@gmail.com" },
    { icon: FaPhone, label: "Phone", value: "+91 9342305427", href: "tel:+919342305427" },
    { icon: FaMapMarkerAlt, label: "Location", value: "Mayiladuthurai, Tamil Nadu", href: "#" }
  ];

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/rjhariharan", label: "GitHub", color: "hover:text-[#24292e] hover:bg-white" },
    { icon: FaLinkedin, href: "https://in.linkedin.com/in/rjhariharan", label: "LinkedIn", color: "hover:text-[#0077b5] hover:bg-white" },
    { icon: FaInstagram, href: "https://www.instagram.com/rjhariharan_", label: "Instagram", color: "hover:text-[#e1306c] hover:bg-white" }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-primary/[0.02] dark:bg-black/10">
      {/* Background neon light blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl rounded-full bg-accent-indigo/5 blur-[130px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-20 md:text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Let's Connect</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-fuchsia mb-8 md:mx-auto"></div>
            <p className="text-secondary max-w-2xl mx-auto">
              I am open to discuss projects, internship listings, full-time opportunities, or tech solutions.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          
          {/* Info Side (ColSpan 2) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold font-display mb-6 text-primary">Contact Info</h3>
              <div className="space-y-5 mb-10">
                {contactDetails.map((detail, idx) => {
                  const Icon = detail.icon;
                  const isLink = detail.href !== "#";
                  const isCopyable = detail.label === "Email" || detail.label === "Phone";
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      key={detail.label}
                      className="flex items-center space-x-4 p-4 rounded-2xl card-bg card-bg-hover transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue border border-accent-blue/10 shrink-0">
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-mono text-secondary/40 uppercase">{detail.label}</p>
                        <div className="flex items-center mt-0.5">
                          {isLink ? (
                            <a 
                              href={detail.href} 
                              className="font-semibold text-primary hover:text-accent-blue transition-colors text-sm sm:text-base break-all"
                            >
                              {detail.value}
                            </a>
                          ) : (
                            <p className="font-semibold text-primary text-sm sm:text-base">{detail.value}</p>
                          )}
                          {isCopyable && (
                            <button
                              onClick={(e) => handleCopy(e, detail.value, detail.label)}
                              className="ml-2.5 p-1 rounded-lg bg-primary/5 dark:bg-white/5 hover:bg-primary/10 dark:hover:bg-white/10 border border-primary/5 dark:border-white/5 hover:border-primary/15 dark:hover:border-white/15 text-secondary hover:text-primary transition-all focus:outline-none"
                              title={`Copy ${detail.label}`}
                            >
                              {copiedText === detail.label ? (
                                <FaCheck className="text-green-400" size={10} />
                              ) : (
                                <FaCopy size={10} />
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Social Panel */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-secondary/50 mb-4 font-mono">
                Follow Digital Profiles
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-secondary hover:scale-110 transition-all duration-300 ${social.color}`}
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form Card (ColSpan 3) */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-3xl card-bg backdrop-blur-xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Inputs Name & Email */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono font-bold uppercase text-secondary/55 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl input-bg focus:border-accent-blue focus:ring-[0.5px] focus:ring-accent-blue outline-none transition-all text-sm"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono font-bold uppercase text-secondary/55 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl input-bg focus:border-accent-blue focus:ring-[0.5px] focus:ring-accent-blue outline-none transition-all text-sm"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-mono font-bold uppercase text-secondary/55 mb-2">
                    Subject Topic
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl input-bg focus:border-accent-blue focus:ring-[0.5px] focus:ring-accent-blue outline-none transition-all text-sm"
                    placeholder="Project Inquiry / Job Opportunity"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono font-bold uppercase text-secondary/55 mb-2">
                    Message Detail
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl input-bg focus:border-accent-blue focus:ring-[0.5px] focus:ring-accent-blue outline-none transition-all text-sm resize-none"
                    placeholder="Describe how I can assist you..."
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-bold hover:scale-[1.01] hover:shadow-lg hover:shadow-accent-indigo/25 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 flex justify-center items-center relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </span>
                  ) : (
                    <span>Send Secure Message</span>
                  )}
                </button>

                {/* Success/Error Alerts */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center space-x-3 text-xs sm:text-sm font-semibold"
                    >
                      <FaCheckCircle className="shrink-0 text-base" />
                      <span>Thank you! Your message was submitted successfully. I will get back to you shortly.</span>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center space-x-3 text-xs sm:text-sm font-semibold"
                    >
                      <FaExclamationTriangle className="shrink-0 text-base" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
