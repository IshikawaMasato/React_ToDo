import React from "react";
import Signup from "../components/Auth/Signup";
import Login from "../components/Auth/Login";

const AuthRoutes = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Login</h1>
        <Login />
      </div>
      <div className="auth-form">
        <h1>Sign Up</h1>
        <Signup />
      </div>
    </div>
  );
};


export default AuthRoutes;
