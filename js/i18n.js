/* ==========================================================================
   Lemon Studio — i18n.js
   Dicionário simples de traduções. Só as chaves que a página usa hoje
   (logo, header, footer) — cresce junto com o site, sem sobra.
   Traduções pensadas por sentido, não literais palavra por palavra.
   ========================================================================== */
(function () {
  "use strict";

  var DICT = {
    en: {
      "nav.language": "Language",
      "theme.title": "Theme",
      "theme.light": "Light",
      "theme.dark": "Dark",
      "mid.soon": "Coming soon",
      "search.placeholder": "Search...",
      "auth.login": "Log in",
      "auth.signup": "Sign up",
      "footer.followUs": "Follow us",
      "footer.rights": "Lemon Studio. All rights reserved.",
      "footer.madeWith": "Built with a lot of citrus."
    },
    pt: {
      "nav.language": "Idioma",
      "theme.title": "Tema",
      "theme.light": "Claro",
      "theme.dark": "Escuro",
      "mid.soon": "Em breve",
      "search.placeholder": "Pesquisar...",
      "auth.login": "Entrar",
      "auth.signup": "Cadastrar",
      "footer.followUs": "Siga a gente",
      "footer.rights": "Lemon Studio. Todos os direitos reservados.",
      "footer.madeWith": "Feito com bastante limão."
    },
    ru: {
      "nav.language": "Язык",
      "theme.title": "Тема",
      "theme.light": "Светлая",
      "theme.dark": "Тёмная",
      "mid.soon": "Скоро",
      "search.placeholder": "Поиск...",
      "auth.login": "Войти",
      "auth.signup": "Регистрация",
      "footer.followUs": "Подписывайтесь",
      "footer.rights": "Lemon Studio. Все права защищены.",
      "footer.madeWith": "Сделано с изрядной долей лимона."
    }
  };

  var LANGS = [
    { code: "en", label: "English" },
    { code: "pt", label: "Português" },
    { code: "ru", label: "Русский" }
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

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder"), lang));
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
