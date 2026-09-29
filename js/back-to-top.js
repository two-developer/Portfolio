/* ==========================================================================
   Lemon Studio — back-to-top.js
   Mostra o botão após rolar um pouco (1 leitura de scroll por frame, via rAF).
   No clique: aplica um blur PONTUAL de ~180ms na página (não em loop) e deixa
   o navegador cuidar da rolagem suave nativamente — custo real: zero por frame.
   ========================================================================== */
(function () {
  "use strict";

  function init() {
    var btn = document.getElementById("backToTop");
    var shell = document.getElementById("pageShell");
    if (!btn) return;

    var reduceMotion = false;
    try {
      reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) { /* matchMedia indisponível — segue sem reduce motion */ }

    var ticking = false;
    function updateVisibility() {
      btn.classList.toggle("visible", window.scrollY > 320);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    }, { passive: true });
    updateVisibility();

    btn.addEventListener("click", function () {
      if (shell && !reduceMotion) {
        shell.classList.add("is-jumping");
        window.setTimeout(function () {
          shell.classList.remove("is-jumping");
        }, 220);
      }
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
