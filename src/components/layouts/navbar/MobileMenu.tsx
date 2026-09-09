"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

import { navLinks } from "./nav-links";
import Logo from "./Logo";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Navigation Menu"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white transition-colors duration-200 hover:border-white/30 hover:bg-white/5 lg:hidden cursor-pointer"
      >
        <Menu size={18} />
      </button>

      {/* Popup Menu & Faded Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dimmed & Blurred Background Overlay for Underlying Page */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-xl lg:hidden"
            />

            {/* Slide & Popup Drawer Panel (Solid Dark Background, No Bleed Through) */}
            <motion.aside
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="fixed top-0 right-0 bottom-0 z-[100] flex w-[85vw] max-w-sm flex-col justify-between border-l border-white/10 bg-[#08080a] p-6 shadow-[0_0_60px_rgba(0,0,0,0.95)] lg:hidden"
            >
              {/* Header - Logo with Name & Close Button */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 bg-zinc-900/40 rounded-2xl p-3">
                <Logo />
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Navigation Menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-colors duration-200 hover:border-white/30 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Links (Home, Gallery, Projects, Events, Team with Dark Card Fill) */}
              <div className="my-auto flex flex-col gap-3 py-6">
                {navLinks.map((item, index) => {
                  const active = pathname === item.href;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20, y: 5 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 25,
                        delay: 0.04 + index * 0.05,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={clsx(
                          "group flex items-center justify-between rounded-2xl px-5 py-4 text-base font-semibold transition-all duration-200 font-sora border",
                          active
                            ? "bg-blue-600/30 text-blue-400 border-blue-500/40 shadow-[0_4px_20px_rgba(59,130,246,0.2)]"
                            : "bg-zinc-900/80 text-neutral-200 border-white/10 hover:bg-zinc-800/90 hover:text-white hover:border-white/20 shadow-md"
                        )}
                      >
                        <span>{item.title}</span>
                        <span
                          className={clsx(
                            "h-2 w-2 rounded-full transition-all duration-200",
                            active
                              ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.9)]"
                              : "bg-neutral-600 group-hover:bg-neutral-400"
                          )}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer Section */}
              <div className="border-t border-white/10 pt-4 text-center">
                <p className="text-[11px] text-neutral-500 font-sora">
                  Obiettivo · NIT Silchar
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}


