import "./App.css";
import React from "react";
import { BrowserRouter as Router} from "react-router-dom";

import AuthRoutes from "./routes/AuthRoutes";
import TodoRoutes from "./routes/TodoRoutes";
import PrivateRoute from "./routes/PrivateRoute";
import User from "./User";
import "bulma/css/bulma.css";
import Signup from "./components/Auth/Signup";

function App() {
  return (
    <Router>
      <User />
      <AuthRoutes />
      <TodoRoutes />
      <PrivateRoute />
      <Signup/>
    </Router>
  );
}

export default App;
