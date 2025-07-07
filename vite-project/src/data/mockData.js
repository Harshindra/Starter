export const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: "15 years",
    rating: 4.8,
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatology",
    experience: "12 years",
    rating: 4.9,
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    experience: "10 years",
    rating: 4.7,
    avatar:
      "https://images.unsplash.com/photo-1594824475212-5ee96ea31725?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Dr. David Williams",
    specialty: "Orthopedics",
    experience: "18 years",
    rating: 4.6,
    avatar:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
  },
];

export const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export const getInitialAppointments = () => {
  const savedAppointments = localStorage.getItem("appointments");
  return savedAppointments ? JSON.parse(savedAppointments) : [];
};

export const saveAppointments = (appointments) => {
  localStorage.setItem("appointments", JSON.stringify(appointments));
};
