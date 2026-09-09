"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function ContactButton() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <button
      onClick={handleClick}
      className="
        flex
        group
        h-8
        sm:h-9
        gap-1.5
        sm:gap-2
        items-center
        rounded-full
        bg-white
        px-2.5
        sm:px-4
        text-[11px]
        sm:text-xs
        font-medium
        text-black
        whitespace-nowrap
        shrink-0
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:scale-105
        hover:bg-blue-600
        hover:text-white
        hover:shadow-lg
        hover:shadow-blue-500/20
        cursor-pointer
      "
    >
      Contact Us
      <ArrowUpRight
        size={13}
        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </button>
  );
}
