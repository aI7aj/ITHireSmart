import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import Ellipse from "../assets/Ellipse.png";
import Vector from "../assets/Vector.png";
import "../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  color: "white",
  flexDirection: "column",
  gap: "20px",
  position: "relative",
  padding: "0 20px",
};
const ImageStyleTopLeft = {
  position: "absolute",
  top: "0px",
  left: "0px",
  width: "35%",
  maxWidth: "350px",
};
const ImageStyleBottomRight = {
  position: "absolute",
  bottom: "0px",
  right: "0px",
  width: "35%",
  maxWidth: "350px",
};
const TextFieldStyle = {
  width: "100%",
  mb: 2,
  maxWidth: "400px",
  height: "50px",
  borderRadius: "15px",
  backgroundColor: "transparent",
  color: "#fff",
  "& label, & label.Mui-focused, & .MuiInputBase-input": { color: "#fff" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#fff" },
    "&:hover fieldset": { borderColor: "#fff" },
    "&.Mui-focused fieldset": { borderColor: "#fff" },
  },
  fontFamily: "Poppins",
};
const ButtonStyle = {
  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
  bgcolor: "white",
  color: "black",
  "&:hover": { bgcolor: "#f0f0f0" },
  width: "100%",
  maxWidth: "450px",
  borderRadius: "10px",
  marginTop: "3%",
  fontFamily: "Poppins",
};

const Login = ({ login }) => {
  const navigator = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        try {
          const res = await login(values);
          if (res && res.token) {
            localStorage.setItem("role", res.role);
            navigator("/FindJob");
            console.log("Login successful");
          } else if (res && res.errors && Array.isArray(res.errors)) {
            res.errors.forEach((error) => {
              setFieldError(
                error.param || "email",
                error.msg || "Login failed"
              );
            });
          } else if (res && res.msg) {
            setFieldError("email", res.msg);
          } else {
            setFieldError("email", "Login failed. Please try again.");
          }
        } catch (error) {
          setFieldError("email", "An error occurred during login.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Box
            sx={{
              backgroundColor: "black",
              height: "100vh",
              position: "relative",
            }}
          >
            <Box sx={style}>
              <Typography
                variant="h2"
                sx={{ fontFamily: "Poppins", textAlign: "center" }}
              >
                Login
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontFamily: "Poppins", textAlign: "center" }}
              >
                Please enter your Email and your Password
              </Typography>

              <Field
                name="email"
                as={TextField}
                label="Email"
                variant="outlined"
                sx={TextFieldStyle}
                error={touched.email && Boolean(errors.email)}
                helperText={<ErrorMessage name="email" />}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Field
                name="password"
                as={TextField}
                type="password"
                label="Password"
                variant="outlined"
                sx={TextFieldStyle}
                error={touched.password && Boolean(errors.password)}
                helperText={<ErrorMessage name="password" />}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={ButtonStyle}
              >
                Login
              </Button>

              <img src={Ellipse} alt="Ellipse" style={ImageStyleTopLeft} />
              <img src={Vector} alt="Vector" style={ImageStyleBottomRight} />
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
