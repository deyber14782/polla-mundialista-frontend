export function renderLanding() {
  // Reemplazar todo el body para la landing
  document.getElementById("navbar").classList.add("hidden");

  const app = document.getElementById("app");
  app.style.maxWidth = "none";
  app.style.padding = "0";

  app.innerHTML = `

    <!-- ── HERO ─────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="hero-badge">Python Cup 2026 · Algorithmics</div>
        <h1 class="hero-title">
        Python<br>Cup 2026
        </h1>
        <p class="hero-subtitle">
        La Polla Mundialista oficial de Algorithmics. Predice los resultados
        del Mundial, compite con tus compañeros y gana tu parte del premio.
        </p>
        <div class="hero-actions">
          <button class="btn-hero-primary" onclick="window.navigate('/login')">
            Ingresar a la plataforma
          </button>
          <a href="#como-funciona" class="btn-hero-secondary">
            ¿Cómo funciona?
          </a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-ball">
          <img src="/assets/logo.png" alt="Python Cup 2026" class="hero-logo-img" />
        </div>
        <div class="hero-stats">
        <div class="hero-stat">
            <span class="hero-stat-num">106</span>
            <span class="hero-stat-label">Partidos</span>
        </div>
        <div class="hero-stat-divider"></div>
        <div class="hero-stat">
            <span class="hero-stat-num">Top 5</span>
            <span class="hero-stat-label">Premiados</span>
        </div>
        <div class="hero-stat-divider"></div>
        <div class="hero-stat">
            <span class="hero-stat-num">$50K</span>
            <span class="hero-stat-label">Inscripción</span>
        </div>
        </div>
      </div>
    </section>

    <!-- ── CÓMO FUNCIONA ─────────────────────────────────────── -->
    <section class="section" id="como-funciona">
      <div class="section-inner">
        <div class="section-label">Mecánica</div>
        <h2 class="section-title">¿Cómo funciona?</h2>
        <p class="section-desc">
          Simple, justo y emocionante. Predice antes de que empiece
          el Mundial y sigue tu posición en tiempo real.
        </p>

        <div class="steps-grid">
        <div class="step-card">
            <div class="step-number">01</div>
            <div class="step-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            </div>
            <h3>Inscríbete</h3>
            <p>Completa el formulario en <strong>forms.gle/44YahrA5Tykkpak5A</strong> y realiza el pago de <strong>$50.000 en efectivo</strong> en Algorithmics antes del 10 de junio.</p>
        </div>
        <div class="step-card">
            <div class="step-number">02</div>
            <div class="step-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            </div>
            <h3>Predice antes del 11 de junio</h3>
            <p>Tienes hasta el <strong>jueves 11 de junio a las 6:00 a.m.</strong> para registrar y modificar tus predicciones. Después se bloquea todo.</p>
        </div>
        <div class="step-card">
            <div class="step-number">03</div>
            <div class="step-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            </div>
            <h3>Sigue el Mundial</h3>
            <p>El ranking se actualiza automáticamente con cada resultado. Consulta tu posición en la plataforma en tiempo real.</p>
        </div>
        <div class="step-card">
            <div class="step-number">04</div>
            <div class="step-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
            </svg>
            </div>
            <h3>Gana tu premio</h3>
            <p>Los <strong>5 primeros lugares</strong> del ranking general son premiados. En caso de empate, el premio se divide en partes iguales.</p>
        </div>
        </div>
      </div>
    </section>

    <!-- ── PUNTUACIÓN ── -->
    <section class="section section-dark" id="puntuacion">
    <div class="section-inner">
        <div class="section-label" style="color:var(--turq)">Sistema de puntos</div>
        <h2 class="section-title" style="color:var(--white)">Así se puntúa</h2>
        <p class="section-desc" style="color:var(--landing-muted)">
        Cuanto más precisa sea tu predicción, más puntos acumulas.
        Los puntos de clasificación se suman automáticamente conforme avanzan los equipos.
        </p>

        <div class="scoring-two-cols">

        <div class="scoring-col">
            <h4 class="scoring-col-title">Partidos</h4>
            <div class="scoring-grid">
            <div class="score-row">
                <div class="score-pts gold">3</div>
                <div class="score-info">
                <strong>Marcador exacto</strong>
                <span>Acertaste el resultado preciso — ej. predijiste 2-1 y salió 2-1</span>
                </div>
            </div>
            <div class="score-row">
                <div class="score-pts silver">1</div>
                <div class="score-info">
                <strong>Resultado correcto (L-E-V)</strong>
                <span>Acertaste si ganó local, visitante, o si fue empate</span>
                </div>
            </div>
            </div>
        </div>

        <div class="scoring-col">
            <h4 class="scoring-col-title">Clasificación por ronda</h4>
            <div class="scoring-grid">
            <div class="score-row">
                <div class="score-pts bronze">2</div>
                <div class="score-info">
                <strong>Clasificado a Ronda de 32</strong>
                <span>Por cada equipo que predijiste correctamente</span>
                </div>
            </div>
            <div class="score-row">
                <div class="score-pts bronze">4</div>
                <div class="score-info">
                <strong>Clasificado a Octavos</strong>
                <span>Por cada equipo que predijiste en octavos</span>
                </div>
            </div>
            <div class="score-row">
                <div class="score-pts bronze">6</div>
                <div class="score-info">
                <strong>Clasificado a Cuartos</strong>
                <span>Por cada equipo que predijiste en cuartos</span>
                </div>
            </div>
            <div class="score-row">
                <div class="score-pts bronze">8</div>
                <div class="score-info">
                <strong>Clasificado a Semifinales</strong>
                <span>Por cada equipo que predijiste en semis</span>
                </div>
            </div>
            <div class="score-row">
                <div class="score-pts bonus">10</div>
                <div class="score-info">
                <strong>Final o partido por 3er puesto</strong>
                <span>Por cada equipo que predijiste en la última fase</span>
                </div>
            </div>
            <div class="score-row">
                <div class="score-pts" style="background:rgba(148,163,184,0.15);color:#94A3B8">1</div>
                <div class="score-info">
                <strong>Clasificó pero en otra posición</strong>
                <span>El equipo avanzó pero no quedó donde predijiste</span>
                </div>
            </div>
            </div>
        </div>

        <div class="scoring-col">
            <h4 class="scoring-col-title">Predicciones especiales</h4>
            <div class="scoring-grid">
            <div class="score-row">
                <div class="score-pts bonus">12</div>
                <div class="score-info">
                <strong>Campeón del Mundial</strong>
                <span>Máximo bonus por acertar al campeón</span>
                </div>
            </div>
            <div class="score-row">
                <div class="score-pts bonus">10</div>
                <div class="score-info">
                <strong>Subcampeón</strong>
                <span>Segundo lugar del torneo</span>
                </div>
            </div>
            <div class="score-row">
                <div class="score-pts bonus">8</div>
                <div class="score-info">
                <strong>Tercer puesto</strong>
                <span>Ganador del partido por el bronce</span>
                </div>
            </div>
            <div class="score-row">
                <div class="score-pts bonus">6</div>
                <div class="score-info">
                <strong>Cuarto puesto</strong>
                <span>Perdedor del partido por el bronce</span>
                </div>
            </div>
            <div class="score-row">
                <div class="score-pts bronze">5</div>
                <div class="score-info">
                <strong>Máximo goleador</strong>
                <span>El jugador que más goles anote en el torneo</span>
                </div>
            </div>
            </div>
        </div>

        <div class="scoring-col">
            <h4 class="scoring-col-title">Premiación Top 5</h4>
            <div class="prizes-list">
            <div class="prize-row">
                <span class="prize-medal">1°</span>
                <div class="prize-info">
                <strong>Primer lugar</strong>
                <span>33% del pozo total para ganadores</span>
                </div>
            </div>
            <div class="prize-row">
                <span class="prize-medal">2°</span>
                <div class="prize-info">
                <strong>Segundo lugar</strong>
                </div>
            </div>
            <div class="prize-row">
                <span class="prize-medal">3°</span>
                <div class="prize-info">
                <strong>Tercer lugar</strong>
                </div>
            </div>
            <div class="prize-row">
                <span class="prize-medal">4°</span>
                <div class="prize-info">
                <strong>Cuarto lugar</strong>
                </div>
            </div>
            <div class="prize-row">
                <span class="prize-medal">5°</span>
                <div class="prize-info">
                <strong>Quinto lugar</strong>
                </div>
            </div>
            <div class="prize-note">
                En caso de empate, el premio se distribuye en partes iguales entre los empatados.
            </div>
            </div>
        </div>

        </div>
    </div>
    </section>

    <!-- ── EQUIPO ─────────────────────────────────────────────── -->
    <section class="section" id="equipo">
      <div class="section-inner">
        <div class="section-label">Desarrolladores</div>
        <h2 class="section-title">El equipo detrás</h2>
        <p class="section-desc">
          Estudiantes de Algorithmics que construyeron esta plataforma
          de principio a fin.
        </p>

        <div class="team-grid" id="team-grid">
          ${renderTeamCards()}
        </div>
      </div>
    </section>

    <!-- ── CTA FINAL ─────────────────────────────────────────── -->
    <section class="cta-section">
    <div class="cta-inner">
        <div class="section-label" style="color:var(--turq);text-align:center;margin-bottom:0.75rem">
        Inscripciones abiertas
        </div>
        <h2>¿Listo para competir?</h2>
        <p>
        Inscríbete antes del <strong style="color:var(--turq)">10 de junio</strong> y registra
        tus predicciones antes del <strong style="color:var(--turq)">11 de junio a las 6:00 a.m.</strong>
        </p>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
        <a href="https://forms.gle/44YahrA5Tykkpak5A" target="_blank" class="btn-hero-primary">
            Formulario de inscripción
        </a>
        <button class="btn-hero-secondary" onclick="window.navigate('/login')"
            style="border:1px solid rgba(255,255,255,0.3);padding:0.85rem 2rem;border-radius:var(--radius-sm);color:var(--white)">
            Ingresar a la plataforma
        </button>
        </div>
    </div>
    </section>

    <!-- ── FOOTER ─────────────────────────────────────────────── -->
    <footer class="landing-footer">
      <div class="footer-inner">
        <div class="footer-brand">
        <span class="footer-logo">
          <img src="/assets/logo.png" alt="Python Cup 2026" style="height:28px;object-fit:contain;" />
        </span>
        <span>Python Cup 2026</span>
        </div>
        <p class="footer-copy">Desarrollado por estudiantes de Algorithmics · 2026</p>
      </div>
    </footer>

  `;

  injectLandingStyles();
  initScrollAnimations();
}

