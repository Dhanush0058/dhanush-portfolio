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

const Index = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Initialize Lenis smooth inertia scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

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
          lenis.scrollTo(element, { offset: 0, duration: 1.2 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
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
      <main className="relative z-10">
        {/* Section 01: Hero [LIGHT THEME] */}
        <StackedCard id="home" theme="light" zIndex={10} isFirst={true}>
          <HeroSection activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </StackedCard>

        {/* Section 02: Featured Work [DARK THEME] */}
        <StackedCard id="work" theme="dark" zIndex={20}>
          <ProjectsSection activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </StackedCard>

        {/* Section 03: Identity & Bio [LIGHT THEME] */}
        <StackedCard id="about" theme="light" zIndex={30}>
          <AboutSection />
        </StackedCard>

        {/* Section 04: Professional Career [LIGHT THEME] */}
        <StackedCard id="experience" theme="light" zIndex={35}>
          <ExperienceSection />
        </StackedCard>

        {/* Section 05: Academic Record [DARK THEME] */}
        <StackedCard id="education" theme="dark" zIndex={40}>
          <EducationSection />
        </StackedCard>

        {/* Section 06: Core Programming [LIGHT THEME] */}
        <StackedCard id="skills" theme="light" zIndex={50}>
          <SkillsSection />
        </StackedCard>

        {/* Section 07: Development Arsenal [LIGHT THEME] */}
        <StackedCard id="tools" theme="light" zIndex={55}>
          <ToolsSection />
        </StackedCard>

        {/* Section 08: Verified Credentials [DARK THEME] */}
        <StackedCard id="certifications" theme="dark" zIndex={60}>
          <CertificationsSection />
        </StackedCard>

        {/* Section 09: Accolades & Honors [DARK THEME] */}
        <StackedCard id="achievements" theme="dark" zIndex={65}>
          <AchievementsSection />
        </StackedCard>

        {/* Section 10: Dispatch & Transmission [LIGHT THEME] */}
        <StackedCard id="contact" theme="light" zIndex={70} isLast={true}>
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
