/* ==========================================================================
   Lemon Studio — reveal.js
   Anima a entrada de qualquer elemento com [data-in] quando ele aparece
   na tela (rolando ou já visível no carregamento). Dispara uma vez só.
   ========================================================================== */
(function () {
  "use strict";

  function init() {
    var els = document.querySelectorAll("[data-in]");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(function (el, i) {
      // pequeno escalonamento entre elementos vizinhos, sem custo extra
      el.style.transitionDelay = (i % 5) * 60 + "ms";
      io.observe(el);
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
