import axios from "axios";

const GetAttendanceCard = async (month) => {
  // const authKey = JSON.parse(localStorage.getItem("user"));
  // console.log(month);

  // return axios
  //   .get(`Attendance/GetAttendanceCard?month=${month}`)
  //   .then((response) => {
  //     return response;
  //   });


  let formData = new FormData();
  formData.append("P_MONTH", month);

  let config = {
    method: "post",
    url: "Attendance/GetAttendanceCard",
    data: formData,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

export default {
  GetAttendanceCard,
};
