export const getUsers = () => {
  const users = localStorage.getItem("medibook_users");
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users) => {
  localStorage.setItem("medibook_users", JSON.stringify(users));
};

export const getCurrentUser = () => {
  const currentUser = localStorage.getItem("medibook_current_user");
  return currentUser ? JSON.parse(currentUser) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem("medibook_current_user", JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem("medibook_current_user");
};

export const createUser = (userData) => {
  const users = getUsers();
  const newUser = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...userData,
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
};

export const validateCredentials = (email, password) => {
  const user = findUserByEmail(email);
  return user && user.password === password ? user : null;
};

// Initialize with some demo accounts
export const initializeDemoUsers = () => {
  const users = getUsers();
  if (users.length === 0) {
    const demoUsers = [
      {
        id: "demo_doctor_1",
        email: "dr.johnson@medibook.com",
        password: "doctor123",
        userType: "doctor",
        name: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        licenseNumber: "MD12345",
        experience: "15 years",
        avatar:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
        createdAt: new Date().toISOString(),
      },
      {
        id: "demo_patient_1",
        email: "patient@example.com",
        password: "patient123",
        userType: "patient",
        name: "John Doe",
        phone: "+1 (555) 123-4567",
        dateOfBirth: "1990-01-01",
        emergencyContact: "+1 (555) 987-6543",
        createdAt: new Date().toISOString(),
      },
    ];

    saveUsers(demoUsers);
  }
};
