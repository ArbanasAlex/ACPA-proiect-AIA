import { useState, useEffect } from 'react'
import Login from './Login'
import Layout from './Layout'

const API = 'http://localhost:3000'

export default function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('Calendar')

  useEffect(() => {
    if (!token) return
    fetch(`${API}/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setUser)
  }, [token])

  function logout() {
    setToken(null)
    setUser(null)
    setPage('Calendar')
  }

  if (!token) return <Login onLogin={setToken} />
  if (!user) return <p style={{ padding: 24 }}>Se încarcă...</p>

  return <Layout user={user} page={page} onNavigate={setPage} onLogout={logout} />
}