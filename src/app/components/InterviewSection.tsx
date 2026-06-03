import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Youtube } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';
import experienceBg from '../../../assets/Experience Section Visual Reference.png';
import teaserThumb from '../../../assets/Teaser Thumbnail.png';

export function InterviewSection() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const videoY = useTransform(scrollYProgress, [0, 1], isMobile ? [20, -20] : [40, -40]);

  return (
    <section
      ref={ref}
      id="experience"
      className="relative w-full overflow-hidden"
    >
      {/* Background image — shows full dimensions */}
      <div className="relative w-full">
        <img
          src={experienceBg}
          alt=""
          className="w-full h-auto block"
          aria-hidden="true"
        />

        {/* YouTube embed overlay — positioned to the right */}
        <div className="absolute inset-0 flex items-center justify-end pr-6 md:pr-12 lg:pr-20">
          <motion.div
            style={{ y: videoY }}
            className="w-full max-w-md md:max-w-xl lg:max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <VideoPlaceholder />
          </motion.div>
        </div>
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
