import axios from "axios";

const serverUrl = "http://localhost:5000";

export const api = axios.create({
    baseURL : `${serverUrl}/api`,
    headers:{
        "Content-Type" : "application/json"
    }
})

export const setAuthToken = (token) => {
    if(token){
        api.defaults.headers.common["x-auth-token"] = token;
        localStorage.setItem("token",token);
    }else{
        delete api.defaults.headers.common["x-auth-token"];
        localStorage.removeItem("token");
    }
}