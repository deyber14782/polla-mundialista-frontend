export function renderLanding() {
  document.getElementById("navbar").classList.add("hidden");

  const app = document.getElementById("app");
  app.style.maxWidth = "none";
  app.style.padding = "0";

  app.innerHTML = `

    <!-- ── ANNOUNCEMENT BAR ──────────────────────────────────── -->
    <div class="announcement-bar" id="announcement-bar">
      <span class="announcement-text">
        Proyecto educativo &nbsp;·&nbsp; Algorithmics Funza-Mosquera
      </span>
      <button class="announcement-close" onclick="document.getElementById('announcement-bar').style.display='none';document.getElementById('landing-nav').style.top='0'">×</button>
    </div>

    <!-- ── NAVBAR ────────────────────────────────────────────── -->
    <nav class="landing-nav" id="landing-nav">
      <div class="nav-inner">
        <a href="#" class="nav-brand" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;">
          <img src="assets/algorithmics/logo Blanco.png" alt="Algorithmics logo" class="nav-algo-logo"
            onerror="this.style.display='none'" />
          <img src="assets/algorithmics/nombre Blanco.png" alt="Algorithmics" class="nav-algo-wordmark"
            onerror="this.style.display='none';this.previousElementSibling.style.display='none';document.getElementById('nav-fallback').style.display='flex'" />
          <span id="nav-fallback" style="display:none;align-items:center;gap:0.4rem;font-size:0.95rem;font-weight:800;color:var(--white)">
            <span style="width:8px;height:8px;border-radius:50%;background:var(--turq);display:inline-block"></span>Algorithmics
          </span>
        </a>
        <div class="nav-links" id="nav-links">
          <a href="#como-funciona" class="nav-link">¿Cómo funciona?</a>
          <a href="#puntuacion" class="nav-link">Puntuación</a>
          <a href="#distribucion" class="nav-link">Premios</a>
          <a href="#equipo" class="nav-link">Equipo</a>
          <a href="#contacto" class="nav-link">Contáctanos</a>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSelBTfiFM2NBSe6DngXUocelOarwOdLDUQzbiMIlhcQAj5now/viewform" target="_blank" class="nav-cta nav-cta-inscripcion">Realizar inscripción</a>
          <button class="nav-cta" onclick="window.navigate('/login')">Ingresar</button>
        </div>
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Menú">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav-mobile-menu" id="nav-mobile-menu">
        <a href="#como-funciona" class="nav-link">¿Cómo funciona?</a>
        <a href="#puntuacion" class="nav-link">Puntuación</a>
        <a href="#distribucion" class="nav-link">Premios</a>
        <a href="#equipo" class="nav-link">Equipo</a>
        <a href="#contacto" class="nav-link">Contáctanos</a>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSelBTfiFM2NBSe6DngXUocelOarwOdLDUQzbiMIlhcQAj5now/viewform" target="_blank" class="nav-cta nav-cta-inscripcion">Realizar inscripción</a>
        <button class="nav-cta" onclick="window.navigate('/login')">Ingreso a la Plataforma para personas inscritas</button>
      </div>
    </nav>

    <!-- ── HERO ─────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-bg"></div>

      <!-- FILA SUPERIOR: texto | stats card | logo -->
      <div class="hero-top-row">

        <!-- Columna izquierda: texto + botones -->
        <div class="hero-left">
          <h1 class="hero-title">Python Cup <br>2026<br><span class="hero-title-sub">La Polla Mundialista Algorithmics</span></h1>
          <p class="hero-tagline">Desarrollada por jóvenes programadores.<br>Inspirada por el Mundial.</p>
          <p class="hero-subtitle">Es una plataforma real creada por 14 jóvenes programadores que, con pasión y dedicación, transformaron sus conocimientos en una experiencia que nos permitirá vivir y sentir el Mundial 2026 de una manera diferente.</p>
          <ul class="hero-bullets">
            <li><span class="hero-bullet-icon">⭐</span> Participa, haz tus predicciones, gana premios y, lo más importante, apoya el talento de la próxima generación de creadores de tecnología.</li>
          </ul>
          <div class="hero-actions">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSelBTfiFM2NBSe6DngXUocelOarwOdLDUQzbiMIlhcQAj5now/viewform"
              target="_blank" class="btn-hero-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              Inscríbete
            </a>
            <a href="#como-funciona" class="btn-hero-secondary">¿Cómo funciona? ›</a>
          </div>
        </div>

        <!-- Columna centro: stats card -->
        <div class="hero-center">
          <div class="hero-stats-card">
            <div class="hsc-row">
              <div class="hsc-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--turq)">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div class="hsc-num">14</div>
              <div class="hsc-info"><strong>Jóvenes Desarrolladores</strong><span>Construyeron esta plataforma</span></div>
            </div>
            <div class="hsc-divider"></div>
            <div class="hsc-row">
              <div class="hsc-icon">&lt;/&gt;</div>
              <div class="hsc-num">1</div>
              <div class="hsc-info"><strong>Plataforma Web Real</strong><span>Desarrollada desde cero</span></div>
            </div>
            <div class="hsc-divider"></div>
            <div class="hsc-row">
              <div class="hsc-icon">⚽</div>
              <div class="hsc-num">106</div>
              <div class="hsc-info"><strong>Partidos por Pronosticar</strong><span>Todas las fases del Mundial</span></div>
            </div>
          </div>
          <div class="hsc-participation-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="color:var(--turq);flex-shrink:0">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span>Tu participación apoya directamente a nuestros jóvenes desarrolladores.</span>
          </div>
        </div>

        <!-- Columna derecha: logo grande -->
        <div class="hero-right">
          <div class="hero-logo-wrap">
            <img src="/assets/logo.webp" alt="La Polla Mundialista Algorithmics" class="hero-logo-img" />
          </div>
        </div>

      </div>

      <!-- FILA INFERIOR: preview equipo | stats secundarios -->
      <div class="hero-bottom-row">

        <!-- Preview equipo -->
        <div class="hero-team-preview">
          <div class="htp-label">
            <span class="htp-title">CONOCE A NUESTROS<br><strong>JÓVENES DESARROLLADORES 💜</strong></span>
            <span class="htp-sub">Estudiantes de Algorithmics que diseñaron,<br>programaron y presentaron esta plataforma<br>como parte de un proyecto real.</span>
          </div>
          <div class="htp-avatars">
            ${[1,2,3,4].map(n => `
              <div class="htp-avatar">
                <img src="assets/team/Panini fifa - ${n}.webp" alt="Dev ${n}"
                  onerror="this.src='assets/team/placeholder.jpg'" />
              </div>
            `).join("")}
            <a href="#equipo" class="htp-more">Ver todo<br>el equipo →</a>
          </div>
        </div>

        <!-- Stats secundarios -->
        <div class="hero-right-stats">
          <div class="hrs-item">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="hrs-icon"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
            <span class="hrs-num">106</span>
            <span class="hrs-label">PARTIDOS<br>POR JUGAR</span>
          </div>
          <div class="hrs-divider"></div>
          <div class="hrs-item">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="hrs-icon"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            <span class="hrs-num">TOP 5</span>
            <span class="hrs-label">PREMIADOS AL<br>FINAL DEL MUNDIAL</span>
          </div>
          <p class="hrs-disclaimer">*Premiación sujeta a términos y condiciones</p>
        </div>

      </div>

      <!-- BARRA DE FEATURES -->
      <div class="hero-features-bar">
        <div class="hfb-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--turq);flex-shrink:0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <div class="hfb-text"><strong>Plataforma 100% segura</strong><span>Tus datos están protegidos</span></div>
        </div>
        <div class="hfb-sep"></div>
        <div class="hfb-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--turq);flex-shrink:0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <div class="hfb-text"><strong>Ranking en tiempo real</strong><span>Sigue tu posición al instante</span></div>
        </div>
        <div class="hfb-sep"></div>
        <div class="hfb-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--turq);flex-shrink:0"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          <div class="hfb-text"><strong>Desde cualquier dispositivo</strong><span>Juega desde tu celular, tablet o computador</span></div>
        </div>
      </div>

    </section>

    <!-- ── CÓMO FUNCIONA ─────────────────────────────────────── -->
    <section class="section" id="como-funciona">
      <div class="section-inner">
        <div class="section-tag">¿Cómo funciona?</div>
        <h2 class="section-heading">Así de simple</h2>
        <div class="como-funciona-intro">
          <p class="section-desc" style="margin-bottom:0">Participa en la Polla Mundialista Algorithmics realizando tus predicciones para el Mundial. Suma puntos con cada acierto, sigue tu posición en el ranking en tiempo real y compite por entrar al Top 5 de la tabla general de todos los participantes para participar por los premios.</p>
          <div class="como-warning-box">
            <p><strong>⚠️ Importante:</strong> Solo obtendrás puntos por los partidos que predigas antes de que comiencen. Los partidos que ya hayan finalizado no otorgarán puntos.</p>
            <p><strong>🚀</strong> Entre más rápido te inscribas y registres tus predicciones, más oportunidades tendrás de sumar puntos y entrar al Top 5 del ranking general.</p>
          </div>
        </div>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">01</div>
            <div class="step-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></div>
            <h3>Inscríbete</h3>
            <p>Completa el formulario de inscripción y realiza el pago de <strong>$50.000 en efectivo o por Nequi</strong> antes del 10 de junio.</p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSelBTfiFM2NBSe6DngXUocelOarwOdLDUQzbiMIlhcQAj5now/viewform" target="_blank" class="step-cta-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              Ir a la inscripción
            </a>
          </div>
          <div class="step-card">
            <div class="step-number">02</div>
            <div class="step-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
            <h3>Predice antes del 17 de junio</h3>
            <p>Tienes hasta el <strong>jueves 17 de junio a las 9:00 p.m.</strong> para registrar o modificar tus predicciones. Después de esa hora, la plataforma se bloqueará y comenzará oficialmente la competencia.</p>
          </div>
          <div class="step-card">
            <div class="step-number">03</div>
            <div class="step-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
            <h3>Sigue el Mundial</h3>
            <p>El ranking se actualiza automáticamente con cada resultado. Consulta tu posición en la plataforma en tiempo real.</p>
          </div>
          <div class="step-card">
            <div class="step-number">04</div>
            <div class="step-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg></div>
            <h3>Gana tu premio</h3>
            <p>Los <strong>5 participantes con mayor puntaje al finalizar el Mundial</strong> recibirán premio. En caso de empate, el valor correspondiente se distribuirá en partes iguales entre los participantes empatados.</p>
          </div>
          <div class="step-card">
            <div class="step-number">05</div>
            <div class="step-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div>
            <h3>Tu participación deja huella</h3>
            <p>Cada inscripción impulsa el talento de nuestros estudiantes. Al participar, también apoyas a los jóvenes desarrolladores de Algorithmics que crearon esta plataforma.</p>
            <p style="margin-top:0.6rem">El <strong>34% de los fondos recaudados</strong> será distribuido entre los <strong>14 estudiantes</strong> que hicieron posible este proyecto, reconociendo su dedicación, creatividad y pasión por la tecnología.</p>
          </div>
          <div class="step-card">
            <div class="step-number">06</div>
            <div class="step-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
            <h3>Conoce las reglas</h3>
            <p>Descarga el documento oficial con todas las reglas y condiciones de la Python Cup 2026 antes de participar.</p>
            <a href="assets/reglas/Reglas Python Cup 2026-La polla Mundialista Algorithmics.pdf" target="_blank" class="step-cta-btn step-cta-btn-pdf">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Ver reglas en PDF
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ── PUNTUACIÓN ── -->
    <section class="section section-dark" id="puntuacion">
      <div class="section-inner">
        <div class="section-tag" style="color:var(--turq)">Sistema de puntos</div>
        <h2 class="section-heading" style="color:var(--white)">¿Cómo ganas puntos?</h2>
        <p class="section-desc" style="color:var(--landing-muted)">Cuanto más precisa sea tu predicción, más puntos acumulas. Los puntos de clasificación se suman automáticamente conforme avanzan los equipos en el Mundial.</p>
        <div class="scoring-cols">

          <!-- Col 1: Puntos por partidos -->
          <div class="scoring-col">
            <h4 class="scoring-col-title">Puntos por partidos</h4>
            <div class="scoring-grid">
              <div class="score-row">
                <div class="score-pts gold"><span class="pts-num">3</span><span class="pts-label">pts</span></div>
                <div class="score-info"><strong>Marcador exacto</strong><span>Acertaste exactamente el resultado final del partido.<br><em>Ejemplo: Predijiste Colombia (2) - Brasil (1) y el partido terminó Colombia (2) - Brasil (1).</em></span></div>
              </div>
              <div class="score-row">
                <div class="score-pts silver"><span class="pts-num">1</span><span class="pts-label">pts</span></div>
                <div class="score-info"><strong>Ganador correcto</strong><span>Acertaste qué equipo ganó el partido o si terminó en empate, aunque el marcador no haya sido exactamente el mismo.<br><em>Ejemplo: Predijiste Colombia (2) - Brasil (1) y el partido terminó Colombia (3) - Brasil (0). Acertaste el ganador, por lo que obtienes 1 punto.</em></span></div>
              </div>
            </div>
          </div>

          <!-- Col 2: Puntos por clasificación -->
          <div class="scoring-col">
            <h4 class="scoring-col-title">Puntos por Clasificación</h4>
            <p class="scoring-col-desc">También ganarás puntos por acertar qué selecciones avanzarán a cada fase del Mundial. Cuanto más lejos llegue un equipo que hayas predicho correctamente, más puntos obtendrás.</p>
            <div class="scoring-grid">
              <div class="score-row"><div class="score-pts bronze"><span class="pts-num">2</span><span class="pts-label">pts</span></div><div class="score-info"><strong>Clasificados a Ronda de 32</strong><span>Inician 48 equipos y pasan 32 selecciones a la siguiente ronda. Ganas 2 puntos por cada selección que predijiste correctamente para avanzar a la Ronda de 32.</span></div></div>
              <div class="score-row"><div class="score-pts bronze"><span class="pts-num">4</span><span class="pts-label">pts</span></div><div class="score-info"><strong>Clasificados a Octavos</strong><span>De los 32 equipos, 16 selecciones pasan a Octavos de Final. Por cada selección que predijiste correctamente para avanzar a los Octavos recibes 4 puntos.</span></div></div>
              <div class="score-row"><div class="score-pts bronze"><span class="pts-num">6</span><span class="pts-label">pts</span></div><div class="score-info"><strong>Clasificados a Cuartos</strong><span>De los 16 equipos, 8 selecciones pasan a Cuartos de Final. Por cada selección que predijiste correctamente para avanzar a los Cuartos recibes 6 puntos.</span></div></div>
              <div class="score-row"><div class="score-pts bronze"><span class="pts-num">8</span><span class="pts-label">pts</span></div><div class="score-info"><strong>Clasificados a Semifinales</strong><span>De los 8 equipos, 4 pasan a Semifinal del Mundial. Por cada selección que predijiste correctamente para avanzar a las Semifinales recibes 8 puntos.</span></div></div>
              <div class="score-row"><div class="score-pts bronze"><span class="pts-num">10</span><span class="pts-label">pts</span></div><div class="score-info"><strong>Clasificados a Final</strong><span>Por cada equipo que predijiste correctamente para avanzar a la última fase recibes 10 puntos.</span></div></div>
            </div>
          </div>

          <!-- Col 3: Posiciones finales + Predicciones especiales -->
          <div class="scoring-col">
            <h4 class="scoring-col-title">Posiciones finales</h4>
            <div class="scoring-grid">
              <div class="score-row"><div class="score-pts bonus"><span class="pts-num">6</span><span class="pts-label">pts</span></div><div class="score-info"><strong>Cuarto puesto</strong><span>Recibes 6 puntos si aciertas en la selección que quede en el cuarto puesto.</span></div></div>
              <div class="score-row"><div class="score-pts bonus"><span class="pts-num">8</span><span class="pts-label">pts</span></div><div class="score-info"><strong>Tercer puesto</strong><span>Recibes 8 puntos si aciertas en la selección que quede en el tercer puesto.</span></div></div>
              <div class="score-row"><div class="score-pts muted"><span class="pts-num">1</span><span class="pts-label">pts</span></div><div class="score-info"><strong>Clasificados en posición diferente</strong><span>La selección avanzó a la siguiente fase, pero no en la posición que predijiste.<br><em>Ejemplo: Predijiste que Colombia terminaría primera de su grupo, pero clasificó segunda.</em></span></div></div>
            </div>

            <h4 class="scoring-col-title" style="margin-top:1.5rem">Predicciones especiales</h4>
            <div class="scoring-grid">
              <div class="score-row"><div class="score-pts bonus"><span class="pts-num">12</span><span class="pts-label">pts</span></div><div class="score-info"><strong>Campeón del Mundial</strong><span>Acertaste la selección que se coronó campeona del Mundial 2026.</span></div></div>
              <div class="score-row"><div class="score-pts bonus"><span class="pts-num">10</span><span class="pts-label">pts</span></div><div class="score-info"><strong>Subcampeón</strong><span>Acertaste la selección que terminó en segundo lugar del Mundial.</span></div></div>
              <div class="score-row"><div class="score-pts bronze"><span class="pts-num">5</span><span class="pts-label">pts</span></div><div class="score-info"><strong>Máximo Goleador</strong><span>Acertaste el jugador reconocido como el ganador oficial de la Bota de Oro determinado por FIFA.</span></div></div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ── DISTRIBUCIÓN DE RECURSOS ──────────────────────────── -->
    <section class="section section-alt" id="distribucion">
      <div class="section-inner">
        <div class="section-tag">Transparencia</div>
        <h2 class="section-heading">Distribución de los recursos recaudados</h2>
        <p class="section-desc" style="max-width:700px">La Python Cup 2026 — La Polla Mundialista Algorithmics es un proyecto educativo desarrollado por jóvenes desarrolladores de Algorithmics. Por ello, los recursos recaudados se distribuyen de la siguiente manera:</p>
        <div class="dist-grid">
          <div class="dist-card dist-prizes"><div class="dist-pct">33%</div><div class="dist-icon">🏆</div><h4>Bolsa de premios</h4><p>Para los participantes que ocupen de la Posición 1 a la Posición 5 de la Tabla General de Puntos.</p></div>
          <div class="dist-card dist-devs"><div class="dist-pct">34%</div><div class="dist-icon">💜</div><h4>Reconocimiento para los desarrolladores</h4><p>Para los 14 jóvenes desarrolladores que participaron en el diseño y desarrollo de la plataforma.</p></div>
          <div class="dist-card dist-ops"><div class="dist-pct">33%</div><div class="dist-icon">⚙️</div><h4>Operación e infraestructura</h4><p>Infraestructura tecnológica, organización y sostenibilidad del proyecto.</p></div>
        </div>
      </div>
    </section>

    <!-- ── PREMIACIÓN TOP 5 ──────────────────────────────────── -->
    <section class="section section-dark" id="premiacion">
      <div class="section-inner">
        <div class="section-tag" style="color:var(--turq)">Premiación</div>
        <h2 class="section-heading" style="color:var(--white)">Premiación Top 5</h2>
        <p class="section-desc" style="color:var(--landing-muted);max-width:660px">Los participantes que ocupen las 5 primeras posiciones del ranking general al finalizar el Mundial 2026 recibirán premio económico. La bolsa de premios corresponde al <strong style="color:var(--turq)">33% de los fondos recaudados</strong> por la Python Cup 2026.</p>
        <div class="prizes-grid">
          <div class="prize-big-row prize-1st"><div class="prize-rank">1°</div><div class="prize-detail"><strong>Primer lugar</strong><span>40% de la bolsa de premios</span></div><div class="prize-bar-wrap"><div class="prize-bar" style="width:40%"></div></div></div>
          <div class="prize-big-row prize-2nd"><div class="prize-rank">2°</div><div class="prize-detail"><strong>Segundo lugar</strong><span>25% de la bolsa de premios</span></div><div class="prize-bar-wrap"><div class="prize-bar" style="width:25%"></div></div></div>
          <div class="prize-big-row prize-3rd"><div class="prize-rank">3°</div><div class="prize-detail"><strong>Tercer lugar</strong><span>15% de la bolsa de premios</span></div><div class="prize-bar-wrap"><div class="prize-bar" style="width:15%"></div></div></div>
          <div class="prize-big-row prize-4th"><div class="prize-rank">4°</div><div class="prize-detail"><strong>Cuarto lugar</strong><span>10% de la bolsa de premios</span></div><div class="prize-bar-wrap"><div class="prize-bar" style="width:10%"></div></div></div>
          <div class="prize-big-row prize-5th"><div class="prize-rank">5°</div><div class="prize-detail"><strong>Quinto lugar</strong><span>10% de la bolsa de premios</span></div><div class="prize-bar-wrap"><div class="prize-bar" style="width:10%"></div></div></div>
        </div>
        <div class="prize-notes">
          <div class="prize-note-item"><span></span><p>En caso de empate, el valor correspondiente se distribuirá en partes iguales entre los participantes empatados.</p></div>
          <div class="prize-note-item"><span></span><p>La entrega de los premios se realizará de manera física en Algorithmics el día <strong>jueves 23 de julio a las 5:30 p.m.</strong></p></div>
        </div>
      </div>
    </section>

    <!-- ── EQUIPO ─────────────────────────────────────────────── -->
    <section class="section section-alt" id="equipo">
      <div class="section-inner">
        <div class="section-tag">Developer Team</div>
        <h2 class="section-heading">Conoce a los jóvenes desarrolladores</h2>
        <p class="section-desc" style="max-width:740px">Lo que comenzó como una idea en el aula hoy es una realidad. 14 jóvenes desarrolladores de Algorithmics aceptaron el reto de crear una plataforma para usuarios reales y demostraron que el aprendizaje cobra verdadero valor cuando se transforma en impacto.<br><br>Con orgullo presentamos al equipo que hizo posible la Python Cup 2026 — La Polla Mundialista Algorithmics.</p>
        <p class="team-hint">Haz clic en cada tarjeta para conocer más sobre el desarrollador</p>
        <div class="team-grid">${renderTeamCards()}</div>
        <p class="team-thanks">💜 Gracias por apoyar a nuestros jóvenes desarrolladores y ser parte de la Python Cup 2026.</p>
      </div>
    </section>

    <!-- ── MENTORES ───────────────────────────────────────────── -->
    <section class="section" id="mentores">
      <div class="section-inner">
        <div class="section-tag">Guía técnica</div>
        <h2 class="section-heading">Mentores Técnicos del Proyecto</h2>
        <p class="section-desc" style="max-width:680px">La Python Cup 2026 fue posible gracias al trabajo de nuestros estudiantes y al acompañamiento de los mentores técnicos que los guiaron durante todo el proceso. Gracias a su experiencia, nuestros estudiantes enfrentaron retos similares a los de un entorno profesional real de desarrollo de software.</p>
        <div class="mentors-grid">
          <div class="panini-card"><div class="panini-photo-wrap"><img src="assets/mentores/Mentor1.jpeg" alt="Mentor 1" class="panini-photo" onerror="this.src='assets/team/placeholder.jpg'" /><div class="panini-shine"></div></div><div class="panini-info"><div class="panini-algo-badge">MENTOR TÉCNICO</div><p class="panini-name">Deiber Cárdenas</p><p class="panini-role">Technical Lead</p><div class="panini-footer"><span class="panini-year">2026</span><span class="panini-flag">🧑‍💻</span></div></div></div>
          <div class="panini-card"><div class="panini-photo-wrap"><img src="assets/mentores/Mentor2.jpeg" alt="Mentor 2" class="panini-photo" onerror="this.src='assets/team/placeholder.jpg'" /><div class="panini-shine"></div></div><div class="panini-info"><div class="panini-algo-badge">MENTOR TÉCNICO</div><p class="panini-name">Brayan Caicedo</p><p class="panini-role">Technical Lead</p><div class="panini-footer"><span class="panini-year">2026</span><span class="panini-flag">🧑‍💻</span></div></div></div>
        </div>
      </div>
    </section>

    <!-- ── CTA FINAL ─────────────────────────────────────────── -->
    <section class="cta-section">
      <div class="cta-inner">
        <div class="section-tag" style="color:var(--turq);text-align:center;margin-bottom:0.75rem">Inscripciones abiertas</div>
        <h2>¿Listo para competir?</h2>
        <p>Inscríbete antes del <strong style="color:var(--turq)">10 de junio</strong> y registra tus predicciones antes del <strong style="color:var(--turq)">11 de junio a las 6:00 a.m.</strong></p>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSelBTfiFM2NBSe6DngXUocelOarwOdLDUQzbiMIlhcQAj5now/viewform" target="_blank" class="btn-hero-primary">Formulario de inscripción</a>
          <button class="btn-hero-secondary" onclick="window.navigate('/login')" style="border:1px solid rgba(255,255,255,0.3);padding:0.85rem 2rem;border-radius:var(--radius-sm);color:black">Ingreso a la Plataforma para personas inscritas</button>
        </div>
      </div>
    </section>

    <!-- ── CONTACTO + FOOTER ──────────────────────────────────── -->
    <footer class="landing-footer" id="contacto">
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-brand-col">
            <div class="footer-brand">
              <img src="assets/algorithmics/logo Blanco.png" alt="Algorithmics logo" style="height:32px;object-fit:contain;" onerror="this.style.display='none'" />
              <img src="assets/algorithmics/nombre Blanco.png" alt="Algorithmics" style="height:24px;object-fit:contain;" onerror="this.style.display='none'" />
            </div>
            <p class="footer-copy">Proyecto educativo · Python Cup 2026<br>Desarrollado por estudiantes de Algorithmics · 2026</p>
          </div>
          <div class="footer-contact-col">
            <h4 class="footer-section-title">Contáctanos</h4>
            <p class="footer-contact-desc">¿Necesitas ayuda con tu inscripción o tienes preguntas sobre la Python Cup 2026? Nuestro equipo estará disponible para acompañarte durante todo el proceso.</p>
            <div class="footer-links">
              <a href="https://wa.me/573203331015" target="_blank" class="footer-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>WhatsApp: +57 320 333 1015</a>
              <a href="https://maps.app.goo.gl/OwPLTdDqOFFB4zWnc" target="_blank" class="footer-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>Cra. 13 #7-62, 2do piso, Funza (frente a Grival)</a>
              <a href="https://funza-mosquera.alg.academy/es" target="_blank" class="footer-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>funza-mosquera.alg.academy/es</a>
              <a href="https://www.instagram.com/algorithmics.funza.mosquera/" target="_blank" class="footer-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>@algorithmics.funza.mosquera</a>
              <a href="https://www.facebook.com/Algorithmics.FunzayMosquera/" target="_blank" class="footer-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>Algorithmics Funza y Mosquera</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 Python Cup · Algorithmics Funza-Mosquera · Todos los derechos reservados</span>
        </div>
      </div>
    </footer>

    <!-- ── MODAL ESTUDIANTE ──────────────────────────────────── -->
    <div class="student-modal-backdrop" id="student-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="sm-name">
      <div class="student-modal-card">

        <!-- Header oscuro: foto + info -->
        <div class="student-modal-header">
          <div class="sm-avatar-wrap">
            <img class="sm-avatar" id="sm-avatar" src="" alt="" />
          </div>
          <div class="sm-meta">
            <p class="sm-name" id="sm-name"></p>
            <p class="sm-role">Full Stack Developer</p>
            <div class="sm-pills">
              <span class="sm-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span id="sm-age"></span>
              </span>
              <span class="sm-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                <span id="sm-formation"></span>
              </span>
            </div>
          </div>
          <button class="sm-close" id="sm-close" aria-label="Cerrar perfil">×</button>
        </div>

        <!-- Divider -->
        <div class="sm-divider"></div>

        <!-- Body: sobre el estudiante -->
        <div class="student-modal-body">
          <p class="sm-section-label" id="sm-about-label"></p>
          <p class="sm-about" id="sm-about"></p>
        </div>

      </div>
    </div>
  `;

  injectLandingStyles();
  initScrollAnimations();
  initNavScroll();
  initHamburger();
  initStudentModals();
}

