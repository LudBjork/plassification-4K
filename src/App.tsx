import { useState } from 'react'
import { FilterChip } from '@entur/chip'
import './App.css'

// Placeholder desk image (replace with your actual image path)
const deskImage = '/desk-layout.png' // Place your image in public/ or src/assets/

// Example desk positions (replace with your actual desk coordinates)
const desks = [
  { id: 'A1', left: '20%', top: '30%' },
  { id: 'A2', left: '40%', top: '30%' },
  { id: 'B1', left: '20%', top: '60%' },
  { id: 'B2', left: '40%', top: '60%' },
]

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

function App() {
  const [selectedDay, setSelectedDay] = useState<string>(weekdays[0])
  // reservations: { [weekday]: { [deskId]: true } }
  const [reservations, setReservations] = useState<{ [day: string]: { [deskId: string]: boolean } }>({})

  const handleDeskClick = (deskId: string) => {
    setReservations(prev => {
      const dayRes = prev[selectedDay] || {}
      if (dayRes[deskId]) return prev // already reserved
      return {
        ...prev,
        [selectedDay]: { ...dayRes, [deskId]: true }
      }
    })
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Desk Reservation</h1>
      <div style={{ marginBottom: 16 }}>
        <label>
          Select a weekday:
        </label>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {weekdays.map(day => (
            <FilterChip
              key={day}
              value={selectedDay}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </FilterChip>
          ))}
        </div>
      </div>
      <div style={{ position: 'relative', width: 400, height: 300, marginBottom: 24 }}>
        <img src={deskImage} alt="Desk layout" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        {desks.map(desk => {
          const reserved = reservations[selectedDay]?.[desk.id]
          return (
            <button
              key={desk.id}
              style={{
                position: 'absolute',
                left: desk.left,
                top: desk.top,
                transform: 'translate(-50%, -50%)',
                background: reserved ? '#ccc' : '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: 40,
                height: 40,
                cursor: reserved ? 'not-allowed' : 'pointer',
                opacity: reserved ? 0.6 : 1,
              }}
              disabled={reserved}
              onClick={() => handleDeskClick(desk.id)}
              title={desk.id}
            >
              {desk.id}
            </button>
          )
        })}
      </div>
      <h2>Reservations for {selectedDay}</h2>
      <ul>
        {Object.entries(reservations[selectedDay] || {}).map(([deskId, reserved]) =>
          reserved ? <li key={deskId}>{deskId}</li> : null
        )}
      </ul>
    </div>
  )
}

export default App
