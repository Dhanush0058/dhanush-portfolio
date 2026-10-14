import { useState, useEffect } from 'react';
import { Heart, Bookmark, ArrowUpRight, Menu, X, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface NavigationProps {
  currentPage?: number;
  onNavigatePage?: (pageIndex: number) => void;
  activeTheme?: 'light' | 'dark';
}

const pageLinkMap: Record<string, number> = {
  home: 0,
  work: 1,
  about: 2,
  experience: 3,
  education: 4,
  skills: 5,
  tools: 6,
  certifications: 7,
  achievements: 8,
  contact: 9,
};

const Navigation = ({
  currentPage = 0,
  onNavigatePage,
  activeTheme: propTheme,
}: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(currentPage > 0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likeCount, setLikeCount] = useState(() => {
    const saved = localStorage.getItem('portfolio_likes');
    return saved ? parseInt(saved, 10) : 48;
  });
  const [hasLiked, setHasLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>(propTheme || 'light');

  useEffect(() => {
    if (propTheme) {
      setActiveTheme(propTheme);
    }
  }, [propTheme]);

  useEffect(() => {
    setIsScrolled(currentPage > 0 || window.scrollY > 200);
  }, [currentPage]);

  useEffect(() => {
    const handleScrollVisibility = () => {
      setIsScrolled(window.scrollY > 240);
    };

    window.addEventListener('scroll', handleScrollVisibility, { passive: true });
    handleScrollVisibility();

    // IntersectionObserver for strict theme detection as sections scroll into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute('data-theme') as 'light' | 'dark';
            if (theme) {
              setActiveTheme(theme);
            }
          }
        });
      },
      {
        rootMargin: '-80px 0px -65% 0px',
        threshold: [0, 0.1, 0.25],
      }
    );

    const sections = document.querySelectorAll('[data-theme]');
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      window.removeEventListener('scroll', handleScrollVisibility);
      observer.disconnect();
    };
  }, []);

  const handleFollowToggle = () => {
    setIsFollowing(true);
    window.open('https://www.linkedin.com/in/dhanush-reddy-50551b309/', '_blank', 'noopener,noreferrer');
    toast({
      title: 'Connecting with Dhanush Reddy',
      description: 'Opening LinkedIn profile in a new tab...',
    });
  };

  const handleLike = () => {
    if (!hasLiked) {
      setHasLiked(true);
      const newCount = likeCount + 1;
      setLikeCount(newCount);
      localStorage.setItem('portfolio_likes', newCount.toString());
    }
    window.open('https://github.com/Dhanush0058/dhanush-portfolio', '_blank', 'noopener,noreferrer');
    toast({
      title: 'Thank you for the star & love! ❤️',
      description: 'Opening GitHub project repository...',
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(true);
    window.open('https://github.com/Dhanush0058/dhanush-portfolio', '_blank', 'noopener,noreferrer');
    toast({
      title: 'Star & Bookmark on GitHub 🔖',
      description: 'Opening GitHub project repository...',
    });
  };

  if (!isScrolled) return null;

  const isDark = activeTheme === 'dark';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-top-4">
      <div
        className={`max-w-[1320px] 2xl:max-w-[1400px] mx-auto rounded-2xl backdrop-blur-md py-2.5 px-4 sm:px-6 transition-colors duration-500 ease-in-out border ${
          isDark
            ? 'bg-[#0B0B0B]/90 border-neutral-800 text-[#F5F5F5] shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
            : 'bg-[#F5F5F5]/95 border-neutral-300 text-[#111111] shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          {/* Left Side: Avatar, Name, Availability, Follow */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            {/* Avatar */}
            <a
              href="#home"
              onClick={(e) => {
                if (onNavigatePage) {
                  e.preventDefault();
                  onNavigatePage(0);
                }
              }}
              className="relative group flex-shrink-0"
            >
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 shadow-sm transition-all duration-500 ease-in-out group-hover:scale-105 ${
                  isDark ? 'border-neutral-600 bg-neutral-900' : 'border-neutral-900 bg-white'
                }`}
              >
                <img
                  src="/GojoStylePicture.png"
                  alt="Dhanush Reddy Avatar"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </a>

            {/* Name & Availability */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <a
                  href="#home"
                  onClick={(e) => {
                    if (onNavigatePage) {
                      e.preventDefault();
                      onNavigatePage(0);
                    }
                  }}
                  className={`font-display font-bold text-sm sm:text-base tracking-tight truncate transition-colors duration-500 ease-in-out ${
                    isDark ? 'text-[#F5F5F5] hover:text-white' : 'text-[#111111] hover:text-neutral-700'
                  }`}
                >
                  Dhanush Reddy
                </a>
                <span
                  className={`text-[11px] sm:text-xs font-mono truncate transition-colors duration-500 ease-in-out ${
                    isDark ? 'text-[#999999]' : 'text-[#666666]'
                  }`}
                >
                  Portfolio / 2026
                </span>
              </div>
            </div>

            {/* Follow Button */}
            <button
              onClick={handleFollowToggle}
              className={`hidden sm:inline-flex items-center gap-1 ml-1 text-xs font-semibold px-3 py-1 rounded-full border transition-colors duration-500 ease-in-out ${
                isFollowing
                  ? isDark
                    ? 'bg-neutral-800 text-white border-neutral-700'
                    : 'bg-neutral-200 text-[#111111] border-neutral-300'
                  : isDark
                  ? 'bg-neutral-900 hover:bg-white text-white hover:text-black border-neutral-700 hover:border-white shadow-sm'
                  : 'bg-white hover:bg-[#111111] text-[#111111] hover:text-white border-neutral-300 hover:border-[#111111] shadow-sm'
              }`}
              title="Follow on GitHub / Updates"
            >
              {isFollowing ? (
                <>
                  <Check className="w-3 h-3 text-emerald-500" />
                  <span>Following</span>
                </>
              ) : (
                <span>+ Follow</span>
              )}
            </button>
          </div>

          {/* Quick Nav Links (Middle - Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 font-mono text-xs">
            {['work', 'about', 'education', 'skills', 'achievements', 'contact'].map((link) => (
              <a
                key={link}
                href={`#${link}`}
                onClick={(e) => {
                  if (onNavigatePage && pageLinkMap[link] !== undefined) {
                    e.preventDefault();
                    onNavigatePage(pageLinkMap[link]);
                  }
                }}
                className={`transition-colors duration-500 ease-in-out cursor-pointer ${
                  isDark
                    ? 'text-[#999999] hover:text-white'
                    : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                /{link.toUpperCase()}
              </a>
            ))}
          </nav>

          {/* Right Side: Quick Interactions & Primary CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Heart / Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-full border text-xs font-mono transition-colors duration-500 ease-in-out ${
                hasLiked
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                  : isDark
                  ? 'bg-neutral-900/80 hover:bg-neutral-800 border-neutral-700 text-neutral-300'
                  : 'bg-white hover:bg-neutral-100 border-neutral-300 text-[#111111]'
              }`}
              aria-label="Like portfolio"
              title="Give a heart"
            >
              <Heart
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  hasLiked ? 'fill-rose-500 text-rose-500 scale-110' : ''
                }`}
              />
              <span className="hidden sm:inline font-semibold">{likeCount}</span>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-full border text-xs transition-colors duration-500 ease-in-out ${
                isBookmarked
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                  : isDark
                  ? 'bg-neutral-900/80 hover:bg-neutral-800 border-neutral-700 text-neutral-300'
                  : 'bg-white hover:bg-neutral-100 border-neutral-300 text-[#111111]'
              }`}
              aria-label="Bookmark portfolio"
              title="Bookmark this page"
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${
                  isBookmarked ? 'fill-amber-500 text-amber-500' : ''
                }`}
              />
            </button>

            {/* Primary CTA: "Get in touch" */}
            <a
              href="#contact"
              onClick={(e) => {
                if (onNavigatePage) {
                  e.preventDefault();
                  onNavigatePage(pageLinkMap['contact']);
                }
              }}
              className={`text-xs sm:text-sm font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md transition-all duration-500 ease-in-out transform hover:scale-[1.03] active:scale-[0.98] flex items-center gap-1.5 cursor-pointer ${
                isDark
                  ? 'bg-[#F5F5F5] text-[#111111] hover:bg-white'
                  : 'bg-[#111111] text-white hover:bg-neutral-800'
              }`}
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full border transition-colors duration-500 ease-in-out ${
                isDark
                  ? 'border-neutral-700 hover:bg-neutral-800 text-white'
                  : 'border-neutral-200 hover:bg-neutral-100 text-black'
              }`}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div
            className={`lg:hidden mt-3 pt-3 border-t flex flex-col gap-2 font-mono text-xs transition-colors duration-500 ease-in-out ${
              isDark ? 'border-neutral-800 text-white' : 'border-neutral-300 text-[#111111]'
            }`}
          >
            {['work', 'about', 'education', 'skills', 'achievements', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={(e) => {
                  if (onNavigatePage && pageLinkMap[item] !== undefined) {
                    e.preventDefault();
                    onNavigatePage(pageLinkMap[item]);
                  }
                  setIsMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-neutral-800 text-neutral-200' : 'hover:bg-neutral-200/70 text-[#111111]'
                }`}
              >
                /{item.toUpperCase()}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
