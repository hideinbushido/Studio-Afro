import type { Metadata } from "next";
import { Footer } from "@/components/footer/Footer";
import { Nav } from "@/components/nav/Nav";
import { PageHero } from "@/components/page/PageHero";
import { Studio } from "@/components/studio/Studio";

export const metadata: Metadata = { title: "Le studio — Studio AFRO" };

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <PageHero titre="Studio" kicker="Doublage · Séries · Équipe · Collabs" phrase="Du doublage à l'animation">
          Studio AFRO, c&apos;est Afro et sa team : des parodies d&apos;animés doublées à l&apos;ivoirienne, des
          Opening Concepts, et depuis 2026 un premier Bading entièrement animé.
        </PageHero>
        <Studio />
      </main>
      <Footer />
    </>
  );
}
