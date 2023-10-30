import React from "react";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
// import { useEffect } from "react";
import AdminProfileDetails from "./AdminProfileDetails";
import ViewRevenue from "./ViewRevenue";
import PassengersByFlight from "./PassengersByFlight";
import PastFlightDetails from "./PastFlightDetails";
import PassengersByDestination from "./PassengersByDestination";
import PassengersByType from "./PassengersByType";
import Details from "../AllDetails/Details";
import AllModels from "../AllDetails/AllModels";
import AllAirplanes from "../AllDetails/AllAirplanes";
import AllAirports from "../AllDetails/AllAirports";
import AllRoutes from "../AllDetails/AllRoutes";
import SearchFlights from "../AllDetails/SearchFlights";
import RegisterPortal from "./RegisterPortal";
import AdminRegisterForm from "./../Authentication/AdminRegisterForm";
import DEORegisterForm from "./../Authentication/DEORegisterForm";
import "./adminProfile.css";

export default function AdminProfile({ userData }) {
  const { userMenuItem } = UserMenuGlobalState();

  // useEffect(() => {
  //   setUserMenuItem("profile-details");
  // }, [setUserMenuItem]);

  return (
    <div className="wrapper">
      <img
        className="background-image"
        alt="Rectangle"
        loading="lazy"
        src={require("../../../images/admin2.jpg")}
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
      return <AdminProfileDetails userData={userData} />;
    } else if (userMenuItem === "view-revenue-by-model") {
      return <ViewRevenue />;
    } else if (userMenuItem === "view-passengers-by-flight") {
      return <PassengersByFlight />;
    } else if (userMenuItem === "view-passengers-by-date-and-destination") {
      return <PassengersByDestination />;
    } else if (userMenuItem === "view-passengers-by-date-and-type") {
      return <PassengersByType />;
    } else if (userMenuItem === "view-past-flight-details") {
      return <PastFlightDetails />;
    } else if (userMenuItem === "view-details") {
      return <Details />;
    } else if (userMenuItem === "all-models") {
      return <AllModels />;
    } else if (userMenuItem === "all-airplanes") {
      return <AllAirplanes />;
    } else if (userMenuItem === "all-airports") {
      return <AllAirports />;
    } else if (userMenuItem === "all-routes") {
      return <AllRoutes />;
    } else if (userMenuItem === "search-flights") {
      return <SearchFlights />;
    } else if (userMenuItem === "register-portal") {
      return <RegisterPortal />;
    } else if (userMenuItem === "admin-register") {
      return <AdminRegisterForm />;
    } else if (userMenuItem === "deo-register") {
      return <DEORegisterForm />;
    } else {
      return <AdminProfileDetails userData={userData} />;
    }
  }
}
