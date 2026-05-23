import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    const el = ref.current;
    if (!el) return;

    // quickTo is highly optimized for frequent property updates
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      // Calculate distance between cursor and center of element
      const distance = Math.hypot(distanceX, distanceY);
      
      // Magnetic pull radius: 60px
      const pullRadius = 60;
      
      if (distance < pullRadius) {
        // Calculate dynamic pull multiplier based on proximity (closer = stronger pull)
        const power = (pullRadius - distance) / pullRadius;
        // Pull up to 35% of the distance
        xTo(distanceX * 0.35 * power);
        yTo(distanceY * 0.35 * power);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
}
