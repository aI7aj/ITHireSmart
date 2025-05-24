"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../API/API";
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Paper,
} from "@mui/material";
import {
  Email,
  Phone,
  CalendarToday,
  LocationOn,
  Work,
  School,
  Code,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import React from "react";

const UserProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [phtoUrl, setPhotoUrl] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getProfile(userId);
        const profile = response.data;
        setPhotoUrl(response.data.url);
        setUser({
          ...profile.user,
          location: profile.location,
          experience: profile.experience,
          education: profile.education,
          skills: profile.skills,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

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

  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Typography variant="h6">User not found</Typography>
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        borderRadius: 5,
        p: { xs: 2, sm: 4 },
        backgroundColor: "#f7fafd",
        border: "1.5px solid #e3f2fd",
        boxShadow: 4,
        width: "100%",
        maxWidth: 800,
        margin: "0 auto",
      }}
      elevation={0}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          margin: "0 auto",
          p: { xs: 2, sm: 3 },
        }}
      >
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
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            mb: 4,
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Box
              sx={{
                width: { xs: 100, sm: 120 },
                height: { xs: 100, sm: 120 },
                borderRadius: "50%",
                bgcolor: "#e3f2fd",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: { xs: 0, sm: 2 },
                mb: { xs: 2, sm: 0 },
                overflow: "hidden",
                border: "2px solid #1976d2",
              }}
            >
              {user.profilepic && user.profilepic.url ? (
                <img
                  src={user.profilepic.url}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <Typography variant="h6" color="#1976d2">
                  No profile picture
                </Typography>
              )}
            </Box>

            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: "1.8rem", sm: "2.125rem" },
                }}
              >
                {user.firstName} {user.lastName}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Personal Information */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              Personal Information
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Email sx={{ color: "#757575", mr: 1.5, fontSize: 20 }} />
              <Typography>{user.email}</Typography>
            </Box>

            {user.mobileNumber && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Phone sx={{ color: "#757575", mr: 1.5, fontSize: 20 }} />
                <Typography>{user.mobileNumber}</Typography>
              </Box>
            )}

            {user.dateOfBirth && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CalendarToday
                  sx={{ color: "#757575", mr: 1.5, fontSize: 20 }}
                />
                <Typography>
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </Typography>
              </Box>
            )}

            {user.location && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOn sx={{ color: "#757575", mr: 1.5, fontSize: 20 }} />
                <Typography>{user.location}</Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Experience */}
        {user.experience && user.experience.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Work sx={{ color: "#757575", mr: 1.5 }} />
              <Typography variant="h6" sx={{ fontWeight: "500" }}>
                Experience
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {user.experience.map((exp) => (
                <Box key={exp._id}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "500" }}>
                    {exp.title} at {exp.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(exp.from).toLocaleDateString()} -{" "}
                    {exp.current
                      ? "Present"
                      : new Date(exp.to).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Education */}
        {user.education && user.education.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <School sx={{ color: "#757575", mr: 1.5 }} />
              <Typography variant="h6" sx={{ fontWeight: "500" }}>
                Education
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {user.education.map((edu) => (
                <Box key={edu._id}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "500" }}>
                    {edu.degree} in {edu.fieldofstudy}
                  </Typography>
                  <Typography variant="body2">{edu.school}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(edu.from).toLocaleDateString()} -{" "}
                    {edu.current
                      ? "Present"
                      : new Date(edu.to).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Skills */}
        {user.skills && user.skills.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Code sx={{ color: "#757575", mr: 1.5 }} />
              <Typography variant="h6" sx={{ fontWeight: "500" }}>
                Skills
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {user.skills.map((skill, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: "#f5f5f5",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2">{skill}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default UserProfilePage;
