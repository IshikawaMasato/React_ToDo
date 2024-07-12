import "./App.css";
import React from "react";
import { BrowserRouter as Router} from "react-router-dom";

import AuthRoutes from "./routes/AuthRoutes";
import TodoRoutes from "./routes/TodoRoutes";
import PrivateRoute from "./routes/PrivateRoute";
import Admin from "./Admin";

function App() {
  return (
    <Router>
      <Admin />
      <AuthRoutes />
      <TodoRoutes />
      <PrivateRoute />
    </Router>
  );
}

export default App;
