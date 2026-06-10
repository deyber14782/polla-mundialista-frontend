import { matchesAPI, predictionsAPI } from "../js/services/api.js";
import { showToast } from "../js/components/toast.js";
import { showSkeleton } from "../js/components/loader.js";

const PHASES = [
  { key: "all",          label: "Todos" },
  { key: "group",        label: "Grupos" },
  { key: "round_of_32",  label: "Ronda 32" },
  { key: "round_of_16",  label: "Octavos" },
  { key: "quarterfinal", label: "Cuartos" },
  { key: "semifinal",    label: "Semifinales" },
  { key: "third_place",  label: "3er lugar" },
  { key: "final",        label: "Final" },
  { key: "special",      label: "Especiales" },
];

// Cada fase requiere que la anterior esté completa
const PHASE_REQUIRES = {
  round_of_32:  "group",
  round_of_16:  "round_of_32",
  quarterfinal: "round_of_16",
  semifinal:    "quarterfinal",
  third_place:  "semifinal",
  final:        "semifinal",
};

const PHASE_LABELS = {
  group:        "Fase de Grupos",
  round_of_32:  "Ronda de 32",
  round_of_16:  "Octavos de Final",
  quarterfinal: "Cuartos de Final",
  semifinal:    "Semifinales",
  third_place:  "Tercer Puesto",
  final:        "Final",
};

const WORLD_CUP_START = new Date("2026-06-18T11:00:00Z");

const GROUPS = ["Group A","Group B","Group C","Group D","Group E","Group F",
  "Group G","Group H","Group I","Group J","Group K","Group L"];

let allMatches = [];
let myPredictions = {};
let currentPhase = "all";
let pendingSaves = {};
let countdownInterval = null;

// Tracking de completitud por fase
window._phaseComplete = {};

function isPhaseComplete(phase) {
  return !!window._phaseComplete[phase];
}

function isPhaseUnlocked(phase) {
  if (phase === "group") return true;
  const req = PHASE_REQUIRES[phase];
  if (!req) return true;
  return isPhaseComplete(req);
}

function computePhaseCompletion() {
  const phases = ["group","round_of_32","round_of_16","quarterfinal","semifinal","third_place","final"];
  window._phaseComplete = {};

  for (const phase of phases) {
    const phaseMatches = allMatches.filter(m => m.phase === phase);
    if (phaseMatches.length === 0) {
      window._phaseComplete[phase] = false;
      continue;
    }
    const predicted = phaseMatches.filter(m => myPredictions[m.fixture_id] !== undefined);
    window._phaseComplete[phase] = predicted.length >= phaseMatches.length;
  }
}

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

      <div class="phase-tabs" id="phase-tabs">
        ${PHASES.map(p => `
          <button class="phase-tab ${p.key === "all" ? "active" : ""}"
            data-phase="${p.key}">${p.label}
          </button>
        `).join("")}
      </div>

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
    const [matchesRes, predsRes, topScorerRes] = await Promise.all([
      matchesAPI.getAll(),
      predictionsAPI.getMyPredictions(),
      predictionsAPI.getMyTopScorer().catch(() => ({ player_name: "", team_name: "" })),
    ]);

    allMatches = matchesRes.matches || [];
    const preds = predsRes.predictions || [];
    preds.forEach(p => { myPredictions[p.fixture_id] = p; });

    window._topScorer = topScorerRes;

    // Calcular completitud por fase
    computePhaseCompletion();

    // Mantener compatibilidad
    window._groupsComplete = isPhaseComplete("group");

    // Cargar bracket si grupos están completos (necesario para proyectar equipos)
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
  const isGroupPhase   = currentPhase === "all" || currentPhase === "group";
  const isSpecialPhase = currentPhase === "special";

  if (isGroupPhase) {
    renderGroupsWithTables(container);
  } else if (isSpecialPhase) {
    renderSpecialPredictions(container);
  } else {
    renderKnockoutMatches(container);
  }
}

// ── GRUPOS CON TABLAS ─────────────────────────────────────────────

