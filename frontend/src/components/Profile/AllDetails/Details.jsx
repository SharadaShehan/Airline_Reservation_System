import React from "react";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import "./details.css";

function Details() {
  const { setUserMenuItem } = UserMenuGlobalState();

  return (
    <div className="wrapper">
      <img
        className="background-image"
        alt="Rectangle"
        src={require("../../../images/DEOBackImage.jpg")}
      />
      <div className="deo-container">
        <div className="data-field-r">
          <div className="section-title-r">Operations</div>
          <div className="deo-ops">
            <button
              type="button"
              className="op-button btn"
              onClick={() => setUserMenuItem("all-models")}
            >
              View All Models
            </button>
            <button
              type="button"
              className="op-button btn"
              onClick={() => setUserMenuItem("all-airplanes")}
            >
              View All Airplanes
            </button>
            <button
              type="button"
              className="op-button btn"
              onClick={() => setUserMenuItem("all-airports")}
            >
              View All Airports
            </button>
            <button
              type="button"
              className="op-button btn"
              onClick={() => setUserMenuItem("all-routes")}
            >
              View All Routes
            </button>
            <button
              type="button"
              className="op-button btn"
              onClick={() => setUserMenuItem("search-flights")}
            >
              Search Flights
            </button>
            <button
              type="button"
              className="op-button btn"
              onClick={() => setUserMenuItem("profile-details")}
            >
              Back to Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
