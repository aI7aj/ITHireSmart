"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Container,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Business } from "@mui/icons-material";
import { loginCompany } from "../../API/company.js";
import { useNavigate } from "react-router-dom";

const CompanyLogin = () => {
  const [formData, setFormData] = useState({
    companyEmail: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyEmail) {
      newErrors.companyEmail = "Company Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.companyEmail)) {
      newErrors.companyEmail = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setAlertMessage("");

    try {
      const res = await loginCompany(formData.companyEmail, formData.password);

      if (res && res.data && res.data.token) {
        const data = res.data;
        localStorage.setItem("role", data.role || "company");
        localStorage.setItem("email", data.email);
        localStorage.setItem("companyId", data.id);
        localStorage.setItem("companyName", data.companyName);
        localStorage.setItem("token", data.token);

        navigate("/CompanyDashboard");
      } else if (
        res &&
        res.data &&
        res.data.errors &&
        Array.isArray(res.data.errors)
      ) {
        res.data.errors.forEach((error) => {
          const field = error.param || "companyEmail";
          const message = error.msg || "Login failed";
          setErrors((prev) => ({
            ...prev,
            [field]: message,
          }));
        });
        setAlertMessage("Please check the errors below");
      } else if (res && res.data && res.data.msg) {
        setErrors((prev) => ({
          ...prev,
          companyEmail: res.data.msg,
        }));
        setAlertMessage(res.data.msg);
      } else {
        setAlertMessage("Login failed. Please try again.");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.msg || "An error occurred during login.";
      setErrors((prev) => ({
        ...prev,
        companyEmail: msg,
      }));
      setAlertMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Business
                sx={{
                  fontSize: 48,
                  color: "#000000",
                  mb: 1,
                }}
              />
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 600,
                  color: "#000000",
                  mb: 1,
                }}
              >
                Company Login
              </Typography>
              <Typography variant="body2" sx={{ color: "#666666" }}>
                Welcome back! Please sign in to your account
              </Typography>
            </Box>

            {/* Alert Message */}
            {alertMessage && (
              <Alert
                severity={
                  alertMessage.includes("successful") ? "success" : "error"
                }
                sx={{ width: "100%" }}
              >
                {alertMessage}
              </Alert>
            )}

            {/* Email Field */}
            <TextField
              fullWidth
              label="Company Email"
              type="email"
              value={formData.companyEmail}
              onChange={handleInputChange("companyEmail")}
              error={Boolean(errors.companyEmail)}
              helperText={errors.companyEmail}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange("password")}
              error={Boolean(errors.password)}
              helperText={errors.password}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                backgroundColor: "#000000",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#333333",
                },
                "&:disabled": {
                  backgroundColor: "#cccccc",
                  color: "#666666",
                },
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>

            {/* Footer */}
            <Typography
              variant="body2"
              sx={{ color: "#666666", textAlign: "center", mt: 2 }}
            >
              Don't have an account?{" "}
              <Button
                variant="text"
                onClick={() => navigate("/CompanyRegister")}
                sx={{
                  textDecoration: "underline",
                  padding: 0,
                  minWidth: "auto",
                  color: "#666666",
                }}
              >
                Register
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CompanyLogin;
