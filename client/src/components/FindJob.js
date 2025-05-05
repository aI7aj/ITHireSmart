import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Typography,
  Box,
  TextField,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Pagination,
} from "@mui/material";
import { getJobs } from "../API";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

function FindJob() {
  const getRandomLightColor = () => {
    const lightColors = [
      "#FFE1CB",
      "#D5F6ED",
      "#ECEFF5",
      "#E3DCFA",
      "#D5F6ED",
      "#D8BFD8",
      "#ADD8E6",
      "#F0E68C",
      "#E0EEE0",
    ];
    const randomIndex = Math.floor(Math.random() * lightColors.length);
    return lightColors[randomIndex];
  };

  const [errorOpen, setErrorOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        navigate("/404");
      }
    };

    fetchJobs();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setErrorOpen(false);
  };

  const startIndex = (page - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const paginatedJobs = jobs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: "#F7FAFC",
        minHeight: "100vh",
        px: { xs: 2, md: 6 },
        py: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: { xs: "100%", md: "23%" },
            minWidth: 240,
            maxWidth: 320,
          }}
        >
          <Card sx={{ p: 1.5, borderRadius: "12px" }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              Search Filters
            </Typography>
            <TextField label="Keyword" fullWidth margin="dense" size="small" />
            <TextField
              label="Location"
              fullWidth
              margin="dense"
              size="small"
              select
              defaultValue=""
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="new york">New York</MenuItem>
              <MenuItem value="san francisco">San Francisco</MenuItem>
            </TextField>
            <FormGroup sx={{ mt: 1 }}>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Remote Only"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Full Time"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Part Time"
              />
            </FormGroup>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 1.5, fontSize: "0.9rem", py: 1 }}
            >
              Apply Filters
            </Button>
          </Card>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            Jobs
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {paginatedJobs.map((job) => {
              const randomColor = getRandomLightColor();

              return (
                <Box
                  key={job._id}
                  sx={{
                    flex: "1 1 300px",
                    maxWidth: "32%",
                    minWidth: "280px",
                    boxSizing: "border-box",
                    display: "flex",
                  }}
                >
                  <Card
                    sx={{
                      width: "100%",
                      borderRadius: "16px",
                      border: "2px solid #ECECEC",
                      boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
                      background: "#fff",
                      p: 2,
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Inner Card */}
                    <Box
                      sx={{
                        width: "100%",
                        borderRadius: "16px",
                        background: randomColor,
                        p: 2,
                        minHeight: 180,
                        boxSizing: "border-box",
                      }}
                    >
                      {/* Company logo and name */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1.2 }}
                      >
                        <Box sx={{ mr: 1 }}>
                          <img
                            src={
                              job.companyLogo ||
                              "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                            }
                            alt="Company Logo"
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: "#888",
                            fontFamily: "DM Sans, Poppins, Arial",
                            fontSize: "15px",
                            fontWeight: 500,
                            textTransform: "capitalize",
                            letterSpacing: 0.1,
                          }}
                        >
                          {job.company || job.companyName}
                        </Typography>
                      </Box>
                      {/* Job Title */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1.2,
                          color: "#171923",
                          fontSize: "19px",
                          fontFamily: "Poppins, DM Sans, Arial",
                          textTransform: "capitalize",
                          lineHeight: 1.2,
                          letterSpacing: 0.1,
                        }}
                      >
                        {job.title || job.jobTitle}
                      </Typography>
                      {/* Job tags */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 0.5,
                          mb: 1.2,
                          flexWrap: "wrap",
                        }}
                      >
                        <Box
                          sx={{
                            px: 2,
                            py: 0.5,
                            borderRadius: "20px",
                            fontSize: 13,
                            fontWeight: 500,
                            color: "#333",
                            border: "1px solid #655F5F",
                            letterSpacing: 0.2,
                            width: "40%",
                            textAlign: "start"

                          }}
                        >
                          {job.jobType || "Full Time"}
                        </Box>
                        <Box
                          sx={{
                            px: 2,
                            py: 0.5,
                            borderRadius: "20px",
                            fontSize: 13,
                            fontWeight: 500,
                            color: "#333",
                            border: "1px solid #655F5F",
                            letterSpacing: 0.2,
                            width: "40%",
                            textAlign: "start"
                          }}
                        >
                          {job.locationType || "Remote"}
                        </Box>
                        <Box
                          sx={{
                            px: 2,
                            py: 0.5,
                            borderRadius: "20px",
                            fontSize: 13,
                            fontWeight: 500,
                            color: "#333",
                            border: "1px solid #655F5F",
                            letterSpacing: 0.2,
                            textAlign: "start"

                          }}
                        >
                          {job.experienceLevel || "Senior Level"}
                        </Box>
                      </Box>
                    </Box>
                    {/* Salary and location */}
                    <Box sx={{ width: "100%", px: 0.5, pt: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            color: "#222",
                            fontSize: "22px",
                            mr: 0.5,
                          }}
                        >
                          {job.salary ? `$${job.salary}k` : "$2.5k"}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#888",
                            fontWeight: 500,
                            fontSize: "13px",
                            mt: "4px",
                          }}
                        >
                          /{job.salaryPeriod || "Monthly"}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "20px",
                            color: "#888",
                            fontWeight: 100,
                          }}
                        >
                          {job.location || "California, CA"}
                        </Typography>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{
                            bgcolor: "#171923",
                            color: "#fff",
                            borderRadius: "20px",
                            textTransform: "none",
                            fontWeight: 600,
                            px: 3,
                            fontSize: "15px",
                            boxShadow: "none",
                            letterSpacing: 0.2,
                            "&:hover": { bgcolor: "#444" },
                          }}
                          onClick={() => navigate(`/job/${job._id}`)}
                        >
                          Details
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              );
            })}
          </Box>
          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Box>
        </Box>
      </Box>
      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Failed to load jobs. Please Login try again later.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default FindJob;
