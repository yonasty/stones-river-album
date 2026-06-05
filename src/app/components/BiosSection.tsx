import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { collaborators, type BioData } from '../data/biosData';

/**
 * BioCard — collaborator image, name + role, full bio, and a "Visit site" button.
 */
function BioCard({ bio }: { bio: BioData }) {
  const [imgError, setImgError] = useState(false);

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
          className="aspect-square w-full object-cover object-top rounded-lg"
          onError={() => setImgError(true)}
        />
      )}

      {/* Name + role (left) and Visit Site button (right) */}
      <div className="flex items-center justify-between gap-4 mt-5">
        <div>
          <h3 className="text-xl md:text-2xl font-light tracking-wide text-white">
            {bio.name}
          </h3>
          {bio.role && (
            <p className="text-white/60 text-sm md:text-base mt-1">{bio.role}</p>
          )}
        </div>
        <a
          href={bio.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center justify-center gap-2 py-3 px-7 rounded-md
                     border border-white/10 text-white/70 text-base
                     hover:border-white/25 hover:text-white/90 hover:bg-white/5
                     transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-label={`Visit ${bio.name}'s website`}
        >
          <span className="tracking-wide">Visit Site</span>
        </a>
      </div>

      {/* Full bio */}
      <div className="text-white/70 text-sm leading-relaxed space-y-3 mt-5 flex-1">
        {bio.bioText.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

/**
 * BiosSection — "Meet the Artists": each collaborator's full bio is shown inline,
 * with name, role, and a button linking out to their website.
 */
export function BiosSection() {
  return (
    <section
      id="meet-the-makers"
      className="relative w-full pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 px-6 md:px-12 lg:px-20 bg-artists-bg"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-tight mb-10 md:mb-14">
          Meet the Artists
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-stretch">
          {collaborators.map((bio) => (
            <BioCard key={bio.id} bio={bio} />
          ))}
        </div>
      </div>
    </section>
  );
}
