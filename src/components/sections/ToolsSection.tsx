import { motion } from 'framer-motion';

const tools = [
  { name: 'Python', category: 'Language', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Java', category: 'Language', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'C', category: 'Language', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'HTML5', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', category: 'Styling', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', category: 'Web', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Git', category: 'VCS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', category: 'Platform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'VS Code', category: 'Editor', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'NumPy', category: 'Data & AI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
  { name: 'LeetCode', category: 'Problem Solving', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' },
  { name: 'HackerRank', category: 'Competitive', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png' },
];

const ToolsSection = () => {
  return (
    <div className="w-full py-6 md:py-10 flex flex-col justify-center">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="section-tag text-[#666666]">
            <span className="w-2 h-2 rounded-full bg-[#111111] inline-block"></span>
            05 // TECH STACK & TOOLS
          </div>
          <h2 className="section-title text-[#111111]">DEVELOPMENT ARSENAL</h2>
          <p className="section-subtitle text-[#666666]">
            Frameworks, libraries, compilers, and algorithmic platforms utilized daily.
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
              transition: { staggerChildren: 0.06, delayChildren: 0.1 },
            },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={{
                hidden: { opacity: 0, y: 40, filter: 'blur(3px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
                },
              }}
              className="bg-white border border-black/10 hover:border-[#111111] rounded-2xl p-5 flex flex-col items-center justify-center text-center group transition-all duration-300 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-100 border border-black/10 flex items-center justify-center p-2.5 mb-3 group-hover:scale-110 transition-transform">
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-full h-full object-contain filter group-hover:grayscale-0 transition-all"
                  loading="lazy"
                />
              </div>
              <span className="font-display font-bold text-sm text-[#111111] mb-0.5">
                {tool.name}
              </span>
              <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider">
                {tool.category}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ToolsSection;
