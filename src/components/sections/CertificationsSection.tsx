import { Award, ExternalLink, CheckCircle2 } from 'lucide-react';

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
    <section id="certifications" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="section-container">
        <div className="section-tag">
          <span className="w-2 h-2 rounded-full bg-neutral-950 inline-block"></span>
          06 // CREDENTIALS
        </div>
        <h2 className="section-title">CERTIFICATIONS</h2>
        <p className="section-subtitle">
          Verified academic and professional credentials affirming domain mastery.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="neo-card bg-white p-7 sm:p-8 flex flex-col justify-between group hover:border-neutral-950 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-950 group-hover:bg-neutral-950 group-hover:text-white transition-colors duration-300">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200">
                    {cert.date}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mb-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{cert.badge}</span>
                </div>

                <h3 className="font-display font-extrabold text-xl text-neutral-950 mb-1">
                  {cert.title}
                </h3>
                <p className="font-mono text-xs font-semibold text-neutral-600 mb-4">
                  {cert.issuer}
                </p>

                <p className="text-neutral-600 text-sm leading-relaxed font-normal">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
