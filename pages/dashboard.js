import { usersAPI, matchesAPI, rankingAPI, predictionsAPI } from "../js/services/api.js";
import { showToast } from "../js/components/toast.js";
import { showSkeleton } from "../js/components/loader.js";
import { navigate } from "../js/router.js";

export async function renderDashboard(container) {
  container.innerHTML = `
    <div class="dashboard">

      <!-- Header de bienvenida -->
      <div class="dashboard-header">
        <div class="welcome-text">
          <h1 class="welcome-title">¡Hola, <span id="user-name">...</span>! 👋</h1>
          <p class="welcome-sub">Mundial de Fútbol 2026 — Tus predicciones te esperan</p>
        </div>
        <button class="btn btn-primary" onclick="window.navigate('/predictions')">
          <i class="fas fa-futbol"></i> Ver predicciones
        </button>
      </div>

      <!-- Stats personales -->
      <div class="stats-grid" id="stats-grid">
        ${showSkeleton(4)}
      </div>

      <!-- Dos columnas: partidos en vivo + mi posición -->
      <div class="dashboard-grid">

        <!-- Partidos en vivo -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">
              <i class="fas fa-circle" style="color:var(--error);font-size:0.6rem"></i>
              En vivo
            </span>
            <span id="live-count" class="badge badge-live" style="display:none">0 partidos</span>
          </div>
          <div id="live-matches">
            ${showSkeleton(2)}
          </div>
        </div>

        <!-- Mi posición en el ranking -->
        <div class="card">
          <div class="card-header">
            <span class="card-title"><i class="fas fa-trophy"></i> Mi posición</span>
            <button class="btn btn-secondary" style="padding:0.35rem 0.9rem;font-size:0.82rem"
              onclick="window.navigate('/ranking')">
              Ver ranking completo
            </button>
          </div>
          <div id="my-ranking">
            ${showSkeleton(1)}
          </div>
        </div>

      </div>

      <!-- Próximos partidos -->
      <div class="card" style="margin-top:1.5rem">
        <div class="card-header">
          <span class="card-title"><i class="fas fa-calendar-alt"></i> Próximos partidos</span>
        </div>
        <div id="upcoming-matches">
          ${showSkeleton(3)}
        </div>
      </div>

    </div>
  `;

  injectDashboardStyles();
  loadDashboardData();
}

async function loadDashboardData() {
  try {
    // Datos en paralelo
    const [profile, stats, matches, myRanking] = await Promise.allSettled([
      usersAPI.getMe(),
      predictionsAPI.getMyStats(),
      matchesAPI.getAll(),
      rankingAPI.getMyPosition(),
    ]);

    // Nombre del usuario
    if (profile.status === "fulfilled") {
      document.getElementById("user-name").textContent =
        profile.value.display_name.split(" ")[0];
    }

    // Stats cards
    if (stats.status === "fulfilled") {
      renderStats(stats.value);
    }

    // Partidos
    if (matches.status === "fulfilled") {
      const allMatches = matches.value.matches || [];
      renderLiveMatches(allMatches.filter(m => ["1H", "HT", "2H"].includes(m.status)));
      renderUpcomingMatches(allMatches.filter(m => m.status === "NS").slice(0, 5));
    }

    // Ranking
    if (myRanking.status === "fulfilled") {
      renderMyRanking(myRanking.value);
    }

  } catch (err) {
    showToast("Error cargando datos", "error");
  }
}

function renderStats(stats) {
  const grid = document.getElementById("stats-grid");
  grid.innerHTML = `
    <div class="stat-card">
      <span class="stat-label">Mis puntos</span>
      <span class="stat-value">${stats.total_score ?? 0}</span>
      <span class="stat-sub">puntos totales</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">Predicciones</span>
      <span class="stat-value">${stats.total_predictions ?? 0}</span>
      <span class="stat-sub">de 104 partidos</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">Exactos</span>
      <span class="stat-value">${stats.exact_results ?? 0}</span>
      <span class="stat-sub">resultados exactos</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">Precisión</span>
      <span class="stat-value">${stats.accuracy ?? 0}%</span>
      <span class="stat-sub">de aciertos</span>
    </div>
  `;
}

