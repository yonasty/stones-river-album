const bioParagraphs = [
  'Stones River is a collaborative album between composer and fiddler Jeremy Kittel, Grammy-nominated conductor Eric Jacobsen (The Knights, Brooklyn Rider), and Orlando Philharmonic Orchestra.',
  'The project began when Eric and the OPO invited Jeremy to compose a new work drawing from early American music — spanning the Revolutionary War through the Civil War. The result was Stones River, a piece that weaves together melodies from across that era into a contemporary, almost dream-like whole, led throughout by a solo fiddle.',
  'The album’s title refers to the Battle of Stones River in 1862. On the night before the conflict, military bands from opposing sides were camped close enough to engage in a kind of musical duel — and remarkably, the two groups eventually united across battle lines to play the beloved song “Home Sweet Home” together.',
  'After a successful premiere, plans to record eventually followed. The album brings together Jacobsen’s conducting and the Philharmonic’s playing with Kittel’s composing and fiddling across a program that spans the centuries. Also featured: mandolinist Josh Pinkham stepping in for the harpsichord role in a movement of Vivaldi, flutist Colleen Blagov on an orchestral version of Kittel’s composition “Pando,” and Gottschalk’s underrecognized Symphony No. 2 — written just after the Civil War and similarly steeped in early American themes.',
  'The album’s visual identity comes from painter Rush Baker IV, whose recent series reframes Civil War scenes through abstraction of the massive Cyclorama paintings of the 1880s. His work, brought to the project by designer Ben Tousley, mirrors what the music does: blurring past and present, memory and imagination, American history and its ongoing meaning.',
  'Because Stones River draws so deeply on melodies from early America, the music carries an ineffable sense of voices from the past reaching toward the present — and the questions those voices tend to raise.',
];

export function FullBioSection() {
  return (
    <section
      id="full-bio"
      className="w-full py-16 md:py-20 px-6 md:px-12 lg:px-16 bg-full-bio-bg"
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-parchment/70 text-xs md:text-sm tracking-[0.22em] uppercase mb-6">
          About the Album
        </p>
        <div className="font-garamond text-parchment/90 text-base md:text-lg leading-[1.75] space-y-4">
          {bioParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
