import { useState } from "react";
import { validateSignupForm, generateAvatar } from "../../utils/authUtils";

export default function SignupForm({ onSignup, onSwitchToLogin, isLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "patient",
    // Patient specific fields
    phone: "",
    dateOfBirth: "",
    emergencyContact: "",
    // Doctor specific fields
    specialty: "",
    licenseNumber: "",
    experience: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateSignupForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Add avatar to form data
    const signupData = {
      ...formData,
      avatar: generateAvatar(formData.name),
    };

    onSignup(signupData);
  };

  const isDoctor = formData.userType === "doctor";

  return (
    <div className="signup-form w-full max-w-md">
      <div className="form-header text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Create Account
        </h2>
        <p className="text-gray-600">Join MediBook to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Type Selection */}
        <div className="form-group">
          <label className="form-label block text-sm font-medium text-gray-700 mb-3">
            I am a:
          </label>
          <div className="user-type-selection flex space-x-4">
            <label className="user-type-option flex-1 cursor-pointer">
              <input
                type="radio"
                name="userType"
                value="patient"
                checked={formData.userType === "patient"}
                onChange={handleChange}
                className="sr-only"
              />
              <div
                className={`type-card text-center p-4 border-2 rounded-lg transition-colors ${
                  formData.userType === "patient"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                <div className="text-2xl mb-1">👤</div>
                <div className="text-sm font-medium">Patient</div>
              </div>
            </label>
            <label className="user-type-option flex-1 cursor-pointer">
              <input
                type="radio"
                name="userType"
                value="doctor"
                checked={formData.userType === "doctor"}
                onChange={handleChange}
                className="sr-only"
              />
              <div
                className={`type-card text-center p-4 border-2 rounded-lg transition-colors ${
                  formData.userType === "doctor"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                <div className="text-2xl mb-1">👨‍⚕️</div>
                <div className="text-sm font-medium">Doctor</div>
              </div>
            </label>
          </div>
        </div>

        {/* Common Fields */}
        <div className="form-group">
          <label
            htmlFor="name"
            className="form-label block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={isDoctor ? "Dr. Jane Smith" : "John Doe"}
          />
          {errors.name && (
            <p className="error-text text-red-500 text-sm mt-1">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="email"
            className="form-label block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={
              isDoctor ? "doctor@hospital.com" : "patient@example.com"
            }
          />
          {errors.email && (
            <p className="error-text text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="password"
            className="form-label block text-sm font-medium text-gray-700 mb-2"
          >
            Password *
          </label>
          <div className="password-input-wrapper relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="At least 6 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>
          {errors.password && (
            <p className="error-text text-red-500 text-sm mt-1">
              {errors.password}
            </p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="confirmPassword"
            className="form-label block text-sm font-medium text-gray-700 mb-2"
          >
            Confirm Password *
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`form-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="error-text text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* User Type Specific Fields */}
        {isDoctor ? (
          <>
            <div className="form-group">
              <label
                htmlFor="specialty"
                className="form-label block text-sm font-medium text-gray-700 mb-2"
              >
                Medical Specialty *
              </label>
              <select
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className={`form-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.specialty ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select specialty</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Neurology">Neurology</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="General Practice">General Practice</option>
              </select>
              {errors.specialty && (
                <p className="error-text text-red-500 text-sm mt-1">
                  {errors.specialty}
                </p>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="licenseNumber"
                className="form-label block text-sm font-medium text-gray-700 mb-2"
              >
                Medical License Number *
              </label>
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                className={`form-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.licenseNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="MD123456"
              />
              {errors.licenseNumber && (
                <p className="error-text text-red-500 text-sm mt-1">
                  {errors.licenseNumber}
                </p>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="experience"
                className="form-label block text-sm font-medium text-gray-700 mb-2"
              >
                Years of Experience *
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={`form-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.experience ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="10 years"
              />
              {errors.experience && (
                <p className="error-text text-red-500 text-sm mt-1">
                  {errors.experience}
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label
                htmlFor="phone"
                className="form-label block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`form-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="error-text text-red-500 text-sm mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="dateOfBirth"
                className="form-label block text-sm font-medium text-gray-700 mb-2"
              >
                Date of Birth *
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`form-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.dateOfBirth && (
                <p className="error-text text-red-500 text-sm mt-1">
                  {errors.dateOfBirth}
                </p>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="emergencyContact"
                className="form-label block text-sm font-medium text-gray-700 mb-2"
              >
                Emergency Contact *
              </label>
              <input
                type="tel"
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className={`form-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.emergencyContact ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="+1 (555) 987-6543"
              />
              {errors.emergencyContact && (
                <p className="error-text text-red-500 text-sm mt-1">
                  {errors.emergencyContact}
                </p>
              )}
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="signup-button w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div className="auth-switch text-center mt-6">
        <p className="text-gray-600">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="switch-link text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}
