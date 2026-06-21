import React, { useState } from 'react';

export default function HoverParallaxImage({ src, alt, className = '', onClick }) {
  const [transformStyle, setTransformStyle] = useState('scale(1) translate(0px, 0px)');

  const handleMouseMove = (e) => {
    if (window.innerWidth <= 768) return; // Bypassed on mobile
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    // Normalize coordinates to ranges between -0.5 and 0.5
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    // Glide calculation (multiplied by negative bounds to move image opposite to cursor)
    const moveX = x * -12; // Shift up to 6px left/right
    const moveY = y * -12; // Shift up to 6px up/down

    setTransformStyle(`scale(1.06) translate(${moveX}px, ${moveY}px)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('scale(1) translate(0px, 0px)');
  };

  return (
    <div
      className={`overflow-hidden rounded-[4px] cursor-pointer w-full h-full relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-200 ease-out"
        style={{ transform: transformStyle }}
        loading="lazy"
      />
    </div>
  );
}
