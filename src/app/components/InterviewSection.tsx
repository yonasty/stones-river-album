import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Youtube } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

export function InterviewSection() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const videoY = useTransform(scrollYProgress, [0, 1], isMobile ? [50, -50] : [100, -100]);

  return (
    <section
      ref={ref}
      id="media"
      className="relative w-full flex items-center justify-center py-32 px-6 overflow-hidden"
    >
      {/* Semi-transparent overlay for text readability against blue background */}
      <div className="absolute inset-0 bg-zinc-900/50 pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <motion.div
          style={{ y: videoY }}
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <VideoPlaceholder number={1} />
        </motion.div>
      </div>
    </section>
  );
}

function VideoPlaceholder({ number }: { number: number }) {
  return (
    <div className="relative aspect-video w-full bg-warm-black/10 border-2 border-dark-brown/20
                    shadow-[0_15px_50px_rgba(26,20,16,0.25)] overflow-hidden group cursor-pointer
                    hover:border-brass/60 hover:shadow-[0_15px_50px_rgba(184,134,11,0.2)]
                    transition-all duration-300">
      {/* YouTube embed placeholder
          TODO: Replace with actual YouTube embed iframe.
          Expected value: YouTube video URL provided by client (e.g., https://www.youtube.com/embed/VIDEO_ID)
          Source: Client will provide interview video URLs for embedding */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-warm-black/70 to-dark-brown/70">
        <div className="flex flex-col items-center space-y-4 transition-transform duration-300 group-hover:scale-110">
          <Youtube className="w-14 h-14 text-brass" strokeWidth={1.5} />
          <span className="text-parchment text-sm tracking-wide">
            Stones River Teaser
          </span>
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-brass/0 group-hover:bg-brass/5 transition-colors duration-300" />
    </div>
  );
}
