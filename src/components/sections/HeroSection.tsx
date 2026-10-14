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
  const [isGojoMode, setIsGojoMode] = useState(false);

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
      className="relative pt-4 sm:pt-6 md:pt-8 pb-12 px-3 sm:px-6 lg:px-8 flex justify-center overflow-hidden"
    >
      {/* Centered Framed Canvas Card (matching the exact reference screenshot) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-6xl bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-neutral-200/90 shadow-[0_20px_70px_-10px_rgba(0,0,0,0.07),0_1px_4px_rgba(0,0,0,0.02)] p-6 sm:p-10 md:p-12 lg:p-14 overflow-hidden flex flex-col justify-between"
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
          className="relative z-20 flex items-center justify-between gap-4 mb-6 sm:mb-10"
        >
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-xs sm:text-sm font-medium text-neutral-800">
              Available for New Project
            </span>
          </div>

          {/* Quick Nav Links (matching screenshot) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-sans text-xs sm:text-sm font-medium text-neutral-600">
            <a href="#work" className="hover:text-neutral-950 transition-colors">
              Work <span className="font-mono text-neutral-400 text-xs">[4]</span>
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

        {/* STEP 2: MAIN GIANT TYPOGRAPHY WITH PARALLAX */}
        <motion.div
          style={{ y: textParallaxY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center select-none pt-2 sm:pt-4"
        >
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none uppercase flex items-center justify-center flex-wrap gap-x-3 sm:gap-x-6">
            <span className="text-stroke">DHANUSH</span>
            <span className="text-neutral-950">REDDY</span>
          </h1>
        </motion.div>

        {/* STEP 3 & 4: CENTRAL PORTRAIT + FLANKING SUB-CONTENT & SOCIAL PILLS */}
        <div className="relative z-20 mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          {/* LEFT SUB-CONTENT: Title, Bio & Let's Collaborate */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left space-y-3 pb-2 md:pb-6"
          >
            <h2 className="font-display font-black text-xl sm:text-2xl text-neutral-950">
              AI / ML & Software Developer
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm font-normal max-w-xs leading-relaxed">
              Designing digital architectures and machine learning systems that are high-performance,
              scalable, and conversion focused.
            </p>
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 bg-neutral-950 text-white hover:bg-neutral-800 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              >
                <span>Let's collaborate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* STEP 3: CENTRAL HERO PORTRAIT CUTOUT WITH RADIAL CURSOR REVEAL */}
          <motion.div
            style={{ scale: portraitScale, opacity: portraitOpacity }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 order-1 md:order-2 flex flex-col justify-end items-center -mt-6 sm:-mt-10 md:-mt-16 lg:-mt-20"
          >
            <div
              className="relative w-full max-w-lg lg:max-w-xl mx-auto overflow-hidden select-none cursor-crosshair"
              onMouseMove={handlePortraitMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Base Layer: Full portrait rendered in grayscale */}
              <img
                src="/portrait-cutout.png"
                alt="Dhanush Reddy — Grayscale Portrait"
                className="w-full max-h-[62vh] object-contain filter grayscale contrast-110 pointer-events-none transition-transform duration-500 ease-out"
              />

              {/* Masked Color Layer (Reveals only under cursor within ~125px) */}
              <img
                src={isGojoMode ? '/gojo-cutout.png' : '/portrait-cutout.png'}
                alt="Dhanush Reddy — Color Reveal"
                className="absolute inset-0 w-full max-h-[62vh] object-contain pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: isHovered ? 1 : 0,
                  WebkitClipPath: `circle(125px at ${mousePos.x}px ${mousePos.y}px)`,
                  clipPath: `circle(125px at ${mousePos.x}px ${mousePos.y}px)`,
                }}
              />
            </div>

            {/* Mode Switch Pill: Natural Color vs Gojo Mode */}
            <div className="mt-2 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setIsGojoMode((prev) => !prev)}
                className="font-mono text-[11px] px-3.5 py-1 rounded-full border border-neutral-200 bg-white hover:border-neutral-900 text-neutral-700 hover:text-neutral-950 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
                title="Toggle between natural color lens and Gojo mode spotlight"
              >
                <span className="text-neutral-400">Spotlight:</span>
                <span className="font-bold text-neutral-900">
                  {isGojoMode ? '⚡ Gojo Mode' : '🎨 Natural Color'}
                </span>
              </button>
            </div>
          </motion.div>

          {/* RIGHT SOCIAL PILL BUTTONS */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 order-3 flex flex-row md:flex-col items-center md:items-end justify-center md:justify-end gap-2.5 pb-2 md:pb-6"
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
