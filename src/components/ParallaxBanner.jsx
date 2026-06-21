import React from 'react';

export default function ParallaxBanner() {
  return (
    <div
      className="w-full h-[250px] md:h-[400px] bg-scroll md:bg-fixed bg-center bg-no-repeat bg-cover relative flex items-center justify-center"
      style={{
        backgroundImage: "url('/food/photo_3_2026-05-02_16-41-57.jpg')",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[#0f0a04]/50 pointer-events-none" />

      {/* Decorative content */}
      <div className="relative z-10 text-center px-6 max-w-[600px]">
        <div className="w-8 h-[1px] bg-amber/50 mx-auto mb-4" />
        <p className="font-playfair italic text-[clamp(1.1rem,2vw,1.6rem)] text-parchment leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          "Slow conversation. Warm bread. The feeling of staying longer than you planned."
        </p>
        <div className="w-8 h-[1px] bg-amber/50 mx-auto mt-4" />
      </div>
    </div>
  );
}
