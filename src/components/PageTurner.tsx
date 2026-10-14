import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface PageItem {
  id: string;
  title: string;
  theme: 'light' | 'dark';
  component: React.ReactNode;
}

interface PageTurnerProps {
  pages: PageItem[];
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

export const PageTurner = ({ pages, currentPage, onPageChange }: PageTurnerProps) => {
  const [direction, setDirection] = useState<1 | -1>(1);
  const isAnimatingRef = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  const totalPages = pages.length;

  const goToPage = useCallback(
    (targetPage: number) => {
      if (isAnimatingRef.current) return;
      if (targetPage < 0 || targetPage >= totalPages) return;
      if (targetPage === currentPage) return;

      setDirection(targetPage > currentPage ? 1 : -1);
      isAnimatingRef.current = true;
      onPageChange(targetPage);

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 850);
    },
    [currentPage, totalPages, onPageChange]
  );

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [goToPage, currentPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [goToPage, currentPage]);

  // Wheel listener: Turn page on scroll
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout | null = null;
    let accumulatedDelta = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isAnimatingRef.current) return;

      accumulatedDelta += e.deltaY;

      if (wheelTimeout) clearTimeout(wheelTimeout);

      wheelTimeout = setTimeout(() => {
        if (Math.abs(accumulatedDelta) > 25) {
          if (accumulatedDelta > 0) {
            nextPage();
          } else {
            prevPage();
          }
        }
        accumulatedDelta = 0;
      }, 50);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [nextPage, prevPage]);

  // Keyboard navigation (Arrow keys & Page up/down)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        prevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage]);

  // Touch Swipe navigation for mobile & tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal swipe
      if (diffX > 40) nextPage();
      else if (diffX < -40) prevPage();
    } else {
      // Vertical swipe
      if (diffY > 50) nextPage();
      else if (diffY < -50) prevPage();
    }
  };

  const activePage = pages[currentPage];
  const isDark = activePage.theme === 'dark';

  // 3D Realistic Page Turn Variants
  const pageVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 0 : -100,
      scale: dir > 0 ? 0.95 : 1,
      x: dir > 0 ? 0 : -40,
      opacity: dir > 0 ? 0.8 : 0,
      filter: dir > 0 ? 'brightness(0.7)' : 'brightness(1)',
      zIndex: dir > 0 ? 10 : 30,
    }),
    center: {
      rotateY: 0,
      scale: 1,
      x: 0,
      opacity: 1,
      filter: 'brightness(1)',
      zIndex: 20,
      transition: {
        rotateY: { duration: 0.82, ease: [0.65, 0, 0.35, 1] },
        scale: { duration: 0.82, ease: [0.65, 0, 0.35, 1] },
        x: { duration: 0.82, ease: [0.65, 0, 0.35, 1] },
        opacity: { duration: 0.4 },
        filter: { duration: 0.6 },
      },
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -100 : 0,
      scale: dir > 0 ? 1 : 0.95,
      x: dir > 0 ? -40 : 0,
      opacity: dir > 0 ? 0 : 0.8,
      filter: dir > 0 ? 'brightness(0.6)' : 'brightness(0.7)',
      zIndex: dir > 0 ? 30 : 10,
      transition: {
        rotateY: { duration: 0.82, ease: [0.65, 0, 0.35, 1] },
        scale: { duration: 0.82, ease: [0.65, 0, 0.35, 1] },
        x: { duration: 0.82, ease: [0.65, 0, 0.35, 1] },
        opacity: { duration: 0.4, delay: 0.4 },
        filter: { duration: 0.7 },
      },
    }),
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ perspective: '2200px' }}
    >
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={currentPage}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
          className={`absolute inset-0 w-full h-full flex flex-col justify-center overflow-y-auto overflow-x-hidden ${
            isDark ? 'bg-[#0B0B0B] text-[#F5F5F5]' : 'bg-[#F5F5F5] text-[#111111]'
          }`}
        >
          {/* Authentic Book Spine Shadow on Left Edge */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-30 ${
              isDark
                ? 'bg-gradient-to-r from-black/60 to-transparent border-l-4 border-white/10'
                : 'bg-gradient-to-r from-black/15 to-transparent border-l-4 border-black/10'
            }`}
          />

          {/* Top-Right Book Folio Badge */}
          <div className="absolute top-5 right-6 sm:right-10 z-30 pointer-events-none font-mono text-[11px] sm:text-xs tracking-widest uppercase opacity-40">
            FOLIO {String(currentPage + 1).padStart(2, '0')} // {String(totalPages).padStart(2, '0')} • {activePage.title}
          </div>

          {/* Page Content Container */}
          <div className="w-full relative z-20">
            {activePage.component}
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default PageTurner;
