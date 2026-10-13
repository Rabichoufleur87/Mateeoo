"""Rapport HTML autonome (un seul fichier, s'ouvre dans n'importe quel navigateur)."""

import html
import json

COULEURS = ["#3B63E0", "#C2410C", "#0F766E", "#A16207", "#7C3AED"]


def euros(v):
    return f"{v:,.0f} €".replace(",", " ")


def pct(v):
    return f"{v * 100:+.1f} %".replace(".", ",")


def echantillonner(points, maximum=600):
    if len(points) <= maximum:
        return points
    pas = len(points) / maximum
    choisis = [points[int(i * pas)] for i in range(maximum)]
    return choisis + [points[-1]]


def generer(resultats, titre, sous_titre, chemin):
    series = []
    for i, r in enumerate(resultats):
        points = echantillonner(r["courbe"])
        series.append(
            {
                "nom": r["titre"],
                "couleur": COULEURS[i % len(COULEURS)],
                "dates": [j.isoformat() for j, _ in points],
                "valeurs": [v for _, v in points],
            }
        )

    meilleur = max(resultats, key=lambda r: r["valeur_finale"])
    lignes = "".join(
        f"""<tr{' class="top"' if r is meilleur else ''}>
          <th scope="row"><i style="background:{COULEURS[i % len(COULEURS)]}"></i>{html.escape(r['titre'])}</th>
          <td>{euros(r['valeur_finale'])}</td><td>{euros(r['total_verse'])}</td>
          <td class="{'pos' if r['gain'] >= 0 else 'neg'}">{euros(r['gain'])}</td>
          <td>{pct(r['rendement_annuel'])}</td><td class="neg">{pct(r['pire_baisse'])}</td>
          <td>{r['nb_ordres']}</td><td>{euros(r['frais'])}</td></tr>"""
        for i, r in enumerate(resultats)
    )
    journaux = "".join(
        f"""<details><summary>{html.escape(r['titre'])} · {r['nb_ordres']} ordres</summary>
        <div class="defile"><table><thead><tr><th>Date</th><th>Sens</th><th>Montant</th><th>Prix</th><th>Frais</th><th>Valeur après</th></tr></thead><tbody>
        {''.join(f"<tr><td>{o['date']}</td><td>{o['sens']}</td><td>{euros(o['montant'])}</td><td>{o['prix']}</td><td>{o['frais']:.2f} €</td><td>{euros(o['valeur_apres'])}</td></tr>" for o in r['journal'][-300:])}
        </tbody></table></div></details>"""
        for r in resultats
        if r["journal"]
    )

    page = MODELE.replace("__TITRE__", html.escape(titre))
    page = page.replace("__SOUS_TITRE__", html.escape(sous_titre))
    page = page.replace("__LIGNES__", lignes).replace("__JOURNAUX__", journaux)
    page = page.replace("__SERIES__", json.dumps(series))
    chemin.write_text(page, encoding="utf-8")
    return chemin


