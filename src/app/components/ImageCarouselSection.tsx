import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageIcon, Camera, Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from './ui/carousel';
import { ContentModal } from './ContentModal';

// Static image imports from assets/New Image Carousel Images/
import carouselImage1 from '../../../assets/New Image Carousel Images/Image Carousel 1.jpg';
import carouselImage3 from '../../../assets/New Image Carousel Images/Image Carousel 3.jpg';
import carouselImage5 from '../../../assets/New Image Carousel Images/Image Carousel 5.jpg';
import carouselImage6 from '../../../assets/New Image Carousel Images/Image Carousel 6.jpg';
import carouselImage8 from '../../../assets/New Image Carousel Images/Image Carousel 8.jpg';

const carouselImages = [
  { src: carouselImage1, filename: 'Image Carousel 1.jpg', photographer: 'Alex Sturgill', year: '04/25/2022', location: 'Steinmetz Hall' },
  { src: carouselImage3, filename: 'Image Carousel 3.jpg', photographer: 'Alex Sturgill', year: '04/25/2022', location: 'Steinmetz Hall' },
  { src: carouselImage5, filename: 'Image Carousel 5.jpg', photographer: 'Alex Sturgill', year: '04/25/2022', location: 'Steinmetz Hall' },
  { src: carouselImage6, filename: 'Image Carousel 6.jpg', photographer: 'Alex Sturgill', year: '04/25/2022', location: 'Steinmetz Hall' },
  { src: carouselImage8, filename: 'Image Carousel 8.jpg', photographer: 'Alex Sturgill', year: '04/25/2022', location: 'Steinmetz Hall' },
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

  // Gallery modal state
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const isMobile = useIsMobile();

  // Parallax scroll effect matching existing section pattern
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [30, -30] : [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

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

    // Start autoplay when API is ready
    if (!isHovered && !userInteractedRef.current) {
      startAutoplay();
    }

    return () => {
      stopAutoplay();
    };
  }, [api, isHovered, startAutoplay, stopAutoplay]);

  // Pause on hover
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    stopAutoplay();
  }, [stopAutoplay]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    // Resume autoplay only if user hasn't manually interacted
    if (!userInteractedRef.current) {
      startAutoplay();
    }
  }, [startAutoplay]);

  // Stop autoplay on user interaction, resume after 10 seconds of inactivity
  const handleUserInteraction = useCallback(() => {
    userInteractedRef.current = true;
    stopAutoplay();
    // Resume autoplay after 10 seconds of no interaction
    setTimeout(() => {
      userInteractedRef.current = false;
      startAutoplay();
    }, 10000);
  }, [stopAutoplay, startAutoplay]);

  // Handle image load errors
  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  // Navigate to specific dot
  const scrollTo = useCallback(
    (index: number) => {
      if (api) {
        handleUserInteraction();
        api.scrollTo(index);
      }
    },
    [api, handleUserInteraction],
  );

  // Gallery navigation
  const handleGalleryPrev = useCallback(() => {
    setGalleryIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  }, []);

  const handleGalleryNext = useCallback(() => {
    setGalleryIndex((prev) => (prev + 1) % carouselImages.length);
  }, []);

  // Open gallery on image click
  const handleImageClick = useCallback((index: number) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  }, []);

  return (
    <>
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
                    <div className="w-full h-[80vh] flex flex-col items-center justify-center bg-black">
                      <ImageIcon className="w-12 h-12 text-white/50 mb-3" />
                      <span className="text-white/60 text-sm">{image.filename}</span>
                    </div>
                  ) : (
                    <img
                      src={image.src}
                      alt={`Stones River project image ${index + 1}`}
                      className="w-full h-[80vh] object-contain cursor-pointer bg-black"
                      onError={() => handleImageError(index)}
                      onClick={() => handleImageClick(index)}
                    />
                  )}
                </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation arrows overlaid on images */}
              <CarouselPrevious
                className="left-4 bg-black/50 border-white/20 text-white hover:bg-black/70 hover:text-white"
                onMouseDown={handleUserInteraction}
              />
              <CarouselNext
                className="right-4 bg-black/50 border-white/20 text-white hover:bg-black/70 hover:text-white"
                onMouseDown={handleUserInteraction}
              />
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

      {/* Gallery Modal */}
      <ContentModal open={galleryOpen} onOpenChange={setGalleryOpen} className="max-w-4xl">
        <div className="space-y-6 pt-6">
          {/* Title */}
          <h3 className="text-xl font-light tracking-wide text-white text-center">
            The Stones River Gallery
          </h3>

          {/* Image with prev/next navigation */}
          <div className="relative w-full flex items-center justify-center">
            {/* Previous button */}
            <button
              onClick={handleGalleryPrev}
              className="absolute left-0 z-10 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={carouselImages[galleryIndex].src}
              alt={`Gallery image ${galleryIndex + 1}`}
              className="max-w-full max-h-[60vh] object-contain rounded-lg"
            />

            {/* Next button */}
            <button
              onClick={handleGalleryNext}
              className="absolute right-0 z-10 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Metadata */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span>{carouselImages[galleryIndex].photographer}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{carouselImages[galleryIndex].year}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{carouselImages[galleryIndex].location}</span>
            </div>
          </div>

          {/* Image counter */}
          <p className="text-center text-white/40 text-xs">
            {galleryIndex + 1} / {carouselImages.length}
          </p>
        </div>
      </ContentModal>
    </>
  );
}
