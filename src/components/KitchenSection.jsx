import React, { useState } from 'react';

const DRINKS_IMAGES = [
  { src: '/drinks/photo_1_2026-05-02_16-45-11.jpg', delay: '', alt: 'Handcrafted iced latte served at Valanam Kitchen' },
  { src: '/drinks/photo_2_2026-05-02_16-45-11.jpg', delay: 'reveal-d1', alt: 'Hot espresso coffee in a rustic cup at Valanam Café' },
  { src: '/drinks/photo_3_2026-05-02_16-45-11.jpg', delay: 'reveal-d2', alt: 'Fresh cold brew coffee with ice in Hyderabad café' },
  { src: '/drinks/photo_4_2026-05-02_16-45-11.jpg', delay: '', alt: 'Handcrafted refreshing summer mocktail at Valanam Kitchen' },
  { src: '/drinks/photo_5_2026-05-02_16-45-11.jpg', delay: 'reveal-d1', alt: 'Pour-over specialty filter coffee preparation at Valanam' },
];

const FOOD_IMAGES = [
  { src: '/food/photo_1_2026-05-02_16-41-57.jpg', delay: '', alt: 'Handcrafted wood-fired pizza with fresh toppings at Valanam Kitchen' },
  { src: '/food/photo_2_2026-05-02_16-41-57.jpg', delay: 'reveal-d1', alt: 'Sourdough pizza loaded with cheese and herbs at Valanam Café' },
  { src: '/food/photo_3_2026-05-02_16-41-57.jpg', delay: 'reveal-d2', alt: 'Delicious fresh pasta dish prepared by chef at Valanam Kitchen' },
  { src: '/food/photo_4_2026-05-02_16-41-57.jpg', delay: '', alt: 'Homely breakfast platter with eggs, toast and salad in Hyderabad' },
  { src: '/food/photo_5_2026-05-02_16-41-57.jpg', delay: 'reveal-d1', alt: 'Warm artisanal bread basket served with fresh butter' },
  { src: '/food/photo_6_2026-05-02_16-41-57.jpg', delay: 'reveal-d2', alt: 'Delicious gourmet sandwich filled with fresh vegetables and cheese' },
  { src: '/food/photo_7_2026-05-02_16-41-57.jpg', delay: '', alt: 'Warm, flaky pastries baked fresh daily in Valanam Kitchen' },
  { src: '/food/photo_8_2026-05-02_16-41-57.jpg', delay: 'reveal-d1', alt: 'Crispy baked garlic bread slices with cheese at Valanam Cafe' },
  { src: '/food/photo_9_2026-05-02_16-41-57.jpg', delay: 'reveal-d2', alt: 'Freshly prepared garden salad bowl with light vinaigrette' },
  { src: '/food/photo_10_2026-05-02_16-41-57.jpg', delay: '', alt: 'Homely main course meal cooked with care at Valanam' },
  { src: '/food/photo_11_2026-05-02_16-41-57.jpg', delay: 'reveal-d1', alt: 'Special wood-fired cheese pizza on wooden serving board' },
];

const DESSERTS_IMAGES = [
  { src: '/desserts/photo_4_2026-05-02_16-43-45.jpg', delay: '', alt: 'Decadent chocolate mud cake slice at Valanam Kitchen' },
  { src: '/desserts/photo_5_2026-05-02_16-43-45.jpg', delay: 'reveal-d1', alt: 'Creamy baked cheesecake with blueberry compote at Valanam Cafe' },
  { src: '/desserts/photo_6_2026-05-02_16-43-45.jpg', delay: 'reveal-d2', alt: 'Soft hot chocolate brownie served warm at Valanam' },
  { src: '/desserts/photo_7_2026-05-02_16-43-45.jpg', delay: '', alt: 'Artisanal fruit tart filled with custard and fresh berries' },
];

export default function KitchenSection({ onImageClick }) {
  const [activeTab, setActiveTab] = useState('food'); // Default active tab is 'food'

  const tabClass = (tabId) =>
    `font-inter text-[0.85rem] tracking-[0.15em] uppercase px-7 py-2.5 bg-transparent border-none outline-none cursor-pointer transition-all duration-200 border-b-2 ${
      activeTab === tabId
        ? 'text-amber opacity-100 border-amber'
        : 'text-parchment opacity-50 border-transparent hover:text-parchment hover:opacity-80'
    }`;

  const gridClass = (tabId) =>
    `grid grid-cols-1 min-[601px]:grid-cols-2 min-[901px]:grid-cols-3 gap-2.5 mt-10 max-w-[1200px] mx-auto ${
      activeTab === tabId ? '' : 'hidden'
    }`;

  return (
    <>
      <hr className="border-none border-t border-royalLine m-0" />
      <section className="bg-dark px-6 py-[clamp(60px,10vh,100px)]" id="kitchen">
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

        {/* DRINKS GRID */}
        <div className={gridClass('drinks')}>
          {DRINKS_IMAGES.map((img, idx) => (
            <img
              key={idx}
              className={`reveal ${img.delay} w-full aspect-[4/5] object-cover rounded-[4px] transition-transform duration-[350ms] ease hover:scale-[1.02] cursor-pointer`}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              onClick={() => onImageClick(img.src)}
            />
          ))}
        </div>

        {/* FOOD GRID */}
        <div className={gridClass('food')}>
          {FOOD_IMAGES.map((img, idx) => (
            <img
              key={idx}
              className={`reveal ${img.delay} w-full aspect-[4/5] object-cover rounded-[4px] transition-transform duration-[350ms] ease hover:scale-[1.02] cursor-pointer`}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              onClick={() => onImageClick(img.src)}
            />
          ))}
        </div>

        {/* DESSERTS GRID */}
        <div className={gridClass('desserts')}>
          {DESSERTS_IMAGES.map((img, idx) => (
            <img
              key={idx}
              className={`reveal ${img.delay} w-full aspect-[4/5] object-cover rounded-[4px] transition-transform duration-[350ms] ease hover:scale-[1.02] cursor-pointer`}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              onClick={() => onImageClick(img.src)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
