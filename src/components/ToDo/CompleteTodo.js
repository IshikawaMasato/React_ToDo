import React from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const CompleteTodo = ({ id }) => {
  const handleComplete = async () => {
    try {
      await updateDoc(doc(db, "todos", id), {
        completed: true,
        updated_at: new Date().toISOString(),
      });
      alert("Todo marked as completed");
    } catch (error) {
      alert(error.message);
    }
  };

  return <button onClick={handleComplete}>Complete</button>;
};

export default CompleteTodo;
