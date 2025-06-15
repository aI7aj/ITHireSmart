import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEnrolledCourses, acceptStudent } from "../../API/courseAPI";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  CircularProgress,
  Container,
  CardHeader,
  Button,
} from "@mui/material";
import { Mail } from "@mui/icons-material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const CoursesApplicants = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptedIds, setAcceptedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await getEnrolledCourses(courseId);
        const course = res.data;
        console.log("Fetched course:", course);
        setStudents(course);
      } catch (error) {
        console.error("Failed to load course students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [courseId]);

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
        Enrolled Students
        <Chip
          label={`${students.length} total`}
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

      {students.length === 0 ? (
        <Card
          sx={{
            p: 4,
            textAlign: "center",
            bgcolor: "#f5f5f5",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No students enrolled in this course yet.
          </Typography>
        </Card>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {students.map((student) => {
            const name = student?.firstName || "Unknown Student";
            const email = student?.email || "No email provided";

            return (
              <Box key={student._id}>
                <Card
                  sx={{
                    minWidth: 300,
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
                        src={student?.profilepic?.url}
                        sx={{
                          width: 56,
                          height: 56,
                          bgcolor: "#e3f2fd",
                          color: "#1976d2",
                        }}
                      >
                        {!student?.profilepic?.url && name[0]}
                      </Avatar>
                    }
                    title={
                      <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                        {name}
                      </Typography>
                    }
                    subheader="Enrolled"
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
                        onClick={() => navigate(`/user/${student._id}`)}
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

export default CoursesApplicants;
