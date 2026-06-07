import { usersAPI, predictionsAPI } from "../js/services/api.js";
import { showToast } from "../js/components/toast.js";
import { showSkeleton } from "../js/components/loader.js";
import { logout } from "../js/services/firebase.js";
import { navigate } from "../js/router.js";
import { rankingAPI } from "../js/services/api.js";

export async function renderProfile(container) {
  container.innerHTML = `
    <div class="profile-page">

      <div class="section-header">
        <h1 class="section-title"><i class="fas fa-user"></i> Mi perfil</h1>
      </div>

      <!-- Tarjeta de perfil -->
      <div class="profile-grid">

        <div class="card profile-card">
          <div id="profile-info">
            ${showSkeleton(2)}
          </div>
        </div>

        <div class="card stats-detail-card">
          <div class="card-header">
            <span class="card-title"><i class="fas fa-chart-bar"></i> Mis estadísticas</span>
          </div>
          <div id="profile-stats">
            ${showSkeleton(3)}
          </div>
        </div>

      </div>

      <!-- Últimas predicciones procesadas -->
      <div class="card" style="margin-top:1.5rem">
        <div class="card-header">
          <span class="card-title"><i class="fas fa-history"></i> Últimos resultados</span>
          <button class="btn btn-secondary" style="padding:0.35rem 0.9rem;font-size:0.82rem"
            onclick="window.navigate('/predictions')">
            Ver todas
          </button>
        </div>
        <div id="recent-predictions">
          ${showSkeleton(3)}
        </div>
      </div>

      <!-- Cerrar sesión -->
      <div style="text-align:center;margin-top:2rem">
        <button class="btn btn-danger" id="logout-btn">
          <i class="fas fa-sign-out-alt"></i> Cerrar sesión
        </button>
      </div>

    </div>
  `;

  injectProfileStyles();
  await loadProfileData();

  document.getElementById("logout-btn").addEventListener("click", handleLogout);
}

async function loadProfileData() {
  try {
    const [profileRes, statsRes, rankingRes, predsRes] = await Promise.allSettled([
      usersAPI.getMe(),
      predictionsAPI.getMyStats(),
      rankingAPI.getMyPosition(),
      predictionsAPI.getMyPredictions(),
    ]);

    if (profileRes.status === "fulfilled") {
      renderProfileInfo(
        profileRes.value,
        rankingRes.status === "fulfilled" ? rankingRes.value : null
      );
    }

    if (statsRes.status === "fulfilled") {
      renderStats(statsRes.value);
    }

    if (predsRes.status === "fulfilled") {
      const processed = (predsRes.value.predictions || [])
        .filter(p => p.processed)
        .slice(-5)
        .reverse();
      renderRecentPredictions(processed);
    }

  } catch (err) {
    showToast("Error cargando perfil", "error");
  }
}

