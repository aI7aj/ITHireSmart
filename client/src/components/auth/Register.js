import React from "react";
import { Box, TextField, Typography, Button, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Ellipse from "../../assets/Ellipse.png";
import Vector from "../../assets/Vector.png";
import "../../App.css";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "20px",
  padding: "40px 20px",
  position: "relative",
  color: "white",
};

const ImageStyleTopLeft = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "30%",
  maxWidth: "300px",
};

const ImageStyleBottomRight = {
  position: "fixed",
  bottom: "0",
  right: "0",
  width: "30%",
  maxWidth: "300px",
};

const TextFieldStyle = {
  width: "100%",
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

/*
to use formik :

1- import formik
import { Formik, Form,   Field, ErrorMessage } from "formik";
import * as Yup from "yup";

2- initialValues={{}}
3- validationSchema={Yup.object({})}
4- onSubmit={(values) => {
}}



*/

const Register = ({ register }) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(
        /^[A-Za-z\u0600-\u06FF\s]+$/,
        "First name must contain only letters"
      )
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),

    lastName: Yup.string()
      .matches(
        /^[A-Za-z\u0600-\u06FF\s]+$/,
        "Last name must contain only letters"
      )
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    location: Yup.string()
      .min(2, "Location must be at least 2 characters")
      .required("Location is required"),

    mobileNumber: Yup.string()
      .matches(/^\d{10,10}$/, "Mobile number must be between 10")
      .required("Mobile number is required"), 

    dateOfBirth: Yup.date()
      .max(
        new Date(Date.now() - 13 * 365 * 24 * 60 * 60 * 1000),
        "You must be at least 13 years old"
      )
      .required("Date of birth is required"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one digit")
      .matches(
        /[@$!%*?&#^]/,
        "Password must contain at least one special character"
      ),

    password2: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required"),
  });

  return (
    <Box
      sx={{
        backgroundColor: "black",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          location: "",
          mobileNumber: "",
          password: "",
          password2: "",
          dateOfBirth: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            // Ensure mobileNumber is sent as a string
            const res = await register({
              ...values,
              mobileNumber: String(values.mobileNumber),
            });
            // console.log("Backend response:", res);

            if (res && Array.isArray(res.errors)) {
              let emailError = false;
              res.errors.forEach((err) => {
                setFieldError(err.param, err.msg);
                if (err.param === "email") {
                  emailError = true;
                }
              });
              if (emailError) return;
              // If there are other errors, stop here
              return;
            }

            if ((res && res.token) || (res && res.success)) {
              navigate("/Authentication");
              console.log("Registration successful");
              return;
            }

            setFieldError("email", "Registration failed. Please try again.");
          } catch (error) {
            setFieldError(
              "email",
              "An error occurred during registration. Please try again."
            );
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          setFieldError,
        }) => (
          <Form>
            <Box sx={style}>
              <Typography
                variant="h2"
                sx={{ fontFamily: "Poppins", textAlign: "center" }}
              >
                Register
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontFamily: "Poppins", textAlign: "center" }}
              >
                Please enter your information
              </Typography>

              <Grid container spacing={4} justifyContent="center">
                <Grid>
                  <Grid container direction="column" spacing={2}>
                    <Grid>
                      <Field
                        as={TextField}
                        name="firstName"
                        label="First name"
                        variant="outlined"
                        sx={TextFieldStyle}
                        fullWidth
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={<ErrorMessage name="firstName" />}
                      />
                    </Grid>
                    <Grid>
                      <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        variant="outlined"
                        sx={TextFieldStyle}
                        fullWidth
                        error={touched.email && Boolean(errors.email)}
                        helperText={<ErrorMessage name="email" />}
                        onChange={(e) => {
                          handleChange(e);
                          setFieldError("email", "");
                        }}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid>
                      <Field
                        as={TextField}
                        name="dateOfBirth"
                        type="date"
                        label="Date of Birth"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        sx={TextFieldStyle}
                        fullWidth
                        error={
                          touched.dateOfBirth && Boolean(errors.dateOfBirth)
                        }
                        helperText={<ErrorMessage name="dateOfBirth" />}
                      />
                    </Grid>
                    <Grid>
                      <Field
                        as={TextField}
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        sx={TextFieldStyle}
                        fullWidth
                        error={touched.password && Boolean(errors.password)}
                        helperText={<ErrorMessage name="password" />}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid container direction="column" spacing={2}>
                    <Grid>
                      <Field
                        as={TextField}
                        name="lastName"
                        label="Last name"
                        variant="outlined"
                        sx={TextFieldStyle}
                        fullWidth
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={<ErrorMessage name="lastName" />}
                      />
                    </Grid>
                    <Grid>
                      <Field
                        as={TextField}
                        name="location"
                        label="Location"
                        variant="outlined"
                        sx={TextFieldStyle}
                        fullWidth
                        error={touched.location && Boolean(errors.location)}
                        helperText={<ErrorMessage name="location" />}
                      />
                    </Grid>
                    <Grid>
                      <Field
                        as={TextField}
                        name="mobileNumber"
                        type="number"
                        label="Mobile Number"
                        variant="outlined"
                        sx={TextFieldStyle}
                        fullWidth
                        error={
                          touched.mobileNumber && Boolean(errors.mobileNumber)
                        }
                        helperText={<ErrorMessage name="mobileNumber" />}
                      />
                    </Grid>
                    <Grid>
                      <Field
                        as={TextField}
                        name="password2"
                        type="password"
                        label="Confirm Password"
                        variant="outlined"
                        sx={TextFieldStyle}
                        fullWidth
                        error={touched.password2 && Boolean(errors.password2)}
                        helperText={<ErrorMessage name="password2" />}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={ButtonStyle}
                endIcon={<ArrowForwardIcon />}
              >
                Next
              </Button>

              <Typography
                variant="subtitle1"
                sx={{ fontFamily: "Poppins", textAlign: "center" }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#B9BBBD" }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>

      <img src={Ellipse} alt="Ellipse" style={ImageStyleTopLeft} />
      <img src={Vector} alt="Vector" style={ImageStyleBottomRight} />
    </Box>
  );
};

export default Register;
