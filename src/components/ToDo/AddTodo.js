import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useCallback } from "react";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const reloadPage = useCallback(() => {
    window.location.reload();
  }, []);

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
        reloadPage();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo"
          />
        </div>
        <div className="control">
          <button className="button is-primary" type="submit">
            追加
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTodo;
