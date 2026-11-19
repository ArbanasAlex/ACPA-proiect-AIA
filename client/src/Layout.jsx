import { useState } from 'react'
import Calendar from './Calendar'
import AdminList from './AdminList'
import BookingForm from './BookingForm'
import Availability from './Availability'
import {
  demoVehicles,
  demoInstructors,
  demoStudents,
  demoBookings,
  demoAvailability,
} from './demoData'

const MENU = {
  admin: ['Calendar', 'Disponibilitate', 'Rezervări', 'Cursanți', 'Instructori', 'Autoturisme'],
  instructor: ['Calendar', 'Disponibilitate', 'Ore efectuate'],
  student: ['Calendar', 'Rezervări', 'Ore efectuate'],
}

const SECTIONS = {
  Autoturisme: {
    key: 'vehicles',
    columns: [
      { key: 'plate', label: 'Număr', type: 'text' },
      { key: 'model', label: 'Model', type: 'text' },
      { key: 'active', label: 'Status', type: 'bool' },
    ],
  },
  Instructori: {
    key: 'instructors',
    columns: [
      { key: 'full_name', label: 'Nume', type: 'text' },
      { key: 'phone', label: 'Telefon', type: 'text' },
      { key: 'active', label: 'Status', type: 'bool' },
    ],
  },
  Cursanți: {
    key: 'students',
    columns: [
      { key: 'full_name', label: 'Nume', type: 'text' },
      { key: 'phone', label: 'Telefon', type: 'text' },
      { key: 'category', label: 'Categorie', type: 'select', options: ['B', 'A', 'C'] },
      { key: 'hours_done', label: 'Ore efectuate', type: 'number' },
    ],
  },
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']

export default function Layout({ user, page, onNavigate, onLogout }) {
  const items = MENU[user.role] || ['Calendar']

  const [data, setData] = useState({
    vehicles: demoVehicles,
    instructors: demoInstructors,
    students: demoStudents,
  })
  const [bookings, setBookings] = useState(demoBookings)
  const [availability, setAvailability] = useState(demoAvailability)
  const [slot, setSlot] = useState(null)

  const events = bookings.map((b) => {
    const ins = data.instructors.find((i) => i.id === b.instructorId)
    const stu = data.students.find((s) => s.id === b.studentId)
    const idx = Math.max(data.instructors.findIndex((i) => i.id === b.instructorId), 0)
    return {
      id: b.id,
      title: `${stu ? stu.full_name : '?'} · ${ins ? ins.full_name : '?'}`,
      start: b.start,
      end: b.end,
      color: COLORS[idx % COLORS.length],
    }
  })

  function cancelBooking(id) {
    if (window.confirm('Anulezi această rezervare?')) {
      setBookings((list) => list.filter((b) => b.id !== id))
    }
  }

  const section = SECTIONS[page]

  let content
  if (page === 'Calendar') {
    content = (
      <>
        <p style={{ opacity: 0.7 }}>
          Click pe un slot pentru o rezervare nouă, click pe o rezervare pentru a o anula.
        </p>
        <Calendar events={events} onSlotClick={setSlot} onEventClick={cancelBooking} />
      </>
    )
  } else if (page === 'Disponibilitate') {
    content = (
      <Availability
        instructors={data.instructors}
        availability={availability}
        setAvailability={setAvailability}
      />
    )
  } else if (section) {
    content = (
      <AdminList
        key={page}
        title={page}
        items={data[section.key]}
        setItems={(value) => setData((d) => ({ ...d, [section.key]: value }))}
        columns={section.columns}
      />
    )
  } else {
    content = <p>Pagina „{page}" va fi construită aici.</p>
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', textAlign: 'left' }}>
      <aside
        style={{
          width: 220,
          padding: 16,
          background: '#1f2937',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <h3 style={{ margin: '0 0 12px' }}>Haiduc-Auto</h3>
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onNavigate(item)}
            style={{
              textAlign: 'left',
              padding: '10px 12px',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              background: page === item ? '#3b82f6' : 'transparent',
              color: 'white',
            }}
          >
            {item}
          </button>
        ))}
        <div style={{ marginTop: 'auto', fontSize: 14 }}>
          <div>{user.full_name}</div>
          <div style={{ opacity: 0.7 }}>{user.role}</div>
          <button onClick={onLogout} style={{ marginTop: 8 }}>
            Ieșire
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, minWidth: 0, padding: 24 }}>
        <h2>{page}</h2>
        {content}
      </main>

      {slot && (
        <BookingForm
          slot={slot}
          data={data}
          bookings={bookings}
          onSave={(b) => {
            setBookings((list) => [...list, b])
            setSlot(null)
          }}
          onClose={() => setSlot(null)}
        />
      )}
    </div>
  )
}