function renderGroupsWithTables(container) {
  const groupMatches = allMatches.filter(m => m.phase === "group");

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
        <div class="group-matches">
          ${grouped[group].map(m => renderMatchCard(m)).join("")}
        </div>
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
        <span></span>
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
            <img src="${team.logo}" class="standing-logo" alt="${team.name}" />
            <span class="standing-team-name">${team.name}</span>
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
          gf: 0, gc: 0, dg: 0, h2h: {},
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

  Object.values(teams).forEach(t => { t.dg = t.gf - t.gc; });

  return Object.values(teams).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.dg !== a.dg) return b.dg - a.dg;
    if (b.gf !== a.gf) return b.gf - a.gf;
    const h2h_pts_a = a.h2h[b.code]?.pts || 0;
    const h2h_pts_b = b.h2h[a.code]?.pts || 0;
    if (h2h_pts_b !== h2h_pts_a) return h2h_pts_b - h2h_pts_a;
    const h2h_dg_a = a.h2h[b.code]?.dg || 0;
    const h2h_dg_b = b.h2h[a.code]?.dg || 0;
    if (h2h_dg_b !== h2h_dg_a) return h2h_dg_b - h2h_dg_a;
    const h2h_gf_a = a.h2h[b.code]?.gf || 0;
    const h2h_gf_b = b.h2h[a.code]?.gf || 0;
    return h2h_gf_b - h2h_gf_a;
  });
}

// ── ELIMINATORIAS (con desbloqueo progresivo) ─────────────────────

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

  // Verificar si esta fase está desbloqueada
  if (!isPhaseUnlocked(currentPhase)) {
    const requiredPhase = PHASE_REQUIRES[currentPhase];
    const requiredLabel = PHASE_LABELS[requiredPhase] || requiredPhase;
    const reqMatches = allMatches.filter(m => m.phase === requiredPhase);
    const reqPredicted = reqMatches.filter(m => myPredictions[m.fixture_id] !== undefined).length;

    container.innerHTML = `
      <div class="knockout-locked-msg">
        <div class="knockout-locked-icon">🔒</div>
        <h3>Completa ${requiredLabel} primero</h3>
        <p>Necesitas predecir todos los partidos de ${requiredLabel} para desbloquear esta fase.
        Llevas <strong>${reqPredicted} de ${reqMatches.length}</strong> predicciones.</p>
        <button class="btn btn-primary" onclick="document.querySelector('[data-phase=${requiredPhase}]').click()">
          <i class="fas fa-futbol"></i> Ir a ${requiredLabel}
        </button>
      </div>
    `;
    return;
  }

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

// ── PREDICCIONES ESPECIALES ───────────────────────────────────────

function renderSpecialPredictions(container) {
  const ts = window._topScorer || { player_name: "", team_name: "" };

  container.innerHTML = `
    <div class="special-predictions">

      <div class="card special-card">
        <div class="card-header">
          <span class="card-title">
            <i class="fas fa-shoe-prints"></i> Máximo goleador
          </span>
          <span class="special-pts-badge">+5 pts</span>
        </div>

        <p class="special-desc">
          Predice el jugador que más goles anotará en todo el torneo.
          Solo se otorgan puntos si aciertas exactamente el nombre.
        </p>

        <div class="input-group" style="margin-top:1.25rem">
          <label>Nombre del jugador</label>
          <div class="input-wrapper">
            <i class="fas fa-user input-icon"></i>
            <input type="text" id="top-scorer-name" class="input-field"
              placeholder="ej. Lionel Messi"
              value="${ts.player_name || ""}" />
          </div>
        </div>

        <div class="input-group">
          <label>Selección</label>
          <div class="input-wrapper">
            <i class="fas fa-flag input-icon"></i>
            <input type="text" id="top-scorer-team" class="input-field"
              placeholder="ej. Argentina"
              value="${ts.team_name || ""}" />
          </div>
        </div>

        ${ts.player_name ? `
          <div class="special-current">
            <i class="fas fa-check-circle" style="color:var(--success)"></i>
            Predicción guardada: <strong>${ts.player_name}</strong> (${ts.team_name})
          </div>
        ` : ""}

        <button class="btn btn-primary btn-full" id="save-top-scorer-btn"
          style="margin-top:1rem">
          <i class="fas fa-save"></i> Guardar predicción
        </button>
      </div>

      <div class="card special-info-card" style="margin-top:1.5rem">
        <div class="card-header">
          <span class="card-title">
            <i class="fas fa-info-circle"></i> Predicciones implícitas
          </span>
        </div>
        <p style="font-size:0.9rem;color:var(--text-light);line-height:1.7">
          El <strong>campeón, subcampeón, tercer y cuarto puesto</strong> se determinan
          automáticamente a partir de tus predicciones de la Final y el partido por el
          Tercer Puesto. No necesitas predecirlos por separado.
        </p>
        <div class="implicit-preds-grid">
          <div class="implicit-pred">
            <span class="implicit-pts">+12</span>
            <span>Campeón</span>
          </div>
          <div class="implicit-pred">
            <span class="implicit-pts">+10</span>
            <span>Subcampeón</span>
          </div>
          <div class="implicit-pred">
            <span class="implicit-pts">+8</span>
            <span>Tercer puesto</span>
          </div>
          <div class="implicit-pred">
            <span class="implicit-pts">+6</span>
            <span>Cuarto puesto</span>
          </div>
        </div>
      </div>

    </div>
  `;

  document.getElementById("save-top-scorer-btn").addEventListener("click", async () => {
    const playerName = document.getElementById("top-scorer-name").value.trim();
    const teamName   = document.getElementById("top-scorer-team").value.trim();
    const btn        = document.getElementById("save-top-scorer-btn");

    if (!playerName || !teamName) {
      showToast("Completa el nombre del jugador y la selección", "warning");
      return;
    }

    btn.disabled = true;
    btn.innerHTML = `<div class="spinner" style="width:18px;height:18px;border-width:2px"></div> Guardando...`;

    try {
      await predictionsAPI.saveTopScorer({ player_name: playerName, team_name: teamName });
      window._topScorer = { player_name: playerName, team_name: teamName };
      showToast("Goleador guardado correctamente", "success");
      renderSpecialPredictions(document.getElementById("predictions-content"));
    } catch (err) {
      showToast("Error guardando la predicción", "error");
      btn.disabled = false;
      btn.innerHTML = `<i class="fas fa-save"></i> Guardar predicción`;
    }
  });
}

