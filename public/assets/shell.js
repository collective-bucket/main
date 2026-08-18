(function () {
  "use strict";

  var script = document.currentScript;
  var assetBase = script && script.src
    ? script.src.replace(/[^/]+$/, "")
    : "https://collectivebucket.com/assets/";
  var HOME = "https://collectivebucket.com";
  var LOGO = assetBase + "logo.svg";
  var FALLBACK_APPS = [
    { name: "Menu", url: "https://menu.collectivebucket.com" },
    { name: "Pano", url: "https://pano.collectivebucket.com" },
    { name: "Payback", url: "https://payback.collectivebucket.com" },
    { name: "Budget", url: "https://budget.collectivebucket.com" }
  ];

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function moveChildren(from, to) {
    if (!from || !to) return;
    while (from.firstChild) to.appendChild(from.firstChild);
  }

  function renderHeader(placeholder) {
    var extraNav = placeholder.querySelector("[data-cb-shell-nav]");
    var extraCta = placeholder.querySelector("[data-cb-shell-cta]");
    var appName =
      placeholder.getAttribute("data-cb-shell-app") || "Collective Bucket";
    var homeHref = placeholder.getAttribute("data-cb-shell-home") || HOME;
    var header = document.createElement("header");
    header.className = "cb-shell-header";
    header.innerHTML =
      '<div class="wrap">' +
      '<a class="cb-shell-brand" href="' +
      escapeHtml(homeHref) +
      '">' +
      '<img src="' +
      escapeHtml(LOGO) +
      '" alt="" />' +
      "<span>" +
      escapeHtml(appName) +
      "</span></a>" +
      '<nav class="cb-shell-nav" data-cb-shell-nav-slot></nav>' +
      '<div class="cb-shell-cta">' +
      '<div data-cb-shell-cta-slot></div>' +
      '<div class="cb-auth-controls cb-shell-auth" data-cb-auth></div>' +
      '<button class="cb-shell-auth-toggle" type="button" aria-expanded="false" aria-label="Üye Girişi menüsünü aç">Üye Girişi</button>' +
      "</div></div>";

    var navSlot = header.querySelector("[data-cb-shell-nav-slot]");
    var ctaSlot = header.querySelector("[data-cb-shell-cta-slot]");
    if (extraNav) {
      extraNav.removeAttribute("hidden");
      moveChildren(extraNav, navSlot);
    }
    if (!navSlot.childElementCount) navSlot.hidden = true;
    if (extraCta) moveChildren(extraCta, ctaSlot);
    if (!ctaSlot.childElementCount) ctaSlot.remove();

    placeholder.replaceWith(header);
  }

  function bindMobileAuthToggle(header) {
    var toggle = header.querySelector(".cb-shell-auth-toggle");
    if (!toggle) return;

    function isOpen() {
      return header.classList.contains("cb-auth-open");
    }

    function setOpen(next) {
      header.classList.toggle("cb-auth-open", next);
      toggle.setAttribute("aria-expanded", String(!!next));
    }

    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      setOpen(!isOpen());
    });

    document.addEventListener("click", function (event) {
      if (!isOpen()) return;
      if (header.contains(event.target)) return;
      setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      setOpen(false);
    });
  }

  function appItems(apps) {
    return apps
      .map(function (app) {
        return (
          '<li><a href="' +
          escapeHtml(app.url) +
          '">' +
          escapeHtml(app.name) +
          "</a></li>"
        );
      })
      .join("");
  }

  function bindAppsMenu(root) {
    var toggle = root.querySelector(".cb-shell-apps-toggle");
    var menu = root.querySelector(".cb-shell-menu");
    if (!toggle || !menu) return;

    function closeMenu() {
      root.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    function openMenu() {
      root.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      if (root.classList.contains("is-open")) closeMenu();
      else openMenu();
    });

    document.addEventListener("click", function (event) {
      if (!root.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  function renderFooter(placeholder, apps) {
    var footer = document.createElement("footer");
    footer.className = "cb-shell-footer";
    footer.innerHTML =
      '<div class="wrap">' +
      '<div class="cb-shell-apps">' +
      '<button class="cb-shell-apps-toggle" type="button" aria-expanded="false" aria-haspopup="true">' +
      '<img src="' +
      escapeHtml(LOGO) +
      '" alt="" />' +
      "<span>Collective Bucket</span></button>" +
      '<ul class="cb-shell-menu">' +
      appItems(apps) +
      "</ul></div>" +
      '<div class="cb-shell-links">' +
      '<a href="https://github.com/collective-bucket" target="_blank" rel="noopener">GitHub</a>' +
      '<a href="' +
      HOME +
      '/CONTRIBUTING.md">Katkı Rehberi</a>' +
      '<a href="' +
      HOME +
      '/LICENSE.html">MIT Lisansı</a>' +
      "</div></div>";
    bindAppsMenu(footer.querySelector(".cb-shell-apps"));
    placeholder.replaceWith(footer);
  }

  async function loadApps() {
    try {
      var response = await fetch(assetBase + "apps.json", { cache: "no-store" });
      if (!response.ok) return FALLBACK_APPS;
      var data = await response.json();
      return Array.isArray(data) && data.length ? data : FALLBACK_APPS;
    } catch {
      return FALLBACK_APPS;
    }
  }

  document.querySelectorAll('[data-cb-shell="header"]').forEach(renderHeader);

  // Headers render/replaced above, bind after injection.
  document
    .querySelectorAll(".cb-shell-header")
    .forEach(function (header) {
      bindMobileAuthToggle(header);
    });

  loadApps().then(function (apps) {
    document.querySelectorAll('[data-cb-shell="footer"]').forEach(function (el) {
      renderFooter(el, apps);
    });
  });
})();
