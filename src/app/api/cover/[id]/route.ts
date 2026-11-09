import { NextResponse } from "next/server";

/**
 * Couverture d'une vidéo TikTok d'Afro.
 * Le serveur demande la miniature officielle (oEmbed TikTok), la renvoie et
 * la met en cache 12 h sur Vercel. Si TikTok ne répond pas, on renvoie
 * l'illustration de secours passée en ?fallback=.
 */
export const revalidate = 43200;

const PROFIL = "https://www.tiktok.com/@afrothecreator/video/";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sp = new URL(req.url).searchParams;
  const fallback = sp.get("fallback");
  const debug = sp.has("debug");
  const secours = () =>
    fallback?.startsWith("/afro/")
      ? NextResponse.redirect(new URL(fallback, req.url), 307)
      : new NextResponse(null, { status: 404 });

  if (!/^\d{10,25}$/.test(id)) return secours();

  try {
    const meta = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(PROFIL + id)}`, {
      next: { revalidate: 43200 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; StudioAfroBot/1.0)", Accept: "application/json" },
    });
    if (!meta.ok) {
      console.warn(`[cover] oEmbed ${id} → ${meta.status}`);
      if (debug) return NextResponse.json({ etape: "oembed", status: meta.status, corps: (await meta.text()).slice(0, 300) });
      return secours();
    }
    const brut = await meta.text();
    let thumbnail_url: string | undefined;
    try {
      thumbnail_url = (JSON.parse(brut) as { thumbnail_url?: string }).thumbnail_url;
    } catch {}
    if (!thumbnail_url) {
      if (debug) {
        const o = JSON.parse(brut) as Record<string, unknown>;
        return NextResponse.json({
          etape: "oembed-json",
          cles: Object.keys(o),
          valeurs: Object.fromEntries(Object.entries(o).filter(([k]) => k !== "html")),
        });
      }
      return secours();
    }

    const img = await fetch(thumbnail_url, {
      next: { revalidate: 43200 },
      headers: { Referer: "https://www.tiktok.com/", "User-Agent": "Mozilla/5.0 (compatible; StudioAfroBot/1.0)" },
    });
    if (!img.ok) {
      console.warn(`[cover] image ${id} → ${img.status}`);
      if (debug) return NextResponse.json({ etape: "image", status: img.status, url: thumbnail_url.slice(0, 120) });
      return secours();
    }

    return new NextResponse(await img.arrayBuffer(), {
      headers: {
        "Content-Type": img.headers.get("content-type") ?? "image/jpeg",
        "Cache-Control": "public, max-age=3600, s-maxage=43200, stale-while-revalidate=86400",
      },
    });
  } catch (e) {
    console.warn(`[cover] ${id} → erreur`, e);
    if (debug) return NextResponse.json({ etape: "exception", message: String(e) });
    return secours();
  }
}
