import FullCalendar from '@fullcalendar/react'
import themePlugin from '@fullcalendar/react/themes/classic'
import dayGridPlugin from '@fullcalendar/react/daygrid'
import timeGridPlugin from '@fullcalendar/react/timegrid'
import interactionPlugin from '@fullcalendar/react/interaction'

import '@fullcalendar/react/skeleton.css'
import '@fullcalendar/react/themes/classic/theme.css'
import '@fullcalendar/react/themes/classic/palette.css'

function toDate(raw) {
  if (raw instanceof Date) return raw
  const d = new Date(String(raw).replace(/\[.*\]$/, ''))
  return isNaN(d) ? null : d
}

export default function Calendar({ events, onSlotClick, onEventClick }) {
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
      events={events}
      dateClick={(info) => {
        console.log('Slot ales:', info)
        const d = toDate(info.date ?? info.dateStr)
        if (d) onSlotClick(d)
      }}
      eventClick={(info) => {
        if (info.event && info.event.id) onEventClick(info.event.id)
      }}
    />
  )
}