/* ==========================================================================
   Saint-Mathieu (87440) — script principal
   Sans dépendance. Fonctionne en local (double-clic) comme en ligne.
   ========================================================================== */
(function () {
  "use strict";

  var D = window.DONNEES || {};
  var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet",
              "août", "septembre", "octobre", "novembre", "décembre"];
  var MOIS_COURT = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.",
                    "août", "sept.", "oct.", "nov.", "déc."];
  var JOURS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  /* --- Icônes ----------------------------------------------------------- */
  var I = {
    tel: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
    courriel: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    horloge: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    lieu: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    loupe: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    croix: '<path d="M18 6 6 18M6 6l12 12"/>',
    soleil: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    lune: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
    identite: '<rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="9" cy="11" r="2.5"/><path d="M5 17c.7-1.6 2.2-2.5 4-2.5s3.3.9 4 2.5M15 9h4M15 13h4"/>',
    carte: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
    maison: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    cle: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.3-9.3M16 7l3 3M13.5 9.5l2.5 2.5"/>',
    calendrier: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    megaphone: '<path d="M3 11v2a1 1 0 0 0 1 1h2l6 4V6L6 10H4a1 1 0 0 0-1 1Z"/><path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>',
    mairie: '<path d="M3 21h18M4 21V10l8-6 8 6v11"/><path d="M9 21v-6h6v6M9.5 11h5"/>',
    arbre: '<path d="M12 2 6 11h3l-4 6h5v5h4v-5h5l-4-6h3Z"/>',
    poubelle: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6"/><path d="M10 11v6M14 11v6"/>',
    ecole: '<path d="m12 3 10 5-10 5L2 8Z"/><path d="M6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5"/>',
    sante: '<path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11Z"/>',
    document: '<path d="M14 2H6.5A1.5 1.5 0 0 0 5 3.5v17A1.5 1.5 0 0 0 6.5 22h11a1.5 1.5 0 0 0 1.5-1.5V7Z"/><path d="M14 2v5h5M9 13h6M9 17h6"/>',
    fleche: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    groupe: '<circle cx="9" cy="8" r="3.2"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M18 20a6.4 6.4 0 0 0-2.3-4.9"/>',
    etoile: '<path d="M12 3.5 14.6 9l6 .9-4.3 4.2 1 6-5.3-2.8L6.7 20l1-6-4.3-4.2 6-.9Z"/>'
  };

  function icone(nom, classe) {
    var d = I[nom];
    if (!d) return "";
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="icone' +
           (classe ? " " + classe : "") + '">' + d + "</svg>";
  }
  window.icone = icone;

  /* --- Utilitaires ------------------------------------------------------ */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function echappe(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function dateDepuis(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    if (!m) return null;
    return new Date(+m[1], +m[2] - 1, +m[3]);
  }

  function dateLongue(iso) {
    var d = dateDepuis(iso);
    if (!d) return iso || "";
    return d.getDate() + " " + MOIS[d.getMonth()] + " " + d.getFullYear();
  }

  function minutes(hhmm) {
    var m = /^(\d{1,2}):(\d{2})$/.exec(hhmm || "");
    return m ? +m[1] * 60 + +m[2] : null;
  }

  function aujourdhui() {
    var d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  /* --- Thème clair / sombre --------------------------------------------- */
  function initTheme() {
    var cle = "sm-theme";
    var stocke = null;
    try { stocke = localStorage.getItem(cle); } catch (e) { /* navigation privée */ }
    if (stocke === "sombre" || stocke === "clair") {
      document.documentElement.setAttribute("data-theme", stocke);
    }

    $$("[data-action='theme']").forEach(function (btn) {
      majEtiquetteTheme(btn);
      btn.addEventListener("click", function () {
        var actuel = document.documentElement.getAttribute("data-theme");
        if (!actuel) {
          actuel = window.matchMedia("(prefers-color-scheme: dark)").matches ? "sombre" : "clair";
        }
        var suivant = actuel === "sombre" ? "clair" : "sombre";
        document.documentElement.setAttribute("data-theme", suivant);
        try { localStorage.setItem(cle, suivant); } catch (e) { /* ignoré */ }
        $$("[data-action='theme']").forEach(function (b) {
          majEtiquetteTheme(b);
          // Petit tourbillon sur l'icône pour marquer le changement.
          b.classList.remove("bouton-icone--bascule");
          void b.offsetWidth; // force le navigateur à repartir de zéro
          b.classList.add("bouton-icone--bascule");
        });
      });
    });
  }

  function majEtiquetteTheme(btn) {
    var actuel = document.documentElement.getAttribute("data-theme");
    if (!actuel) {
      actuel = window.matchMedia("(prefers-color-scheme: dark)").matches ? "sombre" : "clair";
    }
    var versSombre = actuel !== "sombre";
    btn.innerHTML = icone(versSombre ? "lune" : "soleil");
    btn.setAttribute("aria-label", versSombre ? "Activer le thème sombre" : "Activer le thème clair");
    btn.setAttribute("title", versSombre ? "Thème sombre" : "Thème clair");
  }

  /* --- Menu mobile ------------------------------------------------------ */
  function initMenu() {
    var bouton = $("[data-action='menu']");
    var nav = $("#navigation");
    if (!bouton || !nav) return;
    var voile = null;

    function ouvrir() {
      // Le panneau démarre sous l'en-tête, dont la hauteur varie selon l'écran.
      var entete = document.querySelector(".entete");
      if (entete) nav.style.paddingTop = Math.round(entete.getBoundingClientRect().bottom + 16) + "px";
      nav.setAttribute("data-ouvert", "true");
      bouton.setAttribute("aria-expanded", "true");
      bouton.innerHTML = icone("croix");
      document.body.style.overflow = "hidden";
      voile = document.createElement("button");
      voile.className = "voile";
      voile.setAttribute("aria-label", "Fermer le menu");
      voile.addEventListener("click", fermer);
      document.body.appendChild(voile);
      var premier = nav.querySelector("a");
      if (premier) premier.focus();
    }

    function fermer() {
      nav.removeAttribute("data-ouvert");
      bouton.setAttribute("aria-expanded", "false");
      bouton.innerHTML = icone("menu");
      document.body.style.overflow = "";
      if (voile) { voile.remove(); voile = null; }
    }

    bouton.innerHTML = icone("menu");
    bouton.addEventListener("click", function () {
      nav.getAttribute("data-ouvert") === "true" ? fermer() : ouvrir();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.getAttribute("data-ouvert") === "true") { fermer(); bouton.focus(); }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 960 && nav.getAttribute("data-ouvert") === "true") fermer();
    });
  }

  /* --- Statut d'ouverture de la mairie ---------------------------------- */
  function statutMairie() {
    var horaires = (D.commune && D.commune.mairie && D.commune.mairie.horaires) || [];
    var maintenant = new Date();
    var jourIndex = maintenant.getDay();              // 0 = dimanche
    var ligne = horaires[(jourIndex + 6) % 7];        // le tableau commence au lundi
    var min = maintenant.getHours() * 60 + maintenant.getMinutes();
    var creneaux = (ligne && ligne.creneaux) || [];

    for (var i = 0; i < creneaux.length; i++) {
      var bornes = creneaux[i].split("-");
      var debut = minutes(bornes[0]), fin = minutes(bornes[1]);
      if (debut !== null && fin !== null && min >= debut && min < fin) {
        return { ouvert: true, texte: "Mairie ouverte · jusqu'à " + bornes[1].replace(":", "h") };
      }
    }
    // Recherche de la prochaine ouverture
    for (var j = 0; j < 8; j++) {
      var idx = (jourIndex + j) % 7;
      var l = horaires[(idx + 6) % 7];
      var c = (l && l.creneaux) || [];
      for (var k = 0; k < c.length; k++) {
        var deb = minutes(c[k].split("-")[0]);
        if (j === 0 && deb <= min) continue;
        var quand = j === 0 ? "aujourd'hui" : (j === 1 ? "demain" : JOURS[idx].toLowerCase());
        return { ouvert: false, texte: "Mairie fermée · réouverture " + quand + " à " + c[k].split("-")[0].replace(":", "h") };
      }
    }
    return { ouvert: false, texte: "Mairie fermée" };
  }

  function initStatut() {
    var cibles = $$("[data-statut-mairie]");
    if (!cibles.length) return;
    var s = statutMairie();
    cibles.forEach(function (el) {
      el.className = "pastille " + (s.ouvert ? "pastille--ouvert" : "pastille--ferme");
      el.textContent = s.texte;
    });
  }

  /* --- Bandeau d'information et coordonnées ----------------------------- */
  function initCoordonnees() {
    var m = (D.commune && D.commune.mairie) || {};
    $$("[data-champ]").forEach(function (el) {
      var chemin = el.getAttribute("data-champ").split(".");
      var v = D;
      for (var i = 0; i < chemin.length && v != null; i++) v = v[chemin[i]];
      if (v == null) return;
      if (el.tagName === "A" && el.hasAttribute("data-href")) {
        el.setAttribute("href", el.getAttribute("data-href").replace("{valeur}", v));
      }
      el.textContent = v;
    });
    $$("[data-tel]").forEach(function (el) {
      if (m.telephoneLien) el.setAttribute("href", "tel:" + m.telephoneLien);
      if (!el.textContent.trim()) el.textContent = m.telephone || "";
    });
    $$("[data-courriel]").forEach(function (el) {
      if (m.email) { el.setAttribute("href", "mailto:" + m.email); if (!el.textContent.trim()) el.textContent = m.email; }
    });
  }

  /* --- Tableau des horaires --------------------------------------------- */
  function initHoraires() {
    var cible = $("[data-horaires]");
    if (!cible) return;
    var horaires = (D.commune && D.commune.mairie && D.commune.mairie.horaires) || [];
    var jourIndex = (new Date().getDay() + 6) % 7;
    var html = "<table class='horaires'><caption class='evite-oeil'>Horaires d'ouverture de la mairie</caption><tbody>";
    horaires.forEach(function (l, i) {
      var c = l.creneaux && l.creneaux.length
        ? l.creneaux.map(function (x) { return x.replace(/:/g, "h").replace(/-/g, " – "); }).join("<br>")
        : "<span class='ferme'>Fermé</span>";
      html += "<tr" + (i === jourIndex ? " data-aujourdhui='true'" : "") + "><th scope='row'>" +
              echappe(l.jours) + "</th><td>" + c + "</td></tr>";
    });
    cible.innerHTML = html + "</tbody></table>";
  }

  /* --- Actualités -------------------------------------------------------- */
  function carteActu(a) {
    return '<article class="actu anime-entree' + (a.epingle ? " actu--epingle" : "") + '" id="' + echappe(a.id) + '">' +
      '<div class="actu__meta">' +
        (a.epingle ? '<span class="etiquette etiquette--terre">' + icone("etoile") + " À la une</span>" : "") +
        '<span class="etiquette etiquette--gris">' + echappe(a.categorie) + "</span>" +
        "<time datetime='" + echappe(a.date) + "'>" + icone("calendrier") + " " + dateLongue(a.date) + "</time>" +
      "</div>" +
      "<h3>" + echappe(a.titre) + "</h3>" +
      "<p>" + echappe(a.chapo) + "</p>" +
      (a.corps ? '<details class="actu__details"><summary class="actu__lire">Lire la suite</summary>' +
        '<div class="pliable"><div class="actu__corps">' +
        a.corps.split("\n\n").map(function (p) { return "<p>" + echappe(p) + "</p>"; }).join("") +
        "</div></div></details>" : "") +
      "</article>";
  }

  function initActualites() {
    var liste = $("[data-actualites]");
    if (!liste) return;
    var max = parseInt(liste.getAttribute("data-actualites"), 10);
    var items = (D.actualites || []).slice().sort(function (a, b) {
      if (!!b.epingle !== !!a.epingle) return b.epingle ? 1 : -1;
      return (b.date || "").localeCompare(a.date || "");
    });
    if (max > 0) items = items.slice(0, max);
    liste.innerHTML = items.length
      ? items.map(carteActu).join("")
      : '<p class="texte-doux">Aucune actualité pour le moment.</p>';

    var filtres = $("[data-filtres-actu]");
    if (!filtres) return;
    var cats = [];
    (D.actualites || []).forEach(function (a) { if (cats.indexOf(a.categorie) < 0) cats.push(a.categorie); });
    filtres.innerHTML = ['<button type="button" class="filtre" aria-pressed="true" data-cat="">Toutes</button>']
      .concat(cats.map(function (c) {
        return '<button type="button" class="filtre" aria-pressed="false" data-cat="' + echappe(c) + '">' + echappe(c) + "</button>";
      })).join("");
    filtres.addEventListener("click", function (e) {
      var btn = e.target.closest(".filtre");
      if (!btn) return;
      $$(".filtre", filtres).forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      var cat = btn.getAttribute("data-cat");
      var visibles = items.filter(function (a) { return !cat || a.categorie === cat; });
      liste.innerHTML = visibles.length
        ? visibles.map(carteActu).join("")
        : '<p class="texte-doux">Aucune actualité dans cette rubrique.</p>';
      observerRevelations(liste);
      initAccordeons(liste);
    });
  }

  /* --- Actualités du département (sélection sourcée, hors flux communal) -- */
  function carteActuDepartement(a) {
    return '<article class="actu actu--externe anime-entree">' +
      '<div class="actu__meta">' +
        '<span class="etiquette etiquette--bleu">' + echappe(a.categorie) + "</span>" +
        "<time datetime='" + echappe(a.date) + "'>" + dateLongue(a.date) + "</time>" +
      "</div>" +
      "<h3>" + echappe(a.titre) + "</h3>" +
      "<p>" + echappe(a.extrait) + "</p>" +
      '<p class="actu__source">' +
        "<a href=\"" + echappe(a.lien) + "\" target=\"_blank\" rel=\"noopener\">Lire l'article " + icone("fleche") + "</a>" +
        '<span class="actu__nom-source">' + echappe(a.source) + "</span>" +
      "</p>" +
    "</article>";
  }

  function initActualitesDepartement() {
    var liste = $("[data-actualites-departement]");
    if (!liste) return;
    var items = (D.actualitesDepartement || []).slice().sort(function (a, b) {
      return (b.date || "").localeCompare(a.date || "");
    });
    liste.innerHTML = items.length
      ? items.map(carteActuDepartement).join("")
      : '<p class="texte-doux">Aucune actualité départementale sélectionnée pour le moment.</p>';
  }

  /* --- Agenda ------------------------------------------------------------ */
  function initAgenda() {
    var liste = $("[data-agenda]");
    if (!liste) return;
    var max = parseInt(liste.getAttribute("data-agenda"), 10);
    var seuil = aujourdhui();
    var items = (D.agenda || [])
      .filter(function (e) { var d = dateDepuis(e.date); return d && d >= seuil; })
      .sort(function (a, b) { return (a.date || "").localeCompare(b.date || ""); });
    if (max > 0) items = items.slice(0, max);

    if (!items.length) {
      liste.innerHTML = '<p class="texte-doux">Aucun événement programmé pour le moment. Le programme est affiché en mairie dès qu\'il est arrêté.</p>';
      return;
    }
    liste.innerHTML = items.map(function (e) {
      var d = dateDepuis(e.date);
      return '<article class="evenement anime-entree">' +
        '<div class="evenement__date" aria-hidden="true"><span class="jour">' + d.getDate() +
          '</span><span class="mois">' + MOIS_COURT[d.getMonth()] + "</span></div>" +
        "<div>" +
          '<div class="actu__meta"><span class="etiquette etiquette--bleu">' + echappe(e.categorie) + "</span>" +
          (e.recurrent ? '<span class="etiquette etiquette--gris">' + echappe(e.recurrent) + "</span>" : "") + "</div>" +
          "<h3>" + echappe(e.titre) + "</h3>" +
          '<div class="evenement__infos">' +
            "<span><span class='puce-icone puce-icone--bleu'>" + icone("calendrier") + "</span><time datetime='" + echappe(e.date) + "'>" + dateLongue(e.date) + "</time></span>" +
            (e.heure ? "<span><span class='puce-icone puce-icone--terre'>" + icone("horloge") + "</span>" + echappe(e.heure.replace(":", "h")) + "</span>" : "") +
            (e.lieu ? "<span><span class='puce-icone puce-icone--info'>" + icone("lieu") + "</span>" + echappe(e.lieu) + "</span>" : "") +
          "</div>" +
          (e.description ? "<p>" + echappe(e.description) + "</p>" : "") +
        "</div></article>";
    }).join("");
  }

  /* --- Démarches --------------------------------------------------------- */
  function initDemarches() {
    var cible = $("[data-demarches]");
    if (!cible) return;
    cible.innerHTML = (D.demarches || []).map(function (groupe) {
      return '<section class="section-demarche" id="' +
        echappe(groupe.categorie.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-")) + '">' +
        '<h2 class="titre-groupe">' + icone(groupe.icone) + " " + echappe(groupe.categorie) + "</h2>" +
        groupe.items.map(function (it) {
          return '<details class="demarche anime-entree"><summary>' + echappe(it.titre) + "</summary>" +
            '<div class="pliable"><div class="demarche__corps">' +
              (it.detail ? "<p>" + echappe(it.detail) + "</p>" : "") +
              '<dl class="infos-cles">' +
                (it.ou ? '<div class="info-cle"><span class="puce-icone puce-icone--bleu">' + icone("lieu") +
                  "</span><div><dt>Où s'adresser</dt><dd>" + echappe(it.ou) + "</dd></div></div>" : "") +
                (it.delai ? '<div class="info-cle"><span class="puce-icone puce-icone--terre">' + icone("horloge") +
                  "</span><div><dt>Délai</dt><dd>" + echappe(it.delai) + "</dd></div></div>" : "") +
              "</dl>" +
              (it.pieces && it.pieces.length
                ? "<div><strong>Pièces à fournir</strong><ul class='liste-pieces'>" +
                  it.pieces.map(function (p) { return "<li>" + echappe(p) + "</li>"; }).join("") + "</ul></div>"
                : "") +
              (it.lien ? '<p><a class="btn btn--fantome btn--petit" href="' + echappe(it.lien) +
                '" target="_blank" rel="noopener">Fiche officielle ' + icone("fleche") + "</a></p>" : "") +
            "</div></div></details>";
        }).join("") + "</section>";
    }).join("");

    var som = $("[data-sommaire-demarches]");
    if (som) {
      som.innerHTML = "<strong>Aller directement à</strong><ul>" + (D.demarches || []).map(function (g) {
        var id = g.categorie.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-");
        return '<li><a href="#' + id + '">' + echappe(g.categorie) + "</a></li>";
      }).join("") + "</ul>";
    }
  }

  /* --- Annuaire ---------------------------------------------------------- */
  function initAnnuaire() {
    var styleParSection = {
      sante: ["sante", "terre"],
      servicesPublics: ["mairie", "bleu"],
      commerces: ["maison", "or"],
      associations: ["groupe", "info"]
    };
    $$("[data-annuaire]").forEach(function (cible) {
      var cle = cible.getAttribute("data-annuaire");
      var style = styleParSection[cle] || ["info", "bleu"];
      var items = (D.annuaire && D.annuaire[cle]) || [];
      cible.innerHTML = items.map(function (it) {
        return "<li>" +
          "<span class='puce-icone puce-icone--" + style[1] + "'>" + icone(style[0]) + "</span>" +
          "<div style='flex:1 1 12rem'><strong>" + echappe(it.nom) + "</strong>" +
          (it.categorie ? ' <span class="etiquette etiquette--gris">' + echappe(it.categorie) + "</span>" : "") + "</div>" +
          (it.detail ? '<span class="detail">' + echappe(it.detail) + "</span>" : "") +
          (it.telephone ? '<a class="tel" href="tel:' + echappe(it.telephone.replace(/\s/g, "")) + '">' +
            icone("tel") + " " + echappe(it.telephone) + "</a>" : "") +
          (it.lien ? '<a class="tel" href="' + echappe(it.lien) + '" target="_blank" rel="noopener">Site web</a>' : "") +
          "</li>";
      }).join("");
    });
  }

  /* --- Élus -------------------------------------------------------------- */
  function initElus() {
    var cible = $("[data-elus]");
    if (!cible) return;
    var e = D.elus || {};
    cible.innerHTML = "<div class='enveloppe-tableau'><table class='tableau-simple'>" +
      "<caption class='evite-oeil'>Composition du conseil municipal</caption>" +
      "<thead><tr><th scope='col'>Fonction</th><th scope='col'>Nom</th><th scope='col'>Délégation</th></tr></thead><tbody>" +
      (e.membres || []).map(function (m) {
        return "<tr><td><strong>" + echappe(m.fonction) + "</strong></td><td>" +
          (m.nom ? echappe(m.nom) : "<span class='texte-doux'>À compléter</span>") + "</td><td>" +
          (m.delegation ? echappe(m.delegation) : "<span class='texte-doux'>—</span>") + "</td></tr>";
      }).join("") + "</tbody></table></div>";

    var com = $("[data-commissions]");
    if (com) {
      com.innerHTML = (e.commissions || []).map(function (c) {
        return '<div class="carte anime-entree"><h3>' + echappe(c.nom) + "</h3><p>" + echappe(c.objet) + "</p></div>";
      }).join("");
    }
    var av = $("[data-avertissement-elus]");
    if (av && e.avertissement) av.textContent = e.avertissement;
  }

  /* --- Recherche globale -------------------------------------------------- */
  var PAGES = [
    { t: "Accueil", u: "index.html", d: "Actualités de la commune et du département", m: "accueil bienvenue actualites news" },
    { t: "Démarches administratives", u: "demarches.html", d: "État civil, identité, urbanisme, vie quotidienne", m: "papiers formulaire cerfa mairie guichet" },
    { t: "Carte d'identité et passeport", u: "demarches.html#papiers-d-identite", d: "Pré-demande ANTS et rendez-vous en mairie habilitée", m: "cni passeport ants identite" },
    { t: "Acte de naissance", u: "demarches.html#etat-civil", d: "Demande d'acte d'état civil", m: "naissance mariage deces acte copie extrait" },
    { t: "Permis de construire", u: "demarches.html#urbanisme", d: "Construction, extension, déclaration préalable", m: "urbanisme travaux batiment cerfa architecte" },
    { t: "Déchets et déchèterie", u: "vie-pratique.html#dechets", d: "Collecte tous les 15 jours, déchèterie des Flamanchies", m: "poubelle ordures tri encombrants dechetterie" },
    { t: "Vie municipale", u: "vie-municipale.html", d: "Conseil municipal, élus, commissions, budget", m: "maire adjoint conseil deliberation commission" },
    { t: "Conseil municipal", u: "vie-municipale.html#conseil", d: "Composition, séances et comptes rendus", m: "seance ordre du jour compte rendu deliberation" },
    { t: "Actualités", u: "actualites.html", d: "Les informations municipales récentes", m: "news infos nouvelles" },
    { t: "Agenda", u: "agenda.html", d: "Les prochains rendez-vous de la commune", m: "evenement manifestation fete calendrier" },
    { t: "Vie pratique", u: "vie-pratique.html", d: "École, santé, commerces, associations, déchets", m: "quotidien services annuaire" },
    { t: "Santé et urgences", u: "vie-pratique.html#sante", d: "Pharmacie, infirmiers, numéros d'urgence", m: "medecin pharmacie infirmier samu pompiers 15 18 112" },
    { t: "École et enfance", u: "vie-pratique.html#ecole", d: "Inscription scolaire, cantine, périscolaire", m: "ecole college inscription enfant cantine" },
    { t: "Associations", u: "vie-pratique.html#associations", d: "Le tissu associatif de Saint-Mathieu", m: "club comite des fetes sport loisirs benevole" },
    { t: "Découvrir Saint-Mathieu", u: "decouvrir.html", d: "Histoire, patrimoine, nature et tourisme", m: "tourisme visite patrimoine histoire etang plan d eau" },
    { t: "Plan d'eau et base de loisirs", u: "decouvrir.html#plan-eau", d: "22 hectares autour d'un plan d'eau de 14 hectares", m: "baignade etang loisirs peche camping plage" },
    { t: "Parc naturel régional Périgord-Limousin", u: "decouvrir.html#parc", d: "Saint-Mathieu, commune du Parc naturel régional", m: "pnr nature environnement randonnee" },
    { t: "Contact et horaires de la mairie", u: "contact.html", d: "Adresse, téléphone, courriel, horaires d'ouverture", m: "mairie telephone mail adresse ouverture accueil" },
    { t: "Location de salle", u: "demarches.html#logement-et-vie-quotidienne", d: "Réserver la salle des fêtes ou une salle communale", m: "salle des fetes reservation location mariage" },
    { t: "Signaler un problème", u: "contact.html#signalement", d: "Voirie, éclairage public, dépôt sauvage", m: "signalement probleme route eclairage nid de poule" },
    { t: "Mentions légales", u: "mentions-legales.html", d: "Éditeur, hébergement, données personnelles", m: "rgpd cookies donnees editeur" },
    { t: "Accessibilité", u: "accessibilite.html", d: "Déclaration d'accessibilité du site", m: "rgaa handicap accessibilite" }
  ];

  function normalise(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function indexRecherche() {
    var idx = PAGES.map(function (p) {
      return { titre: p.t, url: p.u, desc: p.d, cle: normalise(p.t + " " + p.d + " " + (p.m || "")) };
    });
    (D.actualites || []).forEach(function (a) {
      idx.push({ titre: a.titre, url: "actualites.html#" + a.id, desc: "Actualité · " + a.categorie,
                 cle: normalise(a.titre + " " + a.chapo + " " + a.categorie) });
    });
    (D.agenda || []).forEach(function (e) {
      idx.push({ titre: e.titre, url: "agenda.html", desc: "Agenda · " + dateLongue(e.date),
                 cle: normalise(e.titre + " " + e.categorie + " " + (e.lieu || "")) });
    });
    (D.demarches || []).forEach(function (g) {
      g.items.forEach(function (it) {
        var id = g.categorie.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-");
        idx.push({ titre: it.titre, url: "demarches.html#" + id, desc: "Démarche · " + g.categorie,
                   cle: normalise(it.titre + " " + (it.detail || "") + " " + g.categorie) });
      });
    });
    return idx;
  }

  function initRecherche() {
    var dlg = $("#dialogue-recherche");
    if (!dlg || typeof dlg.showModal !== "function") {
      $$("[data-action='recherche']").forEach(function (b) { b.style.display = "none"; });
      return;
    }
    var champ = $("#champ-recherche", dlg);
    var sortie = $("#resultats-recherche", dlg);
    var index = indexRecherche();
    var actif = -1;

    function rendre(q) {
      var nq = normalise(q).trim();
      var res = index;
      if (nq) {
        var mots = nq.split(/\s+/);
        res = index.filter(function (e) {
          return mots.every(function (m) { return e.cle.indexOf(m) >= 0; });
        }).sort(function (a, b) {
          return normalise(a.titre).indexOf(nq) - normalise(b.titre).indexOf(nq);
        });
      }
      res = res.slice(0, 10);
      actif = res.length ? 0 : -1;
      sortie.innerHTML = res.length
        ? res.map(function (e, i) {
            return '<li' + (i === 0 ? " data-actif='true'" : "") + '><a href="' + echappe(e.url) + '">' +
              "<strong>" + echappe(e.titre) + "</strong><span>" + echappe(e.desc) + "</span></a></li>";
          }).join("")
        : '<li class="recherche__vide">Aucun résultat. Essayez « carte d\'identité », « déchets », « salle »…</li>';
    }

    function deplacer(pas) {
      var lis = $$("li[data-actif], li", sortie).filter(function (li) { return li.querySelector("a"); });
      if (!lis.length) return;
      lis.forEach(function (li) { li.removeAttribute("data-actif"); });
      actif = (actif + pas + lis.length) % lis.length;
      lis[actif].setAttribute("data-actif", "true");
      lis[actif].scrollIntoView({ block: "nearest" });
    }

    function ouvrir() {
      rendre("");
      dlg.showModal();
      champ.value = "";
      champ.focus();
    }

    $$("[data-action='recherche']").forEach(function (b) { b.addEventListener("click", ouvrir); });
    champ.addEventListener("input", function () { rendre(champ.value); });
    champ.addEventListener("keydown", function (e) {
      // Chrome consomme Échap dans un champ de type « search » pour le vider :
      // la fermeture du dialogue doit donc être déclenchée explicitement.
      if (e.key === "Escape") { e.preventDefault(); dlg.close(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); deplacer(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); deplacer(-1); }
      else if (e.key === "Enter") {
        var a = sortie.querySelector("li[data-actif] a");
        if (a) { e.preventDefault(); window.location.href = a.getAttribute("href"); }
      }
    });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    document.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); ouvrir(); }
      if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) && !dlg.open) {
        e.preventDefault(); ouvrir();
      }
    });
  }

  /* --- Formulaire de contact (ouverture du client de messagerie) ---------- */
  function initFormulaire() {
    var f = $("#formulaire-contact");
    if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var m = (D.commune && D.commune.mairie) || {};
      var d = new FormData(f);
      var objet = "[Site] " + (d.get("sujet") || "Message") + " — " + (d.get("nom") || "");
      var corps = "Nom : " + (d.get("nom") || "") +
        "\nCourriel : " + (d.get("email") || "") +
        "\nTéléphone : " + (d.get("telephone") || "") +
        "\nSujet : " + (d.get("sujet") || "") +
        "\n\n" + (d.get("message") || "");
      window.location.href = "mailto:" + (m.email || "") +
        "?subject=" + encodeURIComponent(objet) + "&body=" + encodeURIComponent(corps);
      var info = $("#retour-formulaire");
      if (info) {
        info.hidden = false;
        info.focus();
      }
    });
  }

  /* --- Navigation : marquage de la page courante -------------------------- */
  function initNavActive() {
    var page = location.pathname.split("/").pop() || "index.html";
    $$(".nav__lien").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === page) a.setAttribute("aria-current", "page");
    });
  }

  /* --- Icônes déclaratives ------------------------------------------------ */
  function initIcones() {
    $$("[data-icone]").forEach(function (el) {
      if (!el.innerHTML.trim()) el.innerHTML = icone(el.getAttribute("data-icone"));
      else el.insertAdjacentHTML("afterbegin", icone(el.getAttribute("data-icone")));
    });
  }

  /* --- Tableaux larges : défilement accessible au clavier ------------------ */
  function initTableaux() {
    $$(".enveloppe-tableau").forEach(function (env) {
      if (env.scrollWidth > env.clientWidth + 1) {
        env.setAttribute("tabindex", "0");
        env.setAttribute("role", "region");
        if (!env.hasAttribute("aria-label")) {
          var lg = env.querySelector("caption, table");
          env.setAttribute("aria-label", (lg && lg.tagName === "CAPTION" ? lg.textContent.trim() : "Tableau") + " (défilement horizontal)");
        }
      } else {
        env.removeAttribute("tabindex");
        env.removeAttribute("role");
      }
    });
  }

  /* --- Apparition au défilement -------------------------------------------
     Les cartes (actualités, démarches, agenda…) apparaissent en douceur
     quand elles entrent dans l'écran. Jamais de perte d'information : sans
     JavaScript ou avec « moins de mouvement » demandé par la personne, tout
     reste simplement visible (voir la garde html.anime-actif en CSS). */
  var observateurRevelation = null;

  function observerRevelations(racine) {
    if (!observateurRevelation) return;
    var elements = $$(".anime-entree:not([data-observe])", racine || document);
    if (!elements.length) return;

    // Range chaque carte parmi ses sœurs directes pour un effet « cascade »
    // limité à son propre groupe (grille, liste…), pas à toute la page.
    var rangParParent = new Map();
    elements.forEach(function (el) {
      el.setAttribute("data-observe", "1");
      var parent = el.parentElement;
      var rang = rangParParent.get(parent) || 0;
      el.style.setProperty("--rang", rang);
      rangParParent.set(parent, rang + 1);
      observateurRevelation.observe(el);
    });
  }

  function initRevelations() {
    var reduit = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduit || typeof IntersectionObserver !== "function") return; // reste simplement visible

    document.documentElement.classList.add("anime-actif");
    observateurRevelation = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
          entree.target.classList.add("visible");
          observateurRevelation.unobserve(entree.target);
        }
      });
    }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });

    observerRevelations(document);
  }

  /* --- Accordéons animés (démarches, « Lire la suite ») -------------------
     On pilote soi-même l'ouverture/fermeture avec la Web Animations API :
     plus régulier d'un navigateur à l'autre que de compter sur la bascule
     native de <details>, qui ne s'anime pas partout. Sans JavaScript ou si
     window.Animate est absent, <details> garde son comportement natif
     (ouverture/fermeture instantanée) : rien ne reste inaccessible. */
  function activerAccordeon(details) {
    if (details.dataset.accordeonPret) return;
    details.dataset.accordeonPret = "1";
    var sommaire = details.querySelector(":scope > summary");
    var enveloppe = details.querySelector(":scope > .pliable");
    if (!sommaire || !enveloppe || typeof enveloppe.animate !== "function") return;

    var animation = null;
    var reduit = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var duree = reduit ? 1 : 320;

    function lancer(de, vers, surFin) {
      if (animation) animation.cancel();
      enveloppe.style.overflow = "hidden";
      animation = enveloppe.animate(
        { height: [de + "px", vers + "px"], opacity: [vers > de ? .3 : 1, vers > de ? 1 : .3] },
        { duration: duree, easing: "cubic-bezier(.4, 0, .2, 1)" }
      );
      animation.onfinish = function () {
        enveloppe.style.height = "";
        enveloppe.style.overflow = "";
        enveloppe.style.opacity = "";
        animation = null;
        if (surFin) surFin();
      };
    }

    sommaire.addEventListener("click", function (e) {
      e.preventDefault();
      if (details.open) {
        var depart = enveloppe.getBoundingClientRect().height;
        lancer(depart, 0, function () { details.removeAttribute("open"); });
      } else {
        details.setAttribute("open", "");
        enveloppe.style.height = "0px"; // évite un flash à pleine hauteur avant l'animation
        requestAnimationFrame(function () {
          var cible = enveloppe.scrollHeight;
          lancer(0, cible);
        });
      }
    });
  }

  function initAccordeons(racine) {
    $$("details.demarche, details.actu__details", racine || document).forEach(activerAccordeon);
  }

  /* --- Année courante ----------------------------------------------------- */
  function initAnnee() {
    $$("[data-annee]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* --- Démarrage ---------------------------------------------------------- */
  function demarrer() {
    initTheme();
    initIcones();
    initMenu();
    initNavActive();
    initCoordonnees();
    initStatut();
    initHoraires();
    initActualites();
    initActualitesDepartement();
    initAgenda();
    initDemarches();
    initAnnuaire();
    initElus();
    initRecherche();
    initFormulaire();
    initAnnee();
    initTableaux();
    initAccordeons();
    initRevelations();
    window.addEventListener("resize", initTableaux);
    setInterval(initStatut, 60000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", demarrer);
  } else {
    demarrer();
  }
})();
