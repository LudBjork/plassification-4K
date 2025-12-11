// OfficeMap.tsx
import React from "react";
import "./OfficeMap.css";

type Seat = {
  id: number;
  x: number;     // vänster i %
  y: number;     // topp i %
  width: number; // bredd i %
  height: number;// höjd i %
};

const SEATS: Seat[] = [
  { id: 1, x: 14.7, y: 14.7, width: 6.5, height: 6.5 },
  { id: 2, x: 21.3, y: 14.7, width: 6.5, height: 6.5 },
  { id: 3, x: 27.9, y: 14.7, width: 6.5, height: 6.5 },
  { id: 4, x: 14.7, y: 29.9, width: 6.5, height: 6.5 },
  { id: 5, x: 21.4, y: 29.9, width: 6.5, height: 6.5 },
  { id: 6, x: 27.9, y: 29.9, width: 6.5, height: 6.5 },
  { id: 7, x: 32, y: 39.3, width: 3.8, height: 11 },
  { id: 8, x: 32, y: 51, width: 3.8, height: 11 },
  { id: 9, x: 32, y: 62.5, width: 3.8, height: 11 },
  // fyll på med fler…
];

interface OfficeMapProps {
  onSeatClick: (seatId: number) => void;
  bookedSeats?: string[]; // t.ex. ["A1", "B1"]
  mySeatId?: number;
}

export const OfficeMap: React.FC<OfficeMapProps> = ({
  onSeatClick,
  bookedSeats = [],
  mySeatId,
}) => {
  return (
    <div className="office-map">
      <img
        src="/office-map.png" // lägg bilden i public/ eller importera
        alt="Kontorskarta"
        className="office-map__image"
      />

      {SEATS.map((seat) => {
        const isBooked = bookedSeats.includes(seat.id.toString());
        const isMine = mySeatId === seat.id;

        return (
          <button
            key={seat.id}
            className={
              "office-map__seat" +
              (isMine ? " office-map__seat--mine" : "") +
              (isBooked && !isMine ? " office-map__seat--booked" : "")
            }
            style={{
              left: `${seat.x}%`,
              top: `${seat.y}%`,
              width: `${seat.width}%`,
              height: `${seat.height}%`,
            }}
            onClick={() => !isBooked && onSeatClick(seat.id)}
            disabled={isBooked}
            type="button"
          >
            {/* Om du vill visa label på kartan */}
            <span className="office-map__seat-label">{seat.id}</span>
          </button>
        );
      })}
    </div>
  );
};
