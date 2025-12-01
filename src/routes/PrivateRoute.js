import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Allow a local dev fallback: if "fakeAuth" is set in localStorage,
  // treat the user as authenticated. This lets the Login button
  // navigate to protected routes even if Firebase is unavailable.
  let isFake = false;
  try {
    isFake =
      typeof window !== "undefined" &&
      localStorage.getItem("fakeAuth") === "true";
  } catch (err) {
    isFake = false;
  }

  if (isFake) return children;

  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
