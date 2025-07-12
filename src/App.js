import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-primary">Taskify</h1>
          <p className="text-gray-600">Complete your tasks efficiently</p>
        </div>
      </header>

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
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
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
              {["all", "active", "completed"].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 text-sm rounded ${filter === f ? "bg-primary text-white" : "bg-gray-200"}`}
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
                filteredTasks.map(task => (
                  <li
                    key={task.id}
                    className={`flex items-center justify-between p-3 border rounded-lg ${task.completed ? "bg-gray-50" : "bg-white"}`}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="h-5 w-5 text-primary rounded focus:ring-primary"
                      />
                      <span className={`ml-3 ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                        {task.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
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

      <footer className="bg-white border-t mt-8">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Taskify - Get things done!</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
