// Simple localStorage-backed todo storage for development fallback
const LOCAL_KEY = "local_todos";

function readStorage() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function writeStorage(todos) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
  } catch (err) {
    // ignore
  }
}

function generateId() {
  return `todo_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

export async function getAllTodos() {
  // return promise to mimic async firestore calls
  return Promise.resolve(readStorage());
}

export async function addTodo(todo) {
  const todos = readStorage();
  const newTodo = {
    id: generateId(),
    ...todo,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    completed: todo.completed || false,
  };
  todos.push(newTodo);
  writeStorage(todos);
  return Promise.resolve(newTodo);
}

export async function updateTodo(id, updates) {
  const todos = readStorage();
  const idx = todos.findIndex((t) => t.id === id);
  if (idx === -1) return Promise.reject(new Error("Todo not found"));
  const updated = {
    ...todos[idx],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  todos[idx] = updated;
  writeStorage(todos);
  return Promise.resolve(updated);
}

export async function deleteTodo(id) {
  const todos = readStorage();
  const newTodos = todos.filter((t) => t.id !== id);
  writeStorage(newTodos);
  return Promise.resolve();
}

export async function getTodoById(id) {
  const todos = readStorage();
  return Promise.resolve(todos.find((t) => t.id === id));
}

export async function clearAll() {
  writeStorage([]);
  return Promise.resolve();
}

const todoStorage = {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
  clearAll,
};

export default todoStorage;
