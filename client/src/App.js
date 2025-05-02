import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Authentication from "./components/Authentication";
import Home from "./components/Home";
import { Fragment } from "react";
import { registerUser } from "./API";


function App() {
  const handleRegister = async (values) => {
    try {
      const response = await registerUser(values);
      // console.log("Backend response:", response.data);
      return response.data;
    } catch (error) {
      // console.error("Registration error:", error);
      return { errors: [{ param: "email", msg: "This email is existing please choose another email" }] };
    }
  };
  
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register register={handleRegister} />} />
          <Route path="/Authentication" element={<Authentication />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
