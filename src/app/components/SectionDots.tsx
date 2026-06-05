import { useState, useEffect, useRef, useCallback } from 'react';

interface SectionInfo {
  id: string;
  label: string;
}

const sections: SectionInfo[] = [
  { id: 'home', label: 'Home' },
  { id: 'about-stones-river', label: 'About' },
  { id: 'meet-the-makers', label: 'The Artists' },
  { id: 'video', label: 'Video' },
  { id: 'preorder-stones-river', label: 'Preorder' },
];

export function SectionDots() {
  const [activeSection, setActiveSection] = useState(0);
  const [visible, setVisible] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Intersection Observer to detect which section is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section, index) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(index);
            }
          });
        },
        { threshold: 0.1, rootMargin: '-40% 0px -40% 0px' }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Show dots on scroll, hide after 2 seconds of inactivity
  const handleScroll = useCallback(() => {
    setVisible(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 2000);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  const handleDotClick = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-4 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {sections.map((section, index) => (
        <button
          key={section.id}
          type="button"
          onClick={() => handleDotClick(section.id)}
          className="flex items-center gap-3 group"
          aria-label={`Navigate to ${section.label}`}
        >
          {/* Label - only visible for active dot */}
          <span
            className={`text-xs tracking-wide transition-all duration-300 whitespace-nowrap ${
              activeSection === index
                ? 'text-white/90 opacity-100 translate-x-0'
                : 'text-white/0 opacity-0 translate-x-2 group-hover:text-white/70 group-hover:opacity-100 group-hover:translate-x-0'
            }`}
          >
            {section.label}
          </span>

          {/* Dot */}
          <span
            className={`block rounded-full transition-all duration-300 ${
              activeSection === index
                ? 'w-3 h-3 bg-white'
                : 'w-2 h-2 bg-white/40 group-hover:bg-white/70'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
