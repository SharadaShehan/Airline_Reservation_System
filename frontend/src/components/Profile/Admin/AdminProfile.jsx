import React from "react";
import { useState, useEffect } from "react";
import AdminProfileDetails from "./AdminProfileDetails";
import ViewRevenue from "./ViewRevenue";
import PassengersByFlight from "./PassengersByFlight";
import PastFlightDetails from "./PastFlightDetails";
import PassengersByDestination from "./PassengersByDestination";
import PassengersByType from "./PassengersByType";
import "../scrollMenu.css";
import "./adminProfile.css";

export default function DEOProfile({ userData }) {
  const [adminMenuItem, setAdminMenuItem] = useState("profile-details");

  useEffect(() => {
    setAdminMenuItem("profile-details");
  }, [setAdminMenuItem]);

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
    if (adminMenuItem === "profile-details") {
      return (
        <AdminProfileDetails
          userData={userData}
          setAdminMenuItem={setAdminMenuItem}
        />
      );
    } else if (adminMenuItem === "view-revenue-by-model") {
      return <ViewRevenue setAdminMenuItem={setAdminMenuItem} />;
    } else if (adminMenuItem === "view-passengers-by-flight") {
      return <PassengersByFlight setAdminMenuItem={setAdminMenuItem} />;
    } else if (adminMenuItem === "view-passengers-by-date-and-destination") {
      return <PassengersByDestination setAdminMenuItem={setAdminMenuItem} />;
    } else if (adminMenuItem === "view-passengers-by-date-and-type") {
      return <PassengersByType setAdminMenuItem={setAdminMenuItem} />;
    } else if (adminMenuItem === "view-past-flight-details") {
      return <PastFlightDetails setAdminMenuItem={setAdminMenuItem} />;
    }
  }
}
