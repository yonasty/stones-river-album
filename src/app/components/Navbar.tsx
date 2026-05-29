import { useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About Stones River', href: '#about-stones-river' },
  { label: 'View the Gallery', href: '#view-the-gallery' },
  { label: 'Meet the Makers', href: '#meet-the-makers' },
  { label: 'Preorder Stones River', href: '#preorder-stones-river' },
  { label: 'Media', href: '#media' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  }, []);

  return (
    <nav className="w-full flex-shrink-0">
      {/* Desktop nav items */}
      <div className="hidden md:flex items-center justify-center gap-10 py-5">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="font-['Playfair_Display'] text-amber-200 hover:text-amber-100 text-[15px] tracking-wide transition-colors duration-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden flex justify-center py-3">
        <button
          type="button"
          className="p-2 text-amber-200 hover:text-amber-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/40 backdrop-blur-sm">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block py-3 font-['Playfair_Display'] text-amber-200 hover:text-amber-100 text-[15px] tracking-wide transition-colors duration-200 text-center"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
