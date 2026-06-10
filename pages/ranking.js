import { rankingAPI } from "../js/services/api.js";
import { showToast } from "../js/components/toast.js";
import { showSkeleton } from "../js/components/loader.js";
import { auth, listenToRanking } from "../js/services/firebase.js";

export async function renderRanking(container) {
  if (window._rankingUnsub) {
    window._rankingUnsub();
    window._rankingUnsub = null;
  }

  // Primero renderizar el HTML
  container.innerHTML = `
    <div class="ranking-page">
      <div class="section-header">
        <h1 class="section-title">
          <i class="fas fa-trophy"></i> Tabla de posiciones
        </h1>
        <div style="display:flex;align-items:center;gap:0.75rem">
          <span class="live-indicator">
            <i class="fas fa-circle" style="color:var(--success);font-size:0.5rem"></i>
            En vivo
          </span>
        </div>
      </div>
      <div id="my-position-banner"></div>
      <div class="card" style="padding:0;overflow:hidden">
        <div id="ranking-table-container">
          ${showSkeleton(5)}
        </div>
      </div>
    </div>
  `;

  // Después inyectar estilos y cargar datos
  injectRankingStyles();

  // Pequeño delay para asegurar que el DOM está listo
  await new Promise(resolve => setTimeout(resolve, 0));

  await loadRanking();

  window._rankingUnsub = listenToRanking((players) => {
    const myUid = auth.currentUser?.uid;
    const ranked = buildRanking(players);
    renderTable(ranked, myUid);

    const myEntry = ranked.find(r => r.uid === myUid);
    if (myEntry) {
      renderMyBanner({
        position: myEntry.position,
        total_players: ranked.length,
        entry: myEntry,
      });
    }
  });
}

async function loadRanking() {
  try {
    const [rankingRes, myPosRes] = await Promise.allSettled([
      rankingAPI.getAll(),
      rankingAPI.getMyPosition(),
    ]);

    console.log("rankingRes:", rankingRes.status);
    console.log("myPosRes:", myPosRes.status, myPosRes.reason);

    const ranking = rankingRes.status === "fulfilled" ? rankingRes.value : [];
    const myPos = myPosRes.status === "fulfilled" ? myPosRes.value : null;

    console.log("myPos:", myPos);
    console.log("banner element:", document.getElementById("my-position-banner"));

    if (myPos) {
      renderMyBanner(myPos);
    } else {
      const banner = document.getElementById("my-position-banner");
      if (banner) {
        banner.innerHTML = `
          <div class="no-position-banner">
            <i class="fas fa-hourglass-half"></i>
            <div>
              <p class="no-position-title">Tu posición aparecerá aquí</p>
              <p class="no-position-sub">
                El ranking se activa cuando comiencen a procesarse los resultados del Mundial.
              </p>
            </div>
          </div>
        `;
      }
    }

    renderTable(ranking, auth.currentUser?.uid);

  } catch (err) {
    const container = document.getElementById("ranking-table-container");
    if (container) {
      container.innerHTML = `
        <div class="empty-state" style="padding:3rem">
          <i class="fas fa-exclamation-triangle" style="font-size:2rem;opacity:0.3;display:block;margin-bottom:1rem"></i>
          <p style="color:var(--text-light)">No se pudo cargar el ranking</p>
        </div>
      `;
    }
  }
}

function buildRanking(players) {
  const sorted = [...players].sort((a, b) => {
    if (b.total_score !== a.total_score) return b.total_score - a.total_score;
    if (b.exact_results !== a.exact_results) return b.exact_results - a.exact_results;
    return 0;
  });

  return sorted.map((player, i) => ({
    position: i + 1,
    uid: player.uid,
    display_name: player.display_name || "Jugador",
    photo_url: player.photo_url || null,
    total_score: player.total_score || 0,
    predictions_count: player.predictions_count || 0,
    exact_results: player.exact_results || 0,
    correct_winners: player.correct_winners || 0,
    accuracy: player.accuracy || 0,
  }));
}