MODELE = """<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>__TITRE__</title>
<style>
:root{--bg:#F5F7FB;--surface:#fff;--fg:#121A33;--muted:#5A6482;--line:#DCE1EC;--accent:#1F3FB0;--pos:#1D7A52;--neg:#B03838;color-scheme:light}
@media (prefers-color-scheme:dark){:root{--bg:#0A0F1E;--surface:#111933;--fg:#E7EBF6;--muted:#98A2C0;--line:#243055;--accent:#86A0FF;--pos:#55C990;--neg:#F08080;color-scheme:dark}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:1100px;margin:0 auto;padding:40px clamp(16px,4vw,40px) 80px;display:grid;gap:24px}
h1{font-size:clamp(1.8rem,4vw,2.6rem);line-height:1.1;margin:0;letter-spacing:-.02em}
.sous{color:var(--muted);margin:6px 0 0}
.alerte{border:1px solid var(--line);background:var(--surface);border-radius:12px;padding:12px 16px;font-size:14px;color:var(--muted)}
.carte{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:20px;min-width:0}
svg{width:100%;height:auto;display:block}
.legende{display:flex;flex-wrap:wrap;gap:14px;font-size:13px;color:var(--muted);margin-top:10px}
.legende i,th i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;vertical-align:middle}
.bulle{position:fixed;pointer-events:none;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:8px 12px;font-size:12.5px;box-shadow:0 8px 24px -10px rgba(0,0,0,.3);opacity:0;transition:opacity .15s;font-variant-numeric:tabular-nums}
.defile{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-variant-numeric:tabular-nums;font-size:14px}
th,td{padding:9px 10px;text-align:right;border-bottom:1px solid var(--line);white-space:nowrap}
th:first-child,td:first-child{text-align:left}
thead th{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);font-weight:600}
tr.top th{color:var(--accent)}
.pos{color:var(--pos)}.neg{color:var(--neg)}
details{border-top:1px solid var(--line);padding:10px 0}
summary{cursor:pointer;font-weight:600}
</style></head><body><main>
<header><h1>__TITRE__</h1><p class="sous">__SOUS_TITRE__</p></header>
<p class="alerte">Simulation avec de l'argent fictif. Les performances passées ne préjugent pas des performances futures : une stratégie qui a gagné sur l'historique peut perdre demain.</p>
<section class="carte"><svg id="graphe" viewBox="0 0 900 380" role="img" aria-label="Évolution de la valeur du portefeuille"></svg><div class="legende" id="legende"></div></section>
<section class="carte defile"><table><thead><tr><th>Stratégie</th><th>Valeur finale</th><th>Versé</th><th>Gain</th><th>Rendement / an</th><th>Pire baisse</th><th>Ordres</th><th>Frais</th></tr></thead><tbody>__LIGNES__</tbody></table></section>
<section class="carte"><h2 style="margin:0 0 8px;font-size:18px">Journal des ordres</h2>__JOURNAUX__</section>
</main><div class="bulle" id="bulle"></div>
<script>
const S=__SERIES__,svg=document.getElementById("graphe"),NS="http://www.w3.org/2000/svg";
const W=900,H=380,G=64,D=18,T=16,B=34,n=S[0].dates.length;
const tout=S.flatMap(s=>s.valeurs),min=Math.min(...tout)*.95,max=Math.max(...tout)*1.03;
const x=i=>G+(W-G-D)*i/(n-1||1),y=v=>T+(H-T-B)*(1-(v-min)/(max-min||1));
const el=(t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);svg.appendChild(e);return e};
const fmt=v=>Math.round(v).toLocaleString("fr-FR")+" €";
for(let k=0;k<=4;k++){const v=min+(max-min)*k/4;el("line",{x1:G,x2:W-D,y1:y(v),y2:y(v),stroke:"var(--line)"});el("text",{x:G-8,y:y(v)+4,"text-anchor":"end","font-size":11,fill:"var(--muted)"}).textContent=fmt(v)}
for(let k=0;k<=4;k++){const i=Math.round((n-1)*k/4);el("text",{x:x(i),y:H-10,"text-anchor":k==0?"start":k==4?"end":"middle","font-size":11,fill:"var(--muted)"}).textContent=S[0].dates[i].slice(0,7)}
S.forEach(s=>{const p=el("polyline",{points:s.valeurs.map((v,i)=>x(i)+","+y(v)).join(" "),fill:"none",stroke:s.couleur,"stroke-width":2,"stroke-linejoin":"round"});const L=p.getTotalLength?p.getTotalLength():0;if(L&&!matchMedia("(prefers-reduced-motion: reduce)").matches){p.style.strokeDasharray=L;p.style.strokeDashoffset=L;p.getBoundingClientRect();p.style.transition="stroke-dashoffset 1.4s cubic-bezier(.3,.8,.2,1)";requestAnimationFrame(()=>p.style.strokeDashoffset=0)}
const l=document.createElement("span");l.innerHTML='<i style="background:'+s.couleur+'"></i>';l.append(s.nom);document.getElementById("legende").append(l)});
const curseur=el("line",{y1:T,y2:H-B,stroke:"var(--muted)","stroke-dasharray":"3 3",opacity:0}),bulle=document.getElementById("bulle");
svg.addEventListener("pointermove",e=>{const r=svg.getBoundingClientRect(),px=(e.clientX-r.left)*W/r.width,i=Math.max(0,Math.min(n-1,Math.round((px-G)/(W-G-D)*(n-1))));
curseur.setAttribute("x1",x(i));curseur.setAttribute("x2",x(i));curseur.setAttribute("opacity",1);
bulle.innerHTML="<b>"+S[0].dates[i]+"</b>"+S.map(s=>'<div><i style="display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:6px;background:'+s.couleur+'"></i>'+s.nom+" : "+fmt(s.valeurs[i])+"</div>").join("");
bulle.style.opacity=1;bulle.style.left=Math.min(e.clientX+14,innerWidth-240)+"px";bulle.style.top=(e.clientY+14)+"px"});
svg.addEventListener("pointerleave",()=>{curseur.setAttribute("opacity",0);bulle.style.opacity=0});
</script></body></html>"""
