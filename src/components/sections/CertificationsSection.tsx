import { motion } from 'framer-motion';
import { Award, CheckCircle2 } from 'lucide-react';

const certifications = [
  {
    title: 'Database Management System',
    issuer: 'NPTEL (National Programme on Technology Enhanced Learning)',
    date: 'September 2025',
    description:
      'Rigorous academic certification covering relational algebra, SQL queries, indexing, normalization, transaction management, and concurrency control.',
    badge: 'National Certification',
  },
  {
    title: 'Java Programming & DSA Intermediate',
    issuer: 'Apna College',
    date: 'Completed',
    description:
      'In-depth mastery of Object-Oriented Programming, dynamic memory, recursion, linear and non-linear data structures, and algorithmic complexity.',
    badge: 'Programming Specialization',
  },
];

const CertificationsSection = () => {
  return (
    <section
      id="certifications"
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
            06 // CREDENTIALS
          </div>
          <h2 className="section-title text-white">CERTIFICATIONS</h2>
          <p className="section-subtitle text-neutral-400">
            Verified academic and professional credentials affirming domain mastery.
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={{
                hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
                },
              }}
              className="bg-[#141414] border border-neutral-800 hover:border-neutral-700 rounded-2xl p-7 sm:p-8 flex flex-col justify-between group transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-900 text-neutral-300 border border-neutral-800">
                    {cert.date}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/80 mb-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{cert.badge}</span>
                </div>

                <h3 className="font-display font-extrabold text-xl text-white mb-1">
                  {cert.title}
                </h3>
                <p className="font-mono text-xs font-semibold text-neutral-400 mb-4">
                  {cert.issuer}
                </p>

                <p className="text-neutral-400 text-sm leading-relaxed font-normal">
                  {cert.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
