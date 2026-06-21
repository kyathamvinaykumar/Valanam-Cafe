import React from 'react';

export default function ParallaxBanner({ backgroundImage, height = 'h-[300px] md:h-[400px]', children }) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-cover bg-center bg-no-repeat parallax-banner-container ${height}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay matching the Valanam dark aesthetic */}
      <div className="absolute inset-0 bg-[#0f0a04]/45 z-[1]" />
      
      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-[2]">
        {children}
      </div>
    </div>
  );
}
