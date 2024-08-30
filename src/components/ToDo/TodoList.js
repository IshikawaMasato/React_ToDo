import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import CompleteTodo from "./CompleteTodo";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";
import AddTodo from "./AddTodo";

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
    setEditingTodoId(null); // 編集をキャンセルして元の状態に戻る
  };

  return (
    <div>
      <div>
        <AddTodo onAdd={fetchTodos} />
      </div>
      {todos.map((todo) => (
        <div key={todo.id} className="box">
          {editingTodoId === todo.id ? (
            <EditTodo
              id={todo.id}
              currentTitle={todo.title}
              onEdit={fetchTodos}
              onCancel={handleEditCancel} // キャンセルボタンの処理
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
                {todo.completed ? "Completed" : "Not Completed"}
                <CompleteTodo id={todo.id} onComplete={fetchTodos} />
              </div>
              <div>{todo.created_at}</div>
              <DeleteTodo id={todo.id} onDelete={fetchTodos} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
