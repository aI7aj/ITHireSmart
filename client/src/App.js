import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import FindJob from "./components/FindJob";
import Authentication from "./components/Authentication";
import { Fragment } from "react";
import { registerUser, loginUser } from "./API";
import Navbar from "./components/Navbar";
import JobDetails from "./components/JobDetails";

function App() {
  const location = useLocation();
  const handleRegister = async (values) => {
    try {
      const response = await registerUser(values);
      // console.log("Backend response:", response.data);
      return response.data;
    } catch (error) {
      // console.error("Registration error:", error);
      return {
        errors: [
          {
            param: "email",
            msg: "This email is existing please choose another email",
          },
        ],
      };
    }
  };

  const handleLogin = async (values) => {
    try {
      const response = await loginUser(values);
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      console.log("Backend response:", response.data);
      return response.data;
    } catch (error) {
      // console.error("Login error:", error);
      return { errors: [{ param: "email", msg: "Invalid email or password" }] };
    }
  };

   
  const showNavbar =
    location.pathname !== "/login" &&
    location.pathname !== "/Login" &&
    location.pathname !== "/register" &&
    location.pathname !== "/Register" &&
    location.pathname !== "/" &&
    location.pathname !== "/Authentication" &&
    location.pathname !== "/authentication";

  return (
    <Fragment>
      {showNavbar && <Navbar />}
      <Routes>
      <Route path="*" element={<div>Page Not Found</div>} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login login={handleLogin} />} />
        <Route
          path="/Register"
          element={<Register register={handleRegister} />}
        />
        <Route path="/Authentication" element={<Authentication />} />
        <Route path="/FindJob" element={<FindJob />} />
        <Route path="/job/:id" element={<JobDetails />} />
      </Routes>
    </Fragment>
  );
}

export default App;
