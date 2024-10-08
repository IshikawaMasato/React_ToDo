import React from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const CompleteTodo = ({ id, onComplete }) => {
  const handleComplete = async () => {
    try {
      await updateDoc(doc(db, "todos", id), {
        completed: true,
        updated_at: new Date().toISOString(),
      });
      alert("Todo marked as completed");
      onComplete();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button className="button is-primary" onClick={handleComplete}>
      完了
    </button>
  );
};

export default CompleteTodo;
