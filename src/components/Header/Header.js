import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { logOut } from "../../action/Login";

const Header = ({ title }) => {
  const [hasImage, setHasImage] = React.useState(false);
  const authKey = JSON.parse(localStorage.getItem("token"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", "#004AAD");
      }
      const img = new Image();
      img.onload = function () {
        setHasImage(true);
      };
      img.onerror = function () {
        setHasImage(false);
      };
      img.src =
        `${axios.defaults.baseURL}home/GetUserImg?authKey=${authKey.replace('+','%2B')}`.replace(
          /"/g,
          ""
        );
    } catch (error) {}
  }, [navigate, dispatch, authKey]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logOut(navigate));
  };

  const greet = () => {
    var d = new Date();
    var time = d.getHours();

    if (time < 12) {
      return "Good Morning...";
    } else if (time >= 12 && time <= 16) {
      return "Good Afternoon...";
    } else if (time >= 17 && time <= 24) {
      return "Good Evening...";
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
        padding: 1,
        top: 0,
        zIndex: 999,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <div style={{  maxWidth: "400px" }}>
          <img
            width={"60%"}
            src={require("../../assets/icons/a.png")}
            alt="First slide"
          />
        </div>
        <Typography fontSize={12} fontWeight={550}>
          {greet()}
        </Typography>
        {/* <Typography fontSize={10} fontWeight={200}>
       hello.. W.L.H.M.A.A. BANDARA
        </Typography> */}
      </Box>
      <Box sx={{ alignItems: "center" }}>
        <IconButton onClick={handleMenu}>
          <Avatar
            //alt="Remy Sharp"
            variant="rounded"
            src={
              hasImage
                ? `${axios.defaults.baseURL}home/GetUserImg?authKey=${authKey.replace('+','%2B')}`.replace(
                    /"/g,
                    ""
                  )
                : require("../../assets/images/man.png")
            }
            sx={{
              width: 40,
              height: "20%",
              borderRadius: 2,
            }}
          />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
