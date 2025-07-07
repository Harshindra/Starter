import { useState, useEffect } from "react";
import { getInitialAppointments, saveAppointments } from "./data/mockData";
import {
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
  initializeDemoUsers,
} from "./data/users";
import { isDoctor, formatUserRole } from "./utils/authUtils";
import AuthPage from "./components/Auth/AuthPage";
import UserDashboard from "./components/UserDashboard";
import DoctorDashboard from "./components/DoctorDashboard";

export default function App() {
  const [currentUser, setCurrentUserState] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize demo users and load current user
    initializeDemoUsers();
    const user = getCurrentUser();
    setCurrentUserState(user);
    setAppointments(getInitialAppointments());
    setIsLoading(false);
  }, []);

  const handleAppointmentUpdate = (updatedAppointments) => {
    setAppointments(updatedAppointments);
    saveAppointments(updatedAppointments);
  };

  const handleAuthenticated = (user) => {
    setCurrentUserState(user);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUserState(null);
    clearCurrentUser();
  };

  // Show loading screen while initializing
  if (isLoading) {
    return (
      <div className="loading-screen min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading MediBook...</p>
        </div>
      </div>
    );
  }

  // Show authentication page if user is not logged in
  if (!currentUser) {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }

  const userIsDoctor = isDoctor(currentUser);

  return (
    <div className="app min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      {/* Header with User Info and Logout */}
      <header className="app-header bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="logo-section">
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  Medi
                </span>
                <span className="text-white">Book</span>
              </h1>
              <p className="text-sm text-blue-100 font-medium">
                Healthcare Appointment System
              </p>
            </div>

            <div className="user-section flex items-center space-x-4">
              {/* User Info */}
              <div className="user-info flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="user-avatar w-12 h-12 rounded-full object-cover border-2 border-white/30"
                />
                <div className="user-details">
                  <div className="user-name text-sm font-semibold text-white">
                    {currentUser.name}
                  </div>
                  <div className="user-role text-xs text-blue-100 font-medium">
                    {formatUserRole(currentUser.userType)}
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="logout-button px-6 py-2 text-sm font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all duration-200 border border-white/20 hover:border-white/40"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {userIsDoctor ? (
          <DoctorDashboard
            appointments={appointments}
            onAppointmentUpdate={handleAppointmentUpdate}
            currentUser={currentUser}
          />
        ) : (
          <UserDashboard
            appointments={appointments}
            onAppointmentUpdate={handleAppointmentUpdate}
            currentUser={currentUser}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer bg-gradient-to-r from-gray-800 via-gray-900 to-black border-t border-purple-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-3">
              <span className="text-2xl">🏥</span>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                MediBook
              </span>
              <span className="text-2xl">💊</span>
            </div>
            <p className="text-gray-300 text-sm font-medium">
              &copy; 2024 MediBook. Healthcare appointment management system.
            </p>
            <p className="mt-1 text-gray-400 text-sm">
              Secure appointment booking for patients and healthcare providers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
