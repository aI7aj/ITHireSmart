"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Container,
  Alert,
  Stack,
  Paper,
  alpha,
  useTheme,
  Fade,
} from "@mui/material"
import { CloudUpload, Description, CheckCircle, Error, Login, FileUpload } from "@mui/icons-material"
import { uploadCv } from "../../API/API.js"

const UploadCvPage = () => {
  const theme = useTheme()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [dragOver, setDragOver] = useState(false)
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setMessage("")
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      setMessage("")
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleUpload = async () => {
    if (!file) return setMessage("Please upload your CV first.")

    const formData = new FormData()
    formData.append("cv", file)
    formData.append("userId", userId)

    try {
      setLoading(true)
      setMessage("")
      const res = await uploadCv(formData)
      setMessage("CV processed and profile updated successfully.")
    } catch (err) {
      console.error(err)
      setMessage("Failed to process CV.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  const isSuccess = message.includes("successfully")
  const isError = message.includes("Failed")

  return (
    <Box sx={{ bgcolor: "grey.50", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        <Fade in timeout={600}>
          <Box>
            {/* Header */}
            <Paper
              sx={{
                p: 4,
                mb: 4,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: "white",
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Stack alignItems="center" spacing={2}>
                <Description sx={{ fontSize: 48 }} />
                <Typography variant="h4" fontWeight="bold">
                  Upload Your CV
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Upload your CV and let our AI analyze it to enhance your profile
                </Typography>
              </Stack>
            </Paper>

            {/* Upload Card */}
            <Card sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}>
              <CardContent sx={{ p: 4 }}>
                {/* Drag & Drop Area */}
                <Paper
                  sx={{
                    p: 6,
                    border: `2px dashed ${dragOver ? theme.palette.primary.main : theme.palette.grey[300]}`,
                    borderRadius: 2,
                    bgcolor: dragOver ? alpha(theme.palette.primary.main, 0.05) : "grey.50",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.02),
                    },
                  }}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => document.getElementById("file-input").click()}
                >
                  <Stack alignItems="center" spacing={3}>
                    <CloudUpload
                      sx={{
                        fontSize: 64,
                        color: dragOver ? "primary.main" : "grey.400",
                      }}
                    />
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {dragOver ? "Drop your CV here" : "Drag & drop your CV here"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        or click to browse files
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                        Supported formats: PDF, JPG, PNG (Max 10MB)
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>

                {/* Hidden File Input */}
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf, image/jpeg, image/png, image/jpg"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                {/* Selected File Display */}
                {file && (
                  <Box sx={{ mt: 3 }}>
                    <Paper
                      sx={{
                        p: 3,
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                        borderRadius: 2,
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Description color="success" />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body1" fontWeight="medium">
                            {file.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </Typography>
                        </Box>
                        <CheckCircle color="success" />
                      </Stack>
                    </Paper>
                  </Box>
                )}

                {/* Upload Button */}
                <Box sx={{ mt: 4, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleUpload}
                    disabled={loading || !file}
                    startIcon={loading ? <CircularProgress size={20} /> : <FileUpload />}
                    sx={{
                      px: 6,
                      py: 2,
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      minWidth: 200,
                    }}
                  >
                    {loading ? "Processing..." : "Upload & Analyze CV"}
                  </Button>
                </Box>

                {/* Message Display */}
                {message && (
                  <Box sx={{ mt: 3 }}>
                    <Alert
                      severity={isSuccess ? "success" : isError ? "error" : "info"}
                      icon={isSuccess ? <CheckCircle /> : isError ? <Error /> : undefined}
                      sx={{ borderRadius: 2 }}
                    >
                      {message}
                    </Alert>
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Logout Button */}
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="outlined"
                size="large"
                onClick={handleLogout}
                startIcon={<Login />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                Go to Login
              </Button>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  )
}

export default UploadCvPage
