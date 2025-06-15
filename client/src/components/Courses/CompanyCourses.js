import React, { useEffect, useState } from "react";
import { getCompanyCourses } from "../../API/courseAPI";
import enhancedBlackAndWhiteTheme from "../../assets/enhancedBlackAndWhiteTheme";
import {
  Button,
  Card,
  Typography,
  Box,
  Container,
  CircularProgress,
  Grid,
  Divider,
  Chip,
  CardContent,
  CardActions,
  Paper,
  Stack,
  ThemeProvider,
  createTheme,
  LinearProgress,
  Avatar,
  IconButton,
  Tooltip,
  Badge,
  Skeleton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
const CompanyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await getCompanyCourses(userId);
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <CircularProgress size={80} sx={{ mb: 2, color: "black" }} />
        <Typography variant="h5">Loading Courses...</Typography>{" "}
      </Box>
    );
  }

  return (
    <ThemeProvider theme={enhancedBlackAndWhiteTheme}>
      <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="md">
          {/* Dashboard Header */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderBottom: "4px solid #000",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "150px",
                height: "150px",
                bgcolor: "#f5f5f5",
                transform: "rotate(45deg) translate(50%, -50%)",
                zIndex: 0,
              }}
            />

            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 1,
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: "40px",
                    height: "4px",
                    backgroundColor: "#000",
                  },
                }}
              >
                Company Dashboard
              </Typography>

              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mb: 3, maxWidth: "80%" }}
              >
                Manage your Course postings and track applicant progress
              </Typography>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mt: 2 }}>
                {/* Total Courses */}
                <Box
                  sx={{
                    width: "fit-content",
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    border: "1px solid #e0e0e0",
                    bgcolor: "#fff",
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
                      borderColor: "#000",
                    },
                  }}
                >
                  <Avatar
                    sx={{ bgcolor: "#000", mr: 2, width: 40, height: 40 }}
                  >
                    <MenuBookIcon sx={{ fontSize: 24 }} />
                  </Avatar>

                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {courses.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Courses
                    </Typography>
                  </Box>
                </Box>
                {/* Total People */}
                <Box
                  sx={{
                    width: "fit-content",
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    border: "1px solid #e0e0e0",
                    bgcolor: "#fff",
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
                      borderColor: "#000",
                    },
                  }}
                >
                  <Avatar
                    sx={{ bgcolor: "#000", mr: 2, width: 40, height: 40 }}
                  >
                    <PeopleIcon sx={{ fontSize: 24 }} />
                  </Avatar>

                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {courses.reduce(
                        (total, course) => total + course.students.length,
                        0
                      )}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Total Applicants
                    </Typography>
                  </Box>
                </Box>
                {/*Active Courses */}
                <Box
                  sx={{
                    width: "fit-content",
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    border: "1px solid #e0e0e0",
                    bgcolor: "#fff",
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
                      borderColor: "#000",
                    },
                  }}
                >
                  <Avatar
                    sx={{ bgcolor: "#000", mr: 2, width: 40, height: 40 }}
                  >
                    <DashboardIcon sx={{ fontSize: 24 }} />
                  </Avatar>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {courses.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Courses
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
          {/* Job Management Section */}
          <Paper
            elevation={0}
            sx={{ p: 3, mb: 4, border: "1px solid #e0e0e0" }}
          >
            {/* Header Section of thr management section */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="h5" component="h2" fontWeight="bold">
                  Course Listings
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {loading ? (
                    <Skeleton width={150} />
                  ) : (
                    `${courses.length} 
                    Course${courses.length !== 1 ? "s" : ""} posted`
                  )}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                {/* <Button
                            variant="outlined"
                            startIcon={<SearchIcon />}
                            size="small"
                          >
                            Search
                          </Button>
                          <Button
                            variant="outlined"
                            startIcon={<FilterListIcon />}
                            size="small"
                          >
                            Filter
                          </Button>
                           */}
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/post-course")}
                >
                  Add New Course
                </Button>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Course Cards Section */}
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : courses.length == 0 ? (
              <Box
                sx={{
                  py: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: "#fafafa",
                  border: "1px dashed #e0e0e0",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    bgcolor: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <MenuBookIcon sx={{ fontSize: 40, color: "#9e9e9e" }} />
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  No Course posted yet
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3, textAlign: "center", maxWidth: "400px" }}
                >
                  Create your first Course posting to start receiving
                  applications from qualified candidates
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/post-course")}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                  }}
                >
                  Post Your First Course
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 3,
                }}
              >
                {courses.map((course) => (
                  <Box
                    key={course._id}
                    sx={{
                      minWidth: "280px",
                      display: "flex",
                    }}
                  >
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      {/* Card Header Section (Course Title , Location , number of students) */}
                      <CardContent>
                        <Typography
                          variant="h6"
                          component="h2"
                          fontWeight="bold"
                          gutterBottom
                        >
                          {course.courseTitle}
                        </Typography>

                        <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
                          {/* Location */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <LocationOnIcon
                              fontSize="small"
                              sx={{ mr: 0.5, color: "#000" }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {courses.location || "Online"}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", mt: 2 }}>
                            <PeopleIcon
                              fontSize="small"
                              sx={{ mr: 0.5, color: "#000" }}
                            />
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              component="span"
                            >
                              <Badge
                                badgeContent={course.studentsEnrolled}
                                color="primary"
                                sx={{
                                  "& .MuiBadge-badge": {
                                    right: -3,
                                    top: 8,
                                    border: "2px solid white",
                                    padding: "0 4px",
                                  },
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  component="span"
                                  sx={{ mr: 2 }}
                                >
                                  Applicants
                                </Typography>
                              </Badge>
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>

                      <Divider sx={{ mx: 2 }} />
                      {/* Card Actions Section (Edit, View Applicants) */}
                      <CardActions
                        sx={{
                          px: 2,
                          py: 1.5,
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Posted{" "}
                            {course.createdAt
                              ? new Date(course.createdAt).toLocaleDateString()
                              : "Recently"}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Tooltip title="Edit Course">
                            <Button
                              size="small"
                              startIcon={<EditIcon />}
                              onClick={() =>
                                navigate(`/EditCourses/${course._id}`)
                              }
                            >
                              Edit
                            </Button>
                          </Tooltip>
                          <Tooltip title="View applicants">
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<VisibilityIcon />}
                              onClick={() =>
                                navigate(`/courses/${course._id}/applicants`)
                              }
                            >
                              View Applicants
                            </Button>
                          </Tooltip>
                        </Box>
                      </CardActions>
                    </Card>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CompanyCourses;
