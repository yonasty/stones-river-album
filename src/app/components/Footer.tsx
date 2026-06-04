import { useState } from 'react';
import opoLogo from '../../../assets/OPO Footer Logo Transparent.png';

const connectLinks = [
  { name: 'Jeremy Kittel', url: 'https://jeremykittel.com/' },
  { name: 'Eric Jacobsen', url: 'https://www.jacobseneric.com/' },
  { name: 'Orlando Philharmonic Orchestra', url: 'https://orlandophil.org/' },
];

export function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="w-full py-14 md:py-16 px-6 md:px-12 lg:px-16 bg-footer-bg">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 md:gap-6">
        {/* Left — OPO logo, pushed to the corner */}
        <div className="flex justify-center md:justify-start">
          {logoError ? (
            <div
              className="h-[64px] flex items-center justify-center border border-white/30 rounded px-4 bg-white/10"
              role="img"
              aria-label="Orlando Philharmonic Orchestra"
            >
              <span className="text-parchment/80 text-sm whitespace-nowrap">
                Orlando Philharmonic Orchestra
              </span>
            </div>
          ) : (
            <img
              src={opoLogo}
              alt="Orlando Philharmonic Orchestra logo"
              loading="lazy"
              className="h-[72px] md:h-[88px] w-auto object-contain"
              onError={() => setLogoError(true)}
            />
          )}
        </div>

        {/* Middle — Connect */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h3 className="text-parchment/90 text-base font-semibold tracking-[0.15em] uppercase">
            Connect
          </h3>
          <ul className="flex flex-col items-center gap-2">
            {connectLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-parchment/80 text-base font-medium hover:text-parchment underline-offset-4 hover:underline transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — copyright */}
        <p className="text-parchment/90 text-base font-medium text-center md:text-right leading-relaxed">
          © 2026 Orlando Philharmonic Orchestra &amp; © 2025 Nethermead Records. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
