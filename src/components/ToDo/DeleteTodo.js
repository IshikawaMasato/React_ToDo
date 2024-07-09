import React from "react";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const DeleteTodo = ({ id }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "todos", id));
      alert("Todo deleted successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteTodo;
