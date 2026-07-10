import React from 'react';

export default function VisitSection() {
  return (
    <>
      <hr className="border-none border-t border-royalLine m-0" />
      <section className="bg-dark px-6 py-[clamp(60px,10vh,120px)]" id="visit">
        <div className="max-w-[1250px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-14 items-center lg:items-stretch">
          
          {/* Left Column: Text Content (centered on tablet, left-aligned on mobile/desktop) */}
          <div className="flex-1 lg:flex-[0.8] w-full flex flex-col justify-center text-left md:text-center lg:text-left md:items-center lg:items-start px-6 md:px-0">
            <h2 className="reveal font-playfair italic text-[clamp(1.8rem,5vw,3.2rem)] text-amber mb-6 leading-[1.2] md:max-w-2xl">
              Come As A Stranger.<br />Leave As A Regular.
            </h2>
            <div className="space-y-6 md:space-y-8 text-parchment font-playfair font-light leading-[1.7] lg:leading-[1.85] text-[clamp(0.95rem,1.5vw,1.1rem)] max-w-[480px] md:max-w-2xl lg:max-w-none">
              {/* Pull Quote */}
              <div className="reveal reveal-d1 py-2 my-2 border-l border-amber/35 pl-4 text-left md:text-center md:border-l-0 md:border-y md:border-amber/20 md:py-3 md:pl-0 lg:border-y-0 lg:border-l lg:pl-4 lg:py-2 lg:text-left">
                <p className="italic text-[clamp(1.1rem,1.9vw,1.3rem)] text-amber/95 leading-[1.6]">
                  A meal lasts an hour. A memory stays much longer.
                </p>
              </div>
              <p className="reveal reveal-d2 opacity-75">
                At Valanam Kitchen, every table has witnessed conversations, laughter, celebrations, quiet evenings, and countless stories shared over food prepared with patience and care.
              </p>
              <p className="reveal reveal-d3 opacity-75">
                Whether it's your first visit or your fiftieth, we hope you leave with something more than a full stomach.
              </p>
              <p className="reveal reveal-d4 opacity-75">
                We'll be here whenever you're ready.
              </p>
            </div>
          </div>

          {/* Right Column: Image Composition Grid (45% width equivalent on desktop) */}
          <div className="flex-1 lg:flex-[1.2] w-full grid grid-cols-2 gap-x-4 gap-y-6 md:gap-6 mt-10 lg:mt-0 md:max-w-[700px] md:mx-auto lg:max-w-none items-start">
            
            {/* Image 4: VALANAM Hero Image (Top-Left on desktop, First & full width on mobile) */}
            <div className="reveal aspect-[4/5] overflow-hidden rounded-[12px] border border-royalLine/10 relative w-full col-span-2 md:col-span-1 order-1 gallery-hover-card bg-clay/20">
              <img
                src="/visit/visit_4.jpg"
                alt="Valanam Café Poster (Hero)"
                className="w-full h-full object-cover"
                // Eagerly load the first hero poster image to avoid layout shifts on first print
              />
            </div>

            {/* Image 2: TV Frame / Camera (Top-Right on desktop, Second & half-width on mobile) */}
            <div className="reveal reveal-d1 aspect-[3/4] overflow-hidden rounded-[12px] border border-royalLine/10 relative w-full col-span-1 order-2 lg:w-[82%] lg:justify-self-start gallery-hover-card bg-clay/20">
              <img
                src="/visit/visit_2.jpg"
                alt="Family camera frame"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Image 3: Laptop Conversation (Bottom-Left on desktop, Fourth & full width on mobile) */}
            <div className="reveal reveal-d2 aspect-[4/5] overflow-hidden rounded-[12px] border border-royalLine/10 relative w-full col-span-2 md:col-span-1 order-4 md:order-3 gallery-hover-card bg-clay/20">
              <img
                src="/visit/visit_3.jpg"
                alt="Laptop and conversation corner"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Image 1: Friends Dining / Music (Bottom-Right on desktop, Third & half-width on mobile) */}
            <div className="reveal reveal-d3 aspect-[3/4] overflow-hidden rounded-[12px] border border-royalLine/10 relative w-full col-span-1 order-3 md:order-4 gallery-hover-card bg-clay/20">
              <img
                src="/visit/visit_1.jpg"
                alt="Dining table and music performance"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
