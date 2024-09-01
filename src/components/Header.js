import React from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Auth/Logout";

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar is-primary">
      <div className="navbar-brand">
        <div className="navbar-item is-size-3">Todo App</div>
        <button className="navbar-item is-light" onClick={() => navigate('/AddTodo')}>
          Todo追加
        </button>
        <button
          className="navbar-item is-light"
          onClick={() => navigate("/TodoList")}
        >
          Todo一覧
        </button>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <Logout />
        </div>
      </div>
    </nav>
  );
};

export default Header;
