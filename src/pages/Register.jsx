import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    setErr('')
    try {
      const res = await api.post('/users/register', { name, email, password })
      if (res.data.success) {
        alert("Registration Successful! Please login.");
        navigate("/login");
      }
    } catch (error) {
      setErr(error?.response?.data?.message || error.message || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white/10 p-6 rounded">
      <h2 className="text-2xl mb-4">Create account</h2>
      {err && <div className="text-red-300 mb-2">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input required value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 rounded bg-white/5" placeholder="Name" />
        <input required value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 rounded bg-white/5" placeholder="Email" />
        <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 rounded bg-white/5" placeholder="Password (min 6)" />
        <button className="w-full p-2 rounded bg-white/20">Register</button>
      </form>
    </div>
  )
}
