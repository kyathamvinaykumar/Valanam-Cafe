import React, { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 114;
const FRAME_PATH = (n) => `/valanam zip/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const textOverlayRef = useRef(null);
  const framesRef = useRef([]);

  // Refs for layout caching to avoid forced reflows (layout thrashing)
  const canvasWidthRef = useRef(0);
  const canvasHeightRef = useRef(0);
  const containerHeightRef = useRef(0);
  const stickyHeightRef = useRef(0);
  const currentFrameIndexRef = useRef(0);
  const dprRef = useRef(1);

  const [videoSrc, setVideoSrc] = useState(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Load mobile video after component mounts to avoid blocking initial paint and track device size
  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      setIsMobileDevice(isMobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const isMobile = window.innerWidth < 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isMobile) {
      const timer = setTimeout(() => {
        setVideoSrc('/hero_mobile.mp4');
      }, 100);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', checkMobile);
      };
    }
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    let lastDrawnFrame = -1;

    const updateDimensions = () => {
      const container = containerRef.current;
      const sticky = stickyRef.current;
      if (!canvas || !container || !sticky) return;
      canvasWidthRef.current = canvas.offsetWidth;
      canvasHeightRef.current = canvas.offsetHeight;
      containerHeightRef.current = container.offsetHeight;
      stickyHeightRef.current = sticky.offsetHeight;
    };

    const drawFrame = (index) => {
      const img = framesRef.current[index];
      if (img && img.complete) {
        const dpr = dprRef.current;
        const displayWidth = canvasWidthRef.current;
        const displayHeight = canvasHeightRef.current;

        let resized = false;
        if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
          canvas.width = displayWidth * dpr;
          canvas.height = displayHeight * dpr;
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          resized = true;
        }

        if (!resized && lastDrawnFrame === index) return;
        lastDrawnFrame = index;

        const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        const x = (canvas.width - img.naturalWidth * scale) / 2;
        const y = (canvas.height - img.naturalHeight * scale) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
      }
    };

    // Lazy stream preload: Load frame 1 immediately, then background stream the remaining 113 frames
    const preloadRemainingFrames = () => {
      for (let i = 2; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = FRAME_PATH(i);
        img.onload = () => {
          framesRef.current[i - 1] = img;
          if (currentFrameIndexRef.current === i - 1) {
            drawFrame(i - 1);
          }
        };
        framesRef.current[i - 1] = img;
      }
    };

    const preloadFirstFrame = () => {
      const img = new Image();
      img.src = FRAME_PATH(1);
      img.onload = () => {
        framesRef.current[0] = img;
        updateDimensions();
        drawFrame(0);
        // Stream remaining frames asynchronously
        preloadRemainingFrames();
      };
      framesRef.current[0] = img;
    };

    let rafPending = false;
    const handleScroll = () => {
      if (rafPending) return;
      rafPending = true;

      requestAnimationFrame(() => {
        const canvas = canvasRef.current;
        const textOverlay = textOverlayRef.current;
        const containerHeight = containerHeightRef.current;
        const stickyHeight = stickyHeightRef.current;
        if (!containerHeight || !stickyHeight) {
          rafPending = false;
          return;
        }

        const scrollTop = window.scrollY;
        if (scrollTop > containerHeight + 100) {
          rafPending = false;
          return;
        }

        const maxScroll = containerHeight - stickyHeight;
        const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
        const frameIndex = Math.min(Math.floor(progress * (FRAME_COUNT - 1)), FRAME_COUNT - 1);
        
        currentFrameIndexRef.current = frameIndex;
        drawFrame(frameIndex);

        if (textOverlay) {
          const isMobileViewport = window.innerWidth < 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
          if (isMobileViewport) {
            textOverlay.style.opacity = '0';
            textOverlay.style.display = 'none';
          } else {
            textOverlay.style.display = 'block';
            const textOffset = -scrollTop * 0.02;
            const opacity = scrollTop > 0 ? '0' : '1';
            textOverlay.style.opacity = opacity;
            textOverlay.style.transform = `translate3d(-50%, calc(-50% + ${textOffset}px), 0)`;
          }
        }

        rafPending = false;
      });
    };

    const handleResize = () => {
      dprRef.current = window.devicePixelRatio || 1;
      updateDimensions();
      drawFrame(currentFrameIndexRef.current);
    };

    // Initialize dimensions and trigger first draw
    dprRef.current = window.devicePixelRatio || 1;
    updateDimensions();
    preloadFirstFrame();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // New, isolated effect to add smooth, throttled parallax scrolling to the background video canvas element
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobileOrTouch = window.innerWidth < 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isMobileOrTouch) {
      canvas.style.transform = 'translateY(0px)';
      return;
    }

    let parallaxRafPending = false;

    const handleVideoParallaxScroll = () => {
      if (parallaxRafPending) return;
      parallaxRafPending = true;

      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        
        // Slower scroll speed: translates up by 12% of scroll, capped at -150px (to avoid layout shift or revealing black background)
        const backgroundOffset = Math.max(-scrollTop * 0.12, -150);
        canvas.style.transform = `translateY(${backgroundOffset}px)`;

        parallaxRafPending = false;
      });
    };

    window.addEventListener('scroll', handleVideoParallaxScroll, { passive: true });
    handleVideoParallaxScroll();

    return () => {
      window.removeEventListener('scroll', handleVideoParallaxScroll);
    };
  }, []);

  return (
    <div id="hero-scroll-container" ref={containerRef} className="relative h-[100dvh] md:h-[200dvh] w-full max-w-full overflow-x-hidden">
      <div id="hero-sticky" ref={stickyRef} className="sticky top-0 h-[100dvh] overflow-hidden w-full max-w-full">
        {/* Canvas for Desktop scroll animation */}
        <canvas
          id="hero-canvas"
          ref={canvasRef}
          className="absolute left-0 w-full hidden md:block h-full md:h-[calc(100dvh+150px)]"
          style={{ top: 0, willChange: 'transform' }}
        />
        
        {/* Hardware-accelerated Video for Mobile fluid playback */}
        {videoSrc ? (
          <video
            src={videoSrc}
            playsInline
            muted
            autoPlay
            loop
            preload="metadata"
            className="absolute left-0 top-0 w-full h-full object-cover md:hidden"
          />
        ) : (
          <div className="absolute inset-0 bg-[#1a1208] md:hidden" />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1208]/35 via-[#1a1208]/08 to-[#1a1208]/55 z-[1] pointer-events-none" />
        <div
          id="hero-text-overlay"
          ref={textOverlayRef}
          className={`absolute top-[calc(50%-45px)] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] text-center w-[90%] max-w-[600px] transition-opacity duration-100 pointer-events-none ${isMobileDevice ? 'hidden opacity-0' : ''}`}
          style={{ willChange: 'transform' }}
        >
          <img
            src="/valanam-new-logo.png"
            alt="Valanam Kitchen Logo - Café and Restaurant in Hyderabad"
            className="h-[65px] md:h-[160px] w-auto mx-auto mb-3 md:mb-5 block drop-shadow-none md:drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <h1 className="font-playfair text-[clamp(2.1rem,6vw,6rem)] tracking-[0.3em] text-parchment font-normal leading-[1] drop-shadow-none md:drop-shadow-[0_2px_30px_rgba(0,0,0,0.5)]">
            VALANAM
          </h1>
          <div className="font-playfair italic text-[clamp(0.85rem,2vw,1.3rem)] text-amber mt-2 md:mt-4 drop-shadow-none md:drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]">
            Where stories simmer, and flavors linger.
          </div>
        </div>
      </div>
    </div>
  );
}
