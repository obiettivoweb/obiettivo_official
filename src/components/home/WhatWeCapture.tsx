"use client";

import { PerspectiveCarousel } from "@/components/ui/perspective-carousel";
import { BorderBeam } from "@/components/ui/border-beam";

const photographyCategories = [
  {
    src: "images/whatWeCapture/monochrome.webp",
    title: "Monochrome"
  },
  {
    src: "images/whatWeCapture/wildlife.webp",
    title: "Wild Life"
  },
  {
    src: "images/whatWeCapture/portraits.webp",
    title: "Portraits"
  },
  {
    src: "images/whatWeCapture/landscape.webp",
    title: "Landscapes"
  },
  {
    src: "images/whatWeCapture/creative.webp",
    title: "Creative"
  },
  {
    src: "images/whatWeCapture/architectural.webp",
    title: "Architectural"
  }
];

export default function WhatWeCapture() {
  return (
    <section className="relative w-full bg-transparent pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden flex flex-col items-center border-t border-white/5">
      {/* Header Container */}
      <div className="relative w-full max-w-4xl px-6 mb-12 flex flex-col items-center justify-center">
        {/* Shutter Watermark graphic offset on the right */}
        <div className="absolute right-[8%] md:right-[22%] top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-10">
          <svg
            className="w-28 h-28 md:w-36 md:h-36 text-neutral-400 fill-none stroke-[1.2]"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer border & ticking */}
            <circle cx="50" cy="50" r="46" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="42" />
            
            {/* Aperture blades */}
            <line x1="90" y1="50" x2="33.1" y2="86.2" />
            <line x1="78.3" y1="78.3" x2="12.4" y2="63.7" />
            <line x1="50" y1="90" x2="13.8" y2="33.1" />
            <line x1="21.7" y1="78.3" x2="36.3" y2="12.4" />
            <line x1="10" y1="50" x2="66.9" y2="13.8" />
            <line x1="21.7" y1="21.7" x2="87.6" y2="36.3" />
            <line x1="50" y1="10" x2="86.2" y2="66.9" />
            <line x1="78.3" y1="21.7" x2="63.7" y2="87.6" />
            
            {/* Inner ring */}
            <circle cx="50" cy="50" r="16" strokeWidth="0.5" strokeDasharray="1 2" />
          </svg>
        </div>

        {/* Heading Text */}
        <div className="relative z-10 text-center select-none">
          <div className="flex justify-center items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] font-[family-name:var(--font-syncopate)]">
            <span className="text-zinc-500">Categories</span>
          </div>

          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white font-[family-name:var(--font-sora)]">
            What we <span className="text-blue-500">capture</span>
          </h2>

          {/* Underline custom indicator */}
          <div className="relative mt-5 h-[2px] w-20 bg-zinc-800 mx-auto overflow-hidden rounded-full">
            <div className="absolute top-0 bottom-0 left-[35%] right-[35%] bg-blue-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* 3D Perspective Carousel Container with BorderBeam box highlighting */}
      <div className="relative h-[500px] w-full max-w-7xl overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/20 backdrop-blur-[2px] flex items-center justify-center">
        <BorderBeam
          borderWidth={1.5}
          duration={12}
          colorFrom="#3b82f6"
          colorTo="#60a5fa"
          size={300}
        />
        <div className="relative z-10 w-full flex items-center justify-center">
          <PerspectiveCarousel
            items={photographyCategories}
            defaultActiveIndex={2}
            slideWidth={220}
            rotationStep={45}
            inactiveScale={0.82}
            loop={true}
            className="h-[480px] bg-transparent text-white border-none w-full"
            controlsClassName="dark:border-white/5 dark:bg-zinc-950/80"
          />
        </div>
      </div>
    </section>
  );
}
