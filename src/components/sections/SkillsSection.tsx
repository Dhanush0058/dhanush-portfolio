import { motion } from 'framer-motion';

const coreSkills = [
  {
    name: 'Python',
    role: 'Primary / AI & ML',
    level: '90%',
    desc: 'NumPy, OpenCV, Scikit-learn, Automation & Scripting',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    name: 'Java',
    role: 'Core Systems & DSA',
    level: '85%',
    desc: 'Object-Oriented Programming, Collections Framework, Algorithms',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  },
  {
    name: 'C',
    role: 'Low-Level & Memory',
    level: '80%',
    desc: 'Pointers, Memory Allocation, Computational Logic',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="section-tag">
            <span className="w-2 h-2 rounded-full bg-neutral-950 inline-block"></span>
            04 // CAPABILITIES
          </div>
          <h2 className="section-title">CORE PROGRAMMING</h2>
          <p className="section-subtitle">
            Primary languages utilized for software architecture, computational algorithms, and AI modeling.
          </p>
        </motion.div>

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
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {coreSkills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={{
                hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
                },
              }}
              className="neo-card bg-white p-7 sm:p-8 flex flex-col justify-between group hover:border-neutral-950 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-center p-3 group-hover:bg-neutral-100 transition-colors">
                    <img src={skill.logo} alt={skill.name} className="w-full h-full object-contain" />
                  </div>
                </div>

                <h3 className="font-display font-extrabold text-2xl text-neutral-950 mb-1">
                  {skill.name}
                </h3>
                <p className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                  {skill.role}
                </p>

                <p className="text-neutral-600 text-sm leading-relaxed font-normal">
                  {skill.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
