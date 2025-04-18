import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import Ellipse from "../assets/Ellipse.png";
import Vector from "../assets/Vector.png";
import "../App.css";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  color: "white",
  flexDirection: "column",
  gap: "20px",
  position: "relative",
  padding: "0 20px",
};

const ImageStyleTopLeft = {
  position: "absolute",
  top: "0px",
  left: "0px",
  width: "35%",
  maxWidth: "350px",
};

const ImageStyleBottomRight = {
  position: "absolute",
  bottom: "0px",
  right: "0px",
  width: "35%",
  maxWidth: "350px",
};

const TextFieldStyle = {
  width: "100%",
  maxWidth: "400px",
  height: "50px",
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

const Authentication = () => {
  return (
    <Box
      sx={{ backgroundColor: "black", height: "100vh", position: "relative" }}
    >
      <img src={Ellipse} alt="Ellipse" style={ImageStyleTopLeft} />
      <img src={Vector} alt="Vector" style={ImageStyleBottomRight} />
      
      <Box sx={style}></Box>
    </Box>
  );
};

export default Authentication;
