import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/users" });

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return config;
});

// Get all users
export const getAllUsers = () => API.get("/getallusers");

// Get user and company count
export const getUserCount = () => API.get("/getcount");

// Toggle user status
export const toggleUserStatus = (id) => API.patch(`/toggleUserStatus/${id}`);