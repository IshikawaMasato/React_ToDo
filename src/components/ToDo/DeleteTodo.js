import React from "react";
import todoStorage from "../../utils/todoStorage";

const DeleteTodo = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await todoStorage.deleteTodo(id);
      alert("Todo deleted successfully");
      onDelete();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button className="button is-danger" onClick={handleDelete}>
      削除
    </button>
  );
};

export default DeleteTodo;
