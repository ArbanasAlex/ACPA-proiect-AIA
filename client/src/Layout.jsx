import { useState } from 'react'
import Calendar from './Calendar'
import AdminList from './AdminList'
import { demoVehicles, demoInstructors, demoStudents } from './demoData'

const MENU = {
  admin: ['Calendar', 'Rezervări', 'Cursanți', 'Instructori', 'Autoturisme'],
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

export default function Layout({ user, page, onNavigate, onLogout }) {
  const items = MENU[user.role] || ['Calendar']

  const [data, setData] = useState({
    vehicles: demoVehicles,
    instructors: demoInstructors,
    students: demoStudents,
  })

  const section = SECTIONS[page]

  let content
  if (page === 'Calendar') {
    content = <Calendar />
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
    </div>
  )
}