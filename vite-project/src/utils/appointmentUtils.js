export const generateAppointmentId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const formatTime = (time) => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const isSlotAvailable = (appointments, doctorId, date, time) => {
  const dateStr = date.toISOString().split("T")[0];
  return !appointments.some(
    (apt) =>
      apt.doctorId === doctorId &&
      apt.date === dateStr &&
      apt.time === time &&
      apt.status !== "cancelled",
  );
};

export const getUpcomingAppointments = (appointments, userType, userId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return appointments
    .filter((apt) => {
      const aptDate = new Date(apt.date);
      aptDate.setHours(0, 0, 0, 0);

      if (userType === "doctor") {
        return apt.doctorId === userId && aptDate >= today;
      } else {
        return apt.patientEmail === userId && aptDate >= today;
      }
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

export const validateAppointmentForm = (formData) => {
  const errors = {};

  if (!formData.patientName.trim()) {
    errors.patientName = "Patient name is required";
  }

  if (!formData.patientEmail.trim()) {
    errors.patientEmail = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.patientEmail)) {
    errors.patientEmail = "Email is invalid";
  }

  if (!formData.patientPhone.trim()) {
    errors.patientPhone = "Phone number is required";
  }

  if (!formData.reason.trim()) {
    errors.reason = "Reason for visit is required";
  }

  return errors;
};