/* ─────────────────────────────────────────────────────────────
   DATOS DE ESTUDIANTES
───────────────────────────────────────────────────────────── */
const STUDENTS = [
  {
    name: "Samuel Ospina",
    age: "13 años",
    formation: "Python Nivel 2",
    photo: "assets/team/Panini fifa - 1.webp",
    about: "Samuel se destaca por su curiosidad, compromiso y deseo constante de aprender. Durante el desarrollo de la Python Cup 2026 participó activamente en la construcción de la plataforma, demostrando iniciativa para investigar, resolver problemas y comprender nuevos conceptos técnicos. Su interés por la programación y su capacidad de análisis le permiten enfrentar retos cada vez más complejos con confianza y entusiasmo.",
  },
  {
    name: "Joel Camargo",
    age: "15 años",
    formation: "Python Nivel 2",
    photo: "assets/team/Panini fifa - 2.webp",
    about: "Joel se destaca por su pasión por la programación y su interés constante por seguir fortaleciendo sus habilidades tecnológicas. Durante el desarrollo de la Python Cup 2026 demostró compromiso, dedicación y una gran motivación para enfrentar nuevos retos. Su entusiasmo por aprender y comprender cómo funcionan las soluciones tecnológicas le ha permitido avanzar con seguridad en su formación como desarrollador.",
  },
  {
    name: "Samara Moreno",
    age: "14 años",
    formation: "Python Nivel 2",
    photo: "assets/team/Panini fifa - 3.webp",
    about: "Samara se destaca por su dedicación y esfuerzo constante en cada reto que asume. Durante el desarrollo de la Python Cup 2026 demostró compromiso, responsabilidad y una gran disposición para aprender y mejorar continuamente. Su perseverancia le ha permitido fortalecer sus habilidades en programación, afrontar desafíos técnicos con determinación y aportar al equipo con una actitud positiva y colaborativa.",
  },
  {
    name: "Zahir Palacio",
    age: "15 años",
    formation: "Python Nivel 2",
    photo: "assets/team/Panini fifa - 4.webp",
    about: "Zahir se destaca por su compromiso y capacidad de análisis al enfrentar nuevos retos. Durante el desarrollo de la Python Cup 2026 demostró una actitud responsable, enfocada en comprender los problemas antes de buscar soluciones. Su pensamiento lógico y su disposición para aprender le han permitido fortalecer sus habilidades en programación y participar activamente en el desarrollo de un proyecto tecnológico real.",
  },
  {
    name: "Juan Sebastián Ramírez",
    age: "17 años",
    formation: "Python Nivel 1",
    photo: "assets/team/Panini fifa - 5.webp",
    about: "Juan Sebastián se destaca por su excelente disposición para ayudar a sus compañeros y por su capacidad para aprender nuevos conceptos con rapidez. Durante el desarrollo de la Python Cup 2026 demostró habilidades de análisis que le permitieron comprender desafíos técnicos y proponer soluciones de manera eficiente. Su actitud colaborativa, combinada con su facilidad para aprender y aplicar conocimientos, lo convierte en un integrante valioso dentro del equipo de desarrollo.",
  },
  {
    name: "Laura Gutiérrez",
    age: "14 años",
    formation: "Python Nivel 1",
    photo: "assets/team/Panini fifa - 6.webp",
    about: "Laura se destaca por su entusiasmo y participación activa en cada actividad que emprende. Durante el desarrollo de la Python Cup 2026 demostró interés por aprender, aportar ideas y asumir nuevos desafíos con una actitud positiva. Su disposición para participar, junto con su capacidad para comprender y aplicar conceptos de programación, le ha permitido avanzar de forma constante en su formación.",
  },
  {
    name: "Sebastián Cañón",
    age: "15 años",
    formation: "Python Nivel 2",
    photo: "assets/team/Panini fifa - 7.webp",
    about: "Sebastián se destaca por su liderazgo positivo y su capacidad para motivar a quienes lo rodean. Durante el desarrollo de la Python Cup 2026 demostró iniciativa, responsabilidad y una actitud proactiva para enfrentar los retos del proyecto. Su capacidad para escuchar, colaborar y orientar a sus compañeros contribuyó al trabajo en equipo, mientras fortalecía sus habilidades en programación y resolución de problemas.",
  },
  {
    name: "Daniel Niño",
    age: "14 años",
    formation: "Python Nivel 2",
    photo: "assets/team/Panini fifa - 8.webp",
    about: "Daniel se destaca por su habilidad para aprender rápidamente y adaptarse con facilidad a nuevos desafíos. Durante el desarrollo de la Python Cup 2026 demostró una gran capacidad para comprender conceptos técnicos, aplicar conocimientos en situaciones prácticas y avanzar con seguridad en las tareas asignadas. Su rapidez para aprender, junto con su interés por la tecnología, le permite enfrentar retos cada vez más complejos y seguir fortaleciendo sus habilidades como desarrollador.",
  },
  {
    name: "Andrés Martínez",
    age: "15 años",
    formation: "Python Nivel 1",
    photo: "assets/team/Panini fifa - 9.webp",
    about: "Andrés se destaca por su perseverancia y determinación para enfrentar nuevos retos. Durante el desarrollo de la Python Cup 2026 demostró constancia, disciplina y una actitud positiva ante los desafíos técnicos, buscando comprender cada problema hasta encontrar una solución. Su capacidad para seguir aprendiendo y superar obstáculos le ha permitido avanzar de manera constante en su formación como joven desarrollador.",
  },
  {
    name: "Camilo Amaya",
    age: "13 años",
    formation: "Python Año 1",
    photo: "assets/team/Panini fifa - 10.webp",
    about: "Camilo se destaca por su creatividad para resolver problemas y encontrar diferentes caminos para alcanzar una solución. Durante el desarrollo de la Python Cup 2026 aportó ideas innovadoras y demostró una gran capacidad para analizar desafíos desde distintas perspectivas. Su pensamiento creativo, combinado con sus conocimientos en programación, le permite transformar ideas en soluciones prácticas y funcionales.",
  },
  {
    name: "Diego Moreno",
    age: "14 años",
    formation: "Python Nivel 2",
    photo: "assets/team/Panini fifa - 11.webp",
    about: "Diego se destaca por su disciplina y organización, cualidades que le permiten abordar cada reto con responsabilidad y constancia. Durante el desarrollo de la Python Cup 2026 demostró una excelente capacidad para planificar tareas, seguir procesos y mantener la atención en los detalles. Su compromiso con el aprendizaje y su enfoque estructurado le han permitido fortalecer sus habilidades técnicas y avanzar de manera sólida en su formación como desarrollador.",
  },
  {
    name: "Ángel Ramírez",
    age: "14 años",
    formation: "Python Nivel 2",
    photo: "assets/team/Panini fifa - 12.webp",
    about: "Ángel se destaca por su actitud positiva frente al aprendizaje y su facilidad para comprender nuevos conceptos. Durante la Python Cup 2026 demostró una rápida capacidad de análisis y una forma organizada de abordar los retos. Su entusiasmo por aprender y su disciplina le permiten construir soluciones de manera estructurada y efectiva.",
  },
  {
    name: "Santiago Yepes",
    age: "14 años",
    formation: "Python Nivel 2",
    photo: "assets/team/Panini fifa - 13.webp",
    about: "Santiago se destaca por su imaginación y pensamiento innovador. Durante la Python Cup 2026 demostró creatividad para proponer ideas, explorar diferentes soluciones y aportar nuevas perspectivas al proyecto. Su interés por la tecnología y su capacidad para pensar de manera diferente le permiten enfrentar los retos con ingenio y construir soluciones originales.",
  },
  {
    name: "Ian Núñez",
    age: "— años",
    formation: "Python Nivel 2",
    photo: "assets/team/Panini fifa - 14.webp",
    about: "Ian Nicolás se destaca por su capacidad de trabajo en equipo y su disposición para colaborar en el logro de objetivos comunes. Durante la Python Cup 2026 demostró una actitud participativa, comunicándose de manera efectiva con sus compañeros y aportando al desarrollo del proyecto. Su capacidad para integrarse, compartir ideas y construir soluciones en conjunto lo convierte en un valioso integrante del equipo.",
  },
];

