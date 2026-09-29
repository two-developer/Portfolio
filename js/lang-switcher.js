/* ==========================================================================
   Lemon Studio — lang-switcher.js
   Monta o dropdown a partir de LemonI18n.langs e controla abrir/fechar.
   Sem requisições de rede, sem libs externas.
   ========================================================================== */
(function () {
  "use strict";

  function buildMenu(menu) {
    var langs = window.LemonI18n.langs;
    menu.innerHTML = "";
    langs.forEach(function (l) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-lang-option", l.code);
      btn.setAttribute("role", "menuitem");
      btn.innerHTML = '<span class="flag">' + l.flag + '</span> ' + l.label;
      menu.appendChild(btn);
    });
  }

  function init() {
    var wrap = document.getElementById("langSwitcher");
    var toggle = document.getElementById("langSwitcherToggle");
    var menu = document.getElementById("langMenu");
    var label = document.getElementById("langSwitcherLabel");
    var flag = document.getElementById("langSwitcherFlag");
    if (!wrap || !toggle || !menu) return;

    buildMenu(menu);

    function currentLangInfo() {
      var code = window.LemonI18n.current;
      var found = null;
      window.LemonI18n.langs.forEach(function (l) {
        if (l.code === code) found = l;
      });
      return found || window.LemonI18n.langs[0];
    }

    function refreshUI() {
      var info = currentLangInfo();
      if (label) label.textContent = info.label;
      if (flag) flag.textContent = info.flag;
      menu.querySelectorAll("[data-lang-option]").forEach(function (btn) {
        btn.classList.toggle("active", btn.getAttribute("data-lang-option") === info.code);
      });
    }

    function open() {
      wrap.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
    }
    function close() {
      wrap.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      if (wrap.classList.contains("open")) close();
      else open();
    });

    menu.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-lang-option]");
      if (!btn) return;
      window.LemonI18n.setLang(btn.getAttribute("data-lang-option"));
      close();
    });

    document.addEventListener("click", function (e) {
      if (!wrap.contains(e.target)) close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    document.addEventListener("lemon:langchange", refreshUI);
    refreshUI();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
