import { useEffect, useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/todos`);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    fetchTodos();
  };

  const toggleTodo = async (id) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/todos/${id}`, {
      method: "PATCH",
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  };

  return (
    <div>
      <h2>To-Do List</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTodo}>Add</button>

      {todos.map((todo) => (
        <div key={todo.id}>
          <span
            onClick={() => toggleTodo(todo.id)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.title}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>X</button>
        </div>
      ))}
    </div>
  );
}

export default TodoApp;
