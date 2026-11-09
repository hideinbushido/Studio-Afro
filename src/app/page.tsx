import { Hero } from "@/components/hero/Hero";
import { Moments } from "@/components/moments/Moments";
import { Nav } from "@/components/nav/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Moments />
        {/* Section suivante : citation (à venir) */}
        <section data-nav="dark" className="min-h-[60vh] bg-void" aria-label="Citation (à venir)" />
      </main>
    </>
  );
}
