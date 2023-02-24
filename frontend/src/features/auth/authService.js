import axios from "axios";

const API_URL = "api/auth/";

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const deleteUser = async (email, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`/${API_URL}delete`, { email }, config);

  return response.data;
};

const registerUser = async (userData, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`/${API_URL}register`, userData, config);

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const updatePassword = async (userData, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "update", userData, config);

  return response.data;
};

const authService = { registerUser, login, logout, deleteUser, updatePassword };

export default authService;
