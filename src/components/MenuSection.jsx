import React from 'react';

const MENU_DATA = [
  {
    category: 'Pasta',
    items: [
      {
        title: 'Spaghetti',
        desc: 'Valanam homemade sauces, aromatic Indian spices, creamy texture — a fusion adventure.',
        price: 'Vegetable / Paneer ₹320  ·  Chicken / Shrimp ₹370',
        from: 'From our kitchen: homemade sauces, fresh aromatics',
        delay: 'reveal-d1',
      },
      {
        title: 'Penne-licious',
        desc: 'Fresh penne Alfredo, coconut pulp, smooth coconut cream, velvety cheese cream — comfort elevated.',
        price: 'Vegetable / Paneer ₹320  ·  Chicken / Shrimp ₹370',
        from: 'From our kitchen: fresh coconut, daily-made sauces',
        delay: 'reveal-d2',
      },
    ],
  },
  {
    category: 'Sandwiches',
    items: [
      {
        title: 'Valanam Special Sandwich',
        desc: 'Poe bread — soft, fluffy — with homemade Indian sauces, fresh veggies, and your choice of protein.',
        price: 'Veggies / Paneer ₹190  ·  Chicken ₹220  ·  Shrimp ₹240',
        from: 'From our kitchen: housemade sauces, local Poe bread',
        delay: 'reveal-d1',
      },
    ],
  },
];

export default function MenuSection() {
  return (
    <>
      <hr className="border-none border-t border-royalLine m-0" />
      <section className="bg-espresso px-6 py-[clamp(60px,10vh,100px)]" id="menu">
        <div className="text-center">
          <h2 className="reveal font-playfair text-[clamp(1.8rem,3vw,2.5rem)] text-parchment mb-2">
            What We Serve
          </h2>
          <p className="reveal reveal-d1 font-inter italic text-[0.95rem] text-amber">
            From soil to plate. Nothing in between.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-[60px] max-w-[1200px] mx-auto">
          {MENU_DATA.map((cat, idx) => (
            <div key={idx} className="reveal col-span-full mt-3">
              <div className="font-playfair text-[1.3rem] text-amber tracking-[0.1em] uppercase border-b border-amber/25 pb-2.5 mb-5">
                {cat.category}
              </div>
              <div className="grid grid-cols-1 min-[601px]:grid-cols-2 min-[901px]:grid-cols-3 gap-6">
                {cat.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className={`reveal ${item.delay} bg-clay border-t-2 border-amber rounded-[4px] px-6 py-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-parchment hover:-translate-y-2 hover:scale-[1.015] hover:shadow-[0_15px_35px_-10px_rgba(201,132,58,0.18)] cursor-default`}
                  >
                    <h3 className="font-playfair text-[1.15rem] text-parchment mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[0.88rem] text-parchment/72 italic mb-3.5 leading-[1.55]">
                      {item.desc}
                    </p>
                    <div className="font-inter text-[0.82rem] text-amber font-medium">
                      {item.price}
                    </div>
                    <div className="font-inter text-[0.75rem] text-parchment/80 italic border-t border-parchment/15 pt-2.5 mt-2.5">
                      {item.from}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
