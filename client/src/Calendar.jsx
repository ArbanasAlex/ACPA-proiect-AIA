import FullCalendar from '@fullcalendar/react'
import themePlugin from '@fullcalendar/react/themes/classic'
import dayGridPlugin from '@fullcalendar/react/daygrid'
import timeGridPlugin from '@fullcalendar/react/timegrid'
import interactionPlugin from '@fullcalendar/react/interaction'

import '@fullcalendar/react/skeleton.css'
import '@fullcalendar/react/themes/classic/theme.css'
import '@fullcalendar/react/themes/classic/palette.css'

function demoEvents() {
  const base = new Date()
  base.setHours(0, 0, 0, 0)
  const at = (dayOffset, hour, minutes = 0) => {
    const d = new Date(base)
    d.setDate(d.getDate() + dayOffset)
    d.setHours(hour, minutes)
    return d.toISOString()
  }
  return [
    { title: 'Ion Popescu · Instr. Marin', start: at(0, 9), end: at(0, 10, 30), color: '#3b82f6' },
    { title: 'Ana Dumitru · Instr. Marin', start: at(0, 11), end: at(0, 12, 30), color: '#3b82f6' },
    { title: 'Mihai Ene · Instr. Radu', start: at(1, 14), end: at(1, 15, 30), color: '#10b981' },
    { title: 'Elena Stan · Instr. Radu', start: at(2, 10), end: at(2, 11, 30), color: '#10b981' },
  ]
}

export default function Calendar() {
  return (
    <FullCalendar
      plugins={[themePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      firstDay={1}
      height="auto"
      slotMinTime="07:00:00"
      slotMaxTime="21:00:00"
      allDaySlot={false}
      nowIndicator
      headerToolbar={{
        start: 'title',
        end: 'today prev,next timeGridDay,timeGridWeek,dayGridMonth',
      }}
      buttons={{
        today: { text: 'Azi' },
        timeGridDay: { text: 'Zi' },
        timeGridWeek: { text: 'Săptămână' },
        dayGridMonth: { text: 'Lună' },
      }}
      events={demoEvents()}
      dateClick={(info) => {
        console.log('Slot ales:', info)
        alert('Slot ales')
      }}
    />
  )
}