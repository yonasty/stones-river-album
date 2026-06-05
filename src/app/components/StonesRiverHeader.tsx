import { useState, useCallback, useEffect, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function StonesRiverHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);
  const { itemCount, openDrawer } = useCart();

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

    const handleScroll = () => {
      const bannerBottom = banner.getBoundingClientRect().bottom;
      setIsStuck(bannerBottom <= 0);
      setIsAtTop(window.scrollY <= 4);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Sticky navigation — pinned to the very top, above the banner */}
      <nav className={`sr-nav ${isStuck ? 'sr-nav--stuck' : isAtTop ? 'sr-nav--top' : ''}`} aria-label="Primary" data-open={String(menuOpen)}>
        <a
          className="sr-nav__logo"
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          aria-label="Stones River — home"
        >
          <img src="/assets/stones-river-logo.png" alt="Stones River" />
        </a>

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
          <li><a className="sr-nav__link" href="#meet-the-makers" onClick={(e) => handleNavClick(e, '#meet-the-makers')}>The Artists</a></li>
          <li><a className="sr-nav__link" href="#video" onClick={(e) => handleNavClick(e, '#video')}>Video</a></li>
          <li><a className="sr-nav__link" href="#preorder-stones-river" onClick={(e) => handleNavClick(e, '#preorder-stones-river')}>Preorder</a></li>
        </ul>

        <button
          type="button"
          className="sr-nav__cart"
          onClick={openDrawer}
          aria-label={`Shopping cart${itemCount > 0 ? `, ${itemCount} item${itemCount > 1 ? 's' : ''}` : ''}`}
        >
          <ShoppingCart strokeWidth={1.6} aria-hidden="true" />
          {itemCount > 0 && (
            <span className="sr-nav__cart-badge" aria-hidden="true">
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}
        </button>
      </nav>

      {/* Banner image — sits directly below the nav */}
      <div id="home" ref={bannerRef}>
        <img
          className="w-full h-auto block"
          src="/assets/stones-river-banner-v2.jpg"
          width={2880}
          height={792}
          alt="Stones River — a new album from Jeremy Kittel, Eric Jacobsen, and the Orlando Philharmonic Orchestra"
        />
      </div>
    </>
  );
}
