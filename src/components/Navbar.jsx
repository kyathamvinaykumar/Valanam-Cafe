import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar({ isOpen, setIsOpen }) {
  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsSolid(true);
      } else {
        setIsSolid(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeNav = () => setIsOpen(false);

  const handleVisitClick = () => {
    closeNav();
    if (window.location.pathname === '/visit') {
      document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getNavLinkClass = ({ isActive }) =>
    `text-[0.82rem] tracking-[0.1em] uppercase transition-colors duration-300 ${
      isActive ? 'text-amber font-medium' : 'text-parchment hover:text-amber'
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-[5vw] py-[14px] transition-all duration-400 border-b ${
        isSolid
          ? 'bg-[#1a1208]/92 backdrop-blur-[12px] border-royalLine'
          : 'bg-transparent border-transparent'
      }`}
    >
      <Link to="/" className="flex items-center gap-[10px]" onClick={closeNav}>
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
      </Link>

      <ul
        className={`fixed top-0 h-[100dvh] w-[65vw] flex flex-col justify-center bg-[#0f0a04]/97 mobile-menu-blur transition-[right] duration-350 p-8 gap-10 list-none z-50 md:static md:h-auto md:w-auto md:flex-row md:bg-transparent md:backdrop-blur-none md:p-0 md:gap-8 ${
          isOpen ? 'right-0' : '-right-full'
        }`}
      >
        <li>
          <NavLink to="/" onClick={closeNav} className={getNavLinkClass} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/gallery" onClick={closeNav} className={getNavLinkClass}>
            Gallery
          </NavLink>
        </li>
        <li>
          <NavLink to="/blog" onClick={closeNav} className={getNavLinkClass}>
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink to="/visit" onClick={handleVisitClick} className={getNavLinkClass}>
            Visit Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/ai" onClick={closeNav} className={getNavLinkClass}>
            Coming Soon
          </NavLink>
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
