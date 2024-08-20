import React, { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const EditTodo = ({ id, currentTitle, onEdit }) => {
  const [title, setTitle] = useState(currentTitle);
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "todos", id), {
        title: title,
        updated_at: new Date().toISOString(),
      });
      alert("Todo updated successfully");
      onEdit();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleEdit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Todo Title"
      />
      <button type="submit">Update Todo</button>
    </form>
  );
};

export default EditTodo;
