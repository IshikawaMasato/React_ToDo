import React, { useState, useCallback } from "react";
import todoStorage from "../../utils/todoStorage";
import "bulma/css/bulma.css";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [deadline, setDeadline] = useState("");
  const [reminder, setReminder] = useState("");
  const [selectedTags, setSelectedTags] = useState([""]);
  const [defaultTags] = useState(["仕事", "勉強", "趣味", "家事", "その他"]);
  const [subtasks, setSubtasks] = useState([""]);
  const [sharedWith, setSharedWith] = useState([""]);

  const handleAddItem = (setter, list) => () => {
    setter([...list, ""]);
  };

  const handleRemoveItem = (setter, index, list) => () => {
    setter(list.filter((_, i) => i !== index));
  };

  const handleChangeItem = (setter, index, list) => (e) => {
    const newList = [...list];
    newList[index] = e.target.value;
    setter(newList);
  };

  const reloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await todoStorage.addTodo({
        title: title,
        priority: priority,
        deadline: deadline,
        reminder: reminder,
        tags: selectedTags.filter((tag) => tag !== ""),
        subtasks: subtasks.filter((task) => task !== ""),
        sharedWith: sharedWith.filter((email) => email !== ""),
        completed: false,
      });
      setTitle("");
      setPriority("medium");
      setDeadline("");
      setReminder("");
      setSelectedTags([""]);
      setSubtasks([""]);
      setSharedWith([""]);
      alert("Todo added successfully");
      reloadPage();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container is-fluid">
      <div className="box" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">タイトル</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="タスクのタイトルを入力"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">優先度</label>
            <div className="control">
              <div className="select">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="無し">無し</option>
                  <option value="低">低</option>
                  <option value="中">中</option>
                  <option value="高">高</option>
                  <option value="緊急">緊急</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">締め切り日</label>
            <div className="control">
              <input
                className="input"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">リマインダー</label>
            <div className="control">
              <input
                className="input"
                type="datetime-local"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">タグ</label>
            {selectedTags.map((tag, index) => (
              <div key={index} className="field is-grouped">
                <div className="control">
                  <div className="select">
                    <select
                      value={tag}
                      onChange={handleChangeItem(
                        setSelectedTags,
                        index,
                        selectedTags
                      )}
                    >
                      <option value="">タグを選択</option>
                      {defaultTags.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="control">
                  <button
                    type="button"
                    className="button is-danger"
                    onClick={handleRemoveItem(
                      setSelectedTags,
                      index,
                      selectedTags
                    )}
                    disabled={selectedTags.length === 1}
                  >
                    −
                  </button>
                </div>
                {index === selectedTags.length - 1 && (
                  <div className="control">
                    <button
                      type="button"
                      className="button is-link"
                      onClick={handleAddItem(setSelectedTags, selectedTags)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="field">
            <label className="label">サブタスク</label>
            {subtasks.map((subtask, index) => (
              <div key={index} className="field is-grouped">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={subtask}
                    onChange={handleChangeItem(setSubtasks, index, subtasks)}
                    placeholder="サブタスクを入力"
                  />
                </div>
                <div className="control">
                  <button
                    type="button"
                    className="button is-danger"
                    onClick={handleRemoveItem(setSubtasks, index, subtasks)}
                    disabled={subtasks.length === 1}
                  >
                    −
                  </button>
                </div>
                {index === subtasks.length - 1 && (
                  <div className="control">
                    <button
                      type="button"
                      className="button is-link"
                      onClick={handleAddItem(setSubtasks, subtasks)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="field">
            <label className="label">共有する相手</label>
            {sharedWith.map((email, index) => (
              <div key={index} className="field is-grouped">
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    value={email}
                    onChange={handleChangeItem(
                      setSharedWith,
                      index,
                      sharedWith
                    )}
                    placeholder="メールアドレスを入力"
                  />
                </div>
                <div className="control">
                  <button
                    type="button"
                    className="button is-danger"
                    onClick={handleRemoveItem(setSharedWith, index, sharedWith)}
                    disabled={sharedWith.length === 1}
                  >
                    −
                  </button>
                </div>
                {index === sharedWith.length - 1 && (
                  <div className="control">
                    <button
                      type="button"
                      className="button is-link"
                      onClick={handleAddItem(setSharedWith, sharedWith)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="field has-text-centered">
            <div className="control">
              <button type="submit" className="button is-primary">
                追加
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
