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
        <div className="section-tag">
          <span className="w-2 h-2 rounded-full bg-neutral-950 inline-block"></span>
          04 // CAPABILITIES
        </div>
        <h2 className="section-title">CORE PROGRAMMING</h2>
        <p className="section-subtitle">
          Primary languages utilized for software architecture, computational algorithms, and AI modeling.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreSkills.map((skill) => (
            <div
              key={skill.name}
              className="neo-card bg-white p-7 sm:p-8 flex flex-col justify-between group hover:border-neutral-950 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-center p-3 group-hover:bg-neutral-100 transition-colors">
                    <img src={skill.logo} alt={skill.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200">
                    {skill.level}
                  </span>
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

              {/* Progress Bar */}
              <div className="mt-6 pt-4 border-t border-neutral-100">
                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neutral-950 rounded-full"
                    style={{ width: skill.level }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
