import React, { useEffect } from "react";
import { Box, Typography, AppBar, Tabs, Tab } from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import LeaveBalance from "./LeaveBalance";
import Punctuality from "./Punctuality";
import NotEnteredLeave from "./NotEnteredLeave";
import LeaveSummery from "./LeaveSummery";
import { DatePicker } from "antd";
import {
  GetLeaveBalance,
  GetLeaveSummary,
  GetNotEnteredLeave,
  GetPunctuality,
} from "../../action/Leave";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
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
      // console.log(date.year());
    }
  };

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#004AAD");
    }
    dispatch(GetLeaveBalance(year));
    dispatch(GetNotEnteredLeave(year));
    dispatch(GetPunctuality(year));
    dispatch(GetLeaveSummary(year));
  }, [dispatch, year]);

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
                bgcolor: "background.paper",
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
                  <Tab label="Leave Balance" {...a11yProps(0)} />
                  <Tab label="Punctuality" {...a11yProps(1)} />
                  <Tab label="Not Entered Leave" {...a11yProps(2)} />
                  <Tab label="Leave Summery" {...a11yProps(3)} />
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
                    <LeaveBalance />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <div>
                    <Punctuality />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <div>
                    <NotEnteredLeave selectedYear={year} />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                  <div>
                    <LeaveSummery />
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
