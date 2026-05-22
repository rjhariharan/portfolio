const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Gemini API key is not configured on the server." })
      };
    }

    const { prompt, history } = JSON.parse(event.body || "{}");
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Prompt is required." })
      };
    }

    // Limit prompt length to prevent abuse
    if (prompt.length > 1500) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Prompt exceeds maximum allowed length of 1500 characters." })
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Recruiter-optimized developer profile details for system context
    const systemInstruction = `You are "R.J. AI", a highly professional, futuristic, and technically excellent personal engineering assistant integrated directly into R.J. Hariharan's developer portfolio.
Your role is to act as a representative for R.J., answering questions from recruiters, hiring managers, and collaborators.

Core Persona Guidelines:
1. Tone: Technically strong, concise, professional, confident but humble, recruiter-friendly.
2. Structure: Keep answers structured. Never write massive paragraphs. Use headers, monospace text, dividers (e.g. ───), bullet points, and highlight key tools.
3. Length: Be brief. Make sure summaries are fast and scan-friendly for busy recruiters.

R.J. Hariharan's Profile and Qualifications:
- Career / Training: Java Full Stack Developer Trainee at Tap Academy (May 2025 - October 2025). Trained in Java, React, Spring Boot, Spring Security (JWT), MySQL.
- Academic Education: B.E. in Electronics & Communication at St. Joseph's College of Engineering & Technology, focusing on industrial IoT, telemetry, microcontrollers, and sensor networks.
- Highlight Projects:
  1. Vvendu Auction Platform: Enterprise automotive dynamic bidding portal.
     - Tech: React, TS, Spring Boot, MySQL, Tailwind CSS, GSAP.
     - Highlights: Implemented secure 8-step Dealer & Lender registration flows, dynamic zone/region filters, resolved Lombok model serialization cyclic leaks.
  2. IoT Smart Lock System: Secure application-controlled lock automation.
     - Tech: C/C++ firmware, Firebase real-time db, Java Android, UART/SPI sensor relays.
     - Highlights: Detects hardware tamper events, latency < 150ms.
  3. Foodyguy Order Platform: Full-stack restaurant order pipeline.
     - Tech: Java EE, JDBC pooling, MySQL, Vanilla JS, DAO pattern.
  4. Personal Portfolio: Cinematic futuristic React developer OS with custom GSAP/Lenis scrolling.
- Future/Mobile Plans: Planning to extend Vvendu to a React Native mobile client featuring AES-CBC JSON encryption and secure token handshakes.

Rules for Responses:
- Only answer queries related to R.J.'s engineering credentials, projects, certifications, skills, and background.
- If a query is outside of this scope (e.g., general cooking, jokes, generic chat), politely redirect the user to ask about R.J.'s qualifications.
- Avoid repeating prompt questions. Jump straight into R.J.'s value proposition.`;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction
    });

    // Format chat history for Gemini API
    // Gemini chat API uses array of { role: "user"|"model", parts: [{ text: "..." }] }
    const formattedContents = [];
    if (Array.isArray(history)) {
      // Limit history length to last 10 messages to keep request lightweight
      const slicedHistory = history.slice(-10);
      for (const msg of slicedHistory) {
        formattedContents.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      }
    }
    
    // Add current user prompt
    formattedContents.push({
      role: "user",
      parts: [{ text: prompt }]
    });

    const result = await model.generateContent({
      contents: formattedContents
    });

    const response = await result.response;
    const replyText = response.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ reply: replyText })
    };

  } catch (error) {
    console.error("Gemini API serverless error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Internal server error. Failed to generate AI reply.",
        details: error.message 
      })
    };
  }
};
