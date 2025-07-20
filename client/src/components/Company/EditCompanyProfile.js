import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Fade,
  MenuItem,
} from "@mui/material";
import { getCompanyProfile, updateCompanyProfile } from "../../API/company";

function EditCompanyProfile() {
  const companyId = localStorage.getItem("companyId");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    companyField: "",
    location: "",
    companyEmail: "",
    companyNumbers: "",
    companyWebsite: "",
    contactName: "",
    contactPosition: "",
    contactPhoneNumber: "",
    companyDescription: "",
    status: "",
  });

  useEffect(() => {
    if (!companyId) {
      setError("No company ID found.");
      setLoading(false);
      return;
    }
    getCompanyProfile(companyId)
      .then((res) => {
        setFormData({
          companyName: res.data.companyName || "",
          companyField: res.data.companyField || "",
          location: res.data.location || "",
          companyEmail: res.data.companyEmail || "",
          companyNumbers: res.data.companyNumbers || "",
          companyWebsite: res.data.companyWebsite || "",
          contactName: res.data.contactName || "",
          contactPosition: res.data.contactPosition || "",
          contactPhoneNumber: res.data.contactPhoneNumber || "",
          companyDescription: res.data.companyDescription || "",
          status: res.data.status || "",
        });
        if (res.data.profilepic) {
          setImagePreview(res.data.profilepic);
        }
        localStorage.setItem("companyName", res.data.companyName || "");
      })
      .catch(() => setError("Failed to load company data."))
      .finally(() => setLoading(false));
  }, [companyId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (imageFile) {
      data.append("profilepic", imageFile);
    }

    try {
      await updateCompanyProfile(companyId, data);
      setSuccess("Company profile updated successfully!");
      localStorage.setItem("companyName", formData.companyName || "");
    } catch {
      setError("Failed to update company profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <Container maxWidth="sm" sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Fade in timeout={600}>
        <Card sx={{ borderRadius: 3, boxShadow: 6, p: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Edit Company Profile
            </Typography>
            <Divider sx={{ mb: 3 }} />
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              encType="multipart/form-data"
            >
              <Grid container spacing={3}>
                {/* Left: Image */}
                <Grid item xs={12} md={4} textAlign="center">
                  <Avatar
                    src={imagePreview}
                    alt="Company Logo"
                    sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
                  />
                  <Button variant="outlined" component="label">
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                </Grid>

                {/* Right: Form */}
                <Grid item xs={12} md={8}>
                  <Grid container spacing={2}>
                    {[
                      {
                        label: "Company Name",
                        name: "companyName",
                        required: true,
                      },
                      { label: "Company Field", name: "companyField" },
                      { label: "Location", name: "location" },
                      { label: "Email", name: "companyEmail", type: "email" },
                      { label: "Phone Number", name: "companyNumbers" },
                      { label: "Website", name: "companyWebsite" },
                      { label: "Contact Name", name: "contactName" },
                      { label: "Contact Position", name: "contactPosition" },
                      { label: "Contact Phone", name: "contactPhoneNumber" },
                    ].map((field) => (
                      <Grid item xs={12} sm={6} key={field.name}>
                        <TextField
                          label={field.label}
                          name={field.name}
                          type={field.type || "text"}
                          value={formData[field.name]}
                          onChange={handleChange}
                          fullWidth
                          required={field.required || false}
                        />
                      </Grid>
                    ))}

                    <Grid item xs={12}>
                      <TextField
                        label="Company Description"
                        name="companyDescription"
                        value={formData.companyDescription}
                        onChange={handleChange}
                        multiline
                        minRows={3}
                        maxRows={10}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Box mt={4} textAlign="right">
                <Button type="submit" variant="contained" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Container>
  );
}

export default EditCompanyProfile;