function renderTeamCards() {
  // Reemplaza los nombres y fotos con los datos reales de tus 14 estudiantes
  // Las fotos deben estar en frontend/assets/team/
  const students = [
    { name: "Samuel Ospina", role: "Full Stack Developer", photo: "assets/team/Panini fifa - 1.png" },
    { name: "Joel Camargo", role: "Full Stack Developer", photo: "assets/team/Panini fifa - 2.png" },
    { name: "Samara Moreno", role: "Full Stack Developer", photo: "assets/team/Panini fifa - 3.png" },
    { name: "Zahir Palacio", role: "Full Stack Developer", photo: "assets/team/Panini fifa - 4.png" },
    { name: "Juan Sebastián Ramírez", role: "Full Stack Developer", photo: "assets/team/Panini fifa - 5.png" },
    { name: "Laura Gutiérrez", role: "Full Stack Developer", photo: "assets/team/Panini fifa - 6.png" },
    { name: "Sebastián Cañón", role: "Full Stack Developer", photo: "assets/team/Panini fifa - 7.png" },
    { name: "Daniel Niño", role: "Full Stack Developer", photo: "assets/team/Panini fifa - 8.png" },
    { name: "Andrés Martínez", role: "Full Stack Developer", photo: "assets/team/Panini fifa - 9.png" },
    { name: "Camilo Amaya", role: "Full Stack Developer", photo: "assets/team/Panini fifa - 10.png" },
    { name: "Diego Moreno", role: "Full Stack Developer", photo: "assets/team/Panini fifa - 11.png" },
    { name: "Ángel Ramírez", role: "Full Stack Developer", photo: "assets/team/Panini fifa - 12.png" },
    { name: "Santiago Yepes", role: "Full Stack Developer", photo: "assets/team/Panini fifa - 13.png" },
    { name: "Ian Núñez", role: "Full Stack Developer", photo: "assets/team/Panini fifa - 14.png" },
  ];

  return students.map(s => `
    <div class="panini-card">
      <div class="panini-photo-wrap">
        <img
          src="${s.photo}"
          alt="${s.name}"
          class="panini-photo"
          onerror="this.src='assets/team/placeholder.jpg'"
        />
        <div class="panini-shine"></div>
      </div>
      <div class="panini-info">
        <div class="panini-algo-badge">ALGORITHMICS</div>
        <p class="panini-name">${s.name}</p>
        <p class="panini-role">${s.role}</p>
        <div class="panini-footer">
          <span class="panini-year">2026</span>
          <span class="panini-flag">🌍</span>
        </div>
      </div>
    </div>
  `).join("");
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(
    ".step-card, .score-row, .panini-card"
  ).forEach(el => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });
}

