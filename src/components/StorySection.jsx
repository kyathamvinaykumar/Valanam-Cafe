import React, { useEffect, useRef } from 'react';

export default function StorySection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      content.style.transform = '';
      return;
    }

    let rafPending = false;

    const handleScroll = () => {
      if (rafPending) return;
      rafPending = true;

      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Only animate when section is in viewport
        if (rect.bottom > 0 && rect.top < windowHeight) {
          const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
          
          // Subtle parallax on content (moves slower than scroll)
          const contentOffset = (progress - 0.5) * 30;
          content.style.transform = `translate3d(0, ${contentOffset}px, 0)`;
        }
        
        rafPending = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <hr className="border-none border-t border-royalLine m-0" />
      <section ref={sectionRef} className="bg-dark px-6 py-[clamp(60px,12vh,120px)] relative overflow-hidden" id="story">
        {/* Parallax background glow */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(201, 132, 58, 0.04) 0%, transparent 70%)',
          }}
        />
        <div ref={contentRef} className="max-w-[680px] mx-auto relative z-[1]" style={{ willChange: 'transform' }}>
          <h2 className="reveal font-playfair italic text-[clamp(2rem,4vw,3.5rem)] text-parchment text-center mb-[60px] leading-[1.2]">
            "Some meals should not travel."
          </h2>
          <p className="reveal reveal-d1 font-playfair text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.9] text-parchment mb-8">
            Valanam is not a name chosen for sound. It comes from an old South Indian word — the
            rain-bearing cloud. The gathering cloud. Not the storm. Not the downpour. The quiet, dark cloud that moves
            slowly across an afternoon, draws people under shelter, and leaves the air softer than it found it. That is what
            we are trying to be.
          </p>
          <p className="reveal reveal-d2 font-playfair text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.9] text-parchment mb-8">
            We do not offer takeaway. Not because we cannot. Because some meals are not meant to
            travel. A dish that leaves the kitchen is a dish that has left its moment. We are not in the business of sending
            food somewhere. We are in the business of being somewhere — and inviting you into it.
          </p>
          <p className="reveal reveal-d3 font-playfair text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.9] text-parchment mb-8">
            There is no delivery. Good dinners arrive when you do. They are meant to be received
            at a table, with time, with people, with the particular silence that only comes when everyone has stopped
            scrolling and started eating.
          </p>
          <p className="reveal font-playfair text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.9] text-parchment mb-8">
            We do not rush tables. The best tables are the ones you ease into. You will not feel the
            invisible pressure of a next booking. You will not feel managed. You will feel, eventually, that you have been
            somewhere. That the evening held you for a while.
          </p>
          <p className="reveal font-playfair text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.9] text-parchment mb-8">
            This is not a policy. It is a conviction. We are not avoiding convenience. We are protecting
            ritual. Warm food. Slow conversation. The feeling of staying longer than you planned. These are not accidents of
            a good evening. They are the entire point.
          </p>
          <blockquote className="reveal block max-w-[560px] mx-auto mt-[60px] mb-0 text-right font-playfair italic text-[clamp(1.2rem,2vw,1.6rem)] text-amber border-r-[3px] border-amber pr-6 leading-[1.5]">
            "Valanam comes slowly. Gathers people. Changes the mood. Makes you stay."
          </blockquote>
          <span className="reveal block text-center mt-[48px] font-inter text-[0.78rem] tracking-[0.4em] text-parchment uppercase opacity-70">
            A Kerala Kitchen. Hyderabad.
          </span>
        </div>
      </section>
    </>
  );
}

