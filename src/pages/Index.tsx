import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
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
    <div className="relative min-h-screen bg-background overflow-x-hidden selection:bg-neutral-900 selection:text-white">
      {/* Subtle Ambient Background Texture */}
      <AnimatedBackground />

      {/* Top Floating Navigation with dynamic theme adaptation */}
      <Navigation />

      {/* Main Full-Page Sections with Strict Alternating Light/Dark Themes & Curtain Reveal */}
      <main className="relative z-10 snap-page">
        {/* Section 01: Hero [LIGHT THEME] */}
        <HeroSection activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Section 02: Featured Work [DARK THEME] */}
        <ProjectsSection activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Section 03: About & Experience [LIGHT THEME] */}
        <AboutSection />
        <ExperienceSection />

        {/* Section 04: Education [DARK THEME] */}
        <EducationSection />

        {/* Section 05: Core Programming & Stack [LIGHT THEME] */}
        <SkillsSection />
        <ToolsSection />

        {/* Section 06: Certifications & Accolades [DARK THEME] */}
        <CertificationsSection />
        <AchievementsSection />

        {/* Section 07: Contact / Get in Touch [LIGHT THEME] */}
        <ContactSection />
      </main>

      {/* Clean Minimalist Footer */}
      <Footer />
    </div>
  );
};

export default Index;
