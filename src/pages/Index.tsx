import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import PageTurner, { PageItem } from '@/components/PageTurner';
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
  const [currentPage, setCurrentPage] = useState(0);

  const pages: PageItem[] = [
    {
      id: 'home',
      title: 'Overview',
      theme: 'light',
      component: <HeroSection activeFilter={activeFilter} onFilterChange={setActiveFilter} />,
    },
    {
      id: 'work',
      title: 'Featured Work',
      theme: 'dark',
      component: <ProjectsSection activeFilter={activeFilter} onFilterChange={setActiveFilter} />,
    },
    {
      id: 'about',
      title: 'Identity & Bio',
      theme: 'light',
      component: <AboutSection />,
    },
    {
      id: 'experience',
      title: 'Work Experience',
      theme: 'light',
      component: <ExperienceSection />,
    },
    {
      id: 'education',
      title: 'Academic Record',
      theme: 'dark',
      component: <EducationSection />,
    },
    {
      id: 'skills',
      title: 'Core Programming',
      theme: 'light',
      component: <SkillsSection />,
    },
    {
      id: 'tools',
      title: 'Tech Arsenal',
      theme: 'light',
      component: <ToolsSection />,
    },
    {
      id: 'certifications',
      title: 'Credentials & Certs',
      theme: 'dark',
      component: <CertificationsSection />,
    },
    {
      id: 'achievements',
      title: 'Honors & Awards',
      theme: 'dark',
      component: <AchievementsSection />,
    },
    {
      id: 'contact',
      title: 'Get In Touch',
      theme: 'light',
      component: (
        <div className="flex flex-col min-h-full justify-between pt-2 pb-6">
          <ContactSection />
          <Footer />
        </div>
      ),
    },
  ];

  const activeTheme = pages[currentPage]?.theme || 'light';

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background select-none selection:bg-neutral-900 selection:text-white">
      {/* Subtle Ambient Background Texture */}
      <AnimatedBackground />

      {/* Top Floating Navigation synchronized with active page */}
      <Navigation
        currentPage={currentPage}
        onNavigatePage={setCurrentPage}
        activeTheme={activeTheme}
      />

      {/* 3D Vertical Page Turn Experience */}
      <main className="w-full h-full">
        <PageTurner
          pages={pages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default Index;
