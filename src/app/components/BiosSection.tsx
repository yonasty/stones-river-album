import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { collaborators, type BioData } from '../data/biosData';
import { ContentModal } from './ContentModal';

const BIO_PREVIEW_LIMIT = 300;

/**
 * BioCard — image, name + role, and a truncated bio preview that highlights on
 * hover and opens the full bio in a modal when clicked.
 */
function BioCard({ bio, onExpand }: { bio: BioData; onExpand: () => void }) {
  const [imgError, setImgError] = useState(false);

  const isTruncated = bio.bioText.length > BIO_PREVIEW_LIMIT;
  const previewText = isTruncated
    ? bio.bioText.slice(0, BIO_PREVIEW_LIMIT).replace(/\s+\S*$/, '').replace(/\s+/g, ' ').trim()
    : bio.bioText;

  return (
    <div className="flex flex-col h-full">
      {/* Image */}
      {imgError ? (
        <div className="aspect-square w-full flex flex-col items-center justify-center bg-zinc-800/60 border border-white/10 rounded-lg">
          <ImageIcon className="size-10 text-white/40 mb-2" />
          <span className="text-sm text-white/50">Image unavailable</span>
        </div>
      ) : (
        <img
          src={bio.image}
          alt={bio.imageAlt}
          loading="lazy"
          onClick={onExpand}
          className="aspect-square w-full object-cover object-top rounded-lg cursor-pointer"
          onError={() => setImgError(true)}
        />
      )}

      {/* Name + role */}
      <div className="mt-5">
        <h3 className="text-xl md:text-2xl font-light tracking-wide text-white">
          {bio.name}
        </h3>
        {bio.role && (
          <p className="text-white/60 text-sm md:text-base mt-1">{bio.role}</p>
        )}
      </div>

      {/* Clickable bio preview — the whole block highlights on hover and opens the full bio */}
      <button
        type="button"
        onClick={onExpand}
        className="bio-shimmer block w-full text-left flex-1 mt-5
                   text-white/70 text-sm leading-relaxed cursor-pointer
                   focus:outline-none"
        aria-label={`Read the full bio for ${bio.name}`}
      >
        {previewText}
        {isTruncated && (
          <span className="text-white/40 tracking-widest"> …</span>
        )}
      </button>
    </div>
  );
}

/**
 * BiosSection — "Meet the Artists": each card shows a preview bio ending in a
 * clickable ellipsis that opens a modal with the full image, name, role, bio,
 * and website link.
 */
export function BiosSection() {
  const [selectedBio, setSelectedBio] = useState<BioData | null>(null);
  const [modalImgError, setModalImgError] = useState(false);

  const openBio = (bio: BioData) => {
    setSelectedBio(bio);
    setModalImgError(false);
  };

  return (
    <section
      id="meet-the-makers"
      className="relative w-full pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 px-6 md:px-12 lg:px-20 bg-artists-bg"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-tight uppercase mb-10 md:mb-14">
          Meet the Artists
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-stretch">
          {collaborators.map((bio) => (
            <BioCard key={bio.id} bio={bio} onExpand={() => openBio(bio)} />
          ))}
        </div>
      </div>

      {/* Full bio modal */}
      <ContentModal
        open={selectedBio !== null}
        onOpenChange={(open) => !open && setSelectedBio(null)}
        className="max-w-5xl"
      >
        {selectedBio && (
          <div className="flex flex-col md:flex-row gap-6 pt-2">
            {/* Image */}
            <div className="md:w-2/5 shrink-0">
              {modalImgError ? (
                <div className="w-full aspect-square flex flex-col items-center justify-center bg-zinc-800/60 border border-white/10 rounded-lg">
                  <ImageIcon className="size-10 text-white/40 mb-2" />
                  <span className="text-sm text-white/50">Image unavailable</span>
                </div>
              ) : (
                <img
                  src={selectedBio.image}
                  alt={selectedBio.imageAlt}
                  className="w-full h-auto block rounded-lg"
                  onError={() => setModalImgError(true)}
                />
              )}
            </div>

            {/* Name, role, bio */}
            <div className="flex-1 flex flex-col">
              <h3 className="text-2xl md:text-3xl font-light tracking-wide text-white">
                {selectedBio.name}
              </h3>
              {selectedBio.role && (
                <p className="text-white/60 text-sm md:text-base mt-1">{selectedBio.role}</p>
              )}
              <div className="text-white/80 text-sm leading-relaxed space-y-3 mt-4">
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
