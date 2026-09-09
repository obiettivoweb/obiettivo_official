import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2 sm:gap-3 shrink-0 transition-transform duration-300 hover:scale-[1.02]"
    >
      <Image
        src="/logo.png"
        alt="Obiettivo Logo"
        width={32}
        height={32}
        priority
        className="w-7 h-7 sm:w-9 sm:h-9 object-contain transition-transform duration-300 group-hover:rotate-6"
      />
      <div className="leading-none">
        <h1 className="font-[family-name:var(--font-sora)] text-base sm:text-lg font-semibold tracking-wide text-white whitespace-nowrap">
          Obiettivo
        </h1>
      </div>
    </Link>
  );
}
