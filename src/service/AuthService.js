import axios from "axios";

const login = async (mobile_number) => {
  let formData = new FormData();
  formData.append("P_PHONE_NO", mobile_number);

  let config = {
    method: "post",
    url: "Login/OTPRequest",
    data: formData,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

const OTPVerify = async (mobile_number, OTP) => {
  let formData = new FormData();
  formData.append("P_PHONE_NO", mobile_number);
  formData.append("P_OTP", OTP);

  let config = {
    method: "post",
    url: "Login/OTPVerify",
    data: formData,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

export default {
  login,
  OTPVerify,
};
