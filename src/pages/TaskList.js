import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then((data) => {
        setTasks(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching tasks:", err);
        setIsLoading(false);
      });
  }, [token]);

  const addTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: newTask }),
    });

    if (!res.ok) {
      console.error("❌ Failed to add task");
      return;
    }

    const data = await res.json();
    setTasks([...tasks, data]);
    setNewTask("");
  };

  const toggleTask = async (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    const updated = { completed: !task.completed };
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });
      if (!res.ok) {
        console.error("❌ Failed to update task");
        return;
      }
      const data = await res.json();
      setTasks(tasks.map((t) => (t._id === taskId ? data : t)));
    } catch (err) {
      console.error("❌ Error updating task:", err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        console.error("❌ Failed to delete task");
        return;
      }
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("❌ Error deleting task:", err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <form onSubmit={addTask} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors add-task-button"
              >
                Add Task
              </button>
            </div>
          </form>

          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600">
              {completedCount} of {totalCount} tasks completed
            </div>
            <div className="flex gap-2">
              {["all", "active", "completed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 text-sm rounded ${
                    filter === f ? "bg-primary text-white" : "bg-gray-200"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ul className="space-y-2">
              {filteredTasks.length === 0 ? (
                <li className="text-center py-4 text-gray-500">
                  {filter === "all"
                    ? "No tasks yet. Add one above!"
                    : filter === "completed"
                    ? "No completed tasks"
                    : "No active tasks"}
                </li>
              ) : (
                filteredTasks.map((task) => (
                  <li
                    key={task._id}
                    className={`flex items-center justify-between p-3 border rounded-lg ${
                      task.completed ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task._id)}
                        className="h-5 w-5 text-primary rounded focus:ring-primary"
                      />
                      <span
                        className={`ml-3 ${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default TaskList;
