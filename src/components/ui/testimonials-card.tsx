"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

export interface TestimonialItem {
    /** Unique identifier for the card */
    id: string | number;
    /** Title displayed for the card */
    title: string;
    /** Description text for the card */
    description: string;
    /** Image URL/path for the card */
    image: string;
    /** External Google Drive link */
    driveLink?: string;
}

interface TestimonialsCardProps {
    /** Array of testimonial items to display */
    items: TestimonialItem[];
    /** Additional CSS classes for the container */
    className?: string;
    /** Width of the card stack (default: 400) */
    width?: number;
    /** Whether to show navigation arrows (default: true) */
    showNavigation?: boolean;
    /** Whether to show the counter (default: true) */
    showCounter?: boolean;
    /** Whether to enable auto-play (default: false) */
    autoPlay?: boolean;
    /** Auto-play interval in ms (default: 3000) */
    autoPlayInterval?: number;
}

export function TestimonialsCard({
    items,
    className,
    width = 400,
    showNavigation = true,
    showCounter = true,
    autoPlay = false,
    autoPlayInterval = 3000,
}: TestimonialsCardProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const activeItem = items[activeIndex];

    // Auto-play effect
    React.useEffect(() => {
        if (!autoPlay || items.length <= 1) return;

        const interval = setInterval(() => {
            setDirection(1);
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, items.length]);

    const handleNext = () => {
        if (activeIndex < items.length - 1) {
            setDirection(1);
            setActiveIndex(activeIndex + 1);
        }
    };

    const handlePrev = () => {
        if (activeIndex > 0) {
            setDirection(-1);
            setActiveIndex(activeIndex - 1);
        }
    };

    // Pre-calculate rotations for visual variety
    const rotations = useMemo(() => [4, -2, -9, 7], []);

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className={cn("flex items-center justify-center py-2 px-4", className)}>
            <div
                className="relative grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] md:grid-rows-[auto_auto_auto] gap-x-6 gap-y-4 w-full"
                style={{ perspective: "1400px", maxWidth: `${width}px` }}
            >
                {/* Counter */}
                {showCounter && (
                    <div className="row-start-1 md:col-start-2 md:row-start-1 text-right font-mono text-xs text-zinc-500">
                        {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                    </div>
                )}

                {/* Image Card Stack */}
                <div className="row-start-2 col-start-1 md:row-start-1 row-span-3 relative w-full aspect-[16/10] overflow-hidden">
                    <AnimatePresence custom={direction}>
                        {items.map((item, index) => {
                            const isActive = index === activeIndex;
                            const offset = index - activeIndex;

                            // We only render cards that are active or in stack (offset >= 0)
                            if (offset < 0) return null;

                            return (
                                <motion.div
                                    key={item.id}
                                    className="absolute inset-0 w-full h-full overflow-hidden border-[6px] bg-zinc-900 border-zinc-800 shadow-2xl rounded-xl"
                                    initial={{
                                        x: offset * 12,
                                        y: Math.abs(offset) * 6,
                                        z: -100 * Math.abs(offset),
                                        scale: 0.9 - Math.abs(offset) * 0.04,
                                        rotateZ: rotations[index % 4],
                                        opacity: isActive ? 1 : 0.5,
                                        zIndex: 10 - Math.abs(offset),
                                    }}
                                    animate={
                                        isActive
                                            ? {
                                                x: [offset * 12, direction === 1 ? -30 : 30, 0],
                                                y: [Math.abs(offset) * 6, 0, 0],
                                                z: [-100, 50, 0],
                                                scale: [0.9, 1.02, 1],
                                                rotateZ: [rotations[index % 4], -2, 0],
                                                opacity: 1,
                                                zIndex: 100,
                                            }
                                            : {
                                                x: offset * 12,
                                                y: Math.abs(offset) * 6,
                                                z: -100 * Math.abs(offset),
                                                rotateZ: rotations[index % 4],
                                                scale: 0.9 - Math.abs(offset) * 0.04,
                                                opacity: 0.55,
                                                zIndex: 10 - Math.abs(offset),
                                            }
                                    }
                                    exit={{
                                        x: direction === 1 ? -60 : 60,
                                        z: -150,
                                        scale: 0.85,
                                        rotateZ: direction === 1 ? -5 : 5,
                                        opacity: 0,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover select-none pointer-events-none"
                                        draggable={false}
                                    />
                                    {/* Subtle Overlay to match dark theme */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Text Area */}
                <div className="col-start-1 md:col-start-2 md:row-start-2 flex flex-col justify-center min-h-[140px] mt-4 md:mt-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeItem.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="flex flex-col h-full"
                        >
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                                {activeItem.title}
                            </h3>
                            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                                {activeItem.description}
                            </p>
                            {activeItem.driveLink && (
                                <a
                                    href={activeItem.driveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-4 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors w-fit group"
                                >
                                    Access Drive Folder
                                    <ExternalLink className="w-3" />
                                </a>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Controls */}
                {showNavigation && items.length > 1 && (
                    <div className="col-start-1 md:col-start-2 md:row-start-3 flex gap-3 mt-4 md:mt-2">
                        <button
                            disabled={activeIndex === 0}
                            onClick={handlePrev}
                            className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm transition-all",
                                activeIndex === 0
                                    ? "opacity-30 cursor-not-allowed"
                                    : "hover:bg-zinc-900 border-zinc-700 hover:scale-105 active:scale-95"
                            )}
                            aria-label="Previous card"
                        >
                            <ArrowLeft className="w-4 h-4 text-zinc-300" />
                        </button>
                        <button
                            disabled={activeIndex === items.length - 1}
                            onClick={handleNext}
                            className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm transition-all",
                                activeIndex === items.length - 1
                                    ? "opacity-30 cursor-not-allowed"
                                    : "hover:bg-zinc-900 border-zinc-700 hover:scale-105 active:scale-95"
                            )}
                            aria-label="Next card"
                        >
                            <ArrowRight className="w-4 h-4 text-zinc-300" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TestimonialsCard;
