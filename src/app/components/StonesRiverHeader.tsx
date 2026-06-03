import { useState, useCallback, useEffect, useRef } from 'react';

export function StonesRiverHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When banner is out of view, nav is stuck
        setIsStuck(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '0px' }
    );

    observer.observe(banner);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="home">
      {/* Banner image with nav overlaid at top */}
      <div className="relative" ref={bannerRef}>
        <picture>
          <source
            type="image/webp"
            srcSet="/assets/stones-river-banner-1920.webp 1920w, /assets/stones-river-banner.webp 3840w"
            sizes="100vw"
          />
          <img
            className="w-full h-auto block"
            src="/assets/stones-river-banner.jpg"
            width={3840}
            height={1093}
            alt="Stones River — a new album from Jeremy Kittel, Eric Jacobsen, and the Orlando Philharmonic Orchestra"
          />
        </picture>
      </div>

      {/* Sticky navigation — sits at top, sticks on scroll */}
      <nav className={`sr-nav ${isStuck ? 'sr-nav--stuck' : ''}`} aria-label="Primary" data-open={String(menuOpen)}>
        <button
          className="sr-nav__toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="sr-menu"
          aria-label="Toggle navigation menu"
          onClick={handleToggle}
        >
          <span></span>
        </button>

        <ul className="sr-nav__links" id="sr-menu">
          <li><a className="sr-nav__link" href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
          <li><a className="sr-nav__link" href="#about-stones-river" onClick={(e) => handleNavClick(e, '#about-stones-river')}>About</a></li>
          <li><a className="sr-nav__link" href="#experience" onClick={(e) => handleNavClick(e, '#experience')}>Experience</a></li>
          <li><a className="sr-nav__link" href="#meet-the-makers" onClick={(e) => handleNavClick(e, '#meet-the-makers')}>The Makers</a></li>
          <li><a className="sr-nav__link" href="#view-the-gallery" onClick={(e) => handleNavClick(e, '#view-the-gallery')}>Gallery</a></li>
          <li><a className="sr-nav__link" href="#preorder-stones-river" onClick={(e) => handleNavClick(e, '#preorder-stones-river')}>Preorder</a></li>
        </ul>
      </nav>
    </div>
  );
}
