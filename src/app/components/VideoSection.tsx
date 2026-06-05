import { motion } from 'motion/react';
import { useRef } from 'react';
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
          <video
            controls
            playsInline
            preload="metadata"
            poster={teaserThumb}
            className="w-full aspect-video bg-black rounded-lg border-2 border-white/20
                       shadow-[0_15px_50px_rgba(0,0,0,0.4)]"
          >
            <source src="/assets/stones-river-sizzle.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </section>
  );
}
