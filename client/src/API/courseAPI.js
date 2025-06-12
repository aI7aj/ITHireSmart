import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});

export const getCourses = () => API.get("/course");
export const getCourseById = (id) => API.get(`/course/${id}`);
export const getCompanyCourses = (id) => API.get(`/course/companyCourses/${id}`);
export const addCourse = (courseData) => API.post("/course/postCourse", courseData);
export const enrollCourse = (courseId) => API.post(`/course/${courseId}/enroll`);
