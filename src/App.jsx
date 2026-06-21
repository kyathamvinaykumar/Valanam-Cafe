import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import MenuSection from './components/MenuSection';
import SpaceSection from './components/SpaceSection';
import KitchenSection from './components/KitchenSection';
import VisitSection from './components/VisitSection';
import Footer from './components/Footer';

export default function App() {
  const [lightboxImage, setLightboxImage] = useState(null);

  // Initialize smooth scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.0,
      smoothTouch: false, // Keep native mobile touch behavior
      touchMultiplier: 2.0,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    window.lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
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

  // Lock smooth scrolling when lightbox is active
  useEffect(() => {
    if (window.lenis) {
      if (lightboxImage) {
        window.lenis.stop();
        document.body.style.overflow = 'hidden';
      } else {
        window.lenis.start();
        document.body.style.overflow = '';
      }
    }
  }, [lightboxImage]);

  return (
    <div className="min-h-screen bg-dark text-parchment relative font-light leading-[1.7]">
      {/* Navigation */}
      <Navbar />

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
