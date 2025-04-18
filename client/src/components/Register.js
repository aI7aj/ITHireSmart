import React from "react";
import { Box, TextField, Typography, Button, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Ellipse from "../assets/Ellipse.png";
import Vector from "../assets/Vector.png";
import "../App.css";
import { Link } from "react-router-dom";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "20px",
  padding: "40px 20px",
  position: "relative",
  color: "white",
};

const ImageStyleTopLeft = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "30%",
  maxWidth: "300px",
};

const ImageStyleBottomRight = {
  position: "fixed",
  bottom: "0",
  right: "0",
  width: "30%",
  maxWidth: "300px",
};

const TextFieldStyle = {
  width: "100%",
  borderRadius: "15px",
  backgroundColor: "transparent",
  color: "#fff",
  "& label, & label.Mui-focused, & .MuiInputBase-input": { color: "#fff" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#fff" },
    "&:hover fieldset": { borderColor: "#fff" },
    "&.Mui-focused fieldset": { borderColor: "#fff" },
  },
  fontFamily: "Poppins",
};

const ButtonStyle = {
  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
  bgcolor: "white",
  color: "black",
  "&:hover": { bgcolor: "#f0f0f0" },
  width: "100%",
  maxWidth: "450px",
  borderRadius: "10px",
  marginTop: "3%",
  fontFamily: "Poppins",
};

const Landing = () => {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Box sx={style}>
        <Typography
          variant="h2"
          sx={{ fontFamily: "Poppins", textAlign: "center" }}
        >
          Register
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontFamily: "Poppins", textAlign: "center" }}
        >
          Please enter your information
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* First column */}

          <Grid item xs={12} sm={6}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  label="First name"
                  variant="outlined"
                  sx={TextFieldStyle}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Email"
                  variant="outlined"
                  sx={TextFieldStyle}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  sx={TextFieldStyle}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  sx={TextFieldStyle}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Second column */}
          <Grid item xs={12} sm={6}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  label="Last name"
                  variant="outlined"
                  sx={TextFieldStyle}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Location"
                  variant="outlined"
                  sx={TextFieldStyle}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Mobile Number"
                  type="number"
                  variant="outlined"
                  sx={TextFieldStyle}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  sx={TextFieldStyle}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Link to="/Authentication">
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={ButtonStyle}
            endIcon={<ArrowForwardIcon />}
          >
            Next
          </Button>
        </Link>
      </Box>

      <img src={Ellipse} alt="Ellipse" style={ImageStyleTopLeft} />
      <img src={Vector} alt="Vector" style={ImageStyleBottomRight} />
    </Box>
  );
};

export default Landing;
