import { matchesAPI, predictionsAPI } from "../js/services/api.js";
import { showToast } from "../js/components/toast.js";
import { showSkeleton } from "../js/components/loader.js";

const PHASES = [
  { key: "all", label: "Todos" },
  { key: "group", label: "Grupos" },
  { key: "round_of_32", label: "Ronda 32" },
  { key: "round_of_16", label: "Octavos" },
  { key: "quarterfinal", label: "Cuartos" },
  { key: "semifinal", label: "Semis" },
  { key: "third_place", label: "3er lugar" },
  { key: "final", label: "Final" },
];

const WORLD_CUP_START = new Date("2026-06-11T11:00:00Z"); // 6am Colombia

const GROUPS = ["Group A", "Group B", "Group C", "Group D", "Group E", "Group F",
  "Group G", "Group H", "Group I", "Group J", "Group K", "Group L"];

let allMatches = [];
let myPredictions = {};
let currentPhase = "all";
let pendingSaves = {};
let countdownInterval = null;

export async function renderPredictions(container) {
  if (window._predictionsCountdown) {
    clearInterval(window._predictionsCountdown);
    window._predictionsCountdown = null;
  }

  container.innerHTML = `
    <div class="predictions-page">

      <div class="section-header">
        <h1 class="section-title">
          <i class="fas fa-futbol"></i> Mis predicciones
        </h1>
        <div class="predictions-actions">
          <span id="save-status" class="save-status"></span>
          <button class="btn btn-primary" id="save-all-btn" style="display:none">
            <i class="fas fa-save"></i> Guardar todo
          </button>
        </div>
      </div>

      <!-- Barra de progreso -->
      <div class="prediction-progress card" style="margin-bottom:1.5rem;padding:1.25rem">
        <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem">
          <span style="font-weight:600;color:var(--navy)" id="progress-label">Cargando...</span>
          <span style="font-size:0.85rem;color:var(--text-light)" id="progress-pct">0%</span>
        </div>
        <div class="rank-progress">
          <div class="rank-progress-bar" id="progress-bar" style="width:0%"></div>
        </div>
        <p style="font-size:0.8rem;color:var(--text-light);margin-top:0.4rem">
          Predice todos los partidos de grupos antes del 11 de junio
        </p>
      </div>

      <!-- Tabs de fases -->
      <div class="phase-tabs" id="phase-tabs">
        ${PHASES.map(p => `
          <button class="phase-tab ${p.key === "all" ? "active" : ""}"
            data-phase="${p.key}">${p.label}
          </button>
        `).join("")}
      </div>

      <!-- Contenido principal -->
      <div id="predictions-content">
        ${showSkeleton(5)}
      </div>

    </div>
  `;

  injectPredictionsStyles();
  await loadPredictionsData();
  setupTabListeners();
}

async function loadPredictionsData() {
  try {
    const [matchesRes, predsRes] = await Promise.all([
      matchesAPI.getAll(),
      predictionsAPI.getMyPredictions(),
    ]);

    allMatches = matchesRes.matches || [];
    const preds = predsRes.predictions || [];
    preds.forEach(p => { myPredictions[p.fixture_id] = p; });

    const groupMatches = allMatches.filter(m => m.phase === "group");
    const groupPreds = preds.filter(p => {
      const match = allMatches.find(m => m.fixture_id === p.fixture_id);
      return match?.phase === "group";
    });
    window._groupsComplete = groupPreds.length >= groupMatches.length;

    if (window._groupsComplete) {
      try {
        window._userBracket = await matchesAPI.getMyBracket();
      } catch (e) {
        window._userBracket = null;
      }
    }

    updateProgressBar();
    renderContent();

  } catch (err) {
    showToast("Error cargando partidos", "error");
    document.getElementById("predictions-content").innerHTML = `
      <div class="empty-state">
        <i class="fas fa-exclamation-triangle"></i>
        <p>No se pudieron cargar los partidos.</p>
      </div>
    `;
  }
}

