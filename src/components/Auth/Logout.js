import React from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Logout = () => {
  const handleLogout = async () => {
    // Clear the dev fallback flag first, then try to sign out from Firebase.
    try {
      localStorage.removeItem("fakeAuth");
    } catch (err) {
      // ignore
    }

    try {
      await signOut(auth);
      alert("User logged out successfully");
    } catch (error) {
      // If firebase signOut fails (e.g. account removed), still treat as logged out.
      alert("Logged out (dev fallback). " + (error.message || ""));
    }
  };

  return (
    <button className="button is-danger" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
