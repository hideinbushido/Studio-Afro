import type { Metadata } from "next";
import { Footer } from "@/components/footer/Footer";
import { Nav } from "@/components/nav/Nav";
import { PageHero } from "@/components/page/PageHero";
import { Videotheque } from "@/components/videos/Videotheque";

export const metadata: Metadata = { title: "Les vidéos — Studio AFRO" };

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <PageHero titre="Vidéos" kicker="Tous les Bading" phrase="169 vidéos, une seule chaîne">
          Choisis une série, clique sur une vidéo : elle se lance ici avec le lecteur TikTok.
        </PageHero>
        <Videotheque />
      </main>
      <Footer />
    </>
  );
}
