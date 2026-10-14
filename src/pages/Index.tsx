import { useState } from 'react';
import CustomCursor from '@/components/CustomCursor';
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

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden selection:bg-neutral-900 selection:text-white">
      {/* Magnetic Circular Custom Cursor */}
      <CustomCursor />

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
