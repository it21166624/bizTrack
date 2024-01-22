import React, { Fragment, useEffect, useState, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Signin from "./layouts/authentication/sign-in";
import Verification from "./layouts/authentication/verification";
import Home from "./layouts/other/Home";
import QR from "./layouts/qrscan/QR";
import NewQR_Scan from "./layouts/qrscan/NewQR_Scan";
// import NotFound from "./components/Utility/NotFound";
import BudgetShop from "./layouts/budget_shop/BudgetShop";
import Outstanding_Tools from "./layouts/outstanding_tools/Outstanding_Tools";
import Attendance from "./layouts/attendance/Attendance";
import Leave from "./layouts/leave";
import Medical from "./layouts/medical";
import PublicRoute from "./route/PublicRoute";
import { useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import { loadUser } from "./action/Login";
import { GetAccessHeadComponent } from "./action/Common";
import store from "./store";

import { useSelector } from "react-redux";
import Footer from "./route/BottomNavigation";
import Header from "./components/Header/Header";
import Loader from "./components/Utility/Loader";
import UserProfile from "./layouts/userProfile/userProfile";

// import useMediaQuery from "@material-ui/core/useMediaQuery";
// const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

function App() {
  const { isLoggedIn, loading } = useSelector((state) => state.auth);
  const { isOpen, isOpenDetailScreen } = useSelector(
    (state) => state.qrVisible
  );

  const { isOnline, isAuthenticated } = useAuth();
  console.log(isOnline);
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (isOnline) {
      metaThemeColor.setAttribute("content", "#F2F2F2");
    } else {
      metaThemeColor.setAttribute("content", "#004AAD");
    }
  }, [isOnline]);

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {isOnline ? (
        <Fragment>
          {loading ? (
            <Loader text={"Validating user token. Please wait.."}></Loader>
          ) : (
            <>
              {isLoggedIn ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    backgroundColor: "white",
                  }}
                >
                  <Header />
                  <NewQR_Scan
                    isOpen={isOpen}
                    isOpenDetailScreen={isOpenDetailScreen}
                  ></NewQR_Scan>
                  <div
                    style={{
                      flex: 1,
                      overflowY: "scroll",
                      backgroundColor: "#F2F3F4",
                      borderRadius: 15,
                      m: 1,
                    }}
                  >
                    <Routes>
                      <Route element={<Home />} path="/*" />
                      <Route element={<BudgetShop />} path="/budgetshop" />
                      <Route element={<Leave />} path="/leave" />
                      <Route element={<Attendance />} path="/attendance" />
                      <Route element={<Medical />} path="/medical" />
                      <Route element={<Outstanding_Tools />} path="/tools" />
                      <Route element={<UserProfile />} path="/userProfile" />

                    </Routes>
                  </div>
                  <div
                    style={{
                      position: "sticky",
                      bottom: 0,
                      width: "100%",
                      padding: 2,
                    }}
                  >
                    <Footer />
                  </div>
                </div>
              ) : (
                <Routes>
                  <Route element={<Signin />} path="/*" />
                  <Route element={<Signin />} path="/login" />
                  <Route element={<PublicRoute />}>
                    <Route element={<Verification />} path="/Verification" />
                  </Route>
                </Routes>
              )}
            </>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <Loader></Loader>
        </Fragment>
      )}
    </div>
  );
}

export default App;
