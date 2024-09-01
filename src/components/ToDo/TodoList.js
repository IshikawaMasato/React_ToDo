import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import CompleteTodo from "./CompleteTodo";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);

  const fetchTodos = async () => {
    const user = auth.currentUser;
    if (user) {
      const q = query(
        collection(db, "todos"),
        where("user_id", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      setTodos(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleEditClick = (id) => {
    setEditingTodoId(id);
  };

  const handleEditCancel = () => {
    setEditingTodoId(null);
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} className="box">
          {editingTodoId === todo.id ? (
            <EditTodo
              id={todo.id}
              currentTodo={todo}
              onEdit={fetchTodos}
              onCancel={handleEditCancel}
            />
          ) : (
            <>
              <h3 className="title is-4">
                {todo.title}
                <button
                  className="button is-small is-primary"
                  onClick={() => handleEditClick(todo.id)}
                >
                  編集
                </button>
              </h3>
              <div>
                <strong>優先度:</strong> {todo.priority}
              </div>
              <div>
                <strong>締め切り日:</strong> {todo.deadline}
              </div>
              <div>
                <strong>リマインダー:</strong> {todo.reminder}
              </div>
              <div>
                <strong>タグ:</strong> {todo.tags && todo.tags.join(", ")}
              </div>
              <div>
                <strong>サブタスク:</strong>{" "}
                {todo.subtasks && todo.subtasks.join(", ")}
              </div>
              <div>
                <strong>共有相手:</strong>{" "}
                {todo.sharedWith && todo.sharedWith.join(", ")}
              </div>
              <div>
                <strong>ステータス:</strong>{" "}
                {todo.completed ? "完了" : "未完了"}
              </div>
              <div>
                <strong>作成日:</strong> {todo.created_at}
              </div>
              <div>
                <strong>更新日:</strong> {todo.updated_at}
              </div>
              <CompleteTodo id={todo.id} onComplete={fetchTodos} />
              <DeleteTodo id={todo.id} onDelete={fetchTodos} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
