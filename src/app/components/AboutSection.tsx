import albumCover from '../../../assets/album-cover.jpg';

const bioParagraphs = [
  'Stones River is a collaborative album between composer and fiddler Jeremy Kittel, Grammy-nominated conductor Eric Jacobsen (The Knights, Brooklyn Rider), and the Orlando Philharmonic Orchestra.',
  'The project began when Eric and the OPO invited Jeremy to compose a new work drawing from early American music — spanning the Revolutionary War through the Civil War. The result was Stones River, a piece that weaves together melodies from across that era into a contemporary, almost dream-like whole, led throughout by a solo fiddle.',
  'The album\'s title refers to the Battle of Stones River in 1862. On the night before the conflict, military bands from opposing sides were camped close enough to engage in a kind of musical duel — and remarkably, the two groups eventually united across battle lines to play the beloved song "Home Sweet Home" together.',
  'Because Stones River draws so deeply on melodies from early America, the music carries an ineffable sense of voices from the past reaching toward the present — and the questions those voices tend to raise.',
];

export function AboutSection() {
  const scrollToPreorder = () => {
    document.getElementById('preorder-stones-river')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="about-stones-river"
      className="relative w-full bg-section-bg px-6 md:px-12 lg:px-20 py-14 md:py-20"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-10 lg:gap-16">
        {/* Left — album cover art + pre-order button */}
        <div className="flex flex-col gap-6 w-full max-w-sm md:w-[360px] lg:w-[420px] shrink-0">
          <img
            src={albumCover}
            alt="Stones River album cover art"
            className="w-full aspect-square object-cover block rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.4)]"
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

        {/* Right — heading, collaborators, bio */}
        <div className="flex-1 w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-parchment font-light mb-4">
            About Stones River
          </h2>
          <p className="text-parchment/90 text-sm md:text-base font-medium tracking-wide uppercase mb-6">
            Jeremy Kittel <span className="text-parchment/40">•</span> Eric Jacobsen <span className="text-parchment/40">•</span> Orlando Philharmonic Orchestra
          </p>
          <div className="text-parchment/85 leading-[1.7] text-sm md:text-base space-y-4">
            {bioParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
