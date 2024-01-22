import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HouseIcon from "@mui/icons-material/House";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SmsIcon from "@mui/icons-material/Sms";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";

export default function Footer() {
  const [value, setValue] = React.useState("recents");
  const dispatch = useDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (newValue === "QR") {
      dispatch({
        type: "IS_OPEN",
        payload: { isOpen: true, isOpenDetailScreen: false },
      });
    } else {
      dispatch({ type: "IS_CLOSE" });
    }
    console.log(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "5px",
      }}
    >
      <BottomNavigation
        sx={{
          width: "100%",
          borderRadius: 3,
          backgroundImage: "linear-gradient(to bottom, #5B52B3, #004AAD)",
          "& .MuiBottomNavigationAction-root.Mui-selected": {
            color: "white",
          },
          "& .MuiBottomNavigationAction-root": {
            color: "white",
          },
          // boxShadow: 3,
        }}
        // value={value}
        onChange={handleChange}
        showLabels={false}
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          label="Home"
          value="Home"
          icon={<HouseIcon fontSize="large" />}
        />
        <BottomNavigationAction
          component={Link}
          to="/budgetshop"
          label="Profile"
          value="Profile"
          icon={<PersonIcon fontSize="large" />}
        />
        <BottomNavigationAction
          label="QR"
          value="QR"
          icon={<QrCodeScannerIcon fontSize="large" />}
        />
        <BottomNavigationAction
          component={Link}
          to="/"
          label="Notification"
          value="Notification"
          icon={<SmsIcon fontSize="large" />}
        />
      </BottomNavigation>
    </Box>
  );
}
