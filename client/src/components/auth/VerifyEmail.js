import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmailAPI } from "../../API/API"; 

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // نستلم الإيميل من صفحة التسجيل (إذا أردنا استخدامه للعرض أو إعادة إرسال الرمز)
  const email = location.state?.email || "";

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // نرسل الطلب للسيرفر مع الرمز
      const res = await verifyEmailAPI(token);
      if (res.data.message === "Email verified successfully.") {
        setSuccess("Email verified successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during verification."
      );
    } finally {
      setLoading(false);
    }
  };

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
        onClick={handleSubmit}
        disabled={loading || !token.trim()}
        sx={{ width: "300px" }}
      >
        {loading ? "Verifying..." : "Verify"}
      </Button>
    </Box>
  );
};

export default VerifyEmail;