/* ─────────────────────────────────────────────────────────────
   HAMBURGER
───────────────────────────────────────────────────────────── */
function initHamburger() {
  const btn  = document.getElementById("nav-hamburger");
  const menu = document.getElementById("nav-mobile-menu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    btn.classList.toggle("active", open);
  });
  menu.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", () => {
      menu.classList.remove("open");
      btn.classList.remove("active");
    });
  });
}

/* ─────────────────────────────────────────────────────────────
   NAV SCROLL
───────────────────────────────────────────────────────────── */
function initNavScroll() {
  const nav = document.getElementById("landing-nav");
  const bar = document.getElementById("announcement-bar");
  if (!nav) return;
  const update = () => {
    const barH = bar && bar.style.display !== "none" ? bar.offsetHeight : 0;
    nav.classList.toggle("scrolled", window.scrollY > barH + 10);
    if (nav.classList.contains("scrolled")) nav.style.top = "0";
    else nav.style.top = barH + "px";
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const href = a.getAttribute("href");
      if (href === "#") return;
      e.preventDefault();
      const t = document.querySelector(href);
      if (t) t.scrollIntoView({ behavior: "smooth" });
    });
  });
}

/* ─────────────────────────────────────────────────────────────
   TEAM CARDS
───────────────────────────────────────────────────────────── */
function renderTeamCards() {
  return STUDENTS.map((s, i) => `
    <div class="panini-card panini-clickable" data-student-index="${i}" tabindex="0" role="button" aria-label="Ver perfil de ${s.name}">
      <div class="panini-photo-wrap">
        <img src="${s.photo}" alt="${s.name}" class="panini-photo" onerror="this.src='assets/team/placeholder.jpg'" />
        <div class="panini-shine"></div>
        <div class="panini-hover-overlay">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span>Ver perfil</span>
        </div>
      </div>
      <div class="panini-info">
        <div class="panini-algo-badge">ALGORITHMICS</div>
        <p class="panini-name">${s.name}</p>
        <p class="panini-role">Full Stack Developer</p>
        <div class="panini-footer"><span class="panini-year">2026</span><span class="panini-flag">🌍</span></div>
      </div>
    </div>
  `).join("");
}

