import React from "react";
import "./passengersByDestination.css";

function PassengersByDestination({ setAdminMenuItem }) {
  function handleBackClick() {
    setAdminMenuItem("profile-details");
  }

  function handleViewClick() {
    console.log("View Passengers by Date & Destination");
  }
  return (
    <div className="outer-box">
      <span className="view-by-date-dest">
        View Passengers by Date & Destination
      </span>
      <div className="selection-box">
        <div className="date-selection">
          <label className="from" for="start-date-input">
            From
          </label>
          <input
            id="start-date-input"
            className="model-selection"
            type="date"
            name="start-date"
            min="2023-10-01"
            max="2023-12-31"
          />
        </div>
        <div className="date-selection">
          <label className="to" for="end-date-input">
            To
          </label>
          <input
            id="end-date-input"
            className="model-selection"
            type="date"
            name="end-date"
            min="2023-10-01"
            max="2023-12-31"
          />
        </div>

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
              <th>Model</th>
              <th>Flight ID</th>
              <th>Passenger Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1, Column 1</td>
              <td>Row 1, Column 2</td>
              <td>Row 1, Column 3</td>
            </tr>
            <tr>
              <td>Row 2, Column 1</td>
              <td>Row 2, Column 2</td>
              <td>Row 2, Column 3</td>
            </tr>
            <tr>
              <td>Row 2, Column 1</td>
              <td>Row 2, Column 2</td>
              <td>Row 2, Column 3</td>
            </tr>
            <tr>
              <td>Row 2, Column 1</td>
              <td>Row 2, Column 2</td>
              <td>Row 2, Column 3</td>
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

export default PassengersByDestination;
