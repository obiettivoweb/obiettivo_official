"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Eye, Filter, ChevronDown } from "lucide-react";
import { CylinderCarousel } from "@/components/ui/cylinder-carousel";
import Masonry from "./Masonry";
import FestivalsSection from "@/components/home/FestivalsSection";

// Gallery Items Data
const GALLERY_ITEMS = [
  {
    id: 1,
    image: "/images/Gallery_Exhibits/monochrome.webp",
    category: "Monochrome",
    title: "Stories in Shades",
    description:
      "A world captured beyond colour, where light and shadow take centre stage. Explore moments shaped by contrast, emotion, and timeless simplicity.",
    exploreUrl: "https://drive.google.com/drive/folders/1UlAFD6SliWNW9Uyq4HgByq2QZkllG5sl",
  },
  {
    id: 2,
    image: "/images/Gallery_Exhibits/BirdEye.webp",
    category: "Bird Eye",
    title: "A View from Above",
    description:
      "See the world from a different perspective. Discover landscapes, patterns, and moments captured from above, revealing details often missed from the ground.",
    exploreUrl: "https://drive.google.com/drive/folders/1ltWFI1ijXzRUQHLJkuG2CGWy5_MYAkkv?usp=drive_link",
  },
  {
    id: 3,
    image: "/images/Gallery_Exhibits/campus.webp",
    category: "Campus",
    title: "Life Around Campus",
    description:
      "From quiet corners to lively pathways, campus is filled with stories waiting to be captured. A collection of everyday moments that define student life.",
    exploreUrl: "https://drive.google.com/drive/folders/1FcJ5dh7fc9KhCbIxCHBW-2NoD1wo3IKD?usp=drive_link",
  },
  {
    id: 4,
    image: "/images/Gallery_Exhibits/clubEvents.webp",
    category: "Club Events",
    title: "Moments That Bring Us Together",
    description:
      "The energy, excitement, and memories behind our events. Relive the moments where creativity, collaboration, and community come alive.",
    exploreUrl: "https://drive.google.com/drive/folders/1F9wwvhPjMX61l8RF2inMnYGeFSzKlU4H?usp=drive_link",
  },
  {
    id: 5,
    image: "/images/Gallery_Exhibits/portrait.webp",
    category: "Portrait",
    title: "Faces & Stories",
    description:
      "Every face carries a story, a mood, and a moment. Explore portraits that capture personality, expression, and the individuality behind every frame.",
    exploreUrl: "https://drive.google.com/drive/folders/1gXz45bRMAeZjxos5Q8HfVYQ0pKs0xH-I?usp=drive_link",
  },
  {
    id: 6,
    image: "/images/Gallery_Exhibits/anonymous.webp",
    category: "Anonymous",
    title: "Unknown, Yet Captured",
    description:
      "A collection of moments where identity takes a back seat to the frame. Faces, figures, and fleeting details remain unnamed, leaving the photograph open to interpretation.",
    exploreUrl: "https://drive.google.com/drive/folders/11094GWn-BVz8vRWbSLkL0O1F5ysqi5ay?usp=drive_link",
  },
  {
    id: 7,
    image: "/images/Gallery_Exhibits/wildlife.webp",
    category: "Wildlife",
    title: "Wild, Untamed & Alive",
    description:
      "A glimpse into the world beyond our own. Discover the beauty, movement, and quiet moments of wildlife through the lens.",
    exploreUrl: "https://drive.google.com/drive/folders/1aVq2vMAvcf-6xqr0k4yeXjJfOLeWjHZR?usp=drive_link",
  },
  {
    id: 8,
    image: "/images/Gallery_Exhibits/Nature.webp",
    category: "Nature",
    title: "Where Nature Speaks",
    description:
      "From vast landscapes to quiet details, nature offers endless perspectives. A collection celebrating the colours, textures, and calm of the natural world.",
    exploreUrl: "https://drive.google.com/drive/folders/1GL03QI4vEAdA36fmmTjQl3Ic9FvPHdI7?usp=drive_link",
  },
  {
    id: 9,
    image: "/images/Gallery_Exhibits/creative.webp",
    category: "Creative Shoot",
    title: "Beyond the Ordinary",
    description:
      "Where imagination meets the camera. Experimental ideas, unique compositions, and creative perspectives come together to create something unexpected.",
    exploreUrl: "https://drive.google.com/drive/folders/1X0nSvyZWe4UYhqdyeeyFnBb3sS_Deb_8?usp=drive_link",
  },
  {
    id: 10,
    image: "/images/Gallery_Exhibits/admin&Gub.webp",
    category: "Admin & Gymkhana",
    title: "The People Behind the Scenes",
    description:
      "Celebrating the people and moments that keep campus life moving. A collection of activities, interactions, and memories from the administrative and gymkhana spaces.",
    exploreUrl: "https://drive.google.com/drive/folders/1P2wpCoCx3p7iZSmgnUdxXPY_vWgZBG2c?usp=drive_link",
  },
];

