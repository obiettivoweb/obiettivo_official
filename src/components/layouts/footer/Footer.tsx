"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";

// Brand icons as inline SVGs for maximum reliability
const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const data = {
  facebookLink: "https://www.facebook.com/share/1DUPsVrAYf/",
  youtubeLink: "https://youtube.com/@obiettivo-photographyclubn5412?si=SMkBBy0GHxzY4KtU",
  instaLink: "https://www.instagram.com/obiettivo_official?igsh=MTN4ZjB6cm1sMDloZQ==",
  linkedinLink: "https://www.linkedin.com/company/obiettivo/",
  about: {
    team: "/team",
  },
  contact: {
    email: "obiettivo@nits.ac.in",
    phone: "+91 8637373116",
    address: "NIT Silchar, Cachar, Assam, India - 788010",
  },
  company: {
    name: "Obiettivo",
    description:
      "The Official Photography Club of NIT Silchar. Building beautiful visual narratives, capturing campus life, and inspiring creative expression since 2018.",
    logo: "/logo.png",
  },
};

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: data.facebookLink },
  { icon: Youtube, label: "YouTube", href: data.youtubeLink },
  { icon: Instagram, label: "Instagram", href: data.instaLink },
  { icon: Linkedin, label: "LinkedIn", href: data.linkedinLink },
];

const contactInfo = [
  { icon: Mail, text: data.contact.email, href: `mailto:${data.contact.email}` },
  { icon: Phone, text: data.contact.phone, href: `tel:${data.contact.phone}` },
  { icon: MapPin, text: data.contact.address, isAddress: true },
];

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  if (pathname === "/projects") return null;

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email || !description) return;

  setStatus("sending");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          message: description.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send message");
    }

    setStatus("sent");
    setEmail("");
    setDescription("");

    // Return button to normal after 3 seconds
    setTimeout(() => {
      setStatus("idle");
    }, 3000);

  } catch (error) {
    console.error("Quick enquiry error:", error);
    setStatus("idle");
    alert("Failed to send your enquiry. Please try again.");
  }
};

  const handleOpenContactModal = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  const handleOpenFaqModal = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-faq-modal"));
  };

  return (
    <footer className="mt-auto w-full border-t border-white/5 bg-transparent text-zinc-400 font-[family-name:var(--font-sora)] select-none relative z-20">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-10 md:pt-14 md:pb-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Brand Column */}
          <div className="flex flex-col items-start">
            <Link
              href="/"
              className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
            >
              <img
                src={data.company.logo}
                alt="Obiettivo Logo"
                className="h-9 w-9 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform duration-300 group-hover:rotate-6"
              />
              <span className="text-xl font-bold tracking-wider text-white font-[family-name:var(--font-sora)]">
                {data.company.name}
              </span>
            </Link>

            <p className="mt-4 text-sm font-light leading-relaxed text-zinc-500 max-w-sm">
              {data.company.description}
            </p>

            {/* Social Icons */}
            <ul className="mt-6 flex gap-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-zinc-950/40 text-zinc-500 transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-950/10 hover:text-blue-400 cursor-pointer"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="h-4.5 w-4.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div className="flex flex-col">
              <p className="text-sm font-semibold tracking-wider text-zinc-300 uppercase font-[family-name:var(--font-syncopate)] text-[10px]">
                Links
              </p>
              <ul className="mt-5 space-y-3 text-xs font-light">
                <li>
                  <Link
                    href={data.about.team}
                    className="text-zinc-500 hover:text-zinc-300 transition duration-300"
                  >
                    Meet the Team
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleOpenContactModal}
                    className="text-zinc-500 hover:text-zinc-300 transition duration-300 cursor-pointer text-left"
                  >
                    Support Desk
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleOpenFaqModal}
                    className="text-zinc-500 hover:text-zinc-300 transition duration-300 cursor-pointer text-left"
                  >
                    FAQs
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Details Column */}
            <div className="flex flex-col">
              <p className="text-sm font-semibold tracking-wider text-zinc-300 uppercase font-[family-name:var(--font-syncopate)] text-[10px]">
                Contact Info
              </p>
              <ul className="mt-5 space-y-3.5 text-xs font-light">
                {contactInfo.map(({ icon: Icon, text, href, isAddress }) => (
                  <li key={text}>
                    {href ? (
                      <a
                        href={href}
                        className="group flex items-start gap-2.5 text-zinc-500 hover:text-zinc-300 transition duration-300"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-zinc-600 group-hover:text-blue-400 transition duration-300" />
                        <span className="flex-1 break-all">{text}</span>
                      </a>
                    ) : (
                      <div className="flex items-start gap-2.5 text-zinc-500">
                        <Icon className="h-4 w-4 shrink-0 text-zinc-600" />
                        {isAddress ? (
                          <address className="flex-1 not-italic leading-relaxed">{text}</address>
                        ) : (
                          <span className="flex-1">{text}</span>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Contact Form Column (Spans full on small) */}
            <div className="col-span-2 sm:col-span-1 flex flex-col">
              <p className="text-sm font-semibold tracking-wider text-zinc-300 uppercase font-[family-name:var(--font-syncopate)] text-[10px]">
                Quick Enquiry
              </p>
              <form onSubmit={handleSubmit} className="mt-4 space-y-2.5">
                {/* Email Input */}
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "sending" || status === "sent"}
                    className="w-full rounded-md border border-white/5 bg-zinc-950/60 px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:border-blue-500/50 focus:outline-none transition-all duration-300 disabled:opacity-50"
                  />
                </div>

                {/* Description Input */}
                <div className="relative">
                  <textarea
                    required
                    rows={2}
                    placeholder="Describe your query..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={status === "sending" || status === "sent"}
                    className="w-full rounded-md border border-white/5 bg-zinc-950/60 px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:border-blue-500/50 focus:outline-none transition-all duration-300 resize-none disabled:opacity-50"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent" || !email || !description}
                  className="
                    w-full
                    group
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-md
                    bg-blue-600
                    py-2
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-white
                    transition-all
                    duration-300
                    hover:bg-blue-500
                    disabled:bg-zinc-800
                    disabled:text-zinc-600
                    disabled:cursor-not-allowed
                    cursor-pointer
                  "
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : status === "sent" ? (
                    <>
                      <CheckCircle2 className="h-3 w-3 text-green-400" />
                      <span className="text-green-400">Sent Successfully!</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright Area */}
        <div className="mt-10 border-t border-white/5 pt-6 flex justify-center items-center text-xs font-light text-zinc-600">
          <p>&copy; 2026 {data.company.name} Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
