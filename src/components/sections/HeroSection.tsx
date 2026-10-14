import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, Code } from 'lucide-react';

interface HeroSectionProps {
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

const HeroSection = ({ activeFilter = 'All', onFilterChange }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isHovered, setIsHovered] = useState(false);

  // Ultra-Smooth Choreographed Rise Sequence (NO blur, pure smooth upward rise):
  // Stage 0: Initialized
  // Stage 1: Big Name rises smoothly from down to up (at 100ms)
  // Stage 2: Picture / Photo rises smoothly from down to up (at 650ms)
  // Stage 3: Remaining all (Bio, CTA button, Social pills) rise into place (at 1200ms)
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 650);
    const t3 = setTimeout(() => setStage(3), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Scroll physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax on big text (moves slower than scroll)
  const textParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);

  // Hero section compression as user scrolls down
  const portraitScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.45]);

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/Dhanush0058',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/dhanush-reddy-50551b309/',
      icon: Linkedin,
    },
    {
      name: 'Email',
      href: 'mailto:dhanushr672@gmail.com',
      icon: Mail,
    },
    {
      name: 'LeetCode',
      href: 'https://leetcode.com',
      icon: Code,
    },
  ];

  // Silky smooth luxury deceleration curve
  const smoothEase = [0.22, 1, 0.36, 1];

  return (
    <div
      ref={containerRef}
      className="relative w-full pt-1 sm:pt-2 pb-4 px-3 sm:px-6 md:px-10 flex flex-col justify-start overflow-hidden"
    >
      {/* Centered Framed Canvas Card (Tight top margins to remove dead space) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: smoothEase }}
        className="relative w-full max-w-[1320px] 2xl:max-w-[1400px] mx-auto bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-black/10 shadow-[0_20px_70px_-10px_rgba(0,0,0,0.07),0_1px_4px_rgba(0,0,0,0.02)] p-5 sm:p-7 md:p-8 lg:p-9 overflow-hidden flex flex-col justify-between"
      >
        {/* Subtle inner ambient texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(#111111 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* TOP BAR: BRAND + NAV + CTA */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : -15 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="relative z-20 flex items-center justify-between gap-4 mb-3 sm:mb-4"
        >
          {/* Left Brand Identity */}
          <a
            href="#home"
            className="font-display font-bold text-sm sm:text-base text-[#111111] tracking-tight hover:text-neutral-700 transition-colors"
          >
            DHANUSH REDDY
          </a>

          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-sans text-xs sm:text-sm font-medium text-[#666666]">
            <a href="#work" className="hover:text-[#111111] transition-colors">
              Work <span className="font-mono text-neutral-400 text-xs">[2]</span>
            </a>
            <a href="#about" className="hover:text-[#111111] transition-colors">
              About
            </a>
            <a href="#education" className="hover:text-[#111111] transition-colors">
              Education
            </a>
            <a href="#skills" className="hover:text-[#111111] transition-colors">
              Stack
            </a>
            <a href="#achievements" className="hover:text-[#111111] transition-colors">
              Accolades
            </a>
            <a href="#contact" className="hover:text-[#111111] transition-colors">
              Contact
            </a>
          </nav>

          {/* Let's Talk CTA Button */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 bg-neutral-950 text-white hover:bg-neutral-800 font-sans text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* SEQUENCE STEP 1: FIRST — BIG NAME RISES SMOOTHLY FROM DOWN TO UP */}
        <motion.div
          style={{ y: textParallaxY }}
          initial={{ opacity: 0, y: 55, scale: 0.96 }}
          animate={{
            opacity: stage >= 1 ? 1 : 0,
            y: stage >= 1 ? 0 : 55,
            scale: stage >= 1 ? 1 : 0.96,
          }}
          transition={{ duration: 0.85, ease: smoothEase }}
          className="relative z-10 w-full overflow-hidden pointer-events-none select-none py-1 sm:py-3"
        >
          <div className="flex w-full overflow-hidden">
            <div className="flex shrink-0 animate-marquee items-center justify-around">
              {[...Array(4)].map((_, i) => (
                <div
                  key={`m1-${i}`}
                  className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase inline-flex items-center gap-3 sm:gap-5 mx-6 sm:mx-10"
                >
                  <span className="text-stroke">DHANUSH</span>
                  <span className="text-neutral-950">REDDY</span>
                  <span className="text-neutral-300 font-light mx-4 select-none">—</span>
                </div>
              ))}
            </div>
            <div className="flex shrink-0 animate-marquee items-center justify-around" aria-hidden="true">
              {[...Array(4)].map((_, i) => (
                <div
                  key={`m2-${i}`}
                  className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase inline-flex items-center gap-3 sm:gap-5 mx-6 sm:mx-10"
                >
                  <span className="text-stroke">DHANUSH</span>
                  <span className="text-neutral-950">REDDY</span>
                  <span className="text-neutral-300 font-light mx-4 select-none">—</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* SEQUENCE STEP 2 & 3: PICTURE RISES (SECOND), THEN REMAINING ALL RISES (THIRD) */}
        <div className="relative z-20 mt-2 sm:mt-4 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-end">
          {/* STEP 3 (REMAINING ALL): Title, Bio & Let's Collaborate */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{
              opacity: stage >= 3 ? 1 : 0,
              y: stage >= 3 ? 0 : 35,
            }}
            transition={{ duration: 0.75, ease: smoothEase }}
            className="md:col-span-3 order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left space-y-3 pb-2 md:pb-5"
          >
            <h2 className="font-display font-bold text-lg sm:text-xl text-neutral-950">
              AI / ML & Software Developer
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm font-normal max-w-xs leading-relaxed">
              Designing digital architectures and machine learning systems that are high-performance and scalable.
            </p>
            <div className="pt-1 sm:pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 bg-neutral-950 text-white hover:bg-neutral-800 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              >
                <span>Let's collaborate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* STEP 2: PICTURE ENTERS SECOND — CLEAN, SHARP RISE FROM DOWN TO UP (NO BLUR) */}
          <motion.div
            style={{ scale: portraitScale, opacity: portraitOpacity }}
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{
              opacity: stage >= 2 ? 1 : 0,
              y: stage >= 2 ? 0 : 80,
              scale: stage >= 2 ? 1 : 0.95,
            }}
            transition={{ duration: 0.95, ease: smoothEase }}
            className="md:col-span-6 order-1 md:order-2 flex flex-col justify-end items-center -mt-8 sm:-mt-14 md:-mt-20 lg:-mt-24"
          >
            <div
              className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto overflow-hidden select-none cursor-crosshair flex justify-center items-end"
              onMouseMove={handlePortraitMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Base Layer: Full portrait rendered in grayscale — 100% crisp, no blur */}
              <img
                src="/portrait-cutout.png"
                alt="Dhanush Reddy — Grayscale Portrait"
                className="w-full max-h-[70vh] object-contain filter grayscale contrast-110 pointer-events-none transition-transform duration-500 ease-out"
              />

              {/* Masked Gojo Layer: Tighter focused 70px radius spotlight */}
              <img
                src="/gojo-cutout.png"
                alt="Dhanush Reddy — Gojo Style Mode Reveal"
                className="absolute inset-0 w-full max-h-[70vh] object-contain mx-auto pointer-events-none transition-opacity duration-200"
                style={{
                  opacity: isHovered ? 1 : 0,
                  WebkitClipPath: `circle(70px at ${mousePos.x}px ${mousePos.y}px)`,
                  clipPath: `circle(70px at ${mousePos.x}px ${mousePos.y}px)`,
                }}
              />
            </div>
          </motion.div>

          {/* STEP 3 (REMAINING ALL): RIGHT SOCIAL PILL BUTTONS (Cascading smooth rise) */}
          <div className="md:col-span-3 order-3 flex flex-row md:flex-col items-center md:items-end justify-center md:justify-end gap-2.5 pb-2 md:pb-5">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={social.name !== 'Email' ? '_blank' : undefined}
                  rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{
                    opacity: stage >= 3 ? 1 : 0,
                    y: stage >= 3 ? 0 : 25,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: stage >= 3 ? index * 0.07 : 0,
                    ease: smoothEase,
                  }}
                  className="w-full sm:w-auto md:w-36 flex items-center justify-center md:justify-start gap-2.5 px-4 py-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-950 hover:text-white text-neutral-800 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:scale-[1.03] active:scale-[0.98]"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{social.name}</span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
