import { useState, useEffect } from "react";
import { Spinner } from "./Spinner";
import { cn } from "@/utils/cn";
import FallbackImg from "@/assets/fallback/fallback.jpg";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export const Image = ({
  src,
  alt,
  className = "",
  ...props
}: ImageProps) => {
  const baseUrl: string = import.meta.env.VITE_API_URL as string;
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!src) {
      setImageSrc(FallbackImg);
      setIsLoading(false);
      return;
    }

    const img = new window.Image();

    img.onload = () => {
      const finalSrc = src.includes("https://") ? src : baseUrl + src;
      setImageSrc(finalSrc);
      setIsLoading(false);
    };

    img.onerror = () => {
      setImageSrc(FallbackImg);
      setIsLoading(false);
    };

    img.src = src.includes("https://") ? src : baseUrl + src;
  }, [src, baseUrl]);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <Spinner />
        </div>
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          loading="lazy"
          className={cn(
            "object-cover w-full h-full rounded-md",
            isLoading ? "opacity-0" : "opacity-100",
            className 
          )}
          {...props}
        />
      )}
    </div>
  );
};
