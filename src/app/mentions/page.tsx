import type { Metadata } from "next";
import { Footer } from "@/components/footer/Footer";
import { Nav } from "@/components/nav/Nav";
import { PageHero } from "@/components/page/PageHero";

export const metadata: Metadata = { title: "Mentions — Studio AFRO" };

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <PageHero titre="Mentions" kicker="Le site" />
        <section data-nav="dark" className="bg-void px-6 pb-[18vh] text-white">
          <div className="mx-auto grid max-w-[720px] gap-8 text-[13px] leading-relaxed text-white/85">
            <div>
              <h2 className="mb-2 font-display text-3xl uppercase text-white">Éditeur</h2>
              <p>Studio AFRO — Afro (@afrothecreator), Abidjan. Contact : afrothecreatorstudio@gmail.com</p>
            </div>
            <div>
              <h2 className="mb-2 font-display text-3xl uppercase text-white">Hébergement</h2>
              <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
            </div>
            <div>
              <h2 className="mb-2 font-display text-3xl uppercase text-white">Vidéos et images</h2>
              <p>
                Les vidéos sont lues depuis TikTok avec le lecteur officiel et restent hébergées par TikTok. Les
                dessins, le logo et les visuels sont la propriété d&apos;Afro et de son équipe. Les parodies font
                référence à des œuvres dont les droits appartiennent à leurs auteurs.
              </p>
            </div>
            <div>
              <h2 className="mb-2 font-display text-3xl uppercase text-white">Données</h2>
              <p>
                Le site ne dépose pas de cookie publicitaire. Il garde seulement en mémoire, le temps de ta visite,
                le fait que l&apos;écran de chargement a déjà été vu. Le lecteur TikTok applique ses propres règles.
              </p>
            </div>
            <div>
              <h2 className="mb-2 font-display text-3xl uppercase text-white">Crédits</h2>
              <p>Design et développement : Rico. Polices : Anton et JetBrains Mono (licence OFL).</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
