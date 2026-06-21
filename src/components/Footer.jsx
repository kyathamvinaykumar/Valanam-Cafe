import React from 'react';

export default function Footer() {
  return (
    <>
      <hr className="border-none border-t border-royalLine m-0" />
      <footer className="bg-espresso border-t border-royalLine px-6 py-10 text-center">
        <div className="font-playfair text-[2rem] text-amber tracking-[0.2em]">VALANAM</div>
        <p className="font-playfair italic text-[0.85rem] text-parchment opacity-60 mt-2">
          Where stories simmer, and flavors linger.
        </p>
        <p className="font-inter text-[0.72rem] text-parchment opacity-35 mt-3 tracking-[0.04em]">
          © 2025 Valanam Kitchen. Hyderabad.
        </p>
      </footer>
    </>
  );
}
