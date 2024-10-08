import React from "react";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const DeleteTodo = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "todos", id));
      alert("Todo deleted successfully");
      console.log(onDelete);
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
