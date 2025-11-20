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
    <div className=' p-6 max-w-xl container bg-white/10 text-black rounded mx-auto'>
      <h1 className="text-3xl font-bold text-white mb-4">Dashboard</h1>
      <div className=" p-4 rounded max-w-md">
        {profile ? (
          <>
            <h2 className="text-xl">{profile.name || profile?.user?.name}</h2>
            <p className="text-sm">{profile.email || profile?.user?.email}</p>
          </>
        ) : <p>Loading profile...</p>}
        <div className="mt-3">
          <Link to="/tasks" className='text-white border px-4 py-2'>Tasks</Link>
        </div>
      </div>
    </div>
  )
}
