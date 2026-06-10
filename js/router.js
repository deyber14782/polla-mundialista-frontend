import { auth } from "./services/firebase.js";
import { renderLogin } from "../pages/login.js";
import { renderDashboard } from "../pages/dashboard.js";
import { renderPredictions } from "../pages/predictions.js";
import { renderRanking } from "../pages/ranking.js";
import { renderProfile } from "../pages/profile.js";
import { renderAdmin } from "../pages/admin.js";
import { renderLanding } from "../pages/landing.js";


const routes = {
  "/": renderLanding,
  "/landing": renderLanding,
  "/dashboard": renderDashboard,
  "/predictions": renderPredictions,
  "/ranking": renderRanking,
  "/profile": renderProfile,
  "/admin": renderAdmin,
  "/login": renderLogin,
};

export const publicRoutes = ["/login", "/", "/landing"];

export function navigate(path) {
  window.history.pushState({}, "", path);
  renderRoute(path);
}

export function renderRoute(path = window.location.pathname) {
  const app = document.getElementById("app");
  const navbar = document.getElementById("navbar");
  const user = auth.currentUser;

  // Solo redirigir si intenta acceder a ruta privada sin sesión
  // y no es una ruta pública
  if (!user && !publicRoutes.includes(path)) {
    navigate("/login");
    return;
  }

  // Si está autenticado y va al login → dashboard
  if (user && path === "/login") {
    navigate("/dashboard");
    return;
  }

  const renderFn = routes[path] || renderDashboard;

  if (publicRoutes.includes(path)) {
    navbar.classList.add("hidden");
  } else {
    navbar.classList.remove("hidden");
    renderNavbar(path);
  }

  app.innerHTML = "";
  app.style.maxWidth = "";
  app.style.padding = "";
  renderFn(app);
}

function renderNavbar(activePath) {
  const navbar = document.getElementById("navbar");

  // Importamos auth para verificar rol
  import("./services/firebase.js").then(({ auth }) => {
    import("./services/api.js").then(({ usersAPI }) => {
      usersAPI.getMe().then(user => {
        const isAdmin = user.role === "admin";

        navbar.innerHTML = `
          <div class="navbar-inner">
            <div class="navbar-brand" onclick="window.navigate('/dashboard')">
              <img src="assets/logo.webp" alt="Python Cup 2026" style="height:36px;object-fit:contain;" />
              <span class="brand-name">Python Cup 2026</span>
            </div>
            <ul class="navbar-links">
              <li>
                <a href="/dashboard" class="nav-link ${activePath === "/dashboard" ? "active" : ""}"
                   onclick="event.preventDefault(); window.navigate('/dashboard')">
                  <i class="fas fa-home"></i> <span>Inicio</span>
                </a>
              </li>
              <li>
                <a href="/predictions" class="nav-link ${activePath === "/predictions" ? "active" : ""}"
                   onclick="event.preventDefault(); window.navigate('/predictions')">
                  <i class="fas fa-futbol"></i> <span>Predicciones</span>
                </a>
              </li>
              <li>
                <a href="/ranking" class="nav-link ${activePath === "/ranking" ? "active" : ""}"
                   onclick="event.preventDefault(); window.navigate('/ranking')">
                  <i class="fas fa-trophy"></i> <span>Ranking</span>
                </a>
              </li>
              <li>
                <a href="/profile" class="nav-link ${activePath === "/profile" ? "active" : ""}"
                   onclick="event.preventDefault(); window.navigate('/profile')">
                  <i class="fas fa-user"></i> <span>Perfil</span>
                </a>
              </li>
              ${isAdmin ? `
              <li>
                <a href="/admin" class="nav-link ${activePath === "/admin" ? "active" : ""}"
                   onclick="event.preventDefault(); window.navigate('/admin')"
                   style="color:var(--turq)">
                  <i class="fas fa-shield-alt"></i> <span>Admin</span>
                </a>
              </li>` : ""}
            </ul>
          </div>
        `;
      });
    });
  });
}

// Manejo de botones atrás/adelante del navegador
window.addEventListener("popstate", () => renderRoute());

// Exponer navigate globalmente para usarlo en onclick
window.navigate = navigate;