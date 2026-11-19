import { useState } from 'react'

function toLocalInput(d) {
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`
}

const overlaps = (aS, aE, bS, bE) => aS < bE && bS < aE

export default function BookingForm({ slot, data, bookings, onSave, onClose }) {
  const instructors = data.instructors.filter((i) => i.active)
  const vehicles = data.vehicles.filter((v) => v.active)
  const students = data.students

  const [start, setStart] = useState(toLocalInput(slot))
  const [duration, setDuration] = useState(90)
  const [instructorId, setInstructorId] = useState(instructors[0]?.id ?? '')
  const [vehicleId, setVehicleId] = useState(vehicles[0]?.id ?? '')
  const [studentId, setStudentId] = useState(students[0]?.id ?? '')
  const [error, setError] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!instructorId || !vehicleId || !studentId) {
      setError('Alege instructor, autoturism și cursant')
      return
    }
    const s = new Date(start)
    const end = new Date(s.getTime() + duration * 60000)
    if (s < new Date()) {
      setError('Nu poți rezerva în trecut')
      return
    }
    const clash = bookings.find(
      (b) =>
        overlaps(s, end, new Date(b.start), new Date(b.end)) &&
        (b.instructorId === instructorId || b.vehicleId === vehicleId || b.studentId === studentId)
    )
    if (clash) {
      const what =
        clash.instructorId === instructorId
          ? 'Instructorul'
          : clash.vehicleId === vehicleId
          ? 'Autoturismul'
          : 'Cursantul'
      setError(`${what} are deja o rezervare în acest interval`)
      return
    }
    onSave({
      id: crypto.randomUUID(),
      instructorId,
      vehicleId,
      studentId,
      start: s.toISOString(),
      end: end.toISOString(),
    })
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          color: '#111',
          padding: 24,
          borderRadius: 8,
          width: 340,
          display: 'grid',
          gap: 10,
          textAlign: 'left',
        }}
      >
        <h3 style={{ margin: 0 }}>Rezervare nouă</h3>

        <label>
          Început
          <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} required style={{ width: '100%' }} />
        </label>

        <label>
          Durată
          <select value={duration} onChange={(e) => setDuration(Number(e.target.value))} style={{ width: '100%' }}>
            <option value={60}>60 min</option>
            <option value={90}>90 min</option>
            <option value={120}>120 min</option>
          </select>
        </label>

        <label>
          Instructor
          <select value={instructorId} onChange={(e) => setInstructorId(e.target.value)} style={{ width: '100%' }}>
            {instructors.map((i) => (
              <option key={i.id} value={i.id}>{i.full_name}</option>
            ))}
          </select>
        </label>

        <label>
          Autoturism
          <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} style={{ width: '100%' }}>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>{v.plate} · {v.model}</option>
            ))}
          </select>
        </label>

        <label>
          Cursant
          <select value={studentId} onChange={(e) => setStudentId(e.target.value)} style={{ width: '100%' }}>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.full_name}</option>
            ))}
          </select>
        </label>

        {error && <p style={{ color: 'crimson', margin: 0 }}>{error}</p>}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose}>Anulează</button>
          <button type="submit">Rezervă</button>
        </div>
      </form>
    </div>
  )
}