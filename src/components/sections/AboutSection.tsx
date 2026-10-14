import { motion } from 'framer-motion';
import { Code2, Brain, Sparkles, Zap } from 'lucide-react';

const highlights = [
  {
    icon: Code2,
    title: 'Clean Engineering',
    description: 'Writing robust, maintainable code in Python, Java, and modern web architectures.',
  },
  {
    icon: Brain,
    title: 'AI / ML Explorer',
    description: 'Developing practical NLP and computer vision systems for real-world impact.',
  },
  {
    icon: Sparkles,
    title: 'AI / ML Intern',
    description: 'Developing practical machine learning pipelines and neural models at Axension AI.',
  },
  {
    icon: Zap,
    title: 'Algorithms & DSA',
    description: 'Strong foundation in Data Structures and Algorithms with high analytical rigor.',
  },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      data-theme="light"
      className="relative min-h-screen py-24 md:py-32 section-light snap-section z-30 shadow-[0_-25px_60px_rgba(0,0,0,0.12)] scroll-mt-0 flex flex-col justify-center bg-[#F5F5F5] text-[#111111]"
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
            03 // IDENTITY
          </div>
          <h2 className="section-title text-[#111111]">ABOUT ME</h2>
          <p className="section-subtitle text-[#666666]">
            Building software driven by curiosity, analytical precision, and modern craftsmanship.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-7 neo-card bg-white border border-black/10 p-8 sm:p-10 shadow-sm"
          >
            <div className="space-y-6 text-[#111111] text-base md:text-lg leading-relaxed">
              <p>
                I'm a <span className="font-semibold text-neutral-950">B.Tech Information Technology</span> student
                at <span className="font-semibold text-neutral-950">Vidya Jyothi Institute of Technology</span> (VJIT, Hyderabad).
                What started as a deep interest in how digital logic operates quickly evolved into an obsession
                with architecting clean, purposeful applications.
              </p>

              <p>
                My core competencies lie in <span className="font-semibold text-neutral-950">Python, Java, and C</span>,
                reinforced by a dedicated problem-solving mindset in Data Structures and Algorithms. I enjoy taking
                complex theoretical requirements and translating them into elegant, production-grade solutions.
              </p>

              <p>
                Beyond standard software development, I actively delve into{' '}
                <span className="font-semibold text-neutral-950">Artificial Intelligence & Machine Learning</span>,
                supplemented by real-world engineering as an{' '}
                <span className="font-semibold text-neutral-950">AI/ML Intern at Axension AI</span> and open-source contributor.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-wrap gap-4 font-mono text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Hyderabad, India</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
                <span>Batch of 2024–2028</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
                <span>Open for Collaborations</span>
              </div>
            </div>
          </motion.div>

          {/* Right Highlights Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: 20, filter: 'blur(4px)' },
                    visible: {
                      opacity: 1,
                      x: 0,
                      filter: 'blur(0px)',
                      transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
                    },
                  }}
                  className="neo-card bg-white border border-black/10 p-5 sm:p-6 flex items-start gap-4 hover:border-neutral-900 transition-colors shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-black/10 flex items-center justify-center flex-shrink-0 text-[#111111]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#111111] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[#666666] text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