function updateProgressBar() {
  const total = allMatches.filter(m => m.phase === "group").length;
  const predicted = Object.values(myPredictions)
    .filter(p => allMatches.find(m => m.fixture_id === p.fixture_id)?.phase === "group")
    .length;
  const pct = total > 0 ? Math.round(predicted / total * 100) : 0;

  document.getElementById("progress-label").textContent =
    `${predicted} de ${total} partidos de grupos predichos`;
  document.getElementById("progress-pct").textContent = `${pct}%`;
  document.getElementById("progress-bar").style.width = `${pct}%`;
}

function setupTabListeners() {
  document.getElementById("phase-tabs").addEventListener("click", (e) => {
    const tab = e.target.closest(".phase-tab");
    if (!tab) return;
    document.querySelectorAll(".phase-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentPhase = tab.dataset.phase;
    renderContent();
  });
}

function renderContent() {
  const container = document.getElementById("predictions-content");
  const isGroupPhase = currentPhase === "all" || currentPhase === "group";

  if (isGroupPhase) {
    renderGroupsWithTables(container);
  } else {
    renderKnockoutMatches(container);
  }
}

// ── GRUPOS CON TABLAS ─────────────────────────────────────────────

function renderGroupsWithTables(container) {
  const groupMatches = currentPhase === "all"
    ? allMatches.filter(m => m.phase === "group")
    : allMatches.filter(m => m.phase === "group");

  // Agrupar partidos por grupo
  const grouped = {};
  groupMatches.forEach(m => {
    const g = m.group || "Sin grupo";
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(m);
  });

  const sortedGroups = Object.keys(grouped).sort();

  container.innerHTML = sortedGroups.map(group => `
    <div class="group-section" id="section-${group.replace(" ", "-")}">
      <h2 class="group-title">
        <i class="fas fa-layer-group"></i> ${group}
      </h2>
      <div class="group-layout">
        <!-- Partidos -->
        <div class="group-matches">
          ${grouped[group].map(m => renderMatchCard(m)).join("")}
        </div>
        <!-- Tabla -->
        <div class="group-table-wrap">
          ${renderGroupTable(group, grouped[group])}
        </div>
      </div>
    </div>
  `).join("");

  attachInputListeners();
  startCountdownTicker();
}

function renderGroupTable(groupName, matches) {
  const table = calculateGroupTable(groupName, matches);

  return `
    <div class="group-standing-card">
      <div class="group-standing-header">
        <span>Equipo</span>
        <span title="Partidos jugados">PJ</span>
        <span title="Puntos">Pts</span>
        <span title="Diferencia de goles">DG</span>
        <span title="Goles a favor">GF</span>
      </div>
      ${table.map((team, i) => `
        <div class="group-standing-row ${i < 2 ? "qualifies" : i === 2 ? "third-place" : "eliminated"}">
          <div class="standing-pos">${i + 1}</div>
          <div class="standing-team">
            <img src="${team.logo}" class="standing-logo" />
            <span>${team.name}</span>
          </div>
          <span class="standing-pj">${team.pj}</span>
          <span class="standing-pts">${team.pts}</span>
          <span class="standing-dg ${team.dg > 0 ? "pos" : team.dg < 0 ? "neg" : ""}">
            ${team.dg > 0 ? "+" : ""}${team.dg}
          </span>
          <span class="standing-gf">${team.gf}</span>
        </div>
      `).join("")}
      <div class="standing-legend">
        <span class="legend-qualifies">■ Clasifica</span>
        <span class="legend-third">■ Posible 3ro</span>
        <span class="legend-out">■ Eliminado</span>
      </div>
    </div>
  `;
}

function calculateGroupTable(groupName, matches) {
  const teams = {};

  matches.forEach(match => {
    const homeCode = match.home_team.code;
    const awayCode = match.away_team.code;

    for (const [code, data] of [[homeCode, match.home_team], [awayCode, match.away_team]]) {
      if (!teams[code]) {
        teams[code] = {
          code, name: data.name, logo: data.logo,
          pts: 0, pj: 0, pg: 0, pe: 0, pp: 0,
          gf: 0, gc: 0, dg: 0,
          // Para desempate directo
          h2h: {},
        };
      }
    }

    const pred = myPredictions[match.fixture_id];
    if (!pred) return;

    const hg = pred.predicted_home;
    const ag = pred.predicted_away;

    teams[homeCode].pj += 1;
    teams[awayCode].pj += 1;
    teams[homeCode].gf += hg;
    teams[homeCode].gc += ag;
    teams[awayCode].gf += ag;
    teams[awayCode].gc += hg;

    // Resultado directo para desempate
    if (!teams[homeCode].h2h[awayCode]) teams[homeCode].h2h[awayCode] = { pts: 0, dg: 0, gf: 0 };
    if (!teams[awayCode].h2h[homeCode]) teams[awayCode].h2h[homeCode] = { pts: 0, dg: 0, gf: 0 };

    if (hg > ag) {
      teams[homeCode].pts += 3; teams[homeCode].pg += 1; teams[awayCode].pp += 1;
      teams[homeCode].h2h[awayCode].pts += 3;
    } else if (hg < ag) {
      teams[awayCode].pts += 3; teams[awayCode].pg += 1; teams[homeCode].pp += 1;
      teams[awayCode].h2h[homeCode].pts += 3;
    } else {
      teams[homeCode].pts += 1; teams[homeCode].pe += 1;
      teams[awayCode].pts += 1; teams[awayCode].pe += 1;
      teams[homeCode].h2h[awayCode].pts += 1;
      teams[awayCode].h2h[homeCode].pts += 1;
    }

    teams[homeCode].h2h[awayCode].dg += (hg - ag);
    teams[awayCode].h2h[homeCode].dg += (ag - hg);
    teams[homeCode].h2h[awayCode].gf += hg;
    teams[awayCode].h2h[homeCode].gf += ag;
  });

  // Calcular diferencia de goles
  Object.values(teams).forEach(t => { t.dg = t.gf - t.gc; });

  const teamsList = Object.values(teams);

  // Ordenar con criterios de desempate FIFA
  return teamsList.sort((a, b) => {
    // 1. Puntos
    if (b.pts !== a.pts) return b.pts - a.pts;
    // 2. Diferencia de goles
    if (b.dg !== a.dg) return b.dg - a.dg;
    // 3. Goles a favor
    if (b.gf !== a.gf) return b.gf - a.gf;
    // 4. Resultado directo (puntos)
    const h2h_pts_a = a.h2h[b.code]?.pts || 0;
    const h2h_pts_b = b.h2h[a.code]?.pts || 0;
    if (h2h_pts_b !== h2h_pts_a) return h2h_pts_b - h2h_pts_a;
    // 5. Resultado directo (diferencia de goles)
    const h2h_dg_a = a.h2h[b.code]?.dg || 0;
    const h2h_dg_b = b.h2h[a.code]?.dg || 0;
    if (h2h_dg_b !== h2h_dg_a) return h2h_dg_b - h2h_dg_a;
    // 6. Resultado directo (goles a favor)
    const h2h_gf_a = a.h2h[b.code]?.gf || 0;
    const h2h_gf_b = b.h2h[a.code]?.gf || 0;
    return h2h_gf_b - h2h_gf_a;
  });
}

// ── ELIMINATORIAS ─────────────────────────────────────────────────

function renderKnockoutMatches(container) {
  const filtered = allMatches.filter(m => m.phase === currentPhase);

  if (!filtered.length) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-futbol"></i>
        <p>No hay partidos en esta fase todavía</p>
      </div>
    `;
    return;
  }

  if (!window._groupsComplete) {
    container.innerHTML = `
      <div class="knockout-locked-msg">
        <div class="knockout-locked-icon">🔒</div>
        <h3>Completa las predicciones de grupos primero</h3>
        <p>Necesitas predecir los 72 partidos de la fase de grupos para
        desbloquear las eliminatorias y ver los equipos proyectados.</p>
        <button class="btn btn-primary" onclick="window.navigate('/predictions')
          ; document.querySelector('[data-phase=group]').click()">
          <i class="fas fa-futbol"></i> Ir a fase de grupos
        </button>
      </div>
    `;
    return;
  }

  // Agrupar por fecha
  const grouped = {};
  filtered.forEach(m => {
    const date = new Date(m.kickoff).toLocaleDateString("es-CO", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(m);
  });

  container.innerHTML = Object.entries(grouped).map(([date, matches]) => `
    <div class="match-group">
      <h3 class="match-date-header">${date}</h3>
      ${matches.map(m => renderMatchCard(m)).join("")}
    </div>
  `).join("");

  attachInputListeners();
  startCountdownTicker();
}

// ── TARJETA DE PARTIDO ────────────────────────────────────────────

function renderMatchCard(match) {
  const isLocked = isMatchLocked(match.kickoff);
  const isGroup = match.phase === "group";
  const isKnockout = !isGroup;
  const knockoutLocked = isKnockout && !window._groupsComplete;
  const pred = myPredictions[match.fixture_id];
  const isFinished = match.status === "FT";
  const homeVal = pred !== undefined ? pred.predicted_home : "";
  const awayVal = pred !== undefined ? pred.predicted_away : "";
  const hasPred = pred !== undefined;
  const penaltyWinner = pred?.penalty_winner || "";

  // Verificar si hay empate en eliminatoria
  const isDraw = homeVal !== "" && awayVal !== "" &&
    parseInt(homeVal) === parseInt(awayVal);
  const needsPenalty = isKnockout && isDraw && !isLocked && !knockoutLocked;

  let homeTeam = match.home_team;
  let awayTeam = match.away_team;

  if (isKnockout && window._userBracket?.bracket?.[match.fixture_id]) {
    const projected = window._userBracket.bracket[match.fixture_id];
    homeTeam = projected.home_team;
    awayTeam = projected.away_team;
  }

  const effectiveLocked = isLocked || knockoutLocked;

  const statusBadge = isFinished
    ? `<span class="badge badge-finished">Finalizado</span>`
    : knockoutLocked
      ? `<span class="badge badge-locked"><i class="fas fa-lock"></i> Completa grupos primero</span>`
      : effectiveLocked
        ? `<span class="badge badge-locked"><i class="fas fa-lock"></i> Cerrado</span>`
        : needsPenalty
          ? `<span class="badge badge-penalty"><i class="fas fa-circle-dot"></i> Define ganador en penales</span>`
          : hasPred
            ? `<span class="badge badge-saved"><i class="fas fa-check"></i> Guardado</span>`
            : `<span class="badge badge-empty"><i class="fas fa-pencil-alt"></i> Sin predecir</span>`;

  const pointsDisplay = pred?.points !== null && pred?.points !== undefined
    ? `<div class="pred-points ${pred.points > 0 ? "pts-good" : "pts-zero"}">
         +${pred.points} pts
       </div>`
    : "";

  const realScore = isFinished
    ? `<div class="real-score">
         Resultado: <strong>${match.score.home} - ${match.score.away}</strong>
       </div>`
    : "";

  // Selector de penales
  const penaltySelector = needsPenalty ? `
    <div class="penalty-selector" id="penalty-${match.fixture_id}">
      <span class="penalty-label">Ganador en penales:</span>
      <div class="penalty-options">
        <button class="penalty-btn ${penaltyWinner === 'home' ? 'selected' : ''}"
          data-fixture="${match.fixture_id}" data-winner="home">
          ${homeTeam.name}
        </button>
        <button class="penalty-btn ${penaltyWinner === 'away' ? 'selected' : ''}"
          data-fixture="${match.fixture_id}" data-winner="away">
          ${awayTeam.name}
        </button>
      </div>
    </div>
  ` : "";

  return `
    <div class="match-pred-card
      ${effectiveLocked ? "locked" : ""}
      ${hasPred && !needsPenalty ? "has-pred" : ""}
      ${knockoutLocked ? "knockout-locked" : ""}
      ${needsPenalty ? "needs-penalty" : ""}">

      <div class="mpc-top">
        ${statusBadge}
        <span class="mpc-round">${match.round || match.phase}</span>
        ${pointsDisplay}
      </div>

      <div class="mpc-body">
        <div class="mpc-team home">
          <img src="${homeTeam.logo}" alt="${homeTeam.name}" class="mpc-logo" />
          <span class="mpc-name">${homeTeam.name}</span>
        </div>

        <div class="mpc-center">
          ${effectiveLocked
      ? knockoutLocked
        ? `<div class="tbd-display">?</div>`
        : `<div class="score-display">
                   <span>${homeVal !== "" ? homeVal : "-"}</span>
                   <span class="score-sep">:</span>
                   <span>${awayVal !== "" ? awayVal : "-"}</span>
                 </div>`
      : `<div class="score-input-group">
                 <input type="text" inputmode="numeric" class="score-input"
                   data-fixture="${match.fixture_id}" data-side="home"
                   value="${homeVal}" placeholder="-" maxlength="2" />
                 <span class="score-separator">:</span>
                 <input type="text" inputmode="numeric" class="score-input"
                   data-fixture="${match.fixture_id}" data-side="away"
                   value="${awayVal}" placeholder="-" maxlength="2" />
               </div>`
    }
          <div class="mpc-time" id="countdown-${match.fixture_id}">
            ${getCountdownOrTime(match.kickoff, match.status)}
          </div>
          ${realScore}
        </div>

        <div class="mpc-team away">
          <img src="${awayTeam.logo}" alt="${awayTeam.name}" class="mpc-logo" />
          <span class="mpc-name">${awayTeam.name}</span>
        </div>
      </div>

      ${penaltySelector}
    </div>
  `;
}

// ── INPUT LISTENERS ───────────────────────────────────────────────

function attachInputListeners() {
  // Listeners para botones de penales
  document.querySelectorAll(".penalty-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const fixtureId = parseInt(btn.dataset.fixture);
      const winner = btn.dataset.winner;

      // Actualizar UI
      document.querySelectorAll(
        `.penalty-btn[data-fixture="${fixtureId}"]`
      ).forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");

      // Guardar en pendingSaves
      if (!pendingSaves[fixtureId]) pendingSaves[fixtureId] = {};
      pendingSaves[fixtureId].penalty_winner = winner;

      // Actualizar predicción local
      if (myPredictions[fixtureId]) {
        myPredictions[fixtureId].penalty_winner = winner;
      }

      document.getElementById("save-all-btn").style.display = "flex";
      document.getElementById("save-status").textContent = "Cambios sin guardar...";
    });
  });
}

function updateGroupTables() {
  // Re-renderizar solo las tablas sin tocar los inputs
  GROUPS.forEach(group => {
    const tableWrap = document.querySelector(
      `#section-${group.replace(" ", "-")} .group-table-wrap`
    );
    if (!tableWrap) return;

    const groupMatches = allMatches.filter(m => m.group === group);
    if (!groupMatches.length) return;

    // Leer valores actuales de los inputs para predicciones temporales
    groupMatches.forEach(match => {
      const homeInput = document.querySelector(
        `.score-input[data-fixture="${match.fixture_id}"][data-side="home"]`
      );
      const awayInput = document.querySelector(
        `.score-input[data-fixture="${match.fixture_id}"][data-side="away"]`
      );

      if (homeInput && awayInput) {
        const hv = parseInt(homeInput.value);
        const av = parseInt(awayInput.value);
        if (!isNaN(hv) && !isNaN(av)) {
          myPredictions[match.fixture_id] = {
            ...myPredictions[match.fixture_id],
            fixture_id: match.fixture_id,
            predicted_home: hv,
            predicted_away: av,
          };
        }
      }
    });

    tableWrap.innerHTML = renderGroupTable(group, groupMatches);
  });
}

