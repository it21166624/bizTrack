import React, { useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Loader from "../../components/Utility/Loader";
import NotFound from "../../components/Utility/NotFound";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme, isHighlighted }) => ({
  backgroundColor: isHighlighted ? "lightblue" : theme.palette.action.hover,
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function LeaveSummery({ selectedYear }) {
  const { responseBody, loading, msg } = useSelector(
    (state) => state.notEnteredLeave
  );

  const groupedData = responseBody.reduce((acc, record) => {
    const date = new Date(record.Date);
    const year = date.getFullYear();
    const month = date.getMonth();
    if (year === selectedYear) {
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(record);
    }
    return acc;
  }, {});

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const suffix = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute} ${suffix}`;
  };

  const mappedItems = useMemo(() => {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          // backgroundColor:'red'
          //marginBottom:20,
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {Object.entries(groupedData).map(([month, records]) => (
                <React.Fragment key={month}>
                  <StyledTableRow isHighlighted={true}>
                    <StyledTableCell colSpan={3}>
                      <Typography
                        // variant="h6"
                        align="center"
                        sx={{ fontWeight: "bold" }}
                      >
                        {new Date(selectedYear, month).toLocaleString(
                          "default",
                          {
                            month: "long",
                          }
                        )}
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                  {records.map((record, index) => (
                    <TableRow key={index}>
                      <StyledTableCell>
                        <Typography variant="body1" align="center">
                          {/* {new Date(record.date).toLocaleDateString()} */}
                          {record.Date}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        {record.ClockIn === "" ? (
                          <Typography variant="body1" align="center">
                            Not set
                          </Typography>
                        ) : (
                          <Typography variant="body1" align="center">
                            In: {formatTime(record.ClockIn)}
                          </Typography>
                        )}
                      </StyledTableCell>
                      <StyledTableCell>
                        {record.ClockOut === "" ? (
                          <Typography variant="body1" align="center">
                            Not set
                          </Typography>
                        ) : (
                          <Typography variant="body1" align="center">
                            Out: {formatTime(record.ClockOut)}
                          </Typography>
                        )}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }, [groupedData, selectedYear]);

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            overflow: "auto",
          }}
        >
          <Grid container rowSpacing={0.1}>
            {responseBody.length > 0 ? mappedItems : <NotFound text={msg} />}
          </Grid>
        </Box>
      )}
    </>
  );
}
