import axios from "axios";

const getBannerImages = async () => {
  return axios.get(`home/GetBannerImgList`).then((response) => {
    return response;
  });
};

const GetAccessHeadComponent = async () => {
  return axios.post(`Access/GetAccessHeadComponent`).then((response) => {
    return response;
  });
};

const GetUserByServiceNo = async () => {
  return axios.post(`login/GetUserByServiceNo`).then((response) => {
    return response;
  });
};

export default {
  getBannerImages,
  GetAccessHeadComponent,
  GetUserByServiceNo,
};
