import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  VERIFICATION_REQUEST,
  VERIFICATION_FAIL,
  VERIFICATION_SUCCESS,
  LOGOUT_SUCCESS,
} from "../constants/userConstants";

import {
  GET_USER_REQUEST,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
} from "../constants/commonContant";

import AuthService from "../service/AuthService";
import CommonService from "../service/CommonService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const login = (mobile_number, navigate) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  return await AuthService.login(mobile_number).then(
    (data) => {
      if (data.data.StatusCode === 200) {
        dispatch({
          type: VERIFICATION_REQUEST,
          payload: {
            number: mobile_number,
          },
        });
        navigate(`/Verification`);
      } else {
        dispatch({
          type: LOGIN_FAIL,
          payload: {
            msg: "Not a registered number.",
          },
        });
        toast.error("Not a registered number.");
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          msg: message,
        },
      });
      toast.error(message);
      return Promise.reject();
    }
  );
};

export const OTPVerify = (mobile_number, navigate, OTP) => async (dispatch) => {
  return await AuthService.OTPVerify(mobile_number, OTP).then(
    (data) => {
      if (data.data.StatusCode === 200) {
        console.log(data.data.UserDetails.ServiceNo);
        console.log(data.data.Token);
        dispatch({
          type: VERIFICATION_SUCCESS,
          payload: {
            user: data.data.UserDetails.ServiceNo,
          },
        });
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            data: data.data.UserDetails,
          },
        });
        localStorage.setItem("token", JSON.stringify(data.data.Token));
        navigate(`/`);
      } else {
        dispatch({
          type: VERIFICATION_FAIL,
          payload: {
            msg: "Invalid OTP. Please try again!",
          },
        });
        toast.error("Invalid OTP. Please try again!");
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          msg: message,
        },
      });
      toast.error(message);
      return Promise.reject();
    }
  );
};

export const loadUser = () => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  dispatch({
    type: GET_USER_REQUEST,
  });
  return await CommonService.GetUserByServiceNo().then(
    (data) => {
      if (data.data.StatusCode === 200) {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: {
            data: data.data.ResultSet,
          },
        });
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            data: data.data.ResultSet,
          },
        });
      } else {
        dispatch({
          type: GET_USER_FAIL,
          payload: {
            msg: "Failed to load user details",
          },
        });
        dispatch({
          type: LOGIN_FAIL,
          payload: {
            msg: "Failed to load user details",
          },
        });
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: GET_USER_FAIL,
        payload: {
          msg: message,
        },
      });
    }
  );
};

export const logOut = (navigate) => async (dispatch) => {
  localStorage.clear();
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  navigate(`/`);
};
