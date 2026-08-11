async function renderRepos() {
  const list = document.getElementById("repo-list");
  if (!list) return;

  let repos = [];
  try {
    const res = await fetch("assets/repos.json");
    repos = await res.json();
  } catch (err) {
    list.innerHTML = '<p class="repo-error">Repo listesi yüklenemedi.</p>';
    return;
  }

  const cards = repos
    .map((repo) => {
      const badge =
        repo.visibility === "private"
          ? '<span class="repo-badge private">private</span>'
          : repo.live
          ? '<span class="repo-badge live">canlı</span>'
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
          <p>${repo.description}</p>
          <div class="repo-card-footer">
            <span class="repo-lang"><span class="dot"></span>${repo.language}</span>
            <span class="repo-card-links">
              ${liveLink}
              <a href="${repo.url}" target="_blank" rel="noopener">repo →</a>
            </span>
          </div>
        </article>`;
    })
    .join("");

  const newCard = `
    <article class="repo-card repo-card-new">
      <p>Yeni bir PoC mi ekliyorsun?</p>
      <a href="https://github.com/organizations/collective-bucket/repositories/new" target="_blank" rel="noopener">+ Yeni repo oluştur</a>
    </article>`;

  list.innerHTML = cards + newCard;
}

renderRepos();
