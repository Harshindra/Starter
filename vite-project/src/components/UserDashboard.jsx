import { useState } from "react";
import { doctors } from "../data/mockData";
import {
  generateAppointmentId,
  formatDate,
  formatTime,
  getUpcomingAppointments,
} from "../utils/appointmentUtils";
import Calendar from "./Calendar";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";

export default function UserDashboard({
  appointments,
  onAppointmentUpdate,
  currentUser,
}) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentView, setCurrentView] = useState("book"); // 'book' or 'appointments'

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedSlot(null);
    setShowBookingForm(false);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setShowBookingForm(true);
  };

  const handleAppointmentSubmit = async (formData) => {
    const newAppointment = {
      id: generateAppointmentId(),
      doctorId: selectedDoctor.id,
      date: selectedSlot.date.toISOString().split("T")[0],
      time: selectedSlot.time,
      status: "pending",
      patientName: currentUser.name,
      patientEmail: currentUser.email,
      patientPhone: currentUser.phone || formData.patientPhone,
      reason: formData.reason,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
    };

    onAppointmentUpdate([...appointments, newAppointment]);

    // Reset form
    setSelectedDoctor(null);
    setSelectedSlot(null);
    setShowBookingForm(false);
    setCurrentView("appointments");
  };

  const handleCancelAppointment = (appointmentId) => {
    const updatedAppointments = appointments.map((apt) =>
      apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt,
    );
    onAppointmentUpdate(updatedAppointments);
  };

  const userAppointments = getUpcomingAppointments(
    appointments,
    "user",
    currentUser.email,
  );

  return (
    <div className="user-dashboard max-w-7xl mx-auto p-6">
      <div className="dashboard-header mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Patient Portal
        </h1>
        <p className="text-gray-600">
          Book appointments and manage your healthcare
        </p>
      </div>

      {/* Navigation */}
      <div className="dashboard-nav mb-6">
        <div className="nav-buttons flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setCurrentView("book")}
            className={`nav-button px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === "book"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Book Appointment
          </button>
          <button
            onClick={() => setCurrentView("appointments")}
            className={`nav-button px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === "appointments"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            My Appointments
          </button>
        </div>
      </div>

      {currentView === "book" ? (
        <div className="booking-section">
          {!selectedDoctor ? (
            <div className="doctor-selection">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Choose a Doctor
              </h2>
              <div className="doctors-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    onClick={() => handleDoctorSelect(doctor)}
                    className="doctor-card bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-200"
                  >
                    <div className="doctor-header flex items-center mb-4">
                      <img
                        src={doctor.avatar}
                        alt={doctor.name}
                        className="doctor-avatar w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="doctor-name text-lg font-semibold text-gray-800">
                          {doctor.name}
                        </h3>
                        <p className="doctor-specialty text-blue-600 font-medium">
                          {doctor.specialty}
                        </p>
                      </div>
                    </div>
                    <div className="doctor-details space-y-2">
                      <div className="experience flex items-center text-sm text-gray-600">
                        <span className="mr-2">🎓</span>
                        <span>{doctor.experience} experience</span>
                      </div>
                      <div className="rating flex items-center text-sm text-gray-600">
                        <span className="mr-2">⭐</span>
                        <span>{doctor.rating}/5.0 rating</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="appointment-booking">
              <div className="booking-header mb-6">
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="back-button text-blue-600 hover:text-blue-800 mb-2 flex items-center"
                >
                  ← Back to doctors
                </button>
                <div className="selected-doctor-info flex items-center">
                  <img
                    src={selectedDoctor.avatar}
                    alt={selectedDoctor.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {selectedDoctor.name}
                    </h2>
                    <p className="text-blue-600">{selectedDoctor.specialty}</p>
                  </div>
                </div>
              </div>

              <div className="booking-content grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="calendar-section">
                  <Calendar
                    selectedDoctor={selectedDoctor}
                    appointments={appointments}
                    onSlotSelect={handleSlotSelect}
                    selectedSlot={selectedSlot}
                  />
                </div>

                {showBookingForm && selectedSlot && (
                  <div className="form-section">
                    <AppointmentForm
                      selectedDoctor={selectedDoctor}
                      selectedSlot={selectedSlot}
                      onSubmit={handleAppointmentSubmit}
                      onCancel={() => setShowBookingForm(false)}
                      currentUser={currentUser}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="appointments-section">
          <AppointmentList
            appointments={userAppointments}
            userType="user"
            onCancel={handleCancelAppointment}
          />
        </div>
      )}
    </div>
  );
}