/* ─────────────────────────────────────────────────────────────
   MODAL ESTUDIANTES
───────────────────────────────────────────────────────────── */
function initStudentModals() {
  const backdrop = document.getElementById("student-modal-backdrop");
  const closeBtn = document.getElementById("sm-close");
  if (!backdrop || !closeBtn) return;

  function openModal(student) {
    const firstName = student.name.split(" ")[0];
    document.getElementById("sm-avatar").src = student.photo;
    document.getElementById("sm-avatar").alt = student.name;
    document.getElementById("sm-name").textContent = student.name;
    document.getElementById("sm-age").textContent = student.age;
    document.getElementById("sm-formation").textContent = student.formation;
    document.getElementById("sm-about-label").textContent = `Sobre ${firstName}`;
    document.getElementById("sm-about").textContent = student.about;
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeModal() {
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".panini-clickable").forEach(card => {
    card.addEventListener("click", () => {
      const idx = parseInt(card.dataset.studentIndex, 10);
      if (!isNaN(idx) && STUDENTS[idx]) openModal(STUDENTS[idx]);
    });
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const idx = parseInt(card.dataset.studentIndex, 10);
        if (!isNaN(idx) && STUDENTS[idx]) openModal(STUDENTS[idx]);
      }
    });
  });

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", e => {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && backdrop.classList.contains("open")) closeModal();
  });
}

