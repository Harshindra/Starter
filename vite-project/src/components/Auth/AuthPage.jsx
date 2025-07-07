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
    <div className="auth-page min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-300 to-pink-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-300 to-purple-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-teal-300 to-blue-300 rounded-full opacity-10 animate-pulse"></div>
      </div>
      <div className="auth-container w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="auth-header text-center mb-8">
          <div className="logo-section mb-6">
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-2xl">
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Medi
              </span>
              <span className="text-white">Book</span>
            </h1>
            <p className="text-white/90 text-lg font-medium backdrop-blur-sm bg-white/10 rounded-full px-4 py-2 inline-block">
              🏥 Healthcare Appointment System 💊
            </p>
          </div>
        </div>

        {/* Auth Form Container */}
        <div className="auth-form-container bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
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
        <div className="auth-footer text-center mt-8 text-sm text-white/80 backdrop-blur-sm bg-white/10 rounded-xl px-4 py-2">
          <p className="font-medium">
            &copy; 2024 MediBook. Secure healthcare appointment management.
          </p>
        </div>
      </div>
    </div>
  );
}
