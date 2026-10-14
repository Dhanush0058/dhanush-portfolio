import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StackedCardProps {
  children: React.ReactNode;
  id?: string;
  theme: 'light' | 'dark';
  index: number;
  totalCards?: number;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
}

export const StackedCard = ({
  children,
  id,
  theme,
  index,
  totalCards = 10,
  isFirst = false,
  isLast = false,
  className = '',
}: StackedCardProps) => {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 900
  );

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardTop = index * windowHeight;
  const nextCardTop = (index + 1) * windowHeight;

  // 3D Stacking Physics: As incoming card slides up over this card, scale down, dim & pull back
  const scale = useTransform(
    scrollY,
    [cardTop, nextCardTop],
    [1, isLast ? 1 : 0.90]
  );

  const opacity = useTransform(
    scrollY,
    [cardTop, nextCardTop],
    [1, isLast ? 1 : 0.35]
  );

  const y = useTransform(
    scrollY,
    [cardTop, nextCardTop],
    [0, isLast ? 0 : -25]
  );

  const filter = useTransform(
    scrollY,
    [cardTop, nextCardTop],
    ['brightness(1)', isLast ? 'brightness(1)' : 'brightness(0.6)']
  );

  const isDark = theme === 'dark';
  const zIndex = 10 + index * 5;

  return (
    <motion.section
      id={id}
      data-theme={theme}
      aria-label={id}
      style={{
        zIndex,
        scale,
        opacity,
        y,
        filter,
        transformOrigin: 'top center',
      }}
      className={`sticky top-0 w-full min-h-screen flex flex-col justify-center overflow-x-hidden will-change-transform snap-start ${
        !isFirst ? 'rounded-t-[2.5rem] sm:rounded-t-[3.5rem]' : ''
      } ${
        isDark
          ? 'section-dark bg-[#0B0B0B] text-[#F5F5F5] border-t-2 border-white/20 shadow-[0_-30px_70px_rgba(0,0,0,0.95),0_-6px_20px_rgba(0,0,0,0.7)]'
          : !isFirst
          ? 'section-light bg-[#F5F5F5] text-[#111111] border-t-2 border-black/15 shadow-[0_-25px_60px_rgba(0,0,0,0.18),0_-4px_15px_rgba(0,0,0,0.08)]'
          : 'section-light bg-[#F5F5F5] text-[#111111]'
      } ${className}`}
    >
      {/* Visual Card Stack Top Notch Pill */}
      {!isFirst && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div
            className={`w-12 h-1.5 rounded-full ${
              isDark ? 'bg-white/25' : 'bg-black/20'
            }`}
          />
        </div>
      )}
      {children}
    </motion.section>
  );
};

export default StackedCard;
