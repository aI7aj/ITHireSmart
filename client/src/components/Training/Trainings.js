import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  Chip,
  Button,
  Skeleton,
  Alert,
  Pagination,
  Stack,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Work as WorkIcon, Bolt as BoltIcon } from "@mui/icons-material";
import { getTrainings } from "../../API/trainingAPI";
import AddIcon from "@mui/icons-material/Add";

const TRAININGS_PER_PAGE = 6;

function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        setLoading(true);
        const response = await getTrainings();
        setTrainings(response.data);
        setError("");
      } catch (err) {
        setError("Failed to load trainings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrainings();
  }, []);

  const visibleTrainings = trainings.filter(
    (training) => training.isHidden === false
  );
  const totalPages = Math.ceil(visibleTrainings.length / TRAININGS_PER_PAGE);
  const paginatedTrainings = visibleTrainings.slice(
    (page - 1) * TRAININGS_PER_PAGE,
    page * TRAININGS_PER_PAGE
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
      {/* Header Section */}
      <Box sx={{ mb: { xs: 3, md: 5 }, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="#222222" gutterBottom>
          Discover Our Professional Trainings
        </Typography>
        <Typography
          variant="body1"
          color="#666666"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          Handpicked training opportunities to boost your career and skills.
          Explore our top picks and start your journey today!
        </Typography>
      </Box>

      {/* Training Count && Post Training */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: { xs: 2, md: 4 },
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#F5F5F5",
              color: "#333333",
              px: { xs: 1.5, sm: 2 },
              py: { xs: 0.5, sm: 0.8 },
              borderRadius: "20px",
              border: "1px solid #BBBBBB",
            }}
          >
            <BoltIcon sx={{ fontSize: 21, color: "#F3C623" }} />
            <span style={{ fontWeight: 500, fontSize: 18, color: "#F3C623" }}>
              {visibleTrainings.length}
            </span>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 500, color: "#222", fontSize: 20, ml: 1 }}
            >
              Trainings Available
            </Typography>
          </Box>
        </Box>
        <Box>
          {userRole === "company" && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                fontFamily: "Geist",
                background: "black",
                color: "#fff",
                boxShadow: "none",
                "&:hover": {
                  background: "black",
                },
              }}
              onClick={() => navigate("/post-training")}
            >
              Post a Training
            </Button>
          )}
        </Box>
      </Box>

      {/* Content Section */}
      {loading ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 2,
          }}
        >
          {Array.from(new Array(6)).map((i, index) => (
            <Skeleton
              key={`skeleton-${index}`}
              variant="rectangular"
              height={320}
              sx={{ borderRadius: 2, bgcolor: "#DDDDDD" }}
            />
          ))}
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 3, justifyContent: "center" }}>
          {error}
        </Alert>
      ) : trainings.length === 0 ? (
        <Typography
          variant="body1"
          color="#666666"
          align="center"
          sx={{ mt: 3 }}
        >
          No trainings found at the moment. Please check back later!
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 2,
          }}
        >
          {paginatedTrainings.map((training, idx) => (
            <Card
              key={idx}
              sx={{
                borderRadius: "16px",
                border: "2px solid #ECECEC",
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
                background: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Box
                sx={{
                  background: "#F8F8F8",
                  p: 2,
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Box sx={{ mr: 1 }}>
                    <img
                      src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU1fHxjb21wdXRlcnxlbnwwfHwwfHx8MA%3D%3D"
                      alt="Company Logo"
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        fontFamily: "Geist",
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#334155",
                        fontFamily: "DM Sans, Poppins, Arial",
                        fontSize: "15px",
                        fontWeight: 500,
                        textTransform: "capitalize",
                        letterSpacing: 0.1,
                      }}
                    >
                      {training.companyName || "Company"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "14px",
                        color: "#888",
                        fontWeight: 100,
                      }}
                    >
                      {training.location || "Online"}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.2,
                    fontSize: "19px",
                    fontFamily: "Geist",
                    textTransform: "capitalize",
                    lineHeight: 1.2,
                    letterSpacing: 0.1,
                  }}
                >
                  {training.trainingTitle}
                </Typography>
                <Stack direction="row" spacing={0.8} flexWrap="wrap">
                  {training.topicsCovered &&
                    training.topicsCovered
                      .slice(0, 3)
                      .map((topic, topicIdx) => (
                        <Chip
                          key={topicIdx}
                          label={topic}
                          size="small"
                          sx={{
                            px: 1,
                            py: 0.5,
                            bgcolor: "#F5F5F5",
                            borderRadius: "20px",
                            fontSize: 13,
                            fontWeight: 500,
                            color: "black",
                            border: `1px solid black`,
                            letterSpacing: 0.2,
                            alignContent: "center",
                            textAlign: "start",
                            fontFamily: "Geist",
                          }}
                        />
                      ))}
                </Stack>
              </Box>
              <Box
                sx={{
                  p: 2,
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <Button
                  size="medium"
                  variant="contained"
                  onClick={() => navigate(`/training/${training._id}`)}
                  sx={{
                    background: "#000000",
                    color: "#FFFFFF",
                    width: "100%",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 2,
                    fontSize: "0.9rem",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    "&:hover": {
                      bgcolor: "#333333",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  View Details
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      )}

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "black",
              borderColor: "#E0E7FF",
              "&.Mui-selected": {
                backgroundColor: "gray",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#DFDFDF",
                },
              },
            },
          }}
        />
      </Box>
    </Container>
  );
}

export default Trainings;
