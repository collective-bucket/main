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

  var LANG_KEY = "cb-lang";
  var LANG_CHOICES = [
    { code: "tr", label: "Türkçe" },
    { code: "en", label: "English" }
  ];
  var STRINGS = {
    en: {
      openMemberMenu: "Open member menu",
      openProfileMenu: "Open profile menu",
      signIn: "Sign in",
      profile: "Profile",
      language: "Language",
      contributing: "Contributing Guide",
      license: "MIT License"
    },
    tr: {
      openMemberMenu: "Üye menüsünü aç",
      openProfileMenu: "Profil menüsünü aç",
      signIn: "Üye Girişi",
      profile: "Profil",
      language: "Dil",
      contributing: "Katkı Rehberi",
      license: "MIT Lisansı"
    }
  };
  // Pages set <html lang>; main sets it from the stored choice via i18n.js.
  var lang = /^tr\b/i.test(document.documentElement.lang || "") ? "tr" : "en";

  function t(key) {
    return STRINGS[lang][key] || STRINGS.en[key] || key;
  }

  function flag(code) {
    if (code === "tr") {
      return (
        '<svg class="cb-shell-flag" viewBox="0 0 30 20" aria-hidden="true">' +
        '<rect width="30" height="20" fill="#E30A17"/>' +
        '<circle cx="11.2" cy="10" r="5" fill="#fff"/>' +
        '<circle cx="12.8" cy="10" r="4" fill="#E30A17"/>' +
        '<polygon fill="#fff" points="17.30,7.85 17.80,9.31 19.34,9.34 18.11,10.26 18.56,11.74 17.30,10.85 16.04,11.74 16.49,10.26 15.26,9.34 16.80,9.31"/>' +
        "</svg>"
      );
    }
    return (
      '<svg class="cb-shell-flag" viewBox="0 0 30 20" aria-hidden="true">' +
      '<rect width="30" height="20" fill="#fff"/>' +
      '<path fill="#CF142B" d="M13 0h4v20h-4zM0 8h30v4H0z"/>' +
      "</svg>"
    );
  }

  function langPicker() {
    return (
      '<div class="cb-shell-lang">' +
      '<button class="cb-shell-lang-toggle" type="button" aria-expanded="false" aria-haspopup="menu" aria-label="' +
      escapeHtml(t("language")) +
      '">' +
      flag(lang) +
      "</button>" +
      '<div class="cb-shell-lang-menu" role="menu" hidden>' +
      LANG_CHOICES.map(function (choice) {
        return (
          '<button type="button" role="menuitemradio" data-cb-lang="' +
          choice.code +
          '" aria-checked="' +
          (choice.code === lang ? "true" : "false") +
          '">' +
          flag(choice.code) +
          "<span>" +
          escapeHtml(choice.label) +
          "</span></button>"
        );
      }).join("") +
      "</div></div>"
    );
  }

  function setLang(next) {
    if (next === lang) return;
    if (window.CBI18n && window.CBI18n.setLang) {
      window.CBI18n.setLang(next);
      return;
    }
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      // Private mode: nothing to persist.
    }
    window.location.reload();
  }

  function bindLangPicker(header) {
    var toggle = header.querySelector(".cb-shell-lang-toggle");
    var menu = header.querySelector(".cb-shell-lang-menu");
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
    }

    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      setOpen(menu.hidden);
    });

    menu.addEventListener("click", function (event) {
      var choice = event.target.closest("[data-cb-lang]");
      if (!choice) return;
      setOpen(false);
      setLang(choice.getAttribute("data-cb-lang"));
    });

    document.addEventListener("click", function (event) {
      if (menu.hidden) return;
      if (toggle.contains(event.target) || menu.contains(event.target)) return;
      setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
  }

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
      '<div class="cb-shell-auth"><div class="cb-auth-controls" data-cb-auth></div></div>' +
      '<button class="cb-shell-auth-toggle" type="button" aria-expanded="false" aria-label="' +
      escapeHtml(t("openMemberMenu")) +
      '">' +
      '<svg class="cb-shell-auth-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 2.239-7 5v1h14v-1c0-2.761-3.134-5-7-5z"/>' +
      '</svg>' +
      '<span class="cb-shell-auth-toggle-label">' +
      escapeHtml(t("signIn")) +
      "</span>" +
      "</button>" +
      (placeholder.hasAttribute("data-cb-shell-lang") ? langPicker() : "") +
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
    var authWrap = header.querySelector(".cb-shell-auth");
    if (!toggle) return;

    function isOpen() {
      return header.classList.contains("cb-auth-open");
    }

    function setOpen(next) {
      header.classList.toggle("cb-auth-open", next);
      toggle.setAttribute("aria-expanded", String(!!next));
    }

    // The auth client fills in the e-mail or the sign-in/out state.
    // The toggle shows only a profile icon, never the user name.
    function syncToggleLabel() {
      if (!authWrap) return;
      var emailEl = authWrap.querySelector(".cb-auth-email");
      var labelSpan = toggle.querySelector(".cb-shell-auth-toggle-label");
      if (emailEl && emailEl.textContent.trim()) {
        toggle.setAttribute("aria-label", t("openProfileMenu"));
        if (labelSpan) labelSpan.textContent = t("profile");
      } else {
        toggle.setAttribute("aria-label", t("openMemberMenu"));
        if (labelSpan) labelSpan.textContent = t("signIn");
      }
    }

    if (authWrap && window.MutationObserver) {
      new MutationObserver(syncToggleLabel).observe(authWrap, {
        childList: true,
        subtree: true,
        characterData: true,
      });
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
      '/CONTRIBUTING.md">' +
      escapeHtml(t("contributing")) +
      "</a>" +
      '<a href="' +
      HOME +
      '/LICENSE.html">' +
      escapeHtml(t("license")) +
      "</a>" +
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
      bindLangPicker(header);
    });

  loadApps().then(function (apps) {
    document.querySelectorAll('[data-cb-shell="footer"]').forEach(function (el) {
      renderFooter(el, apps);
    });
  });
})();
