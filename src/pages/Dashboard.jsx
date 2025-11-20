import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function Dashboard(){
  const [profile, setProfile] = useState(null)

  useEffect(()=>{
    api.get('/users/currentUser')
  
      .then(res => setProfile(res.data.data))
      .catch(()=> setProfile(null))
  },[])

  return (
    <div className='border'>
      <h1 className="text-3xl mb-4">Dashboard</h1>
      <div className="bg-white/10 p-4 rounded max-w-md">
        {profile ? (
          <>
            <h2 className="text-xl">{profile.name || profile?.user?.name}</h2>
            <p className="text-sm">{profile.email || profile?.user?.email}</p>
          </>
        ) : <p>Loading profile...</p>}
        <div className="mt-3">
          <Link to="/tasks" className="underline">Manage tasks</Link>
        </div>
      </div>
    </div>
  )
}
