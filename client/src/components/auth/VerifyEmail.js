import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";


const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        gap: 3,
      }}
    >
      <Typography variant="h4" fontWeight="bold" textAlign="center">
        Verify Your Email
      </Typography>
      <Typography variant="body1" textAlign="center">
        Please enter the verification code sent to your email: <br />
        <strong>{email}</strong>
      </Typography>

      <TextField
        label="Verification Code"
        variant="outlined"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        sx={{ bgcolor: "white", borderRadius: 1, width: "300px" }}
      />

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success.main" variant="body2">
          {success}
        </Typography>
      )}

      <Button
        variant="contained"
        
        disabled={loading || !token.trim()}
        sx={{ width: "300px" }}
      >
        {loading ? "Verifying..." : "Verify"}
      </Button>
    </Box>
  );
};

export default VerifyEmail;
