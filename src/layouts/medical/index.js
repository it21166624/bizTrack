import { useTheme } from "@material-ui/core/styles";
import { AppBar, Box, Tab, Tabs, Typography } from "@mui/material";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import {
  GetMedicalIndoorUsageDetails,
  GetMedicalOutdoorUsageDetails,
  GetUserMedicalDetails,
} from "../../action/Medical";
import IndoorAllocations from "./indoorAllocations";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Leave = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [year, setYear] = React.useState(
    dayjs().day(dayjs().day()).format("YYYY")
  );

  const maxYear = new Date().getFullYear();
  const disabledDate = (current) => {
    return current && current.year() > maxYear;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleChangeYear = (date) => {
    if (date !== "") {
      const selectedYear = date ? date.year() : null;
      setYear(selectedYear);
    } else {
      console.log(date.year());
    }
  };

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#004AAD");
    }
    dispatch(GetUserMedicalDetails(year));
    dispatch(GetMedicalIndoorUsageDetails(year));
    dispatch(GetMedicalOutdoorUsageDetails(year));
  }, [year]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        id={"header"}
        sx={{
          position: "sticky",
          top: 0,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1, mb: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: 1,
            }}
          >
            <Box
              sx={{
                width: "100%",
                backgroundColor: "#F2F2F2",
              }}
            >
              <AppBar
                position="static"
                sx={{
                  paddingLeft: 1,
                  paddingRight: 1,
                  borderRadius: 3,
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="INDOOR ALLOCATIONS" {...a11yProps(0)} />
                  <Tab label="OUTDOOR ALLOCATIONS" {...a11yProps(1)} />
                  {/* <Tab label="Not Entered Leave" {...a11yProps(2)} />
                  <Tab label="Leave Summery" {...a11yProps(3)} /> */}
                </Tabs>
              </AppBar>
              <div>
                <Box
                  sx={{
                    overflow: "auto",
                    display: "flex",
                    alignItems: "center",
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    marginTop: 1,
                  }}
                >
                  {/* <DatePicker
                    defaultValue={moment(new Date(), "DD MMM, YYYY")}
                    defaultPickerValue={moment(new Date(), "DD MMM, YYYY")}
                    format={"DD MMM, YYYY"}
                    // onChange={this.handleDateChange}
                    allowClear={false}
                    suffixIcon
                    style={{
                      height: "auto",
                      width: "auto",
                      border: "none",
                      borderRadius: "0px",
                      cursor: "pointer",
                      fontSize: "17px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  /> */}
                  <DatePicker
                    defaultValue={dayjs(dayjs(), "YYYY")}
                    disabledDate={disabledDate}
                    picker="year"
                    size={"large"}
                    inputReadOnly={true}
                    allowClear={false}
                    style={{
                      backgroundColor: "#EB984E",
                      borderTopRightRadius: 20,
                      borderBottomRightRadius: 20,
                      width: "25%",

                      border: "none",
                      //cursor: "pointer",
                      fontSize: "20px",
                    }}
                    onChange={handleChangeYear}
                  />
                </Box>
              </div>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <div>
                    <IndoorAllocations allocationName={"Indoor"} />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <div>
                    <IndoorAllocations allocationName={"Outdoor"} />
                  </div>
                </TabPanel>
              </SwipeableViews>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Leave;
