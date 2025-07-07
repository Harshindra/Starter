import { formatDate, formatTime } from "../utils/appointmentUtils";
import { doctors } from "../data/mockData";

export default function AppointmentList({
  appointments,
  userType,
  onStatusChange,
  onCancel,
}) {
  const getDoctorById = (id) => doctors.find((doc) => doc.id === id);

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
    };

    return (
      <span
        className={`status-badge px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const isUpcoming = (date, time) => {
    const appointmentDateTime = new Date(`${date} ${time}`);
    return appointmentDateTime > new Date();
  };

  if (appointments.length === 0) {
    return (
      <div className="appointment-list bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          {userType === "doctor" ? "Patient Appointments" : "Your Appointments"}
        </h3>
        <div className="empty-state text-center py-8">
          <div className="text-gray-400 text-4xl mb-2">📅</div>
          <p className="text-gray-500">No appointments found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment-list bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {userType === "doctor" ? "Patient Appointments" : "Your Appointments"}
      </h3>

      <div className="appointments-grid space-y-4">
        {appointments.map((appointment) => {
          const doctor = getDoctorById(appointment.doctorId);
          const upcoming = isUpcoming(appointment.date, appointment.time);

          return (
            <div
              key={appointment.id}
              className="appointment-card border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="appointment-info flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-800">
                      {userType === "doctor"
                        ? appointment.patientName
                        : doctor?.name}
                    </h4>
                    {getStatusBadge(appointment.status)}
                  </div>

                  <div className="appointment-details text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {formatDate(new Date(appointment.date))}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span>{" "}
                      {formatTime(appointment.time)}
                    </p>
                    {userType === "doctor" && (
                      <>
                        <p>
                          <span className="font-medium">Contact:</span>{" "}
                          {appointment.patientEmail}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span>{" "}
                          {appointment.patientPhone}
                        </p>
                      </>
                    )}
                    {userType === "user" && doctor && (
                      <p>
                        <span className="font-medium">Specialty:</span>{" "}
                        {doctor.specialty}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">Reason:</span>{" "}
                      {appointment.reason}
                    </p>
                    {appointment.notes && (
                      <p>
                        <span className="font-medium">Notes:</span>{" "}
                        {appointment.notes}
                      </p>
                    )}
                  </div>
                </div>

                {doctor && userType === "user" && (
                  <div className="doctor-avatar flex-shrink-0 ml-4">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                )}
              </div>

              {upcoming && appointment.status !== "cancelled" && (
                <div className="appointment-actions flex space-x-2 pt-3 border-t border-gray-100">
                  {userType === "doctor" &&
                    appointment.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            onStatusChange(appointment.id, "confirmed")
                          }
                          className="action-button bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() =>
                            onStatusChange(appointment.id, "cancelled")
                          }
                          className="action-button bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                        >
                          Decline
                        </button>
                      </>
                    )}

                  {(userType === "user" ||
                    (userType === "doctor" &&
                      appointment.status === "confirmed")) && (
                    <button
                      onClick={() => onCancel(appointment.id)}
                      className="action-button bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
