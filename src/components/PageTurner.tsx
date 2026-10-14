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
  const lastScrollTop = useRef(0);
  const touchStartY = useRef(0);

  const totalPages = pages.length;

  const goToPage = useCallback(
    (targetPage: number) => {
      if (isAnimatingRef.current) return;
      if (targetPage < 0 || targetPage >= totalPages) return;
      if (targetPage === currentPage) return;

      const isForward = targetPage > currentPage;
      setDirection(isForward ? 1 : -1);
      isAnimatingRef.current = true;
      onPageChange(targetPage);

      setTimeout(() => {
        isAnimatingRef.current = false;
        lastScrollTop.current = 0;
        const container = document.getElementById(`page-scroll-${targetPage}`);
        if (container) {
          container.scrollTop = 0;
        }
      }, 780);
    },
    [currentPage, totalPages, onPageChange]
  );

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [goToPage, currentPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [goToPage, currentPage]);

  // Reset scroll position on page change
  useEffect(() => {
    const container = document.getElementById(`page-scroll-${currentPage}`);
    if (container) {
      container.scrollTop = 0;
    }
    lastScrollTop.current = 0;
  }, [currentPage]);

  // Robust Vertical Wheel Scroll:
  // - Works across ALL pages (Hero, Work, About, Experience, Education, Skills, Tools, Certs, Achievements, Contact)
  // - If content overflows, allows user to read to the bottom before turning
  // - Dynamically queries the active page container by ID so refs never get detached/nulled on unmount
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      // Prevent multiple page turns during active animation
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      const container = document.getElementById(`page-scroll-${currentPage}`);
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const remainingScrollDown = scrollHeight - scrollTop - clientHeight;
      const isNotScrollable = scrollHeight <= clientHeight + 15;
      const isAtBottom =
        remainingScrollDown <= 25 ||
        (scrollTop > 0 && Math.abs(scrollTop - lastScrollTop.current) < 1);
      const isAtTop = scrollTop <= 15;

      // Scrolling Down (Next Page)
      if (e.deltaY > 0) {
        if (isNotScrollable || isAtBottom) {
          e.preventDefault();
          if (wheelTimeout) clearTimeout(wheelTimeout);
          wheelTimeout = setTimeout(() => {
            nextPage();
          }, 20);
        }
      }
      // Scrolling Up (Previous Page)
      else if (e.deltaY < 0) {
        if (isNotScrollable || isAtTop) {
          e.preventDefault();
          if (wheelTimeout) clearTimeout(wheelTimeout);
          wheelTimeout = setTimeout(() => {
            prevPage();
          }, 20);
        }
      }

      lastScrollTop.current = container.scrollTop;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [nextPage, prevPage, currentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = document.getElementById(`page-scroll-${currentPage}`);
      const remainingScrollDown = container
        ? container.scrollHeight - container.scrollTop - container.clientHeight
        : 0;
      const isAtBottom =
        !container || container.scrollHeight <= container.clientHeight + 15 || remainingScrollDown <= 25;
      const isAtTop = !container || container.scrollTop <= 15;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight') {
        if (isAtBottom) {
          e.preventDefault();
          nextPage();
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
        if (isAtTop) {
          e.preventDefault();
          prevPage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage, currentPage]);

  // Touch Swipe for mobile & tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const container = document.getElementById(`page-scroll-${currentPage}`);
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    const remainingScrollDown = container
      ? container.scrollHeight - container.scrollTop - container.clientHeight
      : 0;
    const isAtBottom =
      !container || container.scrollHeight <= container.clientHeight + 15 || remainingScrollDown <= 25;
    const isAtTop = !container || container.scrollTop <= 15;

    if (diffY > 40) {
      if (isAtBottom) nextPage();
    } else if (diffY < -40) {
      if (isAtTop) prevPage();
    }
  };

  const activePage = pages[currentPage];
  const isDark = activePage?.theme === 'dark';

  // 3D Vertical Page Turn Physics:
  // Forward (dir > 0): active page flips UP into the sky, revealing the next page underneath
  // Backward (dir < 0): previous page flips DOWN from the sky into place, covering the page underneath
  const pageVariants = {
    enter: (dir: number) => ({
      rotateX: dir > 0 ? 0 : -85,
      scale: dir > 0 ? 0.96 : 1,
      y: dir > 0 ? 0 : -35,
      opacity: dir > 0 ? 0.8 : 0,
      filter: dir > 0 ? 'brightness(0.75)' : 'brightness(1)',
      zIndex: dir > 0 ? 10 : 30,
    }),
    center: {
      rotateX: 0,
      scale: 1,
      y: 0,
      opacity: 1,
      filter: 'brightness(1)',
      zIndex: 20,
      transition: {
        rotateX: { duration: 0.75, ease: [0.65, 0, 0.35, 1] },
        scale: { duration: 0.75, ease: [0.65, 0, 0.35, 1] },
        y: { duration: 0.75, ease: [0.65, 0, 0.35, 1] },
        opacity: { duration: 0.35 },
        filter: { duration: 0.5 },
      },
    },
    exit: (dir: number) => ({
      rotateX: dir > 0 ? -85 : 0,
      scale: dir > 0 ? 1 : 0.96,
      y: dir > 0 ? -35 : 0,
      opacity: dir > 0 ? 0 : 0.8,
      filter: dir > 0 ? 'brightness(0.65)' : 'brightness(0.75)',
      zIndex: dir > 0 ? 30 : 10,
      transition: {
        rotateX: { duration: 0.75, ease: [0.65, 0, 0.35, 1] },
        scale: { duration: 0.75, ease: [0.65, 0, 0.35, 1] },
        y: { duration: 0.75, ease: [0.65, 0, 0.35, 1] },
        opacity: { duration: 0.35, delay: dir > 0 ? 0.35 : 0 },
        filter: { duration: 0.6 },
      },
    }),
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ perspective: '2000px' }}
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
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
          className={`absolute inset-0 w-full h-full ${
            isDark ? 'bg-[#0B0B0B] text-[#F5F5F5]' : 'bg-[#F5F5F5] text-[#111111]'
          }`}
        >
          {/* Top Page Spine / Binder Crease */}
          <div
            className={`absolute top-0 left-0 right-0 h-4 pointer-events-none z-30 ${
              isDark
                ? 'bg-gradient-to-b from-black/80 to-transparent border-t-2 border-white/10'
                : 'bg-gradient-to-b from-black/15 to-transparent border-t-2 border-black/10'
            }`}
          />

          {/* Top-Right Folio Marker */}
          <div className="absolute top-4 right-6 sm:right-10 z-30 pointer-events-none font-mono text-[11px] sm:text-xs tracking-widest uppercase opacity-40">
            PAGE {String(currentPage + 1).padStart(2, '0')} // {String(totalPages).padStart(2, '0')} • {activePage?.title}
          </div>

          {/* Dynamic Scrollable Page Canvas by ID */}
          <div
            id={`page-scroll-${currentPage}`}
            className={`w-full h-full overflow-y-auto overflow-x-hidden flex flex-col justify-start overscroll-contain ${
              activePage?.id === 'home' ? 'pt-2 sm:pt-3 pb-6' : 'py-8 sm:py-12'
            }`}
          >
            <div className={`w-full relative z-20 ${activePage?.id === 'home' ? 'mt-1 mb-auto' : 'my-auto'}`}>
              {activePage?.component}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTurner;
