import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ViewApplicants } from "../../API/jobsAPI";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  CircularProgress,
  Container,
  CardHeader,
  IconButton,
  Button,
} from "@mui/material";
import { Mail } from "@mui/icons-material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getProfile } from "../../API/API";

const ApplicantsPage = () => {
  const { jobId } = useParams();
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const res = await ViewApplicants(jobId);
        const applicantsList = res.data;
        console.log("Applicants with populated user:", applicantsList);
        setApplicants(applicantsList);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 3,
          borderBottom: "2px solid #f0f0f0",
          pb: 2,
        }}
      >
        Applicants
        <Chip
          label={`${applicants.length} total`}
          size="small"
          sx={{ ml: 2, bgcolor: "#e3f2fd" }}
        />
      </Typography>
      <Button
        variant="contained"
        size="medium"
        startIcon={<ArrowBackIosNewIcon />}
        sx={{
          mb: 2,
          bgcolor: "black",
          textTransform: "none",
          borderRadius: 2,
          boxShadow: 2,
          px: 3,
          color: "white",
        }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      {applicants.length === 0 ? (
        <Card
          sx={{
            p: 4,
            textAlign: "center",
            bgcolor: "#f5f5f5",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No applicants found for this position yet.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Check back later or modify your job posting to attract more
            candidates.
          </Typography>
        </Card>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {applicants.map((applicant) => {
            const name = applicant.user?.firstName || "Unknown Applicant";
            const email = applicant.user?.email || "No email provided";
            const appliedDateObj = new Date(applicant.appliedAt);
            const appliedDate =
              appliedDateObj.toLocaleDateString() +
              " " +
              appliedDateObj.toLocaleTimeString();

            return (
              <Box key={applicant._id}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        alt={`${name} Avatar`}
                        src={applicant.user?.profilepic?.url}
                        sx={{
                          width: 56,
                          height: 56,
                          bgcolor: "#e3f2fd",
                          color: "#1976d2",
                        }}
                      >
                        {!applicant.user?.profilepic?.url && name[0]}
                      </Avatar>
                    }
                    title={
                      <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                        {name}
                      </Typography>
                    }
                    subheader={`Applied on ${appliedDate}`}
                  />

                  <Divider />
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Mail
                        fontSize="small"
                        sx={{ color: "text.secondary", mr: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {email}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                      <Chip
                        size="small"
                        label="Information"
                        icon={<NewspaperIcon fontSize="small" />}
                        variant="outlined"
                        clickable
                        sx={{ p: 1 }}
                        onClick={() => navigate(`/user/${applicant.user._id}`)}
                      />
                      <Chip
                        size="small"
                        label="Contact"
                        icon={<Mail fontSize="small" />}
                        variant="outlined"
                        clickable
                        sx={{ p: 1 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>
      )}
    </Container>
  );
};

export default ApplicantsPage;
