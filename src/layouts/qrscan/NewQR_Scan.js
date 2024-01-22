import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QrScanner from "react-qr-scanner";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContentText from "@mui/material/DialogContentText";
import { Grid, Box, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { SendEWODetails, QRScan } from "../../action/QRScan";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function CustomizedDialogs({ isOpen, isOpenDetailScreen }) {
  const { responseBody, isButtonVisible } = useSelector((state) => state.qr);
  const { data, loading } = useSelector((state) => state.userbyServiceNo);
  const [qrCode, setQRCode] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      getCameraOptions();
    }
  }, []);

  const handleClose = () => {
    dispatch({ type: "IS_CLOSE" });
  };

  const handleScan = async (scanData) => {
    if (scanData) {
      setQRCode(scanData.text.trim());
      const ewoNo = parseInt(scanData.text.trim());
      dispatch(QRScan(ewoNo, data[0].ServiceNo));
    }
  };
  const handleError = (error) => {
    console.error(error);
  };

  const getCameraOptions = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );
    const rearCamera = videoDevices.find(
      (device) => device.label.includes("back") || device.label.includes("rear")
    );
  };
  const previewStyle = {
    width: "100%",
    height: "auto",
  };

  return (
    <div>
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={isOpen}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Scan Your QR Code
          </BootstrapDialogTitle>
          <DialogContent dividers>
            {/* <div>
              <select onChange={switchCamera}>{cameraOptions}</select>
            </div> */}
            <QrScanner
              delay={1000}
              onError={handleError}
              onScan={handleScan}
              style={previewStyle}
              constraints={{
                audio: false,
                video: { facingMode: "environment", autoFocus: true },
              }}
            />

            {/* <button onClick={switchToEnvironmentCamera}>
              Switch to Environment Camera
            </button>
            <button onClick={switchToUserCamera}> Switch to User Camera</button> */}
            <p>{qrCode}</p>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                handleClose();
                // handleScndClickOpen();
              }}
            >
              Scan Again
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={isOpenDetailScreen}
          // TransitionComponent={Transition}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Contact Details
          </BootstrapDialogTitle>
          {/* <DialogContent dividers={"paper"}> */}
          <DialogContent dividers>
            <DialogContentText
              id="scroll-dialog-description"
              //ref={descriptionElementRef}
              tabIndex={-1}
              //marginRight={10}
              marginLeft={-2}
            >
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                padding={1}
                //sx={{ minHeight: '100vh' }}
              >
                {/* <Grid item xs={3}> */}
                <Box
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "100%" },
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <div style={{ textAlign: "center" }}>
                    <TextField
                      id="outlined-read-only-input"
                      label="EWO No:"
                      defaultValue={
                        responseBody !== null ? responseBody.EwoNo : ""
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                      // value={responseData.authorize_person}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Authorize Person"
                      defaultValue={
                        responseBody !== null
                          ? responseBody.AuthorizePerson
                          : ""
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      //label="Status"
                      inputProps={{
                        style: {
                          color:
                            responseBody !== null
                              ? responseBody.StatusTxtcolor
                              : "",
                        },
                      }}
                      defaultValue={
                        responseBody !== null ? responseBody.EwoStatus : ""
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                      style={{
                        backgroundColor:
                          responseBody !== null
                            ? responseBody.StatusBckcolor
                            : "",
                        borderRadius: 5,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Estimate Amount"
                      defaultValue={
                        responseBody !== null
                          ? responseBody.EstimatedAmount
                          : ""
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Billed Amount"
                      defaultValue={
                        responseBody !== null ? responseBody.BilledAmount : ""
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Workdone Receive Amount"
                      // defaultValue={responseData.authorize_person}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Authorize By:"
                      defaultValue={
                        responseBody !== null ? responseBody.AuthorizeBy : ""
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Evaluated By:"
                      defaultValue={
                        responseBody !== null ? responseBody.EvaluationBy : ""
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Recieved By:"
                      defaultValue={
                        responseBody !== null ? responseBody.RecievedBy : ""
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Issued By:"
                      defaultValue={
                        responseBody !== null ? responseBody.IssuedBy : ""
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Issued Date"
                      defaultValue={
                        responseBody !== null ? responseBody.IssuedDate : ""
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Serial No:"
                      defaultValue={
                        responseBody !== null ? responseBody.SerialNo : ""
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="DocType"
                      defaultValue={
                        responseBody !== null ? responseBody.DocType : ""
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Remarks"
                      defaultValue={
                        responseBody !== null ? responseBody.Remarks : ""
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                </Box>
                {/* </Grid> */}
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {isButtonVisible && (
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                autoFocus
                onClick={() => {
                  handleClose();
                  // handleSaveChanges();
                  dispatch(SendEWODetails(responseBody));
                }}
              >
                Send Document
              </Button>
            )}

            <Button
              variant="contained"
              endIcon={<CloseIcon />}
              color="error"
              autoFocus
              onClick={() => {
                handleClose();
                // handleSaveChanges();
              }}
            >
              Close
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </div>
  );
}
