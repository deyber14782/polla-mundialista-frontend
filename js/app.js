import { onAuthChange } from "./services/firebase.js";
import { renderRoute, navigate, publicRoutes } from "./router.js";
import { warmupBackend, prefetchCommonData } from "./services/api.js";

// Despierta Railway mientras el usuario ve el login/landing
warmupBackend();

const loader = document.getElementById("app-loader");
let authResolved = false;

function getCurrentPath() {
  const path = window.location.pathname;
  if (path.includes("index.html") || path === "/frontend/" || path === "/") return "/";
  const match = path.match(/\/frontend(\/.*)?/);
  return match ? (match[1] || "/") : path;
}

onAuthChange((user) => {
  loader.style.display = "none";

  if (authResolved && user) return;
  authResolved = !!user;

  const path = getCurrentPath();

  if (user) {
    // Pre-carga datos en paralelo mientras navega al dashboard
    prefetchCommonData();

    if (path === "/login" || path === "/") {
      navigate("/dashboard");
    } else {
      renderRoute(path);
    }
  } else {
    authResolved = false;
    if (publicRoutes.includes(path)) {
      renderRoute(path);
    } else {
      navigate("/login");
    }
  }
});