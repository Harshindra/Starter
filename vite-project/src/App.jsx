import { useState, useEffect } from "react";
import { getInitialAppointments, saveAppointments } from "./data/mockData";
import UserDashboard from "./components/UserDashboard";
import DoctorDashboard from "./components/DoctorDashboard";

export default function App() {
  const [userType, setUserType] = useState("user"); // 'user' or 'doctor'
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments(getInitialAppointments());
  }, []);

  const handleAppointmentUpdate = (updatedAppointments) => {
    setAppointments(updatedAppointments);
    saveAppointments(updatedAppointments);
  };

  return (
    <div className="app min-h-screen bg-gray-50">
      {/* Header with Role Toggle */}
      <header className="app-header bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="logo-section">
              <h1 className="text-2xl font-bold text-blue-600">MediBook</h1>
              <p className="text-sm text-gray-600">
                Healthcare Appointment System
              </p>
            </div>

            <div className="role-toggle">
              <div className="toggle-container bg-gray-100 p-1 rounded-lg flex">
                <button
                  onClick={() => setUserType("user")}
                  className={`toggle-button px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    userType === "user"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  👤 Patient
                </button>
                <button
                  onClick={() => setUserType("doctor")}
                  className={`toggle-button px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    userType === "doctor"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  👨‍⚕️ Doctor
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {userType === "user" ? (
          <UserDashboard
            appointments={appointments}
            onAppointmentUpdate={handleAppointmentUpdate}
          />
        ) : (
          <DoctorDashboard
            appointments={appointments}
            onAppointmentUpdate={handleAppointmentUpdate}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>
              &copy; 2024 MediBook. Healthcare appointment management system.
            </p>
            <p className="mt-1">
              Switch between Patient and Doctor views using the toggle above.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
