import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});

export const registerUser = (values) => API.post("/users/register", values);
export const loginUser = (values) => API.post("/users/login", values);

export const getProfile = (id) => API.get(`/profiles/${id}`);
export const updateProfile = (id, values) => API.put(`/profiles/${id}`, values);

export const getJobs = () => API.get("/jobs");
export const addJob = (jobData) => API.post("/jobs/postJobs", jobData);
export const getJobById = (id) => API.get(`/jobs/${id}`);
export const getCompanyJob = (id) => API.get(`/jobs/companyJobs/${id}`);

export const applyJob = (jobId) => API.post(`/jobs/apply/${jobId}`);

export const getCourses = () => API.get("/course");
export const getCourseById = (id) => API.get(`/course/${id}`);
export const addCourse = (courseData) => API.post("/course", courseData);
