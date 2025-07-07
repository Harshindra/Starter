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
    <div className="app min-h-screen bg-gray-50">
      {/* Header with User Info and Logout */}
      <header className="app-header bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="logo-section">
              <h1 className="text-2xl font-bold text-blue-600">MediBook</h1>
              <p className="text-sm text-gray-600">
                Healthcare Appointment System
              </p>
            </div>

            <div className="user-section flex items-center space-x-4">
              {/* User Info */}
              <div className="user-info flex items-center space-x-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="user-avatar w-10 h-10 rounded-full object-cover"
                />
                <div className="user-details">
                  <div className="user-name text-sm font-medium text-gray-800">
                    {currentUser.name}
                  </div>
                  <div className="user-role text-xs text-gray-600">
                    {formatUserRole(currentUser.userType)}
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="logout-button px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
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
      <footer className="app-footer bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>
              &copy; 2024 MediBook. Healthcare appointment management system.
            </p>
            <p className="mt-1">
              Secure appointment booking for patients and healthcare providers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
