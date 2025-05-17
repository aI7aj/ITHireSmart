import React, { useEffect, useState } from "react";
import { getCompanyJob } from "../API";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography, Box } from "@mui/material";

function CompanyDashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchJobs = async () => {
      try {
        const response = await getCompanyJob(userId);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching company jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Box sx={{ maxWidth: 900, margin: "40px auto", padding: 3 }}>
      <Typography variant="h4" mb={3}>
        Company Dashboard
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => navigate("/company/add-job")}
      >
        Add New Job
      </Button>

      {jobs.length === 0 ? (
        <Typography>No jobs posted yet.</Typography>
      ) : (
        jobs.map((job) => (
          <Card key={job._id} sx={{ mb: 2, p: 2 }}>
            <Typography variant="h6">{job.jobTitle}</Typography>
            <Typography>Location: {job.location}</Typography>
            <Typography>Applicants: {job.applicants.length}</Typography>
            <Button
              size="small"
              onClick={() => navigate(`/company/job/${job._id}/applicants`)}
            >
              View Applicants
            </Button>
          </Card>
        ))
      )}
    </Box>
  );
}

export default CompanyDashboard;
