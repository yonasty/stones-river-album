import { useState } from 'react';
import opoLogo from '../../../assets/OPO Logo Transparent.png';

export function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="w-full py-10">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 px-6">
        {/* OPO Logo */}
        {logoError ? (
          <div
            className="max-h-[48px] h-[48px] flex items-center justify-center border border-white/30 rounded px-4 bg-white/10"
            role="img"
            aria-label="Orlando Philharmonic Orchestra"
          >
            <span className="text-white/80 text-sm whitespace-nowrap">
              Orlando Philharmonic Orchestra
            </span>
          </div>
        ) : (
          <img
            src={opoLogo}
            alt="Orlando Philharmonic Orchestra logo"
            loading="lazy"
            className="max-h-[48px] w-auto object-contain"
            onError={() => setLogoError(true)}
          />
        )}

        {/* Copyright text */}
        <p className="text-white/90 text-sm text-center">
          Nethermead Records © & ® 2025 The Orlando Philharmonic Orchestra. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
