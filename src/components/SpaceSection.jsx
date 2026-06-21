import React from 'react';

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
  return (
    <>
      <hr className="border-none border-t border-royalLine m-0" />
      <section className="bg-espresso px-6 py-[clamp(60px,10vh,100px)]" id="space">
        <div className="flex flex-col min-[901px]:flex-row gap-[60px] max-w-[1200px] mx-auto items-start">
          <div className="flex-[1.4] columns-1 md:columns-2 gap-2">
            {AMBIENCE_IMAGES.map((img, idx) => (
              <img
                key={idx}
                className={`reveal ${img.delay} inline-block w-full mb-2 object-cover rounded-[4px] break-inside-avoid cursor-pointer transition-transform duration-300 hover:scale-[1.02]`}
                src={img.src}
                alt="Ambience"
                loading="lazy"
                onClick={() => onImageClick(img.src)}
              />
            ))}
          </div>
          <div className="flex-1 pl-0 min-[901px]:pl-5">
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
