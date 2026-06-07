import { loginWithEmail } from "../js/services/firebase.js";
import { showToast } from "../js/components/toast.js";
import { navigate } from "../js/router.js";

export function renderLogin(container) {
    container.innerHTML = `
    <div class="login-page">
      <div class="login-card">

        <div class="login-header">
          <div class="login-logo">⚽</div>
          <h1 class="login-title">Polla Mundialista</h1>
          <p class="login-subtitle">Mundial de Fútbol 2026</p>
        </div>

        <div class="login-body">
          <div class="input-group">
            <label>Correo electrónico</label>
            <div class="input-wrapper">
              <i class="fas fa-envelope input-icon"></i>
              <input
                type="email"
                id="login-email"
                class="input-field"
                placeholder="tu@correo.com"
                autocomplete="email"
              />
            </div>
          </div>

          <div class="input-group">
            <label>Contraseña</label>
            <div class="input-wrapper">
              <i class="fas fa-lock input-icon"></i>
              <input
                type="password"
                id="login-password"
                class="input-field"
                placeholder="Tu contraseña"
                autocomplete="current-password"
              />
              <button class="toggle-password" id="toggle-pw" type="button">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>

          <button class="btn btn-primary btn-full" id="login-btn">
            <i class="fas fa-sign-in-alt"></i>
            Ingresar
          </button>

          <p class="login-hint">
            ¿Olvidaste tu contraseña? Contacta al administrador.
          </p>
        </div>

      </div>

      <div class="login-bg-decoration">
        <span>⚽</span><span>🏆</span><span>⚽</span>
        <span>🌍</span><span>⚽</span><span>🏆</span>
      </div>
    </div>
  `;

    // Estilos específicos del login
    injectLoginStyles();

    // Toggle password
    document.getElementById("toggle-pw").addEventListener("click", () => {
        const pw = document.getElementById("login-password");
        const icon = document.querySelector("#toggle-pw i");
        if (pw.type === "password") {
            pw.type = "text";
            icon.className = "fas fa-eye-slash";
        } else {
            pw.type = "password";
            icon.className = "fas fa-eye";
        }
    });

    // Enter para login
    document.getElementById("login-password").addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleLogin();
    });

    document.getElementById("login-btn").addEventListener("click", handleLogin);
}

async function handleLogin() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const btn = document.getElementById("login-btn");

    if (!email || !password) {
        showToast("Por favor completa todos los campos", "warning");
        return;
    }

    btn.disabled = true;
    btn.innerHTML = `<div class="spinner" style="width:20px;height:20px;border-width:3px"></div> Ingresando...`;

    try {
        await loginWithEmail(email, password);
        showToast("¡Bienvenido!", "success");
        navigate("/dashboard");
    } catch (err) {
        let msg = "Error al iniciar sesión";
        if (err.code === "auth/invalid-credential") msg = "Correo o contraseña incorrectos";
        if (err.code === "auth/too-many-requests") msg = "Demasiados intentos. Intenta más tarde";
        showToast(msg, "error");
        btn.disabled = false;
        btn.innerHTML = `<i class="fas fa-sign-in-alt"></i> Ingresar`;
    }
}

function injectLoginStyles() {
    if (document.getElementById("login-styles")) return;
    const style = document.createElement("style");
    style.id = "login-styles";
    style.textContent = `
    body { background: var(--navy); }

    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      position: relative;
      overflow: hidden;
    }

    .login-card {
      background: var(--white);
      border-radius: 20px;
      padding: 2.5rem;
      width: 100%;
      max-width: 420px;
      box-shadow: var(--shadow-lg);
      position: relative;
      z-index: 1;
    }

    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .login-logo {
      font-size: 3.5rem;
      margin-bottom: 0.75rem;
      animation: bounce 1s infinite alternate;
    }

    .login-title {
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--navy);
      margin-bottom: 0.25rem;
    }

    .login-subtitle {
      font-size: 0.9rem;
      color: var(--text-light);
      font-weight: 500;
    }

    .toggle-password {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      color: var(--gray);
      font-size: 0.9rem;
      transition: var(--transition);
    }

    .toggle-password:hover { color: var(--navy); }

    .login-hint {
      text-align: center;
      margin-top: 1.25rem;
      font-size: 0.82rem;
      color: var(--text-light);
    }

    .login-bg-decoration {
      position: absolute;
      inset: 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;
      font-size: 5rem;
      opacity: 0.04;
      pointer-events: none;
      z-index: 0;
      gap: 2rem;
      padding: 2rem;
    }
  `;
    document.head.appendChild(style);
}