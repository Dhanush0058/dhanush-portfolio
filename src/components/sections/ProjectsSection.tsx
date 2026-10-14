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
    category: ['All', 'AI / ML', 'Python'],
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
];

const categories = ['All', 'AI / ML', 'Python'];

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
    <div className="w-full py-6 md:py-10 flex flex-col justify-center">
      <div className="section-container">
        {/* Section Header with Stagger */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="section-tag text-[#999999]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
              01 // INDEXED WORKS
            </div>
            <h2 className="section-title text-[#F5F5F5]">FEATURED WORK</h2>
            <p className="text-[#999999] text-sm md:text-base font-normal max-w-xl">
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
                      ? 'bg-[#F5F5F5] text-[#111111] border-[#F5F5F5] font-semibold shadow-sm'
                      : 'bg-[#161616] hover:bg-[#222222] text-[#999999] hover:text-white border-white/10'
                  }`}
                >
                  [ {cat} ]
                </button>
              );
            })}
          </div>
        </motion.div>

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
                staggerChildren: 0.12,
                delayChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const Icon = project.icon;
              return (
                <motion.article
                  key={project.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
                    },
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#161616] border border-white/15 hover:border-white/30 rounded-2xl p-7 sm:p-9 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  {/* Top Bar inside Card */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs font-semibold tracking-wider text-[#999999] uppercase">
                          {project.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full border border-white/10 hover:border-white bg-neutral-900 hover:bg-white text-neutral-300 hover:text-black transition-all duration-200"
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
                          className="p-2 rounded-full border border-white/10 hover:border-white bg-neutral-900 hover:bg-white text-neutral-300 hover:text-black transition-all duration-200"
                          aria-label="Open Project"
                          title="Open Project"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#F5F5F5] mb-3 group-hover:text-white transition-colors">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        {project.title}
                      </a>
                    </h3>

                    <p className="text-[#999999] text-sm leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Tags */}
                  <div className="pt-4 border-t border-white/10 mt-auto">
                    <ul className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-neutral-300 border border-white/10"
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
    </div>
  );
};

export default ProjectsSection;
