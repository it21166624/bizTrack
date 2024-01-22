import React from "react";
import { Box } from "@mui/material";
import ToolsCard from "../../components/Cards/ToolsCard";

const Outstanding_Tools = () => {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        mt: 1,
      }}
    >
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
          <ToolsCard />
        </Box>
      </Box>
    </Box>
  );
};

export default Outstanding_Tools;
