"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Camera, Layers, Video, Users as Users2 } from "lucide-react";
import DepthCarousel from "@/components/ui/DepthCarousel";
import { Marquee } from "@/components/ui/marquee";
import MorphSlider, { MorphItem } from "@/components/ui/MorphSlider";
import { boardMembers } from "@/data/boardMembers";
import { seniorExecutives } from "@/data/seniorExecutives";
import { facultyInCharge, clubSecretary } from "@/data/leadership";

const mobileJuniorExecItems: MorphItem[] = [
  {
    image: "/images/team/junior/junior-2.webp"
  },
  {
    image: "/images/team/junior/junior-3.webp"
  },
  {
    image: "/images/team/junior/dsc.webp"
  },
  {
    image: "/images/team/junior/junior-4.webp"
  }
];

const desktopJuniorExecItems: MorphItem[] = [
  {
    image: "/images/team/junior/desktop-1.webp"
  },
  {
    image: "/images/team/junior/dsc.webp"
  },
  {
    image: "/images/team/junior/junior-4.webp"
  }
];

// Inline Instagram SVG icon
const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Types
interface SocialLinks {
  instagram?: string;
  email?: string;
  portfolio?: string;
}

interface Member {
  name: string;
  role: string;
  image: string;
  socials: SocialLinks;
}

interface Department {
  name: string;
  icon: React.ReactNode;
  color: string;
  members: Member[];
}

