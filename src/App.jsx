import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import MenuSection from './components/MenuSection';
import SpaceSection from './components/SpaceSection';
import KitchenSection from './components/KitchenSection';
import VisitSection from './components/VisitSection';
import Footer from './components/Footer';
import Lenis from 'lenis';

export default function App() {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      smoothTouch: false,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Lock scrolling when lightbox or mobile menu is active
  useEffect(() => {
    if (lightboxImage || isMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (lenisRef.current) lenisRef.current.stop();
    } else {
      document.body.style.overflow = '';
      if (lenisRef.current) lenisRef.current.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (lenisRef.current) lenisRef.current.start();
    };
  }, [lightboxImage, isMenuOpen]);

  return (
    <div className="min-h-screen bg-dark text-parchment relative font-light leading-[1.7]">
      {/* Navigation */}
      <Navbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      {/* Page Content Wrapper (with blur & scale down transition when menu is open) */}
      <div
        className={`transition-all duration-500 origin-center ${
          isMenuOpen ? 'blur-md scale-[0.99] pointer-events-none' : ''
        }`}
      >
        {/* Hero Canvas sequence */}
        <Hero />

        {/* Main Sections */}
        <main>
          <StorySection />
          <MenuSection />
          <SpaceSection onImageClick={setLightboxImage} />
          <KitchenSection onImageClick={setLightboxImage} />
          <VisitSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Full-screen Backdrop Overlay for Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[999] backdrop-blur-overlay md:hidden cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[2000] flex justify-center items-center bg-[#0f0a04]/95 backdrop-blur-[5px] overflow-auto"
          onClick={() => setLightboxImage(null)}
        >
          <span
            className="absolute top-[30px] right-[40px] text-parchment text-[40px] font-light cursor-pointer hover:text-amber leading-none select-none"
            onClick={() => setLightboxImage(null)}
          >
            &times;
          </span>
          <img
            src={lightboxImage}
            alt="Enlarged gallery view"
            className="m-auto block max-w-[90%] max-h-[85vh] object-contain rounded-[4px] shadow-[0_10px_40px_rgba(0,0,0,0.5)] lightbox__content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          />
        </div>
      )}
    </div>
  );
}
