import React from "react";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
// import { useEffect } from "react";
import AdminProfileDetails from "./AdminProfileDetails";
import ViewRevenue from "./ViewRevenue";
import PassengersByFlight from "./PassengersByFlight";
import PastFlightDetails from "./PastFlightDetails";
import PassengersByDestination from "./PassengersByDestination";
import PassengersByType from "./PassengersByType";
import "./adminProfile.css";


export default function AdminProfile({ userData }) {
  const { userMenuItem, setUserMenuItem } = UserMenuGlobalState();

  // useEffect(() => {
  //   setUserMenuItem("profile-details");
  // }, [setUserMenuItem]);

  return (
    <div className="wrapper">
      <img
        className="background-image"
        alt="Rectangle"
        src={require("../../../images/AdminBackImage.jpg")}
      />
      <div className="admin-container">
        {/* <div className="horizontal-scroll-menu">
          <ul className="menu-list">
            <li
              className={`menu-item${
                adminMenuItem === "profile-details" ? "-active" : ""
              }`}
              onClick={() => changeMenuItem("profile-details")}
            >
              Profile Details
            </li>
          </ul>
        </div> */}
        {renderPage()}
      </div>
    </div>
  );

  // function changeMenuItem(item) {
  //   setAdminMenuItem(item);
  // }

  function renderPage() {
    if (userMenuItem === "profile-details") {
      return (
        <AdminProfileDetails
          userData={userData}
          setAdminMenuItem={setUserMenuItem}
        />
      );
    } else if (userMenuItem === "view-revenue-by-model") {
      return <ViewRevenue setAdminMenuItem={setUserMenuItem} />;
    } else if (userMenuItem === "view-passengers-by-flight") {
      return <PassengersByFlight setAdminMenuItem={setUserMenuItem} />;
    } else if (userMenuItem === "view-passengers-by-date-and-destination") {
      return <PassengersByDestination setAdminMenuItem={setUserMenuItem} />;
    } else if (userMenuItem === "view-passengers-by-date-and-type") {
      return <PassengersByType setAdminMenuItem={setUserMenuItem} />;
    } else if (userMenuItem === "view-past-flight-details") {
      return <PastFlightDetails setAdminMenuItem={setUserMenuItem} />;
    } else {
      return (
        <AdminProfileDetails
          userData={userData}
          setAdminMenuItem={setUserMenuItem}
        />
      );
    }
  }
}
