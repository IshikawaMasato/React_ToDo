import React, { useEffect, useState } from "react";
import todoStorage from "../../utils/todoStorage";
import CompleteTodo from "./CompleteTodo";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);

  const fetchTodos = async () => {
    // Use local storage fallback for todos
    const items = await todoStorage.getAllTodos();
    setTodos(items || []);
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
    <div className="container is-fluid">
      {todos.map((todo) => (
        <div key={todo.id} className="box" style={{ marginBottom: "1rem" }}>
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
                  className="button is-small is-primary ml-2"
                  onClick={() => handleEditClick(todo.id)}
                >
                  編集
                </button>
              </h3>
              <div className="content">
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
              </div>
              <div className="buttons mt-2">
                <CompleteTodo id={todo.id} onComplete={fetchTodos} />
                <DeleteTodo id={todo.id} onDelete={fetchTodos} />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
