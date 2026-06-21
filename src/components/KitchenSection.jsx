import React, { useState } from 'react';

const DRINKS_IMAGES = [
  { src: '/drinks/photo_1_2026-05-02_16-45-11.jpg', delay: '' },
  { src: '/drinks/photo_2_2026-05-02_16-45-11.jpg', delay: 'reveal-d1' },
  { src: '/drinks/photo_3_2026-05-02_16-45-11.jpg', delay: 'reveal-d2' },
  { src: '/drinks/photo_4_2026-05-02_16-45-11.jpg', delay: '' },
  { src: '/drinks/photo_5_2026-05-02_16-45-11.jpg', delay: 'reveal-d1' },
];

const FOOD_IMAGES = [
  { src: '/food/photo_1_2026-05-02_16-41-57.jpg', delay: '' },
  { src: '/food/photo_2_2026-05-02_16-41-57.jpg', delay: 'reveal-d1' },
  { src: '/food/photo_3_2026-05-02_16-41-57.jpg', delay: 'reveal-d2' },
  { src: '/food/photo_4_2026-05-02_16-41-57.jpg', delay: '' },
  { src: '/food/photo_5_2026-05-02_16-41-57.jpg', delay: 'reveal-d1' },
  { src: '/food/photo_6_2026-05-02_16-41-57.jpg', delay: 'reveal-d2' },
  { src: '/food/photo_7_2026-05-02_16-41-57.jpg', delay: '' },
  { src: '/food/photo_8_2026-05-02_16-41-57.jpg', delay: 'reveal-d1' },
  { src: '/food/photo_9_2026-05-02_16-41-57.jpg', delay: 'reveal-d2' },
  { src: '/food/photo_10_2026-05-02_16-41-57.jpg', delay: '' },
  { src: '/food/photo_11_2026-05-02_16-41-57.jpg', delay: 'reveal-d1' },
];

const DESSERTS_IMAGES = [
  { src: '/desserts/photo_4_2026-05-02_16-43-45.jpg', delay: '' },
  { src: '/desserts/photo_5_2026-05-02_16-43-45.jpg', delay: 'reveal-d1' },
  { src: '/desserts/photo_6_2026-05-02_16-43-45.jpg', delay: 'reveal-d2' },
  { src: '/desserts/photo_7_2026-05-02_16-43-45.jpg', delay: '' },
];

export default function KitchenSection({ onImageClick }) {
  const [activeTab, setActiveTab] = useState('food');

  const tabClass = (tabId) =>
    `font-inter text-[0.85rem] tracking-[0.15em] uppercase px-7 py-2.5 bg-transparent border-none outline-none cursor-pointer transition-all duration-300 border-b-2 ${
      activeTab === tabId
        ? 'text-amber opacity-100 border-amber'
        : 'text-parchment opacity-50 border-transparent hover:text-parchment hover:opacity-80'
    }`;

  const gridClass = (tabId) =>
    `grid grid-cols-1 min-[601px]:grid-cols-2 min-[901px]:grid-cols-3 gap-2.5 w-full transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
      activeTab === tabId
        ? 'opacity-100 scale-100 pointer-events-auto relative z-10'
        : 'opacity-0 scale-98 pointer-events-none absolute inset-x-0 top-0 -z-10'
    }`;

  return (
    <>
      <hr className="border-none border-t border-royalLine m-0" />
      <section className="bg-dark px-6 py-[clamp(60px,10vh,100px)] overflow-hidden" id="kitchen">
        <div className="text-center">
          <h2 className="reveal font-playfair text-[clamp(1.8rem,3vw,2.5rem)] text-parchment mb-2">
            From Our Kitchen
          </h2>
          <p className="reveal reveal-d1 font-inter italic text-[0.95rem] text-amber">
            <em>Grown close. Cooked slow. Served here.</em>
          </p>
        </div>

        <div className="reveal reveal-d1 flex justify-center gap-2.5 mt-5">
          <button className={tabClass('drinks')} onClick={() => setActiveTab('drinks')}>
            Drinks
          </button>
          <button className={tabClass('food')} onClick={() => setActiveTab('food')}>
            Food
          </button>
          <button className={tabClass('desserts')} onClick={() => setActiveTab('desserts')}>
            Desserts
          </button>
        </div>

        {/* Relative Container for Crossfading Grids */}
        <div className="relative mt-10 max-w-[1200px] mx-auto min-h-[400px]">
          {/* DRINKS GRID */}
          <div className={gridClass('drinks')}>
            {DRINKS_IMAGES.map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-[4px] aspect-[4/5] w-full">
                <img
                  className={`reveal ${img.delay} w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.05] cursor-pointer`}
                  src={img.src}
                  alt="Drink"
                  loading="lazy"
                  onClick={() => onImageClick(img.src)}
                />
              </div>
            ))}
          </div>

          {/* FOOD GRID */}
          <div className={gridClass('food')}>
            {FOOD_IMAGES.map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-[4px] aspect-[4/5] w-full">
                <img
                  className={`reveal ${img.delay} w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.05] cursor-pointer`}
                  src={img.src}
                  alt="Food"
                  loading="lazy"
                  onClick={() => onImageClick(img.src)}
                />
              </div>
            ))}
          </div>

          {/* DESSERTS GRID */}
          <div className={gridClass('desserts')}>
            {DESSERTS_IMAGES.map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-[4px] aspect-[4/5] w-full">
                <img
                  className={`reveal ${img.delay} w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.05] cursor-pointer`}
                  src={img.src}
                  alt="Dessert"
                  loading="lazy"
                  onClick={() => onImageClick(img.src)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
