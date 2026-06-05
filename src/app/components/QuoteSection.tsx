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
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-12">
          {/* Left — opening quote + orchestra image */}
          <div className="md:flex-[1.6] md:min-w-0">
            <p className="text-white text-xl md:text-2xl lg:text-3xl italic font-light uppercase tracking-wide leading-snug mb-6 md:mb-8 drop-shadow-[0_2px_8px_rgba(30,45,70,0.5)]">
              "When an orchestra moves intuitively as one, it's utter magic..."
            </p>
            <img
              src={orchestraImage}
              alt="The Orlando Philharmonic Orchestra performing Stones River"
              className="w-full h-auto block rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.35)]"
            />
          </div>

          {/* Right — duo image + closing quote */}
          <div className="md:flex-1 md:min-w-0 md:pt-16 lg:pt-24">
            <img
              src={duoImage}
              alt="Jeremy Kittel and Eric Jacobsen"
              className="w-full h-auto block rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.35)]"
            />
            <p className="text-white text-xl md:text-2xl lg:text-3xl italic font-light uppercase tracking-wide leading-snug mt-6 drop-shadow-[0_2px_8px_rgba(30,45,70,0.5)]">
              "...and Stones River captures that magic"
            </p>
            <p className="text-white/85 text-sm md:text-base italic tracking-wide mt-3 md:text-right">
              — Jeremy Kittel
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
