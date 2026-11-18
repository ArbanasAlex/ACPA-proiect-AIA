import { useState } from 'react'

const border = '1px solid rgba(128,128,128,0.4)'

export default function AdminList({ title, items, setItems, columns }) {
  const emptyForm = Object.fromEntries(
    columns.map((c) => [c.key, c.type === 'bool' ? true : c.type === 'select' ? c.options[0] : ''])
  )
  const [form, setForm] = useState(emptyForm)
  const [search, setSearch] = useState('')

  function add(e) {
    e.preventDefault()
    const item = { id: crypto.randomUUID(), ...form }
    columns.forEach((c) => {
      if (c.type === 'number') item[c.key] = Number(form[c.key]) || 0
    })
    setItems([...items, item])
    setForm(emptyForm)
  }

  function toggle(id, key) {
    setItems(items.map((i) => (i.id === id ? { ...i, [key]: !i[key] } : i)))
  }

  function remove(id) {
    if (window.confirm('Sigur vrei să ștergi?')) {
      setItems(items.filter((i) => i.id !== id))
    }
  }

  const visible = items.filter((i) =>
    Object.values(i).join(' ').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <form onSubmit={add} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {columns.map((c) => {
          if (c.type === 'bool') {
            return (
              <label key={c.key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  type="checkbox"
                  checked={form[c.key]}
                  onChange={(e) => setForm({ ...form, [c.key]: e.target.checked })}
                />
                {c.label}
              </label>
            )
          }
          if (c.type === 'select') {
            return (
              <select key={c.key} value={form[c.key]} onChange={(e) => setForm({ ...form, [c.key]: e.target.value })}>
                {c.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            )
          }
          return (
            <input
              key={c.key}
              type={c.type === 'number' ? 'number' : 'text'}
              placeholder={c.label}
              value={form[c.key]}
              onChange={(e) => setForm({ ...form, [c.key]: e.target.value })}
              required
            />
          )
        })}
        <button type="submit">Adaugă</button>
      </form>

      <input
        placeholder={`Caută în ${title.toLowerCase()}...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 12, width: 260 }}
      />

      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key} style={{ textAlign: 'left', padding: 8, borderBottom: border }}>
                  {c.label}
                </th>
              ))}
              <th style={{ borderBottom: border }} />
            </tr>
          </thead>
          <tbody>
            {visible.map((item) => (
              <tr key={item.id}>
                {columns.map((c) => (
                  <td key={c.key} style={{ padding: 8, borderBottom: border }}>
                    {c.type === 'bool' ? (
                      <button onClick={() => toggle(item.id, c.key)}>
                        {item[c.key] ? 'Activ' : 'Inactiv'}
                      </button>
                    ) : (
                      item[c.key]
                    )}
                  </td>
                ))}
                <td style={{ padding: 8, borderBottom: border }}>
                  <button onClick={() => remove(item.id)}>Șterge</button>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} style={{ padding: 12, opacity: 0.7 }}>
                  Nimic de afișat.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}