/* ─────────────────────────────────────────────────────────────
   SCROLL ANIMATIONS
───────────────────────────────────────────────────────────── */
function initScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.1 });
  document.querySelectorAll(".step-card,.score-row,.panini-card,.dist-card,.prize-big-row")
    .forEach(el => { el.classList.add("animate-on-scroll"); obs.observe(el); });
}

/* ─────────────────────────────────────────────────────────────
   ESTILOS
───────────────────────────────────────────────────────────── */
function injectLandingStyles() {
  if (document.getElementById("landing-styles")) return;
  const style = document.createElement("style");
  style.id = "landing-styles";
  style.textContent = `
    :root { --landing-muted: rgba(255,255,255,0.65); }
    body { background: var(--white); }

    /* ── ANNOUNCEMENT BAR ── */
    .announcement-bar { position:fixed; top:0; left:0; right:0; z-index:1001; background:var(--turq); color:var(--navy); display:flex; align-items:center; justify-content:center; gap:0.75rem; padding:0.4rem 1.25rem; font-size:0.8rem; font-weight:700; }
    .announcement-text { text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .announcement-close { background:none; border:none; color:var(--navy); font-size:1.1rem; cursor:pointer; opacity:0.6; padding:0 0.2rem; line-height:1; flex-shrink:0; }
    .announcement-close:hover { opacity:1; }

    /* ── NAVBAR ── */
    .landing-nav { position:fixed; left:0; right:0; z-index:1000; top:34px; background:transparent; border-bottom:1px solid transparent; transition:top 0.3s ease, background 0.3s ease, box-shadow 0.3s ease; }
    .landing-nav.scrolled { top:0 !important; background:rgba(43,18,80,0.97); backdrop-filter:blur(12px); border-bottom-color:rgba(255,255,255,0.08); box-shadow:0 4px 24px rgba(0,0,0,0.3); }
    .nav-inner { max-width:1300px; margin:0 auto; padding:0 5%; height:64px; display:flex; align-items:center; justify-content:space-between; gap:2rem; }
    .nav-brand { display:flex; align-items:center; gap:0.5rem; text-decoration:none; flex-shrink:0; }
    .nav-algo-logo { height:35px; object-fit:contain; }
    .nav-algo-wordmark { height:35px; object-fit:contain; }
    .nav-links { display:flex; align-items:center; gap:0.15rem; }
    .nav-link { color:rgba(255,255,255,0.75); text-decoration:none; font-size:0.85rem; font-weight:500; padding:0.4rem 0.65rem; border-radius:var(--radius-sm); transition:var(--transition); display:block; }
    .nav-link:hover { color:var(--white); background:rgba(255,255,255,0.08); }
    .nav-cta { background:var(--turq); color:var(--navy); border:none; padding:0.5rem 1.1rem; border-radius:var(--radius-sm); font-size:0.85rem; font-weight:700; cursor:pointer; font-family:inherit; transition:var(--transition); margin-left:0.4rem; white-space:nowrap; text-decoration:none; display:inline-flex; align-items:center; }
    .nav-cta:hover { background:var(--turq-dark); transform:translateY(-1px); }
    .nav-cta-inscripcion { background:#E8C547; color:var(--navy); }
    .nav-cta-inscripcion:hover { background:var(--turq-dark); transform:translateY(-1px); }
    .nav-hamburger { display:none; flex-direction:column; justify-content:center; gap:5px; background:none; border:none; cursor:pointer; padding:0.35rem; width:36px; height:36px; }
    .nav-hamburger span { display:block; width:22px; height:2px; background:var(--white); border-radius:2px; transition:transform 0.25s ease, opacity 0.25s ease; transform-origin:center; }
    .nav-hamburger.active span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
    .nav-hamburger.active span:nth-child(2) { opacity:0; }
    .nav-hamburger.active span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }
    .nav-mobile-menu { display:none; flex-direction:column; gap:0.15rem; padding:0.75rem 5% 1.25rem; background:rgba(43,18,80,0.99); border-top:1px solid rgba(255,255,255,0.08); }
    .nav-mobile-menu.open { display:flex; }
    .nav-mobile-menu .nav-link { padding:0.65rem 0.75rem; font-size:0.95rem; }
    .nav-mobile-menu .nav-cta { margin:0.75rem 0 0; text-align:center; padding:0.75rem; font-size:0.95rem; justify-content:center; }
    .nav-mobile-menu .nav-cta-inscripcion { margin-top:0.75rem; }

    /* ── HERO ── */
    .hero { background:var(--navy); display:flex; flex-direction:column; padding:7rem 5% 2rem; position:relative; overflow:hidden; gap:1.25rem; min-height:100vh; box-sizing:border-box; }
    .hero-bg { position:absolute; inset:0; pointer-events:none; background: radial-gradient(ellipse 55% 80% at 85% 45%, rgba(91,33,182,0.5) 0%, transparent 65%), radial-gradient(ellipse 40% 50% at 10% 85%, rgba(91,33,182,0.3) 0%, transparent 60%); }
    .hero-top-row { position:relative; z-index:1; display:grid; grid-template-columns:1fr 320px 380px; grid-template-areas:"left center right"; align-items:center; gap:2rem; }
    .hero-left   { grid-area:left;   min-width:0; }
    .hero-center { grid-area:center; min-width:0; display:flex; flex-direction:column; gap:0.75rem; }
    .hero-right  { grid-area:right;  display:flex; align-items:center; justify-content:center; }
    .hero-title { font-size:clamp(2rem,3.8vw,4rem); font-weight:900; color:var(--white); line-height:1.05; letter-spacing:-0.025em; margin-bottom:0.55rem; }
    .hero-title-sub { display:block; font-size:clamp(1rem,2vw,1.6rem); font-weight:700; color:var(--white); letter-spacing:-0.01em; line-height:1.2; margin-top:0.2rem; }
    .hero-tagline { font-size:clamp(0.9rem,1.3vw,1.1rem); font-weight:700; color:#E8C547; margin-bottom:0.9rem; line-height:1.4; }
    .hero-subtitle { font-size:0.88rem; color:var(--landing-muted); line-height:1.7; margin-bottom:0.75rem; }
    .hero-bullets { list-style:none; margin:0 0 1.25rem; padding:0; }
    .hero-bullets li { display:flex; align-items:flex-start; gap:0.5rem; font-size:0.88rem; color:var(--landing-muted); line-height:1.6; }
    .hero-bullet-icon { flex-shrink:0; }
    .hero-actions { display:flex; gap:0.85rem; flex-wrap:wrap; align-items:center; }

    .hero-stats-card { background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:14px; padding:1.25rem 1.5rem; }
    .hsc-row { display:flex; align-items:center; gap:1rem; padding:0.7rem 0; }
    .hsc-divider { height:1px; background:rgba(255,255,255,0.1); }
    .hsc-icon { width:42px; height:42px; border-radius:50%; background:rgba(91,33,182,0.55); display:flex; align-items:center; justify-content:center; flex-shrink:0; font-family:monospace; font-size:0.85rem; color:var(--turq); font-weight:800; }
    .hsc-num { font-size:2rem; font-weight:900; color:#E8C547; line-height:1; min-width:48px; }
    .hsc-info { display:flex; flex-direction:column; gap:0.1rem; }
    .hsc-info strong { font-size:0.85rem; color:var(--white); font-weight:700; }
    .hsc-info span { font-size:0.7rem; color:var(--landing-muted); }
    .hsc-participation-box { display:flex; align-items:center; gap:0.85rem; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.14); border-radius:10px; padding:0.8rem 1.1rem; }
    .hsc-participation-box span { font-size:0.8rem; color:rgba(255,255,255,0.85); line-height:1.5; }
    .hero-logo-wrap { width:100%; max-width:360px; aspect-ratio:1; display:flex; align-items:center; justify-content:center; }
    .hero-logo-img { width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 0 36px rgba(232,197,71,0.55)) drop-shadow(0 0 70px rgba(91,33,182,0.4)); }

    /* ── HERO BOTTOM ROW ── */
    .hero-bottom-row { position:relative; z-index:1; display:grid; grid-template-columns:1fr auto; align-items:stretch; gap:1.25rem; }

    .hero-team-preview { background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.12); border-radius:14px; padding:1rem 1.25rem; display:flex; align-items:center; gap:1.25rem; min-width:0; }
    .htp-label { flex:1; min-width:0; }
    .htp-title { display:block; font-size:0.68rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--landing-muted); line-height:1.4; margin-bottom:0.4rem; }
    .htp-title strong { color:#E8C547; }
    .htp-sub { display:block; font-size:0.7rem; color:var(--landing-muted); line-height:1.5; }
    .htp-avatars { display:flex; align-items:center; gap:0.35rem; flex-shrink:0; }
    .htp-avatar { width:68px; height:80px; border-radius:7px; overflow:hidden; border:2px solid rgba(232,197,71,0.45); flex-shrink:0; }
    .htp-avatar img { width:100%; height:100%; object-fit:cover; }
    .htp-more { display:flex; align-items:center; justify-content:center; text-align:center; width:64px; height:80px; border-radius:7px; background:rgba(232,197,71,0.12); border:2px solid rgba(232,197,71,0.45); color:#E8C547; font-size:0.63rem; font-weight:700; text-decoration:none; line-height:1.4; transition:var(--transition); flex-shrink:0; }
    .htp-more:hover { background:rgba(232,197,71,0.22); }

    .hero-right-stats { background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.12); border-radius:14px; padding:1rem 1.5rem 1.6rem; display:flex; align-items:center; gap:0; position:relative; flex-shrink:0; min-width:240px; }
    .hrs-item { display:flex; flex-direction:column; align-items:center; text-align:center; flex:1; padding:0 0.75rem; gap:0.25rem; }
    .hrs-icon { color:var(--turq); flex-shrink:0; }
    .hrs-num { font-size:1.7rem; font-weight:900; color:#E8C547; line-height:1; }
    .hrs-label { font-size:0.58rem; font-weight:700; color:var(--landing-muted); text-transform:uppercase; letter-spacing:0.05em; line-height:1.4; }
    .hrs-divider { width:1px; height:52px; background:rgba(255,255,255,0.1); flex-shrink:0; }
    .hrs-disclaimer { position:absolute; bottom:0.5rem; left:0; right:0; font-size:0.62rem; color:rgba(255,255,255,0.3); text-align:center; margin:0; padding:0 0.5rem; }
    .hero-features-bar { position:relative; z-index:1; display:flex; align-items:center; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:14px; overflow:hidden; }
    .hfb-item { display:flex; align-items:center; gap:0.85rem; padding:1rem 1.75rem; flex:1; }
    .hfb-text { display:flex; flex-direction:column; gap:0.1rem; }
    .hfb-text strong { font-size:0.88rem; color:var(--white); font-weight:600; }
    .hfb-text span { font-size:0.72rem; color:var(--landing-muted); }
    .hfb-sep { width:1px; height:36px; background:rgba(255,255,255,0.1); flex-shrink:0; }
    .btn-hero-primary { background:#E8C547; color:#1a0a2e; border:none; padding:0.85rem 1.75rem; border-radius:8px; font-size:0.95rem; font-weight:700; cursor:pointer; transition:var(--transition); font-family:inherit; white-space:nowrap; text-decoration:none; display:inline-flex; align-items:center; gap:0.5rem; }
    .btn-hero-primary:hover { background:#f0d060; transform:translateY(-2px); box-shadow:0 8px 24px rgba(232,197,71,0.4); }
    .btn-hero-secondary { color:rgba(255,255,255,0.72); font-size:0.9rem; font-weight:600; text-decoration:none; transition:var(--transition); }
    .btn-hero-secondary:hover { color:var(--white); }

    /* ── SECCIONES GLOBALES ── */
    .section { padding:6rem 8%; background:var(--white); }
    .section-dark { background:var(--navy); }
    .section-alt { background:var(--gray-light); }
    .section-inner { max-width:1100px; margin:0 auto; }
    .section-tag { font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.12em; color:var(--turq-dark); margin-bottom:0.5rem; opacity:0.85; }
    .section-heading { font-size:clamp(2rem,4.5vw,3.2rem); font-weight:800; color:var(--navy); line-height:1.1; margin-bottom:1rem; letter-spacing:-0.02em; }
    .section-desc { font-size:1.05rem; color:var(--text-light); max-width:520px; line-height:1.7; margin-bottom:3rem; }
    .como-funciona-intro { display:flex; gap:2rem; align-items:flex-start; margin-bottom:3rem; }
    .como-funciona-intro .section-desc { flex:1; min-width:0; max-width:none; }
    .como-warning-box { flex:0 0 340px; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.25); border-left:4px solid #F59E0B; border-radius:var(--radius-sm); padding:1rem 1.25rem; }
    .como-warning-box p { font-size:0.85rem; color:var(--text); line-height:1.6; margin:0; }
    .como-warning-box p + p { margin-top:0.65rem; }

    /* ── STEPS ── */
    .steps-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; }
    .step-card { background:var(--gray-light); border-radius:var(--radius); padding:2rem 1.5rem; border:1px solid var(--gray-mid); transition:var(--transition); display:flex; flex-direction:column; }
    .step-card:hover { border-color:var(--turq-dark); transform:translateY(-4px); box-shadow:var(--shadow-lg); }
    .step-number { font-size:3rem; font-weight:800; color:var(--turq); line-height:1; margin-bottom:1rem; }
    .step-icon { color:var(--navy); margin-bottom:1rem; }
    .step-card h3 { font-size:1rem; font-weight:700; color:var(--navy); margin-bottom:0.5rem; }
    .step-card p  { font-size:0.88rem; color:var(--text-light); line-height:1.6; }
    .step-cta-btn { display:inline-flex; align-items:center; gap:0.5rem; margin-top:1.25rem; padding:0.65rem 1.1rem; border-radius:var(--radius-sm); font-size:0.85rem; font-weight:700; text-decoration:none; transition:var(--transition); background:var(--navy); color:var(--white); border:2px solid var(--navy); align-self:flex-start; }
    .step-cta-btn:hover { background:var(--navy-light); border-color:var(--navy-light); transform:translateY(-2px); }

    /* ── SCORING ── */
    .scoring-cols { display:grid; grid-template-columns:1fr 1fr 1fr; gap:2rem; }
    .scoring-col-title { font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:var(--turq); margin-bottom:0.5rem; }
    .scoring-col-desc { font-size:0.85rem; color:var(--landing-muted); line-height:1.6; margin-bottom:1rem; }
    .scoring-grid { display:flex; flex-direction:column; gap:0.65rem; }
    .score-row { display:flex; align-items:center; gap:1rem; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:var(--radius-sm); padding:0.85rem 1rem; transition:var(--transition); }
    .score-row:hover { background:rgba(255,255,255,0.1); border-color:rgba(232,197,71,0.25); }
    .score-pts { min-width:52px; height:52px; border-radius:var(--radius-sm); display:flex; flex-direction:column; align-items:center; justify-content:center; flex-shrink:0; }
    .pts-num { font-size:1.2rem; font-weight:800; line-height:1; }
    .pts-label { font-size:0.55rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; opacity:0.8; }
    .score-pts.gold   { background:rgba(245,158,11,0.25); color:#F5C842; }
    .score-pts.silver { background:rgba(232,197,71,0.25); color:var(--turq); }
    .score-pts.bronze { background:rgba(232,197,71,0.15); color:var(--turq-dark); }
    .score-pts.bonus  { background:rgba(34,197,94,0.2);   color:#22C55E; }
    .score-pts.muted  { background:rgba(148,163,184,0.2); color:#94A3B8; }
    .score-info { display:flex; flex-direction:column; gap:0.2rem; }
    .score-info strong { font-size:0.9rem; color:var(--white); font-weight:600; }
    .score-info span   { font-size:0.8rem; color:var(--landing-muted); line-height:1.5; }
    .score-info em     { font-style:italic; opacity:0.8; }

    /* ── DISTRIBUCIÓN ── */
    .dist-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; }
    .dist-card { border-radius:var(--radius); padding:2rem 1.75rem; border:1px solid var(--gray-mid); background:var(--white); box-shadow:var(--shadow); transition:var(--transition); }
    .dist-card:hover { transform:translateY(-4px); box-shadow:var(--shadow-lg); }
    .dist-pct { font-size:3rem; font-weight:800; line-height:1; margin-bottom:0.5rem; }
    .dist-prizes .dist-pct { color:var(--turq-dark); }
    .dist-devs  .dist-pct  { color:var(--navy-light); }
    .dist-ops   .dist-pct  { color:var(--gray); }
    .dist-icon { font-size:1.5rem; margin-bottom:0.75rem; }
    .dist-card h4 { font-size:1rem; font-weight:700; color:var(--navy); margin-bottom:0.4rem; }
    .dist-card p  { font-size:0.88rem; color:var(--text-light); line-height:1.6; }

    /* ── PREMIACIÓN ── */
    .prizes-grid { display:flex; flex-direction:column; gap:0.75rem; max-width:680px; margin-bottom:2rem; }
    .prize-big-row { display:grid; grid-template-columns:48px 1fr 200px; align-items:center; gap:1rem; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:var(--radius-sm); padding:1rem 1.25rem; }
    .prize-rank { font-size:1.4rem; font-weight:800; color:var(--turq); text-align:center; }
    .prize-1st .prize-rank { font-size:1.7rem; color:#F5C842; }
    .prize-2nd .prize-rank { color:#F5C842; }
    .prize-3rd .prize-rank { color:#F5C842; }
    .prize-detail { display:flex; flex-direction:column; gap:0.15rem; }
    .prize-detail strong { font-size:0.95rem; color:var(--white); font-weight:600; }
    .prize-detail span   { font-size:0.82rem; color:var(--landing-muted); }
    .prize-bar-wrap { background:rgba(255,255,255,0.1); border-radius:999px; height:8px; overflow:hidden; }
    .prize-bar { height:100%; background:var(--turq); border-radius:999px; }
    .prize-notes { display:flex; flex-direction:column; gap:0.75rem; max-width:640px; }
    .prize-note-item { display:flex; align-items:flex-start; gap:0.75rem; font-size:0.88rem; color:var(--landing-muted); line-height:1.6; }
    .prize-note-item span { font-size:1.1rem; flex-shrink:0; margin-top:0.1rem; }
    .prize-note-item strong { color:var(--turq); }

    /* ── EQUIPO ── */
    .team-hint { font-size:0.85rem; color:var(--text-light); margin-bottom:1.5rem; font-style:italic; }
    .team-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:1.25rem; }
    .team-thanks { text-align:center; margin-top:2rem; font-size:1rem; font-weight:600; color:var(--navy); }

    /* ── PANINI CARDS ── */
    .panini-card { background:var(--white); border-radius:10px; overflow:hidden; box-shadow:0 4px 20px rgba(59,26,107,0.12); border:1px solid var(--gray-mid); transition:var(--transition); cursor:default; }
    .panini-clickable { cursor:pointer; }
    .panini-clickable:hover { transform:translateY(-6px) rotate(1deg); box-shadow:0 12px 32px rgba(59,26,107,0.22); }
    .panini-clickable:focus { outline:2px solid var(--turq); outline-offset:2px; }
    .panini-photo-wrap { position:relative; width:100%; aspect-ratio:3/4; overflow:hidden; background:var(--navy); }
    .panini-photo { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.3s ease; }
    .panini-clickable:hover .panini-photo { transform:scale(1.04); }
    .panini-shine { position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,0.12) 0%,transparent 50%,rgba(255,255,255,0.04) 100%); pointer-events:none; }
    .panini-hover-overlay { position:absolute; inset:0; background:rgba(26,10,46,0.72); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0.4rem; opacity:0; transition:opacity 0.25s ease; color:var(--white); }
    .panini-hover-overlay span { font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:var(--turq); }
    .panini-clickable:hover .panini-hover-overlay { opacity:1; }
    .panini-info { background:var(--navy); padding:0.6rem 0.5rem 0.5rem; text-align:center; }
    .panini-algo-badge { font-size:0.5rem; font-weight:800; letter-spacing:0.12em; color:var(--turq); text-transform:uppercase; margin-bottom:0.3rem; }
    .panini-name { font-size:0.7rem; font-weight:700; color:var(--white); line-height:1.2; margin-bottom:0.15rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .panini-role { font-size:0.6rem; color:rgba(255,255,255,0.5); margin-bottom:0.4rem; }
    .panini-footer { display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.1); padding-top:0.35rem; }
    .panini-year { font-size:0.55rem; color:var(--turq); font-weight:700; }
    .panini-flag { font-size:0.7rem; }

    /* ── MENTORES ── */
    .mentors-grid { display:grid; grid-template-columns:repeat(2,180px); gap:1.5rem; }

    /* ── CTA ── */
    .cta-section { background:linear-gradient(135deg,var(--navy) 0%,var(--navy-light) 100%); padding:6rem 8%; text-align:center; }
    .cta-inner { max-width:600px; margin:0 auto; }
    .cta-section h2 { font-size:clamp(1.8rem,4vw,2.5rem); font-weight:800; color:var(--white); margin-bottom:1rem; }
    .cta-section p  { color:var(--landing-muted); font-size:1rem; margin-bottom:2rem; line-height:1.7; }

    /* ── FOOTER ── */
    .landing-footer { background:var(--navy-dark); padding:3rem 8% 1.5rem; border-top:1px solid rgba(255,255,255,0.08); }
    .footer-inner { max-width:1100px; margin:0 auto; }
    .footer-top { display:grid; grid-template-columns:1fr 2fr; gap:3rem; margin-bottom:2.5rem; }
    .footer-brand { display:flex; align-items:center; gap:0.5rem; margin-bottom:1rem; }
    .footer-copy { font-size:0.82rem; color:rgba(255,255,255,0.4); line-height:1.6; }
    .footer-section-title { font-size:0.9rem; font-weight:700; color:var(--turq); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:0.75rem; }
    .footer-contact-desc { font-size:0.85rem; color:rgba(255,255,255,0.55); line-height:1.6; margin-bottom:1.25rem; }
    .footer-links { display:flex; flex-direction:column; gap:0.6rem; }
    .footer-link { display:flex; align-items:center; gap:0.65rem; color:rgba(255,255,255,0.7); text-decoration:none; font-size:0.88rem; font-weight:500; transition:var(--transition); }
    .footer-link:hover { color:var(--turq); }
    .footer-link svg { flex-shrink:0; color:var(--turq); }
    .footer-bottom { border-top:1px solid rgba(255,255,255,0.08); padding-top:1.25rem; text-align:center; font-size:0.78rem; color:rgba(255,255,255,0.3); }

    /* ══════════════════════════════════════════
       MODAL ESTUDIANTE
    ══════════════════════════════════════════ */
    .student-modal-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      z-index: 9000;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      backdrop-filter: blur(4px);
    }
    .student-modal-backdrop.open {
      display: flex;
    }
    .student-modal-card {
      background: var(--white);
      border-radius: 18px;
      width: 100%;
      max-width: 540px;
      position: relative;
      overflow: hidden;
      animation: smSlideIn 0.25s cubic-bezier(0.34,1.56,0.64,1);
      box-shadow: 0 24px 64px rgba(0,0,0,0.45);
    }
    @keyframes smSlideIn {
      from { opacity:0; transform:translateY(20px) scale(0.95); }
      to   { opacity:1; transform:translateY(0)    scale(1); }
    }
    .student-modal-header {
      background: #1a0a2e;
      padding: 1.75rem 1.75rem 1.5rem;
      display: flex;
      align-items: flex-start;
      gap: 1.25rem;
      position: relative;
    }
    .sm-avatar-wrap {
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 3px solid rgba(232,197,71,0.7);
      overflow: hidden;
      background: #2b1250;
    }
    .sm-avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .sm-meta {
      flex: 1;
      min-width: 0;
      padding-top: 4px;
    }
    .sm-name {
      font-size: 1.1rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 4px;
      line-height: 1.2;
    }
    .sm-role {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--turq, #5dcaa5);
      margin: 0 0 12px;
    }
    .sm-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .sm-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.75rem;
      color: rgba(255,255,255,0.8);
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 999px;
      padding: 4px 10px;
      line-height: 1.3;
    }
    .sm-pill svg {
      flex-shrink: 0;
      opacity: 0.7;
      color: var(--turq, #5dcaa5);
    }
    .sm-close {
      position: absolute;
      top: 14px;
      right: 14px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.2);
      background: rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.7);
      font-size: 1.2rem;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.18s, color 0.18s;
      flex-shrink: 0;
    }
    .sm-close:hover {
      background: rgba(255,255,255,0.18);
      color: #ffffff;
    }
    .sm-close:focus {
      outline: 2px solid var(--turq, #5dcaa5);
      outline-offset: 2px;
    }
    .sm-divider {
      height: 1px;
      background: rgba(0,0,0,0.08);
    }
    .student-modal-body {
      padding: 1.5rem 1.75rem 1.75rem;
      background: var(--white);
    }
    .sm-section-label {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--turq-dark, #0f6e56);
      margin: 0 0 0.65rem;
    }
    .sm-about {
      font-size: 0.92rem;
      color: var(--text-light, #475569);
      line-height: 1.75;
      margin: 0;
    }

    /* ── ANIMATIONS ── */
    .animate-on-scroll { opacity:0; transform:translateY(20px); transition:opacity 0.5s ease,transform 0.5s ease; }
    .animate-on-scroll.visible { opacity:1; transform:translateY(0); }
    .step-card:nth-child(1){transition-delay:0.0s} .step-card:nth-child(2){transition-delay:0.1s} .step-card:nth-child(3){transition-delay:0.2s}
    .step-card:nth-child(4){transition-delay:0.0s} .step-card:nth-child(5){transition-delay:0.1s} .step-card:nth-child(6){transition-delay:0.2s}
    .panini-card:nth-child(odd){transition-delay:0.05s} .panini-card:nth-child(even){transition-delay:0.1s}

    /* ══════════════════════════════════════════
       RESPONSIVE
    ══════════════════════════════════════════ */
    @media (max-width: 1200px) {
      .hero-top-row { grid-template-columns:1fr 290px 320px; gap:1.5rem; }
      .hero-logo-wrap { max-width:300px; }
    }
    @media (max-width: 1024px) {
      .nav-links { display:none; }
      .nav-hamburger { display:flex; }
      .hero-top-row { grid-template-columns:1fr 270px 280px; gap:1.25rem; }
      .hero-logo-wrap { max-width:260px; }
      .hsc-num { font-size:1.75rem; }
      .steps-grid { grid-template-columns:repeat(2,1fr); }
      .team-grid { grid-template-columns:repeat(4,1fr); }
      .dist-grid { grid-template-columns:repeat(2,1fr); }
      .footer-top { grid-template-columns:1fr; }
    }
    @media (max-width: 860px) {
      .hero-top-row { grid-template-columns:1fr 240px; grid-template-areas:"left right" "center right"; align-items:start; gap:1.25rem; }
      .hero-right { grid-area:right; grid-row:1 / 3; align-self:center; justify-content:center; }
      .hero-logo-wrap { width:100%; max-width:230px; }
      .scoring-cols { grid-template-columns:1fr 1fr; }
    }

    /* ══════════════════════════════════════════
       768px — hero-bottom-row pasa a columna
       CLAVE: usamos display:contents en el wrapper
       para que hero-team-preview y hero-right-stats
       suban como hijos directos de .hero y podamos
       ordenarlos con order junto con los otros bloques
    ══════════════════════════════════════════ */
    @media (max-width: 768px) {
      /* El wrapper se "disuelve": sus hijos pasan al flujo de .hero */
      .hero-bottom-row {
        display: contents;
      }

      /*
        Orden en .hero (flex-column):
          hero-bg        → implícito, posición absoluta
          hero-top-row   → order 1  (título + botones arriba)
          hero-team-preview → order 2  (debajo del botón Inscríbete)
          hero-right-stats  → order 3
          hero-features-bar → order 4  (ya es hijo directo de .hero)
      */
      .hero-top-row       { order: 1; }
      .hero-team-preview  { order: 2; }
      .hero-right-stats   { order: 3; }
      .hero-features-bar  { order: 4; }

      /* Estilos de hero-team-preview para columna */
      .hero-team-preview {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.85rem;
        padding: 1rem 1.25rem;
      }
      .htp-label { width: 100%; }
      .htp-title { font-size: 0.72rem; white-space: normal; }
      .htp-sub   { display: block; font-size: 0.72rem; white-space: normal; }
      .htp-avatars {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        gap: 0.5rem;
        padding-bottom: 0.25rem;
      }
      .htp-avatar { width: 64px; height: 76px; flex-shrink: 0; }
      .htp-more   { width: 60px; height: 76px; flex-shrink: 0; }

      /* hero-right-stats ocupa todo el ancho */
      .hero-right-stats {
        min-width: unset;
        width: 100%;
        padding: 1rem 1rem 1.6rem;
      }

      /* Modal responsive */
      .student-modal-card { max-width: 100%; border-radius: 14px; }
      .student-modal-header { padding: 1.25rem 1.25rem 1.1rem; gap: 1rem; }
      .sm-avatar-wrap { width: 68px; height: 68px; }
      .sm-name { font-size: 1rem; }

      .como-funciona-intro { flex-direction:column; gap:1rem; } 
      .como-warning-box { flex:none; width:100%; }
    }

    @media (max-width: 680px) {
      .hero { padding: 6.5rem 4.5% 1.75rem; gap: 1rem; }
      .hero-top-row { grid-template-columns: 1fr; grid-template-areas: "left" "right" "center"; gap: 1rem; }
      .hero-right  { grid-row: auto; justify-content: center; }
      .hero-logo-wrap { width: min(220px,60vw); max-width: unset; }
      .hfb-sep { display: none; }
      .hero-features-bar { flex-direction: column; }
      .hfb-item { width: 100%; border-top: 1px solid rgba(255,255,255,0.08); }
      .hfb-item:first-child { border-top: none; }
      .section { padding: 4rem 5%; }
      .steps-grid { grid-template-columns: 1fr; }
      .scoring-cols { grid-template-columns: 1fr; }
      .dist-grid { grid-template-columns: 1fr; }
      .prize-big-row { grid-template-columns: 40px 1fr; }
      .prize-bar-wrap { display: none; }
      .mentors-grid { grid-template-columns: repeat(2,1fr); }
      /* Modal en mobile pequeño */
      .student-modal-backdrop { padding: 0.75rem; }
      .student-modal-header { flex-direction: column; align-items: flex-start; padding: 1.25rem 1.25rem 1rem; }
      .sm-avatar-wrap { width: 72px; height: 72px; }
      .sm-close { top: 12px; right: 12px; }
      .student-modal-body { padding: 1.25rem; }
    }

    @media (max-width: 480px) {
      .team-grid { grid-template-columns: repeat(3,1fr); }
      .score-row { flex-direction: column; align-items: flex-start; gap: 0.6rem; }
      .announcement-bar { font-size: 0.72rem; }
    }

    /* ══ BOTÓN NAVBAR MOBILE — 375px y 320px ══
       Se ajusta font-size, padding y se permite
       word-break para que el texto no se desborde
    ═════════════════════════════════════════════ */
    @media (max-width: 425px) {
      .hero { padding: 6rem 4% 1.5rem; }
      .hero-title { font-size: clamp(1.8rem,8vw,2.6rem); }
      .hero-title-sub { font-size: clamp(0.85rem,4.5vw,1.1rem); }
      .hero-logo-wrap { width: min(180px,55vw); }
      .hero-team-preview { padding: 0.85rem 1rem; gap: 0.75rem; }
      .htp-title { font-size: 0.68rem; }
      .htp-sub   { font-size: 0.67rem; }
      .htp-avatars { gap: 0.4rem; }
      .htp-avatar { width: 56px; height: 68px; }
      .htp-more   { width: 52px; height: 68px; font-size: 0.58rem; }
      .hrs-item  { padding: 0 0.4rem; }
      .hrs-num   { font-size: 1.4rem; }
      .hrs-label { font-size: 0.52rem; }
    }

    @media (max-width: 375px) {
      .hero { padding: 6rem 3.5% 1.5rem; }
      .hero-team-preview { padding: 0.85rem 0.9rem; gap: 0.65rem; }
      .htp-title { font-size: 0.65rem; letter-spacing: 0.04em; }
      .htp-sub   { display: none; }
      .htp-avatars { gap: 0.35rem; }
      .htp-avatar { width: 52px; height: 64px; }
      .htp-more   { width: 48px; height: 64px; font-size: 0.56rem; }

      /* ── Botón "Ingreso a la Plataforma" en navbar mobile ── */
      .nav-mobile-menu .nav-cta {
        font-size: 0.8rem;
        padding: 0.65rem 0.75rem;
        white-space: normal;
        word-break: break-word;
        line-height: 1.4;
        text-align: center;
      }
    }

    @media (max-width: 320px) {
      .hero { padding: 5.5rem 3% 1.25rem; gap: 0.85rem; }
      .hero-team-preview { padding: 0.75rem 0.85rem; gap: 0.6rem; border-radius: 10px; }
      .htp-title   { font-size: 0.62rem; }
      .htp-avatars { gap: 0.3rem; }
      .htp-avatar  { width: 46px; height: 56px; border-radius: 5px; }
      .htp-more    { width: 42px; height: 56px; font-size: 0.52rem; border-radius: 5px; }
      .hero-right-stats { padding: 0.85rem 0.85rem 1.5rem; border-radius: 10px; }
      .hrs-item  { padding: 0 0.3rem; }
      .hrs-num   { font-size: 1.25rem; }
      .hrs-label { font-size: 0.5rem; }
      .hero-features-bar { border-radius: 10px; }
      .hfb-item  { padding: 0.75rem 1rem; }
      .hfb-text strong { font-size: 0.8rem; }
      .hfb-text span   { font-size: 0.66rem; }

      /* ── Botón "Ingreso a la Plataforma" en navbar mobile ── */
      .nav-mobile-menu .nav-cta {
        font-size: 0.75rem;
        padding: 0.6rem 0.65rem;
        white-space: normal;
        word-break: break-word;
        line-height: 1.4;
        text-align: center;
      }
    }
  `;
  document.head.appendChild(style);
}