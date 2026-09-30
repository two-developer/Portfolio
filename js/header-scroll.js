/* ==========================================================================
   Lemon Studio — header-scroll.js
   Esconde tudo que tem [data-scroll-hide] (header e barra do meio) ao rolar
   pra baixo e mostra ao rolar pra cima. 1 leitura de scroll por frame (rAF).
   ========================================================================== */
(function () {
  "use strict";

  function init() {
    var els = document.querySelectorAll("[data-scroll-hide]");
    if (!els.length) return;

    var lastY = window.scrollY;
    var ticking = false;
    var threshold = 8; // ignora tremidas pequenas de scroll

    function setHidden(hidden) {
      els.forEach(function (el) { el.classList.toggle("is-hidden", hidden); });
    }

    function update() {
      var currentY = window.scrollY;
      var diff = currentY - lastY;

      if (currentY <= 40) {
        setHidden(false);
        lastY = currentY;
      } else if (diff > threshold) {
        setHidden(true);
        lastY = currentY;
      } else if (diff < -threshold) {
        setHidden(false);
        lastY = currentY;
      }
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
