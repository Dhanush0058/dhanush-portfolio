import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ringRef = useRef({ x: -100, y: -100 });
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .cursor-pointer, .interactive-card, .neo-card, .neo-btn'
      );

      if (interactive) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId: number;

    const render = () => {
      // Lerp ring towards mouse position
      const ease = 0.18;
      ringRef.current.x += (mouseRef.current.x - ringRef.current.x) * ease;
      ringRef.current.y += (mouseRef.current.y - ringRef.current.y) * ease;

      if (ringElementRef.current) {
        ringElementRef.current.style.transform = `translate3d(${ringRef.current.x}px, ${ringRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        className="custom-cursor-dot"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          opacity: isHovering ? 0 : 1,
        }}
      />

      {/* Outer Magnetic Ring */}
      <div
        ref={ringElementRef}
        className={`custom-cursor-ring ${isHovering ? 'hovering' : ''}`}
      />
    </>
  );
};

export default CustomCursor;
