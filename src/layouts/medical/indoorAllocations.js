import { Box, Grid } from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import IndoorAllocationCard from "../../components/Cards/IndoorAllocationCard";
import Loader from "../../components/Utility/Loader";
import NotFound from "../../components/Utility/NotFound";
import "./indoorAllocations.css";

function IndoorAllocations({ allocationName }) {
  const {
    responseBody: allocationData,
    msg,
    loading,
  } = useSelector((state) => state.userMedicalDetails);
  const {
    responseBody: IndoorCardData,
    msg: IndoorCardMsg,
    loading: IndoorCardLoading,
  } = useSelector((state) => state.medicalIndoorUsageDetails);

  const {
    responseBody: OutdoorCardData,
    msg: OutdoorCardMsg,
    loading: OutdoorCardLoading,
  } = useSelector((state) => state.medicalOutdoorUsageDetails);

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
        {allocationName === "Indoor" ? (

            IndoorCardData.map((item, index) => (
              <IndoorAllocationCard
                key={index}
                dataList={item}
              ></IndoorAllocationCard>
            ))

        ) : (

            OutdoorCardData.map((item, index) => (
              <IndoorAllocationCard
                key={index}
                dataList={item}
              ></IndoorAllocationCard>
            ))

        )}
      </div>
    );
  }, [IndoorCardData, OutdoorCardData, allocationName]);

  return (
    <div class="box-container">
      <div class="outer-box-container">
        {" "}
        {/* New outer container */}
        <div className="box">
          <div className="circle">
            {/* <div className="words">{allocationData.IndoorAllocation}</div> */}
            <div className="words">
              {allocationName === "Indoor"
                ? allocationData.IndoorAllocation
                : allocationData.OutdoorAllocation}
            </div>
          </div>
          <div className="word1">All Allocation</div>
        </div>
        <div className="box">
          <div className="circle">
            {/* <div className="words">{allocationData.IndoorUsage}</div> */}
            <div className="words">
              {allocationName === "Indoor"
                ? allocationData.IndoorUsage
                : allocationData.OutdoorUsage}
            </div>
          </div>
          <div className="word2">Allocation Usage</div>
        </div>
        <div className="box">
          <div className="circle">
            {/* <div className="words">{allocationData.IndoorBalance}</div> */}
            <div className="words">
              {allocationName === "Indoor"
                ? allocationData.IndoorBalance
                : allocationData.OutdoorBalance}
            </div>
          </div>
          <div className="word2">Allocation Balance</div>
        </div>
      </div>
      <div className="history">Allocations History</div>

      {allocationName === "Indoor" ? (
        <div>
          {IndoorCardLoading ? (
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
                {IndoorCardData.length > 0 ? (
                  mappedItems
                ) : (
                  <NotFound text={msg} />
                )}
              </Grid>
            </Box>
          )}
        </div>
      ) : (
        <div>
          {OutdoorCardLoading ? (
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
                {OutdoorCardData.length > 0 ? (
                  mappedItems
                ) : (
                  <NotFound text={msg} />
                )}
              </Grid>
            </Box>
          )}
        </div>
      )}
    </div>
  );
}

export default IndoorAllocations;
