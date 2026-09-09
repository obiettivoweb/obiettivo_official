"use client";

import React, { useCallback, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { Eye } from "lucide-react";

const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

export interface ProjectSlide {
  src: string;
  badge: string;
  title: string;
  heading: string;
  description: string;
  exploreLink?: string;
}

export interface SequentialProjectExpandProps {
  slides: ProjectSlide[];
  scrollDistance?: number;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  smoothing?: number;
  overlayScrim?: number;
  className?: string;
  style?: CSSProperties;
  onExploreClick?: (slide: ProjectSlide) => void;
}

const SequentialProjectExpand: React.FC<SequentialProjectExpandProps> = ({
  slides,
  scrollDistance = 4.0,
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.15,
  smoothing = 0.1,
  overlayScrim = 0.85,
  className = "",
  style,
  onExploreClick,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  const slideFrameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slideOverlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slideScrimRefs = useRef<(HTMLDivElement | null)[]>([]);

  const applyProgress = useCallback(
    (p: number) => {
      if (!slides || slides.length === 0) return;
      const numSlides = slides.length;

      // Scroll Hint (fades away quickly)
      if (hintRef.current) {
        const gone = smoothstep(0, 0.06, p);
        hintRef.current.style.opacity = `${(1 - gone).toFixed(3)}`;
        hintRef.current.style.transform = `translate3d(0, ${(8 * gone).toFixed(1)}px, 0)`;
      }

      // Smooth & gradual timeline phases (scrollDistance = 4.0):
      // Slide 0:
      //   - Card Expansion: p in [0.00, 0.30] (42%x58% -> 100%)
      // Slide 1:
      //   - Pop-up from bottom: starts at p=0.20 (~70% of Slide 0 expansion), reaches center at p=0.35
      //   - Card Expansion: p in [0.35, 0.62] (42%x58% -> 100%)
      // Slide 2 (Final Slide):
      //   - Pop-up from bottom: starts at p=0.54 (~70% of Slide 1 expansion), reaches center at p=0.68
      //   - Card Expansion: p in [0.68, 0.90] (42%x58% -> 100%)
      //   - At p >= 0.90: strictly 100% full screen (clipPath inset 0%), strictly touching viewport bottom!
      const slidePhases = [
        { enterStart: 0, enterEnd: 0, expandStart: 0.00, expandEnd: 0.30 },
        { enterStart: 0.20, enterEnd: 0.35, expandStart: 0.35, expandEnd: 0.62 },
        { enterStart: 0.54, enterEnd: 0.68, expandStart: 0.68, expandEnd: 1.00 },
      ];

      slides.forEach((_, idx) => {
        const frameEl = slideFrameRefs.current[idx];
        const overlayEl = slideOverlayRefs.current[idx];
        const scrimEl = slideScrimRefs.current[idx];

        if (!frameEl) return;

        const phase = slidePhases[idx] || {
          enterStart: (idx / numSlides) * 0.85,
          enterEnd: (idx / numSlides),
          expandStart: (idx / numSlides),
          expandEnd: ((idx + 0.8) / numSlides),
        };

        // 1. Per-slide card clipPath expansion (e_i from 0 to 1)
        const e = smoothstep(phase.expandStart, phase.expandEnd, p);

        // Strict bottom viewport touch for the final slide when p >= 0.90
        let w = startWidth + (100 - startWidth) * e;
        let h = startHeight + (100 - startHeight) * e;
        let r = startRadius + (endRadius - startRadius) * e;

        if (idx === numSlides - 1 && p >= 0.90) {
          w = 100;
          h = 100;
          r = 0;
        }

        const ix = Math.max(0, (100 - w) / 2);
        const iy = Math.max(0, (100 - h) / 2);

        frameEl.style.clipPath = `inset(${iy.toFixed(3)}% ${ix.toFixed(3)}% ${iy.toFixed(3)}% ${ix.toFixed(3)}% round ${r.toFixed(1)}px)`;

        // 2. Vertical position displacement (sliding up from bottom for idx > 0)
        if (idx === 0) {
          frameEl.style.transform = "translate3d(0, 0%, 0)";
        } else {
          // Smooth slide-up transition from 100% bottom to 0% center
          const yPos = 1 - smoothstep(phase.enterStart, phase.enterEnd, p);
          frameEl.style.transform = `translate3d(0, ${(100 * yPos).toFixed(2)}%, 0)`;
        }

        // 3. Scrim opacity
        if (scrimEl) {
          scrimEl.style.opacity = `${(overlayScrim * Math.max(0.4, e)).toFixed(3)}`;
        }

        // 4. Overlay Text Opacity & Scale/Translate
        if (overlayEl) {
          let op = 0;
          if (idx === numSlides - 1) {
            // Final slide overlay stays visible till the end of scroll
            op = smoothstep(phase.expandStart + 0.05, phase.expandEnd, p);
          } else {
            // Intermediate slide overlay fades in with expansion, then fades out smoothly as next slide enters
            const nextPhase = slidePhases[idx + 1];
            const fadeIn = smoothstep(phase.expandStart + 0.05, phase.expandEnd, p);
            const fadeOut = nextPhase ? 1 - smoothstep(nextPhase.enterStart, nextPhase.enterEnd + 0.05, p) : 1;
            op = Math.min(fadeIn, fadeOut);
          }

          overlayEl.style.opacity = `${op.toFixed(3)}`;
          overlayEl.style.transform = `scale(${(0.92 + 0.08 * e).toFixed(3)})`;
          overlayEl.style.pointerEvents = op > 0.4 ? "auto" : "none";
        }
      });
    },
    [slides, startWidth, startHeight, startRadius, endRadius, overlayScrim]
  );

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      stageH = window.innerHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;
      track.style.height = `${stageH * (1 + Math.max(0.5, scrollDistance))}px`;
    };

    const readProgress = () => {
      const span = stageH * Math.max(0.01, scrollDistance);
      const top = track.getBoundingClientRect().top;
      return clamp(-top / span, 0, 1);
    };

    const tick = () => {
      const k = smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
      } else {
        kick();
      }
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [applyProgress, scrollDistance, smoothing]);

  return (
    <div ref={rootRef} className={`relative w-full bg-transparent ${className}`.trim()} style={style}>
      <div ref={trackRef} className="relative w-full bg-transparent">
        <div ref={stageRef} className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden bg-transparent">
          {/* Individual Slide Cards */}
          {slides.map((slide, idx) => {
            const isLastSlide = idx === slides.length - 1;

            return (
              <div
                key={slide.src}
                ref={(el) => {
                  slideFrameRefs.current[idx] = el;
                }}
                className="absolute inset-0 w-full h-full overflow-hidden [will-change:clip-path,transform]"
                style={{
                  zIndex: idx + 1,
                  clipPath: `inset(21% 29% 21% 29% round 24px)`,
                  transform: idx === 0 ? "translate3d(0, 0%, 0)" : "translate3d(0, 100%, 0)",
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full bg-zinc-950">
                  <img
                    src={slide.src}
                    alt={slide.heading}
                    draggable={false}
                    className="w-full h-full object-cover origin-center select-none scale-[1.15]"
                  />
                </div>

                {/* Dark Scrim Overlay */}
                <div
                  ref={(el) => {
                    slideScrimRefs.current[idx] = el;
                  }}
                  className="absolute inset-0 opacity-0 pointer-events-none z-10 bg-[linear-gradient(to_top,rgba(0,0,0,0.88),rgba(0,0,0,0.3)_45%,rgba(0,0,0,0.5))]"
                />

                {/* Overlay Content */}
                <div
                  ref={(el) => {
                    slideOverlayRefs.current[idx] = el;
                  }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 md:p-12 opacity-0 pointer-events-none [will-change:opacity,transform]"
                >
                  <div className="max-w-2xl px-4 text-center flex flex-col items-center justify-center select-none">
                    {/* Badge: Syncopate blue uppercase */}
                    <span className="text-blue-500 font-[family-name:var(--font-syncopate)] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase block mb-3">
                      {slide.badge}
                    </span>

                    {/* Heading: Sora clean font */}
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-sora)] tracking-tight text-white mb-5 leading-tight">
                      {slide.heading}
                    </h2>

                    {/* Description: Inter clean font */}
                    <p className="text-zinc-300 text-xs md:text-sm lg:text-base max-w-lg mx-auto font-[family-name:var(--font-inter)] leading-relaxed mb-8">
                      {slide.description}
                    </p>

                    {/* Pill Button: Rendered ONLY on the last project slide */}
                    {isLastSlide && (
                      <button
                        onClick={() => {
                          if (onExploreClick) {
                            onExploreClick(slide);
                          } else if (slide.exploreLink) {
                            window.open(slide.exploreLink, "_blank");
                          }
                        }}
                        className="group flex items-center gap-2 mx-auto rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-6 py-2.5 text-xs font-medium text-zinc-200 hover:border-blue-500/50 hover:bg-blue-950/20 hover:text-white transition-all duration-300 cursor-pointer shadow-lg pointer-events-auto"
                      >
                        <Eye className="w-4 h-4 text-zinc-400 group-hover:text-blue-400 transition-colors duration-300" />
                        <span className="font-[family-name:var(--font-sora)] font-medium">Explore All Expositions</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Scroll Hint */}
          <div
            ref={hintRef}
            className="absolute inset-x-0 bottom-6 z-30 text-center text-[0.8125rem] tracking-[0.03em] text-white/60 pointer-events-none [will-change:opacity,transform] font-[family-name:var(--font-sora)]"
          >
            Scroll to expand expositions
          </div>
        </div>
      </div>
    </div>
  );
};

export default SequentialProjectExpand;
