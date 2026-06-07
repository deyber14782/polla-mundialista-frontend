import { getToken } from "./firebase.js";

const BASE_URL = "https://polla-mundialista-production-b653.up.railway.app"; // en producción cambiar por la URL del backend

async function request(method, endpoint, body = null) {
    const token = await getToken(true);

    console.log("TOKEN para", endpoint, "→", token ? token.substring(0, 20) + "..." : "NULL");

    const headers = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const config = { method, headers };
    if (body) config.body = JSON.stringify(body);

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: "Error desconocido" }));
        throw new Error(error.detail || "Error en la petición");
    }

    return response.json();
}

// ── Users ──────────────────────────────────────────
export const usersAPI = {
    getMe: () => request("GET", "/users/me"),
    updateMe: (data) => request("PUT", "/users/me", data),
    getUser: (uid) => request("GET", `/users/${uid}`),
    register: (data) => request("POST", "/users/register", data),
    getAllUsers: () => request("GET", "/users/"),
    deleteUser: (uid) => request("DELETE", `/users/${uid}`),
};

// ── Matches ────────────────────────────────────────
export const matchesAPI = {
  getAll: (phase = null) => request("GET", `/matches${phase ? `?phase=${phase}` : ""}`),
  getLive:      () => request("GET", "/matches/live"),
  getOne:       (fixtureId) => request("GET", `/matches/${fixtureId}`),
  getMyBracket: () => request("GET", "/matches/bracket/me"),
};
// ── Predictions ────────────────────────────────────
export const predictionsAPI = {
    create: (data) => request("POST", "/predictions/", data),
    update: (fixtureId, data) => request("PUT", `/predictions/${fixtureId}`, data),
    getMyPredictions: () => request("GET", "/predictions/me"),
    getMyStats: () => request("GET", "/predictions/me/stats"),
    getMatchPredictions: (fixtureId) => request("GET", `/predictions/match/${fixtureId}`),
    saveBatch: (predictions) => request("POST", "/predictions/batch", predictions),
};

// ── Ranking ────────────────────────────────────────
export const rankingAPI = {
    getAll: () => request("GET", "/ranking/"),
    getMyPosition: () => request("GET", "/ranking/me"),
    getTop: (n) => request("GET", `/ranking/top/${n}`),
};