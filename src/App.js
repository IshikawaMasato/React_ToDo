import "./App.css";
import React from "react";
import { BrowserRouter as Router} from "react-router-dom";

import AuthRoutes from "./routes/AuthRoutes";
import TodoRoutes from "./routes/TodoRoutes";
import PrivateRoute from "./routes/PrivateRoute";


function App() {
  return (
    <Router>
      <AuthRoutes />
      <TodoRoutes />
      <PrivateRoute />
    </Router>
  );
}

export default App;
