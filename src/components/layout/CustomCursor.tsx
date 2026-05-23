import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [hoverText, setHoverText] = useState("");
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Move dot instantly
      if (cursorDotRef.current) {
        gsap.to(cursorDotRef.current, {
          x: clientX,
          y: clientY,
          duration: 0,
        });
      }

      // Move outer circle with slight delay (creates trail effect)
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.15,
          ease: "power2.out"
        });
      }

      // Move cursor text indicator slightly offset
      if (cursorTextRef.current) {
        gsap.to(cursorTextRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.08,
          ease: "power2.out"
        });
      }

      // Global Glow Card mouse coordinate tracking
      const target = e.target as HTMLElement;
      const card = target.closest('.glow-card') as HTMLElement;
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    const onMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const tagName = target.tagName.toLowerCase();
      
      let text = "VIEW";
      if (tagName === "a") {
        text = "LINK";
      } else if (tagName === "button" || target.getAttribute("role") === "button") {
        text = "CLICK";
      } else if (tagName === "input" || tagName === "textarea" || tagName === "select") {
        text = "TYPE";
      } else if (target.classList.contains("glow-card")) {
        text = "VIEW";
      }

      setHoverText(text);

      if (cursorRef.current && cursorDotRef.current && cursorTextRef.current) {
        gsap.to(cursorRef.current, {
          scale: 2.2,
          backgroundColor: 'rgba(99, 102, 241, 0.08)', // Light indigo glow
          borderColor: 'rgba(217, 70, 239, 0.5)', // Fuchsia border
          duration: 0.3
        });
        gsap.to(cursorDotRef.current, {
          scale: 0.4,
          backgroundColor: '#d946ef', // Fuchsia dot
          duration: 0.3
        });
        gsap.to(cursorTextRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3
        });
      }
    };

    const onMouseLeave = () => {
      setHoverText("");

      if (cursorRef.current && cursorDotRef.current && cursorTextRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(59, 130, 246, 0.5)', // Blue border
          duration: 0.3
        });
        gsap.to(cursorDotRef.current, {
          scale: 1,
          backgroundColor: '#3b82f6', // Blue dot
          duration: 0.3
        });
        gsap.to(cursorTextRef.current, {
          opacity: 0,
          scale: 0.5,
          duration: 0.2
        });
      }
    };

    const onMouseDown = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 0.75,
          borderColor: '#8b5cf6', // Violet click
          duration: 0.1
        });
      }
    };

    const onMouseUp = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1,
          borderColor: 'rgba(59, 130, 246, 0.5)',
          duration: 0.1
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    
    // Add hover effect to interactive items
    const setupInteractiveHover = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .glow-card'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    };

    setupInteractiveHover();

    // Do a one-time delayed re-attach to catch dynamically mounted elements
    // (replaces MutationObserver which thrashed the main thread on every DOM mutation)
    const retryTimer = setTimeout(() => setupInteractiveHover(), 1500);

    return () => {
      clearTimeout(retryTimer);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .glow-card'
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Lagging outer border */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-blue/50 pointer-events-none z-[99999] transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      {/* Precise center dot */}
      <div 
        ref={cursorDotRef} 
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-blue pointer-events-none z-[100000] transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      {/* Tiny text indicator */}
      <div
        ref={cursorTextRef}
        className="fixed top-0 left-0 pointer-events-none z-[100001] transform -translate-x-1/2 -translate-y-1/2 font-mono text-[8px] font-bold text-accent-fuchsia uppercase tracking-widest pointer-events-none hidden md:block mt-7 opacity-0 scale-50"
      >
        {hoverText}
      </div>
    </>
  );
}
