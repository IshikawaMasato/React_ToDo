import React from "react";
import { Routes, Route } from "react-router-dom";
import AddTodo from "../components/ToDo/AddTodo";
import TodoList from "../components/ToDo/TodoList";
import CompleteTodo from "../components/ToDo/CompleteTodo";
import DeleteTodo from "../components/ToDo/DeleteTodo";
import EditTodo from "../components/ToDo/EditTodo";

const TodoRoutes = () => (
  <Routes>
    <Route path="/add-todo" element={<AddTodo />} />
    <Route path="/todos" element={<TodoList />} />
    <Route path="/complete-todo/:id" element={<CompleteTodo />} />
    <Route path="/delete-todo/:id" element={<DeleteTodo />} />
    <Route path="/edit-todo/:id" element={<EditTodo />} />
  </Routes>
);

export default TodoRoutes;
