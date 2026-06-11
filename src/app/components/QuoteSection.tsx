import orchestraImage from '../../../assets/quote-orchestra.jpg';
import duoImage from '../../../assets/quote-duo.jpg';

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

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* One continuous quote across the top */}
        <p className="font-heading text-white text-2xl md:text-3xl lg:text-4xl font-normal uppercase tracking-wide leading-snug mb-8 md:mb-10 drop-shadow-[0_3px_12px_rgba(20,35,60,0.7)]">
          "When an orchestra moves intuitively as one, it's utter magic, and Stones River captures that magic"
        </p>

        {/* Two photos side by side, tops aligned */}
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
          {/* Orchestra */}
          <div className="md:flex-[2.2] md:min-w-0">
            <img
              src={orchestraImage}
              alt="The Orlando Philharmonic Orchestra performing Stones River"
              className="w-full h-auto block rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.35)]"
            />
          </div>

          {/* Duo + attribution */}
          <div className="md:flex-1 md:min-w-0">
            <img
              src={duoImage}
              alt="Jeremy Kittel and Eric Jacobsen"
              className="w-full h-auto block rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.35)]"
            />
            <p className="font-heading text-white/90 text-base md:text-lg tracking-wide mt-3 md:text-right">
              — Jeremy Kittel
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
