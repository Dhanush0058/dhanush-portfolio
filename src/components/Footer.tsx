import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Dhanush0058',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dhanush-reddy-50551b309/',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:dhanushr672@gmail.com',
    icon: Mail,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-neutral-200/90 bg-white/70 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <p className="font-display font-extrabold text-xl text-neutral-950 mb-1">
              DHANUSH REDDY
            </p>
            <p className="font-mono text-xs text-neutral-500">
              © {currentYear} • Handcrafted with high-contrast minimalism & modern systems.
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.name !== 'Email' ? '_blank' : undefined}
                rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="p-2.5 rounded-full border border-neutral-200 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white text-neutral-700 transition-all duration-200"
                aria-label={link.name}
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full border border-neutral-200 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white text-neutral-700 transition-all duration-200 cursor-pointer ml-2"
              title="Back to Top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
