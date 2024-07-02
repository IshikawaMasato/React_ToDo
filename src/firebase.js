import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCK1HI8wgVbeNFTveLQm5twDpx20oLOVnc",
  authDomain: "reacttodo-f7270.firebaseapp.com",
  projectId: "reacttodo-f7270",
  storageBucket: "reacttodo-f7270.appspot.com",
  messagingSenderId: "359055250376",
  appId: "1:359055250376:web:7415cfce520f495ee7a6fd",
  measurementId: "G-JX130KLL2R",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { analytics,auth, db };
