import React from "react";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import DEOProfileDetails from "./DEOProfileDetails";
import DEOAddAirport from "./DEOAddAirport";
import DEOAddRoute from "./DEOAddRoute";
import DEOScheduleFlight from "./DEOScheduleFlight";
import DEOAddAirplane from "./DEOAddAirplane";
import DEOAddModel from "./DEOAddModel";
import DEOUpdateDelay from "./DEOUpdateDelay";
import Details from "../AllDetails/Details";
import AllModels from "../AllDetails/AllModels";
import AllAirplanes from "../AllDetails/AllAirplanes";
import AllAirports from "../AllDetails/AllAirports";
import AllRoutes from "../AllDetails/AllRoutes";
import SearchFlights from "../AllDetails/SearchFlights";
import "../scrollMenu.css";
import "./deoProfile.css";

export default function DEOProfile({ userData }) {
  const { userMenuItem } = UserMenuGlobalState();

  return (
    <div className="wrapper">
      <img
        className="background-image"
        alt="Rectangle"
        loading="lazy"
        src={require("../../../images/DEOBackImage.jpg")}
      />
      <div className="deo-container">{renderPage()}</div>
    </div>
  );

  function renderPage() {
    if (userMenuItem === "profile-details") {
      return <DEOProfileDetails userData={userData} />;
    } else if (userMenuItem === "schedule-flight") {
      return <DEOScheduleFlight />;
    } else if (userMenuItem === "add-route") {
      return <DEOAddRoute />;
    } else if (userMenuItem === "add-airport") {
      return <DEOAddAirport />;
    } else if (userMenuItem === "add-airplane") {
      return <DEOAddAirplane />;
    } else if (userMenuItem === "add-model") {
      return <DEOAddModel />;
    } else if (userMenuItem === "update-delay") {
      return <DEOUpdateDelay />;
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
    } else {
      return <div>Page not found</div>;
    }
  }
}
