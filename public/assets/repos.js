function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function renderRepos() {
  const list = document.getElementById("repo-list");
  if (!list) return;
  const i18n = window.CBI18n;
  const t = i18n ? i18n.t : (key) => key;
  const pick = i18n ? i18n.pick : (value) => (typeof value === "string" ? value : (value && value.en) || "");

  let repos = [];
  try {
    const res = await fetch("assets/repos.json");
    repos = await res.json();
  } catch (err) {
    list.innerHTML = `<p class="repo-error">${escapeHtml(t("repos.error"))}</p>`;
    return;
  }

  const cards = repos
    .map((repo) => {
      const badge =
        repo.visibility === "private"
          ? '<span class="repo-badge private">private</span>'
          : repo.live
          ? `<span class="repo-badge live">${escapeHtml(t("repos.live"))}</span>`
          : "";
      const liveLink = repo.live
        ? `<a href="${repo.live}" target="_blank" rel="noopener">${repo.live.replace("https://", "")}</a>`
        : "";
      return `
        <article class="repo-card">
          <div class="repo-card-head">
            <h3><a href="${repo.url}" target="_blank" rel="noopener">${repo.name}</a></h3>
            ${badge}
          </div>
          <p>${escapeHtml(pick(repo.description))}</p>
          <div class="repo-card-footer">
            <span class="repo-lang"><span class="dot"></span>${repo.language}</span>
            <span class="repo-card-links">
              ${liveLink}
              <a href="${repo.url}" target="_blank" rel="noopener">${escapeHtml(t("repos.repoLink"))}</a>
            </span>
          </div>
        </article>`;
    })
    .join("");

  const newCard = `
    <article class="repo-card repo-card-new">
      <p>${escapeHtml(t("repos.newPrompt"))}</p>
      <a href="https://github.com/organizations/collective-bucket/repositories/new" target="_blank" rel="noopener">${escapeHtml(t("repos.newLink"))}</a>
    </article>`;

  list.innerHTML = cards + newCard;
}

renderRepos();
