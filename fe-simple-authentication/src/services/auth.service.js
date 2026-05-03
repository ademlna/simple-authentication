// src/services/authService.js
import api from "./api";

// 1. service login
// export const login = async (username, password) => {
//   try {
//     const res = await api.post(
//       "/auth/v1/login",
//       { username, password },
//       { withCredentials: true } // penting agar cookie dari BE disimpan di browser
//     );
//     return res.data; // BE bisa kirim info user (tanpa token)
//   } catch (error) {
//     throw error.response?.data || { message: "Login failed" };
//   }
// };

export const login = async (username, password) => {
  try {
    const res = await api.post(
      "/auth/v1/login",
      { username, password },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    throw error; // lempar utuh agar .response masih ada
  }
};

// 2. service logout
export const logout = async () => {
  const res = await api.post("/auth/v1/logout");
  return res.data;
};

// 3. dashboard
export const getProfile = async () => {
  try {
    const res = await api.get("/auth/v1/profil", { withCredentials: true });
    return res.data; 
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch profile" };
  }
};

export const register = async (name, email, username, password) => {
  try {
    const res = await api.post("/user/v1/register", {
      name,
      email,
      username,
      password,
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Gagal melakukan registrasi" };
  }
};

