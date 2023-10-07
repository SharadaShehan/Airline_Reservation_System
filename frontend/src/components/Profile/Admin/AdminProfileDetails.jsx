import React from "react";
import "./adminProfileDetails.css";

export default function AdminProfileDetails({ userData, setAdminMenuItem }) {
  function handleClickRevenue() {
    setAdminMenuItem("view-revenue-by-model");
  }

  function handleClickByFlight() {
    setAdminMenuItem("view-passengers-by-flight");
  }

  function handleClickByDate() {
    setAdminMenuItem("view-passengers-by-date-and-type");
  }

  function handleClickByDestination() {
    setAdminMenuItem("view-passengers-by-date-and-destination");
  }

  function handleClickPastDetails() {
    setAdminMenuItem("view-past-flight-details");
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
          Category : Administrator
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
      </div>
    </div>
  );
}