// ── TARJETA DE PARTIDO ────────────────────────────────────────────

function renderMatchCard(match) {
  const isLocked = isMatchLocked(match.kickoff);
  const isGroup = match.phase === "group";
  const isKnockout = !isGroup;

  // Desbloqueo progresivo: esta fase está bloqueada si su prerequisito no está completo
  const phaseLocked = isKnockout && !isPhaseUnlocked(match.phase);

  const pred = myPredictions[match.fixture_id];
  const isFinished = match.status === "FT";
  const homeVal = pred !== undefined ? pred.predicted_home : "";
  const awayVal = pred !== undefined ? pred.predicted_away : "";
  const hasPred = pred !== undefined;
  const penaltyWinner = pred?.penalty_winner || "";

  const isDraw = homeVal !== "" && awayVal !== "" &&
    parseInt(homeVal) === parseInt(awayVal);
  const needsPenalty = isKnockout && isDraw && !isLocked && !phaseLocked;

  let homeTeam = match.home_team;
  let awayTeam = match.away_team;

  if (isKnockout && window._userBracket?.bracket?.[match.fixture_id]) {
    const projected = window._userBracket.bracket[match.fixture_id];
    homeTeam = projected.home_team;
    awayTeam = projected.away_team;
  }

  const effectiveLocked = isLocked || phaseLocked;

  const statusBadge = isFinished
    ? `<span class="badge badge-finished">Finalizado</span>`
    : phaseLocked
      ? `<span class="badge badge-locked"><i class="fas fa-lock"></i> Completa la fase anterior</span>`
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
      ${phaseLocked ? "knockout-locked" : ""}
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
            ? phaseLocked
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
  document.querySelectorAll(".score-input").forEach(input => {
    input.addEventListener("input", handleScoreChange);
    input.addEventListener("change", updateGroupTables);
  });

  document.querySelectorAll(".penalty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const fixtureId = parseInt(btn.dataset.fixture);
      const winner = btn.dataset.winner;

      document.querySelectorAll(
        `.penalty-btn[data-fixture="${fixtureId}"]`
      ).forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");

      if (!pendingSaves[fixtureId]) pendingSaves[fixtureId] = {};
      pendingSaves[fixtureId].penalty_winner = winner;

      if (myPredictions[fixtureId]) {
        myPredictions[fixtureId].penalty_winner = winner;
      }

      const saveBtn = document.getElementById("save-all-btn");
      const status  = document.getElementById("save-status");
      if (saveBtn) { saveBtn.style.display = "flex"; saveBtn.onclick = saveAllPending; }
      if (status)  status.textContent = "Cambios sin guardar...";
    });
  });
}

