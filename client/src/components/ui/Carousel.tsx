import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import FallbackImg from "@/assets/fallback/fallback.jpg";

interface CarouselProps {
  images: string[];
  interval?: number;
  className?: string;
}

export const Carousel = ({
  images,
  interval = 5000,
  className = "",
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(Date.now());

  const fadeVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 }
  };

  const resetTimer = () => setTimerKey(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, timerKey]); // Reinicia con timerKey

  const goToSlide = (index: number) => {
    resetTimer();
    setCurrentIndex(index);
  };

  return (
    <div className={cn("relative w-full h-full overflow-hidden select-none", className)}>
      <AnimatePresence mode='wait'>
        <motion.img
          key={currentIndex}
          src={images[currentIndex] || FallbackImg}
          alt={`Slide ${currentIndex + 1}`}
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            duration: 0.8,
            ease: "easeInOut"
          }}
          className="absolute w-full h-full object-cover rounded-xl"
        />
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <motion.button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full focus:outline-none cursor-pointer",
              currentIndex === index ? "bg-white" : "bg-gray-400/80"
            )}
            onClick={() => goToSlide(index)}
            initial={false}
            animate={{
              scale: currentIndex === index ? 1.2 : 1,
              width: currentIndex === index ? 24 : 12
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        ))}
      </div>
    </div>
  );
};