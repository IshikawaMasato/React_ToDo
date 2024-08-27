import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import CompleteTodo from "./CompleteTodo";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

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

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} className="box">
          <h3 className="title is-4">
            {todo.title}
            <EditTodo
              id={todo.id}
              currentTitle={todo.title}
              onEdit={fetchTodos}
            />
          </h3>
          <p>
            {todo.completed ? "Completed" : "Not Completed"}
            <CompleteTodo id={todo.id} onComplete={fetchTodos} />
          </p>
          <p>{todo.created_at}</p>
          <DeleteTodo id={todo.id} onDelete={fetchTodos} />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
