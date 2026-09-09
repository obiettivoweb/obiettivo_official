"use client";

import { motion } from "framer-motion";
import CircularGallery from "./CircularGallery";

const GALLERY_ITEMS = [
  { image: "/images/Circular_Gallery/Threads_of_Heritage.webp", text: "Threads of Heritage" },

  { image: "/images/Circular_Gallery/Cultural_Echoes.webp", text: "Cultural Echoes" },

  { image: "/images/Circular_Gallery/Rhythm_in_Motion.webp", text: "Rhythm in Motion" },

  { image: "/images/Circular_Gallery/A_Touch_of_Whimsy.webp", text: "A Touch of Whimsy" },

  { image: "/images/Circular_Gallery/Grace_in_Tradition.webp", text: "Grace in Tradition" },

  { image: "/images/Circular_Gallery/Architectural_Grandeur.webp", text: "Architectural Grandeur" },

  { image: "/images/Circular_Gallery/Colours_of_Devotion.webp", text: "Colours of Devotion" },

  { image: "/images/Circular_Gallery/Hands_That_Shape.webp", text: "Hands That Shape" },

  { image: "/images/Circular_Gallery/Reflections_Within.webp", text: "Reflections Within" },

  { image: "/images/Circular_Gallery/Veil_of_Light.webp", text: "Veil of Light" },

  { image: "/images/Circular_Gallery/Colours_of_Celebration.webp", text: "Colours of Celebration" },

  { image: "/images/Circular_Gallery/Everyday_Stories.webp", text: "Everyday Stories" },

  { image: "/images/Circular_Gallery/Into_the_Mist.webp", text: "Into the Mist" },

  { image: "/images/Circular_Gallery/Whispers_of_the_Wild.webp", text: "Whispers of the Wild" },

  { image: "/images/Circular_Gallery/Beyond_the_Horizon.webp", text: "Beyond the Horizon" },

  { image: "/images/Circular_Gallery/Emerald_Horizons.webp", text: "Emerald Horizons" },

  { image: "/images/Circular_Gallery/Still_Waters.webp", text: "Still Waters" },
];

export default function FeaturedMoments() {
  return (
    <section className="relative w-full bg-transparent pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden flex flex-col items-center">
      {/* Header Container */}
      <div className="relative w-full max-w-4xl px-6 mb-12 flex flex-col items-center justify-center">
        {/* Shutter Watermark graphic on the left */}
        <div className="absolute left-[8%] md:left-[22%] top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-10">
          <svg
            className="w-28 h-28 md:w-36 md:h-36 text-neutral-400 fill-none stroke-[1.2]"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer border & ticking */}
            <circle cx="50" cy="50" r="46" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="42" />

            {/* Aperture blades forming a central octagon opening */}
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
            <span className="text-zinc-500">Curated Reels</span>
          </div>

          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white font-[family-name:var(--font-sora)]">
            Glimpse of <span className="text-blue-500">Lens</span>
          </h2>

          {/* Underline custom indicator */}
          <div className="relative mt-5 h-[2px] w-20 bg-zinc-800 mx-auto overflow-hidden rounded-full">
            <div className="absolute top-0 bottom-0 left-[35%] right-[35%] bg-blue-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="relative w-full h-[600px] flex items-center justify-center">
        <CircularGallery
          items={GALLERY_ITEMS}
          bend={1}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.05}
          fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
          font="bold 30px Orbitron"
          scrollSpeed={2}
        />
      </div>
    </section>
  );
}
