/* ==========================================================================
   Lemon Studio — hamburger.js
   Abre/fecha o painel de tela cheia do menu. Trava o scroll do body
   enquanto está aberto para não rolar o conteúdo por trás.
   ========================================================================== */
(function () {
  "use strict";

  function init() {
    var btn = document.getElementById("hamburgerBtn");
    var panel = document.getElementById("hamburgerPanel");
    var closeBtn = document.getElementById("hamburgerClose");
    if (!btn || !panel) return;

    function open() {
      panel.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
    }
    function close() {
      panel.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }

    btn.addEventListener("click", function () {
      if (panel.classList.contains("open")) close();
      else open();
    });

    if (closeBtn) closeBtn.addEventListener("click", close);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
