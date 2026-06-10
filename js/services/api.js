import { getToken } from "./firebase.js";

const BASE_URL = "https://web-production-a1387.up.railway.app";

// ══════════════════════════════════════════════════════
//  CACHÉ EN MEMORIA + DEDUPLICACIÓN
// ══════════════════════════════════════════════════════
const _cache = {};
const _inflight = {};  // Promises en vuelo — evita requests duplicadas

const CACHE_TTL = {
  "/matches":             10 * 60 * 1000,
  "/users/me":             2 * 60 * 1000,
  "/predictions/me/stats": 2 * 60 * 1000,
  "/predictions/me":       2 * 60 * 1000,
  "/ranking/me":           1 * 60 * 1000,
};

function getCached(endpoint) {
  const entry = _cache[endpoint];
  if (!entry) return null;
  if (Date.now() - entry.ts > (CACHE_TTL[endpoint] || 0)) {
    delete _cache[endpoint];
    return null;
  }
  return entry.data;
}

function setCache(endpoint, data) {
  if (CACHE_TTL[endpoint]) {
    _cache[endpoint] = { data, ts: Date.now() };
  }
}

export function invalidateCache(...endpoints) {
  if (endpoints.length === 0) {
    Object.keys(_cache).forEach(k => delete _cache[k]);
  } else {
    endpoints.forEach(ep => delete _cache[ep]);
  }
}

// ══════════════════════════════════════════════════════
//  REQUEST BASE — con caché + deduplicación
// ══════════════════════════════════════════════════════
async function request(method, endpoint, body = null, { useCache = true } = {}) {
  // 1) Caché hit
  if (method === "GET" && useCache) {
    const cached = getCached(endpoint);
    if (cached) return cached;
  }

  // 2) Deduplicación: si ya hay un GET en vuelo para este endpoint, reusar
  if (method === "GET" && _inflight[endpoint]) {
    return _inflight[endpoint];
  }

  // 3) Crear el fetch
  const promise = (async () => {
    const token = await getToken(false);
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const config = { method, headers };
    if (body) config.body = JSON.stringify(body);

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Error desconocido" }));
      throw new Error(error.detail || "Error en la petición");
    }

    const data = await response.json();
    if (method === "GET") setCache(endpoint, data);
    return data;
  })();

  // Registrar como en vuelo si es GET
  if (method === "GET") {
    _inflight[endpoint] = promise;
    promise.finally(() => { delete _inflight[endpoint]; });
  }

  return promise;
}

// ══════════════════════════════════════════════════════
//  WARMUP — despierta Railway ANTES de que el usuario lo necesite
// ══════════════════════════════════════════════════════
let _warmupDone = false;

export function warmupBackend() {
  if (_warmupDone) return;
  _warmupDone = true;
  // GET real a un endpoint ligero para forzar el cold start
  fetch(`${BASE_URL}/docs`, { method: "GET", mode: "no-cors" }).catch(() => {});
}

// ══════════════════════════════════════════════════════
//  PREFETCH — pre-carga datos comunes post-login
// ══════════════════════════════════════════════════════
export async function prefetchCommonData() {
  try {
    await Promise.allSettled([
      request("GET", "/users/me"),
      request("GET", "/matches"),
      request("GET", "/predictions/me/stats"),
      request("GET", "/ranking/me").catch(() => null),
    ]);
  } catch (_) {}
}

// ══════════════════════════════════════════════════════
//  APIs
// ══════════════════════════════════════════════════════

export const usersAPI = {
  getMe:       () => request("GET", "/users/me"),
  updateMe:    (data) => request("PUT", "/users/me", data),
  getUser:     (uid) => request("GET", `/users/${uid}`),
  register:    (data) => request("POST", "/users/register", data),
  getAllUsers:  () => request("GET", "/users/"),
  deleteUser:   (uid) => request("DELETE", `/users/${uid}`),
};

export const matchesAPI = {
  getAll:       (phase = null) => request("GET", `/matches${phase ? `?phase=${phase}` : ""}`),
  getLive:      () => request("GET", "/matches/live", null, { useCache: false }),
  getOne:       (fixtureId) => request("GET", `/matches/${fixtureId}`),
  getMyBracket: () => request("GET", "/matches/bracket/me"),
};

export const predictionsAPI = {
  create:              (data) => request("POST", "/predictions/", data),
  update:              (fixtureId, data) => request("PUT", `/predictions/${fixtureId}`, data),
  getMyPredictions:    () => request("GET", "/predictions/me"),
  getMyStats:          () => request("GET", "/predictions/me/stats"),
  getMatchPredictions: (fixtureId) => request("GET", `/predictions/match/${fixtureId}`),
  getMyTopScorer:      () => request("GET", "/predictions/top-scorer/me"),

  saveBatch: async (predictions) => {
    const result = await request("POST", "/predictions/batch", predictions);
    invalidateCache("/predictions/me", "/predictions/me/stats", "/ranking/me", "/users/me");
    return result;
  },

  saveTopScorer: async (data) => {
    const result = await request("POST", "/predictions/top-scorer", data);
    invalidateCache("/predictions/me");
    return result;
  },
};

export const rankingAPI = {
  getAll:        () => request("GET", "/ranking/"),
  getMyPosition: () => request("GET", "/ranking/me"),
  getTop:        (n) => request("GET", `/ranking/top/${n}`),
};