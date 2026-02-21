import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  images: string[];
  autoPlayInterval?: number;
}

export default function Carousel({ images, autoPlayInterval = 6000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [images.length, autoPlayInterval]);

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <div className="relative w-full group">
      <div className="relative overflow-hidden w-screen aspect-[16/9] md:aspect-[16/9]">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              index === currentIndex
                ? 'opacity-100 z-10'
                : 'opacity-0 z-0'
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}

        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full hidden md:flex items-center justify-center transition-all duration-300 opacity-100 hover:scale-110 z-20"
          style={{ backgroundColor: 'rgba(10, 54, 175, 0.8)' }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} color="white" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full hidden md:flex items-center justify-center transition-all duration-300 opacity-100 hover:scale-110 z-20"
          style={{ backgroundColor: 'rgba(10, 54, 175, 0.8)' }}
          aria-label="Next slide"
        >
          <ChevronRight size={24} color="white" />
        </button>

        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor: index === currentIndex ? '#ffc85b' : 'rgba(255, 255, 255, 0.5)',
                transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}