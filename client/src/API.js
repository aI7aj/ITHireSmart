import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  });

  

export const registerUser = (values) => API.post('/users/register', values);
export const loginUser = (values) => API.post('/users/login', values);
export const getProfile = (id) => API.get(`/profiles/${id}`);
export const updateProfile = (id, values) => API.put(`/profiles/${id}`, values);
export const getJobs = () => API.get('/jobs');
export const addJob = (jobData) => API.post('/jobs', jobData);
export const getJobById = (id) => API.get(`/jobs/${id}`);
export const udemy = (search) => API.get(`/course?search=${search}`);
