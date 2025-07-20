import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  FormHelperText,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../API/API.js";
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

const TextFieldStyle = {
  width: "100%",
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
  maxWidth: "400px",
  borderRadius: "10px",
  fontFamily: "Geist",
};
const ForgotPassword = () => {
  const navigator = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

const [successMessage, setSuccessMessage] = React.useState("");

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await forgotPassword(values.email);
          setSuccessMessage("A reset link has been sent to your email.");
          // setTimeout(() => {
          //   navigator("/login");
          // }, 2000);
        } catch (error) {
          console.error("Error sending reset email:", error.message);
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
                variant="h4"
                sx={{ fontFamily: "Geist", textAlign: "center" }}
              >
                Forgot Password
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontFamily: "Geist", textAlign: "center", mb: 1 }}
              >
                Enter your email and we'll send you a reset link
              </Typography>

              <Box sx={{ width: "100%", maxWidth: "400px" }}>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  variant="outlined"
                  sx={TextFieldStyle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                />
                {touched.email && errors.email && (
                  <FormHelperText sx={{ color: "red", mt: 1 }}>
                    {errors.email}
                  </FormHelperText>
                )}
              </Box>

              

              <Button type="submit" variant="contained" sx={ButtonStyle}>
                Send Reset Link
              </Button>
              {successMessage && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "lightgreen",
                    textAlign: "center",
                    mb: 2,
                    fontFamily: "Geist",
                  }}
                >
                  {successMessage}
                </Typography>
              )}
              <Button
                onClick={() => navigator("/login")}
                variant="text"
                sx={{ color: "white", textDecoration: "underline" }}
              >
                Back to Login
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPassword;
