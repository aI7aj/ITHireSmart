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
import {
  AutoFixHighOutlined as AutoFixHighOutlinedIcon,
  School as SchoolIcon,
  Bolt as BoltIcon,
} from "@mui/icons-material";
import { getCourses } from "../API";

const COURSES_PER_PAGE = 6;

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await getCourses();
        setCourses(response.data);
        setError("");
      } catch (err) {
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const totalPages = Math.ceil(courses.length / COURSES_PER_PAGE);
  const paginatedCourses = courses.slice(
    (page - 1) * COURSES_PER_PAGE,
    page * COURSES_PER_PAGE
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getCardColor = (idx) => {
    const colors = [
      "#FEF2F2",
      "#ECFDF5",
      "#F0FDF4",
      "#FCF3FA",
      "#FEFCE8",
      "#EFF6FF",
    ];
    return colors[idx % colors.length];
  };
  const getCardTextColor = (idx) => {
    const darkerColors = [
      "#e11d48",
      "#16a34a",
      "#0d9488",
      "#9333ea",
      " #d97706 ",
      "#2563eb",
    ];
    return darkerColors[idx % darkerColors.length];
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography variant="h4" fontWeight="700" color="text.primary">
            Recommended Courses
          </Typography>
          <AutoFixHighOutlinedIcon
            sx={{ color: "#6366F1", ml: 1, fontSize: 32 }}
          />
        </Box>
        <Typography variant="body1" color="text.secondary">
          Handpicked learning opportunities to boost your career and skills.
          Explore our top picks and start your journey today!
        </Typography>
      </Box>

      {/* Course Count */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#F5F3FF",
            color: "#6366F1",
            px: 1.5,
            py: 0.5,
            borderRadius: "20px",
            fontWeight: 600,
            fontSize: 18,
            border: "1px solid #E0E7FF",
            minWidth: 48,
            justifyContent: "center",
          }}
        >
          <BoltIcon sx={{ fontSize: 20, color: "#6366F1" }} />
          <span style={{ fontWeight: 600, fontSize: 14 }}>
            {courses.length}
          </span>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 500, color: "black", fontSize: 20, ml: 1 }}
        >
          Number of Courses
        </Typography>
      </Box>

      {/* Content Section */}
      {loading ? (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {Array.from(new Array(6)).map((_, index) => (
            <Box
              key={`skeleton-${index}`}
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" },
                minWidth: 260,
                maxWidth: 400,
                mb: 3,
                height: "370px",
              }}
            >
              <Skeleton
                variant="rectangular"
                height={350}
                sx={{ borderRadius: 2, height: "100%" }}
              />
            </Box>
          ))}
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : courses.length === 0 ? (
        <Typography variant="h6" color="text.secondary" align="center">
          No courses found.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
          {paginatedCourses.map((course, idx) => (
            <Box
              key={idx}
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" },
                minWidth: 260,
                maxWidth: 400,
                display: "flex",
                height: "370px",
              }}
            >
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow:
                    "0 4px 24px rgba(80, 112, 255, 0.08), 0 1.5px 6px rgba(0,0,0,0.04)",
                  background: "#fff",
                  p: 2,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 300,
                  height: "80%",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    borderRadius: "16px",
                    background: getCardColor(idx),
                    p: 2,
                    minHeight: 180,
                    boxSizing: "border-box",
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                    <Avatar
                      sx={{
                        bgcolor: "#fff",
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        boxShadow: "0 1px 4px 0 rgba(0,0,0,0.05)",
                      }}
                    >
                      <SchoolIcon sx={{ color: "#6366F1", fontSize: 32 }} />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 500,
                          color: "#334155",
                        }}
                      >
                        {course.instructorName}
                      </Typography>
                      <Typography variant="body2" color="#64748b">
                        {course.location || "Online"}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={2}
                    sx={{ mt: 1, color: getCardTextColor(idx) }}
                  >
                    {course.courseTitle}
                  </Typography>
                  <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
                    {course.topics &&
                      course.topics.map((topic, topicIdx) => (
                        <Chip
                          key={topicIdx}
                          label={topic}
                          size="small"
                          sx={{
                            bgcolor: "#fff",
                            color: getCardTextColor(idx),
                            fontWeight: 600,
                            borderRadius: "16px",
                            px: 1.5,
                            fontSize: 14,
                            border: `1px solid ${getCardTextColor(idx)}`,
                          }}
                        />
                      ))}
                  </Stack>
                </Box>
                <Box sx={{ width: "100%", px: 0.5, pt: 1, mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      mt: 1,
                      mb: 1,
                    }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundImage:
                          "linear-gradient(to right, #7c3aed, #4338ca)",
                        color: "#fff",
                        width: "100%",
                        borderRadius: "20px",
                        textTransform: "none",
                        fontWeight: 600,
                        px: 3,
                        fontSize: "15px",
                        boxShadow: "none",
                        letterSpacing: 0.2,
                        "&:hover": { bgcolor: "#4338CA" },
                      }}
                    >
                      Details
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Box>
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
              color: "#4F46E5",
              borderColor: "#E0E7FF",
              "&.Mui-selected": {
                backgroundColor: "#4F46E5",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#4338CA",
                },
              },
            },
          }}
        />
      </Box>
    </Container>
  );
}
export default Courses;
