import axios from "axios";

const serverUrl = "http://localhost:5000";

export const api = axios.create({
    baseURL : `${serverUrl}/api`,
    headers:{
        "Content-Type" : "application/json"
    }
})