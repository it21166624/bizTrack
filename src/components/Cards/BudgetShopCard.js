import React, { useEffect, useMemo } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Box, CardActionArea, Grid } from "@mui/material";
import { getGetBudgetShopPriceList } from "../../action/BudgetShop";
import Loader from "../Utility/Loader";
import NotFound from "../Utility/NotFound";

export default function BudgetShopCard() {
  const { responseBody, loading, msg } = useSelector(
    (state) => state.budgetItem
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGetBudgetShopPriceList(""));
  }, [dispatch]);

  const mappedItems = useMemo(() => {
    return responseBody.map((item, index) => (
      <Grid
        item
        xs={12}
        sx={{
          padding: 1,
        }}
        key={index}
      >
        <Card sx={{ padding: 1, boxShadow: 3 }}>
          <CardActionArea>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  padding: 1,
                }}
              >
                <img
                  src={require("../../assets/icons/food.png")}
                  alt="First slide"
                  style={{ borderRadius: "10px", height: 60 }}
                />
                <Typography gutterBottom fontSize={8} component="div">
                  {item.MaterialCode}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    paddingTop: 10,
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                >
                  <Typography
                    gutterBottom
                    fontSize={12}
                    fontWeight={600}
                    component="div"
                  >
                    {item.MaterialDescription}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Typography gutterBottom fontSize={12} component="div">
                      Balance Qty : {item.BalanceQuantity}
                    </Typography>
                    &nbsp;
                    <Typography gutterBottom fontSize={12} component="div">
                      {item.Unit}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Typography
                      gutterBottom
                      fontSize={15}
                      fontWeight={600}
                      component="div"
                    >
                      Price: {item.SellingPrice} Rs
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </CardActionArea>
        </Card>
      </Grid>
    ));
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
