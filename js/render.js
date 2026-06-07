/* ==========================================================================
   render.js  —  builds the page lists from the content
   ==========================================================================
   It reads the data in content.js and creates the HTML for:
     • O nás (paragraphs)        • Lidé (the candidate flip-cards)
     • Program (the 6 cards)     • Setkejme se (event timeline)
     • Aktuality (news cards)    • Spojme se (contact details)
     • Přátelé (partner cards)   • placeholders & footer links

   It runs once when the page loads (started by main.js) and again every time
   the language is switched (it listens for the "slon:langchange" signal).

   You normally never need to touch this file — change the TEXT in content.js
   and the STYLING in css/styles.css instead.
   ========================================================================== */

const RENDER = (function () {

  /* ---- tiny helpers so we never write raw innerHTML (safer & keeps accents) -- */
  function el(tag, opts) {
    opts = opts || {};
    var node = document.createElement(tag);
    if (opts.class) node.className = opts.class;
    if (opts.text != null) node.textContent = opts.text;
    if (opts.attrs) for (var k in opts.attrs) node.setAttribute(k, opts.attrs[k]);
    if (opts.children) opts.children.forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }
  function clear(node) { if (node) while (node.firstChild) node.removeChild(node.firstChild); }
  function L() { return I18N.lang; }                 // current language shortcut
  function t(key) { return I18N.t(key); }            // UI string shortcut

  /* Pretty date, e.g. "8. srpna 2026" (cs) or "8 August 2026" (en) */
  function formatDate(iso) {
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    var locale = (L() === "en") ? "en-GB" : "cs-CZ";
    return d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
  }

  /* Which social links are actually filled in (skip the empty ones) */
  function socialLinks() {
    var c = CONTENT.config;
    return [
      { key: "facebook",  label: "Facebook",  short: "f",  url: c.facebook },
      { key: "instagram", label: "Instagram", short: "IG", url: c.instagram },
      { key: "twitter",   label: "X",         short: "X",  url: c.twitter },
      { key: "youtube",   label: "YouTube",   short: "YT", url: c.youtube },
    ].filter(function (s) { return s.url && s.url.trim() !== ""; });
  }

  /* ====================================================================== */
  /* 1) O NÁS                                                               */
  /* ====================================================================== */
  function renderAbout() {
    var box = document.getElementById("about-text");
    clear(box);
    (CONTENT.about[L()] || []).forEach(function (line) {
      box.appendChild(el("p", { text: line }));
    });
  }

  /* ====================================================================== */
  /* 2) PROGRAM  (native <details> = expandable without any JavaScript)      */
  /* ====================================================================== */
  function renderProgram() {
    var list = document.getElementById("program-list");
    clear(list);
    CONTENT.program.forEach(function (item, i) {
      var data = item[L()] || item.cs;
      var summary = el("summary", { class: "program-card__summary", children: [
        el("span", { class: "program-card__num", text: String(i + 1) }),
        el("span", { class: "program-card__icon", text: item.icon || "", attrs: { "aria-hidden": "true" } }),
        el("h3",   { class: "program-card__title", text: data.title }),
        el("span", { class: "program-card__chevron", text: "▾", attrs: { "aria-hidden": "true" } }),
      ]});
      var body = el("div", { class: "program-card__body", children: [ el("p", { text: data.text }) ] });
      list.appendChild(el("details", { class: "program-card", children: [summary, body] }));
    });
  }

  /* ====================================================================== */
  /* 3) LIDÉ  —  the flip-cards (elephant on the front, photo on the back)   */
  /* ====================================================================== */
  function renderPeople() {
    var grid = document.getElementById("people-grid");
    clear(grid);
    CONTENT.people.forEach(function (p) {
      var data = p[L()] || p.cs;
      var isZeleni = (p.party || "").toLowerCase().indexOf("zelen") === 0;

      // FRONT face: our neon elephant + a little hint
      var front = el("span", { class: "flip-card__face flip-card__face--front", children: [
        el("img", { attrs: { src: "assets/who-is-who.png", alt: "", "aria-hidden": "true" } }),
        el("span", { class: "flip-card__hint", text: t("card_hint") }),
      ]});
      // BACK face: the real photo
      var back = el("span", { class: "flip-card__face flip-card__face--back", children: [
        el("img", { attrs: { src: "assets/people/" + p.photo, alt: p.name, loading: "lazy", width: "300", height: "400" } }),
      ]});

      // The whole image area is a real button so it works with the keyboard too.
      var btn = el("button", { class: "flip-card", attrs: {
        type: "button", "aria-pressed": "false",
        "aria-label": t("card_flip_to_photo") + ": " + p.name,
      }, children: [ el("span", { class: "flip-card__inner", children: [front, back] }) ] });

      var info = el("div", { class: "person__info", children: [
        el("span", { class: "party-tag " + (isZeleni ? "party-tag--zeleni" : "party-tag--pirati"), text: p.party }),
        el("h3",   { class: "person__name", text: p.name }),
        el("p",    { class: "person__bio", text: data.bio }),
      ]});

      grid.appendChild(el("article", { class: "person", children: [btn, info] }));
    });
  }

  /* ====================================================================== */
  /* 4) SETKEJME SE  —  event timeline (past events fade automatically)      */
  /* ====================================================================== */
  function renderEvents() {
    var list = document.getElementById("events-list");
    clear(list);
    var today = new Date(); today.setHours(0, 0, 0, 0);

    CONTENT.events.forEach(function (ev) {
      var data = ev[L()] || ev.cs;
      var isPast = new Date(ev.date + "T00:00:00") < today;

      var dateLine = el("span", { class: "event__date", text: formatDate(ev.date) + (ev.time ? " · " + ev.time : "") });
      if (isPast) dateLine.appendChild(el("span", { class: "event__badge", text: t("event_past") }));

      var body = el("div", { children: [
        dateLine,
        el("h3", { class: "event__title", text: data.title }),
        el("div", { class: "event__place", text: data.place }),
        el("p",  { class: "event__desc", text: data.desc }),
      ]});

      list.appendChild(el("li", {
        class: "event" + (isPast ? " event--past" : ""),
        children: [ el("span", { class: "event__dot", attrs: { "aria-hidden": "true" } }), body ],
      }));
    });
  }

  /* ====================================================================== */
  /* 5) AKTUALITY  (news cards)                                              */
  /* ====================================================================== */
  function renderNews() {
    var grid = document.getElementById("news-grid");
    clear(grid);
    CONTENT.news.forEach(function (n) {
      var data = n[L()] || n.cs;
      var media = n.image
        ? el("img", { class: "news-card__media", attrs: { src: "assets/" + n.image, alt: data.title, loading: "lazy" } })
        : el("div", { class: "news-card__media media-placeholder", attrs: { "data-placeholder": "" } });

      var body = el("div", { class: "news-card__body", children: [
        el("span", { class: "news-card__date", text: formatDate(n.date) }),
        el("h3",   { class: "news-card__title", text: data.title }),
        el("p",    { class: "news-card__excerpt", text: data.excerpt }),
      ]});
      grid.appendChild(el("article", { class: "news-card", children: [media, body] }));
    });
  }

  /* ====================================================================== */
  /* 6) SPOJME SE  —  contact intro + e-mail / phone / social links          */
  /* ====================================================================== */
  function renderContact() {
    var c = CONTENT.config;

    // Intro paragraph next to the form
    var intro = document.getElementById("contact-intro");
    if (intro) intro.textContent = (CONTENT.contact[L()] || CONTENT.contact.cs).intro;

    // Details list
    var details = document.getElementById("contact-details");
    clear(details);

    if (c.email) {
      details.appendChild(el("li", { children: [
        el("span", { class: "label", text: t("form_email_label") }),
        el("a", { text: c.email, attrs: { href: "mailto:" + c.email } }),
      ]}));
    }
    if (c.phone) {
      details.appendChild(el("li", { children: [
        el("span", { class: "label", text: t("form_phone_label") }),
        el("a", { text: c.phone, attrs: { href: "tel:" + c.phone.replace(/\s+/g, "") } }),
      ]}));
    }
    var socials = socialLinks();
    if (socials.length) {
      var socialBox = el("div", { class: "contact__social" });
      socials.forEach(function (s) {
        socialBox.appendChild(el("a", { text: s.short, attrs: {
          href: s.url, target: "_blank", rel: "noopener", "aria-label": s.label, title: s.label,
        }}));
      });
      details.appendChild(el("li", { children: [
        el("span", { class: "label", text: t("form_social_label") }), socialBox,
      ]}));
    }
  }

  /* Footer social icons (same links as the contact section) */
  function renderFooterSocial() {
    var ul = document.getElementById("footer-social");
    clear(ul);
    socialLinks().forEach(function (s) {
      ul.appendChild(el("li", { children: [
        el("a", { text: s.short, attrs: { href: s.url, target: "_blank", rel: "noopener", "aria-label": s.label, title: s.label } }),
      ]}));
    });
  }

  /* ====================================================================== */
  /* 7) PŘÁTELÉ  (parent-party cards)                                        */
  /* ====================================================================== */
  function renderPartners() {
    var p = CONTENT.partners[L()] || CONTENT.partners.cs;
    var c = CONTENT.config;
    document.getElementById("partners-intro").textContent = p.intro;
    document.getElementById("partners-outro").textContent = p.outro;

    var list = document.getElementById("partners-list");
    clear(list);

    function card(modifier, name, links) {
      var linkBox = el("div", { class: "partner-card__links" });
      links.forEach(function (lk) {
        if (lk.url) linkBox.appendChild(el("a", { text: lk.label, attrs: { href: lk.url, target: "_blank", rel: "noopener" } }));
      });
      return el("div", { class: "partner-card partner-card--" + modifier, children: [
        el("h3", { class: "partner-card__name", text: name }), linkBox,
      ]});
    }

    list.appendChild(card("pirati", "Česká pirátská strana", [
      { label: p.pirati_region,   url: c.piratiRegion },
      { label: p.pirati_national, url: c.piratiNational },
    ]));
    list.appendChild(card("zeleni", "Zelení", [
      { label: p.zeleni_region,   url: c.zeleniRegion },
      { label: p.zeleni_national, url: c.zeleniNational },
    ]));
  }

  /* ====================================================================== */
  /* Photo placeholders ("add a photo here later" boxes)                    */
  /* ====================================================================== */
  function renderPlaceholders() {
    document.querySelectorAll("[data-placeholder]").forEach(function (box) {
      clear(box);
      box.appendChild(el("span", { class: "ph-text", text: t("img_placeholder") }));
    });
  }

  /* ---- run everything ---- */
  function renderAll() {
    renderAbout();
    renderProgram();
    renderPeople();
    renderEvents();
    renderNews();
    renderContact();
    renderFooterSocial();
    renderPartners();
    renderPlaceholders();
  }

  /* Rebuild the lists whenever the language changes */
  document.addEventListener("slon:langchange", renderAll);

  /* expose for main.js (initial render) and for the tests */
  return { renderAll: renderAll };
})();

if (typeof window !== "undefined") { window.RENDER = RENDER; }
