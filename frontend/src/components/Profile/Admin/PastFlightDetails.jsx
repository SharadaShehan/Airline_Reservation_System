import React from "react";
import "./pastFlightDetails.css";

function PastFlightDetails({ setAdminMenuItem }) {
  function handleBackClick() {
    setAdminMenuItem("profile-details");
  }

  function handleViewClick() {
    console.log("View past flight details");
  }

  return (
    <div className="outer-box">
      <span className="view-details">View Past Flight Details</span>
      <div className="inner-box"></div>
      <div className="buttons-div">
        <button onClick={handleBackClick} className="buttons">
          Back
        </button>
        <button onClick={handleViewClick} className="buttons">
          View
        </button>
      </div>
    </div>
  );
}

export default PastFlightDetails;
