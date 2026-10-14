import { motion } from 'framer-motion';
import { Briefcase, ArrowUpRight, Calendar, MapPin, Sparkles, GitPullRequest } from 'lucide-react';

interface ExperienceItem {
  role: string;
  organization: string;
  program?: string;
  type: string;
  period: string;
  location: string;
  isCurrent?: boolean;
  badge: string;
  skills: string[];
  description: string;
  link: string;
  icon: typeof Briefcase;
}

const experiences: ExperienceItem[] = [
  {
    role: 'AI / ML Intern',
    organization: 'Axension AI',
    type: 'Internship',
    period: '2026 – Present',
    location: 'Remote',
    isCurrent: true,
    badge: 'Active Role',
    skills: ['Artificial Intelligence (AI)', 'Machine Learning', 'Python', 'Model Evaluation'],
    description:
      'Designing and training machine learning pipelines, fine-tuning neural architectures, and deploying practical AI models for intelligent production systems.',
    link: 'https://www.linkedin.com/in/dhanush-reddy-50551b309/',
    icon: Sparkles,
  },
  {
    role: 'Open Source Contributor — ECSOC',
    organization: 'Elite Coders',
    program: 'Elite Coders Summer of Code',
    type: 'Part-time',
    period: 'Jun 2026 – Aug 2026 · 3 mos',
    location: 'Remote',
    badge: 'Summer of Code',
    skills: ['HTML5', 'React.js', 'Frontend Architecture', 'Component Design'],
    description:
      'Engineered interactive component systems, optimized frontend render performance, and authored production-ready pull requests in HTML5 and React.js for the ECSOC program.',
    link: 'https://www.linkedin.com/in/dhanush-reddy-50551b309/',
    icon: GitPullRequest,
  },
  {
    role: 'Open Source Contributor — ECWOC',
    organization: 'Elite Coders',
    program: 'Elite Coders Winter of Code',
    type: 'Part-time',
    period: 'Jan 2026 – Mar 2026 · 3 mos',
    location: 'Remote',
    badge: 'Winter of Code',
    skills: ['Git', 'Open Source', 'Issue Triage', 'Collaborative Workflows'],
    description:
      'Selected contributor for the Elite Coders Winter of Code initiative. Collaborated on open-source repositories, reviewed peer code, and resolved upstream algorithmic issues.',
    link: 'https://www.linkedin.com/in/dhanush-reddy-50551b309/',
    icon: GitPullRequest,
  },
];

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      data-theme="light"
      className="relative min-h-screen py-24 md:py-32 section-light snap-section z-25 shadow-[0_-25px_60px_rgba(0,0,0,0.12)] scroll-mt-0 flex flex-col justify-center bg-[#F5F5F5] text-[#111111]"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="section-tag text-[#666666]">
            <span className="w-2 h-2 rounded-full bg-[#111111] inline-block"></span>
            03 // PROFESSIONAL CAREER
          </div>
          <h2 className="section-title text-[#111111]">WORK EXPERIENCE</h2>
          <p className="section-subtitle text-[#666666]">
            Internships, open-source initiatives, and engineering contributions across AI/ML and modern web development.
          </p>
        </motion.div>

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
          className="space-y-6 w-full"
        >
          {experiences.map((exp) => {
            const Icon = exp.icon;
            return (
              <motion.article
                key={exp.role + exp.organization}
                variants={{
                  hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
                  },
                }}
                className="neo-card bg-white border border-black/10 p-7 sm:p-9 flex flex-col justify-between group hover:border-[#111111] transition-all duration-300 shadow-sm"
              >
                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-black/10 flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-extrabold text-lg sm:text-xl text-neutral-950">
                            {exp.organization}
                          </span>
                          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200">
                            {exp.type}
                          </span>
                        </div>
                        {exp.program && (
                          <p className="font-mono text-xs text-neutral-500 font-medium">
                            {exp.program}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {exp.isCurrent && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>Active</span>
                        </span>
                      )}
                      <div className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-600 bg-neutral-50 px-3 py-1 rounded-full border border-neutral-200">
                        <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="hidden md:inline-flex items-center gap-1 font-mono text-xs text-neutral-500 bg-neutral-50 px-2.5 py-1 rounded-full border border-neutral-200">
                        <MapPin className="w-3 h-3 text-neutral-400" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Role Title */}
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-neutral-950 mb-3 group-hover:text-neutral-700 transition-colors">
                    {exp.role}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-6 font-normal">
                    {exp.description}
                  </p>
                </div>

                {/* Footer with Skills & LinkedIn Link */}
                <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs font-medium px-3 py-1 rounded-lg bg-neutral-100 text-neutral-800 border border-neutral-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-neutral-600 transition-colors group/link self-start sm:self-auto"
                  >
                    <span>View on LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
