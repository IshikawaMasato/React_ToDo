import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Firebase account removed — use a local dev fallback to allow navigation.
    // This sets a simple flag in localStorage that PrivateRoute will accept.
    try {
      localStorage.setItem("fakeAuth", "true");
    } catch (err) {
      // ignore localStorage errors in some environments
    }
    alert("Logged in (dev fallback)");
    navigate("/TodoList");
  };

  return (
    <div className="container is-fluid">
      <div className="box" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <form onSubmit={handleLogin}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>
          <div className="field has-text-centered">
            <div className="control">
              <button className="button is-primary" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
