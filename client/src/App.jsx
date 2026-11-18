import { useState, useEffect } from 'react'
import Login from './Login'

const API = 'http://localhost:3000'

export default function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!token) return
    fetch(`${API}/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setUser)
  }, [token])

  if (!token) return <Login onLogin={setToken} />

  return (
    <div style={{ maxWidth: 480, margin: '80px auto' }}>
      <h2>Bun venit{user ? `, ${user.full_name}` : ''}!</h2>
      {user && <p>Rol: {user.role}</p>}
      <button onClick={() => { setToken(null); setUser(null) }}>Ieșire</button>
    </div>
  )
}