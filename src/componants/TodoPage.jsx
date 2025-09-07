import { useState, useEffect } from "react";
import Footer from "./Footer";

function TodoPage() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (user) {
      if (todos.length > 0) syncDemoTodos();
      else fetchTodos();
    }
  }, [user]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("https://my-backend-1-2jy2.onrender.com/todos", {
        headers: { Authorization: token },
      });
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const syncDemoTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      const promises = todos.map((t) =>
        fetch("https://my-backend-1-2jy2.onrender.com/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: token },
          body: JSON.stringify({ todo: t.todo, isCompleted: t.isCompleted }),
        })
      );
      await Promise.all(promises);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddOrUpdate = async () => {
    if (todo.trim().length < 3) return;

    if (editingId) {
      setTodos(todos.map((t) => (t._id === editingId ? { ...t, todo } : t)));
      if (user && !editingId.startsWith("demo-")) {
        try {
          const token = localStorage.getItem("token");
          await fetch(`https://my-backend-1-2jy2.onrender.com/todos/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: token },
            body: JSON.stringify({ todo }),
          });
        } catch (err) {
          console.error(err);
        }
      }
      setEditingId(null);
      setTodo("");
    } else {
      const newTodo = { _id: `demo-${Date.now()}`, todo, isCompleted: false };
      setTodos([newTodo, ...todos]);
      setTodo("");
      if (user) {
        try {
          const token = localStorage.getItem("token");
          const res = await fetch("https://my-backend-1-2jy2.onrender.com/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: token },
            body: JSON.stringify({ todo }),
          });
          const savedTodo = await res.json();
          setTodos((prev) => prev.map((t) => (t._id === newTodo._id ? savedTodo : t)));
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  const handleEdit = (id, text) => {
    setTodo(text);
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    setTodos(todos.filter((t) => t._id !== id));
    if (user && !id.startsWith("demo-")) {
      try {
        const token = localStorage.getItem("token");
        await fetch(`https://my-backend-1-2jy2.onrender.com/todos/${id}`, {
          method: "DELETE",
          headers: { Authorization: token },
        });
      } catch (err) {
        console.error(err);
      }
    }
    if (editingId === id) {
      setEditingId(null);
      setTodo("");
    }
  };

  const handleCheck = async (id, isCompleted) => {
    setTodos(todos.map((t) => (t._id === id ? { ...t, isCompleted: !isCompleted } : t)));
    if (user && !id.startsWith("demo-")) {
      try {
        const token = localStorage.getItem("token");
        await fetch(`https://my-backend-1-2jy2.onrender.com/todos/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: token },
          body: JSON.stringify({ isCompleted: !isCompleted }),
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const toggleShowFinished = () => setShowFinished(!showFinished);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-gray-900">
        <div className="flex justify-center p-4 sm:p-6">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-4 sm:p-6 ">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-purple-700 mb-6 font-serif">
              Just Do It ✅ 
            </h1>

            <div className="mb-6 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Enter your task..."
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleAddOrUpdate()}
              />
              <button
                onClick={handleAddOrUpdate}
                disabled={todo.trim().length < 3}
                className="px-5 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingId ? "Update" : "Add"}
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={showFinished}
                onChange={toggleShowFinished}
                className="w-4 h-4 accent-purple-600"
              />
              <span className="text-gray-700 text-sm sm:text-base">
                Show Completed
              </span>
            </div>

            <div>
              {loading ? (
                <div className="text-gray-500 italic">Loading...</div>
              ) : todos.filter((t) => showFinished || !t.isCompleted).length === 0 ? (
                <div className="text-gray-500 italic">No tasks added yet...</div>
              ) : (
                todos
                  .filter((t) => showFinished || !t.isCompleted)
                  .map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50    rounded-xl p-3 mb-2 shadow-lg"
                    >
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <input
                          type="checkbox"
                          checked={item.isCompleted}
                          onChange={() => handleCheck(item._id, item.isCompleted)}
                          className="w-4 h-4 accent-purple-600"
                        />
                        <span
                          className={`text-base sm:text-lg break-words ${
                            item.isCompleted ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {item.todo}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <button
                          onClick={() => handleEdit(item._id, item.todo)}
                          className="px-3 py-1 rounded-lg bg-yellow-400 text-white font-medium hover:bg-yellow-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="px-3 py-1 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
            {!user?( <p className="text-center text-red-700">please login to keep your data save</p>):""}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TodoPage;
