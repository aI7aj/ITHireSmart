import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";
// Remove Grid2 import

import { udemy } from '../API'; // Make sure this function is linked to the correct API

const FindCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await udemy("React");
        console.log(res); // Check the response in the console

        // If res.data is an array, use it directly
        if (res && Array.isArray(res.data)) {
          setCourses(res.data);
        } else if (res && res.data && Array.isArray(res.data.results)) {
          setCourses(res.data.results);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", marginTop: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, textAlign: "center", mb: 4 }}>
        Web Development Courses
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => (
            <Grid item key={course.id} style={{ flex: "1 1 300px", maxWidth: 400, minWidth: 260, margin: 16 }}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  boxShadow: "0 4px 24px 0 rgba(124,58,237,0.10)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.03)",
                    boxShadow: "0 8px 32px 0 rgba(124,58,237,0.18)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={course.image_480x270}
                  alt={course.title}
                  sx={{
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    objectFit: "cover",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: "#7C3AED" }}>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {course.visible_instructors && course.visible_instructors[0]?.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                    {course.headline}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
            No web development courses found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default FindCourses;
