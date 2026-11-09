import { Hero } from "@/components/hero/Hero";
import { Nav } from "@/components/nav/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {/* Section suivante : Moments clés (à venir) */}
        <section className="min-h-[60vh] bg-ink" aria-label="Moments clés (à venir)" />
      </main>
    </>
  );
}
