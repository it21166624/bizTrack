import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Grid, Grow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HeaderComponent() {
  const { loading, headComponent } = useSelector(
    (state) => state.headComponent
  );
  let navigate = useNavigate();


  const isComponentIdAvailable = (componentId) => {
    return headComponent.some((item) => item.ComponentId === componentId);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          // flexWrap: "wrap",
          flexDirection: "column",
          width: "100%",
          overflow: "auto",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          style={{ marginLeft: 6 }}
        >
          Service
        </Typography>
        <Grid
          container
          rowSpacing={0.1}
          // padding={1}
          // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {/* {isComponentIdAvailable("EMOBCI0003") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0003")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0003")
                ? { timeout: 1000 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card sx={{ padding: 2 ,boxShadow:0,borderRadius:2}}>
                  <CardActionArea onClick={handleScan}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/scanner.png")}
                        alt="First slide"
                        style={{ opacity: "80%" }}
                      />
                      <Typography
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        Scan
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
                
              </Grid>
            </Grow>
          ) : (
            <></>
          )} */}

          {isComponentIdAvailable("EMOBCI0001") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0001")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0001")
                ? { timeout: 1600 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card sx={{ padding: 2, boxShadow: 0, borderRadius: 2 }}>
                  <CardActionArea
                    onClick={() => {
                      navigate("/Attendance");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/attendance.png")}
                        alt="First slide"
                        style={{ opacity: "70%" }}
                      />
                      <Typography
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        Attendance
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}
          {isComponentIdAvailable("") ? (
            <Grow
              in={isComponentIdAvailable("")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("") ? { timeout: 2200 } : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card sx={{ padding: 2, boxShadow: 0, borderRadius: 2 }}>
                  <CardActionArea
                    onClick={() => {
                      navigate("/Approvals");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/approval.png")}
                        alt="First slide"
                        style={{ opacity: "70%" }}
                      />
                      <Typography
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        Approvals
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}
          {isComponentIdAvailable("EMOBCI0002") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0002")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0002")
                ? { timeout: 2800 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card sx={{ padding: 2, boxShadow: 0, borderRadius: 2 }}>
                  <CardActionArea
                    onClick={() => {
                      navigate("/Leave");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/exit.png")}
                        alt="First slide"
                        style={{ opacity: "70%" }}
                      />
                      <Typography
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        Leave
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}
          {isComponentIdAvailable("EMOBCI0004") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0004")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0004")
                ? { timeout: 1900 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card sx={{ padding: 2, boxShadow: 0, borderRadius: 2 }}>
                  <CardActionArea
                    onClick={() => {
                      navigate("/Welfare");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/welfare.png")}
                        alt="First slide"
                        style={{ opacity: "70%" }}
                      />
                      <Typography
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        Welfare
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}
          {isComponentIdAvailable("EMOBCI0005") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0005")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0005")
                ? { timeout: 2500 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card sx={{ padding: 2, boxShadow: 0, borderRadius: 2 }}>
                  <CardActionArea
                    onClick={() => {
                      navigate("/budgetshop");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/store.png")}
                        alt="First slide"
                        style={{ opacity: "70%" }}
                      />
                      <Typography
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        Sahanasala
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}
          {isComponentIdAvailable("EMOBCI0007") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0007")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0007")
                ? { timeout: 2500 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card sx={{ padding: 2, boxShadow: 0, borderRadius: 2 }}>
                  <CardActionArea
                    onClick={() => {
                      navigate("/Medical");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/healthcare.png")}
                        alt="First slide"
                        style={{ opacity: "80%" }}
                      />
                      <Typography
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        Medical
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}
          {isComponentIdAvailable("EMOBCI0008") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0008")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0008")
                ? { timeout: 2500 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card sx={{ padding: 2, boxShadow: 0, borderRadius: 2 }}>
                  <CardActionArea
                    onClick={() => {
                      navigate("/tools");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/healthcare.png")}
                        alt="First slide"
                        style={{ opacity: "80%" }}
                      />
                      <Typography
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        Outstanding Tools
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}
        </Grid>
      </Box>
    </>
  );
}
