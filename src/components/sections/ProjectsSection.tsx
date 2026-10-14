import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowUpRight, FolderGit2, Cpu, FileText, Sparkles } from 'lucide-react';

interface ProjectsSectionProps {
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

const projects = [
  {
    id: 1,
    title: 'SnapClass — AI Attendance System',
    type: 'MAJOR PROJECT',
    category: ['All', 'AI / ML', 'Python', 'Systems'],
    description:
      'High-speed, automated attendance tracking utilizing computer vision and deep learning facial recognition models to eliminate manual rolls.',
    github: 'https://github.com/Dhanush0058/SnapClass-Making-Attendance-Faster-Using-AI',
    tags: ['Python', 'Computer Vision', 'Deep Learning', 'OpenCV'],
    badge: 'Featured AI Project',
    icon: Cpu,
  },
  {
    id: 2,
    title: 'Text Summarizer NLP Engine',
    type: 'MINOR PROJECT',
    category: ['All', 'AI / ML', 'Python'],
    description:
      'Natural Language Processing pipeline that condenses extensive articles and research documents into crisp, key-point summaries.',
    github: 'https://github.com/Dhanush0058/Text-Summarizer',
    tags: ['NLP', 'Python', 'Transformers', 'Machine Learning'],
    badge: 'NLP System',
    icon: FileText,
  },
  {
    id: 3,
    title: 'Minimalist Portfolio & Interactive Architecture',
    type: 'CORE WEB APP',
    category: ['All', 'Web Apps'],
    description:
      'High-contrast neo-brutalist portfolio engine engineered with React, Framer Motion, Tailwind CSS, and Firebase Firestore persistence.',
    github: 'https://github.com/Dhanush0058/dhanush-reddy-portfolio',
    tags: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    badge: 'Production Site',
    icon: Sparkles,
  },
  {
    id: 4,
    title: 'Java DSA & Algorithmic Problem Solver',
    type: 'SYSTEMS & DSA',
    category: ['All', 'Systems'],
    description:
      'Curated repository of optimized data structures, recursion, dynamic programming, and graph algorithms solved with optimal time-space complexity.',
    github: 'https://github.com/Dhanush0058',
    tags: ['Java', 'Algorithms', 'Data Structures', 'Competitive Coding'],
    badge: 'Core Problem Solving',
    icon: FolderGit2,
  },
];

const categories = ['All', 'AI / ML', 'Python', 'Web Apps', 'Systems'];

const ProjectsSection = ({ activeFilter = 'All', onFilterChange }: ProjectsSectionProps) => {
  const [localFilter, setLocalFilter] = useState(activeFilter);

  const currentFilter = onFilterChange ? activeFilter : localFilter;

  const handleSelect = (category: string) => {
    if (onFilterChange) {
      onFilterChange(category);
    } else {
      setLocalFilter(category);
    }
  };

  const filteredProjects = projects.filter((project) =>
    currentFilter === 'All' ? true : project.category.includes(currentFilter)
  );

  return (
    <section id="work" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-tag">
              <span className="w-2 h-2 rounded-full bg-neutral-950 inline-block"></span>
              01 // INDEXED WORKS
            </div>
            <h2 className="section-title">FEATURED WORK</h2>
            <p className="text-neutral-600 text-sm md:text-base font-normal max-w-xl">
              Engineered with clean code, modern architectures, and rigorous problem-solving.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categories.map((cat) => {
              const active = currentFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleSelect(cat)}
                  className={`px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-neutral-950 text-white border-neutral-950 font-semibold shadow-sm'
                      : 'bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                  }`}
                >
                  [ {cat} ]
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid with whileInView Stagger */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const Icon = project.icon;
              return (
                <motion.article
                  key={project.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
                    },
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="neo-card bg-white p-7 sm:p-9 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Top Bar inside Card */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900 group-hover:bg-neutral-950 group-hover:text-white transition-colors duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                          {project.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white text-neutral-700 transition-all duration-200"
                            aria-label="View on GitHub"
                            title="GitHub Repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white text-neutral-700 transition-all duration-200"
                          aria-label="Open Project"
                          title="Open Project"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-neutral-950 mb-3 group-hover:text-neutral-700 transition-colors">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        {project.title}
                      </a>
                    </h3>

                    <p className="text-neutral-600 text-sm leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Tags */}
                  <div className="pt-4 border-t border-neutral-100 mt-auto">
                    <ul className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200/60"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
