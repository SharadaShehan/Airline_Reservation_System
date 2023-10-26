import React from "react";
import "./deoProfileDetails.css";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";

export default function DEOProfileDetails({ userData }) {
  const { setUserMenuItem } = UserMenuGlobalState();

  function handleClickAddAirport() {
    setUserMenuItem("add-airport");
  }

  function handleClickAddAirplane() {
    setUserMenuItem("add-airplane");
  }

  function handleClickAddModel() {
    setUserMenuItem("add-model");
  }

  function handleClickAddRoute() {
    setUserMenuItem("add-route");
  }

  function handleClickScheduleFlight() {
    setUserMenuItem("schedule-flight");
  }

  function handleClickUpdateDelay() {
    setUserMenuItem("update-delay");
  }

  function handleViewDetails() {
    setUserMenuItem("view-details");
  }

  return (
    <div className="profile-cont">
      <div className="data-field-l">
        <div className="section-title">Data Entry Operator Profile</div>
        <div className="fnt-txt">
          User name : {userData.username}
          <br />
          First name : {userData.firstName}
          <br />
          Last name : {userData.lastName}
          <br />
          Role : Data Entry Operator
        </div>
      </div>
      <div className="data-field-r">
        <div className="section-title-r">Operations</div>
        <div className="deo-ops">
          <button
            type="button"
            className="op-button btn"
            onClick={handleClickAddAirport}
          >
            Add Airport
          </button>
          <button
            type="button"
            className="op-button btn"
            onClick={handleClickAddAirplane}
          >
            Add Airplane
          </button>
          <button
            type="button"
            className="op-button btn"
            onClick={handleClickAddModel}
          >
            Add Model
          </button>
          <button
            type="button"
            className="op-button btn"
            onClick={handleClickAddRoute}
          >
            Add Route
          </button>
          <button
            type="button"
            className="op-button btn"
            onClick={handleClickScheduleFlight}
          >
            Schedule&nbsp;Flight
          </button>
          <button
            type="button"
            className="op-button btn"
            onClick={handleClickUpdateDelay}
          >
            Update Delay
          </button>
          <button
            type="button"
            className="op-button btn"
            onClick={handleViewDetails}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
