
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar(){
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  function logout(){
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <nav className="p-4 flex justify-between items-center container mx-auto bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="text-xl font-bold">PrimeTrade</div>
      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logout} className="ml-2 px-3 py-1 rounded bg-white/10">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
