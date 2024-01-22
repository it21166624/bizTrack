import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, logOut, OTPVerify } from "../action/Login";
import { loadUser } from "../action/Login";
import { useDispatch } from "react-redux";
import { GetAccessHeadComponent } from "../action/Common";
import axios from "axios";
import { useSelector } from "react-redux";
import store from "../store";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  let authKey = JSON.parse(localStorage.getItem("token"));
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (authKey) {
      axios.defaults.headers.common["auth-key"] = authKey;
      dispatch(loadUser());
      // dispatch(GetAccessHeadComponent());
      return authKey;
    }
    return false;
  });

  const handleLogin = (phoneNumber) => {
    dispatch(login(phoneNumber, navigate));
  };

  const handleVerification = (number, otp) => {
    dispatch(OTPVerify(number, navigate, otp));
  };

  const handleLogout = () => {
    logOut(navigate);
  };

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
    if (isLoggedIn) {
      axios.defaults.headers.common["auth-key"] = authKey;
      dispatch(GetAccessHeadComponent());
    }

    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
      if (navigator.onLine) {
        if (authKey) {
          store.dispatch(loadUser());
        }
      }
    };
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, [isLoggedIn, authKey, dispatch]);

  return (
    <>
      <AuthContext.Provider
        value={{
          isOnline,
          isAuthenticated,
          handleLogin,
          handleLogout,
          handleVerification,
          setIsAuthenticated,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
