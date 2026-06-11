import orchestraImage from '../../../assets/quote-orchestra.jpg';

export function QuoteSection() {
  return (
    <section id="quote" className="relative w-full overflow-hidden py-16 md:py-24">
      {/* Painterly Stones River landscape background */}
      <img
        src="/assets/quote-photo-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />
      {/* Subtle scrim for text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/30 pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 lg:px-20 text-center">
        {/* One continuous quote across the top, attribution beneath it */}
        <p className="font-heading text-white text-2xl md:text-3xl lg:text-4xl font-normal uppercase tracking-wide leading-snug mb-3 drop-shadow-[0_3px_12px_rgba(20,35,60,0.7)]">
          "When an orchestra moves intuitively as one, it's utter magic, and Stones River captures that magic"
        </p>
        <p className="font-heading text-white/90 text-base md:text-lg tracking-wide mb-8 md:mb-10">
          — Jeremy Kittel
        </p>

        {/* Orchestra — front and center */}
        <img
          src={orchestraImage}
          alt="The Orlando Philharmonic Orchestra performing Stones River"
          className="w-full h-auto block rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.35)]"
        />
      </div>
    </section>
  );
}
