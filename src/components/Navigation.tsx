import { useState, useEffect } from 'react';
import { Heart, Bookmark, ArrowUpRight, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface NavigationProps {
  currentPage?: number;
  onNavigatePage?: (pageIndex: number) => void;
  activeTheme?: 'light' | 'dark';
}

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
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>(propTheme || 'light');

  useEffect(() => {
    if (propTheme) {
      setActiveTheme(propTheme);
    }
  }, [propTheme]);

  useEffect(() => {
    setIsScrolled(currentPage > 0 || window.scrollY > 150);
  }, [currentPage]);

  useEffect(() => {
    const handleScrollVisibility = () => {
      setIsScrolled(window.scrollY > 180 || currentPage > 0);
    };

    window.addEventListener('scroll', handleScrollVisibility, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, [currentPage]);

  // Follow Button: Redirects directly to LinkedIn
  const handleFollowToggle = () => {
    setIsFollowing(true);
    window.open(
      'https://www.linkedin.com/in/dhanush-reddy-50551b309/',
      '_blank',
      'noopener,noreferrer'
    );
    toast({
      title: 'Connecting with Dhanush Reddy',
      description: 'Opening LinkedIn profile in a new tab...',
    });
  };

  // Like Button: Redirects directly to GitHub Project Repo
  const handleLike = () => {
    if (!hasLiked) {
      setHasLiked(true);
      const newCount = likeCount + 1;
      setLikeCount(newCount);
      localStorage.setItem('portfolio_likes', newCount.toString());
    }
    window.open(
      'https://github.com/Dhanush0058/dhanush-portfolio',
      '_blank',
      'noopener,noreferrer'
    );
    toast({
      title: 'Thank you for the star & love! ❤️',
      description: 'Opening GitHub project repository...',
    });
  };

  // Save / Bookmark Button: Redirects directly to GitHub Project Repo
  const handleBookmark = () => {
    setIsBookmarked(true);
    window.open(
      'https://github.com/Dhanush0058/dhanush-portfolio',
      '_blank',
      'noopener,noreferrer'
    );
    toast({
      title: 'Star & Bookmark on GitHub 🔖',
      description: 'Opening GitHub project repository...',
    });
  };

  if (!isScrolled) return null;

  const isDark = activeTheme === 'dark';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-6 pt-2 sm:pt-3 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-top-3">
      <div
        className={`max-w-[1320px] 2xl:max-w-[1400px] mx-auto rounded-2xl backdrop-blur-md py-2 px-2.5 sm:px-6 transition-colors duration-500 ease-in-out border ${
          isDark
            ? 'bg-[#0B0B0B]/90 border-neutral-800 text-[#F5F5F5] shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
            : 'bg-[#F5F5F5]/95 border-neutral-300 text-[#111111] shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
        }`}
      >
        <div className="flex items-center justify-between gap-1.5 sm:gap-3">
          {/* Left Side: Avatar, Name & Follow Button */}
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
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
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 shadow-sm transition-all duration-300 group-hover:scale-105 ${
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

            {/* Name */}
            <div className="flex flex-col min-w-0">
              <a
                href="#home"
                onClick={(e) => {
                  if (onNavigatePage) {
                    e.preventDefault();
                    onNavigatePage(0);
                  }
                }}
                className={`font-display font-bold text-xs sm:text-base tracking-tight truncate transition-colors ${
                  isDark ? 'text-[#F5F5F5] hover:text-white' : 'text-[#111111] hover:text-neutral-700'
                }`}
              >
                Dhanush Reddy
              </a>
            </div>

            {/* Follow Button (Directly opens LinkedIn) */}
            <button
              onClick={handleFollowToggle}
              className={`inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded-full border transition-colors flex-shrink-0 ${
                isFollowing
                  ? isDark
                    ? 'bg-neutral-800 text-white border-neutral-700'
                    : 'bg-neutral-200 text-[#111111] border-neutral-300'
                  : isDark
                  ? 'bg-neutral-900 hover:bg-white text-white hover:text-black border-neutral-700 hover:border-white shadow-sm'
                  : 'bg-white hover:bg-[#111111] text-[#111111] hover:text-white border-neutral-300 hover:border-[#111111] shadow-sm'
              }`}
              title="Follow on LinkedIn"
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

          {/* Right Side: Heart (Like), Bookmark (Save), and "Get in touch" CTA */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Heart / Like Button (Redirects to GitHub repo) */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 p-1.5 sm:px-3 sm:py-1.5 rounded-full border text-xs font-mono transition-colors ${
                hasLiked
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                  : isDark
                  ? 'bg-neutral-900/80 hover:bg-neutral-800 border-neutral-700 text-neutral-300'
                  : 'bg-white hover:bg-neutral-100 border-neutral-300 text-[#111111]'
              }`}
              aria-label="Like and star project on GitHub"
              title="Give a heart (Star on GitHub)"
            >
              <Heart
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  hasLiked ? 'fill-rose-500 text-rose-500 scale-110' : ''
                }`}
              />
              <span className="text-[11px] sm:text-xs font-semibold">{likeCount}</span>
            </button>

            {/* Bookmark / Save Button (Redirects to GitHub repo) */}
            <button
              onClick={handleBookmark}
              className={`p-1.5 sm:p-2 rounded-full border text-xs transition-colors ${
                isBookmarked
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                  : isDark
                  ? 'bg-neutral-900/80 hover:bg-neutral-800 border-neutral-700 text-neutral-300'
                  : 'bg-white hover:bg-neutral-100 border-neutral-300 text-[#111111]'
              }`}
              aria-label="Save and bookmark on GitHub"
              title="Save project on GitHub"
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${
                  isBookmarked ? 'fill-amber-500 text-amber-500' : ''
                }`}
              />
            </button>

            {/* Primary CTA: "Get in touch" (Turns to last page: Contact) */}
            <a
              href="#contact"
              onClick={(e) => {
                if (onNavigatePage) {
                  e.preventDefault();
                  onNavigatePage(9);
                }
              }}
              className={`text-[11px] sm:text-sm font-semibold px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm transition-all transform hover:scale-[1.03] active:scale-[0.98] flex items-center gap-1 cursor-pointer ${
                isDark
                  ? 'bg-[#F5F5F5] text-[#111111] hover:bg-white'
                  : 'bg-[#111111] text-white hover:bg-neutral-800'
              }`}
            >
              <span className="whitespace-nowrap">Get in touch</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