function renderMyBanner(data) {
  const banner = document.getElementById("my-position-banner");
  if (!banner) return;

  const pos = data.position;
  const total = data.total_players;
  const entry = data.entry;
  const medal = pos === 1 ? "🥇" : pos === 2 ? "🥈" : pos === 3 ? "🥉" : null;

  banner.innerHTML = `
    <div class="my-banner">
      <div class="my-banner-left">
        <div class="my-banner-pos">${medal || `#${pos}`}</div>
        <div>
          <p class="my-banner-label">Tu posición</p>
          <p class="my-banner-name">${entry.display_name}</p>
        </div>
      </div>
      <div class="my-banner-stats">
        <div class="my-banner-stat">
          <span class="my-banner-val">${entry.total_score}</span>
          <span class="my-banner-key">puntos</span>
        </div>
        <div class="my-banner-stat">
          <span class="my-banner-val">${entry.exact_results}</span>
          <span class="my-banner-key">exactos</span>
        </div>
        <div class="my-banner-stat">
          <span class="my-banner-val">${entry.accuracy}%</span>
          <span class="my-banner-key">precisión</span>
        </div>
        <div class="my-banner-stat">
          <span class="my-banner-val">${pos}/${total}</span>
          <span class="my-banner-key">posición</span>
        </div>
      </div>
    </div>
  `;
}

function renderTable(ranking, myUid) {
  const container = document.getElementById("ranking-table-container");
  if (!container) return;

  if (!ranking.length) {
    container.innerHTML = `
      <div class="empty-state" style="padding:3rem">
        <i class="fas fa-trophy" style="font-size:2.5rem;opacity:0.2;display:block;margin-bottom:1rem"></i>
        <p style="font-weight:600;color:var(--navy);margin-bottom:0.25rem">
          Aún no hay datos disponibles
        </p>
        <p style="font-size:0.85rem;color:var(--text-light)">
          El ranking se actualizará cuando comiencen los partidos
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <table class="ranking-table">
      <thead>
        <tr>
          <th style="width:50px">#</th>
          <th>Jugador</th>
          <th style="text-align:center">Puntos</th>
          <th style="text-align:center">Exactos</th>
          <th style="text-align:center">Aciertos</th>
          <th style="text-align:center">Precisión</th>
        </tr>
      </thead>
      <tbody>
        ${ranking.map(entry => renderRow(entry, myUid)).join("")}
      </tbody>
    </table>
  `;
}

function renderRow(entry, myUid) {
  const isMe = entry.uid === myUid;
  const posClass = entry.position === 1 ? "gold"
    : entry.position === 2 ? "silver"
      : entry.position === 3 ? "bronze" : "";

  const medal = entry.position === 1 ? "🥇"
    : entry.position === 2 ? "🥈"
      : entry.position === 3 ? "🥉"
        : entry.position;

  const initials = (entry.display_name || "?")
    .split(" ")
    .map(w => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return `
    <tr class="${isMe ? "my-row" : ""}">
      <td>
        <span class="rank-position ${posClass}">${medal}</span>
      </td>
      <td>
        <div class="rank-player">
          <div class="rank-avatar"
            style="${isMe ? "background:var(--turq);color:var(--navy)" : ""}">
            ${entry.photo_url
      ? `<img src="${entry.photo_url}"
                   style="width:100%;height:100%;border-radius:50%;object-fit:cover" />`
      : initials
    }
          </div>
          <div>
            <span class="rank-name">${entry.display_name}</span>
            ${isMe ? `<span style="font-size:0.72rem;color:var(--turq);display:block">Tú</span>` : ""}
          </div>
        </div>
      </td>
      <td style="text-align:center">
        <span class="points-badge">${entry.total_score}</span>
      </td>
      <td style="text-align:center;font-weight:600;color:var(--navy)">
        ${entry.exact_results}
      </td>
      <td style="text-align:center;color:var(--text-light)">
        ${entry.correct_winners}
      </td>
      <td style="text-align:center">
        <span class="accuracy-pill ${entry.accuracy >= 50 ? "acc-good" : ""}">
          ${entry.accuracy}%
        </span>
      </td>
    </tr>
  `;
}

function injectRankingStyles() {
  if (document.getElementById("ranking-styles")) return;
  const style = document.createElement("style");
  style.id = "ranking-styles";
  style.textContent = `
    body { background: var(--gray-light); }

    .live-indicator {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--success);
      animation: pulse 2s infinite;
    }

    .my-banner {
      background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
      border-radius: var(--radius);
      padding: 1.25rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 1rem;
      box-shadow: var(--shadow-lg);
    }

    .my-banner-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .my-banner-pos {
      font-size: 2.5rem;
      line-height: 1;
    }

    .my-banner-label {
      font-size: 0.78rem;
      color: var(--turq);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .my-banner-name {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--white);
    }

    .my-banner-stats {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .my-banner-stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.15rem;
    }

    .my-banner-val {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--white);
      line-height: 1;
    }

    .my-banner-key {
      font-size: 0.72rem;
      color: var(--turq);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .my-row td { background: rgba(53,198,244,0.06); }
    .my-row:hover td { background: rgba(53,198,244,0.1) !important; }

    .accuracy-pill {
      display: inline-block;
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
      font-size: 0.82rem;
      font-weight: 600;
      background: var(--gray-mid);
      color: var(--text-light);
    }

    .accuracy-pill.acc-good {
      background: rgba(34,197,94,0.12);
      color: var(--success);
    }

    .no-position-banner {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: var(--white);
      border: 2px dashed var(--gray-mid);
      border-radius: var(--radius);
      padding: 1.25rem 1.5rem;
      margin-bottom: 1.5rem;
      color: var(--text-light);
    }

    .no-position-banner i {
      font-size: 1.5rem;
      color: var(--turq-dark);
      flex-shrink: 0;
    }

    .no-position-title {
      font-weight: 600;
      color: var(--navy);
      margin-bottom: 0.2rem;
    }

    .no-position-sub { font-size: 0.85rem; }

    @media (max-width: 640px) {
      .my-banner { flex-direction: column; }
      .my-banner-stats { gap: 1rem; }
      .ranking-table th:nth-child(5),
      .ranking-table td:nth-child(5),
      .ranking-table th:nth-child(6),
      .ranking-table td:nth-child(6) { display: none; }
    }
  `;
  document.head.appendChild(style);
}