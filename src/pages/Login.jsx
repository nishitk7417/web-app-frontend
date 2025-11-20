import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    setErr('')
    try {
      const res = await api.post('/users/login', { email, password },{ withCredentials: true })
      const userToken = res.data?.data?.accessToken;
      localStorage.setItem('token', userToken);
      navigate('/dashboard')
    } catch (error) {
      setErr(error?.response?.data?.message || error.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-black/10 p-6 rounded">
      <h2 className="text-2xl mb-4">Login</h2>
      {err && <div className="text-red-300 mb-2">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input required value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 rounded bg-white/5" placeholder="Email" />
        <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 rounded bg-white/5" placeholder="Password" />
        <button className="w-full p-2 rounded bg-white/20">Login</button>
      </form>
      <p className="mt-3 text-sm">Don't have an account? <Link to="/register" className="underline">Register</Link></p>
    </div>
  )
}
