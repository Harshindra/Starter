import { useState } from "react";
import { validateAppointmentForm } from "../utils/appointmentUtils";

export default function AppointmentForm({
  selectedDoctor,
  selectedSlot,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    reason: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateAppointmentForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting appointment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="appointment-form bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Book Appointment
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label
            htmlFor="patientName"
            className="form-label block text-sm font-medium text-gray-700 mb-1"
          >
            Patient Name *
          </label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className={`form-input w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.patientName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter patient full name"
          />
          {errors.patientName && (
            <p className="error-text text-red-500 text-xs mt-1">
              {errors.patientName}
            </p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="patientEmail"
            className="form-label block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="patientEmail"
            name="patientEmail"
            value={formData.patientEmail}
            onChange={handleChange}
            className={`form-input w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.patientEmail ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter email address"
          />
          {errors.patientEmail && (
            <p className="error-text text-red-500 text-xs mt-1">
              {errors.patientEmail}
            </p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="patientPhone"
            className="form-label block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number *
          </label>
          <input
            type="tel"
            id="patientPhone"
            name="patientPhone"
            value={formData.patientPhone}
            onChange={handleChange}
            className={`form-input w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.patientPhone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter phone number"
          />
          {errors.patientPhone && (
            <p className="error-text text-red-500 text-xs mt-1">
              {errors.patientPhone}
            </p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="reason"
            className="form-label block text-sm font-medium text-gray-700 mb-1"
          >
            Reason for Visit *
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={3}
            className={`form-input w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.reason ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Describe the reason for your visit"
          />
          {errors.reason && (
            <p className="error-text text-red-500 text-xs mt-1">
              {errors.reason}
            </p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="notes"
            className="form-label block text-sm font-medium text-gray-700 mb-1"
          >
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={2}
            className="form-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any additional information..."
          />
        </div>

        <div className="form-actions flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="cancel-button px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
