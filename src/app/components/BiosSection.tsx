'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Globe, ImageIcon } from 'lucide-react';
import { collaborators, type BioData } from '../data/biosData';
import { ContentModal } from './ContentModal';
import { useIsMobile } from '../hooks/useIsMobile';

/**
 * BioCard — displays a collaborator's image, name, bio preview, website icon, and "More" button.
 */
function BioCard({
  bio,
  onClick,
}: {
  bio: BioData;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  // Get first ~150 chars of bio for preview
  const bioPreview = bio.bioText.length > 150
    ? bio.bioText.substring(0, 150).trim() + '...'
    : bio.bioText;

  return (
    <div className="flex flex-col border border-white/10 bg-zinc-900/60 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:border-white/20">
      {/* Image */}
      <div className="overflow-hidden">
        {imgError ? (
          <div className="aspect-square w-full flex flex-col items-center justify-center bg-zinc-800/60 border-b border-white/10">
            <ImageIcon className="size-10 text-white/40 mb-2" />
            <span className="text-sm text-white/50">Image unavailable</span>
          </div>
        ) : (
          <img
            src={bio.image}
            alt={bio.imageAlt}
            loading="lazy"
            className="aspect-square w-full object-cover object-top"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Name */}
        <h3 className="text-lg font-light tracking-wide text-white/90 mb-3 text-center">
          {bio.name}
        </h3>

        {/* Bio preview */}
        <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
          {bioPreview}
        </p>

        {/* Expand button + website icon */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-md
                       border border-white/10 text-white/70 text-base
                       hover:border-white/25 hover:text-white/90 hover:bg-white/5
                       transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <span className="tracking-wide">Expand</span>
          </button>
          <a
            href={bio.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-md border border-white/10 text-white/50 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all duration-200"
            aria-label={`Visit ${bio.name}'s website`}
            onClick={(e) => e.stopPropagation()}
          >
            <Globe className="size-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * BiosSection — "Meet The Makers" section displaying collaborator bio cards.
 * Clicking a card opens a ContentModal with the collaborator's full bio,
 * image, and a globe icon linking to their website.
 */
export function BiosSection() {
  const [selectedBio, setSelectedBio] = useState<BioData | null>(null);
  const [modalImgError, setModalImgError] = useState(false);

  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], isMobile ? [15, -15] : [30, -30]);

  const handleCardClick = (bio: BioData) => {
    setSelectedBio(bio);
    setModalImgError(false);
  };

  const handleModalClose = (open: boolean) => {
    if (!open) {
      setSelectedBio(null);
    }
  };

  return (
    <section
      ref={ref}
      id="meet-the-makers"
      className="relative w-full pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 px-6 md:px-12 lg:px-20 bg-artists-bg"
    >

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-[1400px] mx-auto"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-tight text-center mb-10 md:mb-14">
          Meet the Artists
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {collaborators.map((bio) => (
            <BioCard
              key={bio.id}
              bio={bio}
              onClick={() => handleCardClick(bio)}
            />
          ))}
        </div>
      </motion.div>

      {/* Bio Modal */}
      <ContentModal
        open={selectedBio !== null}
        onOpenChange={handleModalClose}
        className="max-w-5xl"
      >
        {selectedBio && (
          <div className="flex flex-col md:flex-row gap-6 pt-2">
            {/* Left column — image, name, website link */}
            <div className="flex-shrink-0 md:w-2/5 flex flex-col items-center gap-3">
              {modalImgError ? (
                <div className="w-full aspect-[3/4] flex flex-col items-center justify-center bg-zinc-800/60 border border-white/10 rounded-lg">
                  <ImageIcon className="size-10 text-white/40 mb-2" />
                  <span className="text-sm text-white/50">Image unavailable</span>
                </div>
              ) : (
                <img
                  src={selectedBio.image}
                  alt={selectedBio.imageAlt}
                  loading="lazy"
                  className="w-full max-h-[360px] object-cover object-top rounded-lg"
                  onError={() => setModalImgError(true)}
                />
              )}

              {/* Name */}
              <h3 className="text-xl font-light tracking-wide text-white text-center">
                {selectedBio.name}
              </h3>

              {/* Website link */}
              <a
                href={selectedBio.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
                aria-label={`Visit ${selectedBio.name}'s website`}
              >
                <Globe className="size-4" />
                <span className="text-sm">Website</span>
              </a>
            </div>

            {/* Right column — bio text */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="text-white/80 text-sm leading-relaxed space-y-3">
                {selectedBio.bioText.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </ContentModal>
    </section>
  );
}
