import React, { useEffect, useRef } from 'react';

const FRAME_COUNT = 114;
const FRAME_PATH = (n) => `/valanam zip/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const textOverlayRef = useRef(null);
  const framesRef = useRef([]);

  // Refs for layout caching to avoid forced reflows (layout thrashing)
  const canvasWidthRef = useRef(0);
  const canvasHeightRef = useRef(0);
  const containerHeightRef = useRef(0);
  const currentFrameIndexRef = useRef(0);
  const dprRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    let lastDrawnFrame = -1;

    const updateDimensions = () => {
      const container = containerRef.current;
      if (!canvas || !container) return;
      canvasWidthRef.current = canvas.offsetWidth;
      canvasHeightRef.current = canvas.offsetHeight;
      containerHeightRef.current = container.offsetHeight;
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
        if (!containerHeight) {
          rafPending = false;
          return;
        }

        const scrollTop = window.scrollY;
        const maxScroll = containerHeight - window.innerHeight;
        const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
        const frameIndex = Math.min(Math.floor(progress * (FRAME_COUNT - 1)), FRAME_COUNT - 1);
        
        currentFrameIndexRef.current = frameIndex;
        drawFrame(frameIndex);

        if (canvas) {
          // 90% scroll speed: translates up by 10% of scroll, capped at -150px
          const backgroundOffset = Math.max(-scrollTop * 0.1, -150);
          canvas.style.transform = `translate3d(0, ${backgroundOffset}px, 0)`;
        }

        if (textOverlay) {
          // 98% scroll speed: translates up by 2% of scroll
          const textOffset = -scrollTop * 0.02;
          textOverlay.style.opacity = String(Math.max(1 - progress * 3, 0));
          textOverlay.style.transform = `translate3d(-50%, calc(-50% + ${textOffset}px), 0)`;
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

  return (
    <div id="hero-scroll-container" ref={containerRef} className="relative h-[200vh]">
      <div id="hero-sticky" className="sticky top-0 h-screen overflow-hidden">
        <canvas
          id="hero-canvas"
          ref={canvasRef}
          className="absolute left-0 w-full block"
          style={{ height: 'calc(100vh + 150px)', top: 0, willChange: 'transform' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1208]/35 via-[#1a1208]/08 to-[#1a1208]/55 z-[1] pointer-events-none" />
        <div
          id="hero-text-overlay"
          ref={textOverlayRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] text-center w-[90%] max-w-[600px] transition-opacity duration-100 pointer-events-none"
          style={{ willChange: 'transform' }}
        >
          <img
            src="/valanam-new-logo.png"
            alt="Valanam Logo"
            className="h-[160px] w-auto mx-auto mb-5 block drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="font-playfair text-[clamp(2.8rem,6vw,6rem)] tracking-[0.3em] text-parchment font-normal leading-[1] drop-shadow-[0_2px_30px_rgba(0,0,0,0.5)]">
            VALANAM
          </div>
          <div className="font-playfair italic text-[clamp(0.95rem,2vw,1.3rem)] text-amber mt-4 drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]">
            Where stories simmer, and flavors linger.
          </div>
        </div>
      </div>
    </div>
  );
}
