"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import ContactButton from "./ContactButton";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      {/* Floating Container */}
      <div className="mx-auto mt-4 w-[92%] max-w-7xl">
        <motion.nav
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className={`
            flex
            h-14
            items-center
            justify-between
            rounded-full
            border
            px-3
            sm:px-6
            transition-all
            duration-500
            ${scrolled
              ? "border-white/10 bg-black/75 shadow-[0_10px_35px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              : "border-white/10 bg-black/50 backdrop-blur-2xl"
            }
          `}
        >
          {/* Left */}
          <Logo />

          {/* Center */}
          <NavLinks />

          {/* Right */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <ContactButton />
            <MobileMenu />
          </div>
        </motion.nav>
      </div>
    </header>
  );
}