function injectLandingStyles() {
  if (document.getElementById("landing-styles")) return;
  const style = document.createElement("style");
  style.id = "landing-styles";
  style.textContent = `
    :root {
      --landing-muted: rgba(255,255,255,0.6);
    }

    /* ── Reset para landing ── */
    body { background: var(--white); }

    /* ── Hero ── */
    .hero {
      min-height: 100vh;
      background: var(--navy);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6rem 8% 4rem;
      position: relative;
      overflow: hidden;
      gap: 4rem;
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 60% 60% at 70% 50%, rgba(53,198,244,0.08) 0%, transparent 70%),
        radial-gradient(ellipse 40% 40% at 20% 80%, rgba(53,198,244,0.05) 0%, transparent 60%);
      pointer-events: none;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 560px;
    }

    .hero-badge {
      display: inline-block;
      background: rgba(53,198,244,0.15);
      color: var(--turq);
      border: 1px solid rgba(53,198,244,0.3);
      padding: 0.4rem 1rem;
      border-radius: 999px;
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
    }

    .hero-title {
      font-size: clamp(3rem, 7vw, 5.5rem);
      font-weight: 800;
      color: var(--white);
      line-height: 1;
      letter-spacing: -0.02em;
      margin-bottom: 1.5rem;
    }

    .hero-subtitle {
      font-size: 1.1rem;
      color: var(--landing-muted);
      line-height: 1.7;
      margin-bottom: 2.5rem;
      max-width: 460px;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      align-items: center;
    }

    .btn-hero-primary {
      background: var(--turq);
      color: var(--navy);
      border: none;
      padding: 0.85rem 2rem;
      border-radius: var(--radius-sm);
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      transition: var(--transition);
      font-family: inherit;
      white-space: nowrap;
    }

    .btn-hero-primary:hover {
      background: var(--turq-dark);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(53,198,244,0.3);
    }

    .btn-hero-secondary {
      color: var(--landing-muted);
      font-size: 0.9rem;
      font-weight: 500;
      text-decoration: none;
      border-bottom: 1px solid rgba(255,255,255,0.2);
      padding-bottom: 2px;
      transition: var(--transition);
    }

    .btn-hero-secondary:hover {
      color: var(--white);
      border-color: var(--white);
    }

    /* ── Hero visual ── */
    .hero-visual {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    .hero-ball {
      width: 260px;
      height: 260px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hero-logo-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 8px 32px rgba(53,198,244,0.3));
    }

    .hero-stats {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: var(--radius);
      padding: 1.25rem 2rem;
    }

    .hero-stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
    }

    .hero-stat-num {
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--white);
      line-height: 1;
    }

    .hero-stat-label {
      font-size: 0.72rem;
      color: var(--landing-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 600;
    }

    .hero-stat-divider {
      width: 1px;
      height: 40px;
      background: rgba(255,255,255,0.15);
    }

    /* ── Sections ── */
    .section {
      padding: 6rem 8%;
      background: var(--white);
    }

    .section-dark {
      background: var(--navy);
    }

    .section-inner {
      max-width: 1100px;
      margin: 0 auto;
    }

    .section-label {
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--turq-dark);
      margin-bottom: 0.75rem;
    }

    .section-title {
      font-size: clamp(1.8rem, 4vw, 2.8rem);
      font-weight: 800;
      color: var(--navy);
      line-height: 1.1;
      margin-bottom: 1rem;
      letter-spacing: -0.01em;
    }

    .section-desc {
      font-size: 1.05rem;
      color: var(--text-light);
      max-width: 520px;
      line-height: 1.7;
      margin-bottom: 3rem;
    }

    /* ── Steps ── */
    .steps-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }

    .step-card {
      background: var(--gray-light);
      border-radius: var(--radius);
      padding: 2rem 1.5rem;
      position: relative;
      border: 1px solid var(--gray-mid);
      transition: var(--transition);
    }

    .step-card:hover {
      border-color: var(--turq);
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .step-number {
      font-size: 3rem;
      font-weight: 800;
      color: rgba(30,58,95,0.08);
      line-height: 1;
      margin-bottom: 1rem;
      font-variant-numeric: tabular-nums;
    }

    .step-icon {
      color: var(--turq-dark);
      margin-bottom: 1rem;
    }

    .step-card h3 {
      font-size: 1rem;
      font-weight: 700;
      color: var(--navy);
      margin-bottom: 0.5rem;
    }

    .step-card p {
      font-size: 0.88rem;
      color: var(--text-light);
      line-height: 1.6;
    }

    /* ── Scoring ── */
    .scoring-grid {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 700px;
    }

    .score-row {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: var(--radius-sm);
      padding: 1rem 1.25rem;
      transition: var(--transition);
    }

    .score-row:hover {
      background: rgba(255,255,255,0.08);
      border-color: rgba(53,198,244,0.2);
    }

    .score-pts {
      min-width: 52px;
      height: 52px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      font-weight: 800;
      flex-shrink: 0;
    }

    .score-pts.gold   { background: rgba(245,158,11,0.2);  color: #F59E0B; }
    .score-pts.silver { background: rgba(93,173,226,0.2);  color: var(--turq-dark); }
    .score-pts.bronze { background: rgba(53,198,244,0.15); color: var(--turq); }
    .score-pts.bonus  { background: rgba(34,197,94,0.15);  color: #22C55E; }

    .score-info {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .score-info strong {
      font-size: 0.95rem;
      color: var(--white);
      font-weight: 600;
    }

    .score-info span {
      font-size: 0.82rem;
      color: var(--landing-muted);
      line-height: 1.5;
    }

    /* ── Panini cards ── */
    .team-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1.25rem;
    }

    .panini-card {
      background: var(--white);
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(30,58,95,0.12);
      border: 1px solid var(--gray-mid);
      transition: var(--transition);
      cursor: default;
    }

    .panini-card:hover {
      transform: translateY(-6px) rotate(1deg);
      box-shadow: 0 12px 32px rgba(30,58,95,0.2);
    }

    .panini-photo-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 3/4;
      overflow: hidden;
      background: var(--navy);
    }

    .panini-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .panini-shine {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgba(255,255,255,0.12) 0%,
        transparent 50%,
        rgba(255,255,255,0.04) 100%
      );
      pointer-events: none;
    }

    .panini-info {
      background: var(--navy);
      padding: 0.6rem 0.5rem 0.5rem;
      text-align: center;
    }

    .panini-algo-badge {
      font-size: 0.5rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      color: var(--turq);
      text-transform: uppercase;
      margin-bottom: 0.3rem;
    }

    .panini-name {
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--white);
      line-height: 1.2;
      margin-bottom: 0.15rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .panini-role {
      font-size: 0.6rem;
      color: rgba(255,255,255,0.5);
      margin-bottom: 0.4rem;
    }

    .panini-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 0.35rem;
    }

    .panini-year {
      font-size: 0.55rem;
      color: var(--turq);
      font-weight: 700;
    }

    .panini-flag {
      font-size: 0.7rem;
    }

    /* ── CTA ── */
    .cta-section {
      background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
      padding: 6rem 8%;
      text-align: center;
    }

    .cta-inner {
      max-width: 600px;
      margin: 0 auto;
    }

    .cta-section h2 {
      font-size: clamp(1.8rem, 4vw, 2.5rem);
      font-weight: 800;
      color: var(--white);
      margin-bottom: 1rem;
    }

    .cta-section p {
      color: var(--landing-muted);
      font-size: 1rem;
      margin-bottom: 2rem;
      line-height: 1.7;
    }

    /* ── Footer ── */
    .landing-footer {
      background: var(--navy-dark);
      padding: 2rem 8%;
      border-top: 1px solid rgba(255,255,255,0.08);
    }

    .footer-inner {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .footer-brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--white);
    }

    .footer-logo {
      display: flex;
      align-items: center;
    }

    .footer-copy {
      font-size: 0.8rem;
      color: rgba(255,255,255,0.35);
    }

    /* ── Scroll animations ── */
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .step-card:nth-child(1) { transition-delay: 0.0s; }
    .step-card:nth-child(2) { transition-delay: 0.1s; }
    .step-card:nth-child(3) { transition-delay: 0.2s; }
    .step-card:nth-child(4) { transition-delay: 0.3s; }

    .panini-card:nth-child(odd)  { transition-delay: 0.05s; }
    .panini-card:nth-child(even) { transition-delay: 0.1s;  }

    .scoring-two-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    }

    .scoring-col-title {
    font-size: 0.82rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--turq);
    margin-bottom: 1rem;
    }

    .prizes-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    }

    .prize-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: var(--radius-sm);
    padding: 0.75rem 1rem;
    }

    .prize-medal {
    font-size: 1rem;
    font-weight: 800;
    color: var(--turq);
    min-width: 28px;
    text-align: center;
    }

    .prize-info {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    }

    .prize-info strong {
    font-size: 0.9rem;
    color: var(--white);
    font-weight: 600;
    }

    .prize-info span {
    font-size: 0.78rem;
    color: var(--landing-muted);
    }

    .prize-note {
    font-size: 0.78rem;
    color: var(--landing-muted);
    padding: 0.75rem;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: var(--radius-sm);
    margin-top: 0.25rem;
    font-style: italic;
    }

    @media (max-width: 768px) {
    .scoring-two-cols { grid-template-columns: 1fr; }
    }

    /* ── Responsive ── */
    @media (max-width: 1024px) {
      .steps-grid  { grid-template-columns: repeat(2, 1fr); }
      .team-grid   { grid-template-columns: repeat(4, 1fr); }
      .hero        { flex-direction: column; padding: 5rem 6% 4rem; }
      .hero-visual { display: none; }
    }

    @media (max-width: 640px) {
      .hero        { padding: 4rem 5% 3rem; }
      .section     { padding: 4rem 5%; }
      .steps-grid  { grid-template-columns: 1fr; }
      .team-grid   { grid-template-columns: repeat(3, 1fr); }
      .score-row   { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
    }
  `;
  document.head.appendChild(style);
}