import React from "react";
import { Box, Chip } from "@mui/material";
import { useDispatch } from "react-redux";
import AttendanceCard from "../../components/Cards/AttendanceCard";
import dayjs from "dayjs";
import { makeStyles } from "@material-ui/core/styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAttendanceCard } from "../../action/Attendance";

const useStyles = makeStyles((theme) => ({
  chip: {
    height: 32,
    margin: theme.spacing(0.5),
  },
  datePickerContainer: {
    width: "100px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
}));

const Attendance = () => {
  const [year, setYear] = React.useState("");
  const [month, setMonth] = React.useState("");
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChangeMonth = (id) => {
    setMonth(id);
    if (year !== "") {
      const selectedYear = year ? year.year() : null;
      dispatch(GetAttendanceCard(selectedYear + "-" + id));
    } else {
      toast.error("Please select year first.");
    }
  };

  const handleDateChange = (date) => {
    setYear(date);
    if (date !== "") {
      const selectedYear = date ? date.year() : null;
      dispatch(GetAttendanceCard(selectedYear + "-" + month));
    } else {
      //toast.error("Please select m first.");
    }
  };

  function CustomDatePickerContainer() {
    const classes = useStyles();
    const yesterday = dayjs().subtract(1, "day");
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <Box className={classes.datePickerContainer}>
            <MobileDatePicker
              defaultValue={year}
              maxDate={yesterday}
              label="Pick Year"
              views={["year"]}
              style={{ textAlign: "center" }}
              value={year}
              onChange={handleDateChange}
              sx={{ borderRadius: 10 }}
            />
          </Box>
        </DemoContainer>
      </LocalizationProvider>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        flex={1}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          mt: 1,
          mb: 1,
          mr: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#EB984E",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "8px",
            width: 70,
            height: "32px",
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            marginLeft: 1,
          }}
        >
          {CustomDatePickerContainer()}
        </Box>
        <Box
          overflow="auto"
          flex={1}
          display="flex"
          flexDirection="row"
          sx={{
            overflow: "auto",
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <Chip
            label="January"
            sx={{
              backgroundColor: month === "01" ? "#EB984E" : "#1565c0",
              color: "#fff",
            }}
            className={classes.chip}
            clickable={true}
            onClick={() => handleChangeMonth("01")}
          />
          <Chip
            label="February"
            sx={{
              backgroundColor: month === "02" ? "#EB984E" : "#1565c0",
              color: "#fff",
            }}
            className={classes.chip}
            clickable={true}
            onClick={() => handleChangeMonth("02")}
          />
          <Chip
            label="March"
            sx={{
              backgroundColor: month === "03" ? "#EB984E" : "#1565c0",
              color: "#fff",
            }}
            className={classes.chip}
            clickable={true}
            onClick={() => handleChangeMonth("03")}
          />
          <Chip
            label="April"
            sx={{
              backgroundColor: month === "04" ? "#EB984E" : "#1565c0",
              color: "#fff",
            }}
            className={classes.chip}
            clickable={true}
            onClick={() => handleChangeMonth("04")}
          />
          <Chip
            label="May"
            sx={{
              backgroundColor: month === "05" ? "#EB984E" : "#1565c0",
              color: "#fff",
            }}
            className={classes.chip}
            clickable={true}
            onClick={() => handleChangeMonth("05")}
          />
          <Chip
            label="June"
            sx={{
              backgroundColor: month === "06" ? "#EB984E" : "#1565c0",
              color: "#fff",
            }}
            className={classes.chip}
            clickable={true}
            onClick={() => handleChangeMonth("06")}
          />
          <Chip
            label="July"
            sx={{
              backgroundColor: month === "02" ? "#EB984E" : "#1565c0",
              color: "#fff",
            }}
            className={classes.chip}
            clickable={true}
            onClick={() => handleChangeMonth("07")}
          />
          <Chip
            label="Augest"
            sx={{
              backgroundColor: month === "02" ? "#EB984E" : "#1565c0",
              color: "#fff",
            }}
            className={classes.chip}
            clickable={true}
            onClick={() => handleChangeMonth("08")}
          />
          <Chip
            label="September"
            sx={{
              backgroundColor: month === "02" ? "#EB984E" : "#1565c0",
              color: "#fff",
            }}
            className={classes.chip}
            clickable={true}
            onClick={() => handleChangeMonth("09")}
          />
          <Chip
            label="Octomber"
            sx={{
              backgroundColor: month === "02" ? "#EB984E" : "#1565c0",
              color: "#fff",
            }}
            className={classes.chip}
            clickable={true}
            onClick={() => handleChangeMonth("10")}
          />
          <Chip
            label="November"
            sx={{
              backgroundColor: month === "02" ? "#EB984E" : "#1565c0",
              color: "#fff",
            }}
            className={classes.chip}
            clickable={true}
            onClick={() => handleChangeMonth("11")}
          />
          <Chip
            label="December"
            sx={{
              backgroundColor: month === "02" ? "#EB984E" : "#1565c0",
              color: "#fff",
            }}
            className={classes.chip}
            clickable={true}
            onClick={() => handleChangeMonth("12")}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          marginLeft: 1,
          marginRight: 1,
          marginBottom: "70px",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          <AttendanceCard />
        </Box>
      </Box>
    </Box>
  );
};

export default Attendance;
