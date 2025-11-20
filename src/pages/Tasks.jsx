import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Tasks(){
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [q, setQ] = useState('')

  async function fetchTasks(query=''){
    const res = await api.get('/tasks', { params: query ? { q: query } : {} })
    // backend might return tasks array under res.data or res.data.tasks
    
    setTasks(res.data.data.tasks || res.data || [])
  }

  useEffect(()=>{ fetchTasks() }, [])

  async function createTask(e){
    e.preventDefault()
    if(!title) return
    await api.post('/tasks', { title, description: desc })
    setTitle(''); setDesc('')
    fetchTasks()
  }

  async function deleteTask(id){
    if(!confirm('Delete task?')) return
    await api.delete(`/tasks/${id}`)
    fetchTasks(q)
  }

  async function updateStatus(id, status){
    await api.put(`/tasks/${id}`, { status })
    fetchTasks(q)
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">Tasks</h2>

      <form onSubmit={createTask} className="mb-4 max-w-md">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="p-2 rounded bg-white/5 w-full mb-2" />
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="p-2 rounded bg-white/5 w-full mb-2" />
        <button className="px-4 py-2 bg-white/20 rounded">Add Task</button>
      </form>

      <div className="mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by title" className="p-2 rounded bg-white/5 mr-2" />
        <button onClick={()=>fetchTasks(q)} className="px-3 py-1 bg-white/20 rounded">Search</button>
        <button onClick={()=>{ setQ(''); fetchTasks(); }} className="px-3 py-1 ml-2 bg-white/10 rounded">Clear</button>
      </div>

      <ul className="space-y-2">
        {tasks.length===0 ? <p>No tasks found</p> : tasks.map(task => (
          <li key={task._id || task.id} className="bg-white/5 p-3 rounded flex justify-between items-center">
            <div>
              <div className="font-bold">{task.title}</div>
              <div className="text-sm">{task.description}</div>
            </div>
            <div className="flex items-center space-x-2">
              <select value={task.status} onChange={e=>updateStatus(task._id || task.id, e.target.value)} className="p-1 rounded bg-white/10">
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button onClick={()=>deleteTask(task._id || task.id)} className="px-2 py-1 rounded bg-red-600/30">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
