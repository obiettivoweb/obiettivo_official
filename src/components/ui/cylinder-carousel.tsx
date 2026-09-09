"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CarouselImage {
  src: string;
  alt?: string;
}

export interface CylinderCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: CarouselImage[];
  containerClassName?: string;
  cardClassName?: string;
  animationDuration?: number; // in seconds
  cardWidth?: number; // in pixels
}

export const CylinderCarousel = React.forwardRef<HTMLDivElement, CylinderCarouselProps>(
  (
    {
      images,
      className,
      containerClassName,
      cardClassName,
      animationDuration = 32,
      cardWidth = 250,
      ...props
    },
    ref
  ) => {
    const N = images.length;
    
    // We compute the CSS variables here instead of polluting the global CSS
    // --n: number of cards
    // --w: card width
    const customStyle = {
      "--n": N,
      "--w": `${cardWidth}px`,
      "--ba": `calc(1turn / var(--n))`,
      // animation duration
      "--anim-dur": `${animationDuration}s`,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={cn(
          "w-full h-full min-h-[500px] grid place-items-center overflow-clip",
          className
        )}
        style={{
          perspective: "176em",
          maskImage: "linear-gradient(90deg, transparent, #000 20% 80%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 20% 80%, transparent)",
        }}
        {...props}
      >
        <div
          className={cn(
            "grid place-items-center [transform-style:preserve-3d] motion-reduce:!animate-[ry_128s_linear_infinite]",
            containerClassName
          )}
          style={{
            ...customStyle,
            animation: "ry var(--anim-dur) linear infinite",
          }}
        >
          {/* We define the keyframes inline via a style block to ensure it works without global CSS config */}
          <style>
            {`
              @keyframes ry {
                to { transform: rotateY(1turn); }
              }
            `}
          </style>
          
{images.map((img, i) => (
  <div
    key={i}
    className="[grid-area:1/1] flex flex-col items-center [backface-visibility:hidden]"
    style={{
      width: "var(--w)",
      "--i": i,
      transform:
        "rotateY(calc(var(--i) * var(--ba))) translateZ(calc(-1 * (0.5 * var(--w) + 0.5em) / tan(0.5 * (var(--ba)))))",
    } as React.CSSProperties}
  >
    <img
      src={img.src}
      alt={img.alt || `Carousel image ${i}`}
      className={cn(
        "w-full aspect-[7/10] object-cover rounded-2xl",
        cardClassName
      )}
    />

    {img.alt && (
      <span className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-white/80 text-center whitespace-nowrap">
        {img.alt}
      </span>
    )}
  </div>
))}
        </div>
      </div>
    );
  }
);

CylinderCarousel.displayName = "CylinderCarousel";
