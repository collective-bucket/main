# Collective Bucket

[Türkçe](README.tr.md)

A collection of open-source static apps for shipping small ideas and experiments
fast. Published at [collectivebucket.com](https://collectivebucket.com).

## What is it?

Collective Bucket offers a starter template so you don't have to rebuild the
infrastructure every time you try a new idea. Hosting, authentication and UI
needs live in one place; each app lives in its own repo.

## Goal

- Stop rethinking infrastructure decisions (hosting, CI, auth) for every project
- Start for free with Firebase Spark and GitHub Free
- Ship fast with static files; add Firestore when needed
- Reduce repeated work with shared tools (auth, shell)

## Technical choices

- One Firebase project: `collective-bucket`
- A separate Hosting site and target per repo (`cbucket-{repo}`)
- Static HTML/CSS/JS under `public/`; no build required
- Push to `main` → automatic deploy with GitHub Actions
- Firestore + Security Rules for apps that need data
- Central session: `auth.collectivebucket.com` + `client.js`
- Cache-busting: `scripts/stamp-assets.js`

## Design choices

- Light background, pastel mint accent (`--accent: #2f9a7c`)
- Typography: Inter (body), JetBrains Mono (code)
- Shared header/footer frame: `collectivebucket.com/assets/shell.css`
- App repos share the same component language (`styles.css`, nav, cards)

## This repo

The home page and the list of repos in the `collective-bucket` organization.
The list is read from `public/assets/repos.json`.

The site is bilingual (English by default, Turkish). Page copy lives in
`public/assets/i18n.js`; the language picker in the top right stores the
choice in `localStorage` (`cb-lang`).

## Local

```bash
npm install
npm run serve
npm test
```

## Contributing

Steps for adding a new repo or PoC: [CONTRIBUTING.md](CONTRIBUTING.md)
