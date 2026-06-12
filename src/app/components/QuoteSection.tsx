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

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 lg:px-12 text-center">
        {/* One continuous quote across the top, attribution beneath it */}
        <p className="font-garamond text-white text-4xl md:text-5xl lg:text-6xl font-light leading-snug mb-3 drop-shadow-[0_3px_12px_rgba(20,35,60,0.7)]">
          "When an orchestra moves intuitively as one, it's utter magic, and Stones River captures that magic"
        </p>
        <p className="font-garamond text-white/90 text-lg md:text-xl tracking-wide mb-8 md:mb-10">
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
