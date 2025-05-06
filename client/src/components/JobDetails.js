import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../API";
import {
  Card,
  Typography,
  Box,
  Button,
  Chip,
  Avatar,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";
function JobDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) {
    return <Typography>Loading job details...</Typography>;
  }

  return (
    <Card
      sx={{
        maxWidth: 1100,
        margin: "40px auto",
        p: 0,
        borderRadius: 3,
        boxShadow: 2,
        background: "#f9fbfd",
      }}
    >
      {/* Back Link */}
      <Box sx={{ p: 2, pb: 0 }}>
        <Button
          variant="text"
          onClick={() => navigate(-1)}
          sx={{ textTransform: "none", color: "#1976d2", fontWeight: 500 }}
        >
          &#8592; Back
        </Button>
      </Box>
      {/* Header */}
      <Box
        sx={{
          background: "#f4f8fd",
          borderRadius: "12px 12px 0 0",
          p: { xs: 2, md: 4 },
          pb: 3,
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={job.companyLogo || ""}
            alt={job.company || "Company"}
            sx={{
              width: 56,
              height: 56,
              bgcolor: "#fff",
              color: "#222",
              fontWeight: 700,
              fontSize: 28,
            }}
          >
            {job.company ? job.company[0] : "C"}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              {job.jobTitle}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#555" }}>
              {job.companyName}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOnIcon sx={{ color: "#888" }} fontSize="small" />
            <Typography sx={{ color: "#222", fontWeight: 500 }}>
              {job.location || "California, CA"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTimeIcon sx={{ color: "#888" }} fontSize="small" />
            <Typography sx={{ color: "#222", fontWeight: 500 }}>
              {job.jobType || "Full-time"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WorkIcon sx={{ color: "#888" }} fontSize="small" />
            <Typography sx={{ color: "#222", fontWeight: 500 }}>
              {job.experienceLevel || "Senior (5+ years)"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MonetizationOnIcon sx={{ color: "#888" }} fontSize="small" />
            <Typography sx={{ color: "#222", fontWeight: 500 }}>
              {job.salary ? `$${job.salary}` : "$2.5k"}/
              {job.salaryPeriod || "month"}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5, mt: 2, flexWrap: "wrap" }}>
          <Chip
            label={job.jobType}
            size="small"
            sx={{ bgcolor: "#fff", fontWeight: 600 }}
          />
          <Chip
            label={job.workType}
            size="small"
            sx={{ bgcolor: "#fff", fontWeight: 600 }}
          />
          <Chip
            label={job.experienceLevel}
            size="small"
            sx={{ bgcolor: "#fff", fontWeight: 600 }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
          <CalendarMonthIcon sx={{ color: "#888" }} fontSize="small" />
          <Typography sx={{ color: "#888", fontSize: 15 }}>
            Posted :{" "}
            {job.date ? new Date(job.date).toISOString().split("T")[0] : ""}
          </Typography>
        </Box>
      </Box>

      {/* Details */}
      <Box sx={{ p: { xs: 2, md: 4 }, pt: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
          Job Description
        </Typography>
        <Typography sx={{ mb: 3, color: "#222" }}>
          {job.jobDescription}
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
          Requirements
        </Typography>
        {job.Requirements.map((item, index) => (
          <Typography key={index} sx={{ mb: 1, color: "#222" }}>
            • {item}
          </Typography>
        ))}

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
          Responsibilities
        </Typography>
        {job.Responsibilities.map((item, index) => (
          <Typography key={index} sx={{ mb: 1, color: "#222" }}>
            • {item}
          </Typography>
        ))}

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
          Benefits
        </Typography>

        <Box sx={{ mt: 5 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              bgcolor: "#171923",
              color: "#fff",
              borderRadius: "7px",
              fontWeight: 600,
              fontSize: "1rem",
              py: 1.2,
              boxShadow: "none",
              "&:hover": { bgcolor: "#222" },
            }}
          >
            Apply Now
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default JobDetails;