// Carousel items (WebGL)
const CAROUSEL_ITEMS = [
  { image: "/images/Gallery_Carousel/Bloom.webp", text: "Bloom" },
  { image: "/images/Gallery_Carousel/Solitude.webp", text: "Solitude" },
  { image: "/images/Gallery_Carousel/Heritage.webp", text: "Heritage" },
  { image: "/images/Gallery_Carousel/Stillness.webp", text: "Stillness" },
  { image: "/images/Gallery_Carousel/Rhythm.webp", text: "Rhythm" },
  { image: "/images/Gallery_Carousel/Tradition.webp", text: "Tradition" },
  { image: "/images/Gallery_Carousel/Embers.webp", text: "Embers" },
  { image: "/images/Gallery_Carousel/Grace.webp", text: "Grace" },
  { image: "/images/Gallery_Carousel/Focus.webp", text: "Focus" },
  { image: "/images/Gallery_Carousel/Devotion.webp", text: "Devotion" },
  { image: "/images/Gallery_Carousel/Glimpse.webp", text: "Glimpse" },
  { image: "/images/Gallery_Carousel/Geometry.webp", text: "Geometry" },
  { image: "/images/Gallery_Carousel/Freedom.webp", text: "Freedom" },
  { image: "/images/Gallery_Carousel/Luminescence.webp", text: "Luminescence" },
  { image: "/images/Gallery_Carousel/Craft.webp", text: "Craft" },
  { image: "/images/Gallery_Carousel/Perspective.webp", text: "Perspective" },
  { image: "/images/Gallery_Carousel/Noir.webp", text: "Noir" },
  { image: "/images/Gallery_Carousel/Wanderlust.webp", text: "Wanderlust" },
  { image: "/images/Gallery_Carousel/Culture.webp", text: "Culture" },
  { image: "/images/Gallery_Carousel/Essence.webp", text: "Essence" },
  { image: "/images/Gallery_Carousel/Petals.webp", text: "Petals" },
  { image: "/images/Gallery_Carousel/Serenity.webp", text: "Serenity" },
  { image: "/images/Gallery_Carousel/Euphoria.webp", text: "Euphoria" },
];

const CAROUSEL_IMAGES = CAROUSEL_ITEMS.map((item) => ({
  src: item.image,
  alt: item.text,
}));

const CATEGORIES = ["All", "Monochrome", "Street", "Portraits", "Nature", "Creative"];

