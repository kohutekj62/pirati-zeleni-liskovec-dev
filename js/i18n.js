/* ==========================================================================
   i18n.js  —  the Czech / English language switching
   ==========================================================================
   "i18n" is the standard nickname for "internationalisation" (i-18 letters-n).

   What this file does, in plain words:
     • Remembers which language the visitor picked (Czech by default).
     • Looks up any text by its key from content.js  →  ui:
     • When the language changes, it (1) re-fills every element that has a
       data-i18n="…" attribute, and (2) tells the rest of the page to redraw
       (the lists are rebuilt by render.js, which listens for our signal).

   You normally never need to touch this file.
   ========================================================================== */

const I18N = {
  lang: "cs",                    // current language ("cs" or "en")
  STORAGE_KEY: "slon-lang",      // where we remember the choice in the browser

  /* Look up a UI string by its key (e.g. t("nav_program")). Falls back to
     Czech, then to the key itself, so the page never shows "undefined". */
  t(key) {
    const dict = (CONTENT.ui[this.lang]) || CONTENT.ui.cs;
    if (key in dict) return dict[key];
    if (key in CONTENT.ui.cs) return CONTENT.ui.cs[key];
    return key;
  },

  /* Fill in every translatable element on the page:
       data-i18n="key"             → sets the visible text
       data-i18n-aria="key"        → sets the aria-label (for screen readers)
       data-i18n-placeholder="key" → sets an input's placeholder text          */
  apply(root) {
    root = root || document;
    root.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = I18N.t(el.getAttribute("data-i18n"));
    });
    root.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", I18N.t(el.getAttribute("data-i18n-aria")));
    });
    root.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", I18N.t(el.getAttribute("data-i18n-placeholder")));
    });
    document.documentElement.lang = this.lang;   // <html lang="cs"> / "en"
  },

  /* Switch language, remember it, refresh the page text, and broadcast the
     change so render.js can rebuild the lists. */
  setLang(lang) {
    this.lang = (lang === "en") ? "en" : "cs";
    try { localStorage.setItem(this.STORAGE_KEY, this.lang); } catch (e) { /* private mode: ignore */ }
    this.apply();
    document.dispatchEvent(new CustomEvent("slon:langchange", { detail: { lang: this.lang } }));
  },

  /* On first load, read the remembered language (default Czech). */
  initLang() {
    var stored = null;
    try { stored = localStorage.getItem(this.STORAGE_KEY); } catch (e) { /* ignore */ }
    this.lang = (stored === "en") ? "en" : "cs";
    return this.lang;
  },
};

/* Make it available to the other scripts and to the tests. */
if (typeof window !== "undefined") { window.I18N = I18N; }
if (typeof module !== "undefined") { module.exports = I18N; }
