import React from "react";
import "./viewRevenue.css";

function ViewRevenue({ setAdminMenuItem }) {
  function handleBackClick() {
    setAdminMenuItem("profile-details");
  }

  function handleViewClick() {
    console.log("View past flight details");
  }
  return (
    <div className="outer-box">
      <span className="view-revenue">View Revenue By Model</span>
      <select className="model-selection">
        <option className="model-option" value="model" selected>
          Model
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
      <div className="inner-box">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Passenger Count</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1, Column 1</td>
              <td>Row 1, Column 2</td>
              <td>Row 1, Column 3</td>
              <td>Row 1, Column 4</td>
              <td>Row 1, Column 5</td>
              <td>Row 1, Column 6</td>
            </tr>
            <tr>
              <td>Row 2, Column 1</td>
              <td>Row 2, Column 2</td>
              <td>Row 2, Column 3</td>
              <td>Row 2, Column 4</td>
              <td>Row 2, Column 5</td>
              <td>Row 2, Column 6</td>
            </tr>
            <tr>
              <td>Row 2, Column 1</td>
              <td>Row 2, Column 2</td>
              <td>Row 2, Column 3</td>
              <td>Row 2, Column 4</td>
              <td>Row 2, Column 5</td>
              <td>Row 2, Column 6</td>
            </tr>
            <tr>
              <td>Row 2, Column 1</td>
              <td>Row 2, Column 2</td>
              <td>Row 2, Column 3</td>
              <td>Row 2, Column 4</td>
              <td>Row 2, Column 5</td>
              <td>Row 2, Column 6</td>
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

export default ViewRevenue;
