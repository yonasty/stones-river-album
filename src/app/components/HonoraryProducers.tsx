const honoraryProducers = [
  'David and Judy Albertson',
  'Sally Blackmun and Michael Elsberry',
  'Susan Bright and Larry Stevenson',
  'Elizabeth Nerius Conklin',
  'J. Laurence and Susan Costin',
  'Frank and Mary Doherty',
  'Dykes and Lisa Everett',
  'Pat and Audrey Knipe',
  'Philip and Andrea Kobrin',
  'Steve Goldman and Melanie Love',
  'Janice Gruber',
  'Mary Palmer',
  'Fred and Jeanie Raffa',
  'John and Lee Benz',
  'John Casebier',
  'Barbara Caldwell',
  'Valerie and Paul Collins',
  'Whitworth Cotten',
];

export function HonoraryProducers() {
  return (
    <section
      id="honorary-producers"
      className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-honorary-bg"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-14 items-start">
        {/* Title */}
        <h2 className="text-parchment text-3xl md:text-4xl lg:text-5xl font-light leading-[1.05] tracking-wide uppercase">
          Honorary<br />Producers
        </h2>

        {/* Names */}
        <p className="text-parchment/90 text-base md:text-lg leading-relaxed md:pt-1">
          {honoraryProducers.join(' / ')}
        </p>
      </div>
    </section>
  );
}
