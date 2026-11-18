const MENU = {
  admin: ['Calendar', 'Rezervări', 'Cursanți', 'Instructori', 'Autoturisme'],
  instructor: ['Calendar', 'Disponibilitate', 'Ore efectuate'],
  student: ['Calendar', 'Rezervări', 'Ore efectuate'],
}

export default function Layout({ user, page, onNavigate, onLogout }) {
  const items = MENU[user.role] || ['Calendar']

  return (
    <div style={{ display: 'flex', minHeight: '100vh', textAlign: 'left' }}>
      <aside style={{ width: 220, padding: 16, background: '#1f2937', color: 'white', display: 'flex', flexDirection: 'column', gap: 8 }}>
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
          <button onClick={onLogout} style={{ marginTop: 8 }}>Ieșire</button>
        </div>
      </aside>

      <main style={{ flex: 1, padding: 24 }}>
        <h2>{page}</h2>
        <p>Pagina „{page}” va fi construită aici.</p>
      </main>
    </div>
  )
}