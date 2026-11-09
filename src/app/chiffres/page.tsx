import type { Metadata } from "next";
import { Chiffres } from "@/components/chiffres/Chiffres";
import { Footer } from "@/components/footer/Footer";
import { Nav } from "@/components/nav/Nav";
import { PageHero } from "@/components/page/PageHero";

export const metadata: Metadata = { title: "Les chiffres — Studio AFRO" };

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <PageHero titre="Chiffres" kicker="TikTok · @afrothecreator" phrase="Je n'abandonnerai pas">
          Tous les chiffres de ses 169 vidéos publiques, relevés le 9 novembre 2026.
        </PageHero>
        <Chiffres />
      </main>
      <Footer />
    </>
  );
}
