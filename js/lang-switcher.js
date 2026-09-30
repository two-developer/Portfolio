/* ==========================================================================
   Lemon Studio — lang-switcher.js
   Monta os botões de idioma (bandeira + nome) dentro do menu hambúrguer.
   Bandeiras em SVG inline (não dependem de emoji, que não aparece em
   todos os Windows/navegadores).
   ========================================================================== */
(function () {
  "use strict";

  var FLAGS = {
    en: '<svg viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#012169"/><path d="M0 0l60 40M60 0L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" stroke-width="3"/><path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="13"/><path d="M30 0v40M0 20h60" stroke="#C8102E" stroke-width="8"/></svg>',
    pt: '<svg viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#009c3b"/><path d="M30 5l24 15-24 15L6 20z" fill="#ffdf00"/><circle cx="30" cy="20" r="8" fill="#002776"/></svg>',
    ru: '<svg viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#fff"/><rect y="13.33" width="60" height="13.34" fill="#0039a6"/><rect y="26.67" width="60" height="13.33" fill="#d52b1e"/></svg>'
  };

  function init() {
    var box = document.getElementById("langOptions");
    if (!box || !window.LemonI18n) return;

    window.LemonI18n.langs.forEach(function (l) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "settings-option";
      btn.setAttribute("data-lang-option", l.code);
      btn.innerHTML =
        '<span class="flag">' + (FLAGS[l.code] || "") + '</span>' +
        '<span>' + l.label + '</span>';
      box.appendChild(btn);
    });

    box.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-lang-option]");
      if (btn) window.LemonI18n.setLang(btn.getAttribute("data-lang-option"));
    });

    function refresh() {
      var code = window.LemonI18n.current;
      box.querySelectorAll("[data-lang-option]").forEach(function (b) {
        var on = b.getAttribute("data-lang-option") === code;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }

    document.addEventListener("lemon:langchange", refresh);
    refresh();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
