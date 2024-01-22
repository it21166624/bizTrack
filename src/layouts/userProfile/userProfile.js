import React, { useState, useEffect } from "react";
import "./userProfile.css";
import { useSelector } from "react-redux";
import axios from "axios";

function UserProfile() {

    const { data } = useSelector((state) => state.userbyServiceNo);
    console.log(data[0]);
    const [recruitmentDate, setRecruitmentDate] = useState("");
    const [permanentDate, setPermanentDate] = useState("");
    const [retirementDate, setRetirementDate] = useState("");
    const [division, setDivision] = useState("");
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [serviceNumber, setServiceNumber] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [location, setLocation] = useState("");
    const [gmail, setGmail] = useState("");
    const [hasImage, setHasImage] = React.useState(false);
    const authKey = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        try {
            const img = new Image();
            img.onload = function () {
                setHasImage(true);
            };
            img.onerror = function () {
                setHasImage(false);
            };
            img.src =
                `${axios.defaults.baseURL}home/GetUserImg?authKey=${authKey.replace('+', '%2B')}`.replace(
                    /"/g,
                    ""
                );
        } catch (error) { }
    }, [authKey]);



    // const [userImage, setUserImage] = useState("");
    //https://esystems.cdl.lk/backend-Test/BizTrack/home/GetUserImg?authKey=J/uX2CpnFdhkHKbZKgfZog==

    return (

        <div className="full-container">
            <div className="upper-part">
                <div className="profile">PROFILE</div>
            </div>
            <div className="divider-box">

                <div className="img-box">
                    <img src={
                        hasImage
                            ? `${axios.defaults.baseURL}home/GetUserImg?authKey=${authKey.replace('+', '%2B')}`.replace(
                                /"/g,
                                ""
                            )
                            : require("../../assets/images/man.png")
                    } className="hash" />

                </div>
                <div className="us">{data[0].ReportName}</div>

            </div>

            <div className="eight-boxes">
                <div className="b">
                    <h2>Designation</h2>
                    <p>{data[0].Designation}</p>
                </div>
                <div className="b">
                    <h2>Service Number</h2>
                    <p>{data[0].ServiceNo}</p>
                </div>
                <div className="b">
                    <h2>Mobile Number</h2>
                    <p>{data[0].MobileNo}</p>
                </div>
                <div className="b">
                    <h2>Division</h2>
                    <p>{data[0].Division}</p>
                </div>
                <div className="b">
                    <h2>Retirement Date</h2>
                    <p>{data[0].RetirementDate}</p>
                </div>
                <div className="b">
                    <h2>Permanent Date</h2>
                    <p>{data[0].PermanantDate}</p>
                </div>
                <div className="b">
                    <h2>Recruitment Date</h2>
                    <p>{data[0].RecruitmentDate}</p>
                </div>
                <div className="b">
                    <h2>Department</h2>
                    <p>{data[0].Department}</p>
                </div>
                <div className="b">
                    <h2>Gmail</h2>
                    <p>{data[0].Email}</p>
                </div>
                <div className="b-1">
                    <h2> Report Officer Name</h2>
                    <p>{data[0].ReportingOfficerDetails.ReportName}</p>
                    <h2>Service No</h2>
                    <p>{data[0].ReportingOfficerDetails.ServiceNo}</p>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;

