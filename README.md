# Collective Bucket

`collective-bucket` GitHub organizasyonu altında barınan statik PoC'lerin
anasayfası ve repo dizini. [collectivebucket.com](https://collectivebucket.com)
adresinde Firebase Hosting üzerinden yayınlanır.

## İçerik

```
.
├── public/                       # Firebase Hosting'in yayınladığı klasör
│   ├── index.html                  # Anasayfa
│   └── assets/
│       ├── styles.css              # Tema (renk, tipografi, bileşen stilleri)
│       ├── logo.svg / favicon.svg  # Logomark
│       ├── repos.json              # collective-bucket altındaki repoların listesi
│       └── repos.js                # repos.json'u okuyup Repolar bölümünü oluşturan script
├── firebase.json, .firebaserc     # Firebase Hosting yapılandırması (target: main, site: cbucket-main)
├── package.json                   # firebase-tools bağımlılığı + serve/deploy script'leri
├── .github/workflows/             # main'e push'ta otomatik deploy, PR'larda önizleme linki
└── CONTRIBUTING.md                # Yeni repo/PoC ekleme rehberi
```

## Yerelde görüntüleme

```bash
npm install
npm run serve
# ya da: cd public && python3 -m http.server 8080
```

`repos.json` `fetch` ile okunduğu için dosyayı doğrudan çift tıklayıp açmak
yerine bir statik sunucu üzerinden servis etmek gerekir.

## Tema

Açık, tek vurgu renkli (pastel mint) bir tema kullanılıyor. Tüm tasarım
tokenları `public/assets/styles.css` dosyasının en üstünde `:root` içinde
tanımlı.

| Token | Değer | Kullanım |
|---|---|---|
| `--bg` | `#fbfbfa` | Sayfa zemini |
| `--accent` | `#2f9a7c` | Linkler, buton, vurgu metni |
| `--accent-pastel` | `#8fe3cb` | Logo, dekoratif noktalar |
| `--accent-soft` | `#eafbf5` | Rozet/kart arka planları |
| `--font-sans` | Inter | Başlık / gövde metni |
| `--font-mono` | JetBrains Mono | Kod, repo kartları |

## Marka kiti

`public/assets/logo.svg` kaynak logodur. `public/assets/brand/` altında farklı
platformlar için hazır export'lar bulunur:

| Dosya | Kullanım |
|---|---|
| `favicon.ico`, `icon-16/32/192/512.png` | Tarayıcı favicon'u, PWA/Android ikon |
| `apple-touch-icon.png` | iOS ana ekran ikonu (180×180, opak zemin) |
| `logo-square.png` / `.jpg` | Şeffaf / düz zeminli kare logo (sosyal medya profili vb.) |
| `logo-wordmark.svg` / `.png` | Yatay logo + yazı (README, sunum) |
| `social-preview.png` | GitHub repo social preview / link önizleme görseli (1200×630) |

## Yayınlama

Bu repo, [collective-bucket/menu](https://github.com/collective-bucket/menu)
reposuyla aynı Firebase Hosting + GitHub Actions desenini kullanır (tek proje:
`collective-bucket`, bu repo için site: `cbucket-main`, custom domain:
`collectivebucket.com` apex). `main`'e her push otomatik deploy tetikler.

Yeni bir repo/PoC eklemek istersen [CONTRIBUTING.md](CONTRIBUTING.md)'ye bak.