function renderLiveMatches(matches) {
  const container = document.getElementById("live-matches");
  const countBadge = document.getElementById("live-count");

  if (!matches.length) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-moon"></i>
        <p>No hay partidos en vivo ahora mismo</p>
      </div>
    `;
    return;
  }

  countBadge.style.display = "flex";
  countBadge.textContent = `${matches.length} en vivo`;

  container.innerHTML = matches.map(m => `
    <div class="live-match-row">
      <div class="live-team">
        <img src="${m.home_team.logo}" alt="${m.home_team.name}" class="team-logo-sm" />
        <span>${m.home_team.name}</span>
      </div>
      <div class="live-score">
        <span class="badge badge-live">EN VIVO</span>
        <strong>${m.score.home ?? 0} - ${m.score.away ?? 0}</strong>
      </div>
      <div class="live-team right">
        <span>${m.away_team.name}</span>
        <img src="${m.away_team.logo}" alt="${m.away_team.name}" class="team-logo-sm" />
      </div>
    </div>
  `).join("");
}

function renderUpcomingMatches(matches) {
  const container = document.getElementById("upcoming-matches");

  if (!matches.length) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-calendar-check"></i>
        <p>No hay próximos partidos programados</p>
      </div>
    `;
    return;
  }

  container.innerHTML = matches.map(m => {
    const date = new Date(m.kickoff);
    const dateStr = date.toLocaleDateString("es-CO", {
      weekday: "short", day: "numeric", month: "short"
    });
    const timeStr = date.toLocaleTimeString("es-CO", {
      hour: "2-digit", minute: "2-digit"
    });

    return `
      <div class="upcoming-row" onclick="window.navigate('/predictions')">
        <div class="upcoming-teams">
          <img src="${m.home_team.logo}" class="team-logo-sm" />
          <span class="upcoming-name">${m.home_team.name}</span>
          <span class="upcoming-vs">vs</span>
          <span class="upcoming-name">${m.away_team.name}</span>
          <img src="${m.away_team.logo}" class="team-logo-sm" />
        </div>
        <div class="upcoming-time">
          <span>${dateStr}</span>
          <strong>${timeStr}</strong>
        </div>
      </div>
    `;
  }).join("");
}

function renderMyRanking(data) {
  const container = document.getElementById("my-ranking");
  const pos = data.position;
  const total = data.total_players;
  const entry = data.entry;

  const medal = pos === 1 ? "🥇" : pos === 2 ? "🥈" : pos === 3 ? "🥉" : `#${pos}`;

  container.innerHTML = `
    <div class="my-rank-display">
      <div class="my-rank-position">${medal}</div>
      <div class="my-rank-info">
        <p class="my-rank-label">Tu posición actual</p>
        <p class="my-rank-pos">${pos} de ${total} jugadores</p>
      </div>
      <div class="my-rank-points">
        <span class="stat-value">${entry.total_score}</span>
        <span class="stat-label">puntos</span>
      </div>
    </div>
    <div class="rank-progress">
      <div class="rank-progress-bar" style="width:${Math.max(5, 100 - (pos / total * 100))}%"></div>
    </div>
    <p class="rank-progress-label">
      Top ${Math.round(pos / total * 100)}% de los participantes
    </p>
  `;
}

function injectDashboardStyles() {
  if (document.getElementById("dashboard-styles")) return;
  const style = document.createElement("style");
  style.id = "dashboard-styles";
  style.textContent = `
    body { background: var(--gray-light); }

    .dashboard-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .welcome-title {
      font-size: 1.75rem;
      font-weight: 800;
      color: var(--navy);
      margin-bottom: 0.25rem;
    }

    .welcome-sub {
      color: var(--text-light);
      font-size: 0.95rem;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .live-match-row {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      padding: 0.85rem 0;
      border-bottom: 1px solid var(--gray-mid);
      gap: 0.5rem;
    }

    .live-match-row:last-child { border-bottom: none; }

    .live-team {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.88rem;
      font-weight: 600;
    }

    .live-team.right { flex-direction: row-reverse; }

    .live-score {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      font-size: 1.1rem;
    }

    .team-logo-sm {
      width: 28px;
      height: 28px;
      object-fit: contain;
    }

    .upcoming-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.85rem 0;
      border-bottom: 1px solid var(--gray-mid);
      cursor: pointer;
      transition: var(--transition);
      gap: 1rem;
    }

    .upcoming-row:last-child { border-bottom: none; }
    .upcoming-row:hover { padding-left: 0.5rem; }

    .upcoming-teams {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.88rem;
    }

    .upcoming-name { font-weight: 600; color: var(--text); }
    .upcoming-vs { color: var(--gray); font-size: 0.78rem; }

    .upcoming-time {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-size: 0.82rem;
      color: var(--text-light);
      white-space: nowrap;
    }

    .my-rank-display {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
    }

    .my-rank-position {
      font-size: 2.5rem;
      line-height: 1;
    }

    .my-rank-info { flex: 1; }

    .my-rank-label {
      font-size: 0.8rem;
      color: var(--text-light);
      font-weight: 500;
    }

    .my-rank-pos {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--navy);
    }

    .my-rank-points {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .rank-progress {
      height: 6px;
      background: var(--gray-mid);
      border-radius: 999px;
      margin-top: 0.75rem;
      overflow: hidden;
    }

    .rank-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, var(--turq), var(--navy));
      border-radius: 999px;
      transition: width 0.8s ease;
    }

    .rank-progress-label {
      font-size: 0.78rem;
      color: var(--text-light);
      margin-top: 0.4rem;
      text-align: right;
    }

    @media (max-width: 768px) {
      .dashboard-grid { grid-template-columns: 1fr; }
      .welcome-title { font-size: 1.3rem; }
    }
  `;
  document.head.appendChild(style);
}