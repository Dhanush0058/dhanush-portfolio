import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import EducationSection from '@/components/sections/EducationSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ToolsSection from '@/components/sections/ToolsSection';
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
          lenis.scrollTo(element, { offset: -30, duration: 1.2 });
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

      {/* Top Floating Navigation */}
      <Navigation />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <ProjectsSection activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ToolsSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      {/* Clean Minimalist Footer */}
      <Footer />
    </div>
  );
};

export default Index;
