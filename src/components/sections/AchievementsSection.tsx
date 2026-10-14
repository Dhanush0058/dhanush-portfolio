import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star, GitPullRequest, ArrowUpRight } from 'lucide-react';

interface Achievement {
  title: string;
  badge: string;
  event: string;
  description: string;
  link?: string;
  linkText?: string;
  icon: typeof Trophy;
}

const achievements: Achievement[] = [
  {
    title: '1st Prize at KG Reddy 36-Hour Hackathon',
    badge: '1st Place Winner',
    event: 'KG Reddy College of Engineering & Technology • Brainovision',
    description:
      'Won first place in the AI & Software domain with Team RE:RISE for the project FounderOS, an AI-powered solution sponsored by Brainovision.',
    link: 'https://www.linkedin.com/in/dhanush-reddy-50551b309/',
    linkText: 'Project FounderOS',
    icon: Trophy,
  },
  {
    title: '3rd Place at CSI State Convention 2.0',
    badge: 'State Convention Podium',
    event: 'Computer Society of India (CSI) • VJIT Hyderabad',
    description:
      'Secured third place in the Paper Presentation event hosted at Vidya Jyothi Institute of Technology (VJIT), organized by the Computer Society of India.',
    icon: Medal,
  },
  {
    title: 'Top 9 Finalist & Recognition by SAIF Foundation',
    badge: 'Top 9 Finalist',
    event: 'SAIF Foundation National Health Innovation',
    description:
      'Selected among the Top 9 teams for GramHealth, an AI-powered rural healthcare platform featuring the virtual assistant VYOM.',
    link: 'https://www.linkedin.com/in/dhanush-reddy-50551b309/',
    linkText: 'Project GramHealth',
    icon: Award,
  },
  {
    title: 'Selected as Open Source Contributor for ECWoC 2026',
    badge: 'Open Source Fellow',
    event: 'Elite Coders Winter of Code 2026',
    description:
      'Selected as a contributor for the Elite Coders Winter of Code initiative, contributing to production open-source codebases and modern workflows.',
    icon: GitPullRequest,
  },
  {
    title: "Jury's Favorite Award at INNOVISION (HITAM College)",
    badge: "Jury's Choice",
    event: 'HITAM College of Engineering • INNOVISION',
    description:
      'Recognized as the Jury\'s Favorite for presenting WayMaker, an AI-powered smart city emergency routing and traffic coordination platform designed to optimize signal timing and route emergency vehicles around disruptions.',
    icon: Star,
  },
];

const AchievementsSection = () => {
  return (
    <section
      id="achievements"
      data-theme="dark"
      className="relative min-h-screen py-20 md:py-28 section-dark snap-section z-60 shadow-[0_-25px_60px_rgba(0,0,0,0.5)] scroll-mt-0 flex flex-col justify-center"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="section-tag text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
            07 // ACCOLADES & HONORS
          </div>
          <h2 className="section-title text-white">HONORS & ACHIEVEMENTS</h2>
          <p className="section-subtitle text-neutral-400">
            Recognitions from competitive hackathons, national research conventions, and open-source initiatives.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {achievements.map((item, index) => {
            const Icon = item.icon;
            const isFeatured = index === 0;

            return (
              <motion.article
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
                  },
                }}
                className={`bg-[#141414] border border-neutral-800 hover:border-neutral-700 rounded-2xl p-7 sm:p-8 flex flex-col justify-between group transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-neutral-900 text-neutral-300 border border-neutral-800">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-2 leading-tight">
                    {item.title}
                  </h3>

                  <p className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                    {item.event}
                  </p>

                  <p className="text-neutral-400 text-sm leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {item.link && (
                  <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-neutral-300 transition-colors group/link"
                    >
                      <span>{item.linkText || 'View Details'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                    <span className="font-mono text-[10px] text-neutral-500 uppercase">Verified</span>
                  </div>
                )}
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;
