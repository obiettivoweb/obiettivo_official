"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import SequentialProjectExpand from "@/components/ui/SequentialProjectExpand";
import AccordionGallery from "@/components/ui/AccordionGallery";
import { ImageScatter } from "@/components/ui/image-scatter";

const PROJECT_SLIDES = [
  {
    src: "/images/Projects/frames.webp",
    badge: "Project I",
    title: "FRAMES",
    heading: "Frames Exhibition",
    description: "Our flagship annual photography exhibition, highlighting the finest frames captured by club members."
  },
  {
    src: "/images/Projects/pixelate.webp",
    badge: "Project II",
    title: "PIXELATE",
    heading: "Pixelate Photowalks",
    description: "A street photography initiative capturing local life, rustic markets, and the vibrant people of Assam."
  },
  {
    src: "/images/Projects/campus.webp",
    badge: "Project III",
    title: "CAMPUS CHRONICLES",
    heading: "Campus Chronicles",
    description: "Celebrating the campus of NIT Silchar, documented in frames from tranquil lakes to historic corridors.",
    exploreLink: "/gallery"
  }
];

const ACCORDION_ITEMS = [
  { image: "/images/Exhibited_Frames/Delicate.webp", label: "Delicate", link: "#" },
  { image: "/images/Exhibited_Frames/Gaze.webp", label: "Gaze", link: "#" },
  { image: "/images/Exhibited_Frames/Ink_&_Imagination.webp", label: "Ink & Imagination", link: "#" },
  { image: "/images/Exhibited_Frames/Grandeur.webp", label: "Grandeur", link: "#" },
  { image: "/images/Exhibited_Frames/Rhythm.webp", label: "Rhythm", link: "#" }
];

const SCATTER_DATA = [
  {
    heading: "PERSPECTIVES",
    images: [
      "/images/projects_scattered/perspective1.webp",
      "/images/projects_scattered/perspective2.webp"
    ]
  },
  {
    heading: "LIGHT & SHADOW",
    images: [
      "/images/projects_scattered/light&shadow2.webp",
      "/images/projects_scattered/light&shadow1.webp"
    ]
  },
  {
    heading: "STORIES UNTOLD",
    images: [
      "/images/projects_scattered/storiesUntold1.webp",
      "/images/projects_scattered/storiesUntold2.webp"
    ]
  }
];

export default function ProjectsClient() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 500);
  const heroTranslateY = -scrollY * 0.25;

  return (
    <div className="relative w-full bg-transparent text-neutral-200">

      {/* 1. Page Header (GSAP ImageScatter Hero) */}
      <section 
        className="relative w-full h-[95vh] flex items-center justify-center border-b border-white/5 z-10 overflow-hidden will-change-[transform,opacity]"
        style={{
          opacity: heroOpacity,
          transform: `translate3d(0, ${heroTranslateY}px, 0)`,
          pointerEvents: heroOpacity === 0 ? "none" : "auto"
        }}
      >
        <ImageScatter
          data={SCATTER_DATA}
          cardWidth={260}
          cardHeight={320}
          animationDuration={0.8}
          animationOverlap={0.45}
          headingFadeDuration={0.4}
          className="h-full w-full"
        />

        {/* Floating Page Intro text block below the heading */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-xl text-center select-none pointer-events-none">
          <div className="flex justify-center items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] font-[family-name:var(--font-syncopate)] text-blue-500 mb-3">
            <span>Obiettivo NIT Silchar</span>
          </div>
          <p className="text-zinc-400 text-xs md:text-sm font-[family-name:var(--font-inter)] leading-relaxed bg-black/40 backdrop-blur-md py-3 px-6 rounded-full border border-white/5">
            A journey through our lenses. Scroll to explore curated moments and expositions.
          </p>
        </div>

      </section>

      {/* 2. Photo Gallery Demo Section */}
      <section className="relative w-full pt-20 pb-12 md:pt-28 md:pb-16 bg-transparent z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12 flex flex-col items-center justify-center select-none">
            <div className="flex items-center justify-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] font-[family-name:var(--font-syncopate)] text-zinc-500 mb-4">
              <span>Curated</span>
              <span className="text-blue-500">Moments</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-sora)] tracking-tight text-white mb-6">
              Exhibited <span className="text-blue-500">Frames</span>
            </h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-2xl font-[family-name:var(--font-inter)] leading-relaxed">
              Standalone photographs showcasing our members' distinct artistic expressions, featuring different techniques and perspectives in composition.
            </p>
          </div>

          {/* Accordion Gallery */}
          <div className="w-full">
            <AccordionGallery
              items={ACCORDION_ITEMS}
              defaultIndex={2}
              expandRatio={0.55}
              trigger="hover"
              accentColor="#3b82f6"
              overlayColor="#050505"
              textColor="#ffffff"
              grayscale
              showLabels
              duration={0.6}
              ease="power3.out"
              parallax={0.5}
              tilt={8}
              stagger={0.06}
              height={520}
              gap={12}
              radius={16}
              orientation="horizontal"
            />
          </div>
        </div>
      </section>

      {/* 3. The Projects One-by-One */}
      <section className="relative w-full z-20 bg-transparent border-t border-white/5 pt-4 md:pt-6 pb-0 mb-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-6 text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] font-[family-name:var(--font-syncopate)] text-zinc-500 mb-4">
              <span>Detailed</span>
              <span className="text-blue-500">Expositions</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-sora)] tracking-tight text-white mb-6">
              Our <span className="text-blue-500">Projects</span>
            </h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-2xl font-[family-name:var(--font-inter)] leading-relaxed">
              Explore our structured projects documenting campus life, culture, landscapes, and storytelling photowalks in Assam.
            </p>
          </div>
        </div>

        {/* Sequential Multi-Slide Project Scroll */}
        <div className="relative w-full">
          <SequentialProjectExpand
            slides={PROJECT_SLIDES}
            scrollDistance={2.4}
            startWidth={42}
            startHeight={58}
            startRadius={24}
            endRadius={0}
            mediaZoom={1.3}
            smoothing={0.1}
            overlayScrim={0.82}
          />
        </div>
      </section>
    </div>
  );
}
