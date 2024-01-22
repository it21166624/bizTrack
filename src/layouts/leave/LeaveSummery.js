import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import LeaveSummeryCard from "../../components/Cards/LeaveSummeryCard";
import Loader from "../../components/Utility/Loader";
import NotFound from "../../components/Utility/NotFound";

export default function LeaveSummery({ selectedYear }) {
  const { responseBody, loading, msg } = useSelector(
    (state) => state.leaveSummery
  );

  const mappedItems = useMemo(() => {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          marginBottom: "10%",
          //backgroundColor:'red'
        }}
      >
        {responseBody.map((item, index) => (
          <LeaveSummeryCard key={index} dataList={item}></LeaveSummeryCard>
        ))}
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
