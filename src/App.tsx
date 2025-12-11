import { useState } from "react";
import { FilterChip } from "@entur/chip";
import "./App.css";
import { OfficeMap } from "./OfficeMap";
import { Modal } from "@entur/modal";
import { PrimaryButton } from "@entur/button";
import { TextField } from "@entur/form";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const defaultReservations = {
  monday: {},
  tuesday: {},
  wednesday: {},
  thursday: {},
  friday: {},
};

function App() {
  const [isOpen, setOpen] = useState(false);
const [name, setName] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [reservations, setReservations] = useState<{
    [day: string]: { [deskId: number]: string };
  }>(defaultReservations);
  const [deskId, setDeskId] = useState<number | null>(null);
  const handleDeskClick = (id: number) => {
    if (selectedDays.length === 0) {
      return; // Don't allow booking if no weekday is selected
    }
    setDeskId(id);
    setOpen(true);
  };

  // Get booked seats for the selected days
  const bookedSeats = selectedDays.reduce((acc, day) => {
    const dayReservations = reservations[day.toLowerCase()] || {};
    return [...acc, ...Object.keys(dayReservations)];
  }, [] as string[]);

  const handleOnClick = (day: string) => {
    if (selectedDays.includes(day)) {
      const filtered = selectedDays.filter((d) => d !== day);
      setSelectedDays(filtered);
      return;
    }
    const newSelectedDays = [...selectedDays, day];
    setSelectedDays(newSelectedDays);
  };

  const handleReserve = () => {
    setReservations((prev) => {
      const updated = { ...prev };
      selectedDays.forEach((day) => {
        if (!updated[day.toLowerCase()]) {
          updated[day.toLowerCase()] = {};
        }
        
        // Check if user already has a booking for this day
        const existingBooking = Object.entries(updated[day.toLowerCase()]).find(
          ([, userName]) => userName === name
        );
        
        // If user already has a booking, remove it first
        if (existingBooking) {
          const [existingDeskId] = existingBooking;
          delete updated[day.toLowerCase()][Number(existingDeskId)];
        }
        
        // Add the new booking
        if (deskId !== null) {
          updated[day.toLowerCase()][deskId] = name;
        }
      });
      return updated;
    });
    setName("");
    setOpen(false);
  };

  return (
    <div className="app-container">
      <h1>Desk Reservation</h1>

      <div className="weekday-selector">
        <label>Select a weekday:</label>
        <div className="weekday-chips">
          {weekdays.map((day) => (
            <FilterChip
              key={day}
              value={day}
              onClick={() => handleOnClick(day)}
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
      <Modal
        open={isOpen}
        onDismiss={() => setOpen(false)}
        title="Hem er du?"
        size="medium"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          handleReserve();
        }}>

        <TextField
          style={{ marginBottom: "1rem" }}
          label="Ditt navn"
          placeholder="Skriv inn navnet ditt her"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <PrimaryButton type="submit">OK</PrimaryButton>
        </form>
      </Modal>
    </div>
  );
}

export default App;
