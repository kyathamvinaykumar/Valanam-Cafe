import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isSolid, setIsSolid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsSolid(true);
      } else {
        setIsSolid(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeNav = () => setIsOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-[5vw] py-[14px] transition-all duration-500 ease-out border-b ${
        isSolid
          ? 'bg-[#1a1208]/80 backdrop-blur-[12px] border-royalLine shadow-[0_10px_30px_-15px_rgba(15,10,4,0.7)]'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="flex items-center gap-[10px]">
        <img
          src="/valanam-new-logo.png"
          alt="Valanam"
          className="h-[80px] w-auto block"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="flex flex-col justify-center">
          <span className="font-playfair text-[1.2rem] tracking-[0.2em] text-parchment leading-[1.1]">
            VALANAM
          </span>
          <span className="font-playfair italic text-[0.65rem] tracking-[0.05em] text-amber mt-[2px]">
            A Fabled Kitchen
          </span>
        </div>
      </div>

      <ul
        className={`fixed top-0 h-screen w-[65vw] flex flex-col justify-center bg-[#0f0a04]/97 backdrop-blur-[16px] transition-[right] duration-350 p-8 gap-10 list-none z-50 md:static md:h-auto md:w-auto md:flex-row md:bg-transparent md:backdrop-blur-none md:p-0 md:gap-8 ${
          isOpen ? 'right-0' : '-right-full'
        }`}
      >
        <li>
          <a
            href="#story"
            onClick={closeNav}
            className="text-[0.82rem] tracking-[0.1em] uppercase text-parchment transition-colors duration-300 hover:text-amber"
          >
            Our Story
          </a>
        </li>
        <li>
          <a
            href="#menu"
            onClick={closeNav}
            className="text-[0.82rem] tracking-[0.1em] uppercase text-parchment transition-colors duration-300 hover:text-amber"
          >
            Menu
          </a>
        </li>
        <li>
          <a
            href="#space"
            onClick={closeNav}
            className="text-[0.82rem] tracking-[0.1em] uppercase text-parchment transition-colors duration-300 hover:text-amber"
          >
            The Space
          </a>
        </li>
        <li>
          <a
            href="#kitchen"
            onClick={closeNav}
            className="text-[0.82rem] tracking-[0.1em] uppercase text-parchment transition-colors duration-300 hover:text-amber"
          >
            From Our Kitchen
          </a>
        </li>
        <li>
          <a
            href="#visit"
            onClick={closeNav}
            className="text-[0.82rem] tracking-[0.1em] uppercase text-parchment transition-colors duration-300 hover:text-amber"
          >
            Visit Us
          </a>
        </li>
      </ul>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1 md:hidden focus:outline-none z-50"
        aria-label="Open menu"
      >
        <span className="block w-[22px] h-[1.5px] bg-parchment"></span>
        <span className="block w-[22px] h-[1.5px] bg-parchment"></span>
        <span className="block w-[22px] h-[1.5px] bg-parchment"></span>
      </button>
    </nav>
  );
}
