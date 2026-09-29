/* ==========================================================================
   Lemon Studio — main.js
   Ajustes gerais que não têm arquivo próprio ainda.
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var yearEl = document.getElementById("footerYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
