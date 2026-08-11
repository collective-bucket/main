# Katkı Rehberi

Bu doküman, `collective-bucket` organizasyonuna yeni bir repo/PoC eklemek ya da
var olan bir repoya katkı sağlamak isteyenler için hazırlandı. Referans
implementasyon [collective-bucket/menu](https://github.com/collective-bucket/menu)
reposudur — aşağıdaki adımlar o repodaki çalışan kurulumun genelleştirilmiş
hâlidir.

## Mimari

- **Tek bir Firebase projesi**: `collective-bucket-apps`. Her repo, bu proje
  altında ayrı bir Hosting **site**'ı olarak yayınlanır (ayrı proje açmak
  yerine).
- **Her repo kendi site'ına ve target'ına sahiptir**: örnek `main` → `cb-main`,
  `menu` → `cb-menu`. Yeni repo için isim deseni `cb-<repo-adı>`.
- **Her site bir subdomain'e bağlanır**: `cb-menu` → `menu.collectivebucket.com`.
  (Bu repo — `main` — istisna olarak kök alan adına, `collectivebucket.com`
  apex'ine bağlanır.)
- **CI/CD**: GitHub Actions, `FIREBASE_TOKEN` secret'ı ile `firebase-tools
  deploy` çalıştırır (servis hesabı key'i değil — org policy buna izin
  vermiyor). `main`'e her push canlıya deploy eder, her PR ayrı bir önizleme
  linki üretir.

## Yeni bir repo/PoC ekleme

### 1. Repo oluştur

[collective-bucket](https://github.com/organizations/collective-bucket/repositories/new)
organizasyonunda yeni bir repo aç, ya da var olan bir repoya PR gönder.

### 2. Dosya yapısı

Statik dosyalarını (`index.html`, CSS, JS, görseller) `public/` klasörü altına
koy. Build aracı zorunlu değil.

### 3. Firebase Hosting dosyaları

Bu repodaki (`main`) veya `menu` reposundaki şu dosyaları kopyalayıp isimleri
değiştir:

- `firebase.json` — `"target"` alanını repo adınla değiştir.
- `.firebaserc` — `targets.collective-bucket-apps.hosting` altına
  `"<repo-adı>": ["cb-<repo-adı>"]` ekle.
- `package.json` — `scripts.deploy`'daki `--only hosting:<repo-adı>` kısmını
  güncelle.
- `.github/workflows/firebase-hosting-merge.yml` ve
  `firebase-hosting-pull-request.yml` — `hosting:<repo-adı>` kısımlarını
  güncelle.

### 4. Firebase site + target oluşturma

```bash
npx firebase-tools login
# admin@collectivebucket.com hesabıyla giriş yap

npx firebase-tools use collective-bucket-apps
npx firebase-tools hosting:sites:create cb-<repo-adı>
npx firebase-tools target:apply hosting <repo-adı> cb-<repo-adı>
```

### 5. `FIREBASE_TOKEN` secret'ı

Token tüm repolar arasında paylaşılabilir, ama her repoya ayrıca eklenmesi
gerekir:

```bash
npx firebase-tools login:ci
# çıktıdaki token'ı kopyala

gh secret set FIREBASE_TOKEN --repo collective-bucket/<repo-adı> --body "BURAYA_TOKEN"
```

### 6. Custom domain (opsiyonel)

Firebase Console → proje `collective-bucket-apps` → Hosting → ilgili site →
**Add custom domain** → `<repo-adı>.collectivebucket.com`. Verilen TXT/A
kayıtlarını DNS panelinde ekleyip doğrula.

### 7. `repos.json`'a ekle

Bu repodaki [public/assets/repos.json](public/assets/repos.json) dosyasına
yeni reponu ekleyen bir PR gönder, böylece anasayfada listelenir.

## Kapsam

- Statik, istemci taraflı PoC'ler için uygundur.
- Backend, veritabanı veya ücretli üçüncü parti servis gerektiren fikirler bu
  yapının kapsamı dışındadır.
