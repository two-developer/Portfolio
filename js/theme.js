/* ==========================================================================
   Lemon Studio — theme.js
   Tema claro/escuro. Carregado no <head> (sem defer) para aplicar o tema
   salvo ANTES de pintar a página — evita o "piscar" escuro->claro.
   ========================================================================== */
(function () {
  "use strict";

  var KEY = "lemonstudio.theme";
  var root = document.documentElement;
  var theme = "dark";

  try {
    var saved = window.localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") theme = saved;
  } catch (e) { /* localStorage indisponível — segue no padrão */ }

  root.setAttribute("data-theme", theme);

  function paint(t) {
    theme = t;
    root.setAttribute("data-theme", t);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "light" ? "#eceef0" : "#1c1c1c");
    document.querySelectorAll("[data-theme-option]").forEach(function (btn) {
      var on = btn.getAttribute("data-theme-option") === t;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  window.LemonTheme = {
    current: function () { return theme; },
    set: function (t) {
      if (t !== "light" && t !== "dark") return;
      paint(t);
      try { window.localStorage.setItem(KEY, t); } catch (e) { /* ignora */ }
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    paint(theme);
    document.querySelectorAll("[data-theme-option]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.LemonTheme.set(btn.getAttribute("data-theme-option"));
      });
    });
  });
})();
