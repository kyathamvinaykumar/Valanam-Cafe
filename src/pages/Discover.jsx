import React from 'react';
import { Link } from 'react-router-dom';

export default function Discover() {
  return (
    <div className="pt-[140px] pb-[100px] px-6 max-w-[800px] mx-auto text-center min-h-[70vh] flex flex-col justify-center items-center">
      <div className="reveal font-playfair text-[clamp(6rem,15vw,12rem)] text-amber/15 font-bold leading-none select-none mb-[-20px]">
        404
      </div>
      <h1 className="reveal reveal-d1 font-playfair italic text-[clamp(2rem,4vw,3.5rem)] text-parchment mb-6 leading-[1.2]">
        This page is still brewing.
      </h1>
      <p className="reveal reveal-d2 font-playfair text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.8] text-parchment/70 max-w-[500px] mb-10">
        Some good things take time — like a slow-cooked stew or a story worth telling. This corner of Valanam isn't ready yet.
      </p>
      <div className="reveal reveal-d3 w-[60px] h-[1px] bg-amber/40 mb-10"></div>
      <Link
        to="/"
        className="reveal reveal-d4 font-inter text-[0.82rem] tracking-[0.15em] uppercase text-amber border border-amber/40 px-8 py-3 rounded-[2px] hover:bg-amber/10 hover:border-amber transition-all duration-300"
      >
        Return Home
      </Link>
    </div>
  );
}
