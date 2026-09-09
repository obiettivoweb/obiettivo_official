
interface HeroBackgroundProps {
  activeIndex: number;
}

const bgImages = [
  "/images/home/home-bg1.webp",
  "/images/home/home-bg2.webp",
  "/images/home/home-bg3.webp",
  "/images/home/home-bg4.webp"
];

export default function HeroBackground({ activeIndex }: HeroBackgroundProps) {
  return (
    <>
      {bgImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`Obiettivo Background ${index + 1}`}
            className="w-full h-full object-cover select-none"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Main Dark Overlay */}
      <div className="absolute inset-0 bg-black/35 z-10 pointer-events-none" />

      {/* Left Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10 pointer-events-none" />

      {/* Bottom Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 pointer-events-none" />
    </>
  );
}