import React, { useEffect } from "react";
import { Box, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import BudgetShopCard from "../../components/Cards/BudgetShopCard";
import SearchIcon from "@mui/icons-material/Search";
import { getGetBudgetShopPriceList } from "../../action/BudgetShop";

const BudgetShop = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#004AAD");
    }
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      dispatch(getGetBudgetShopPriceList(searchTerm));
    } else {
      dispatch(getGetBudgetShopPriceList(""));
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
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
              marginLeft: 2,
              mr: 2,
            }}
          >
            <TextField
              size="small"
              id="search"
              label="Search"
              value={searchTerm}
              variant="outlined"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              sx={{ width: "100%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => {
                      handleSearch();
                    }}
                  >
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
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
          <BudgetShopCard />
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetShop;
