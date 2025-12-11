import { useState } from 'react'
import { FilterChip } from '@entur/chip'
import './App.css'
import { OfficeMap } from './OfficeMap'

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

function App() {
  const [selectedDay, setSelectedDay] = useState<string>(weekdays[0])
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

  // Get booked seats for the current day
  const bookedSeats = Object.keys(reservations[selectedDay] || {})

  return (
    <div className="app-container">
      <h1>Desk Reservation</h1>
      
      <div className="weekday-selector">
        <label>Select a weekday:</label>
        <div className="weekday-chips">
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

      <OfficeMap
        onSeatClick={handleDeskClick}
        bookedSeats={bookedSeats}
      />

      {bookedSeats.length > 0 && (
        <div className="reservations-list">
          <h2>Reservations for {selectedDay}</h2>
          <ul>
            {bookedSeats.map(deskId => (
              <li key={deskId}>{deskId}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
