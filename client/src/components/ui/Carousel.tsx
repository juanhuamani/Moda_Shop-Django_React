import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import FallbackImg from "@/assets/fallback/fallback.jpg";
import { cn } from "@/utils/cn";

interface CarouselProps {
  images: string[];
  interval?: number;
  className?: string;
}

const visibleVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
};

const reducedVariants = {
  hidden: { opacity: 1, scale: 1 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 1, scale: 1 },
};

export const Carousel = ({
  images,
  interval = 5000,
  className = "",
}: CarouselProps) => {
  const reduceMotion = Boolean(useReducedMotion());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackKey, setPlaybackKey] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const slideCount = images.length;
  const autoplayEnabled = slideCount > 1 && !reduceMotion;
  const isAutoplaying = isPlaying && autoplayEnabled;
  const currentImage = images[currentIndex] || FallbackImg;
  const imageSrc = failedImages[currentImage] ? FallbackImg : currentImage;

  useEffect(() => {
    if (currentIndex >= slideCount) {
      setCurrentIndex(0);
    }
  }, [currentIndex, slideCount]);

  useEffect(() => {
    if (!isAutoplaying) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % slideCount);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval, isAutoplaying, playbackKey, slideCount]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setPlaybackKey((previous) => previous + 1);
  };

  const handleImageError = () => {
    if (!failedImages[currentImage]) {
      setFailedImages((previous) => ({ ...previous, [currentImage]: true }));
    }
  };

  const variants = reduceMotion ? reducedVariants : visibleVariants;

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-card bg-surface text-foreground shadow-card",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={imageSrc}
          alt={slideCount ? `Imagen ${currentIndex + 1} de ${slideCount}` : "Imagen no disponible"}
          onError={handleImageError}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      <button
        type="button"
        aria-label={
          autoplayEnabled
            ? isAutoplaying
              ? "Pausar carrusel"
              : "Reproducir carrusel"
            : "Reproducción automática desactivada"
        }
        aria-pressed={autoplayEnabled ? isAutoplaying : undefined}
        disabled={!autoplayEnabled}
        onClick={() => setIsPlaying((previous) => !previous)}
        className="absolute right-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-control border border-border bg-surface/90 text-foreground shadow-elevated backdrop-blur transition-colors hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isAutoplaying ? (
          <Pause className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Play className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {slideCount > 1 && (
        <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1">
          {images.map((image, index) => {
            const isActive = currentIndex === index;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                aria-label={`Ir a la diapositiva ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => goToSlide(index)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-2 rounded-full transition-all",
                    isActive ? "w-6 bg-ring" : "w-2 bg-muted-foreground/60"
                  )}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
