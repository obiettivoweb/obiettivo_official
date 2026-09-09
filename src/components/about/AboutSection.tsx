"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CountUp from "./CountUp";

export default function AboutSection() {
  return (
    <section className="relative min-h-[80vh] w-full bg-[#050505] flex items-center justify-center py-16 md:py-20 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {/* Campfire at night Unsplash image */}
        <img
          src="/images/home/about-bg.webp"
          alt="About Background"
          className="absolute inset-0 w-full h-full object-cover object-right md:object-center opacity-75 md:opacity-85"
          loading="lazy"
        />
        {/* Vignette & Gradients to guarantee text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

        {/* Smooth Top & Bottom Feather Transitions */}
        <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#050505] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
        {/* Left Side: About Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start"
        >
          {/* Section Subtitle */}
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-zinc-500 font-[family-name:var(--font-syncopate)]">
            About Us
          </span>

          {/* Section Main Title */}
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white font-[family-name:var(--font-sora)]">
            7+ Years of
            <br />
            <span className="text-zinc-100 font-light">Capturing Memories</span>
          </h2>

          {/* Section Description */}
          <p className="mt-6 text-sm md:text-base font-light leading-relaxed text-zinc-400 max-w-xl font-[family-name:var(--font-sora)]">
            Obiettivo, the Photography Club of NIT Silchar, is a community
            of passionate visual storytellers. We cover campus events,
            conduct workshops, collaborate with brands, and create
            content that inspires.
          </p>

          {/* Stats List */}
          <div className="mt-12 w-full grid grid-cols-2 sm:grid-cols-4 gap-6 select-none">
            {/* Stat 1: Years */}
            <div className="flex flex-col">
              <div className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-sora)] flex items-center">
                <CountUp to={7} duration={1.5} />
                <span className="text-blue-500 ml-0.5">+</span>
              </div>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mt-2 font-[family-name:var(--font-syncopate)]">
                Years
              </span>
            </div>

            {/* Stat 2: Events */}
            <div className="flex flex-col">
              <div className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-sora)] flex items-center">
                <CountUp to={500} duration={1.8} separator="," />
                <span className="text-blue-500 ml-0.5">+</span>
              </div>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mt-2 font-[family-name:var(--font-syncopate)]">
                Events
              </span>
            </div>

            {/* Stat 3: Photos */}
            <div className="flex flex-col">
              <div className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-sora)] flex items-center">
                <CountUp to={50} duration={1.6} />
                <span className="text-blue-500 font-bold ml-0.5">K+</span>
              </div>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mt-2 font-[family-name:var(--font-syncopate)]">
                Photos
              </span>
            </div>

            {/* Stat 4: Members */}
            <div className="flex flex-col">
              <div className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-sora)] flex items-center">
                <CountUp to={300} duration={2.0} separator="," />
                <span className="text-blue-500 ml-0.5">+</span>
              </div>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mt-2 font-[family-name:var(--font-syncopate)]">
                Members
              </span>
            </div>
          </div>

          {/* CTA: Meet the team Button */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="/team"
              className="
                group
                flex
                items-center
                gap-2.5
                rounded-full
                border
                border-white/10
                bg-zinc-950/40
                px-8
                py-3.5
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-zinc-300
                backdrop-blur-sm
                transition-all
                duration-300
                hover:border-blue-500/40
                hover:bg-blue-950/10
                hover:text-white
                hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]
                cursor-pointer
              "
            >
              <span>Meet the team</span>
              <svg
                className="w-4 h-4 text-zinc-400 group-hover:text-blue-400 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Right Side: Empty space (allows background campfire to show clearly) */}
        <div className="hidden lg:block h-full" />
      </div>
    </section>
  );
}
