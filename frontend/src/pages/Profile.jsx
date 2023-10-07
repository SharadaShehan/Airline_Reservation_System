import React from "react";
import LoginOrRegister from "../components/Profile/LoginOrRegister";
import UserProfile from "../components/Profile/UserProfile";
import AdminProfile from "../components/Profile//Admin/AdminProfile";
import DEOProfile from "../components/Profile/DEOProfile";
import { UserGlobalState } from "../components/Layout/UserGlobalState";

export default function Profile() {
  const { currentUserData } = UserGlobalState();

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
  } else if (Boolean(userData.isAdmin) === true) {
    return <AdminProfile userData={userData} />;
  } else if (Boolean(userData.isDataEntryOperator) === true) {
    return <DEOProfile userData={userData} />;
  } else if (
    Boolean(userData.isDataEntryOperator) === false &&
    Boolean(userData.isAdmin) === false
  ) {
    return <UserProfile userData={userData} />;
  }
}
