import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

// === Styled Components ===
const StyledAppBar = styled(AppBar)({
  background: "black",
  boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
  backdropFilter: "blur(10px)",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
});

const NavButton = styled(Button)({
  color: "white",
  margin: "0 8px",
  fontWeight: 500,
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 0,
    height: "2px",
    bottom: "6px",
    left: "50%",
    background: "white",
    transition: "all 0.3s ease",
    transform: "translateX(-50%)",
  },
  "&:hover": {
    backgroundColor: "transparent",
    "&:after": { width: "60%" },
  },
});

const Logo = styled(Typography)({
  fontWeight: 700,
  letterSpacing: "-0.5px",
  background: "linear-gradient(90deg, #fff 0%, #e0e7ff 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textDecoration: "none",
});

const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    backgroundColor: "#4338ca",
    color: "white",
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    border: "1px solid rgba(255,255,255,0.05)",
    marginTop: 8,
  },
});

const StyledMenuItem = styled(MenuItem)({
  padding: "10px 20px",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  transition: "0.2s ease",
  "&:hover": { backgroundColor: alpha("#fff", 0.05) },
});

const UserAvatar = styled(Avatar)({
  border: "2px solid rgba(255,255,255,0.2)",
  transition: "all 0.3s ease",
  "&:hover": { borderColor: "rgba(255,255,255,0.5)" },
});

// === Component ===
const Navbar = () => {
  const [navAnchor, setNavAnchor] = useState(null);
  const [userAnchor, setUserAnchor] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navItems = [
    { name: "Find Job", path: "/FindJob" },
    { name: "Courses", path: "/Courses" },
    { name: "Hiring", path: "/Hiring" },
    { name: "FAQ", path: "/faq" },
  ];

  const userItems = [
    { name: "Profile", icon: <AccountCircleIcon fontSize="small" /> },
    { name: "Settings", icon: <SettingsIcon fontSize="small" /> },
    { name: "Logout", icon: <LogoutIcon fontSize="small" /> },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderLinks = () =>
    navItems.map((item, i) => (
      <motion.div
        key={item.name}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
      >
        <Link to={item.path} style={{ textDecoration: "none" }}>
          <NavButton>{item.name}</NavButton>
        </Link>
      </motion.div>
    ));

  return (
    <StyledAppBar
      position="sticky"
      sx={{ py: scrolled ? 0.5 : 1, transition: "0.3s ease" }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/FindJob" style={{ textDecoration: "none" }}>
              <Logo variant="h5" component="span">
                ITHireSmart
              </Logo>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1 }}>{renderLinks()}</Box>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <>
              <IconButton
                onClick={(e) => setNavAnchor(e.currentTarget)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <StyledMenu
                anchorEl={navAnchor}
                open={Boolean(navAnchor)}
                onClose={() => setNavAnchor(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={() => setNavAnchor(null)}
                  >
                    <StyledMenuItem>
                      {item.name}
                    </StyledMenuItem>
                  </Link>
                ))}
              </StyledMenu>
            </>
          )}

          {/* User Avatar & Menu */}
          <Box>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={(e) => setUserAnchor(e.currentTarget)}
                  sx={{ p: 0.5 }}
                >
                  <UserAvatar alt="User" src="" />
                </IconButton>
              </Tooltip>
            </motion.div>
            <StyledMenu
              anchorEl={userAnchor}
              open={Boolean(userAnchor)}
              onClose={() => setUserAnchor(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {userItems.map((item) => (
                <StyledMenuItem
                  key={item.name}
                  onClick={() => setUserAnchor(null)}
                >
                  {item.icon} {item.name}
                </StyledMenuItem>
              ))}
            </StyledMenu>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
