import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Loader from "../Utility/Loader";
import NotFound from "../Utility/NotFound";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor !== "" ? bgcolor : theme.palette.action.hover,

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BasicTable() {
  const { responseBody, loading, msg } = useSelector(
    (state) => state.attendanceCard
  );

  const mappedItems = useMemo(() => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Day</StyledTableCell>
              <StyledTableCell align="center"> IN</StyledTableCell>
              <StyledTableCell align="center"> OUT</StyledTableCell>
              <StyledTableCell align="center">Cnt</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responseBody.map((row, index) => (
              <StyledTableRow
                key={index}
                bgcolor={row.BackgroundColor}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    padding: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                      backgroundColor: "#B5E8FF",
                      padding: 1,
                      borderRadius: 8,
                    }}
                  >
                    <Typography fontSize={16} fontWeight={600}>
                      {new Date(row.Date).getDate()}
                    </Typography>
                    <Typography fontSize={8} fontWeight={600}>
                      {row.Day.toString().substring(0, 3)}
                    </Typography>
                  </div>
                </TableCell>

                {row.LeaveType !== "" ? (
                  <StyledTableCell align="center">{row.LeaveReason}</StyledTableCell>
                ) : (
                  <>
                    <TableCell align="center">{row.InTime}</TableCell>
                    <TableCell align="center">{row.OutTime}</TableCell>
                  </>
                )}

                <TableCell align="center">
                  {row.ContinuedStatus === "Y" ? <TaskAltIcon /> : <></>}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }, [responseBody]);

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