export default function TeamClient() {
  const [activeSlide, setActiveSlide] = useState<"fic" | "secretaries">("fic");
  const [progress, setProgress] = useState(0);
  const [activeBoardIndex, setActiveBoardIndex] = useState(0);
  const [activeSeniorMember, setActiveSeniorMember] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Restart timer & progress
  const startAutoplay = () => {
    // Clear existing
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    setProgress(0);

    // Start progress counting
    const duration = 7000; // 7 seconds
    const intervalTime = 50; // update progress every 50ms
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    progressIntervalRef.current = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / totalSteps) * 100, 100);
      setProgress(newProgress);
    }, intervalTime);

    // Switch slide after 7s
    timerRef.current = setTimeout(() => {
      setActiveSlide((prev) => (prev === "fic" ? "secretaries" : "fic"));
    }, duration);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [activeSlide]);

  const selectSlide = (slide: "fic" | "secretaries") => {
    setActiveSlide(slide);
  };

  return (
    <section className="relative w-full bg-transparent text-zinc-100 flex flex-col items-center">
      {/* Background radial glow */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none select-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl w-full px-6 pt-2 pb-0 md:pt-4 md:pb-0 flex flex-col items-center">
        {/* Header Title */}
        <div className="text-center max-w-3xl mb-8">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-blue-500 font-[family-name:var(--font-syncopate)]">
            Our Hierarchy
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-[family-name:var(--font-sora)]">
            Meet the <span className="text-zinc-400 font-light">Visionaries</span>
          </h1>
          <p className="mt-5 text-sm md:text-base font-light text-zinc-400 max-w-xl mx-auto font-[family-name:var(--font-sora)] leading-relaxed">
            The guidance strength and execution force driving Obiettivo's creative standard.
          </p>
        </div>

        {/* Rotating Slide Segment */}
        <div className="w-full max-w-5xl rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md p-6 md:p-10 md:py-8 mb-10 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {activeSlide === "fic" ? (
              <motion.div
                key="fic"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-16 items-center"
              >
                {/* FIC details */}
                <div className="flex flex-col items-start gap-4">
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] bg-blue-500/10 text-blue-400 px-3.5 py-1.5 rounded-full border border-blue-500/15 font-[family-name:var(--font-syncopate)]">
                    {facultyInCharge.badge}
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-sora)]">
                    {facultyInCharge.name}
                  </h2>
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest font-[family-name:var(--font-sora)]">
                    {facultyInCharge.designation}
                  </p>
                  <p className="text-sm md:text-base font-light leading-relaxed text-zinc-400 italic mt-3 max-w-xl font-[family-name:var(--font-sora)]">
                    "{facultyInCharge.quote}"
                  </p>
                </div>
                {/* FIC Image card */}
                <div className="relative aspect-[4/5] w-full max-w-[320px] mx-auto md:mr-0 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 group shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                  <img
                    src={facultyInCharge.image}
                    alt={facultyInCharge.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="secretaries"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-16 items-center"
              >
                {/* Secretary details */}
                <div className="flex flex-col items-start gap-4">
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] bg-blue-500/10 text-blue-400 px-3.5 py-1.5 rounded-full border border-blue-500/15 font-[family-name:var(--font-syncopate)]">
                    {clubSecretary.badge}
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-sora)]">
                    {clubSecretary.name}
                  </h2>
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest font-[family-name:var(--font-sora)]">
                    {clubSecretary.designation}
                  </p>
                  <p className="text-sm md:text-base font-light leading-relaxed text-zinc-400 italic mt-3 max-w-xl font-[family-name:var(--font-sora)]">
                    "{clubSecretary.quote}"
                  </p>
                </div>
                {/* Secretary Image */}
                <div className="relative aspect-[4/5] w-full max-w-[300px] mx-auto md:mr-0 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 group shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                  <img
                    src={clubSecretary.image}
                    alt={clubSecretary.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation indicators */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-4">
            {/* Slide Select Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => selectSlide("fic")}
                className={`text-xs md:text-sm font-semibold uppercase tracking-wider pb-1 transition-all duration-300 border-b-2 cursor-pointer ${activeSlide === "fic" ? "text-blue-500 border-blue-500" : "text-zinc-500 border-transparent hover:text-zinc-300"
                  }`}
              >
                1. Faculty-in-Charge
              </button>
              <button
                onClick={() => selectSlide("secretaries")}
                className={`text-xs md:text-sm font-semibold uppercase tracking-wider pb-1 transition-all duration-300 border-b-2 cursor-pointer ${activeSlide === "secretaries" ? "text-blue-500 border-blue-500" : "text-zinc-500 border-transparent hover:text-zinc-300"
                  }`}
              >
                2. Club Secretary
              </button>
            </div>
          </div>
        </div>

        {/* Board Members section */}
        <div className="w-full flex flex-col mt-12 max-w-5xl">
          <div className="text-center mb-6">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-blue-500 font-[family-name:var(--font-syncopate)]">
              Board Members
            </span>
            <div className="relative mt-3 h-[1px] w-24 bg-zinc-800 mx-auto overflow-hidden rounded-full">
              <div className="absolute top-0 bottom-0 left-[35%] right-[35%] bg-blue-500 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-4 sm:gap-6 lg:gap-8 items-center w-full min-h-[380px] lg:min-h-[480px]">
            {/* Member Info Card: order-2 on mobile (below photo), order-1 on desktop */}
            <div className="order-2 lg:order-1 flex flex-col justify-center min-h-[140px] lg:min-h-[300px] border border-white/5 bg-zinc-950/40 backdrop-blur-md rounded-3xl p-5 md:p-8 relative overflow-hidden text-center lg:text-left">
              {/* Decorative side accent line */}
              <div className="absolute left-0 top-[20%] bottom-[20%] w-[3px] bg-blue-500 rounded-r-lg" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBoardIndex}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col items-center lg:items-start"
                >
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 font-sora">
                    {boardMembers[activeBoardIndex].department}
                  </span>

                  <h4 className="mt-2 md:mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-[family-name:var(--font-sora)] tracking-tight leading-tight">
                    {boardMembers[activeBoardIndex].name}
                  </h4>

                  <p className="mt-1.5 md:mt-2 text-xs sm:text-sm font-semibold tracking-wider text-blue-500 uppercase font-sora">
                    {boardMembers[activeBoardIndex].role}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* DepthCarousel Photo: order-1 on mobile (above info), order-2 on desktop */}
            <div className="order-1 lg:order-2 relative w-full h-[350px] sm:h-[440px] md:h-[540px] lg:h-[620px] flex items-center justify-center overflow-hidden md:overflow-visible">
              <DepthCarousel
                items={boardMembers.map(m => ({ image: m.image, alt: m.name }))}
                depth={200}
                spread={100}
                tilt={16}
                tiltDirection="right"
                perspective={1400}
                visibleCards={3}
                falloff={0.2}
                blur={4}
                autoplay={false}
                loop
                cardWidth={270}
                cardHeight={365}
                radius={18}
                tint="#05060a"
                duration={700}
                ease="power3.out"
                onChange={(idx) => setActiveBoardIndex(idx)}
                showControls
                showIndicators
              />
            </div>
          </div>
        </div>

        {/* Senior Executives section */}
        <section className="relative w-full overflow-hidden py-12 mt-12 border-t border-white/5 flex flex-col items-center">
          {/* Decorative SVG */}
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-5 z-0">
            <svg
              className="text-neutral-400"
              fill="none"
              height="154"
              viewBox="0 0 460 154"
              width="460"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_494_1104)">
                <path
                  d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="40"
                />
              </g>
              <defs>
                <clipPath id="clip0_494_1104">
                  <rect fill="white" height="154" width="460" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 w-full max-w-5xl">
            <div className="mx-auto mb-10 flex flex-col items-center px-6 text-center lg:px-0">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-star"><path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" /><path d="M8 15H7a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /></svg>
              </div>

              <h4 className="relative mb-3 font-medium text-3xl text-white tracking-tight sm:text-4xl font-[family-name:var(--font-sora)]">
                Senior Executives
                <svg
                  className="absolute -top-3 -right-6 -z-10 w-20 text-zinc-800 hidden sm:block"
                  fill="currentColor"
                  height="86"
                  viewBox="0 0 108 86"
                  width="108"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M38.8484 16.236L15 43.5793L78.2688 15L18.1218 71L93 34.1172L70.2047 65.2739"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="28"
                  />
                </svg>
              </h4>
              <p className="max-w-2xl text-xs sm:text-sm text-zinc-400 font-sora">
                Connecting our club to advanced creative and technical solutions, empowering seamless collaboration.
              </p>
            </div>

            <div className="relative w-full max-w-full overflow-hidden">
              {/* Fade gradients */}
              <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-12 md:w-24 bg-gradient-to-r from-[#050505] to-transparent" />
              <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-12 md:w-24 bg-gradient-to-l from-[#050505] to-transparent" />

              <Marquee className="[--gap:1.5rem]" pauseOnHover>
                {seniorExecutives.map((member) => (
                  <div
                    className="group flex w-60 shrink-0 flex-col cursor-pointer select-none"
                    key={member.name}
                    onClick={() => setActiveSeniorMember((prev) => (prev === member.name ? null : member.name))}
                    onTouchStart={() => setActiveSeniorMember(member.name)}
                  >
                    <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/40">
                      <img
                        alt={member.name}
                        className={`h-full w-full object-cover transition-all duration-300 group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0 ${
                          activeSeniorMember === member.name ? "grayscale-0 scale-[1.02]" : "grayscale"
                        }`}
                        src={member.image}
                      />
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 rounded-xl bg-zinc-950/80 backdrop-blur-xs p-3 border border-white/5">
                        <h5 className="font-semibold text-white text-sm font-sora">
                          {member.name}
                        </h5>
                        <p className="text-zinc-400 text-xs mt-0.5 font-sora">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>

            {/* Testimonial Quote under layout */}
            <div className="mx-auto mt-16 max-w-3xl px-6 text-center lg:px-0">
              <p className="mb-6 font-light italic text-base text-zinc-300 leading-relaxed md:text-lg font-sora">
                "The creative support and mentorship from Senior Executives truly inspired us. We suggested a workflow improvement, and their team implemented it with remarkable speed!"
              </p>
              <div className="flex flex-col items-center gap-2">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10">
                  <img
                    alt="Natalia Kara"
                    className="h-full w-full object-cover"
                    src="https://res.cloudinary.com/dvwtcsh5v/image/upload/v1770279333/a1.jpg"
                  />
                </div>
                <div className="text-center font-sora">
                  <p className="font-semibold text-white text-sm">
                    Natalia Kara
                  </p>
                  <p className="text-zinc-500 text-[11px] mt-0.5">
                    CTO · Obiettivo Advisors
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Junior Executives section */}
      <div className="w-full relative mt-16 mb-0 pb-0 flex flex-col items-center z-20">
        <div className="text-center mb-10 px-6 max-w-3xl">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-blue-500 font-[family-name:var(--font-syncopate)]">
            Our Futures
          </span>
          <h3 className="mt-3 text-3xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-sora)] tracking-tight">
            Junior Executives
          </h3>
          <div className="relative mt-3 h-[1px] w-28 bg-zinc-800 mx-auto overflow-hidden rounded-full">
            <div className="absolute top-0 bottom-0 left-[35%] right-[35%] bg-blue-500 rounded-full" />
          </div>
        </div>

        {/* Junior Executives MorphSlider Group Photos */}
        <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 md:px-6 aspect-[4/5] sm:aspect-[4/3] md:aspect-[3464/2190] relative">
          <MorphSlider
            items={isMobile ? mobileJuniorExecItems : desktopJuniorExecItems}
            fitMode="cover"
            transition="melt"
            intensity={0.55}
            aberration={0.35}
            drift={0.4}
            autoplay={false}
            overlayColor="#05060a"
            duration={1.1}
            ease="power2.inOut"
            scale={2.4}
            autoplayDelay={4}
            loop
            radius={16}
            showCaptions={false}
            showControls
            showIndicators
          />
        </div>

        {/* Motivational Quote & Description Below Slider */}
        <div className="w-full max-w-3xl mx-auto mt-10 mb-12 px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-8 md:w-12 bg-blue-500/40" />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-blue-400/80 font-[family-name:var(--font-syncopate)]">
              The Core Pillars of Obiettivo
            </span>
            <div className="h-[1px] w-8 md:w-12 bg-blue-500/40" />
          </div>

          <blockquote className="text-sm md:text-base font-medium text-zinc-300/90 font-[family-name:var(--font-sora)] leading-relaxed tracking-tight max-w-2xl mx-auto">
            &ldquo;Junior Executives are the primary pillars, backbone, and driving force of Obiettivo—holding the vision high and executing every single moment into visual legacy.&rdquo;
          </blockquote>

          <p className="mt-3 text-xs text-zinc-500 font-light leading-relaxed max-w-xl mx-auto font-[family-name:var(--font-inter)]">
            From ground media coverage and event management to creative brainstorming and production strategy, they power every milestone of the club.
          </p>
        </div>
      </div>
    </section>
  );
}
