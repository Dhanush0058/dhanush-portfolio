import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

const education = [
  {
    institution: 'Vidya Jyothi Institute of Technology',
    location: 'Hyderabad, India',
    degree: 'B.Tech Information Technology',
    year: '2024 – 2028 (In Progress)',
    grade: 'CGPA: 9.33',
    status: 'Current Program',
    description: 'Focusing on core Computer Science & IT fundamentals, Data Structures, OOP, Database Systems, and Machine Learning.',
  },
  {
    institution: 'Sri Vaishnavi Junior College',
    location: 'Telangana, India',
    degree: 'Intermediate (MPC — Maths, Physics, Chemistry)',
    year: '2022 – 2024',
    grade: 'Score: 96%',
    status: 'Completed with Distinction',
    description: 'Mastered higher secondary mathematics, analytical reasoning, and scientific principles.',
  },
  {
    institution: 'Sri Niketan High School',
    location: 'Telangana, India',
    degree: 'Secondary School Certificate (SSC)',
    year: 'Batch of 2022',
    grade: 'GPA: 9.3 / 10',
    status: 'Completed',
    description: 'Built foundational academic excellence and first discovered passion for computing.',
  },
];

const EducationSection = () => {
  return (
    <section
      id="education"
      data-theme="dark"
      className="relative min-h-screen py-6 md:py-10 section-dark snap-section z-40 shadow-[0_-25px_60px_rgba(0,0,0,0.5)] scroll-mt-0 flex flex-col justify-center bg-[#0B0B0B] text-[#F5F5F5]"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="section-tag text-[#999999]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
            04 // ACADEMIC RECORD
          </div>
          <h2 className="section-title text-[#F5F5F5]">EDUCATION</h2>
          <p className="section-subtitle text-[#999999]">
            A trajectory of consistent academic distinction and deep foundational discipline.
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
              transition: { staggerChildren: 0.12, delayChildren: 0.1 },
            },
          }}
          className="space-y-6 w-full"
        >
          {education.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
                },
              }}
              className="bg-[#161616] border border-white/15 p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row md:items-start justify-between gap-6 group hover:border-white/30 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center flex-shrink-0 text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/15">
                      {item.year}
                    </span>
                    <span className="font-mono text-xs text-[#999999]">
                      {item.location}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#F5F5F5] group-hover:text-white transition-colors">
                    {item.institution}
                  </h3>
                  <p className="font-mono text-sm font-semibold text-neutral-300 mt-0.5">
                    {item.degree}
                  </p>
                  <p className="text-[#999999] text-sm mt-3 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Grade Badge */}
              <div className="md:text-right flex-shrink-0 self-start md:self-center">
                <div className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full bg-emerald-950/50 text-emerald-300 border border-emerald-500/30 shadow-sm">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item.grade}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
