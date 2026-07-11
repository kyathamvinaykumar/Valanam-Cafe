import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Visit from './pages/Visit';
import Blog from './pages/Blog';
import Discover from './pages/Discover';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Lenis from 'lenis';
import SEO from './components/SEO';

export default function App() {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lenisRef = useRef(null);
  
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("page-enter-active");

  // Page Transition coordinator effect
  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage("page-exit");
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("page-enter");
      }, 120); // 120ms exit duration
      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === "page-enter") {
      // Force layout reflow
      void document.body.offsetHeight;
      setTransitionStage("page-enter-active");
    }
  }, [transitionStage]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const isMobileOrTouch = window.innerWidth < 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isMobileOrTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      smoothTouch: false,
    });
    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Force layout recalculations after Lenis initialization
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
      lenis.resize();
    });

    const timeoutId = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      lenis.resize();
    }, 150);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change (fires when new page starts entering)
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lenisRef.current.resize();
      
      const timer = setTimeout(() => {
        lenisRef.current?.resize();
        window.dispatchEvent(new Event('resize'));
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [displayLocation.pathname]);

  // Scroll reveal observer on route change (fires when new components enter the DOM)
  useEffect(() => {
    let observer;
    const timeoutId = setTimeout(() => {
      const reveals = document.querySelectorAll('.reveal');
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.01,
          rootMargin: '0px 0px 80px 0px',
        }
      );

      reveals.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [displayLocation.pathname]);

  // Scroll-linked text float alignment for revealed elements
  useEffect(() => {
    const handleTextFloat = () => {
      const activeReveals = document.querySelectorAll(
        'h1.reveal.in, h2.reveal.in, h3.reveal.in, p.reveal.in, blockquote.reveal.in, span.reveal.in'
      );
      const viewportHeight = window.innerHeight;
      const isMobile = window.innerWidth < 768;
      const maxOffset = isMobile ? 12 : 24;

      activeReveals.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const relativePosition = elementCenter / viewportHeight;

        if (rect.top < viewportHeight && rect.bottom > 0) {
          const offset = (relativePosition - 0.5) * maxOffset;
          item.style.transform = `translate3d(0, ${offset}px, 0)`;
        } else {
          item.style.transform = '';
        }
      });
    };

    window.addEventListener('scroll', handleTextFloat, { passive: true });
    window.addEventListener('resize', handleTextFloat);
    const interval = setInterval(handleTextFloat, 150);

    return () => {
      window.removeEventListener('scroll', handleTextFloat);
      window.removeEventListener('resize', handleTextFloat);
      clearInterval(interval);
    };
  }, [displayLocation.pathname]);

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
    <div className="min-h-screen bg-dark text-parchment relative font-light leading-[1.7] custom-cursor-active">
      <SEO />
      {/* Custom Circle Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      {/* Page Content Wrapper (with blur & scale down transition when menu is open) */}
      <div
        className={`transition-all duration-500 origin-center ${
          isMenuOpen ? 'blur-md scale-[0.99] pointer-events-none' : ''
        }`}
      >
        {/* Main Routed Content with Transitions */}
        <main className={`page-transition-wrapper ${transitionStage}`}>
          <Routes location={displayLocation}>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<Home />} />
            <Route path="/gallery" element={<Gallery onImageClick={setLightboxImage} />} />
            <Route path="/visit" element={<Visit />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/ai" element={<Discover />} />
            <Route path="*" element={<Discover />} />
          </Routes>
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
            alt="Valanam Kitchen cozy interior ambience and food gallery view"
            className="m-auto block max-w-[90%] max-h-[85dvh] object-contain rounded-[4px] shadow-[0_10px_40px_rgba(0,0,0,0.5)] lightbox__content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          />
        </div>
      )}
    </div>
  );
}