function updateGroupTables() {
  GROUPS.forEach(group => {
    const tableWrap = document.querySelector(
      `#section-${group.replace(" ", "-")} .group-table-wrap`
    );
    if (!tableWrap) return;

    const groupMatches = allMatches.filter(m => m.group === group);
    if (!groupMatches.length) return;

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
            fixture_id:     match.fixture_id,
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
  const side      = e.target.dataset.side;
  const value     = parseInt(e.target.value);

  if (!pendingSaves[fixtureId]) pendingSaves[fixtureId] = {};
  pendingSaves[fixtureId][side] = isNaN(value) ? 0 : value;

  const saveBtn = document.getElementById("save-all-btn");
  const status  = document.getElementById("save-status");
  if (saveBtn) { saveBtn.style.display = "flex"; saveBtn.onclick = saveAllPending; }
  if (status)  status.textContent = "Cambios sin guardar...";

  checkPenaltyVisibility(fixtureId);
  updateGroupTables();
}

function checkPenaltyVisibility(fixtureId) {
  const match = allMatches.find(m => m.fixture_id === fixtureId);
  if (!match || match.phase === "group") return;

  const homeInput = document.querySelector(`.score-input[data-fixture="${fixtureId}"][data-side="home"]`);
  const awayInput = document.querySelector(`.score-input[data-fixture="${fixtureId}"][data-side="away"]`);
  if (!homeInput || !awayInput) return;

  const hv     = parseInt(homeInput.value);
  const av     = parseInt(awayInput.value);
  const isDraw = !isNaN(hv) && !isNaN(av) && hv === av;
  const card   = homeInput.closest(".match-pred-card");
  if (!card) return;

  let penaltyEl = document.getElementById(`penalty-${fixtureId}`);

  if (isDraw) {
    card.classList.add("needs-penalty");

    const badge = card.querySelector(".badge");
    if (badge) {
      badge.className = "badge badge-penalty";
      badge.innerHTML = `<i class="fas fa-circle-dot"></i> Define ganador en penales`;
    }

    if (!penaltyEl) {
      let homeTeam = match.home_team;
      let awayTeam = match.away_team;
      if (window._userBracket?.bracket?.[fixtureId]) {
        homeTeam = window._userBracket.bracket[fixtureId].home_team;
        awayTeam = window._userBracket.bracket[fixtureId].away_team;
      }

      const existingPenalty = pendingSaves[fixtureId]?.penalty_winner ||
        myPredictions[fixtureId]?.penalty_winner || "";

      const div = document.createElement("div");
      div.className = "penalty-selector";
      div.id = `penalty-${fixtureId}`;
      div.innerHTML = `
        <span class="penalty-label">Ganador en penales:</span>
        <div class="penalty-options">
          <button class="penalty-btn ${existingPenalty === "home" ? "selected" : ""}"
            data-fixture="${fixtureId}" data-winner="home">
            ${homeTeam.name}
          </button>
          <button class="penalty-btn ${existingPenalty === "away" ? "selected" : ""}"
            data-fixture="${fixtureId}" data-winner="away">
            ${awayTeam.name}
          </button>
        </div>
      `;
      card.appendChild(div);

      div.querySelectorAll(".penalty-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const winner = btn.dataset.winner;
          div.querySelectorAll(".penalty-btn").forEach(b => b.classList.remove("selected"));
          btn.classList.add("selected");

          if (!pendingSaves[fixtureId]) pendingSaves[fixtureId] = {};
          pendingSaves[fixtureId].penalty_winner = winner;
          if (myPredictions[fixtureId]) myPredictions[fixtureId].penalty_winner = winner;

          const saveBtn = document.getElementById("save-all-btn");
          const status  = document.getElementById("save-status");
          if (saveBtn) { saveBtn.style.display = "flex"; saveBtn.onclick = saveAllPending; }
          if (status)  status.textContent = "Cambios sin guardar...";
        });
      });
    }
  } else {
    card.classList.remove("needs-penalty");
    if (penaltyEl) penaltyEl.remove();

    if (pendingSaves[fixtureId])  delete pendingSaves[fixtureId].penalty_winner;
    if (myPredictions[fixtureId]) delete myPredictions[fixtureId].penalty_winner;

    const hasPred = !!myPredictions[fixtureId];
    const badge   = card.querySelector(".badge");
    if (badge && !card.classList.contains("locked")) {
      badge.className = `badge ${hasPred ? "badge-saved" : "badge-empty"}`;
      badge.innerHTML = hasPred
        ? `<i class="fas fa-check"></i> Guardado`
        : `<i class="fas fa-pencil-alt"></i> Sin predecir`;
    }
  }
}

