import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddTodo = () => {
  const [title, setTitle] = useState("");

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "todos"), {
          user_id: user.uid,
          title: title,
          completed: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        setTitle("");
        alert("Todo added successfully");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;
