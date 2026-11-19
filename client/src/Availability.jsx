import { useState } from 'react'

const DAYS = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică']

export default function Availability({ instructors, availability, setAvailability }) {
  const active = instructors.filter((i) => i.active)
  const [instructorId, setInstructorId] = useState(active[0]?.id ?? '')
  const [weekday, setWeekday] = useState(1)
  const [from, setFrom] = useState('08:00')
  const [to, setTo] = useState('16:00')
  const [error, setError] = useState('')

  const mine = availability.filter((a) => a.instructorId === instructorId)

  function add(e) {
    e.preventDefault()
    setError('')
    if (from >= to) {
      setError('Ora de început trebuie să fie înainte de ora de sfârșit')
      return
    }
    const clash = mine.some((a) => a.weekday === weekday && from < a.to && a.from < to)
    if (clash) {
      setError('Intervalul se suprapune cu unul existent în aceeași zi')
      return
    }
    setAvailability([
      ...availability,
      { id: crypto.randomUUID(), instructorId, weekday, from, to },
    ])
  }

  function remove(id) {
    setAvailability(availability.filter((a) => a.id !== id))
  }

  if (active.length === 0) {
    return <p>Nu există instructori activi. Adaugă unul din pagina Instructori.</p>
  }

  return (
    <div>
      <label>
        Instructor:{' '}
        <select value={instructorId} onChange={(e) => setInstructorId(e.target.value)}>
          {active.map((i) => (
            <option key={i.id} value={i.id}>{i.full_name}</option>
          ))}
        </select>
      </label>

      <form onSubmit={add} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '16px 0' }}>
        <select value={weekday} onChange={(e) => setWeekday(Number(e.target.value))}>
          {DAYS.map((d, i) => (
            <option key={d} value={i + 1}>{d}</option>
          ))}
        </select>
        <input type="time" value={from} onChange={(e) => setFrom(e.target.value)} required />
        <input type="time" value={to} onChange={(e) => setTo(e.target.value)} required />
        <button type="submit">Adaugă interval</button>
      </form>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <div style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
        {DAYS.map((d, i) => {
          const slots = mine
            .filter((a) => a.weekday === i + 1)
            .sort((a, b) => a.from.localeCompare(b.from))
          return (
            <div
              key={d}
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid rgba(128,128,128,0.4)',
              }}
            >
              <strong style={{ width: 90 }}>{d}</strong>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {slots.length === 0 && <span style={{ opacity: 0.6 }}>Indisponibil</span>}
                {slots.map((s) => (
                  <span key={s.id}>
                    {s.from}–{s.to}{' '}
                    <button onClick={() => remove(s.id)} title="Șterge">✕</button>
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}