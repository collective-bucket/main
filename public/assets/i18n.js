(function (root) {
  "use strict";

  var STORAGE_KEY = "cb-lang";
  var LANGS = ["en", "tr"];

  var dict = {
    en: {
      "meta.description": "An open-source collection of static apps for shipping small ideas and experiments fast.",
      "meta.appName": "Home",
      "nav.repos": "Repos",
      "nav.contributing": "Contributing",
      "nav.about": "About",
      "hero.lead": "An open-source collection of static apps for shipping small ideas and experiments fast. Each app lives in its own repo; sign-in, publishing and the visual language are shared.",
      "hero.org": "organization:",
      "hero.license": "license: MIT",
      "repos.title": "Repos",
      "repos.lead": "Open-source repos and live demos under Collective Bucket.",
      "repos.loading": "Loading…",
      "repos.error": "Could not load the repo list.",
      "repos.live": "live",
      "repos.newPrompt": "Trying out a new idea?",
      "repos.newLink": "+ Create a repo",
      "repos.repoLink": "repo →",
      "contrib.title": "Contributing",
      "contrib.lead": "To try a new idea or contribute to an existing repo:",
      "contrib.step1Title": "Open a repo or send a PR.",
      "contrib.step1Body": "Create a new repo in the GitHub organization or send a contribution to an existing one.",
      "contrib.step2Title": "Prepare your static files.",
      "contrib.step2Body": "Put your HTML, CSS and JS files in the public folder; a build step is optional.",
      "contrib.step3Title": "Publish.",
      "contrib.step3Body": "See the <a href=\"CONTRIBUTING.md\">Contributing Guide</a> for step-by-step setup. The site deploys automatically after merge.",
      "about.title": "About",
      "about.whatTitle": "What is it?",
      "about.what1": "Collective Bucket offers a starter template so you don't have to rebuild the infrastructure every time you try a new idea. Hosting, authentication and UI needs live in one place; each app lives in its own repo.",
      "about.what2": "For a developer, this platform is like a pocket knife: with AI help, an idea can come to life in minutes. That convenience shouldn't belong to one person only, so the platform is open to every developer and is named <em>Collective Bucket</em>.",
      "about.goalTitle": "Goal",
      "about.costKey": "cost",
      "about.costValue": "Start on the free tier; no credit card required.",
      "about.licenseKey": "license",
      "about.licenseValue": "MIT — every repo is open source.",
      "about.scopeKey": "scope",
      "about.scopeValue": "Static hosting, shared sign-in and shared UI components.",
      "about.techTitle": "Technical choices",
      "about.tech1": "One Firebase project, a separate hosting site per repo",
      "about.tech2": "Static files and automatic deploys",
      "about.tech3": "Firestore and security rules for apps that need data",
      "about.tech4": "Central session:",
      "about.designTitle": "Design choices",
      "about.design1": "Light theme, pastel mint accent",
      "about.design2": "Inter and JetBrains Mono typography",
      "about.design3": "Shared shell components",
      "license.title": "MIT License | Collective Bucket",
      "license.description": "Collective Bucket source code is licensed under the MIT License.",
      "license.heading": "MIT License",
      "license.lead": "Collective Bucket source code is licensed under the MIT License. The license covers the software only; data users save in the apps (budgets, trips, listings, etc.) is not covered by this text."
    },
    tr: {
      "meta.description": "Küçük fikirleri ve deneme projelerini hızlıca yayına almak için açık kaynak statik uygulama koleksiyonu.",
      "meta.appName": "Ana Sayfa",
      "nav.repos": "Repolar",
      "nav.contributing": "Katkı",
      "nav.about": "Hakkında",
      "hero.lead": "Küçük fikirleri ve deneme projelerini hızlıca yayına almak için hazırlanan, açık kaynak statik uygulamalardan oluşan bir koleksiyon. Her uygulama kendi reposunda geliştirilir; giriş, yayınlama ve görsel dil paylaşılır.",
      "hero.org": "organizasyon:",
      "hero.license": "lisans: MIT",
      "repos.title": "Repolar",
      "repos.lead": "Collective Bucket altındaki açık kaynak repolar ve canlı demolar.",
      "repos.loading": "Yükleniyor…",
      "repos.error": "Repo listesi yüklenemedi.",
      "repos.live": "canlı",
      "repos.newPrompt": "Yeni bir fikir mi deniyorsun?",
      "repos.newLink": "+ Repo oluştur",
      "repos.repoLink": "repo →",
      "contrib.title": "Katkı",
      "contrib.lead": "Yeni bir fikir denemek ya da mevcut bir repoya katkı sağlamak için:",
      "contrib.step1Title": "Repo aç veya PR gönder.",
      "contrib.step1Body": "GitHub organizasyonunda yeni bir repo oluşturun ya da mevcut bir repoya katkı gönderin.",
      "contrib.step2Title": "Statik dosyalarını hazırla.",
      "contrib.step2Body": "HTML, CSS ve JS dosyalarını public klasörüne koyun; build adımı zorunlu değildir.",
      "contrib.step3Title": "Yayınla.",
      "contrib.step3Body": "Adım adım kurulum için <a href=\"CONTRIBUTING.md\">Katkı Rehberi</a>'ne bakın. Merge sonrası site otomatik yayınlanır.",
      "about.title": "Hakkında",
      "about.whatTitle": "Nedir?",
      "about.what1": "Collective Bucket, yeni bir fikri denemek için altyapıyı her seferinde yeniden kurmanızı gerektirmeyen bir başlangıç şablonu sunar. Hosting, kimlik doğrulama ve arayüz ihtiyaçları tek yerde toplanır; her uygulama kendi reposunda yaşar.",
      "about.what2": "Bir yazılımcı için bu platform, yanında taşıdığı çakı gibidir: AI desteğiyle dakikalar içinde bir fikri hayata geçirebilir. Bu kolaylık yalnızca bir kişiye özgü olmamalı; bu yüzden platform tüm yazılımcılara açık tutulmuş ve adı <em>Collective Bucket</em> olarak konulmuştur.",
      "about.goalTitle": "Amaç",
      "about.costKey": "maliyet",
      "about.costValue": "Ücretsiz katmanla başla; kredi kartı gerekmez.",
      "about.licenseKey": "lisans",
      "about.licenseValue": "MIT — tüm repolar açık kaynak.",
      "about.scopeKey": "kapsam",
      "about.scopeValue": "Statik yayın, ortak giriş ve paylaşılan arayüz bileşenleri.",
      "about.techTitle": "Teknik tercihler",
      "about.tech1": "Tek Firebase projesi, her repo ayrı hosting sitesi",
      "about.tech2": "Statik dosyalar ve otomatik deploy",
      "about.tech3": "Veri gereken uygulamalarda Firestore ve güvenlik kuralları",
      "about.tech4": "Merkezi oturum:",
      "about.designTitle": "Tasarım tercihleri",
      "about.design1": "Açık tema, pastel mint vurgu",
      "about.design2": "Inter ve JetBrains Mono tipografisi",
      "about.design3": "Paylaşılan shell bileşenleri",
      "license.title": "MIT Lisansı | Collective Bucket",
      "license.description": "Collective Bucket kaynak kodu MIT lisansı altındadır.",
      "license.heading": "MIT Lisansı",
      "license.lead": "Collective Bucket kaynak kodu MIT lisansı altındadır. Lisans yalnızca yazılımı kapsar; kullanıcıların uygulamalara kaydettiği veriler (bütçe, yolculuk, ilan vb.) bu metnin konusu değildir."
    }
  };

  function detect() {
    var stored = null;
    try {
      stored = root.localStorage && root.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      stored = null;
    }
    return LANGS.indexOf(stored) >= 0 ? stored : "en";
  }

  var lang = typeof document !== "undefined" ? detect() : "en";

  function t(key) {
    return (dict[lang] && dict[lang][key]) || dict.en[key] || key;
  }

  function pick(value) {
    if (!value || typeof value === "string") return value || "";
    return value[lang] || value.en || "";
  }

  // data-i18n sets text, data-i18n-html sets trusted dictionary markup,
  // data-i18n-attr="attr:key;attr:key" sets attributes.
  function apply(scope) {
    var host = scope || document;
    host.querySelectorAll("[data-i18n]").forEach(function (node) {
      node.textContent = t(node.getAttribute("data-i18n"));
    });
    host.querySelectorAll("[data-i18n-html]").forEach(function (node) {
      node.innerHTML = t(node.getAttribute("data-i18n-html"));
    });
    host.querySelectorAll("[data-i18n-attr]").forEach(function (node) {
      node.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length === 2) node.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });
  }

  function setLang(next) {
    if (LANGS.indexOf(next) < 0 || next === lang) return;
    try {
      root.localStorage.setItem(STORAGE_KEY, next);
    } catch (error) {
      // Private mode: the choice lasts for this page only.
    }
    root.location.reload();
  }

  var api = {
    LANGS: LANGS,
    STORAGE_KEY: STORAGE_KEY,
    dict: dict,
    get lang() {
      return lang;
    },
    t: t,
    pick: pick,
    apply: apply,
    setLang: setLang
  };

  root.CBI18n = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang;
    apply(document);
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
