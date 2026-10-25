# Contributing Guide

This document is for anyone who wants to add a new repo/PoC to the
`collective-bucket` organization or contribute to an existing repo. The
reference implementation is the
[collective-bucket/menu](https://github.com/collective-bucket/menu) repo — the
steps below are a generalized version of the working setup in that repo.

## Architecture

- **A single Firebase project**: `collective-bucket`. Each repo is published as
  a separate Hosting **site** under this project (instead of opening a separate
  project).
- **Each repo has its own site and target**: for example `main` →
  `cbucket-main`, `menu` → `cbucket-menu`. The naming pattern for a new repo is
  `cbucket-<repo-name>`.
- **Each site is attached to a subdomain**: `cbucket-menu` →
  `menu.collectivebucket.com`. (This repo — `main` — is the exception and is
  attached to the root domain, the `collectivebucket.com` apex.)
- **CI/CD**: GitHub Actions runs `firebase-tools deploy` with the
  `FIREBASE_TOKEN` secret (not a service account key — the org policy doesn't
  allow it). Every push to `main` deploys to production, and every PR produces
  its own preview link.

## Adding a new repo/PoC

### 1. Create the repo

Open a new repo in the
[collective-bucket](https://github.com/organizations/collective-bucket/repositories/new)
organization, or send a PR to an existing repo.

### 2. File structure

Put your static files (`index.html`, CSS, JS, images) under the `public/`
folder. A build tool is not required.

### 3. Firebase Hosting files

Copy the following files from this repo (`main`) or the `menu` repo and rename
them:

- `firebase.json` — replace the `"target"` field with your repo name.
- `.firebaserc` — add `"<repo-name>": ["cbucket-<repo-name>"]` under
  `targets.collective-bucket.hosting`.
- `package.json` — update the `--only hosting:<repo-name>` part of
  `scripts.deploy`.
- `.github/workflows/firebase-hosting-merge.yml` and
  `firebase-hosting-pull-request.yml` — update the `hosting:<repo-name>` parts.

### 4. Create the Firebase site + target

```bash
npx firebase-tools login
# sign in with the admin@collectivebucket.com account

npx firebase-tools use collective-bucket
npx firebase-tools hosting:sites:create cbucket-<repo-name>
npx firebase-tools target:apply hosting <repo-name> cbucket-<repo-name>
```

### 5. The `FIREBASE_TOKEN` secret

The token can be shared across all repos, but it has to be added to each repo
separately:

```bash
npx firebase-tools login:ci
# copy the token from the output

gh secret set FIREBASE_TOKEN --repo collective-bucket/<repo-name> --body "TOKEN_HERE"
```

### 6. Custom domain (optional)

Firebase Console → project `collective-bucket` → Hosting → the relevant site →
**Add custom domain** → `<repo-name>.collectivebucket.com`. Add the given
TXT/A records in the DNS panel and verify.

### 7. Add it to `repos.json` and `apps.json`

Send a PR that adds your new repo to
[public/assets/repos.json](public/assets/repos.json) in this repo so it is
listed on the home page. The `description` field is bilingual:
`{ "en": "...", "tr": "..." }`. If it is a live app, it also needs an entry in
[public/assets/apps.json](public/assets/apps.json) for the footer menu.

### 8. Shared shell

The header and footer are added with `shell.js` / `shell.css` from the
[design guide](public/DESIGN.md). The app name is not written in the header;
the logo links to the main site.

```html
<link rel="stylesheet" href="https://collectivebucket.com/assets/shell.css" />
<header data-cb-shell="header"></header>
<footer data-cb-shell="footer"></footer>
<script src="https://collectivebucket.com/assets/shell.js" defer></script>
<script src="https://auth.collectivebucket.com/client.js" defer></script>
```

Protected pages don't redirect to auth automatically; the visitor goes there
via **Sign in** (**Üye Girişi**) or an in-page sign-in button.

## Shared session management

Collective Bucket projects use the
[collective-bucket/auth](https://github.com/collective-bucket/auth) repo and
the `auth.collectivebucket.com` address for central sign-in. Adding an empty
session container and the central client script to the nav is enough:

```html
<div data-cb-auth></div>
<script src="https://auth.collectivebucket.com/client.js" defer></script>
```

Programmatic access to the session:

```js
const session = await window.CollectiveBucketAuth.getSession();
```

The persistent Firebase session is kept only on the auth origin. The consuming
app receives a short-lived ID token in memory; the refresh token is not shared.
Real access control on resources such as Firestore must always be done with
Firebase Security Rules via `request.auth.uid`.

## Scope

- PoCs are limited to tools in the Firebase Spark (free) tier: Hosting,
  Authentication, Firestore, the Cloud Functions free quota, etc.
- Ideas that need paid third-party services or the paid Firebase (Blaze) tier
  are out of scope for this setup.
- For shared needs, use the ready-made tools Collective Bucket builds itself;
  for example [collective-bucket/auth](https://github.com/collective-bucket/auth)
  (`auth.collectivebucket.com`) for central sign-in.
