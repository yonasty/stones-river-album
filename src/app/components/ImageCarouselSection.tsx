import { useCallback, useEffect, useRef, useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from './ui/carousel';

// Static image imports from assets/Final Carousel Images/
import carouselImage1 from '../../../assets/Final Carousel Images/1.jpg';
import carouselImage2 from '../../../assets/Final Carousel Images/2.png';
import carouselImage3 from '../../../assets/Final Carousel Images/3.jpg';
import carouselImage4 from '../../../assets/Final Carousel Images/4.jpg';
import carouselImage5 from '../../../assets/Final Carousel Images/5.jpeg';

const carouselImages = [
  { src: carouselImage1, filename: '1.jpg' },
  { src: carouselImage2, filename: '2.png' },
  { src: carouselImage3, filename: '3.jpg' },
  { src: carouselImage4, filename: '4.jpg' },
  { src: carouselImage5, filename: '5.jpeg' },
];

const AUTOPLAY_INTERVAL = 5000; // 5 seconds

export function ImageCarouselSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const userInteractedRef = useRef(false);

  const isMobile = useIsMobile();

  // Set up carousel API listeners
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  // Autoplay logic: 5-second interval, stops on user interaction or hover
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) return;
    autoplayRef.current = setInterval(() => {
      if (api && !userInteractedRef.current) {
        api.scrollNext();
      }
    }, AUTOPLAY_INTERVAL);
  }, [api]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!api) return;

    if (!isHovered && !userInteractedRef.current) {
      startAutoplay();
    }

    return () => {
      stopAutoplay();
    };
  }, [api, isHovered, startAutoplay, stopAutoplay]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    stopAutoplay();
  }, [stopAutoplay]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (!userInteractedRef.current) {
      startAutoplay();
    }
  }, [startAutoplay]);

  const handleUserInteraction = useCallback(() => {
    userInteractedRef.current = true;
    stopAutoplay();
    setTimeout(() => {
      userInteractedRef.current = false;
      startAutoplay();
    }, 10000);
  }, [stopAutoplay, startAutoplay]);

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const scrollTo = useCallback(
    (index: number) => {
      if (api) {
        handleUserInteraction();
        api.scrollTo(index);
      }
    },
    [api, handleUserInteraction],
  );

  return (
    <section
      ref={sectionRef}
      id="view-the-gallery"
      className="relative w-full overflow-hidden"
      aria-label="Image Carousel"
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full"
      >
        <Carousel
          opts={{
            loop: true,
            align: 'center',
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent>
            {carouselImages.map((image, index) => (
              <CarouselItem key={index}>
                {imageErrors[index] ? (
                  <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-zinc-900">
                    <ImageIcon className="w-12 h-12 text-white/50 mb-3" />
                    <span className="text-white/60 text-sm">{image.filename}</span>
                  </div>
                ) : (
                  <img
                    src={image.src}
                    alt={`Stones River project image ${index + 1}`}
                    className="w-full h-[100vh] object-cover"
                    onError={() => handleImageError(index)}
                  />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dot indicators — overlaid on the image */}
        {count > 0 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2" role="tablist" aria-label="Carousel slide indicators">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={current === index}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === index
                    ? 'bg-white scale-110'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
