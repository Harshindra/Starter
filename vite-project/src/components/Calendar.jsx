import { useState } from "react";
import { timeSlots } from "../data/mockData";
import {
  formatDate,
  formatTime,
  isSlotAvailable,
} from "../utils/appointmentUtils";

export default function Calendar({
  selectedDoctor,
  appointments,
  onSlotSelect,
  selectedSlot,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  const isDateSelected = (date) => {
    return (
      selectedSlot && selectedSlot.date.toDateString() === date.toDateString()
    );
  };

  return (
    <div className="calendar-container bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl p-6 border border-purple-200">
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-center">
        📅 Select Date & Time
      </h3>

      {/* Date Selection */}
      <div className="date-grid mb-8">
        <h4 className="text-lg font-bold text-purple-700 mb-4 text-center">
          🗓️ Available Dates
        </h4>
        <div className="grid grid-cols-7 gap-3">
          {dates.map((date, index) => {
            const isToday = date.toDateString() === new Date().toDateString();
            const selected = isDateSelected(date);

            return (
              <button
                key={index}
                onClick={() => setCurrentDate(date)}
                className={`
                  date-button p-3 text-center rounded-xl text-sm font-bold transition-all duration-200 transform hover:scale-110 hover:shadow-lg
                  ${
                    selected
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                      : isToday
                        ? "bg-gradient-to-r from-yellow-300 to-orange-300 text-orange-800 hover:from-yellow-400 hover:to-orange-400"
                        : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-purple-100 hover:to-blue-100 hover:text-purple-700"
                  }
                `}
              >
                <div className="text-xs">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div>{date.getDate()}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      <div className="time-slots">
        <h4 className="text-lg font-bold text-purple-700 mb-4 text-center">
          ⏰ Available Times for {formatDate(currentDate)}
        </h4>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {timeSlots.map((time) => {
            const available =
              !selectedDoctor ||
              isSlotAvailable(
                appointments,
                selectedDoctor.id,
                currentDate,
                time,
              );
            const selected =
              selectedSlot &&
              selectedSlot.date.toDateString() === currentDate.toDateString() &&
              selectedSlot.time === time;

            return (
              <button
                key={time}
                onClick={() =>
                  available && onSlotSelect({ date: currentDate, time })
                }
                disabled={!available}
                className={`
                  time-slot p-3 text-sm font-bold rounded-xl transition-all duration-200 transform hover:scale-110 hover:shadow-lg
                  ${
                    selected
                      ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg scale-105 glow-animation"
                      : available
                        ? "bg-gradient-to-r from-green-100 to-teal-100 text-green-700 hover:from-green-200 hover:to-teal-200 border-2 border-green-200"
                        : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                  }
                `}
              >
                {formatTime(time)}
              </button>
            );
          })}
        </div>
      </div>

      {selectedSlot && (
        <div className="selected-slot mt-6 p-4 bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl border-2 border-green-300 shadow-lg">
          <p className="text-lg text-green-800 text-center font-bold">
            <span className="text-2xl mr-2">✅</span>
            <span className="font-bold">Selected:</span>{" "}
            {formatDate(selectedSlot.date)} at {formatTime(selectedSlot.time)}
          </p>
        </div>
      )}
    </div>
  );
}
