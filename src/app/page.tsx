import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Team } from "@/components/sections/Team";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <Team />
      {/* Additional sections like Events, Gallery Preview, etc. can be added here */}
    </div>
  );
}