function handleScoreChange(e) {
  const fixtureId = parseInt(e.target.dataset.fixture);
  const side = e.target.dataset.side;
  const value = parseInt(e.target.value);

  if (!pendingSaves[fixtureId]) pendingSaves[fixtureId] = {};
  pendingSaves[fixtureId][side] = isNaN(value) ? 0 : value;

  document.getElementById("save-all-btn").style.display = "flex";
  document.getElementById("save-status").textContent = "Cambios sin guardar...";
}

async function saveAllPending() {
  const allInputs = document.querySelectorAll(".score-input");
  const collected = {};

  allInputs.forEach(input => {
    const fixtureId = parseInt(input.dataset.fixture);
    const side = input.dataset.side;
    const raw = input.value.trim();
    const value = parseInt(raw);
    if (raw === "" || isNaN(value)) return;
    if (!collected[fixtureId]) collected[fixtureId] = {};
    collected[fixtureId][side] = value;
  });

  const merged = { ...collected };
  Object.entries(pendingSaves).forEach(([id, scores]) => {
    if (!merged[id]) merged[id] = {};
    Object.assign(merged[id], scores);
  });

  const batch = Object.entries(merged)
    .filter(([id, scores]) => scores.home !== undefined && scores.away !== undefined)
    .map(([id, scores]) => ({
      fixture_id: parseInt(id),
      predicted_home: scores.home,
      predicted_away: scores.away,
      penalty_winner: scores.penalty_winner || null,
    }));

  if (!batch.length) {
    showToast("No hay predicciones completas para guardar", "warning");
    return;
  }

  document.getElementById("save-status").textContent = "Guardando...";
  document.getElementById("save-all-btn").disabled = true;

  try {
    const result = await predictionsAPI.saveBatch(batch);
    pendingSaves = {};

    batch.forEach(p => {
      myPredictions[p.fixture_id] = {
        ...myPredictions[p.fixture_id],
        fixture_id: p.fixture_id,
        predicted_home: p.predicted_home,
        predicted_away: p.predicted_away,
      };
    });

    showToast(`${result.saved} predicciones guardadas`, "success");

    if (result.skipped > 0) {
      showToast(`${result.skipped} partidos omitidos (ya iniciaron)`, "warning");
    }

    // Recargar datos frescos y re-renderizar
    await loadPredictionsData();

  } catch (err) {
    showToast("Error guardando predicciones", "error");
    document.getElementById("save-status").textContent = "Error al guardar";
  } finally {
    const btn = document.getElementById("save-all-btn");
    if (btn) btn.disabled = false;
  }
}

