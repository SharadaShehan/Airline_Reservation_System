import React from "react";
import LoginOrRegister from "../components/Profile/Authentication/LoginOrRegister";
import UserProfile from "../components/Profile/RegisteredUser/UserProfile";
import AdminProfile from "../components/Profile/Admin/AdminProfile";
import DEOProfile from "../components/Profile/DEO/DEOProfile";
import { UserGlobalState } from "../components/Layout/UserGlobalState";
import { BookingStepGlobalState } from "../components/Layout/BookingStepGlobalState";

export default function Profile() {
  const { currentUserData } = UserGlobalState();
  const { setBookingStep } = BookingStepGlobalState();
  setBookingStep("seatReserve");

  // useEffect(() => {
  //     setCurrentUserData({
  //       'username': null,
  //       'firstName': null,
  //       'lastName': null,
  //       'isAdmin': null,
  //       'isDataEntryOperator': null,
  //       'bookingsCount': null,
  //       'category': null
  //       });
  // }, [setCurrentUserData]);

  return <div className="wrapper">{renderPage(currentUserData)}</div>;
}

function renderPage(userData) {
  if (userData.username === null) {
    return <LoginOrRegister />;
  } else if (userData.username !== null && userData.role === undefined) {
    return <UserProfile userData={userData} />;
  } else if (userData.role === "Admin") {
    return <AdminProfile userData={userData} />;
  } else if (userData.role === "DataEntryOperator") {
    return <DEOProfile userData={userData} />;
  } else {
    return <LoginOrRegister />;
  }
}
