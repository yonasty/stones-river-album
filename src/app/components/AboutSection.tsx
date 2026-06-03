import { useRef } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import aboutImage from '../../../assets/JeremyEric.jpeg';

export function AboutSection() {
  const ref = useRef(null);
  const isMobile = useIsMobile();

  return (
    <section
      ref={ref}
      id="about-stones-river"
      className="relative w-full overflow-hidden"
    >
      {/* Desktop: 50/50 layout — image determines height, text absolutely positioned */}
      <div className="hidden md:block relative">
        {/* Image takes left half, determines section height */}
        <img
          src={aboutImage}
          alt="Jeremy Kittel and Eric Jacobsen"
          className="w-1/2 h-auto block"
        />

        {/* Text overlay on right half — all content must fit within image height */}
        <div className="absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center px-[3%] lg:px-[4%] overflow-y-auto py-[2%]">
          <h2 className="text-[clamp(0.9rem,1.6vw,1.75rem)] text-parchment mb-[0.4vw] text-center font-light shrink-0">
            About Stones River
          </h2>

          <div className="text-parchment/85 leading-[1.35] text-[clamp(0.55rem,0.72vw,0.9rem)] space-y-[clamp(0.15rem,0.3vw,0.4rem)]">
            <p>
              Stones River is a collaborative album between composer and fiddler Jeremy Kittel, Grammy-nominated conductor Eric Jacobsen (The Knights, Brooklyn Rider), and the Orlando Philharmonic Orchestra.
            </p>

            <p>
              The project began when Eric and the OPO invited Jeremy to compose a new work drawing from early American music — spanning the Revolutionary War through the Civil War. The result was Stones River, a piece that weaves together melodies from across that era into a contemporary, almost dream-like whole, led throughout by a solo fiddle.
            </p>

            <p>
              The album's title refers to the Battle of Stones River in 1862. On the night before the conflict, military bands from opposing sides were camped close enough to engage in a kind of musical duel — and remarkably, the two groups eventually united across battle lines to play the beloved song "Home Sweet Home" together.
            </p>

            <p>
              After a successful premiere, plans to record eventually followed. The album brings together Jacobsen's conducting and the Philharmonic's playing with Kittel's composing and fiddling across a program that spans the centuries. Also featured: mandolinist Josh Pinkham stepping in for the harpsichord role in a movement of Vivaldi, flutist Colleen Blagov on an orchestral version of Kittel's composition "Pando," and Gottschalk's underrecognized Symphony No. 2 — written just after the Civil War and similarly steeped in early American themes.
            </p>

            <p>
              The album's visual identity comes from painter Rush Baker IV, whose recent series reframes Civil War scenes through abstraction of the massive Cyclorama paintings of the 1880s. His work, brought to the project by designer Ben Tousley, mirrors what the music does: blurring past and present, memory and imagination, American history and its ongoing meaning.
            </p>

            <p>
              Because Stones River draws so deeply on melodies from early America, the music carries an ineffable sense of voices from the past reaching toward the present — and the questions those voices tend to raise.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: stacked layout */}
      <div className="md:hidden">
        <img
          src={aboutImage}
          alt="Jeremy Kittel and Eric Jacobsen"
          className="w-full h-auto block"
        />
        <div className="px-6 py-6">
          <h2 className="text-2xl text-parchment mb-4 text-center font-light">
            About Stones River
          </h2>
          <div className="text-parchment/90 leading-[1.6] text-sm space-y-3">
            <p>Stones River is a collaborative album between composer and fiddler Jeremy Kittel, Grammy-nominated conductor Eric Jacobsen (The Knights, Brooklyn Rider), and the Orlando Philharmonic Orchestra.</p>
            <p>The project began when Eric and the OPO invited Jeremy to compose a new work drawing from early American music — spanning the Revolutionary War through the Civil War. The result was Stones River, a piece that weaves together melodies from across that era into a contemporary, almost dream-like whole, led throughout by a solo fiddle.</p>
            <p>The album's title refers to the Battle of Stones River in 1862. On the night before the conflict, military bands from opposing sides were camped close enough to engage in a kind of musical duel — and remarkably, the two groups eventually united across battle lines to play the beloved song "Home Sweet Home" together.</p>
            <p>After a successful premiere, plans to record eventually followed. The album brings together Jacobsen's conducting and the Philharmonic's playing with Kittel's composing and fiddling across a program that spans the centuries.</p>
            <p>The album's visual identity comes from painter Rush Baker IV, whose recent series reframes Civil War scenes through abstraction of the massive Cyclorama paintings of the 1880s.</p>
            <p>Because Stones River draws so deeply on melodies from early America, the music carries an ineffable sense of voices from the past reaching toward the present — and the questions those voices tend to raise.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
