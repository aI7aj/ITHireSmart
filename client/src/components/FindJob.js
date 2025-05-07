import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Typography,
  Box,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Pagination,
  Divider,
  FormGroup,
} from "@mui/material";
import { getJobs } from "../API";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import BoltIcon from "@mui/icons-material/Bolt";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
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
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    experienceLevel: "",
    workTypes: [],
    jobTypes: [],
  });
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        navigate("/404");
      }
    };
    fetchJobs();
  }, [navigate]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setErrorOpen(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (field, value) => {
    let arr = filters[field];
    if (arr.includes(value)) {
      arr = arr.filter(function (item) {
        return item !== value;
      });
    } else {
      arr = arr.concat(value);
    }
    setFilters({ ...filters, [field]: arr });
  };

  const applyFilters = () => {
    let filtered = jobs;

    if (filters.keyword) {
      filtered = filtered.filter(function (job) {
        if (!job.title) return false;
        return job.title.toLowerCase().includes(filters.keyword.toLowerCase());
      });
    }

    if (filters.location) {
      filtered = filtered.filter(function (job) {
        if (!job.location) return false;
        return job.location
          .toLowerCase()
          .includes(filters.location.toLowerCase());
      });
    }

    if (filters.experienceLevel) {
      filtered = filtered.filter(function (job) {
        if (!job.experienceLevel) return false;
        return (
          job.experienceLevel.toLowerCase() ===
          filters.experienceLevel.toLowerCase()
        );
      });
    }

    if (filters.workTypes.length > 0) {
      filtered = filtered.filter(function (job) {
        return filters.workTypes.includes(job.workType);
      });
    }

    if (filters.jobTypes.length > 0) {
      filtered = filtered.filter(function (job) {
        return filters.jobTypes.includes(job.jobType);
      });
    }

    setFilteredJobs(filtered);
    setPage(1);
  };

  const startIndex = (page - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <Box
      sx={{
        background: "#F7FAFC",
        minHeight: "100vh",
        px: { xs: 1, sm: 2, md: 6 },
        py: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "flex-start" },
          gap: { xs: 2, md: 3 },
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: { xs: "100%", md: 320 },
            maxWidth: 400,
            marginTop: { xs: 0, md: 8.4 },
            mb: { xs: 2, md: 0 },
            alignSelf: { xs: "auto", md: "flex-start" },
          }}
        >
          <Card
            sx={{
              p: 2,
              borderRadius: 5,
              background: "",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "black",
                }}
              >
                Filters
              </Typography>
              <FilterAltIcon sx={{ fontSize: 28, color: "black" }} />
            </Box>
            <Box sx={{ display: "flex", mb: 2 }}>
              <LocationOnOutlinedIcon sx={{ color: "#7C3AED" }} />
              <Typography>Location</Typography>
            </Box>
            <TextField
              label="Location"
              fullWidth
              size="small"
              select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              sx={{
                borderRadius: "16px",
                mb: 1.5,
                color: "black",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "& fieldset": { borderColor: "black" },
                  "&:hover fieldset": { borderColor: "black" },
                  "&.Mui-focused fieldset": { borderColor: "black" },
                },
                "& .MuiInputLabel-root": { color: "black" },
                "& .MuiInputBase-input": { color: "black" },
              }}
              InputLabelProps={{ style: { color: "black" } }}
              InputProps={{ style: { color: "black" } }}
              SelectProps={{ style: { color: "black" } }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="ramallah">Ramallah</MenuItem>
              <MenuItem value="nablus">Nablus</MenuItem>
              <MenuItem value="hebron">Hebron</MenuItem>
              <MenuItem value="jenin">Jenin</MenuItem>
              <MenuItem value="tulkarm">Tulkarm</MenuItem>
              <MenuItem value="qalqilya">Qalqilya</MenuItem>
              <MenuItem value="jericho">Jericho</MenuItem>
              <MenuItem value="bethlehem">Bethlehem</MenuItem>
              <MenuItem value="salfit">Salfit</MenuItem>
            </TextField>
            <Box sx={{ display: "flex", mb: 2 }}>
              <WorkspacePremiumIcon sx={{ color: "#7C3AED" }} />
              <Typography>Experience Level</Typography>
            </Box>
            <TextField
              label="Experience Level"
              fullWidth
              size="small"
              select
              name="experienceLevel"
              value={filters.experienceLevel || ""}
              onChange={handleFilterChange}
              sx={{
                mb: 1.5,
                color: "black",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "black" },
                  "&:hover fieldset": { borderColor: "black" },
                  "&.Mui-focused fieldset": { borderColor: "black" },
                },
                "& .MuiInputLabel-root": { color: "black" },
                "& .MuiInputBase-input": { color: "black" },
              }}
              InputLabelProps={{ style: { color: "black" } }}
              InputProps={{ style: { color: "black" } }}
              SelectProps={{ style: { color: "black" } }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="entry">Entry</MenuItem>
              <MenuItem value="mid">Mid</MenuItem>
              <MenuItem value="senior">Senior</MenuItem>
            </TextField>

            <Box p={2} width={300} sx={{ borderRight: "1px solid #ddd" }}>
              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1">Job Type</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={filters.jobTypes.includes("full-time")}
                      onChange={() =>
                        handleMultiSelect("jobTypes", "full-time")
                      }
                    />
                  }
                  label="Full-time"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={filters.jobTypes.includes("part-time")}
                      onChange={() =>
                        handleMultiSelect("jobTypes", "part-time")
                      }
                    />
                  }
                  label="Part-time"
                />
              </FormGroup>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1">Work Type</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={filters.workTypes.includes("Remote")}
                      onChange={() => handleMultiSelect("workTypes", "Remote")}
                    />
                  }
                  label="Remote"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={filters.workTypes.includes("onsite")}
                      onChange={() => handleMultiSelect("workTypes", "onsite")}
                    />
                  }
                  label="Onsite"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={filters.workTypes.includes("Hybrid")}
                      onChange={() => handleMultiSelect("workTypes", "Hybrid")}
                    />
                  }
                  label="Hybrid"
                />
              </FormGroup>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
                onClick={applyFilters}
              >
                Apply Filters
              </Button>
            </Box>
          </Card>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#F4F2FF",
                color: "#7C3AED",
                px: 1.5,
                py: 0.5,
                borderRadius: "20px",
                fontWeight: 600,
                fontSize: 18,
                border: "1px solid #ddd6fe",
                minWidth: 48,
                justifyContent: "center",
              }}
            >
              <BoltIcon sx={{ fontSize: 20, color: "#7C3AED" }} />
              <span style={{ fontWeight: 600, fontSize: 14 }}>
                {jobs.length}
              </span>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 500, color: "#222", fontSize: 20, ml: 1 }}
            >
              Available positions
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              maxWidth: "1200px",
              margin: "0 auto",
              overflowX: { xs: "auto", md: "visible" },
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            {paginatedJobs.map((job) => {
              const randomColor = getRandomLightColor();

              return (
                <Box
                  key={job._id}
                  sx={{
                    flex: { xs: "1 1 100%", sm: "1 1 300px" },
                    maxWidth: { xs: "100%", sm: "48%", md: "32%" },
                    minWidth: "260px",
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
                            textAlign: "start",
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
                            textAlign: "start",
                          }}
                        >
                          {job.workType || "Remote"}
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
                            textAlign: "start",
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
