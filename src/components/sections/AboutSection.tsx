import { Code2, Brain, Shield, Zap, Sparkles } from 'lucide-react';

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
    icon: Shield,
    title: 'Cybersecurity Intern',
    description: 'Hands-on practical experience at Supraja Technologies securing digital endpoints.',
  },
  {
    icon: Zap,
    title: 'Algorithms & DSA',
    description: 'Strong foundation in Data Structures and Algorithms with high analytical rigor.',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="section-container">
        <div className="section-tag">
          <span className="w-2 h-2 rounded-full bg-neutral-950 inline-block"></span>
          02 // IDENTITY
        </div>
        <h2 className="section-title">ABOUT ME</h2>
        <p className="section-subtitle">
          Building software driven by curiosity, analytical precision, and modern craftsmanship.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Bio Card */}
          <div className="lg:col-span-7 neo-card bg-white p-8 sm:p-10">
            <div className="space-y-6 text-neutral-700 text-base md:text-lg leading-relaxed">
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
                supplemented by real-world defensive principles gained as a{' '}
                <span className="font-semibold text-neutral-950">Cybersecurity Intern at Supraja Technologies</span>.
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
          </div>

          {/* Right Highlights Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="neo-card bg-white p-5 sm:p-6 flex items-start gap-4 hover:border-neutral-900 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center flex-shrink-0 text-neutral-900">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-neutral-950 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
