import React from "react";
import "./passengersByType.css";

function PassengersByType({ setAdminMenuItem }) {
  function handleBackClick() {
    setAdminMenuItem("profile-details");
  }

  function handleViewClick() {
    console.log("View Passenger By Date & Type");
  }
  return (
    <div className="outer-box">
      <span className="view-by-date-dest">View Passenger By Date & Type</span>
      <div className="selection-box">
        <select className="type-selection" placeholder="Type">
          <option className="type-option" value="type" selected>
            Type
          </option>
          <option className="type-option" value="type1">
            Type 1
          </option>
          <option className="type-option" value="type2">
            Type 2
          </option>
          <option className="type-option" value="type3">
            Type 3
          </option>
          <option className="type-option" value="type4">
            Type 4
          </option>
        </select>
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
      </div>
      <div className="inner-box">
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Passengers Count</th>
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

export default PassengersByType;
