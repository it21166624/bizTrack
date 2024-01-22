import React, { useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
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
    fontSize: 14,
  },
  // padding: 4,
}));

const StyledTableRow = styled(TableRow)(({ theme, bgColor }) => ({
  backgroundColor: bgColor !== "" ? bgColor : theme.palette.action.hover,

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Punctuality() {
  const { responseBody, loading, msg } = useSelector(
    (state) => state.punctuality
  );

  const mappedItems = useMemo(() => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          marginBottom: "10%",
          //backgroundColor: "red",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Month</StyledTableCell>
                <StyledTableCell align="center"> Type</StyledTableCell>
                <StyledTableCell align="center"> Description</StyledTableCell>
                <StyledTableCell align="center">Cnt</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {responseBody.map((row, index) => (
                <StyledTableRow
                  key={index}
                  //isWeekEnd={row.day.toString().substring(0, 3)}
                  bgColor={row.background_color}
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
                      <Typography fontSize={12} fontWeight={400} p={1}>
                        {months[new Date(row.Month).getMonth()]}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <Typography fontSize={14} fontWeight={400} p={1}>
                      {row.RuleType}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <Typography fontSize={10} fontWeight={400} p={1}>
                      {row.RuleDescription}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontSize={14} fontWeight={400} p={1}>
                      {row.Cnt}
                    </Typography>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
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
