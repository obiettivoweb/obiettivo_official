"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Send, CheckCircle2, X } from "lucide-react";

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStatus("idle");
    };
    window.addEventListener("open-contact-modal", handleOpen);
    return () => window.removeEventListener("open-contact-modal", handleOpen);
  }, []);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email || !comment) return;

  setStatus("sending");

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        message: comment,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send message");
    }

    setStatus("sent");
    setEmail("");
    setComment("");

  } catch (error) {
    console.error("Contact form error:", error);
    setStatus("error");
  }
};

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 select-none font-[family-name:var(--font-sora)]">
          {/* Backdrop blur click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 p-6 md:p-8 shadow-[0_0_50px_rgba(59,130,246,0.15)] backdrop-blur-2xl z-10"
          >
            {/* Ambient Radial Accent */}
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-purple-500/10 blur-[40px] rounded-full pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  Get in Touch
                </h3>
                <p className="text-xs text-zinc-500 mt-1 font-light">
                  Drop your details and we will mail you back.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="flex items-center justify-center p-2 rounded-full border border-white/5 bg-zinc-900/40 text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X size={15} />
              </button>
            </div>

            {/* Body Form */}
            <form onSubmit={handleSubmit} className="space-y-5 relative">
              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center space-y-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 animate-bounce">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
                    <p className="text-xs text-zinc-400 mt-2 max-w-xs leading-relaxed font-light font-[family-name:var(--font-sora)]">
                      Thanks for reaching out! Your message has been sent successfully. The Obiettivo team will get back to you soon.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-6 px-6 py-2.5 rounded-full border border-white/10 bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="modal-email" className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 pl-1">
                      Email Address
                    </label>
                    <div className="relative flex items-center">
                      <Mail size={14} className="absolute left-4.5 text-zinc-500 pointer-events-none" />
                      <input
                        id="modal-email"
                        type="email"
                        required
                        placeholder="yourname@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "sending"}
                        className="w-full rounded-2xl border border-white/5 bg-zinc-900/40 py-3.5 pl-11 pr-5 text-sm text-white placeholder-zinc-600 focus:border-blue-500/50 focus:bg-zinc-950/60 focus:outline-none transition-all duration-300 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Comment Input */}
                  <div className="space-y-2">
                    <label htmlFor="modal-comment" className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 pl-1">
                      Message / Query
                    </label>
                    <div className="relative flex items-start">
                      <MessageSquare size={14} className="absolute left-4.5 top-4 text-zinc-500 pointer-events-none" />
                      <textarea
                        id="modal-comment"
                        required
                        rows={4}
                        placeholder="Tell us about collaborations, event coverage, or joining requests..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        disabled={status === "sending"}
                        className="w-full rounded-2xl border border-white/5 bg-zinc-900/40 py-3.5 pl-11 pr-5 text-sm text-white placeholder-zinc-600 focus:border-blue-500/50 focus:bg-zinc-950/60 focus:outline-none transition-all duration-300 resize-none disabled:opacity-50 leading-relaxed"
                      />
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="text-center text-xs text-red-400">
                        Failed to send your message. Please try again.
                    </p>
                  )}

                  {/* Form Submission Button */}
                  <button
                    type="submit"
                    disabled={status === "sending" || !email || !comment}
                    className="
                      w-full
                      rounded-full
                      bg-blue-600
                      py-4
                      text-xs
                      font-bold
                      uppercase
                      tracking-widest
                      text-white
                      transition-all
                      duration-300
                      hover:bg-blue-500
                      active:scale-95
                      disabled:bg-zinc-800/80
                      disabled:text-zinc-600
                      disabled:cursor-not-allowed
                      cursor-pointer
                      flex
                      items-center
                      justify-center
                      gap-2
                      shadow-lg
                      shadow-blue-600/10
                    "
                  >
                    <span>{status === "sending" ? "Sending Request..." : "Send Message"}</span>
                    {status === "sending" ? (
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    ) : (
                      <Send size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    )}
                  </button>

                  <div className="text-center pt-2 select-none">
                    <p className="text-[10px] text-zinc-600 leading-normal font-light italic">
                      💡 Tip: Submitting triggers our notification queue. We will mail you back within 24 hours.
                    </p>
                  </div>
                </>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ContactModal;
