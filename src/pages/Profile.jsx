import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Profile(){
  const [form, setForm] = useState({ name: '', email: '' })
  const [msg, setMsg] = useState('')

  useEffect(()=>{
    api.get('/users/currentUser')
      .then(res => {
        // backend may return profile object directly or inside data
        const d = res.data.data || res.data?.user
        setForm({ name: d.name || d.user?.name, email: d.email || d.user?.email })
      })
      .catch(()=>{})
  },[])

  async function save(){
    try{
      await api.patch('/users/updateInfo', form)
      setMsg('Saved')
      setTimeout(()=>setMsg(''),2000)
    }catch(err){
      setMsg('Error saving')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white/10 p-6 rounded">
      <h2 className="text-2xl mb-4">Profile</h2>
      <input className="w-full p-2 rounded text-black mb-2 bg-gray-200" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
      <input className="w-full p-2 rounded text-black mb-2 bg-gray-200" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
      <button onClick={save} className="p-2 bg-gray-200 rounded">Save</button>
      {msg && <div className="mt-2">{msg}</div>}
    </div>
  )
}
