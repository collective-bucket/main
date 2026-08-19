# Collective Bucket

Küçük fikirleri ve PoC’leri hızlıca canlıya almak için açık kaynak statik
uygulama koleksiyonu. [collectivebucket.com](https://collectivebucket.com)
adresinde yayınlanır.

## Nedir?

Collective Bucket, bir fikri denemek için altyapı kurulumunu tekrar tekrar
yapmayı gerektirmeyen bir şablon sunar. Her uygulama kendi repoda yaşar; ortak
giriş, deploy ve görsel dil paylaşılır.

## Amaç

- Altyapı kararlarını (hosting, CI, auth) her projede yeniden düşünmemek
- Firebase Spark ve GitHub Free ile ücretsiz başlamak
- Statik dosyalarla hızlı yayın; gerektiğinde Firestore eklemek
- Ortak araçlarla (auth, shell) tekrar eden işleri azaltmak

## Teknik tercihler

- Tek Firebase projesi: `collective-bucket`
- Her repo ayrı Hosting site ve target (`cbucket-{repo}`)
- `public/` altında statik HTML/CSS/JS; build zorunlu değil
- `main` branch push → GitHub Actions ile otomatik deploy
- Veri gereken uygulamalarda Firestore + Security Rules
- Merkezi oturum: `auth.collectivebucket.com` + `client.js`
- Cache-busting: `scripts/stamp-assets.js`

## Tasarım tercihleri

- Açık zemin, pastel mint vurgu (`--accent: #2f9a7c`)
- Tipografi: Inter (gövde), JetBrains Mono (kod)
- Paylaşılan üst/alt çerçeve: `collectivebucket.com/assets/shell.css`
- Uygulama repoları aynı bileşen dilini (`styles.css`, nav, kartlar) paylaşır

## Bu repo

Anasayfa ve `collective-bucket` organizasyonundaki repoların listesi.
Liste `public/assets/repos.json` dosyasından okunur.

## Yerel

```bash
npm install
npm run serve
```

## Katkı

Yeni repo veya PoC ekleme adımları: [CONTRIBUTING.md](CONTRIBUTING.md)