async function saveAllPending() {
  const allInputs = document.querySelectorAll(".score-input");
  const collected = {};

  allInputs.forEach(input => {
    const fixtureId = parseInt(input.dataset.fixture);
    const side      = input.dataset.side;
    const raw       = input.value.trim();
    const value     = parseInt(raw);
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
      fixture_id:     parseInt(id),
      predicted_home: scores.home,
      predicted_away: scores.away,
      penalty_winner: scores.penalty_winner || myPredictions[parseInt(id)]?.penalty_winner || null,
    }));

  if (!batch.length) {
    showToast("No hay predicciones completas para guardar", "warning");
    return;
  }

  const missingPenalty = batch.filter(p => {
    const match = allMatches.find(m => m.fixture_id === p.fixture_id);
    if (!match || match.phase === "group") return false;
    return p.predicted_home === p.predicted_away && !p.penalty_winner;
  });

  if (missingPenalty.length) {
    const names = missingPenalty.map(p => {
      const match = allMatches.find(m => m.fixture_id === p.fixture_id);
      return `${match?.home_team?.name || "?"} vs ${match?.away_team?.name || "?"}`;
    }).join(", ");
    showToast(`Define el ganador en penales: ${names}`, "warning");
    missingPenalty.forEach(p => {
      const card = document.querySelector(
        `.score-input[data-fixture="${p.fixture_id}"]`
      )?.closest(".match-pred-card");
      if (card) {
        card.classList.add("penalty-missing");
        setTimeout(() => card.classList.remove("penalty-missing"), 2500);
      }
    });
    return;
  }

  const saveBtn = document.getElementById("save-all-btn");
  const status  = document.getElementById("save-status");
  if (status)  status.textContent = "Guardando...";
  if (saveBtn) saveBtn.disabled = true;

  try {
    const result = await predictionsAPI.saveBatch(batch);
    pendingSaves = {};

    batch.forEach(p => {
      myPredictions[p.fixture_id] = {
        ...myPredictions[p.fixture_id],
        fixture_id:     p.fixture_id,
        predicted_home: p.predicted_home,
        predicted_away: p.predicted_away,
        penalty_winner: p.penalty_winner,
      };
    });

    showToast(`${result.saved} predicciones guardadas`, "success");
    if (result.skipped > 0) {
      showToast(`${result.skipped} partidos omitidos (ya iniciaron)`, "warning");
    }

    // Recargar datos (recalcula completitud por fase)
    await loadPredictionsData();
    if (status)  status.textContent = "";
    if (saveBtn) { saveBtn.style.display = "none"; saveBtn.disabled = false; }

  } catch (err) {
    showToast("Error guardando predicciones", "error");
    if (status) status.textContent = "Error al guardar";
  } finally {
    if (saveBtn) saveBtn.disabled = false;
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
  if (diff <= 0)       return `<span style="color:var(--error);font-weight:600">Comenzando...</span>`;
  return formatCountdown(diff, kickoff);
}

function formatCountdown(diff, kickoff) {
  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days > 1)   return `<span style="color:var(--text-light)">📅 ${formatKickoff(kickoff)}</span>`;
  if (days === 1) return `<span style="color:var(--turq-dark)">⏱ Mañana ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}</span>`;
  if (hours > 0)  return `<span style="color:var(--turq-dark)">⏱ ${hours}h ${String(minutes).padStart(2, "0")}m</span>`;
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

// ── ESTILOS ───────────────────────────────────────────────────────

