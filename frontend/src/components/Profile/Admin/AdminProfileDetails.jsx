import React from "react";
import "./adminProfileDetails.css";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";

export default function AdminProfileDetails({ userData }) {
  const { setUserMenuItem } = UserMenuGlobalState();

  function handleClickRevenue() {
    setUserMenuItem("view-revenue-by-model");
  }

  function handleClickByFlight() {
    setUserMenuItem("view-passengers-by-flight");
  }

  function handleClickByDate() {
    setUserMenuItem("view-passengers-by-date-and-type");
  }

  function handleClickByDestination() {
    setUserMenuItem("view-passengers-by-date-and-destination");
  }

  function handleClickPastDetails() {
    setUserMenuItem("view-past-flight-details");
  }

  function handleViewDetails() {
    setUserMenuItem("view-details");
  }

  function handleRegisterStaff() {
    setUserMenuItem("register-portal");
  }

  return (
    <div className="container">
      <div className="group163">
        <div className="rectangle77" />
        <div className="administratorProfile">Administrator profile</div>
        <div className="details">
          First Name : {userData.firstName}
          <br />
          last Name : {userData.lastName}
          <br />
          Role : Administrator
          <br />
        </div>
      </div>
      <div className="group-div">
        <div className="rectangle-div" />
        <div className="search-records">Search Records</div>

        <button className="rectangle-parent1" onClick={handleClickRevenue}>
          Revenue By Model
        </button>

        <button className="rectangle-parent2" onClick={handleClickByFlight}>
          Passengers by Flight
        </button>

        <button
          onClick={handleClickByDestination}
          className="rectangle-parent4"
        >
          Passengers by Date & Destination
        </button>

        <button onClick={handleClickByDate} className="rectangle-parent3">
          Passengers by Date & Type
        </button>

        <button onClick={handleClickPastDetails} className="rectangle-parent5">
          Past Flight Details
        </button>

        <button onClick={handleViewDetails} className="rectangle-parent6">
          View Details
        </button>
        <button onClick={handleRegisterStaff} className="rectangle-parent6">
          Register Staff
        </button>
      </div>
    </div>
  );
}
