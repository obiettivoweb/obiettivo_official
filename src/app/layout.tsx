import type { Metadata } from "next";
import { Inter, Sora, Roboto, Syne, Syncopate, Montserrat, Short_Stack } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/navbar/Navbar";
import Footer from "@/components/layouts/footer/Footer";
import GlobalBackground from "@/components/layouts/GlobalBackground";
import ContactModal from "@/components/ui/contact-modal";
import FaqModal from "@/components/ui/faq-modal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const syncopate = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-syncopate",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const shortStack = Short_Stack({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-short-stack",
});

export const metadata: Metadata = {
  title: "Obiettivo",
  description: "Official website of Obiettivo, the Photography Club of NIT Silchar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${roboto.variable} ${syne.variable} ${syncopate.variable} ${montserrat.variable} ${shortStack.variable} h-full antialiased max-w-full overflow-x-hidden`}
    >
      <body className={`${sora.className} min-h-screen bg-[#050505] text-neutral-200 overflow-x-hidden max-w-full w-full flex flex-col`}>
        <GlobalBackground />
        <Navbar />
        {children}
        <ContactModal />
        <FaqModal />
        <Footer />
      </body>
    </html>
  );
}
