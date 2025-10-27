// Simulated authentication functions for Stage 1
// In Stage 2/3, replace these with real fetch requests to your backend

// Simulated user database in localStorage
const getUsersDB = () => {
  const users = localStorage.getItem("registeredUsers");
  return users ? JSON.parse(users) : [];
};

const saveUserToDB = (email, password, name) => {
  const users = getUsersDB();
  users.push({ email, password, name });
  localStorage.setItem("registeredUsers", JSON.stringify(users));
};

const findUser = (email, password) => {
  const users = getUsersDB();
  return users.find(
    (user) => user.email === email && user.password === password
  );
};

export const register = (email, password, name) => {
  // Simulate successful registration with validation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsersDB();

      // Check if user already exists
      if (users.some((user) => user.email === email)) {
        reject(new Error("User with this email already exists"));
        return;
      }

      // Save new user
      saveUserToDB(email, password, name);

      resolve({
        data: {
          _id: `fake-user-id-${Date.now()}`,
          name: name,
          email: email,
        },
        token: `fake-jwt-token-${Date.now()}`,
      });
    }, 500); // Simulate network delay
  });
};

export const authorize = (email, password) => {
  // Simulate successful login with validation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = findUser(email, password);

      if (!user) {
        reject(new Error("Incorrect email or password"));
        return;
      }

      resolve({
        token: `fake-jwt-token-${Date.now()}`,
      });
    }, 500); // Simulate network delay
  });
};

export const checkToken = (token) => {
  // Simulate checking if token is valid and return user data
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: {
          _id: "fake-user-id-123",
          name: "Test User",
          email: "test@example.com",
        },
      });
    }, 300); // Simulate network delay
  });
};

export const getUserInfo = (token) => {
  // Simulate getting user info from token
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        _id: "fake-user-id-123",
        name: "Test User",
        email: "test@example.com",
      });
    }, 300);
  });
};
