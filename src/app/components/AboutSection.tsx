import { useRef } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import aboutImage from '../../../assets/JeremyEric.jpeg';
import orchestraImage from '../../../assets/Final Carousel Images/1.jpg';
import albumCover from '../../../assets/album-cover.jpg';

export function AboutSection() {
  const ref = useRef(null);
  const isMobile = useIsMobile();

  const scrollToPreorder = () => {
    document.getElementById('preorder-stones-river')?.scrollIntoView({ behavior: 'smooth' });
  };

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
            <p>Because Stones River draws so deeply on melodies from early America, the music carries an ineffable sense of voices from the past reaching toward the present — and the questions those voices tend to raise.</p>
          </div>
        </div>
      </div>

      {/* Album cover + orchestra image — divides the About content from the Video section */}
      <div className="px-6 md:px-12 lg:px-20 py-12 md:py-16 flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-10">
        {/* Album cover art + pre-order button */}
        <div className="flex flex-col items-center gap-6 w-full max-w-xs md:w-[260px] lg:w-[300px] shrink-0">
          <img
            src={albumCover}
            alt="Stones River album cover art"
            className="w-full h-auto block rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.4)]"
          />
          <button
            type="button"
            onClick={scrollToPreorder}
            className="w-full inline-flex items-center justify-center py-3 px-6 rounded-md
                       border border-parchment/50 text-parchment text-sm uppercase tracking-[0.18em]
                       hover:bg-parchment hover:text-warm-black hover:border-parchment
                       transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-parchment/40"
          >
            Pre-Order the Album
          </button>
        </div>

        {/* Orchestra image — matches the cover column height (flush top + bottom), fills remaining width */}
        <div className="relative w-full md:flex-1 md:min-w-0 aspect-[16/9] md:aspect-auto rounded-lg overflow-hidden">
          <img
            src={orchestraImage}
            alt="The Orlando Philharmonic Orchestra performing Stones River"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
