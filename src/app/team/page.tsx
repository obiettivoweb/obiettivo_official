import type { Metadata } from "next";
import TeamClient from "@/components/team/TeamClient";

export const metadata: Metadata = {
  title: "Team | Obiettivo",
  description: "Meet the people behind the lens. The Faculty in Charge, secretaries, and team members of Obiettivo - the Photography Club of NIT Silchar.",
};

export default function TeamPage() {
  return (
    <main className="pt-20 md:pt-24 w-full max-w-full overflow-x-hidden">
      <TeamClient />
    </main>
  );
}
