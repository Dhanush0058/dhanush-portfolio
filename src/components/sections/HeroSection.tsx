import { useRef, useState } from 'react';
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

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative pt-3 sm:pt-5 pb-12 px-4 sm:px-8 md:px-12 flex justify-center overflow-hidden w-full"
    >
      {/* Centered Framed Canvas Card (Balanced width with comfortable breathing room) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[1320px] 2xl:max-w-[1400px] bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-neutral-200/90 shadow-[0_20px_70px_-10px_rgba(0,0,0,0.07),0_1px_4px_rgba(0,0,0,0.02)] p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden flex flex-col justify-between"
      >
        {/* Subtle inner ambient texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(#111111 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* STEP 1: TOP BAR INSIDE THE CARD */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 flex items-center justify-between gap-4 mb-4 sm:mb-6"
        >
          {/* Left Brand Identity */}
          <a
            href="#home"
            className="font-display font-bold text-sm sm:text-base text-neutral-950 tracking-tight hover:text-neutral-700 transition-colors"
          >
            DHANUSH REDDY
          </a>

          {/* Quick Nav Links (matching screenshot) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-sans text-xs sm:text-sm font-medium text-neutral-600">
            <a href="#work" className="hover:text-neutral-950 transition-colors">
              Work <span className="font-mono text-neutral-400 text-xs">[2]</span>
            </a>
            <a href="#about" className="hover:text-neutral-950 transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-neutral-950 transition-colors">
              Stack
            </a>
            <a href="#education" className="hover:text-neutral-950 transition-colors">
              Education
            </a>
            <a href="#achievements" className="hover:text-neutral-950 transition-colors">
              Achievements
            </a>
            <a href="#contact" className="hover:text-neutral-950 transition-colors">
              Contact
            </a>
          </nav>

          {/* Let's Talk CTA Button */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 bg-neutral-950 text-white hover:bg-neutral-800 font-sans text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* STEP 2: HERO INFINITE DISPLAY TITLE MARQUEE (REPLACES STATIC NAME) */}
        <motion.div
          style={{ y: textParallaxY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full overflow-hidden pointer-events-none select-none py-2 sm:py-4"
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

        {/* STEP 3 & 4: CENTRAL PORTRAIT + FLANKING SUB-CONTENT & SOCIAL PILLS */}
        <div className="relative z-20 mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-end">
          {/* LEFT SUB-CONTENT: Title, Bio & Let's Collaborate (col-span-3) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3 order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left space-y-3 pb-2 md:pb-6"
          >
            <h2 className="font-display font-bold text-lg sm:text-xl text-neutral-950">
              AI / ML & Software Developer
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm font-normal max-w-xs leading-relaxed">
              Designing digital architectures and machine learning systems that are high-performance and scalable.
            </p>
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 bg-neutral-950 text-white hover:bg-neutral-800 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              >
                <span>Let's collaborate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* STEP 3: CENTRAL HERO PORTRAIT (ENLARGED TO col-span-6 DOMINATING CENTER, TIGHTER 70px REVEAL RADIUS) */}
          <motion.div
            style={{ scale: portraitScale, opacity: portraitOpacity }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 order-1 md:order-2 flex flex-col justify-end items-center -mt-8 sm:-mt-14 md:-mt-20 lg:-mt-24"
          >
            <div
              className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto overflow-hidden select-none cursor-crosshair flex justify-center items-end"
              onMouseMove={handlePortraitMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Base Layer: Full portrait rendered in grayscale (Enlarged) */}
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

          {/* RIGHT SOCIAL PILL BUTTONS (col-span-3) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3 order-3 flex flex-row md:flex-col items-center md:items-end justify-center md:justify-end gap-2.5 pb-2 md:pb-6"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.name !== 'Email' ? '_blank' : undefined}
                  rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="w-full sm:w-auto md:w-36 flex items-center justify-center md:justify-start gap-2.5 px-4 py-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-950 hover:text-white text-neutral-800 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:scale-[1.03] active:scale-[0.98]"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{social.name}</span>
                </a>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
