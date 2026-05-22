interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export async function askAI(prompt: string, history: ChatMessage[] = []): Promise<string> {
  try {
    const response = await fetch('/.netlify/functions/ask-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, history }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Failed to connect to R.J. AI serverless node:", error);
    
    // Graceful fallback responses in case Netlify environment or internet is disconnected
    const promptLower = prompt.toLowerCase();
    
    if (promptLower.includes('vvendu') || promptLower.includes('auction')) {
      return `Vvendu Auction Platform (Local Fallback)
──────────────────────────
An enterprise automotive dynamic bidding platform.
• Tech: React, TS, Spring Boot, MySQL.
• Highlights: Built 8-step Dealer/Lender registration flows, dynamic zone filters, resolved Lombok POJO cyclic rendering issues.`;
    }
    
    if (promptLower.includes('smart lock') || promptLower.includes('lock')) {
      return `IoT Smart Lock System (Local Fallback)
──────────────────────────
Secure, app-controlled automated lock.
• Tech: C/C++, Firebase, Android.
• Highlights: Tamper detection, remote unlock latency < 150ms.`;
    }

    if (promptLower.includes('backend') || promptLower.includes('spring') || promptLower.includes('java')) {
      return `Backend Experience (Local Fallback)
──────────────────────────
• Java & Spring Boot Trainee at Tap Academy (May - Oct 2025).
• Built REST APIs, Spring Security/JWT, DAO pattern integrations.`;
    }

    if (promptLower.includes('react') || promptLower.includes('frontend') || promptLower.includes('framer')) {
      return `Frontend Skills (Local Fallback)
──────────────────────────
• React, TS, Tailwind CSS, Framer Motion, GSAP.
• Highly optimized animations matching 60 FPS standards.`;
    }

    return `R.J. AI offline fallback active.
──────────────────────────
Connection to serverless nodes failed. I can answer queries related to Vvendu, Smart Lock, React, or Java & Spring Boot in offline fallback mode.`;
  }
}