// ── COUNTDOWN ─────────────────────────────────────────────────────

function isMatchLocked(kickoff) {
  return new Date() >= WORLD_CUP_START;
}

function formatKickoff(kickoff) {
  const d = new Date(kickoff);
  return d.toLocaleString("es-CO", {
    month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit"
  });
}

function getCountdownOrTime(kickoff, status) {
  const diff = new Date(kickoff) - new Date();
  if (status === "FT") return "Finalizado";
  if (status === "1H") return `<span style="color:var(--error);font-weight:700">⚽ Primer tiempo</span>`;
  if (status === "HT") return `<span style="color:var(--warning);font-weight:700">⏸ Descanso</span>`;
  if (status === "2H") return `<span style="color:var(--error);font-weight:700">⚽ Segundo tiempo</span>`;
  if (diff <= 0) return `<span style="color:var(--error);font-weight:600">Comenzando...</span>`;
  return formatCountdown(diff, kickoff);
}

function formatCountdown(diff, kickoff) {
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days > 1) return `<span style="color:var(--text-light)">📅 ${formatKickoff(kickoff)}</span>`;
  if (days === 1) return `<span style="color:var(--turq-dark)">⏱ Mañana ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}</span>`;
  if (hours > 0) return `<span style="color:var(--turq-dark)">⏱ ${hours}h ${String(minutes).padStart(2, "0")}m</span>`;
  return `<span style="color:var(--warning);font-weight:700">⏱ ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}</span>`;
}

