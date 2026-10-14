import { useState, useEffect } from 'react';
import { Heart, Bookmark, ArrowUpRight, Menu, X, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likeCount, setLikeCount] = useState(() => {
    const saved = localStorage.getItem('portfolio_likes');
    return saved ? parseInt(saved, 10) : 48;
  });
  const [hasLiked, setHasLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFollowToggle = () => {
    setIsFollowing((prev) => {
      const next = !prev;
      toast({
        title: next ? 'Following Dhanush Reddy' : 'Unfollowed',
        description: next ? 'Thanks for following! Connected on GitHub @Dhanush0058' : 'You can follow anytime!',
      });
      return next;
    });
  };

  const handleLike = () => {
    if (!hasLiked) {
      setHasLiked(true);
      const newCount = likeCount + 1;
      setLikeCount(newCount);
      localStorage.setItem('portfolio_likes', newCount.toString());
      toast({
        title: 'Thank you for the love! ❤️',
        description: 'Glad you enjoy my portfolio design and work.',
      });
    } else {
      setHasLiked(false);
      const newCount = Math.max(0, likeCount - 1);
      setLikeCount(newCount);
      localStorage.setItem('portfolio_likes', newCount.toString());
    }
  };

  const handleBookmark = () => {
    setIsBookmarked((prev) => {
      const next = !prev;
      toast({
        title: next ? 'Bookmarked Portfolio 🔖' : 'Bookmark removed',
        description: next ? 'Saved to your favorites.' : '',
      });
      return next;
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-md border border-neutral-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)] py-2.5 px-4 sm:px-6'
            : 'bg-white/70 backdrop-blur-sm border border-neutral-200/60 shadow-sm py-3 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          {/* Left Side: Avatar, Name, Availability, Follow */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            {/* Avatar */}
            <a href="#home" className="relative group flex-shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-neutral-900 bg-neutral-100 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/GojoStylePicture.png"
                  alt="Dhanush Reddy Avatar"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Fallback to placeholder if not loaded
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
                  className="font-display font-bold text-sm sm:text-base text-neutral-900 hover:text-neutral-700 tracking-tight truncate"
                >
                  Dhanush Reddy
                </a>
              </div>

              {/* Availability Badge */}
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] sm:text-xs font-mono font-medium text-neutral-600 truncate">
                  Available for work
                </span>
              </div>
            </div>

            {/* Follow Button */}
            <button
              onClick={handleFollowToggle}
              className={`hidden sm:inline-flex items-center gap-1 ml-1 text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-200 ${
                isFollowing
                  ? 'bg-neutral-100 text-neutral-800 border-neutral-300'
                  : 'bg-white hover:bg-neutral-900 text-neutral-900 hover:text-white border-neutral-300 hover:border-neutral-900 shadow-sm'
              }`}
              title="Follow on GitHub / Updates"
            >
              {isFollowing ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Following</span>
                </>
              ) : (
                <span>+ Follow</span>
              )}
            </button>
          </div>

          {/* Quick Nav Links (Middle - Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 font-mono text-xs text-neutral-600">
            <a href="#work" className="hover:text-neutral-950 transition-colors">/WORK</a>
            <a href="#about" className="hover:text-neutral-950 transition-colors">/ABOUT</a>
            <a href="#skills" className="hover:text-neutral-950 transition-colors">/STACK</a>
            <a href="#education" className="hover:text-neutral-950 transition-colors">/JOURNEY</a>
          </nav>

          {/* Right Side: Quick Interactions & Primary CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Heart / Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-full border text-xs font-mono transition-all duration-200 ${
                hasLiked
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-neutral-50/80 hover:bg-neutral-100 border-neutral-200 text-neutral-700'
              }`}
              aria-label="Like portfolio"
              title="Give a heart"
            >
              <Heart
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  hasLiked ? 'fill-rose-500 text-rose-500 scale-110' : 'text-neutral-600'
                }`}
              />
              <span className="hidden sm:inline font-semibold">{likeCount}</span>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-full border text-xs transition-all duration-200 ${
                isBookmarked
                  ? 'bg-amber-50 border-amber-200 text-amber-600'
                  : 'bg-neutral-50/80 hover:bg-neutral-100 border-neutral-200 text-neutral-700'
              }`}
              aria-label="Bookmark portfolio"
              title="Bookmark this page"
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${
                  isBookmarked ? 'fill-amber-500 text-amber-500' : 'text-neutral-600'
                }`}
              />
            </button>

            {/* Primary CTA: "Get in touch" */}
            <a
              href="#contact"
              className="neo-btn bg-neutral-950 text-white hover:bg-neutral-800 text-xs sm:text-sm font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] flex items-center gap-1.5"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full border border-neutral-200 hover:bg-neutral-100 text-neutral-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-neutral-200/80 flex flex-col gap-2 font-mono text-xs">
            <a
              href="#work"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-100 text-neutral-800 transition-colors"
            >
              /SELECTED WORK
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-100 text-neutral-800 transition-colors"
            >
              /ABOUT ME
            </a>
            <a
              href="#education"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-100 text-neutral-800 transition-colors"
            >
              /EDUCATION
            </a>
            <a
              href="#skills"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-100 text-neutral-800 transition-colors"
            >
              /TECH STACK
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-100 text-neutral-800 transition-colors"
            >
              /CONTACT
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
