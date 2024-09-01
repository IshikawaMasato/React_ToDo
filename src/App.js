// src/App.js
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthRoutes from "./routes/AuthRoutes";
import TodoList from "./components/ToDo/TodoList";
import AddTodo from "./components/ToDo/AddTodo";
import PrivateRoute from "./routes/PrivateRoute";
import Header from "./components/Header";
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
              <Header />
              <TodoList />
            </PrivateRoute>
          }
        />
        <Route
          path="/AddTodo"
          element={
            <PrivateRoute>
              <Header />
              <AddTodo />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
