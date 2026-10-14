import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import StackedCard from '@/components/StackedCard';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ToolsSection from '@/components/sections/ToolsSection';
import AboutSection from '@/components/sections/AboutSection';
import EducationSection from '@/components/sections/EducationSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

const cardIds = [
  'home',
  'work',
  'about',
  'experience',
  'education',
  'skills',
  'tools',
  'certifications',
  'achievements',
  'contact',
];

const Index = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Initialize Lenis smooth inertia scrolling + Card-by-Card Wheel Stepper
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let isThrottled = false;

    // Card-by-card scroll stepper: Each scroll gesture transitions directly to the next/prev card
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 20) return;
      if (isThrottled) return;

      const currentScroll = window.scrollY;
      const windowH = window.innerHeight;
      const currentIndex = Math.round(currentScroll / windowH);

      let targetIndex = currentIndex;
      if (e.deltaY > 0) {
        targetIndex = Math.min(currentIndex + 1, cardIds.length);
      } else {
        targetIndex = Math.max(currentIndex - 1, 0);
      }

      if (targetIndex !== currentIndex) {
        e.preventDefault();
        isThrottled = true;

        if (targetIndex < cardIds.length) {
          const targetEl = document.getElementById(cardIds[targetIndex]);
          if (targetEl) {
            lenis.scrollTo(targetEl, { duration: 0.95 });
          } else {
            lenis.scrollTo(targetIndex * windowH, { duration: 0.95 });
          }
        } else {
          const footerEl = document.querySelector('footer');
          if (footerEl) {
            lenis.scrollTo(footerEl, { duration: 0.95 });
          }
        }

        setTimeout(() => {
          isThrottled = false;
        }, 700);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Smooth anchor navigation handler
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          lenis.scrollTo(element, { offset: 0, duration: 1.0 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-clip selection:bg-neutral-900 selection:text-white">
      {/* Subtle Ambient Background Texture */}
      <AnimatedBackground />

      {/* Top Floating Navigation with dynamic theme adaptation */}
      <Navigation />

      {/* Main Full-Page Sections with Sticky Card Stacking & 3D Scroll Physics */}
      <main className="relative w-full z-10">
        {/* Card 00: Hero [LIGHT THEME] */}
        <StackedCard id="home" theme="light" index={0} isFirst={true}>
          <HeroSection activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </StackedCard>

        {/* Card 01: Featured Work [DARK THEME] */}
        <StackedCard id="work" theme="dark" index={1}>
          <ProjectsSection activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </StackedCard>

        {/* Card 02: Identity & Bio [LIGHT THEME] */}
        <StackedCard id="about" theme="light" index={2}>
          <AboutSection />
        </StackedCard>

        {/* Card 03: Professional Career [LIGHT THEME] */}
        <StackedCard id="experience" theme="light" index={3}>
          <ExperienceSection />
        </StackedCard>

        {/* Card 04: Academic Record [DARK THEME] */}
        <StackedCard id="education" theme="dark" index={4}>
          <EducationSection />
        </StackedCard>

        {/* Card 05: Core Programming [LIGHT THEME] */}
        <StackedCard id="skills" theme="light" index={5}>
          <SkillsSection />
        </StackedCard>

        {/* Card 06: Development Arsenal [LIGHT THEME] */}
        <StackedCard id="tools" theme="light" index={6}>
          <ToolsSection />
        </StackedCard>

        {/* Card 07: Verified Credentials [DARK THEME] */}
        <StackedCard id="certifications" theme="dark" index={7}>
          <CertificationsSection />
        </StackedCard>

        {/* Card 08: Accolades & Honors [DARK THEME] */}
        <StackedCard id="achievements" theme="dark" index={8}>
          <AchievementsSection />
        </StackedCard>

        {/* Card 09: Dispatch & Transmission [LIGHT THEME] */}
        <StackedCard id="contact" theme="light" index={9} isLast={true}>
          <ContactSection />
        </StackedCard>
      </main>

      {/* Clean Minimalist Footer */}
      <div className="relative z-[80]">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
