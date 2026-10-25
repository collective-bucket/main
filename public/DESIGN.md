# Collective Bucket design guide

This file defines the shared look, session and form standard for new and
existing apps under Collective Bucket. It is the source of truth for a new chat
or developer; don't rely on AI session memory alone.

Live parts: [`shell.js`](assets/shell.js), [`shell.css`](assets/shell.css),
[`apps.json`](assets/apps.json).

## Header

- Left: Collective Bucket logo → `https://collectivebucket.com`
- The app name is not written in the header; identity stays in `<title>` and the page heading
- Right: optional app CTAs + `data-cb-auth` (**Sign in** / e-mail + Sign out)
- Integration:

```html
<link rel="stylesheet" href="https://collectivebucket.com/assets/shell.css" />
<header data-cb-shell="header">
  <nav data-cb-shell-nav>
    <a href="/incomes">Incomes</a>
  </nav>
  <div data-cb-shell-cta>
    <a class="btn btn-primary" href="/edit">New listing</a>
  </div>
</header>
<script src="https://collectivebucket.com/assets/shell.js" defer></script>
<script src="https://auth.collectivebucket.com/client.js" defer></script>
```

## Language

- Shell copy (auth toggle, footer links) follows `<html lang>`: `tr` → Turkish, anything else → English
- Add `data-cb-shell-lang` to the header placeholder to show the language picker (flag button, Türkçe / English) in the top right
- The picker stores the choice in `localStorage` (`cb-lang`) and reloads; the page must set `<html lang>` from that value (on the main site `assets/i18n.js` does this)

## Footer

- Left: Collective Bucket with logo; other apps on hover / focus / click
- Right: GitHub, Contributing Guide, MIT License
- Integration: `<footer data-cb-shell="footer"></footer>`
- Update [`apps.json`](assets/apps.json) when a new live app is added

## Auth

- Without a session the page **does not redirect to auth automatically**
- The visitor goes there via **Sign in** or an in-page sign-in button
- For write operations `requireSession()` only throws an error:

```js
async function requireSession() {
  var session = await getOptionalSession();
  if (!session || !session.idToken) {
    throw new Error("Sign in to save.");
  }
  return session;
}
```

## Forms and lists

| Item | Standard |
|------|----------|
| Font | Inter |
| Input | 16px (no iOS zoom) |
| Color | `--accent: #2f9a7c`, `--bg: #fbfbfa`, `--danger: #a33a3a` |
| Container | `.wrap` max-width 880px |
| Form | `<dialog class="modal">`, Cancel, Escape / backdrop |
| List | `.list-item.is-action`, Enter / Space |
| Terms | Sign in, Cancel, Delete (TR: Üye Girişi, Giriş yap, Vazgeç, Sil) |

## New repo checklist

1. Add `shell.css` + `shell.js` + auth `client.js`
2. Place the header/footer placeholders
3. Use soft auth; don't jump to auth with `window.location`
4. Update [`repos.json`](assets/repos.json) and [`apps.json`](assets/apps.json)
5. Have an MIT `LICENSE` file at the root
6. See [CONTRIBUTING.md](CONTRIBUTING.md) for the Firebase Hosting steps
