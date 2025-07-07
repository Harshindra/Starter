import { useState } from "react";
import {
  validateCredentials,
  createUser,
  findUserByEmail,
} from "../../data/users";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AuthPage({ onAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setAuthError("");

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = validateCredentials(formData.email, formData.password);

      if (user) {
        onAuthenticated(user);
      } else {
        setAuthError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setAuthError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (formData) => {
    setIsLoading(true);
    setAuthError("");

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUser = findUserByEmail(formData.email);
      if (existingUser) {
        setAuthError("An account with this email address already exists.");
        setIsLoading(false);
        return;
      }

      // Create new user
      const newUser = createUser(formData);
      onAuthenticated(newUser);
    } catch (error) {
      setAuthError("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="auth-container w-full max-w-lg">
        {/* Header */}
        <div className="auth-header text-center mb-8">
          <div className="logo-section mb-6">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">MediBook</h1>
            <p className="text-gray-600">Healthcare Appointment System</p>
          </div>
        </div>

        {/* Auth Form Container */}
        <div className="auth-form-container bg-white rounded-2xl shadow-xl p-8">
          {authError && (
            <div className="auth-error bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <div className="flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                <span className="text-sm">{authError}</span>
              </div>
            </div>
          )}

          {isLogin ? (
            <LoginForm
              onLogin={handleLogin}
              onSwitchToSignup={() => {
                setIsLogin(false);
                setAuthError("");
              }}
              isLoading={isLoading}
            />
          ) : (
            <SignupForm
              onSignup={handleSignup}
              onSwitchToLogin={() => {
                setIsLogin(true);
                setAuthError("");
              }}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Footer */}
        <div className="auth-footer text-center mt-8 text-sm text-gray-500">
          <p>&copy; 2024 MediBook. Secure healthcare appointment management.</p>
        </div>
      </div>
    </div>
  );
}
