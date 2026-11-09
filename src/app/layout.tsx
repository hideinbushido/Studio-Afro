import type { Metadata } from "next";
import "@fontsource/anton/400.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import { SmoothScroll } from "@/components/fx/SmoothScroll";

export const metadata: Metadata = {
  title: "Studio AFRO — Doublage, Bading, animation",
  description:
    "Studio AFRO, le studio d'Afro (@afrothecreator) : doublage, parodies Bading et animation, depuis Abidjan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
