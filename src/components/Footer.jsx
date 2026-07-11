import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleVisitClick = () => {
    if (window.location.pathname === '/visit') {
      document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer id="footer" className="bg-gradient-to-b from-[#2c1a0e]/20 to-[#0f0a04] px-6 lg:px-12 pt-12 pb-10 border-t border-royalLine/15">
        <div className="max-w-[1200px] mx-auto">
          {/* Multi-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 text-left items-start">
            
            {/* Column 1: Brand & Logo */}
            <div className="flex flex-col items-start">
              <img
                src="/valanam-new-logo.png"
                alt="Valanam Kitchen Logo - Café and Restaurant in Hyderabad"
                style={{ height: '180px', width: 'auto' }}
                className="mb-4 block"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="font-playfair text-[1.35rem] tracking-[0.1em] text-parchment leading-tight">
                Valanam Kitchen
              </div>
              <p className="font-playfair italic text-[0.85rem] text-parchment/60 leading-relaxed mt-2 mb-4">
                "Where stories simmer, and flavors linger."
              </p>
              
              {/* Elegant social icons */}
              <div className="flex gap-4 items-center">
                <a
                  href="https://www.instagram.com/valanamhyd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-amber/70 hover:text-parchment transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="https://maps.app.goo.gl/rNxf2kxKSKkAjF8W6"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Maps"
                  className="text-amber/70 hover:text-parchment transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="flex flex-col items-start">
              <h4 className="font-playfair text-[0.92rem] text-amber tracking-[0.15em] uppercase mb-4 font-medium">
                Quick Links
              </h4>
              <div className="flex flex-col space-y-2.5 text-[0.82rem] tracking-[0.05em]">
                <Link to="/" className="text-parchment/50 hover:text-amber transition-colors duration-300">
                  Home
                </Link>
                <Link to="/gallery" className="text-parchment/50 hover:text-amber transition-colors duration-300">
                  Gallery
                </Link>
                <Link to="/blog" className="text-parchment/50 hover:text-amber transition-colors duration-300">
                  Blog
                </Link>
                <Link to="/visit" onClick={handleVisitClick} className="text-parchment/50 hover:text-amber transition-colors duration-300">
                  Visit Us
                </Link>
                <Link to="/ai" className="text-parchment/50 hover:text-amber transition-colors duration-300">
                  Coming Soon
                </Link>
              </div>
            </div>

            {/* Column 3: Visit Valanam */}
            <div className="flex flex-col items-start">
              <h4 className="font-playfair text-[0.92rem] text-amber tracking-[0.15em] uppercase mb-4 font-medium">
                Visit Valanam
              </h4>
              <p className="font-playfair italic text-[0.85rem] text-parchment/70 leading-relaxed mb-3">
                Vidya Nagar,<br />
                Vigyanapuri Colony,<br />
                Adikmet, Hyderabad,<br />
                Telangana 500044
              </p>
              <p className="font-inter text-[0.82rem] text-amber mb-4 block">
                <a href="tel:+919985476677" className="hover:text-parchment transition-colors duration-300">
                  +91 99854 76677
                </a>
              </p>
              <div className="text-[0.78rem] font-inter text-parchment/50 space-y-1">
                <div className="font-playfair italic text-parchment/75 text-[0.82rem] mb-0.5 font-medium">
                  Opening Hours:
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
                  <span>Sat – Sun:</span>
                  <span>10:30 am – 11:00 pm</span>
                  <span>Mon – Thu:</span>
                  <span>10:30 am – 10:30 pm</span>
                  <span>Friday:</span>
                  <span>10:30 am – 11:00 pm</span>
                </div>
              </div>
            </div>

            {/* Column 4: Location Map Preview */}
            <div className="flex flex-col items-start w-full">
              <h4 className="font-playfair text-[0.92rem] text-amber tracking-[0.15em] uppercase mb-4 font-medium">
                Location
              </h4>
              <div className="w-full h-[160px] rounded-[6px] overflow-hidden border border-royalLine/15 relative">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=78.4480,17.4400,78.4580,17.4470&layer=mapnik&marker=17.4435,78.4530"
                  width="100%"
                  height="100%"
                  style={{
                    border: 'none',
                    display: 'block',
                    filter: 'sepia(0.4) contrast(0.9) brightness(0.85)',
                  }}
                  loading="lazy"
                  title="Valanam Kitchen location"
                ></iframe>
              </div>
            </div>

          </div>

          {/* Subtle Separator */}
          <div className="border-t border-royalLine/10 mt-12 mb-6 max-w-[1200px] mx-auto"></div>

          {/* Bottom Story Signature */}
          <div className="text-center font-playfair italic text-[0.92rem] text-parchment/60 tracking-wide leading-none">
            Valanam Kitchen • Adikmet, Hyderabad
          </div>
        </div>
      </footer>
    </>
  );
}
