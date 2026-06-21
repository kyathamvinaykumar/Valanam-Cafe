import React, { useEffect, useRef } from 'react';

const AMBIENCE_IMAGES = [
  { src: '/ambience/photo_1_2026-05-02_16-47-07.jpg', delay: '' },
  { src: '/ambience/photo_1_2026-05-02_17-13-27.jpg', delay: 'reveal-d1' },
  { src: '/ambience/photo_1_2026-05-02_17-24-30.jpg', delay: 'reveal-d2' },
  { src: '/ambience/photo_2026-05-02_17-15-45.jpg', delay: '' },
  { src: '/ambience/photo_2_2026-05-02_16-47-07.jpg', delay: 'reveal-d1' },
  { src: '/ambience/photo_2_2026-05-02_17-13-28.jpg', delay: 'reveal-d2' },
  { src: '/ambience/photo_2_2026-05-02_17-24-30.jpg', delay: '' },
  { src: '/ambience/photo_3_2026-05-02_16-47-07.jpg', delay: 'reveal-d1' },
  { src: '/ambience/photo_4_2026-05-02_16-47-07.jpg', delay: 'reveal-d2' },
];

export default function SpaceSection({ onImageClick }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    let rafId;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Only perform parallax updates if section is inside viewport
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const scrolledIntoView = viewportHeight - rect.top;
        const isMobile = window.innerWidth <= 768;
        
        // Multiplier to limit translation values
        const intensity = isMobile ? 0.015 : 0.055;

        // Query container elements
        const items = section.querySelectorAll('.space-masonry-container');
        items.forEach((item, idx) => {
          // Stagger speed and alternate direction
          const direction = idx % 2 === 0 ? 1 : -1;
          const speed = 0.12 + (idx % 3) * 0.06;
          const yTranslate = scrolledIntoView * intensity * speed * direction;

          item.style.transform = `translate3d(0, ${yTranslate}px, 0)`;
        });
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
        className="bg-espresso px-6 py-[clamp(60px,10vh,100px)] overflow-hidden"
        id="space"
      >
        <div className="flex flex-col min-[901px]:flex-row gap-[60px] max-w-[1200px] mx-auto items-start">
          
          {/* Gallery Masonry */}
          <div className="flex-[1.4] columns-1 md:columns-2 gap-2">
            {AMBIENCE_IMAGES.map((img, idx) => (
              <div
                key={idx}
                className="space-masonry-container inline-block w-full mb-2 overflow-hidden rounded-[4px] break-inside-avoid will-change-transform"
              >
                <img
                  className={`reveal ${img.delay} block w-full h-auto object-cover cursor-pointer transition-transform duration-500 ease-out hover:scale-[1.05]`}
                  src={img.src}
                  alt="Ambience"
                  loading="lazy"
                  onClick={() => onImageClick(img.src)}
                />
              </div>
            ))}
          </div>

          {/* Sticky Text Panel */}
          <div className="flex-1 pl-0 min-[901px]:pl-5 min-[901px]:sticky min-[901px]:top-[120px] self-start">
            <h2 className="reveal font-playfair text-[clamp(1.6rem,2.5vw,2rem)] text-parchment mb-6">
              The Space
            </h2>
            <p className="reveal reveal-d1 font-playfair text-[0.98rem] leading-[1.85] text-parchment opacity-85 mb-[18px]">
              Light arrives here the way it does at dusk — slow, warm, without announcement. The
              lanterns have been burning since before you walked in.
            </p>
            <p className="reveal reveal-d2 font-playfair text-[0.98rem] leading-[1.85] text-parchment opacity-85 mb-[18px]">
              Terracotta underfoot. Lattice wood at your shoulder. The sound of leaves from
              somewhere just outside. This is not a designed space. It is a remembered one.
            </p>
            <a
              className="reveal reveal-d3 inline-flex items-center justify-center mt-8 text-amber transition-all duration-300 hover:scale-110 hover:text-parchment"
              href="https://www.instagram.com/valanamhyd/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