function renderProfileInfo(profile, ranking) {
  const container = document.getElementById("profile-info");
  const initials = profile.display_name
    .split(" ")
    .map(w => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const pos = ranking?.position;
  const total = ranking?.total_players;

  container.innerHTML = `
    <div class="profile-avatar-wrap">
      <div class="profile-avatar">
        ${profile.photo_url
      ? `<img src="${profile.photo_url}" alt="${profile.display_name}" />`
      : `<span>${initials}</span>`
    }
      </div>
      ${pos ? `
        <div class="profile-rank-badge">
          ${pos === 1 ? "🥇" : pos === 2 ? "🥈" : pos === 3 ? "🥉" : `#${pos}`}
        </div>
      ` : ""}
    </div>

    <div class="profile-info-text">
      <h2 class="profile-name">${profile.display_name}</h2>
      <p class="profile-email">${profile.email}</p>
      ${pos ? `
        <p class="profile-position">
          Posición <strong>${pos}</strong> de ${total} jugadores
        </p>
      ` : ""}
    </div>

    <div class="profile-score-display">
      <span class="profile-score-val">${profile.total_score}</span>
      <span class="profile-score-label">puntos totales</span>
    </div>
  `;
}

function renderStats(stats) {
  const container = document.getElementById("profile-stats");

  const items = [
    { label: "Predicciones realizadas", value: stats.total_predictions, icon: "fa-futbol", color: "var(--turq)" },
    { label: "Partidos procesados", value: stats.processed, icon: "fa-check-circle", color: "var(--success)" },
    { label: "Resultados exactos", value: stats.exact_results, icon: "fa-bullseye", color: "var(--navy)" },
    { label: "Ganadores acertados", value: stats.correct_winners, icon: "fa-thumbs-up", color: "var(--turq-dark)" },
    { label: "Pendientes", value: stats.pending, icon: "fa-clock", color: "var(--warning)" },
    { label: "Precisión general", value: `${stats.accuracy}%`, icon: "fa-percentage", color: "var(--success)" },
  ];

  container.innerHTML = items.map(item => `
    <div class="stat-row">
      <div class="stat-row-left">
        <i class="fas ${item.icon}" style="color:${item.color};width:20px;text-align:center"></i>
        <span>${item.label}</span>
      </div>
      <strong style="color:var(--navy)">${item.value}</strong>
    </div>
  `).join("");
}

function renderRecentPredictions(predictions) {
  const container = document.getElementById("recent-predictions");

  if (!predictions.length) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-futbol"></i>
        <p>Aún no hay resultados procesados</p>
      </div>
    `;
    return;
  }

  container.innerHTML = predictions.map(p => {
    const pointsColor = p.points === 5 ? "var(--success)"
      : p.points >= 1 ? "var(--turq-dark)"
        : "var(--error)";

    const pointsLabel = p.points === 5 ? "Exacto 🎯"
      : p.points === 3 ? "Diferencia ✓"
        : p.points === 1 ? "Ganador ✓"
          : "Fallido ✗";

    return `
      <div class="recent-pred-row">
        <div class="recent-pred-teams">
          <img src="${p.home_team_logo}" class="team-logo-sm" />
          <span class="recent-pred-name">${p.home_team_name}</span>
          <span class="recent-score">
            ${p.real_home} - ${p.real_away}
          </span>
          <span class="recent-pred-name">${p.away_team_name}</span>
          <img src="${p.away_team_logo}" class="team-logo-sm" />
        </div>
        <div class="recent-pred-right">
          <span class="recent-pred-guess">
            Tu predicción: ${p.predicted_home} - ${p.predicted_away}
          </span>
          <span class="recent-pts" style="color:${pointsColor}">
            +${p.points} pts — ${pointsLabel}
          </span>
        </div>
      </div>
    `;
  }).join("");
}

async function handleLogout() {
  const btn = document.getElementById("logout-btn");
  btn.disabled = true;
  btn.innerHTML = `<div class="spinner" style="width:18px;height:18px;border-width:2px"></div>`;

  try {
    await logout();
    navigate("/");
  } catch (err) {
    showToast("Error cerrando sesión", "error");
    btn.disabled = false;
    btn.innerHTML = `<i class="fas fa-sign-out-alt"></i> Cerrar sesión`;
  }
}
function injectProfileStyles() {
  if (document.getElementById("profile-styles")) return;
  const style = document.createElement("style");
  style.id = "profile-styles";
  style.textContent = `
    body { background: var(--gray-light); }

    .profile-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .profile-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1rem;
      padding: 2rem;
    }

    .profile-avatar-wrap {
      position: relative;
      display: inline-block;
    }

    .profile-avatar {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: var(--navy);
      color: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 800;
      overflow: hidden;
      border: 4px solid var(--turq);
    }

    .profile-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .profile-rank-badge {
      position: absolute;
      bottom: -4px;
      right: -4px;
      font-size: 1.4rem;
      background: var(--white);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow);
    }

    .profile-name {
      font-size: 1.3rem;
      font-weight: 800;
      color: var(--navy);
    }

    .profile-email {
      font-size: 0.85rem;
      color: var(--text-light);
    }

    .profile-position {
      font-size: 0.88rem;
      color: var(--text-light);
      margin-top: 0.25rem;
    }

    .profile-score-display {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: var(--gray-light);
      border-radius: var(--radius);
      padding: 1rem 2rem;
      margin-top: 0.5rem;
    }

    .profile-score-val {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--navy);
      line-height: 1;
    }

    .profile-score-label {
      font-size: 0.78rem;
      color: var(--text-light);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: 0.25rem;
    }

    .stat-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--gray-mid);
      font-size: 0.9rem;
    }

    .stat-row:last-child { border-bottom: none; }

    .stat-row-left {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      color: var(--text);
    }

    .recent-pred-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.85rem 0;
      border-bottom: 1px solid var(--gray-mid);
      gap: 1rem;
      flex-wrap: wrap;
    }

    .recent-pred-row:last-child { border-bottom: none; }

    .recent-pred-teams {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
    }

    .recent-pred-name { font-weight: 600; color: var(--text); }

    .recent-score {
      font-weight: 800;
      font-size: 1rem;
      color: var(--navy);
      padding: 0.15rem 0.5rem;
      background: var(--gray-light);
      border-radius: var(--radius-sm);
    }

    .recent-pred-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.2rem;
    }

    .recent-pred-guess {
      font-size: 0.78rem;
      color: var(--text-light);
    }

    .recent-pts {
      font-size: 0.85rem;
      font-weight: 700;
    }

    @media (max-width: 768px) {
      .profile-grid { grid-template-columns: 1fr; }
      .recent-pred-row { flex-direction: column; align-items: flex-start; }
      .recent-pred-right { align-items: flex-start; }
    }
  `;
  document.head.appendChild(style);
}