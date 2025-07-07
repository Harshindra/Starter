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
      <div className="dashboard-header mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4 drop-shadow-sm">
          Patient Portal
        </h1>
        <p className="text-gray-700 text-lg font-medium">
          Book appointments and manage your healthcare journey
        </p>
      </div>

      {/* Navigation */}
      <div className="dashboard-nav mb-8 flex justify-center">
        <div className="nav-buttons flex space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 p-2 rounded-2xl backdrop-blur-sm">
          <button
            onClick={() => setCurrentView("book")}
            className={`nav-button px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              currentView === "book"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105"
                : "text-purple-700 hover:text-purple-900 hover:bg-white/50"
            }`}
          >
            📅 Book Appointment
          </button>
          <button
            onClick={() => setCurrentView("appointments")}
            className={`nav-button px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              currentView === "appointments"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105"
                : "text-purple-700 hover:text-purple-900 hover:bg-white/50"
            }`}
          >
            📋 My Appointments
          </button>
        </div>
      </div>

      {currentView === "book" ? (
        <div className="booking-section">
          {!selectedDoctor ? (
            <div className="doctor-selection">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Choose Your Doctor
              </h2>
              <div className="doctors-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {doctors.map((doctor, index) => {
                  const gradients = [
                    "from-pink-400 to-purple-500",
                    "from-blue-400 to-teal-500",
                    "from-green-400 to-blue-500",
                    "from-yellow-400 to-red-500",
                  ];
                  return (
                    <div
                      key={doctor.id}
                      onClick={() => handleDoctorSelect(doctor)}
                      className={`doctor-card bg-gradient-to-br ${gradients[index % 4]} rounded-2xl shadow-xl p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-white/20 hover:border-white/40 backdrop-blur-sm transform hover:-translate-y-2 hover:scale-105`}
                    >
                      <div className="doctor-header flex items-center mb-4">
                        <img
                          src={doctor.avatar}
                          alt={doctor.name}
                          className="doctor-avatar w-16 h-16 rounded-full object-cover mr-4 border-3 border-white/50 shadow-lg"
                        />
                        <div>
                          <h3 className="doctor-name text-lg font-bold text-white drop-shadow-md">
                            {doctor.name}
                          </h3>
                          <p className="doctor-specialty text-white/90 font-semibold text-sm bg-white/20 px-2 py-1 rounded-full">
                            {doctor.specialty}
                          </p>
                        </div>
                      </div>
                      <div className="doctor-details space-y-3">
                        <div className="experience flex items-center text-sm text-white/90 bg-white/20 rounded-lg px-3 py-2">
                          <span className="mr-2 text-lg">🎓</span>
                          <span className="font-medium">
                            {doctor.experience} experience
                          </span>
                        </div>
                        <div className="rating flex items-center text-sm text-white/90 bg-white/20 rounded-lg px-3 py-2">
                          <span className="mr-2 text-lg">⭐</span>
                          <span className="font-medium">
                            {doctor.rating}/5.0 rating
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
