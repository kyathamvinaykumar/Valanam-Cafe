import React, { useEffect, useRef } from 'react';

export default function StorySection() {
  const sectionRef = useRef(null);
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);
  const p3Ref = useRef(null);
  const p4Ref = useRef(null);
  const p5Ref = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    let rafId;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Only animate if section is in the viewport
      if (rect.top < viewportHeight && rect.bottom > 0) {
        // Calculate entrance progress
        const scrolledIntoView = viewportHeight - rect.top;
        
        // Responsive scroll factor (mobile friendly)
        const isMobile = window.innerWidth <= 768;
        const multiplier = isMobile ? 0.015 : 0.06;

        if (p1Ref.current) {
          p1Ref.current.style.transform = `translate3d(0, ${scrolledIntoView * multiplier * -0.15}px, 0)`;
        }
        if (p2Ref.current) {
          p2Ref.current.style.transform = `translate3d(0, ${scrolledIntoView * multiplier * 0.1}px, 0)`;
        }
        if (p3Ref.current) {
          p3Ref.current.style.transform = `translate3d(0, ${scrolledIntoView * multiplier * -0.08}px, 0)`;
        }
        if (p4Ref.current) {
          p4Ref.current.style.transform = `translate3d(0, ${scrolledIntoView * multiplier * 0.12}px, 0)`;
        }
        if (p5Ref.current) {
          p5Ref.current.style.transform = `translate3d(0, ${scrolledIntoView * multiplier * -0.05}px, 0)`;
        }
        if (quoteRef.current) {
          quoteRef.current.style.transform = `translate3d(0, ${scrolledIntoView * multiplier * 0.2}px, 0)`;
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <hr className="border-none border-t border-royalLine m-0" />
      <section
        ref={sectionRef}
        className="bg-dark px-6 py-[clamp(60px,12vh,120px)] overflow-hidden"
        id="story"
      >
        <div className="max-w-[680px] mx-auto">
          <h2 className="reveal font-playfair italic text-[clamp(2rem,4vw,3.5rem)] text-parchment text-center mb-[60px] leading-[1.2]">
            "Some meals should not travel."
          </h2>
          <p
            ref={p1Ref}
            className="reveal reveal-d1 font-playfair text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.9] text-parchment mb-8 will-change-transform"
          >
            Valanam is not a name chosen for sound. It comes from an old South Indian word — the
            rain-bearing cloud. The gathering cloud. Not the storm. Not the downpour. The quiet, dark cloud that moves
            slowly across an afternoon, draws people under shelter, and leaves the air softer than it found it. That is what
            we are trying to be.
          </p>
          <p
            ref={p2Ref}
            className="reveal reveal-d2 font-playfair text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.9] text-parchment mb-8 will-change-transform"
          >
            We do not offer takeaway. Not because we cannot. Because some meals are not meant to
            travel. A dish that leaves the kitchen is a dish that has left its moment. We are not in the business of sending
            food somewhere. We are in the business of being somewhere — and inviting you into it.
          </p>
          <p
            ref={p3Ref}
            className="reveal reveal-d3 font-playfair text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.9] text-parchment mb-8 will-change-transform"
          >
            There is no delivery. Good dinners arrive when you do. They are meant to be received
            at a table, with time, with people, with the particular silence that only comes when everyone has stopped
            scrolling and started eating.
          </p>
          <p
            ref={p4Ref}
            className="reveal font-playfair text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.9] text-parchment mb-8 will-change-transform"
          >
            We do not rush tables. The best tables are the ones you ease into. You will not feel the
            invisible pressure of a next booking. You will not feel managed. You will feel, eventually, that you have been
            somewhere. That the evening held you for a while.
          </p>
          <p
            ref={p5Ref}
            className="reveal font-playfair text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.9] text-parchment mb-8 will-change-transform"
          >
            This is not a policy. It is a conviction. We are not avoiding convenience. We are protecting
            ritual. Warm food. Slow conversation. The feeling of staying longer than you planned. These are not accidents of
            a good evening. They are the entire point.
          </p>
          <blockquote
            ref={quoteRef}
            className="reveal block max-w-[560px] mx-auto mt-[60px] mb-0 text-right font-playfair italic text-[clamp(1.2rem,2vw,1.6rem)] text-amber border-r-[3px] border-amber pr-6 leading-[1.5] will-change-transform"
          >
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
