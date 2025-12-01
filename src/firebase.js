import { initializeApp } from "firebase/app";
let analytics = null;
let auth = null;
let db = null;

// If REACT_APP_DISABLE_FIREBASE is set to 'true' OR no apiKey is provided,
// skip Firebase initialization and export safe stubs to avoid runtime errors
// in environments where Firebase isn't configured (e.g. temporary deploys).
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const buildDisable =
  process.env.REACT_APP_DISABLE_FIREBASE === "true" || !firebaseConfig.apiKey;

// Allow runtime override (useful for deployed static builds where env vars are baked at build time).
// You can toggle with `localStorage.setItem('DISABLE_FIREBASE','true')` in the browser console and reload.
let runtimeDisable = false;
try {
  if (typeof window !== "undefined") {
    runtimeDisable =
      window.__DISABLE_FIREBASE__ === true ||
      window.__DISABLE_FIREBASE__ === "true" ||
      (localStorage.getItem &&
        localStorage.getItem("DISABLE_FIREBASE") === "true");
  }
} catch (err) {
  runtimeDisable = false;
}

const shouldDisable = buildDisable || runtimeDisable;

if (!shouldDisable) {
  try {
    // Dynamically import only the modules we need so bundlers/tree-shakers
    // don't break when disabled. Keep imports static for CRA compatibility.
    const { getAnalytics } = require("firebase/analytics");
    const { getAuth } = require("firebase/auth");
    const { getFirestore } = require("firebase/firestore");

    const app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (err) {
    // If initialization fails (invalid API key etc.), fall back to stubs.
    // Do not rethrow to avoid crashing the app in deployed environment.
    // eslint-disable-next-line no-console
    console.warn("Firebase init failed, falling back to stubs:", err.message);
  }
}

// Safe auth stub for environments without Firebase.
const makeAuthStub = () => {
  return {
    currentUser: null,
    // onAuthStateChanged should accept a callback and call it with null.
    onAuthStateChanged: (cb) => {
      try {
        if (typeof cb === "function") cb(null);
      } catch (e) {
        // ignore
      }
      // return noop unsubscribe
      return () => {};
    },
    // Sign-in/sign-out methods that reject so callers can handle errors if they call them.
    signOut: async () => {
      return Promise.reject(new Error("Firebase disabled"));
    },
  };
};

const makeDbStub = () => ({
  /* placeholder object for Firestore */
});

if (!auth) auth = makeAuthStub();
if (!db) db = makeDbStub();

export { analytics, auth, db };
