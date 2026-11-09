import { Citation } from "@/components/citation/Citation";
import { Collabs } from "@/components/collabs/Collabs";
import { Equipe } from "@/components/equipe/Equipe";
import { Footer } from "@/components/footer/Footer";
import { Galerie } from "@/components/galerie/Galerie";
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
        <Citation />
        <Collabs />
        <Equipe />
        <Galerie />
      </main>
      <Footer />
    </>
  );
}
