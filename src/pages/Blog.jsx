import React from 'react';

export default function Blog() {
  return (
    <div className="pb-[120px]">
      {/* Existing Hero Section */}
      <div className="pt-[140px] pb-[60px] px-6 max-w-[800px] mx-auto text-center flex flex-col items-center">
        <h1 className="reveal font-playfair italic text-[clamp(2.5rem,5vw,4.5rem)] text-amber mb-6">
          Valanam Journal
        </h1>
        <p className="reveal reveal-d1 font-playfair text-[clamp(1.1rem,1.8vw,1.3rem)] leading-[1.8] text-parchment max-w-[600px] mb-8 opacity-90">
          A collection of stories, thoughts, recipes, and quiet moments gathered under the rain-bearing cloud.
        </p>
        <div className="reveal reveal-d2 w-[80px] h-[1px] bg-amber/40"></div>
      </div>

      {/* Featured Journal Article */}
      <article className="max-w-[640px] mx-auto px-6 mt-6">
        <header className="reveal reveal-d3 mb-10">
          <span className="font-inter text-[0.78rem] tracking-[0.25em] text-amber/80 uppercase block mb-3">
            A Note From Valanam
          </span>
          <h2 className="font-playfair text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.25] text-parchment font-normal">
            Why We Are Not On Swiggy & Zomato
          </h2>
          <div className="font-inter text-[0.72rem] tracking-[0.05em] text-parchment/40 uppercase mt-4">
            June 22, 2026 · 3 min read
          </div>
        </header>

        <div className="font-playfair text-[1.1rem] leading-[1.9] text-parchment/90 space-y-6">
          <p className="reveal">
            Dear Guests,
          </p>
          <p className="reveal">
            At Valanam, we believe food is more than just a meal — it's a memory, a moment, a connection.
          </p>
          <p className="reveal">
            That's why we do not offer takeaways or delivery services, and why you won't find us on Zomato or Swiggy.
          </p>
          <p className="reveal">
            We want every dish we serve to be warm, fresh, and authentic — just as it was in the good old days, when families gathered around a table, shared stories, and enjoyed food without distractions.
          </p>

          <div className="reveal my-12 py-6 border-y border-amber/15 text-center">
            <p className="italic text-[1.35rem] text-amber leading-[1.8] my-1">No rush.</p>
            <p className="italic text-[1.35rem] text-amber leading-[1.8] my-1">No scrolling.</p>
            <p className="italic text-[1.35rem] text-amber leading-[1.8] my-1">No notifications.</p>
          </div>

          <p className="reveal">
            Just good food, meaningful conversations, and the people around you.
          </p>
          <p className="reveal">
            To preserve that experience, every dish at Valanam is prepared fresh after you order.
          </p>
          <p className="reveal">
            Sometimes this may take a little longer to reach your table, but we believe some things are worth waiting for.
          </p>
          <p className="reveal">
            While we generally do not encourage takeaways or leftover packing, we understand there may be occasions when it becomes necessary.
          </p>
          <p className="reveal">
            In such cases, we kindly request guests to bring their own containers (dabbas).
          </p>
          <p className="reveal">
            It is a small step towards sustainability and a more mindful way of living.
          </p>
          <p className="reveal">
            Thank you for being part of our story.
          </p>
          <p className="reveal font-medium text-amber/95">
            Let us bring back the joy of slow, soulful dining together.
          </p>

          {/* Gentle Footnotes */}
          <footer className="reveal border-t border-amber/10 pt-8 mt-12 mb-12">
            <h4 className="font-playfair italic text-[1rem] text-amber/80 mb-4 tracking-[0.05em]">
              A few gentle reminders:
            </h4>
            <ul className="list-none p-0 m-0 space-y-3.5">
              <li className="font-playfair italic text-[0.95rem] text-parchment/65 leading-[1.65] flex items-start gap-2.5">
                <span className="text-amber mt-0.5">•</span>
                <span>Cake cutting is not permitted inside the café.</span>
              </li>
              <li className="font-playfair italic text-[0.95rem] text-parchment/65 leading-[1.65] flex items-start gap-2.5">
                <span className="text-amber mt-0.5">•</span>
                <span>We do not accept payments through Zomato or Swiggy.</span>
              </li>
            </ul>
          </footer>

          <div className="reveal mt-12 mb-4 text-right">
            <p className="italic text-[1.05rem] text-amber leading-none">With Love,</p>
            <p className="font-playfair text-[1.2rem] text-parchment tracking-[0.1em] uppercase mt-2.5">
              Valanam Kitchen
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
