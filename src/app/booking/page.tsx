import type { Metadata } from "next";
import { Booking } from "@/components/booking/Booking";
import { Footer } from "@/components/footer/Footer";
import { Nav } from "@/components/nav/Nav";
import { PageHero } from "@/components/page/PageHero";

export const metadata: Metadata = { title: "Booking — Studio AFRO" };

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <PageHero titre="Booking" kicker="Travailler avec Afro" phrase="Un projet, une voix, une collab ?" />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
