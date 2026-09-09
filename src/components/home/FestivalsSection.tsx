"use client";

import React from "react";
import TestimonialsCard, { TestimonialItem } from "../ui/testimonials-card";
import { Sparkles } from "lucide-react";

const FESTIVAL_ITEMS: TestimonialItem[] = [
    {
        id: "tecnoesis",
        title: "Tecnoesis",
        description: "NIT Silchar's annual national techno-management festival. Capturing the synergy of path-breaking innovation, competitive hackathons, robotics challenges, and futuristic tech exhibitions.",
        image: "/images/Gallery_Exhibits/technoesis.webp",
        driveLink: "https://drive.google.com/drive/folders/1dcfXJVJp2b__bKw-hGWu_XOLSJP180lY?usp=drive_link",
    },
    {
        id: "incandescence",
        title: "Incandescence",
        description: "The prominent cultural extravaganza of India's North-East. Documenting electric concert headliners, competitive high-octane rock bands, theatrical drama, and vivid cultural showcases.",
        image: "/images/Gallery_Exhibits/incand.webp",
        driveLink: "https://drive.google.com/drive/folders/1qGf_7obbO5k_ac39nY_7G8ViDSvtvwqE?usp=drive_link",
    },
    {
        id: "posua",
        title: "Posua",
        description: "The celebration of Spring and Assamese heritage. Freezing the golden rhythms of Bihu, traditional folk melodies, and colorful cultural performances echoing the heritage of regional roots.",
        image: "/images/Gallery_Exhibits/posua.webp",
        driveLink: "https://drive.google.com/drive/folders/1iiALSbYw0MsHGhoudOgI3YgB_rM_4eZ0?usp=drive_link",
    },
    {
        id: "oikotan",
        title: "Oikotan",
        description: "The regional annual musical and acoustic harmony fest. Beautiful memories of unplugged acoustic performances, vocal duels, and folk-infused jam sessions echoing traditional sounds.",
        image: "/images/Gallery_Exhibits/okiotan.webp",
        driveLink: "https://drive.google.com/drive/folders/1IvbZ_BagEaTQ5xhRdeDQT8h3MFxCojGc?usp=drive_link",
    },
];

export function FestivalsSection() {
    return (
        <section className="relative z-10 w-full pt-10 pb-0 px-4 bg-transparent border-t border-zinc-900/10">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(59,130,246,0.02),transparent)] pointer-events-none" />
            
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                {/* Title */}
                <div className="text-center mb-6 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/10 bg-blue-500/5 mb-3">
                        <Sparkles size={12} className="text-blue-400" />
                        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-medium text-blue-400">
                            Exhibition Archives
                        </span>
                    </div>
                    
                    <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white">
                        College Festivals
                    </h2>
                    
                    <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent mt-4 mb-3" />
                    
                    <p className="text-xs md:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                        Flip through the memories and curated Google Drive folders of NIT Silchar's grandest annual festivals, documented with passion.
                    </p>
                </div>

                {/* Testimonials Deck Stack Wrapper */}
                <div className="w-full flex justify-center">
                    <TestimonialsCard 
                        items={FESTIVAL_ITEMS} 
                        width={950} 
                    />
                </div>
            </div>
        </section>
    );
}

export default FestivalsSection;
