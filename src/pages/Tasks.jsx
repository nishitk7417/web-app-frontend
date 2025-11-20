import React, { useEffect, useState } from "react";
import api from "../api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  // Fetch all tasks
  async function fetchTasks() {
    const res = await api.get("/tasks");
    setTasks(res.data.data || []);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  //  Create Task
  async function createTask(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");

    const taskData = {
      title,
      description,
      status
    };
    

    await api.post("/tasks", taskData);

    setTitle("");
    setDescription("");
    setStatus("pending");

    fetchTasks();
  }

  //  Update Task
  async function updateTask(id, newProgress) {
    await api.put(`/tasks/${id}`, { status: newProgress });
    fetchTasks();
  }

  // Delete Task
  async function deleteTask(id) {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  }

  return (
    <div className="p-6 max-w-xl bg-black/10 text-black rounded mx-auto">
      <h1 className="text-2xl text-white font-bold mb-4">Tasks</h1>

      {/* Create Task */}
      <form onSubmit={createTask} className="mb-6 space-y-3">
        <input
          className="p-2 w-full bg-gray-200 rounded"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="p-2 w-full bg-gray-200 rounded"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="p-2 w-full bg-gray-200 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-3">
        <span className="text-xl font-semibold">All tasks:</span>
        {tasks.map((task) => (
          <div
            key={task._id}
            className="p-3 bg-gray-100 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="text-black-500 font-semibold">{task.title}</h3>
              <p className="text-sm">{task.description || "No description"}</p>
              <p className="text-xs text-gray-500">
                status: {task.status}
              </p>
            </div>

            <div className="flex gap-2">
              <select
                value={task.status}
                onChange={(e) => updateTask(task._id, e.target.value)}
                className="p-1 bg-white border rounded"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <button
                onClick={() => deleteTask(task._id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
