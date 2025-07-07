export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateLoginForm = (formData) => {
  const errors = {};

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  }

  return errors;
};

export const validateSignupForm = (formData) => {
  const errors = {};

  // Common validations
  if (!formData.name.trim()) {
    errors.name = "Full name is required";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (!validatePassword(formData.password)) {
    errors.password = "Password must be at least 6 characters long";
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // User type specific validations
  if (formData.userType === "patient") {
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }

    if (!formData.emergencyContact.trim()) {
      errors.emergencyContact = "Emergency contact is required";
    }
  } else if (formData.userType === "doctor") {
    if (!formData.specialty.trim()) {
      errors.specialty = "Specialty is required";
    }

    if (!formData.licenseNumber.trim()) {
      errors.licenseNumber = "Medical license number is required";
    }

    if (!formData.experience.trim()) {
      errors.experience = "Years of experience is required";
    }
  }

  return errors;
};

export const generateAvatar = (name) => {
  // Simple avatar generator using initials
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .substring(0, 2);

  const colors = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#06B6D4",
    "#84CC16",
    "#EC4899",
  ];

  const colorIndex = name.charCodeAt(0) % colors.length;
  const color = colors[colorIndex];

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${color.substring(1)}&color=fff&size=150`;
};

export const formatUserRole = (userType) => {
  return userType === "doctor" ? "Doctor" : "Patient";
};

export const isDoctor = (user) => {
  return user && user.userType === "doctor";
};

export const isPatient = (user) => {
  return user && user.userType === "patient";
};