export default function GalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);

  const filteredItems =
    selectedCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const masonryItems = filteredItems.map((item, index) => {
    // Generate balanced distinct heights for staggered masonry layout
    const heights = [320, 280, 360, 300, 290, 370, 340, 290, 310, 290];
    const height = heights[index % heights.length];
    return {
      id: item.id.toString(),
      img: item.image,
      url: "#",
      height: height,
      category: item.category,
      title: item.title,
    };
  });

  return (
    <div className="relative min-h-screen w-full bg-transparent text-neutral-200 overflow-x-hidden pt-28 pb-0">
      
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0" />
      
      {/* 1. Header Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center select-none mb-10">
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-blue-500 font-[family-name:var(--font-syncopate)] block mb-4">
          Visual Exposition
        </span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-[family-name:var(--font-sora)]">
          The <span className="text-blue-500 font-light">Exhibition</span> Room
        </h1>
        <p className="mt-4 text-sm md:text-base font-light text-zinc-400 max-w-2xl mx-auto font-[family-name:var(--font-inter)] leading-relaxed">
          Through the viewfinder, we compose our thoughts. Explore NIT Silchar's premier collections, captured moments, and cinematic storytelling.
        </p>
      </section>

      {/* 2. Interactive Curvature Slider Section */}
      <section className="relative z-10 w-full h-[500px] md:h-[560px] mb-20 overflow-hidden flex items-center justify-center border-t border-white/5 bg-zinc-950/20 backdrop-blur-[1px]">
        <div className="w-full h-full">
          <CylinderCarousel images={CAROUSEL_IMAGES} cardWidth={300} animationDuration={55} />
        </div>
        
        {/* Glowing pulsing separator line at the top of the section */}
        <div 
          className="absolute top-0 left-0 right-0 h-[2px] animate-[pulse-glow_4s_ease-in-out_infinite]"
          style={{
            background: "linear-gradient(90deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 40%, rgba(59, 130, 246, 1) 45%, rgba(59, 130, 246, 1) 55%, rgba(59, 130, 246, 0.2) 60%, rgba(59, 130, 246, 0.2) 100%)",
          }}
        />

        <style>
          {`
            @keyframes pulse-glow {
              0%, 100% {
                opacity: 0.25;
                filter: drop-shadow(0 0 2px rgba(59, 130, 246, 0.3));
              }
              50% {
                opacity: 1.0;
                filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.8));
              }
            }
          `}
        </style>
      </section>

      {/* 3. Filterable Grid Area */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title and Dropdown Filter Panel */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-white/5 pb-8 mb-12 gap-6 relative">
          <div className="flex items-center gap-3 select-none">
            <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white font-[family-name:var(--font-sora)]">
              Exhibits Collective
            </h2>
          </div>

          {/* Photography Category Dropdown Selector at corner right */}
          <div className="relative min-w-[220px] w-full sm:w-auto">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full sm:w-[220px] flex items-center justify-between bg-[#0b0b0c] border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold tracking-wider uppercase text-zinc-300 hover:text-white hover:border-white/20 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Filter size={13} className="text-blue-500" />
                <span className="truncate">{selectedCategory} Exhibition</span>
              </div>
              <ChevronDown
                size={14}
                className={`text-zinc-500 transition-transform duration-300 ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Options Absolute Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  {/* Backdrop click to overlay close */}
                  <div
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[calc(100%+8px)] right-0 left-0 sm:left-auto sm:w-[220px] z-50 overflow-hidden bg-[#0c0c0e]/95 border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl max-h-[300px] overflow-y-auto"
                  >
                    <div className="p-1.5 space-y-1">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setIsDropdownOpen(false);
                          }}
                          className={`
                            w-full text-left px-3.5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer
                            ${
                              selectedCategory === cat
                                ? "bg-blue-600/20 text-blue-400 border border-blue-500/10"
                                : "hover:bg-white/[0.04] text-zinc-400 hover:text-white"
                            }
                          `}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Photos Grid using Masonry */}
        <div className="w-full">
          <Masonry
            items={masonryItems}
            ease="power3.out"
            duration={0.6}
            stagger={0.04}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.96}
            blurToFocus
            colorShiftOnHover={false}
            onItemClick={(clickedItem) => {
              const originalItem = GALLERY_ITEMS.find((g) => g.id.toString() === clickedItem.id);
              if (originalItem) {
                setSelectedPhoto(originalItem);
              }
            }}
          />
        </div>
      </section>

      {/* 4. College Festivals Archives */}
      <FestivalsSection />

      {/* 5. Fullscreen Photo Lightbox Modal */}
<AnimatePresence>
  {selectedPhoto && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-md"
      onClick={() => setSelectedPhoto(null)}
    >
      <div
        className="relative max-w-5xl w-full h-[85vh] bg-[#0b0b0c] border border-white/10 rounded-2xl overflow-hidden flex flex-col md:grid md:grid-cols-[1.4fr_0.6fr]"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close Button */}
        <button
          onClick={() => setSelectedPhoto(null)}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/60 border border-white/10 text-white/80 hover:text-white cursor-pointer hover:bg-black"
        >
          ✕
        </button>

        {/* Photo Area */}
        <div className="relative w-full h-[40vh] md:h-full min-h-0 bg-black flex items-center justify-center">
          <img
            src={selectedPhoto.image}
            alt={selectedPhoto.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Sidebar */}
        <div
          className="
            relative
            h-full
            min-h-0
            overflow-hidden
            bg-[#0b0b0c]
            border-t md:border-t-0 md:border-l border-white/10
            grid
            grid-rows-[minmax(0,1fr)_auto]
          "
        >

          {/* Scrollable Content */}
          <div className="min-h-0 overflow-y-auto p-6 md:p-8">

            {/* Category */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-blue-400 font-[family-name:var(--font-syncopate)] px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                {selectedPhoto.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="mt-5 text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-inter)] tracking-tight">
              {selectedPhoto.title}
            </h2>

            {/* Description */}
            <p className="mt-4 text-sm md:text-base text-zinc-400 leading-relaxed font-[family-name:var(--font-inter)]">
              {selectedPhoto.description}
            </p>

            {/* Explore More */}
            {selectedPhoto.exploreUrl && (
              <button
                onClick={() =>
                  window.open(selectedPhoto.exploreUrl, "_blank")
                }
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  w-fit
                  px-4
                  py-2.5
                  rounded-lg
                  bg-blue-500/10
                  border
                  border-blue-500/20
                  text-blue-400
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  hover:bg-blue-500
                  hover:text-white
                  transition-all
                  duration-300
                  cursor-pointer
                "
              >
                Explore More
                <span className="text-sm">→</span>
              </button>
            )}

          </div>

          {/* Fixed Copyright Footer */}
          <div
            className="
              shrink-0
              w-full
              px-6
              md:px-8
              pt-4
              pb-6
              md:pb-8
              border-t
              border-white/5
              bg-[#0b0b0c]
            "
          >
            <p className="text-[10px] text-zinc-500 leading-relaxed font-[family-name:var(--font-inter)]">
              &copy; 2026 Obiettivo Club. Selected for the digital exhibition
              at NIT Silchar. All rights reserved to their respective artists.
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}
