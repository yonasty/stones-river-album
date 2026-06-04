import { useRef } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import aboutImage from '../../../assets/JeremyEric.jpeg';
import orchestraImage from '../../../assets/Final Carousel Images/1.jpg';

export function AboutSection() {
  const ref = useRef(null);
  const isMobile = useIsMobile();

  return (
    <section
      ref={ref}
      id="about-stones-river"
      className="relative w-full overflow-hidden bg-section-bg"
    >
      {/* Desktop: side-by-side flex layout */}
      <div className="hidden md:flex">
        {/* Image takes left half */}
        <img
          src={aboutImage}
          alt="Jeremy Kittel and Eric Jacobsen"
          className="w-1/2 object-cover"
        />

        {/* Text on right half — scrolls independently if needed */}
        <div className="w-1/2 flex flex-col justify-center px-[4%] lg:px-[5%] py-8">
          <h2 className="text-[clamp(1.5rem,2.5vw,2.5rem)] text-parchment mb-6 text-left font-light">
            About Stones River
          </h2>

          <div className="text-parchment/85 leading-[1.6] text-[clamp(0.75rem,0.85vw,0.95rem)] space-y-4">
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

      {/* Full-width orchestra image — divides the About content from the Video section */}
      <img
        src={orchestraImage}
        alt="The Orlando Philharmonic Orchestra performing Stones River"
        className="w-full h-auto block"
      />
    </section>
  );
}
