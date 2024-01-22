import {
  QR_REQUEST,
  QR_SUCCESS,
  QR_FAIL,
  GET_EWO_DETAILS_REQUEST,
  GET_EWO_DETAILS_SUCCESS,
  GET_EWO_DETAILS_FAIL,
  RECEIVE_EWO_DETAILS_REQUEST,
  RECEIVE_EWO_DETAILS_SUCCESS,
  RECEIVE_EWO_DETAILS_FAIL,
  SEND_EWO_DETAILS_REQUEST,
  SEND_EWO_DETAILS_SUCCESS,
  SEND_EWO_DETAILS_FAIL,
} from "../constants/qrConstants";
import QRService from "../service/QRService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export const QRScan = (ewoNo) => async (dispatch) => {
//   dispatch({
//     type: QR_REQUEST,
//   });
//   return await QRService.GetEWODetails(ewoNo).then(
//     (data) => {
//       if (data.data.StatusCode === 200) {
//         if (!data.data.ResultSet) {
//           toast.info("No data for this EWO Number. Please try again.");
//         } else {
//           dispatch({
//             type: QR_SUCCESS,
//             payload: { responseBody: data.data.ResultSet },
//           });

//           if (data.data.ResultSet.IssuedBy !== "") {

//           } else {
//           }
//         }
//       } else {
//         dispatch({
//           type: QR_FAIL,
//         });
//         toast.info("Check the QR Again.");
//       }
//       return Promise.resolve();
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: QR_FAIL,
//       });
//       toast.error(message);
//       return Promise.reject();
//     }
//   );
// };

export const QRScan = (ewoNo, serviceNumber) => async (dispatch) => {
  dispatch({
    type: QR_REQUEST,
    payload: {
      EWONo: ewoNo,
    },
  });

  dispatch({
    type: GET_EWO_DETAILS_REQUEST,
  });

  return await QRService.GetEWODetails(ewoNo).then(
    (data) => {
      if (data.data.StatusCode === 200) {
        dispatch({
          type: GET_EWO_DETAILS_SUCCESS,
          payload: { user: data },
        });
        console.log(data.data.ResultSet);
        if (data.data.ResultSet.IssuedBy !== "") {
          console.log("1");
          let formData = new FormData();
          formData.append("P_EWO_NO", ewoNo);
          formData.append("P_REMARKS", data.data.ResultSet.Remarks);
          formData.append(
            "P_SERIAL_NO",
            data.data.ResultSet.SerialNo ? data.data.ResultSet.SerialNo : "1"
          );

          dispatch({
            type: RECEIVE_EWO_DETAILS_REQUEST,
          });

          return QRService.RecieveEWODetails(formData).then(
            (data) => {
              if (data.data.StatusCode === 200) {
                dispatch({
                  type: RECEIVE_EWO_DETAILS_SUCCESS,
                  payload: { responseBody: data.data },
                });

                dispatch({
                  type: GET_EWO_DETAILS_REQUEST,
                });

                return QRService.GetEWODetails(ewoNo).then(
                  (data) => {
                    dispatch({
                      type: GET_EWO_DETAILS_SUCCESS,
                      payload: { user: data },
                    });
                    dispatch({
                      type: QR_SUCCESS,
                      payload: {
                        isButtonVisible: true,
                        EWONo: ewoNo,
                        responseBody: data.data.ResultSet,
                        msg: null,
                        loading: false,
                        error: null,
                      },
                    });
                    dispatch({
                      type: "IS_OPEN",
                      payload: { isOpen: false, isOpenDetailScreen: true },
                    });
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
                      type: GET_EWO_DETAILS_FAIL,
                    });
                    toast.error("GetEWODetails ", message);
                    return Promise.reject();
                  }
                );
              } else {
                dispatch({
                  type: RECEIVE_EWO_DETAILS_FAIL,
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
                type: RECEIVE_EWO_DETAILS_FAIL,
              });
              toast.error("RecieveEWODetails ", message);
              return Promise.reject();
            }
          );
        } else if (data.data.ResultSet.RecievedBy !== serviceNumber) {
          console.log("2");
          if (data.data.ResultSet.IssuedBy === "") {
            toast.info(
              "Work order must be sent by " +
                data.data.ResultSet.RecievedBy +
                " first"
            );
            dispatch({
              type: QR_SUCCESS,
              payload: {
                isButtonVisible: false,
                EWONo: ewoNo,
                responseBody: data.data.ResultSet,
                msg: null,
                loading: false,
                error: null,
              },
            });
            dispatch({
              type: "IS_OPEN",
              payload: { isOpen: false, isOpenDetailScreen: true },
            });
          }
        } else if (data.data.ResultSet.RecievedBy === serviceNumber) {
          console.log("3");
          if (data.data.ResultSet.IssuedBy === "") {
            dispatch({
              type: QR_SUCCESS,
              payload: {
                isButtonVisible: true,
                EWONo: ewoNo,
                responseBody: data.data.ResultSet,
                msg: null,
                loading: false,
                error: null,
              },
            });
            dispatch({
              type: "IS_OPEN",
              payload: { isOpen: false, isOpenDetailScreen: true },
            });
          } else {
            dispatch({
              type: QR_SUCCESS,
              payload: {
                isButtonVisible: false,
                EWONo: ewoNo,
                responseBody: data.data.ResultSet,
                msg: "3",
                loading: false,
                error: null,
              },
            });
            dispatch({
              type: "IS_OPEN",
              payload: { isOpen: false, isOpenDetailScreen: true },
            });
          }
        } else {
          console.log("end");
        }
      } else {
        // alert("No data for this EWO Number. Please try again.");
        toast.info("No data for this EWO Number. Please try again.");
      }

      // return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // dispatch({
      //   type: GET_EWO_DETAILS_FAIL,
      // });
      dispatch({
        type: QR_FAIL,
      });
      toast.error("GetEWODetails " + message);
      return Promise.reject();
    }
  );
};

