import React from "react";
import "./passengersByFlight.css";

function PassengersByFlight({ setAdminMenuItem }) {
  function handleBackClick() {
    setAdminMenuItem("profile-details");
  }

  function handleViewClick() {
    console.log("View Passenger By Flight");
  }
  return (
    <div className="outer-box">
      <span className="view-revenue">View Passenger By Flight</span>
      <div className="selection-box">
        <select className="model-selection" placeholder="Origin">
          <option className="model-option" value="origin" selected>
            Origin
          </option>
          <option className="model-option" value="model1">
            Model 1
          </option>
          <option className="model-option" value="model2">
            Model 2
          </option>
          <option className="model-option" value="model3">
            Model 3
          </option>
          <option className="model-option" value="model4">
            Model 4
          </option>
        </select>
        <select className="model-selection" placeholder="Destination">
          <option className="model-option" value="destination" selected>
            Destination
          </option>
          <option className="model-option" value="model1">
            Model 1
          </option>
          <option className="model-option" value="model2">
            Model 2
          </option>
          <option className="model-option" value="model3">
            Model 3
          </option>
          <option className="model-option" value="model4">
            Model 4
          </option>
        </select>
      </div>
      <div className="inner-box">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Passenger Name</th>
              <th>Passenger Type</th>
              <th>Seat Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1, Column 1</td>
              <td>Row 1, Column 2</td>
              <td>Row 1, Column 3</td>
              <td>Row 1, Column 4</td>
            </tr>
            <tr>
              <td>Row 2, Column 1</td>
              <td>Row 2, Column 2</td>
              <td>Row 2, Column 3</td>
              <td>Row 2, Column 4</td>
            </tr>
            <tr>
              <td>Row 2, Column 1</td>
              <td>Row 2, Column 2</td>
              <td>Row 2, Column 3</td>
              <td>Row 2, Column 4</td>
            </tr>
            <tr>
              <td>Row 2, Column 1</td>
              <td>Row 2, Column 2</td>
              <td>Row 2, Column 3</td>
              <td>Row 2, Column 4</td>
            </tr>
          </tbody>
        </table>
      </div>
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

export default PassengersByFlight;
