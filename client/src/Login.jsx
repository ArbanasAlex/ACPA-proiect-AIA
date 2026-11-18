import { useState } from 'react'

const API = 'http://localhost:3000'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Eroare la autentificare')
      } else {
        onLogin(data.access_token)
      }
    } catch {
      setError('Serverul nu răspunde')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: '80px auto', display: 'grid', gap: 12 }}>
      <h2>Autentificare</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Parolă" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" disabled={loading}>{loading ? 'Se verifică...' : 'Intră în cont'}</button>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
    </form>
  )
}