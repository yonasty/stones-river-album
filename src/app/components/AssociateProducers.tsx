// Awaiting the roster from Ben — the section renders its heading on the brown
// band until names are added here.
const associateProducers: string[] = [];

export function AssociateProducers() {
  return (
    <section
      id="associate-producers"
      className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-associate-bg"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-14 items-start">
        {/* Title */}
        <h2 className="text-parchment text-3xl md:text-4xl lg:text-5xl font-light leading-[1.05] tracking-wide uppercase">
          Associate<br />Producers
        </h2>

        {/* Names */}
        <p className="text-parchment/90 text-base md:text-lg leading-relaxed md:pt-1">
          {associateProducers.join(' / ')}
        </p>
      </div>
    </section>
  );
}
