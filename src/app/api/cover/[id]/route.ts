import { NextResponse } from "next/server";

/**
 * Couverture d'une vidéo TikTok d'Afro.
 * Le serveur lit la page d'intégration officielle de la vidéo (embed/v2),
 * y prend l'URL de la couverture, renvoie l'image et la met en cache 12 h.
 * Si TikTok ne répond pas, on renvoie l'illustration de secours (?fallback=).
 * ?debug=1 renvoie le détail de chaque étape.
 */
export const revalidate = 43200;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

function trouverCouverture(html: string): string | null {
  const motifs = [
    /"originCover":"(https:[^"]+)"/,
    /"cover":"(https:[^"]+)"/,
    /"dynamicCover":"(https:[^"]+)"/,
    /<meta[^>]+property="og:image"[^>]+content="([^"]+)"/,
  ];
  for (const m of motifs) {
    const r = html.match(m);
    if (r) return r[1].replace(/\\u002F/g, "/").replace(/\\\//g, "/").replace(/&amp;/g, "&");
  }
  return null;
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sp = new URL(req.url).searchParams;
  const fallback = sp.get("fallback");
  const debug = sp.has("debug");
  const secours = (etape: string, info?: unknown) => {
    console.warn(`[cover] ${id} : échec à l'étape ${etape}`, info ?? "");
    if (debug) return NextResponse.json({ etape, info });
    return fallback?.startsWith("/afro/")
      ? NextResponse.redirect(new URL(fallback, req.url), 307)
      : new NextResponse(null, { status: 404 });
  };

  if (!/^\d{10,25}$/.test(id)) return secours("id");

  try {
    const page = await fetch(`https://www.tiktok.com/embed/v2/${id}`, {
      next: { revalidate: 43200 },
      headers: { "User-Agent": UA, "Accept-Language": "fr-FR,fr;q=0.9" },
    });
    if (!page.ok) return secours("embed", page.status);
    const html = await page.text();
    const cover = trouverCouverture(html);
    if (!cover) return secours("couverture-introuvable", html.slice(0, 200));

    const img = await fetch(cover, {
      next: { revalidate: 43200 },
      headers: { "User-Agent": UA, Referer: "https://www.tiktok.com/" },
    });
    if (!img.ok) return secours("image", { status: img.status, cover: cover.slice(0, 100) });
    if (debug) return NextResponse.json({ etape: "ok", cover: cover.slice(0, 100), type: img.headers.get("content-type") });

    return new NextResponse(await img.arrayBuffer(), {
      headers: {
        "Content-Type": img.headers.get("content-type") ?? "image/jpeg",
        "Cache-Control": "public, max-age=3600, s-maxage=43200, stale-while-revalidate=86400",
      },
    });
  } catch (e) {
    return secours("exception", String(e));
  }
}
