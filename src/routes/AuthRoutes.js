import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../components/Auth/Signup";
import Login from "../components/Auth/Login";
import Logout from "../components/Auth/Logout";

const AuthRoutes = () => (
  <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/logout" element={<Logout />} />
  </Routes>
);

export default AuthRoutes;
