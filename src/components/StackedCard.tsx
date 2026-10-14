import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StackedCardProps {
  children: React.ReactNode;
  id?: string;
  theme: 'light' | 'dark';
  zIndex: number;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
}

export const StackedCard = ({
  children,
  id,
  theme,
  zIndex,
  isFirst = false,
  isLast = false,
  className = '',
}: StackedCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this card relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth scale-down and dimming as the next card slides up and covers this one
  const scale = useTransform(scrollYProgress, [0, 0.95], [1, isLast ? 1 : 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.95], [1, isLast ? 1 : 0.6]);

  const isDark = theme === 'dark';

  return (
    <div
      ref={containerRef}
      id={id}
      data-theme={theme}
      style={{ zIndex }}
      className={`relative w-full ${isLast ? 'min-h-screen' : 'min-h-[110vh] sm:min-h-[118vh]'}`}
    >
      <motion.section
        aria-label={id}
        style={{
          scale,
          opacity,
          transformOrigin: 'top center',
        }}
        className={`sticky top-0 w-full min-h-screen flex flex-col justify-center overflow-x-hidden will-change-transform ${
          !isFirst ? 'rounded-t-[2.5rem] sm:rounded-t-[3.5rem]' : ''
        } ${
          isDark
            ? 'section-dark bg-[#0B0B0B] text-[#F5F5F5] border-t border-white/15 shadow-[0_-25px_60px_rgba(0,0,0,0.85)]'
            : !isFirst
            ? 'section-light bg-[#F5F5F5] text-[#111111] border-t border-black/10 shadow-[0_-20px_50px_rgba(0,0,0,0.12)]'
            : 'section-light bg-[#F5F5F5] text-[#111111]'
        } ${className}`}
      >
        {children}
      </motion.section>
    </div>
  );
};

export default StackedCard;
