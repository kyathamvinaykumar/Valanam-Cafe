import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const outerPosRef = useRef({ x: -100, y: -100 });
  const visibleRef = useRef(false);
  const hoveringRef = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouch) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const handleMouseMove = (e) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

      if (!visibleRef.current) {
        visibleRef.current = true;
        outer.style.opacity = '1';
        inner.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      outer.style.opacity = '0';
      inner.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      visibleRef.current = true;
      outer.style.opacity = '1';
      inner.style.opacity = '1';
    };

    // Track hovering over interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select');
      
      if (isInteractive) {
        hoveringRef.current = true;
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select');
      
      if (isInteractive) {
        hoveringRef.current = false;
      }
    };

    // Animation loop with smooth trailing
    const animate = () => {
      const { x, y } = posRef.current;

      // Inner dot follows instantly
      inner.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      // Outer ring trails with smooth easing
      const ease = 0.15;
      outerPosRef.current.x += (x - outerPosRef.current.x) * ease;
      outerPosRef.current.y += (y - outerPosRef.current.y) * ease;

      const scale = hoveringRef.current ? 1.8 : 1;
      const borderOpacity = hoveringRef.current ? 0.7 : 0.35;

      outer.style.transform = `translate3d(${outerPosRef.current.x}px, ${outerPosRef.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      outer.style.borderColor = `rgba(201, 132, 58, ${borderOpacity})`;

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Outer trailing ring */}
      <div
        ref={outerRef}
        className="custom-cursor-outer"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(201, 132, 58, 0.35)',
          pointerEvents: 'none',
          zIndex: 10000,
          opacity: 0,
          transition: 'border-color 0.3s ease, width 0.3s ease, height 0.3s ease',
          willChange: 'transform',
        }}
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="custom-cursor-inner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'rgba(201, 132, 58, 0.8)',
          pointerEvents: 'none',
          zIndex: 10001,
          opacity: 0,
          willChange: 'transform',
        }}
      />
    </>
  );
}
