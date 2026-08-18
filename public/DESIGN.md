# Collective Bucket tasarım kılavuzu

Bu dosya, Collective Bucket altındaki yeni ve mevcut uygulamalar için ortak
görünüm, oturum ve form standardını tanımlar. Yeni bir sohbet veya geliştirici
için kaynak burasıdır; yalnızca AI oturum belleğine güvenilmez.

Canlı çalışan parça: [`shell.js`](assets/shell.js), [`shell.css`](assets/shell.css),
[`apps.json`](assets/apps.json).

## Header

- Sol: Collective Bucket logosu → `https://collectivebucket.com`
- Uygulama adı header’da yazılmaz; kimlik `<title>` ve sayfa başlığında kalır
- Sağ: opsiyonel uygulama CTA’ları + `data-cb-auth` (**Üye Girişi** / e-posta + Çıkış)
- Entegrasyon:

```html
<link rel="stylesheet" href="https://collectivebucket.com/assets/shell.css" />
<header data-cb-shell="header">
  <nav data-cb-shell-nav>
    <a href="/incomes">Gelirler</a>
  </nav>
  <div data-cb-shell-cta>
    <a class="btn btn-primary" href="/edit">Yeni ilan</a>
  </div>
</header>
<script src="https://collectivebucket.com/assets/shell.js" defer></script>
<script src="https://auth.collectivebucket.com/client.js" defer></script>
```

## Footer

- Sol: logolu Collective Bucket; hover / odak / tıklama ile diğer uygulamalar
- Sağ: GitHub, Katkı Rehberi, MIT Lisansı
- Entegrasyon: `<footer data-cb-shell="footer"></footer>`
- Yeni canlı uygulama eklenince [`apps.json`](assets/apps.json) güncellenir

## Auth

- Oturum yokken sayfa **auth’a otomatik yönlenmez**
- Ziyaretçi **Üye Girişi** veya sayfa içi **Giriş yap** ile gider
- Yazma işlemlerinde `requireSession()` yalnızca hata fırlatır:

```js
async function requireSession() {
  var session = await getOptionalSession();
  if (!session || !session.idToken) {
    throw new Error("Kaydetmek için giriş yap.");
  }
  return session;
}
```

## Form ve liste

| Öğe | Standart |
|-----|----------|
| Font | Inter |
| Input | 16px (iOS zoom olmasın) |
| Renk | `--accent: #2f9a7c`, `--bg: #fbfbfa`, `--danger: #a33a3a` |
| Container | `.wrap` max-width 880px |
| Form | `<dialog class="modal">`, Vazgeç, Escape / backdrop |
| Liste | `.list-item.is-action`, Enter / Space |
| Terimler | Üye Girişi, Giriş yap, Vazgeç, Sil |

## Yeni repo checklist

1. `shell.css` + `shell.js` + auth `client.js` ekle
2. Header/footer placeholder’larını koy
3. Soft auth kullan; `window.location` ile auth’a atlama
4. [`repos.json`](assets/repos.json) ve [`apps.json`](assets/apps.json) güncelle
5. Kökte MIT `LICENSE` dosyası olsun
6. Firebase Hosting adımları için [CONTRIBUTING.md](CONTRIBUTING.md)
