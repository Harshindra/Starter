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
    <div className="calendar-container bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Select Date & Time
      </h3>

      {/* Date Selection */}
      <div className="date-grid mb-6">
        <h4 className="text-sm font-medium text-gray-600 mb-3">
          Available Dates
        </h4>
        <div className="grid grid-cols-7 gap-2">
          {dates.map((date, index) => {
            const isToday = date.toDateString() === new Date().toDateString();
            const selected = isDateSelected(date);

            return (
              <button
                key={index}
                onClick={() => setCurrentDate(date)}
                className={`
                  date-button p-2 text-center rounded-lg text-sm font-medium transition-colors
                  ${
                    selected
                      ? "bg-blue-600 text-white"
                      : isToday
                        ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
        <h4 className="text-sm font-medium text-gray-600 mb-3">
          Available Times for {formatDate(currentDate)}
        </h4>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
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
                  time-slot p-2 text-sm font-medium rounded-lg transition-colors
                  ${
                    selected
                      ? "bg-green-600 text-white"
                      : available
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
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
        <div className="selected-slot mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Selected:</span>{" "}
            {formatDate(selectedSlot.date)} at {formatTime(selectedSlot.time)}
          </p>
        </div>
      )}
    </div>
  );
}
