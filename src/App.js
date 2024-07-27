import "./App.css";
import React from "react";
import { BrowserRouter as Router} from "react-router-dom";

import AuthRoutes from "./routes/AuthRoutes";
import TodoRoutes from "./routes/TodoRoutes";
import PrivateRoute from "./routes/PrivateRoute";
import User from "./User";
import "bulma/css/bulma.css";

function App() {
  return (
    <Router>
      <User />
      <AuthRoutes />
      <TodoRoutes />
      <PrivateRoute />
    </Router>
  );
}

export default App;
