// Liste les couvertures présentes dans public/covers (<idVidéo>.jpg|webp) avant chaque build.
import { readdirSync, writeFileSync } from "node:fs";
const fichiers = readdirSync("public/covers").filter((f) => /^\d{10,25}\.(jpe?g|webp|png)$/i.test(f));
const map = Object.fromEntries(fichiers.map((f) => [f.split(".")[0], `/covers/${f}`]));
writeFileSync("src/data/covers.json", JSON.stringify(map, null, 0) + "\n");
console.log(`couvertures : ${fichiers.length}`);
