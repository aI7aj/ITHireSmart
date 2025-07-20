import React, { useState } from "react";
import {
  TextField,
  Button,
  Alert,
  CircularProgress,
  Box,
  Typography,
  Paper,
  Divider,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../API/API";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = async () => {
    setMsg("");
    setError("");
    if (newPassword !== confirmPassword)
      return setError("Passwords do not match");

    setLoading(true);
    try {
      const res = await resetPassword({ token, password: newPassword });
      setMsg(res.data.message || "Password reset successful!");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          borderRadius: 2,
          bgcolor: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <LockResetIcon sx={{ mr: 1, color: "#333" }} />
          <Typography
            variant="h5"
            component="h1"
            sx={{ fontWeight: 600, color: "#333" }}
          >
            Reset Password
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {msg && (
          <Alert
            severity="success"
            sx={{ mb: 2, "& .MuiAlert-message": { color: "#2e7d32" } }}
          >
            {msg}
          </Alert>
        )}

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2, "& .MuiAlert-message": { color: "#d32f2f" } }}
          >
            {error}
          </Alert>
        )}

        <Stack spacing={2.5}>
          <TextField
            label="New Password"
            type={showNew ? "text" : "password"}
            fullWidth
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              sx: { borderRadius: 1.5 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowNew(!showNew)} edge="end">
                    {showNew ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm Password"
            type={showConfirm ? "text" : "password"}
            fullWidth
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              sx: { borderRadius: 1.5 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirm(!showConfirm)}
                    edge="end"
                  >
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleChange}
            disabled={loading}
            sx={{
              mt: 1,
              py: 1.5,
              bgcolor: "#333",
              color: "white",
              borderRadius: 1.5,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "#555",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ResetPassword;