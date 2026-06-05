import orchestraImage from '../../../assets/quote-orchestra.jpg';
import duoImage from '../../../assets/quote-duo.jpg';

export function QuoteSection() {
  return (
    <section id="quote" className="relative w-full overflow-hidden py-16 md:py-24">
      {/* Texture background */}
      <img
        src="/assets/Video Texture BG.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
          {/* Left — opening quote, then the orchestra image (sits lower) */}
          <div className="md:flex-[1.7] md:min-w-0">
            <p className="text-white text-2xl md:text-3xl lg:text-4xl italic font-normal uppercase tracking-wide leading-snug mb-8 md:mb-10 drop-shadow-[0_3px_12px_rgba(20,35,60,0.7)]">
              "When an orchestra moves intuitively as one, it's utter magic..."
            </p>
            <img
              src={orchestraImage}
              alt="The Orlando Philharmonic Orchestra performing Stones River"
              className="w-full h-auto block rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.35)]"
            />
          </div>

          {/* Right — duo image up top (staggered), then the closing quote below */}
          <div className="md:flex-1 md:min-w-0">
            <img
              src={duoImage}
              alt="Jeremy Kittel and Eric Jacobsen"
              className="w-full h-auto block rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.35)]"
            />
            <p className="text-white text-2xl md:text-3xl lg:text-4xl italic font-normal uppercase tracking-wide leading-snug mt-8 md:mt-10 md:text-right drop-shadow-[0_3px_12px_rgba(20,35,60,0.7)]">
              "...and Stones River captures that magic"
            </p>
            <p className="text-white/90 text-base md:text-lg italic tracking-wide mt-3 md:text-right">
              — Jeremy Kittel
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
