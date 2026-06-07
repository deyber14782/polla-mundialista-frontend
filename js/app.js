import { onAuthChange } from "./services/firebase.js";
import { renderRoute, navigate, publicRoutes } from "./router.js";

const loader = document.getElementById("app-loader");

function getCurrentPath() {
  const path = window.location.pathname;
  if (path.includes("index.html") || path === "/frontend/" || path === "/") {
    return "/";
  }
  const match = path.match(/\/frontend(\/.*)?/);
  return match ? (match[1] || "/") : path;
}

onAuthChange((user) => {
  loader.style.display = "none";
  const path = getCurrentPath();

  console.log("onAuthChange - user:", !!user, "path:", path);

  if (user) {
    if (path === "/login" || path === "/") {
      navigate("/dashboard");
    } else {
      renderRoute(path);
    }
  } else {
    if (publicRoutes.includes(path)) {
      renderRoute(path);  // ← llama directo, NO navigate
    } else {
      navigate("/login");
    }
  }
});

onAuthChange(async (user) => {
  if (user) {
    const token = await user.getIdToken();
    console.log("TOKEN:", token);  // cópialo de aquí
  }
});