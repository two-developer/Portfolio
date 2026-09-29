/* ==========================================================================
   Lemon Studio — i18n.js
   Dicionário simples de traduções. Só as chaves que a página usa hoje
   (logo/tagline + footer) — cresce junto com o site, sem sobra.
   ========================================================================== */
(function () {
  "use strict";

  var DICT = {
    en: {
      "footer.tagline": "Terraria Mobile modding, done together.",
      "footer.linksTitle": "Site",
      "footer.projectsTitle": "Projects",
      "footer.communityTitle": "Community",
      "footer.home": "Home",
      "footer.server": "Server",
      "footer.community": "Community",
      "footer.exmod": "ExMod",
      "footer.lemonengine": "LemonEngine",
      "footer.discord": "Discord server",
      "footer.github": "GitHub",
      "footer.rights": "Lemon Studio. All rights reserved.",
      "footer.madeWith": "Built with a lot of citrus."
    },
    pt: {
      "footer.tagline": "Modding de Terraria Mobile, feito em conjunto.",
      "footer.linksTitle": "Site",
      "footer.projectsTitle": "Projetos",
      "footer.communityTitle": "Comunidade",
      "footer.home": "Início",
      "footer.server": "Servidor",
      "footer.community": "Comunidade",
      "footer.exmod": "ExMod",
      "footer.lemonengine": "LemonEngine",
      "footer.discord": "Servidor Discord",
      "footer.github": "GitHub",
      "footer.rights": "Lemon Studio. Todos os direitos reservados.",
      "footer.madeWith": "Feito com bastante limão."
    },
    ru: {
      "footer.tagline": "Моддинг Terraria Mobile — вместе.",
      "footer.linksTitle": "Сайт",
      "footer.projectsTitle": "Проекты",
      "footer.communityTitle": "Сообщество",
      "footer.home": "Главная",
      "footer.server": "Сервер",
      "footer.community": "Сообщество",
      "footer.exmod": "ExMod",
      "footer.lemonengine": "LemonEngine",
      "footer.discord": "Discord-сервер",
      "footer.github": "GitHub",
      "footer.rights": "Lemon Studio. Все права защищены.",
      "footer.madeWith": "Сделано с изрядной долей лимона."
    }
  };

  var LANGS = [
    { code: "en", flag: "🇬🇧", label: "English" },
    { code: "pt", flag: "🇧🇷", label: "Português" },
    { code: "ru", flag: "🇷🇺", label: "Русский" }
  ];

  var STORAGE_KEY = "lemonstudio.lang";

  function detectDefaultLang() {
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && DICT[saved]) return saved;
    } catch (e) { /* localStorage indisponível — ignora */ }

    var nav = (navigator.language || "en").toLowerCase();
    if (nav.indexOf("pt") === 0) return "pt";
    if (nav.indexOf("ru") === 0) return "ru";
    return "en";
  }

  function t(key, lang) {
    var dict = DICT[lang] || DICT.en;
    return dict[key] || DICT.en[key] || key;
  }

  function applyLang(lang) {
    if (!DICT[lang]) lang = "en";
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"), lang);
    });

    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignora */ }

    window.LemonI18n.current = lang;
    document.dispatchEvent(new CustomEvent("lemon:langchange", { detail: { lang: lang } }));
  }

  window.LemonI18n = {
    dict: DICT,
    langs: LANGS,
    current: detectDefaultLang(),
    t: function (key) { return t(key, window.LemonI18n.current); },
    setLang: applyLang
  };

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(window.LemonI18n.current);
  });
})();
