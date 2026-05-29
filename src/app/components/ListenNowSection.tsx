import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const dspPlatforms = [
  { name: 'Spotify', icon: '🎵', url: '#spotify-link' },
  { name: 'Apple Music', icon: '🍎', url: '#apple-music-link' },
  { name: 'TIDAL', icon: '🌊', url: '#tidal-link' },
  { name: 'YouTube Music', icon: '▶️', url: '#youtube-music-link' },
  { name: 'Amazon Music', icon: '📦', url: '#amazon-music-link' },
  { name: 'Deezer', icon: '💿', url: '#deezer-link' },
];

export function ListenNowSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center py-20 px-6"
    >
      {/* Semi-transparent overlay for text readability against blue background */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl w-full text-center"
      >
        <h2 className="text-5xl md:text-6xl text-parchment mb-16">
          Listen Now
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {dspPlatforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-6
                         border border-sepia/30 bg-warm-black/40 backdrop-blur-sm
                         transition-all duration-300 hover:border-brass hover:bg-brass/10
                         hover:shadow-[0_0_20px_rgba(184,134,11,0.2)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
                {platform.icon}
              </div>
              <span className="text-parchment/80 text-sm tracking-wide group-hover:text-brass transition-colors">
                {platform.name}
              </span>
            </motion.a>
          ))}
        </div>

        <p className="mt-12 text-sepia/60 text-sm tracking-wider uppercase">
          Placeholder links — Final smart links to be added
        </p>
      </motion.div>
    </section>
  );
}
