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
    if (!title.trim()) return;

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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div
        className="
          mx-auto bg-white rounded-2xl shadow-lg
          w-full max-w-md
          md:max-w-2xl
          lg:max-w-4xl
          p-6 md:p-8
        "
      >
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-6">
          To-Do List
        </h2>

        {/* Input Section */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="
              flex-1 rounded-lg border border-gray-300 px-4 py-3
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />
          <button
            onClick={addTodo}
            className="
              bg-blue-600 text-white px-6 py-3 rounded-lg
              hover:bg-blue-700 transition
              md:w-auto w-full
            "
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="
                flex items-center justify-between
                bg-gray-50 px-4 py-3 rounded-xl
                hover:bg-gray-100 transition
              "
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className={`cursor-pointer select-none ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {todo.title}
              </span>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {todos.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-6">
            No tasks yet. Add one above 👆
          </p>
        )}
      </div>
    </div>
  );
}

export default TodoApp;