// const GetEWODetails = (ewoNo) => async (dispatch) => {
//   dispatch({
//     type: GET_EWO_DETAILS_REQUEST,
//   });

//   return await QRService.GetEWODetails(ewoNo).then(
//     (data) => {
//       dispatch({
//         type: GET_EWO_DETAILS_SUCCESS,
//         payload: { user: data },
//       });
//       return Promise.resolve();
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: GET_EWO_DETAILS_FAIL,
//       });
//       toast.error(message);
//       return Promise.reject();
//     }
//   );
// };

// const RecieveEWODetails =
//   (ewoNo, responseBody, serviceNumber) => async (dispatch) => {
//     const currentDate = new Date();
//     const receivedDate = currentDate.toISOString();
//     // const requestBody = {
//     //   ewo_no: ewoNo,
//     //   recieved_by: serviceNumber,
//     //   recieved_date: receivedDate,
//     //   remarks: responseBody.remarks,
//     // };

//     let formData = new FormData();
//     formData.append("P_EWO_NO", ewoNo);
//     formData.append("P_REMARKS", responseBody.remarks);

//     dispatch({
//       type: RECEIVE_EWO_DETAILS_REQUEST,
//     });

//     return await QRService.RecieveEWODetails(formData).then(
//       (data) => {
//         dispatch({
//           type: RECEIVE_EWO_DETAILS_SUCCESS,
//           payload: { responseBody: data.data },
//         });
//         return Promise.resolve();
//       },
//       (error) => {
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();

//         dispatch({
//           type: RECEIVE_EWO_DETAILS_FAIL,
//         });
//         toast.error(message);
//         return Promise.reject();
//       }
//     );
//   };

export const SendEWODetails = (responseBody) => async (dispatch) => {
  dispatch({
    type: SEND_EWO_DETAILS_REQUEST,
  });
  // const data = {
  //   // ewo_no: responseData.ewo_no,
  //   // issued_by: serviceNumber,
  //   // issued_date: issueDate,
  //   // serial_no: responseData.serial_no,
  // };

  let formData = new FormData();
  formData.append("P_EWO_NO", responseBody.EwoNo);
  formData.append("P_SERIAL_NO", responseBody.EwoNo);

  return await QRService.SendEWODetails(formData).then(
    (data) => {
      dispatch({
        type: SEND_EWO_DETAILS_SUCCESS,
        payload: { user: data },
      });
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
        type: SEND_EWO_DETAILS_FAIL,
      });
      toast.error(message);
      return Promise.reject();
    }
  );
};
