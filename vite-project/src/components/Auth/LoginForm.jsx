import { useState } from "react";
import { validateLoginForm } from "../../utils/authUtils";

export default function LoginForm({ onLogin, onSwitchToSignup, isLoading }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    const validationErrors = validateLoginForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onLogin(formData);
  };

  return (
    <div className="login-form w-full max-w-md">
      <div className="form-header text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to your MediBook account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label
            htmlFor="email"
            className="form-label block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
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
            placeholder="Enter your email"
            autoComplete="email"
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
            Password
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
              placeholder="Enter your password"
              autoComplete="current-password"
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

        <button
          type="submit"
          disabled={isLoading}
          className="login-button w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="demo-accounts mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          Demo Accounts:
        </h3>
        <div className="demo-list text-xs text-blue-700 space-y-1">
          <div>
            <strong>Doctor:</strong> dr.johnson@medibook.com / doctor123
          </div>
          <div>
            <strong>Patient:</strong> patient@example.com / patient123
          </div>
        </div>
      </div>

      <div className="auth-switch text-center mt-6">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignup}
            className="switch-link text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
}
