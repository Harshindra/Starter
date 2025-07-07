import { useState } from "react";
import { doctors } from "../data/mockData";
import {
  getUpcomingAppointments,
  formatDate,
  formatTime,
} from "../utils/appointmentUtils";
import AppointmentList from "./AppointmentList";

export default function DoctorDashboard({ appointments, onAppointmentUpdate }) {
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0].id);
  const [currentView, setCurrentView] = useState("appointments"); // 'appointments' or 'schedule'

  const selectedDoctor = doctors.find((doc) => doc.id === selectedDoctorId);
  const doctorAppointments = getUpcomingAppointments(
    appointments,
    "doctor",
    selectedDoctorId,
  );

  const handleStatusChange = (appointmentId, newStatus) => {
    const updatedAppointments = appointments.map((apt) =>
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt,
    );
    onAppointmentUpdate(updatedAppointments);
  };

  const handleCancelAppointment = (appointmentId) => {
    const updatedAppointments = appointments.map((apt) =>
      apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt,
    );
    onAppointmentUpdate(updatedAppointments);
  };

  const getAppointmentStats = () => {
    const today = new Date().toISOString().split("T")[0];
    const todayAppointments = appointments.filter(
      (apt) =>
        apt.doctorId === selectedDoctorId &&
        apt.date === today &&
        apt.status !== "cancelled",
    );

    const pendingCount = doctorAppointments.filter(
      (apt) => apt.status === "pending",
    ).length;
    const confirmedCount = doctorAppointments.filter(
      (apt) => apt.status === "confirmed",
    ).length;

    return {
      today: todayAppointments.length,
      pending: pendingCount,
      confirmed: confirmedCount,
      total: doctorAppointments.length,
    };
  };

  const stats = getAppointmentStats();

  return (
    <div className="doctor-dashboard max-w-7xl mx-auto p-6">
      <div className="dashboard-header mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Doctor Portal</h1>
        <p className="text-gray-600">
          Manage your appointments and patient schedules
        </p>
      </div>

      {/* Doctor Selection */}
      <div className="doctor-selector mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Doctor Profile
        </label>
        <select
          value={selectedDoctorId}
          onChange={(e) => setSelectedDoctorId(parseInt(e.target.value))}
          className="doctor-select bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.specialty}
            </option>
          ))}
        </select>
      </div>

      {/* Doctor Info Card */}
      <div className="doctor-info-card bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center">
          <img
            src={selectedDoctor.avatar}
            alt={selectedDoctor.name}
            className="w-20 h-20 rounded-full object-cover mr-6"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800">
              {selectedDoctor.name}
            </h2>
            <p className="text-blue-600 font-medium text-lg">
              {selectedDoctor.specialty}
            </p>
            <p className="text-gray-600">
              {selectedDoctor.experience} • ⭐ {selectedDoctor.rating}/5.0
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-card bg-blue-50 rounded-lg p-4">
          <div className="stat-number text-2xl font-bold text-blue-600">
            {stats.today}
          </div>
          <div className="stat-label text-sm text-blue-800">
            Today's Appointments
          </div>
        </div>
        <div className="stat-card bg-yellow-50 rounded-lg p-4">
          <div className="stat-number text-2xl font-bold text-yellow-600">
            {stats.pending}
          </div>
          <div className="stat-label text-sm text-yellow-800">
            Pending Approval
          </div>
        </div>
        <div className="stat-card bg-green-50 rounded-lg p-4">
          <div className="stat-number text-2xl font-bold text-green-600">
            {stats.confirmed}
          </div>
          <div className="stat-label text-sm text-green-800">Confirmed</div>
        </div>
        <div className="stat-card bg-purple-50 rounded-lg p-4">
          <div className="stat-number text-2xl font-bold text-purple-600">
            {stats.total}
          </div>
          <div className="stat-label text-sm text-purple-800">
            Total Upcoming
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="dashboard-nav mb-6">
        <div className="nav-buttons flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setCurrentView("appointments")}
            className={`nav-button px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === "appointments"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Appointments
          </button>
          <button
            onClick={() => setCurrentView("schedule")}
            className={`nav-button px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === "schedule"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Schedule View
          </button>
        </div>
      </div>

      {currentView === "appointments" ? (
        <AppointmentList
          appointments={doctorAppointments}
          userType="doctor"
          onStatusChange={handleStatusChange}
          onCancel={handleCancelAppointment}
        />
      ) : (
        <div className="schedule-view bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Weekly Schedule
          </h3>

          {doctorAppointments.length === 0 ? (
            <div className="empty-schedule text-center py-8">
              <div className="text-gray-400 text-4xl mb-2">📅</div>
              <p className="text-gray-500">
                No upcoming appointments scheduled
              </p>
            </div>
          ) : (
            <div className="schedule-grid space-y-4">
              {doctorAppointments
                .reduce((acc, appointment) => {
                  const date = appointment.date;
                  if (!acc[date]) acc[date] = [];
                  acc[date].push(appointment);
                  return acc;
                }, {})
                .entries()
                .map(([date, dayAppointments]) => (
                  <div
                    key={date}
                    className="day-schedule border border-gray-200 rounded-lg p-4"
                  >
                    <h4 className="font-semibold text-gray-800 mb-3">
                      {formatDate(new Date(date))}
                    </h4>
                    <div className="appointments-timeline space-y-2">
                      {dayAppointments
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map((appointment) => (
                          <div
                            key={appointment.id}
                            className="timeline-item flex items-center space-x-3 p-2 bg-gray-50 rounded"
                          >
                            <div className="time-badge bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                              {formatTime(appointment.time)}
                            </div>
                            <div className="appointment-summary flex-1">
                              <span className="patient-name font-medium">
                                {appointment.patientName}
                              </span>
                              <span className="reason text-gray-600 ml-2">
                                - {appointment.reason}
                              </span>
                            </div>
                            <div className="status-indicator">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  appointment.status === "confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : appointment.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {appointment.status}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
