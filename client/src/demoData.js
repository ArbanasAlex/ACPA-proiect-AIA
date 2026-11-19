export const demoVehicles = [
  { id: 'v1', plate: 'BV 01 HAI', model: 'Dacia Logan', active: true },
  { id: 'v2', plate: 'BV 02 HAI', model: 'Renault Clio', active: true },
  { id: 'v3', plate: 'BV 03 HAI', model: 'Skoda Fabia', active: false },
]

export const demoInstructors = [
  { id: 'i1', full_name: 'Marin Ionescu', phone: '0740 000 001', active: true },
  { id: 'i2', full_name: 'Radu Popa', phone: '0740 000 002', active: true },
]

export const demoStudents = [
  { id: 's1', full_name: 'Ion Popescu', phone: '0750 000 001', category: 'B', hours_done: 12 },
  { id: 's2', full_name: 'Ana Dumitru', phone: '0750 000 002', category: 'B', hours_done: 5 },
  { id: 's3', full_name: 'Mihai Ene', phone: '0750 000 003', category: 'A', hours_done: 0 },
]
function at(dayOffset, hour, minutes = 0) {
  const d = new Date()
  d.setHours(hour, minutes, 0, 0)
  d.setDate(d.getDate() + dayOffset)
  return d.toISOString()
}

export const demoBookings = [
  { id: 'b1', instructorId: 'i1', vehicleId: 'v1', studentId: 's1', start: at(0, 9), end: at(0, 10, 30) },
  { id: 'b2', instructorId: 'i1', vehicleId: 'v1', studentId: 's2', start: at(0, 11), end: at(0, 12, 30) },
  { id: 'b3', instructorId: 'i2', vehicleId: 'v2', studentId: 's3', start: at(1, 14), end: at(1, 15, 30) },
]
// weekday: 1 = luni ... 7 = duminică
export const demoAvailability = [
  { id: 'a1', instructorId: 'i1', weekday: 1, from: '08:00', to: '16:00' },
  { id: 'a2', instructorId: 'i1', weekday: 2, from: '08:00', to: '16:00' },
  { id: 'a3', instructorId: 'i1', weekday: 3, from: '10:00', to: '18:00' },
  { id: 'a4', instructorId: 'i2', weekday: 1, from: '12:00', to: '20:00' },
  { id: 'a5', instructorId: 'i2', weekday: 4, from: '08:00', to: '14:00' },
]