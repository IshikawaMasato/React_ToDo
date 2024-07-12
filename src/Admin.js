import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <h1>管理画面</h1>
      <nav>
        <ul>
          <li>
            <Link to="/add-todo">タスク登録</Link>
          </li>
          <li>
            <Link to="/todos">タスク閲覧</Link>
          </li>
          <li>
            <Link to="/logout">ログアウト</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Admin;
