import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowRight, Github, Linkedin, Mail, Sparkles, Terminal } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface HeroSectionProps {
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

const HeroSection = ({ activeFilter = 'All', onFilterChange }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [heroData, setHeroData] = useState({
    name: 'Dhanush Reddy',
    tagline: 'Crafting intelligent AI systems & high-performance software with razor-sharp precision.',
    role: 'B.Tech IT Student • AI/ML Explorer • Problem Solver',
  });

  // Parallax scroll effect for watermark
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const watermarkX = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.8], [0.06, 0.01]);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const docRef = doc(db, 'content', 'hero');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setHeroData((prev) => ({
            ...prev,
            ...data,
          }));
        }
      } catch {
        // Fallback to default state
      }
    };
    fetchHeroData();
  }, []);

  const filterTags = ['All', 'AI / ML', 'Python', 'Web Apps', 'Systems'];

  const handleFilterClick = (tag: string) => {
    if (onFilterChange) {
      onFilterChange(tag);
    }
    const projectsElem = document.getElementById('work') || document.getElementById('projects');
    if (projectsElem) {
      projectsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleWords = ['/SELECTED', 'WORK'];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[92vh] pt-24 pb-12 sm:pt-32 sm:pb-16 flex items-center justify-center px-4 sm:px-6 overflow-hidden"
    >
      {/* Background Watermark Text: "PORTFOLIO" with Parallax */}
      <motion.div
        style={{ x: watermarkX, opacity: watermarkOpacity }}
        className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap z-0 font-display font-black text-[18vw] leading-none text-neutral-900 tracking-tighter"
      >
        PORTFOLIO
      </motion.div>

      {/* Main Elevated Framed Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl bg-white/95 backdrop-blur-xl border border-neutral-200/90 rounded-3xl p-6 sm:p-10 md:p-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]"
      >
        {/* Subtle Decorative Grid Pattern inside Card */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#111111 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* TOP OF HERO SECTION: GOJO STYLE PICTURE AVATAR & BADGE */}
        <div className="relative flex flex-col items-center text-center mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative"
          >
            {/* Ambient Aura */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500" />

            {/* Gojo Picture Frame */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-neutral-950 bg-neutral-100 shadow-[4px_4px_0px_#111111] transition-transform duration-300 group-hover:-translate-y-1">
              <img
                src="/GojoStylePicture.png"
                alt="Dhanush Reddy — Gojo Style Portrait"
                className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[1.02] group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Status Pill on Picture */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-950 text-white font-mono text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full border border-neutral-800 shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Limitless Mindset</span>
            </div>
          </motion.div>

          {/* Subtitle / Identity */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
          >
            <span className="font-mono text-xs sm:text-sm font-semibold text-neutral-500 uppercase tracking-wider">
              {heroData.name}
            </span>
            <span className="text-neutral-300">•</span>
            <span className="font-mono text-xs sm:text-sm text-neutral-600">
              B.Tech IT @ VJIT
            </span>
            <span className="text-neutral-300">•</span>
            <span className="inline-flex items-center gap-1 font-mono text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              9.33 CGPA
            </span>
          </motion.div>
        </div>

        {/* PRIMARY FOREGROUND TEXT: "/SELECTED WORK" (SLIDING TEXT STAGGER REVEAL) */}
        <div className="relative text-center my-6 sm:my-8 overflow-hidden">
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-8xl tracking-tighter uppercase text-neutral-950 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 leading-[0.95]">
            {titleWords.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 0.85,
                    delay: 0.3 + wordIndex * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            {heroData.tagline}
          </motion.p>
        </div>

        {/* Quick Social & Terminal Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex items-center justify-center gap-3 mb-8 sm:mb-10"
        >
          <a
            href="https://github.com/Dhanush0058"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-neutral-200 hover:border-neutral-900 bg-neutral-50 hover:bg-neutral-900 text-neutral-700 hover:text-white transition-all duration-200 shadow-sm"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/dhanushreddy"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-neutral-200 hover:border-neutral-900 bg-neutral-50 hover:bg-neutral-900 text-neutral-700 hover:text-white transition-all duration-200 shadow-sm"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:dhanushreddy672@gmail.com"
            className="p-2.5 rounded-full border border-neutral-200 hover:border-neutral-900 bg-neutral-50 hover:bg-neutral-900 text-neutral-700 hover:text-white transition-all duration-200 shadow-sm"
            aria-label="Email Me"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="#skills"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 text-xs font-mono text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 bg-neutral-50/50 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-neutral-500" />
            <span>Python • Java • AI</span>
          </a>
        </motion.div>

        {/* SUB-NAVIGATION / FILTER BAR */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6 border-t border-neutral-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs"
        >
          {/* Left: Minimal Inline Filter Tags */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
            <span className="text-neutral-400 mr-1 hidden md:inline">FILTER:</span>
            {filterTags.map((tag) => {
              const isSelected = activeFilter === tag;
              return (
                <button
                  key={tag}
                  onClick={() => handleFilterClick(tag)}
                  className={`px-3 py-1 rounded-full border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-950 text-white border-neutral-950 font-semibold shadow-sm'
                      : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                  }`}
                >
                  [ {tag} ]
                </button>
              );
            })}
          </div>

          {/* Right: Hoverable Link Pointing to View all work -> */}
          <a
            href="#work"
            className="group inline-flex items-center gap-1.5 font-semibold text-neutral-900 hover:text-neutral-600 transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            <span>View all work</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
