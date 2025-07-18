import React, { useEffect, useState } from "react";
import {
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
} from "@mui/material";
import { getCompanyProfile, updateCompanyProfile } from "../../API/company";

function EditCompanyProfile() {
  const companyId = localStorage.getItem("companyId");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
        localStorage.setItem("companyName", res.data.companyName || "");
      })

      .catch(() => setError("Failed to load company data."))
      .finally(() => setLoading(false));
  }, [companyId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await updateCompanyProfile(companyId, formData);
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
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Fade in timeout={600}>
        <Card sx={{ borderRadius: 3, boxShadow: 6 }}>
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
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid>
                  <TextField
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="Company Field"
                    name="companyField"
                    value={formData.companyField}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="Email"
                    name="companyEmail"
                    type="email"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="Phone Number"
                    name="companyNumbers"
                    value={formData.companyNumbers}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="Website"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="Contact Person Name"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="Contact Person Position"
                    name="contactPosition"
                    value={formData.contactPosition}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="Contact Phone Number"
                    name="contactPhoneNumber"
                    value={formData.contactPhoneNumber}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="Company Description"
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Box mt={3} textAlign="right">
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
