import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import heroImage from '../../../assets/SRStaticHeader.jpeg';

export function HomeHeroSection() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [10, -10] : [20, -20]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative w-full overflow-hidden"
    >
      <img
        src={heroImage}
        alt="Stones River"
        className="w-full h-auto block"
      />
    </section>
  );
}
