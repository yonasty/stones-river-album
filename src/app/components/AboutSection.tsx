import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import aboutImage from '../../../assets/JeremyEric.jpeg';

export function AboutSection() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], isMobile ? [20, -20] : [40, -40]);

  return (
    <section
      ref={ref}
      id="about-stones-river"
      className="relative w-full flex items-center py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-20"
    >
      {/* Semi-transparent overlay for text readability against blue background */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <motion.div
        style={{ y: textY }}
        className="relative z-10 max-w-5xl mx-auto w-full"
      >
        <h2 className="text-4xl md:text-5xl text-parchment mb-8">
          About Stones River
        </h2>

        <div className="text-parchment/90 leading-[1.8] text-base md:text-lg">
          {/* Image floated right so text wraps around it */}
          <img
            src={aboutImage}
            alt="Stones River recording session"
            className="hidden md:block float-right ml-8 mb-6 w-[50%] max-w-[480px] h-auto object-contain rounded-lg"
          />

          <p className="mb-6">
            Stones River is a collaborative album from acclaimed violinist and composer Jeremy Kittel, Grammy-nominated conductor Eric Jacobsen, and the Orlando Philharmonic Orchestra, releasing July 3, 2026.
          </p>

          <p className="mb-6">
            The project was born when Kittel was invited by Jacobsen and the OPO to compose a piece drawing from early American music — from the Revolutionary War through the Civil War. The result is a sweeping musical landscape that weaves together folk traditions, Celtic and bluegrass influences, and contemporary classical sensibilities, led throughout by Kittel's signature solo fiddle voice.
          </p>

          <p className="mb-6">
            The album's title is a nod to the 1862 Battle of Stones River, where, on the eve of the conflict, military bands from opposing sides camped close enough to engage in a spontaneous musical duel — an image that feels central to the album's spirit. As Kittel drew from these melodies, he found himself asking deeper questions: what is the meaning of this country? What are its ideals — and do we actively live up to them?
          </p>

          <p className="mb-6 italic">
            "There's something extraordinary about hearing these melodies bloom inside a full orchestra," says Kittel. "Eric and the musicians of the Orlando Philharmonic brought such warmth and imagination to the music. It felt like the pieces were finally arriving at the home they'd been searching for."
          </p>

          <p className="mb-6">
            Together, Kittel, Jacobsen, and the Orlando Philharmonic have created something at once cinematic, soulful, and quietly profound — music that reaches across generations, and invites listeners into a vivid world alive with possibility.
          </p>

          <p>
            Stones River is available on all digital platforms and in physical formats on July 3, 2026.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
