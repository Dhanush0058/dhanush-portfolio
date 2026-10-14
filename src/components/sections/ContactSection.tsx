import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Loader2, CheckCircle2, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: 'Missing Details',
        description: 'Please fill in all fields before sending.',
        variant: 'destructive',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Send direct real-time email notification to Dhanush's Gmail
      const emailResponse = await fetch('https://formsubmit.co/ajax/dhanushr672@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Message from ${formData.name}`,
          _cc: 'dhanushreddy672@gmail.com',
          _replyto: formData.email,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      // 2. Also persist to Firestore as database backup
      if (db) {
        try {
          await addDoc(collection(db, 'messages'), {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            timestamp: serverTimestamp(),
          });
        } catch (dbErr) {
          console.warn('Firestore backup failed, but email was dispatched:', dbErr);
        }
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      toast({
        title: 'Transmission Dispatched! 🚀',
        description: "Your message has been emailed directly to Dhanush's inbox.",
      });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      toast({
        title: 'Transmission Failed',
        description: 'Something went wrong. Please reach out directly via dhanushr672@gmail.com',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-theme="light"
      className="relative min-h-screen py-20 md:py-28 section-light snap-section z-70 shadow-[0_-25px_60px_rgba(0,0,0,0.12)] scroll-mt-0 flex flex-col justify-center"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="section-tag">
            <span className="w-2 h-2 rounded-full bg-neutral-950 inline-block"></span>
            08 // TRANSMISSION
          </div>
          <h2 className="section-title">GET IN TOUCH</h2>
          <p className="section-subtitle">
            Have an interesting project, question, or want to explore collaboration? Send a dispatch.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start"
        >
          {/* Direct Info Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="neo-card bg-white p-7">
              <h3 className="font-display font-bold text-lg text-neutral-950 mb-4">
                DIRECT CHANNELS
              </h3>

              <div className="space-y-4">
                <a
                  href="mailto:dhanushr672@gmail.com"
                  className="flex items-center gap-3.5 p-3 rounded-xl border border-neutral-200/80 hover:border-neutral-950 hover:bg-neutral-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-neutral-950 group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] text-neutral-500 uppercase">Email</p>
                    <p className="font-medium text-xs sm:text-sm text-neutral-900 truncate">
                      dhanushr672@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3 rounded-xl border border-neutral-200/80 bg-neutral-50/50">
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-neutral-500 uppercase">Location</p>
                    <p className="font-medium text-xs sm:text-sm text-neutral-900">
                      Hyderabad, Telangana, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-6 pt-6 border-t border-neutral-100 flex gap-2">
                <a
                  href="https://github.com/Dhanush0058"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-neutral-200 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white text-neutral-800 text-xs font-semibold transition-all duration-200"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/dhanushreddy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-neutral-200 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white text-neutral-800 text-xs font-semibold transition-all duration-200"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="neo-card bg-neutral-950 text-white p-7">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono text-xs font-semibold tracking-wider text-neutral-300">
                  STATUS: AVAILABLE
                </span>
              </div>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Currently open for software engineering internships, AI research projects, and collaborative initiatives.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 neo-card bg-white p-7 sm:p-9">
            <h3 className="font-display font-bold text-xl text-neutral-950 mb-6">
              SEND A MESSAGE
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-mono text-xs font-semibold text-neutral-700 uppercase mb-2">
                  Name / Organization
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name or Team"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950 font-sans text-sm bg-neutral-50/50 transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-semibold text-neutral-700 uppercase mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950 font-sans text-sm bg-neutral-50/50 transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-semibold text-neutral-700 uppercase mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What would you like to discuss or build?"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950 font-sans text-sm bg-neutral-50/50 resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full neo-btn bg-neutral-950 hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-semibold py-3.5 px-6 rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Sent Successfully!</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
