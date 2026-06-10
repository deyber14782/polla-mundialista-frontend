import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  browserSessionPersistence,
  setPersistence
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// 🔴 Reemplaza con tu config de Firebase Console
// Ve a Configuración del proyecto → Tu app web → Configuración de SDK
const firebaseConfig = {
  apiKey: "AIzaSyBZsICvTB7dn_YZvYHLgGba6pC6M9gjvMc",
  authDomain: "pollaalgorithmicsfunzamosquera.firebaseapp.com",
  databaseURL: "https://pollaalgorithmicsfunzamosquera-default-rtdb.firebaseio.com",
  projectId: "pollaalgorithmicsfunzamosquera",
  storageBucket: "pollaalgorithmicsfunzamosquera.firebasestorage.app",
  messagingSenderId: "774958382654",
  appId: "1:774958382654:web:22294eb0ca0132ed7d1b6f"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

setPersistence(auth, browserSessionPersistence);

export async function loginWithEmail(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function logout() {
  await signOut(auth);
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function getToken(forceRefresh = false) {
  // Espera a que Firebase resuelva el estado de auth antes de pedir el token
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (!user) {
        resolve(null);
        return;
      }
      try {
        const token = await user.getIdToken(forceRefresh);
        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  });
}

// ── Firestore realtime listeners ──────────────────────────────────

export function listenToRanking(callback) {
  /**
   * Escucha cambios en la colección users en tiempo real.
   * Devuelve la función unsubscribe para limpiar el listener.
   */
  const q = query(
    collection(db, "users"),
    where("role", "==", "player"),
    orderBy("total_score", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const players = snapshot.docs.map(doc => doc.data());
    callback(players);
  });
}

export function listenToMatches(callback) {
  /**
   * Escucha cambios en partidos en vivo.
   */
  const q = query(
    collection(db, "matches"),
    where("status", "in", ["1H", "HT", "2H"])
  );

  return onSnapshot(q, (snapshot) => {
    const matches = snapshot.docs.map(doc => doc.data());
    callback(matches);
  });
}