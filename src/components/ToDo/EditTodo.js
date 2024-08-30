import React, { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";

const EditTodo = ({ id, currentTitle, onEdit, onCancel }) => {
  const [title, setTitle] = useState(currentTitle);

  const reloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "todos", id), {
        title: title,
        updated_at: new Date().toISOString(),
      });
      alert("Todo updated successfully");
      onEdit(); // 編集後にTodoリストを再取得
      reloadPage();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleEdit}>
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New Todo Title"
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-primary" type="submit">
            更新
          </button>
          <button
            className="button is-light"
            type="button"
            onClick={onCancel} // キャンセル時の処理
          >
            戻る
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditTodo;
