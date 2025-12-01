import React from "react";
import todoStorage from "../../utils/todoStorage";

const CompleteTodo = ({ id, onComplete }) => {
  const handleComplete = async () => {
    try {
      await todoStorage.updateTodo(id, { completed: true });
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
