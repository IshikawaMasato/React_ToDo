// src/App.js
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthRoutes from "./routes/AuthRoutes";
import Logout from "./components/Auth/Logout";
import TodoList from "./components/ToDo/TodoList";
import PrivateRoute from "./routes/PrivateRoute";
import "bulma/css/bulma.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthRoutes />} />
        <Route
          path="/TodoList"
          element={
            <PrivateRoute>
              <TodoList />
              <Logout />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