function injectPredictionsStyles() {
  if (document.getElementById("predictions-styles")) return;
  const style = document.createElement("style");
  style.id = "predictions-styles";
  style.textContent = `
    body { background: var(--gray-light); }

    .predictions-actions { display: flex; align-items: center; gap: 1rem; }
    .save-status { font-size: 0.85rem; color: var(--text-light); font-weight: 500; }

    .group-section { margin-bottom: 2.5rem; }
    .group-title { font-size: 1rem; font-weight: 800; color: var(--navy); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
    .group-layout { display: grid; grid-template-columns: 1fr 300px; gap: 1.25rem; align-items: start; }

    .group-standing-card { background: var(--white); border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; position: sticky; top: 80px; }
    .group-standing-header, .group-standing-row { display: grid; grid-template-columns: 24px 1fr 30px 34px 38px 30px; align-items: center; gap: 4px; padding: 0 10px; }
    .group-standing-header { height: 32px; background: var(--navy); color: var(--white); font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
    .group-standing-header span:nth-child(1) { text-align: center; }
    .group-standing-header span:nth-child(2) { text-align: left; }
    .group-standing-header span:nth-child(3) { text-align: center; }
    .group-standing-header span:nth-child(4) { text-align: center; }
    .group-standing-header span:nth-child(5) { text-align: center; }
    .group-standing-header span:nth-child(6) { text-align: center; }
    .group-standing-row { height: 40px; border-bottom: 1px solid var(--gray-mid); font-size: 0.8rem; transition: background 0.15s; }
    .group-standing-row:last-of-type { border-bottom: none; }
    .group-standing-row:hover { background: var(--gray-light); }
    .group-standing-row.qualifies { border-left: 3px solid var(--turq); }
    .group-standing-row.third-place { border-left: 3px solid var(--warning); }
    .group-standing-row.eliminated { border-left: 3px solid transparent; opacity: 0.65; }
    .standing-pos { font-size: 0.78rem; font-weight: 700; color: var(--navy); text-align: center; }
    .standing-team { display: flex; align-items: center; gap: 5px; min-width: 0; }
    .standing-logo { width: 20px; height: 20px; object-fit: contain; flex-shrink: 0; }
    .standing-team-name { font-size: 0.78rem; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .standing-pj { text-align: center; color: var(--text-light); font-size: 0.8rem; }
    .standing-pts { text-align: center; font-weight: 800; color: var(--navy); font-size: 0.85rem; }
    .standing-dg { text-align: center; font-weight: 600; font-size: 0.8rem; }
    .standing-dg.pos { color: var(--success); }
    .standing-dg.neg { color: var(--error); }
    .standing-gf { text-align: center; color: var(--text-light); font-size: 0.8rem; }
    .standing-legend { display: flex; gap: 0.75rem; padding: 6px 10px; background: var(--gray-light); font-size: 0.67rem; color: var(--text-light); border-top: 1px solid var(--gray-mid); }
    .legend-qualifies { color: var(--turq-dark); font-weight: 600; }
    .legend-third { color: var(--warning); font-weight: 600; }
    .legend-out { color: var(--gray); font-weight: 600; }

    .match-group { margin-bottom: 1.5rem; }
    .match-date-header { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-light); margin-bottom: 0.6rem; padding-left: 0.25rem; }
    .match-pred-card { background: var(--white); border-radius: var(--radius); padding: 0.85rem 1rem; margin-bottom: 0.6rem; box-shadow: var(--shadow); border: 2px solid transparent; transition: var(--transition); }
    .match-pred-card:not(.has-pred):not(.locked) { border: 2px dashed var(--gray-mid); }
    .match-pred-card:not(.has-pred):not(.locked):hover { border-color: var(--turq); border-style: solid; }
    .match-pred-card:hover { border-color: var(--turq); }
    .match-pred-card.locked { opacity: 0.75; }
    .match-pred-card.locked:hover { border-color: var(--gray-mid); }
    .match-pred-card.has-pred { border-left: 4px solid var(--success); }
    .match-pred-card.knockout-locked { opacity: 0.5; filter: grayscale(30%); }
    .mpc-top { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.6rem; }
    .mpc-round { font-size: 0.72rem; color: var(--text-light); margin-left: auto; }
    .mpc-body { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 0.75rem; }
    .mpc-team { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; }
    .mpc-logo { width: 38px; height: 38px; object-fit: contain; }
    .mpc-name { font-size: 0.78rem; font-weight: 600; text-align: center; color: var(--text); }
    .mpc-center { display: flex; flex-direction: column; align-items: center; gap: 0.35rem; }
    .mpc-time { font-size: 0.72rem; color: var(--text-light); text-align: center; }
    .score-display { display: flex; align-items: center; gap: 0.4rem; font-size: 1.4rem; font-weight: 800; color: var(--navy); }
    .score-sep { color: var(--gray); }
    .real-score { font-size: 0.72rem; color: var(--text-light); text-align: center; }
    .pred-points { font-size: 0.78rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 999px; }
    .pts-good { background: rgba(34,197,94,0.12); color: var(--success); }
    .pts-zero { background: var(--gray-mid); color: var(--text-light); }
    .badge-saved { background: rgba(34,197,94,0.12); color: var(--success); }
    .badge-empty { background: rgba(53,198,244,0.1); color: var(--turq-dark); }
    .score-input:placeholder-shown { background: var(--gray-light); border-color: var(--gray-mid); color: var(--gray); }
    .score-input:not(:placeholder-shown) { background: var(--white); border-color: var(--turq); color: var(--navy); font-weight: 700; }
    .tbd-display { font-size: 1.8rem; font-weight: 800; color: var(--gray); }

    .knockout-locked-msg { text-align: center; padding: 4rem 2rem; background: var(--white); border-radius: var(--radius); box-shadow: var(--shadow); }
    .knockout-locked-icon { font-size: 3rem; margin-bottom: 1rem; }
    .knockout-locked-msg h3 { font-size: 1.2rem; font-weight: 700; color: var(--navy); margin-bottom: 0.5rem; }
    .knockout-locked-msg p { color: var(--text-light); font-size: 0.9rem; margin-bottom: 1.5rem; max-width: 400px; margin-left: auto; margin-right: auto; }

    .badge-penalty { background: rgba(245,158,11,0.15); color: #F59E0B; animation: pulse 1.5s infinite; }
    .match-pred-card.needs-penalty { border: 2px solid rgba(245,158,11,0.4); }
    .penalty-selector { margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--gray-mid); display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
    .penalty-label { font-size: 0.82rem; font-weight: 600; color: #F59E0B; white-space: nowrap; }
    .penalty-options { display: flex; gap: 0.5rem; }
    .penalty-btn { padding: 0.35rem 0.85rem; border-radius: var(--radius-sm); font-size: 0.82rem; font-weight: 600; border: 2px solid var(--gray-mid); background: var(--white); color: var(--text); cursor: pointer; transition: var(--transition); }
    .penalty-btn:hover { border-color: #F59E0B; color: #F59E0B; }
    .penalty-btn.selected { background: #F59E0B; border-color: #F59E0B; color: var(--white); }

    @keyframes penalty-shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
    .match-pred-card.penalty-missing { border: 2px solid #F59E0B !important; animation: penalty-shake 0.5s ease; box-shadow: 0 0 0 3px rgba(245,158,11,0.25); }

    .special-predictions { max-width: 600px; }
    .special-card { border-top: 4px solid var(--turq); }
    .special-pts-badge { background: rgba(53,198,244,0.12); color: var(--turq-dark); font-size: 0.82rem; font-weight: 700; padding: 0.25rem 0.65rem; border-radius: 999px; }
    .special-desc { font-size: 0.88rem; color: var(--text-light); line-height: 1.6; margin-top: 0.25rem; }
    .special-current { display: flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; color: var(--text-light); background: rgba(34,197,94,0.08); padding: 0.65rem 0.85rem; border-radius: var(--radius-sm); margin-top: 0.5rem; }
    .implicit-preds-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 0.75rem; margin-top: 1rem; }
    .implicit-pred { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; background: var(--gray-light); border-radius: var(--radius-sm); padding: 0.75rem 0.5rem; font-size: 0.78rem; color: var(--text-light); text-align: center; }
    .implicit-pts { font-size: 1.1rem; font-weight: 800; color: var(--navy); }

    @media (max-width: 900px) {
      .group-layout { grid-template-columns: 1fr; }
      .group-standing-card { position: static; }
    }
    @media (max-width: 640px) {
      .mpc-logo { width: 28px; height: 28px; }
      .mpc-name { font-size: 0.68rem; }
      .score-input { width: 38px; height: 38px; font-size: 1rem; }
      .implicit-preds-grid { grid-template-columns: repeat(2,1fr); }
      .group-standing-header, .group-standing-row { grid-template-columns: 20px 1fr 26px 30px 34px 26px; padding: 0 6px; gap: 3px; }
      .standing-team-name { font-size: 0.72rem; }
      .standing-pts { font-size: 0.78rem; }
    }
  `;
  document.head.appendChild(style);
}