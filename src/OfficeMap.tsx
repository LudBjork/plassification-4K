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
  { id: 10, x: 43.2, y: 15.8, width: 4, height: 11 },
  { id: 11, x: 43.2, y: 27.5, width: 4, height: 11 },
  { id: 12, x: 43.2, y: 39.3, width: 4, height: 11 },
  { id: 13, x: 43.2, y: 51, width: 4, height: 11 },
  { id: 14, x: 47, y: 15.8, width: 4, height: 11 },
  { id: 15, x: 47, y: 27.5, width: 4, height: 11 },
  { id: 16, x: 47, y: 39.3, width: 4, height: 11 },
  { id: 17, x: 47, y: 51, width: 4, height: 11 },
  { id: 18, x: 60.1, y: 15.8, width: 4, height: 11 },
  { id: 19, x: 60.1, y: 27.5, width: 4, height: 11 },
  { id: 20, x: 60.1, y: 39.3, width: 4, height: 11 },
  { id: 21, x: 60.1, y: 51, width: 4, height: 11 },
  { id: 22, x: 63.8, y: 15.8, width: 4, height: 11 },
  { id: 23, x: 63.8, y: 27.5, width: 4, height: 11 },
  { id: 24, x: 63.8, y: 39.3, width: 4, height: 11 },
  { id: 25, x: 63.8, y: 51, width: 4, height: 11 },
  { id: 26, x: 76.8, y: 15.8, width: 4, height: 11 },
  { id: 27, x: 76.8, y: 27.5, width: 4, height: 11 },
  { id: 28, x: 76.8, y: 39.3, width: 4, height: 11 },
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