function startCountdownTicker() {
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    allMatches.forEach(match => {
      const el = document.getElementById(`countdown-${match.fixture_id}`);
      if (!el) return;
      if (["FT", "1H", "HT", "2H"].includes(match.status)) return;
      const diff = new Date(match.kickoff) - new Date();
      if (diff <= 0) {
        el.innerHTML = `<span style="color:var(--error);font-weight:600">Comenzando...</span>`;
        return;
      }
      el.innerHTML = formatCountdown(diff, match.kickoff);
    });
  }, 1000);
  window._predictionsCountdown = countdownInterval;
}

// Botón guardar todo manual
document.addEventListener("click", (e) => {
  if (e.target.closest("#save-all-btn")) saveAllPending();
});

// ── ESTILOS ───────────────────────────────────────────────────────

function injectPredictionsStyles() {
  if (document.getElementById("predictions-styles")) return;
  const style = document.createElement("style");
  style.id = "predictions-styles";
  style.textContent = `
    body { background: var(--gray-light); }

    .predictions-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .save-status {
      font-size: 0.85rem;
      color: var(--text-light);
      font-weight: 500;
    }

    /* ── Sección de grupo ── */
    .group-section {
      margin-bottom: 2.5rem;
    }

    .group-title {
      font-size: 1rem;
      font-weight: 800;
      color: var(--navy);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .group-layout {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 1.25rem;
      align-items: start;
    }

        /* ── Tabla de posiciones del grupo ── */
        .group-standing-card {
          background: var(--white);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
          position: sticky;
          top: 80px;
        }

    .group-standing-header {
      display: grid;
      grid-template-columns: 20px 1fr 28px 32px 32px 28px;
      padding: 0.5rem 0.6rem;
      background: var(--navy);
      color: var(--white);
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      gap: 0.2rem;
    }

    .group-standing-row {
      display: grid;
      grid-template-columns: 20px 1fr 28px 32px 32px 28px;
      padding: 0.5rem 0.6rem;
      align-items: center;
      gap: 0.2rem;
      border-bottom: 1px solid var(--gray-mid);
      font-size: 0.78rem;
      transition: var(--transition);
    }

    .group-standing-row:last-of-type { border-bottom: none; }
    .group-standing-row:hover { background: var(--gray-light); }

    .group-standing-row.qualifies {
      border-left: 3px solid var(--turq);
    }

    .group-standing-row.third-place {
      border-left: 3px solid var(--warning);
    }

    .group-standing-row.eliminated {
      border-left: 3px solid transparent;
      opacity: 0.7;
    }

    .standing-pos {
      font-weight: 700;
      color: var(--navy);
      text-align: center;
      font-size: 0.78rem;
    }

    .standing-team {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-weight: 600;
      color: var(--text);
      overflow: hidden;
    }

    .standing-logo {
      width: 20px;
      height: 20px;
      object-fit: contain;
      flex-shrink: 0;
    }

    .standing-team span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.75rem;
      max-width: 80px;
    }

    .standing-pts {
      font-weight: 800;
      color: var(--navy);
      text-align: center;
    }

    .standing-pj, .standing-gf {
      text-align: center;
      color: var(--text-light);
    }

    .standing-dg {
      text-align: center;
      font-weight: 600;
    }

    .standing-dg.pos { color: var(--success); }
    .standing-dg.neg { color: var(--error); }

    .standing-legend {
      display: flex;
      gap: 0.75rem;
      padding: 0.5rem 0.75rem;
      background: var(--gray-light);
      font-size: 0.68rem;
      color: var(--text-light);
    }

    .legend-qualifies { color: var(--turq-dark); }
    .legend-third     { color: var(--warning); }
    .legend-out       { color: var(--gray); }

    /* ── Match cards ── */
    .match-group { margin-bottom: 1.5rem; }

    .match-date-header {
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-light);
      margin-bottom: 0.6rem;
      padding-left: 0.25rem;
    }

    .match-pred-card {
      background: var(--white);
      border-radius: var(--radius);
      padding: 0.85rem 1rem;
      margin-bottom: 0.6rem;
      box-shadow: var(--shadow);
      border: 2px solid transparent;
      transition: var(--transition);
    }

    .match-pred-card:not(.has-pred):not(.locked) {
      border: 2px dashed var(--gray-mid);
    }

    .match-pred-card:not(.has-pred):not(.locked):hover {
      border-color: var(--turq);
      border-style: solid;
    }

    .match-pred-card:hover { border-color: var(--turq); }
    .match-pred-card.locked { opacity: 0.75; }
    .match-pred-card.locked:hover { border-color: var(--gray-mid); }
    .match-pred-card.has-pred { border-left: 4px solid var(--success); }
    .match-pred-card.knockout-locked {
      opacity: 0.5;
      filter: grayscale(30%);
    }

    .mpc-top {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.6rem;
    }

    .mpc-round {
      font-size: 0.72rem;
      color: var(--text-light);
      margin-left: auto;
    }

    .mpc-body {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: 0.75rem;
    }

    .mpc-team {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.3rem;
    }

    .mpc-logo {
      width: 38px;
      height: 38px;
      object-fit: contain;
    }

    .mpc-name {
      font-size: 0.78rem;
      font-weight: 600;
      text-align: center;
      color: var(--text);
    }

    .mpc-center {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.35rem;
    }

    .mpc-time {
      font-size: 0.72rem;
      color: var(--text-light);
      text-align: center;
    }

    .score-display {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--navy);
    }

    .score-sep { color: var(--gray); }

    .real-score {
      font-size: 0.72rem;
      color: var(--text-light);
      text-align: center;
    }

    .pred-points {
      font-size: 0.78rem;
      font-weight: 700;
      padding: 0.15rem 0.5rem;
      border-radius: 999px;
    }

    .pts-good { background: rgba(34,197,94,0.12); color: var(--success); }
    .pts-zero { background: var(--gray-mid); color: var(--text-light); }

    .badge-saved {
      background: rgba(34,197,94,0.12);
      color: var(--success);
    }

    .badge-empty {
      background: rgba(53,198,244,0.1);
      color: var(--turq-dark);
    }

    .score-input:placeholder-shown {
      background: var(--gray-light);
      border-color: var(--gray-mid);
      color: var(--gray);
    }

    .score-input:not(:placeholder-shown) {
      background: var(--white);
      border-color: var(--turq);
      color: var(--navy);
      font-weight: 700;
    }

    .tbd-display {
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--gray);
    }

    /* ── Knockout locked msg ── */
    .knockout-locked-msg {
      text-align: center;
      padding: 4rem 2rem;
      background: var(--white);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
    }

    .knockout-locked-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .knockout-locked-msg h3 {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--navy);
      margin-bottom: 0.5rem;
    }

    .knockout-locked-msg p {
      color: var(--text-light);
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }

    .badge-penalty {
      background: rgba(245,158,11,0.15);
      color: #F59E0B;
      animation: pulse 1.5s infinite;
    }

    .match-pred-card.needs-penalty {
      border: 2px solid rgba(245,158,11,0.4);
    }

    .penalty-selector {
      margin-top: 0.75rem;
      padding-top: 0.75rem;
      border-top: 1px solid var(--gray-mid);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .penalty-label {
      font-size: 0.82rem;
      font-weight: 600;
      color: #F59E0B;
      white-space: nowrap;
    }

    .penalty-options {
      display: flex;
      gap: 0.5rem;
    }

    .penalty-btn {
      padding: 0.35rem 0.85rem;
      border-radius: var(--radius-sm);
      font-size: 0.82rem;
      font-weight: 600;
      border: 2px solid var(--gray-mid);
      background: var(--white);
      color: var(--text);
      cursor: pointer;
      transition: var(--transition);
    }

    .penalty-btn:hover {
      border-color: #F59E0B;
      color: #F59E0B;
    }

    .penalty-btn.selected {
      background: #F59E0B;
      border-color: #F59E0B;
      color: var(--white);
    }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .group-layout {
        grid-template-columns: 1fr;
      }
      .group-standing-card {
        position: static;
      }
    }

    @media (max-width: 640px) {
      .mpc-logo { width: 28px; height: 28px; }
      .mpc-name { font-size: 0.68rem; }
      .score-input { width: 38px; height: 38px; font-size: 1rem; }
    }
  `;
  document.head.appendChild(style);
}