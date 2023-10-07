import React from "react";
import { useState, useEffect } from "react";
import AdminProfileDetails from "./AdminProfileDetails";
import AdminSearchRecords from "./AdminSearchRecords";
import AdminViewReports from "./AdminViewReports";
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
        <div className="horizontal-scroll-menu">
          <ul className="menu-list">
            <li
              className={`menu-item${
                adminMenuItem === "profile-details" ? "-active" : ""
              }`}
              onClick={() => changeMenuItem("profile-details")}
            >
              Profile Details
            </li>
            <li
              className={`menu-item${
                adminMenuItem === "search-records" ? "-active" : ""
              }`}
              onClick={() => changeMenuItem("search-records")}
            >
              Search Records
            </li>
            <li
              className={`menu-item${
                adminMenuItem === "view-reports" ? "-active" : ""
              }`}
              onClick={() => changeMenuItem("view-reports")}
            >
              View Reports
            </li>
          </ul>
        </div>
        {renderPage()}
      </div>
    </div>
  );

  function changeMenuItem(item) {
    setAdminMenuItem(item);
  }

  function renderPage() {
    if (adminMenuItem === "profile-details") {
      return (
        <AdminProfileDetails
          userData={userData}
          setAdminMenuItem={setAdminMenuItem}
        />
      );
    } else if (adminMenuItem === "search-records") {
      return <AdminSearchRecords />;
    } else if (adminMenuItem === "view-reports") {
      return <AdminViewReports />;
    } else if (adminMenuItem === "view-revenue-by-model") {
      return <ViewRevenue />;
    } else if (adminMenuItem === "view-passengers-by-flight") {
      return <PassengersByFlight />;
    } else if (adminMenuItem === "view-passengers-by-date-and-destination") {
      return <PassengersByDestination />;
    } else if (adminMenuItem === "view-passengers-by-date-and-type") {
      return <PassengersByType />;
    } else if (adminMenuItem === "view-past-flight-details") {
      return <PastFlightDetails />;
    }
  }
}
