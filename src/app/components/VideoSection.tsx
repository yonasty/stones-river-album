import { motion } from 'motion/react';
import { useRef } from 'react';
import { Youtube } from 'lucide-react';
import teaserThumb from '../../../assets/Teaser Thumbnail.png';

export function VideoSection() {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      id="video"
      className="relative w-full overflow-hidden py-16 md:py-24"
    >
      {/* Texture background */}
      <img
        src="/assets/Video Texture BG.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-20 flex justify-center">
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <VideoPlaceholder />
        </motion.div>
      </div>
    </section>
  );
}

function VideoPlaceholder() {
  return (
    <div className="relative aspect-video w-full bg-black/30 border-2 border-white/20
                    shadow-[0_15px_50px_rgba(0,0,0,0.4)] overflow-hidden group cursor-pointer rounded-lg
                    hover:border-white/40 hover:shadow-[0_15px_50px_rgba(0,0,0,0.6)]
                    transition-all duration-300 backdrop-blur-sm">
      {/* Thumbnail image */}
      <img
        src={teaserThumb}
        alt="Stones River Teaser"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-300">
        <div className="transition-transform duration-300 group-hover:scale-110">
          <Youtube className="w-14 h-14 text-white/90 drop-shadow-lg" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
