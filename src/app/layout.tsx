import type { Metadata } from "next";
import "@fontsource/anton/400.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import { Loader } from "@/components/fx/Loader";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { TransitionProvider } from "@/components/fx/Transition";
import { VideoProvider } from "@/components/video/VideoProvider";

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
        <SmoothScroll>
          <TransitionProvider>
            <VideoProvider>{children}</VideoProvider>
          </TransitionProvider>
          <Loader />
        </SmoothScroll>
      </body>
    </html>
  );
}
