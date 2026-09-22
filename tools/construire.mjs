#!/usr/bin/env node
/**
 * Assemble les pages HTML du site à partir de :
 *   - src/gabarit.html   : en-tête, navigation, pied de page communs
 *   - src/pages/*.html   : le contenu propre à chaque page
 *
 * Usage :  node tools/construire.mjs
 * Les fichiers .html générés sont écrits à la racine du projet.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const racine = join(dirname(fileURLToPath(import.meta.url)), "..");
const gabarit = readFileSync(join(racine, "src/gabarit.html"), "utf8");
const dossier = join(racine, "src/pages");

let compte = 0;
for (const fichier of readdirSync(dossier).filter((f) => f.endsWith(".html")).sort()) {
  const slug = basename(fichier, ".html");
  const source = readFileSync(join(dossier, fichier), "utf8");

  const entete = /^<!--\s*([\s\S]*?)-->\s*/.exec(source);
  const meta = {};
  if (entete) {
    for (const ligne of entete[1].split("\n")) {
      const m = /^\s*([a-zA-Z]+)\s*:\s*(.+?)\s*$/.exec(ligne);
      if (m) meta[m[1].toLowerCase()] = m[2];
    }
  }
  const corps = entete ? source.slice(entete[0].length) : source;

  const sortie = gabarit
    .replaceAll("{{TITRE}}", meta.titre || slug)
    .replaceAll("{{DESCRIPTION}}", meta.description || "Site officiel de la commune de Saint-Mathieu (87440), Haute-Vienne.")
    .replaceAll("{{SLUG}}", slug)
    .replace("{{CORPS}}", () => corps.trimEnd());

  writeFileSync(join(racine, slug + ".html"), sortie);
  compte++;
  console.log("  ✓ " + slug + ".html");
}
console.log(`\n${compte} page(s) générée(s).`);
